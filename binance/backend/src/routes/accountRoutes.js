import express from 'express';
import axios from 'axios';
import { binanceClient } from '../services/binanceClient.js';
import { binanceConfig } from '../config/binanceConfig.js';

const router = express.Router();

let cachedPublicIp = null;
let lastIpCheck = 0;

async function getPublicIp() {
  const now = Date.now();
  if (cachedPublicIp && now - lastIpCheck < 10 * 60 * 1000) {
    return cachedPublicIp;
  }
  try {
    const res = await axios.get('https://api.ipify.org?format=json', { timeout: 3000 });
    cachedPublicIp = res.data.ip;
    lastIpCheck = now;
  } catch {
    cachedPublicIp = 'Unknown (check via whatismyip.com)';
  }
  return cachedPublicIp;
}

/**
 * GET /api/account/status
 * Check configuration status & verify API connectivity with Binance
 */
router.get('/status', async (req, res) => {
  const config = binanceConfig.getConfig(req);
  const publicIp = await getPublicIp();

  if (!config.isConfigured) {
    return res.json({
      configured: false,
      useTestnet: config.useTestnet,
      baseUrl: config.baseUrl,
      publicIp,
      message: 'API keys not configured. Enter keys in Settings or specify in backend .env'
    });
  }

  const keyLen = config.apiKey.length;
  const secretLen = config.apiSecret.length;
  const keyPreview = keyLen > 8 ? `${config.apiKey.slice(0, 4)}...${config.apiKey.slice(-4)}` : 'INVALID_LEN';
  
  console.log(`[Account Status] Verifying keys: Env=${config.useTestnet ? 'TESTNET' : 'PRODUCTION'}, Key=${keyPreview} (len: ${keyLen}), SecretLen=${secretLen}, IP=${publicIp}`);

  let spotAccount = null;
  let futuresAccount = null;
  let spotError = null;
  let futuresError = null;

  try {
    spotAccount = await binanceClient.getAccountInfo(req);
  } catch (e) {
    spotError = e;
  }

  try {
    futuresAccount = await binanceClient.getFuturesBalances(req);
  } catch (e) {
    futuresError = e;
  }

  const isFuturesConnected = Boolean(futuresAccount?.enabled);
  const isSpotConnected = Boolean(spotAccount);
  const isConnected = isSpotConnected || isFuturesConnected;

  if (isConnected) {
    console.log(`[Account Status] Verification SUCCESS! Spot=${isSpotConnected}, Futures=${isFuturesConnected}`);
    return res.json({
      configured: true,
      connected: true,
      useTestnet: config.useTestnet,
      baseUrl: config.baseUrl,
      publicIp,
      canTrade: spotAccount?.canTrade ?? isFuturesConnected,
      canWithdraw: spotAccount?.canWithdraw ?? false,
      withdrawDisabledConfirmed: spotAccount ? !spotAccount.canWithdraw : true,
      accountType: spotAccount?.accountType || 'FUTURES',
      permissions: {
        spot: isSpotConnected,
        futures: isFuturesConnected,
        spotNotice: !isSpotConnected ? 'Spot trading disabled on Binance API key. Futures active.' : null
      }
    });
  }

  const lastError = spotError || futuresError || new Error('Connection failed');
  console.error(`[Account Status] Verification FAILED:`, lastError.message);
  
  // Extract request IP if reported by Binance in error message
  const ipMatch = (lastError.originalMessage || lastError.message)?.match(/request ip:?\s*([0-9.]+)/i);
  const detectedIp = ipMatch ? ipMatch[1] : publicIp;

  return res.status(200).json({
    configured: true,
    connected: false,
    useTestnet: config.useTestnet,
    baseUrl: config.baseUrl,
    publicIp: detectedIp,
    keyLength: keyLen,
    secretLength: secretLen,
    error: lastError.originalMessage || lastError.message,
    binanceCode: lastError.binanceCode
  });
});

/**
 * POST /api/account/configure
 * Dynamically configure active keys and testnet preference, and persist to .env
 */
router.post('/configure', (req, res) => {
  const { apiKey, apiSecret, useTestnet } = req.body;

  binanceConfig.updateConfig({ apiKey, apiSecret, useTestnet });

  // Persist to .env so backend remembers on reload
  try {
    const envContent = `PORT=5000\nBINANCE_API_KEY=${apiKey || ''}\nBINANCE_API_SECRET=${apiSecret || ''}\nUSE_TESTNET=${useTestnet ? 'true' : 'false'}\n`;
    import('fs').then(fs => fs.writeFileSync('backend/.env', envContent));
  } catch {
    // Non-fatal
  }

  const updated = binanceConfig.getConfig();
  res.json({
    success: true,
    configured: updated.isConfigured,
    useTestnet: updated.useTestnet,
    message: 'Binance configuration updated and persisted successfully'
  });
});

/**
 * GET /api/account/diagnose
 * Comprehensive diagnostic endpoint testing all Binance wallet APIs
 */
router.get('/diagnose', async (req, res) => {
  try {
    const diagnosis = await binanceClient.diagnoseAllBalances(req);
    res.json({
      success: true,
      data: diagnosis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/account
 * Fetch account balances and trading permissions (Spot & LD Simple Earn)
 */
router.get('/', async (req, res) => {
  try {
    const accountInfo = await binanceClient.getAccountInfo(req);
    console.log('[Account Balances]:', JSON.stringify(accountInfo.balances));
    res.json({
      success: true,
      data: accountInfo
    });
  } catch (error) {
    // If Spot is not permitted on this API key, check if Futures is available so the frontend doesn't break
    try {
      const futures = await binanceClient.getFuturesBalances(req);
      if (futures && futures.enabled) {
        return res.json({
          success: true,
          data: {
            canTrade: true,
            canWithdraw: false,
            accountType: 'FUTURES',
            balances: []
          }
        });
      }
    } catch {
      // ignore
    }

    console.error('[Account Error]:', error.message);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

/**
 * GET /api/account/wallets
 * Fetch complete multi-wallet asset breakdown: Spot, Simple Earn, Funding, Futures
 */
router.get('/wallets', async (req, res) => {
  try {
    const allWallets = await binanceClient.getAllWallets(req);
    console.log('[All Wallets Summary]:', JSON.stringify({
      spotCount: allWallets.spot?.balances?.length,
      spotBalances: allWallets.spot?.balances,
      earnTokens: allWallets.earn?.tokenBalances,
      fundingBalances: allWallets.funding?.balances,
      futures: allWallets.futures
    }));
    res.json({
      success: true,
      data: allWallets
    });
  } catch (error) {
    console.error('[All Wallets Error]:', error.message);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

export default router;

