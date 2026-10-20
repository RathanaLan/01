import crypto from 'crypto';
import https from 'https';
import dns from 'dns';
import axios from 'axios';
import { binanceConfig } from '../config/binanceConfig.js';

// Configure public DNS resolvers (Cloudflare 1.1.1.1, Google 8.8.8.8) to bypass regional ISP DNS blocks
try {
  dns.setServers(['1.1.1.1', '8.8.8.8', '1.0.0.1', '8.8.4.4']);
} catch (e) {
  console.warn('[BinanceClient] Could not set custom DNS servers:', e.message);
}

// In-memory DNS cache to avoid repeated DNS resolution delays (TTL: 5 minutes)
const dnsCache = new Map();

function customLookup(hostname, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const cached = dnsCache.get(hostname);
  const now = Date.now();
  if (cached && (now - cached.timestamp < 5 * 60 * 1000)) {
    if (options && options.all) {
      return callback(null, [{ address: cached.ip, family: 4 }]);
    }
    return callback(null, cached.ip, 4);
  }

  // Use dns.resolve4 with public DNS resolvers (1.1.1.1, 8.8.8.8)
  dns.resolve4(hostname, (err, addresses) => {
    if (!err && addresses && addresses.length > 0) {
      const ip = addresses[Math.floor(Math.random() * addresses.length)];
      dnsCache.set(hostname, { ip, timestamp: now });
      if (options && options.all) {
        return callback(null, [{ address: ip, family: 4 }]);
      }
      return callback(null, ip, 4);
    }

    // Fallback to default OS lookup if dns.resolve4 fails
    dns.lookup(hostname, options, callback);
  });
}

// Custom HTTPS agent bypassing ISP censorship and maintaining HTTP keepalive
const httpsAgent = new https.Agent({
  lookup: customLookup,
  keepAlive: true,
  timeout: 10000
});

const httpClient = axios.create({
  httpsAgent,
  timeout: 15000
});

/**
 * Binance REST API Client
 * Handles authenticated HMAC SHA-256 signatures, timestamp synchronization,
 * and standard Binance REST endpoints.
 *
 * CRITICAL SECURITY REMINDER:
 * - When creating Binance API keys, only enable "Read" and "Enable Spot & Margin Trading".
 * - STRICTLY DISABLE "Enable Withdrawals" to ensure funds can never be transferred out via API.
 */
class BinanceClient {
  constructor() {
    this.exchangeInfoCache = null;
    this.exchangeInfoCacheTime = 0;
    this.timeOffset = 0;
    this.lastTimeSync = 0;
  }

  /**
   * Sync server time with Binance to avoid recvWindow errors (code -1021)
   */
  async syncTime() {
    const now = Date.now();
    if (now - this.lastTimeSync < 15 * 60 * 1000 && this.lastTimeSync !== 0) {
      return this.timeOffset;
    }
    try {
      const start = Date.now();
      const res = await httpClient.get('https://data-api.binance.vision/api/v3/time', { timeout: 5000 });
      const latency = Math.floor((Date.now() - start) / 2);
      this.timeOffset = (res.data.serverTime - latency) - Date.now();
      this.lastTimeSync = Date.now();
    } catch {
      // Keep existing offset if sync fails
    }
    return this.timeOffset;
  }

  /**
   * Generates HMAC-SHA256 signature required by Binance for authenticated endpoints
   */
  signQuery(queryString, secret) {
    return crypto
      .createHmac('sha256', secret)
      .update(queryString)
      .digest('hex');
  }

  /**
   * Helper to make public requests with automatic domain mirror fallback
   */
  async makePublicRequest(endpoint, params = {}, req = null, customBaseUrl = null) {
    const { candidatePublicUrls, publicUrl } = binanceConfig.getConfig(req);
    const urls = customBaseUrl ? [customBaseUrl] : (candidatePublicUrls && candidatePublicUrls.length > 0 ? candidatePublicUrls : [publicUrl]);

    let lastError = null;
    for (const targetUrl of urls) {
      try {
        const response = await httpClient.get(`${targetUrl}${endpoint}`, {
          params,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        lastError = error;
        // If Binance responded with an HTTP status (like 400 Bad Request), don't retry mirrors
        if (error.response) break;
      }
    }

    this.handleApiError(lastError, `Public API error at ${endpoint}`);
  }

  /**
   * Helper to make signed requests (GET, POST, DELETE) with mirror fallback
   */
  async makeSignedRequest(endpoint, method = 'GET', data = {}, req = null, customBaseUrl = null) {
    const { apiKey, apiSecret, candidateUrls, baseUrl, isConfigured } = binanceConfig.getConfig(req);

    if (!isConfigured) {
      throw new Error(
        'Binance API credentials missing. Please set your API Key & Secret in Settings or .env file.'
      );
    }

    await this.syncTime();
    const timestamp = Date.now() + this.timeOffset;
    const recvWindow = 10000; // 10s tolerance for clock drift

    const queryParams = {
      ...data,
      recvWindow,
      timestamp
    };

    // Serialize query string in predictable order
    const queryString = Object.keys(queryParams)
      .filter((key) => queryParams[key] !== undefined && queryParams[key] !== null && queryParams[key] !== '')
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const signature = this.signQuery(queryString, apiSecret);
    const fullQuery = `${queryString}&signature=${signature}`;

    const headers = {
      'X-MBX-APIKEY': apiKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const urls = customBaseUrl ? [customBaseUrl] : (candidateUrls && candidateUrls.length > 0 ? candidateUrls : [baseUrl]);

    let lastError = null;
    for (const url of urls) {
      try {
        let response;
        if (method.toUpperCase() === 'GET') {
          response = await httpClient.get(`${url}${endpoint}?${fullQuery}`, { headers });
        } else if (method.toUpperCase() === 'POST') {
          response = await httpClient.post(`${url}${endpoint}?${fullQuery}`, null, { headers });
        } else if (method.toUpperCase() === 'DELETE') {
          response = await httpClient.delete(`${url}${endpoint}?${fullQuery}`, { headers });
        }
        return response.data;
      } catch (error) {
        lastError = error;
        // If Binance itself answered with an error status, do not keep spamming alternate mirrors
        if (error.response) break;
      }
    }

    this.handleApiError(lastError, `Signed request error at ${endpoint}`);
  }

  handleApiError(error, contextMessage) {
    if (error?.response) {
      const { status, data } = error.response;
      const binanceCode = data?.code;
      const binanceMsg = data?.msg || error.message;

      let enhancedMessage = `[Binance ${status}] ${binanceMsg}`;

      // Helpful common Binance error explanations
      if (binanceCode === -2015) {
        enhancedMessage = binanceMsg || 'Invalid API-key, IP, or permissions for action. Check your API key, secret, and Testnet/Live mode.';
      } else if (binanceCode === -1021) {
        enhancedMessage = 'Timestamp for this request is outside of the recvWindow. Sync your system clock.';
      } else if (binanceCode === -2010) {
        enhancedMessage = 'Account has insufficient balance for this trade.';
      } else if (binanceCode === -1013) {
        enhancedMessage = `Filter failure: ${binanceMsg} (Check minimum order quantity or step size).`;
      }

      const customErr = new Error(enhancedMessage);
      customErr.status = status;
      customErr.binanceCode = binanceCode;
      customErr.originalMessage = binanceMsg;
      throw customErr;
    }
    throw new Error(`${contextMessage}: ${error?.message || 'Unknown network error'}`);
  }

  // --- PUBLIC ENDPOINTS ---

  async ping(req = null) {
    return this.makePublicRequest('/api/v3/ping', {}, req);
  }

  async getServerTime(req = null) {
    return this.makePublicRequest('/api/v3/time', {}, req);
  }

  async getExchangeInfo(req = null) {
    const now = Date.now();
    if (this.exchangeInfoCache && (now - this.exchangeInfoCacheTime < 30 * 60 * 1000)) {
      return this.exchangeInfoCache;
    }

    const data = await this.makePublicRequest('/api/v3/exchangeInfo', {}, req);
    
    // Filter active TRADING symbols and format clean list
    const activeSymbols = (data.symbols || [])
      .filter((s) => s.status === 'TRADING' && s.isSpotTradingAllowed !== false)
      .map((s) => ({
        symbol: s.symbol,
        baseAsset: s.baseAsset,
        quoteAsset: s.quoteAsset,
        status: s.status,
        baseAssetPrecision: s.baseAssetPrecision,
        quotePrecision: s.quotePrecision,
        marketType: 'SPOT'
      }));

    this.exchangeInfoCache = activeSymbols;
    this.exchangeInfoCacheTime = now;
    return activeSymbols;
  }

  /**
   * Fetch USDT-M Futures exchange specifications (Perpetual contracts)
   */
  async getFuturesExchangeInfo(req = null) {
    const now = Date.now();
    if (this.futuresExchangeInfoCache && (now - this.futuresExchangeInfoCacheTime < 30 * 60 * 1000)) {
      return this.futuresExchangeInfoCache;
    }

    const data = await this.makePublicRequest('/fapi/v1/exchangeInfo', {}, req, 'https://fapi.binance.com');
    const activeSymbols = (data.symbols || [])
      .filter((s) => s.status === 'TRADING' && s.contractType === 'PERPETUAL')
      .map((s) => ({
        symbol: s.symbol,
        baseAsset: s.baseAsset,
        quoteAsset: s.quoteAsset,
        status: s.status,
        contractType: s.contractType,
        pricePrecision: s.pricePrecision,
        quantityPrecision: s.quantityPrecision,
        marketType: 'FUTURES'
      }));

    this.futuresExchangeInfoCache = activeSymbols;
    this.futuresExchangeInfoCacheTime = now;
    return activeSymbols;
  }

  async getTicker24hr(symbol = null, req = null) {
    const params = symbol ? { symbol: symbol.toUpperCase() } : {};
    return this.makePublicRequest('/api/v3/ticker/24hr', params, req);
  }

  async getFuturesTicker24hr(symbol = null, req = null) {
    const params = symbol ? { symbol: symbol.toUpperCase() } : {};
    return this.makePublicRequest('/fapi/v1/ticker/24hr', params, req, 'https://fapi.binance.com');
  }

  async getPrice(symbol, req = null) {
    return this.makePublicRequest('/api/v3/ticker/price', { symbol: symbol.toUpperCase() }, req);
  }

  async getKlines(symbol = 'BTCUSDT', interval = '1h', limit = 100, req = null, marketType = 'SPOT') {
    let data = null;
    const isFutures = marketType === 'FUTURES' || symbol.startsWith('1000') || symbol.includes('_');

    if (isFutures) {
      try {
        data = await this.makePublicRequest(
          '/fapi/v1/klines',
          { symbol: symbol.toUpperCase(), interval, limit },
          req,
          'https://fapi.binance.com'
        );
      } catch {
        // Fallback to spot klines if futures fails
        data = await this.makePublicRequest('/api/v3/klines', { symbol: symbol.toUpperCase(), interval, limit }, req);
      }
    } else {
      try {
        data = await this.makePublicRequest('/api/v3/klines', { symbol: symbol.toUpperCase(), interval, limit }, req);
      } catch {
        // Fallback to futures klines if spot fails
        data = await this.makePublicRequest(
          '/fapi/v1/klines',
          { symbol: symbol.toUpperCase(), interval, limit },
          req,
          'https://fapi.binance.com'
        );
      }
    }

    // Format Kline raw array to structured objects
    // Binance format: [openTime, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, ...]
    return (data || []).map((k) => ({
      time: Math.floor(k[0] / 1000), // UNIX timestamp in seconds
      openTime: k[0],
      open: parseFloat(k[1]),
      high: parseFloat(k[2]),
      low: parseFloat(k[3]),
      close: parseFloat(k[4]),
      volume: parseFloat(k[5]),
      closeTime: k[6],
      quoteVolume: parseFloat(k[7]),
      trades: k[8]
    }));
  }

  async getOrderBook(symbol = 'BTCUSDT', limit = 20, req = null, marketType = 'SPOT') {
    const isFutures = marketType === 'FUTURES' || symbol.startsWith('1000') || symbol.includes('_');
    if (isFutures) {
      try {
        return await this.makePublicRequest('/fapi/v1/depth', { symbol: symbol.toUpperCase(), limit }, req, 'https://fapi.binance.com');
      } catch {
        return await this.makePublicRequest('/api/v3/depth', { symbol: symbol.toUpperCase(), limit }, req);
      }
    } else {
      try {
        return await this.makePublicRequest('/api/v3/depth', { symbol: symbol.toUpperCase(), limit }, req);
      } catch {
        return await this.makePublicRequest('/fapi/v1/depth', { symbol: symbol.toUpperCase(), limit }, req, 'https://fapi.binance.com');
      }
    }
  }

  // --- SIGNED AUTHENTICATED ENDPOINTS ---

  async getAccountInfo(req = null) {
    const data = await this.makeSignedRequest('/api/v3/account', 'GET', {}, req);
    
    // Filter non-zero balances for clean display
    const nonZeroBalances = (data.balances || [])
      .map((b) => ({
        asset: b.asset,
        free: parseFloat(b.free),
        locked: parseFloat(b.locked),
        total: parseFloat(b.free) + parseFloat(b.locked)
      }))
      .filter((b) => b.total > 0.000001);

    return {
      makerCommission: data.makerCommission,
      takerCommission: data.takerCommission,
      buyerCommission: data.buyerCommission,
      sellerCommission: data.sellerCommission,
      canTrade: data.canTrade,
      canWithdraw: data.canWithdraw,
      canDeposit: data.canDeposit,
      accountType: data.accountType,
      updateTime: data.updateTime,
      balances: nonZeroBalances
    };
  }

  async getOpenOrders(symbol = null, req = null) {
    const params = symbol ? { symbol: symbol.toUpperCase() } : {};
    return this.makeSignedRequest('/api/v3/openOrders', 'GET', params, req);
  }

  async getAllOrders(symbol, limit = 50, req = null) {
    return this.makeSignedRequest('/api/v3/allOrders', 'GET', { symbol: symbol.toUpperCase(), limit }, req);
  }

  async getMyTrades(symbol, limit = 50, req = null) {
    return this.makeSignedRequest('/api/v3/myTrades', 'GET', { symbol: symbol.toUpperCase(), limit }, req);
  }

  /**
   * Place a new order
   * @param {Object} orderParams
   * @param {string} orderParams.symbol - e.g. "BTCUSDT"
   * @param {string} orderParams.side - "BUY" or "SELL"
   * @param {string} orderParams.type - "LIMIT" or "MARKET"
   * @param {number|string} orderParams.quantity - base asset amount
   * @param {number|string} [orderParams.price] - limit price (required for LIMIT)
   * @param {string} [orderParams.timeInForce] - "GTC", "IOC", "FOK" (defaults to "GTC" for LIMIT)
   */
  async createOrder({ symbol, side, type, quantity, price, timeInForce = 'GTC' }, req = null) {
    const params = {
      symbol: symbol.toUpperCase(),
      side: side.toUpperCase(),
      type: type.toUpperCase(),
      quantity: quantity.toString()
    };

    if (type.toUpperCase() === 'LIMIT') {
      if (!price) throw new Error('Price is required for LIMIT orders');
      params.price = price.toString();
      params.timeInForce = timeInForce;
    }

    return this.makeSignedRequest('/api/v3/order', 'POST', params, req);
  }

  /**
   * Set USDT-M Futures Leverage
   */
  async setFuturesLeverage(symbol, leverage = 5, req = null) {
    return this.makeSignedRequest(
      '/fapi/v1/leverage',
      'POST',
      {
        symbol: symbol.toUpperCase(),
        leverage: parseInt(leverage, 10)
      },
      req,
      'https://fapi.binance.com'
    );
  }

  /**
   * Place a USDT-M Futures Order
   * @param {Object} orderParams
   * @param {string} orderParams.symbol - e.g. "BTCUSDT"
   * @param {string} orderParams.side - "BUY" or "SELL"
   * @param {string} [orderParams.type] - "MARKET" or "LIMIT"
   * @param {number|string} orderParams.quantity
   * @param {number|string} [orderParams.price]
   * @param {boolean} [orderParams.reduceOnly]
   */
  async createFuturesOrder({ symbol, side, type = 'MARKET', quantity, price = null, reduceOnly = false }, req = null) {
    const params = {
      symbol: symbol.toUpperCase(),
      side: side.toUpperCase(),
      type: type.toUpperCase(),
      quantity: quantity.toString()
    };

    if (reduceOnly) {
      params.reduceOnly = 'true';
    }

    if (type.toUpperCase() === 'LIMIT') {
      if (!price) throw new Error('Price is required for LIMIT futures orders');
      params.price = price.toString();
      params.timeInForce = 'GTC';
    }

    return this.makeSignedRequest('/fapi/v1/order', 'POST', params, req, 'https://fapi.binance.com');
  }

  async cancelOrder(symbol, orderId, req = null) {
    return this.makeSignedRequest(
      '/api/v3/order',
      'DELETE',
      {
        symbol: symbol.toUpperCase(),
        orderId
      },
      req
    );
  }

  /**
   * Fetch Funding Wallet assets
   */
  async getFundingBalances(req = null) {
    try {
      const data = await this.makeSignedRequest('/sapi/v1/asset/get-funding-asset', 'POST', { needBtcValuation: 'true' }, req);
      const list = Array.isArray(data) ? data : [];
      return list
        .map((b) => ({
          asset: b.asset,
          free: parseFloat(b.free || 0),
          locked: parseFloat(b.locked || 0),
          freeze: parseFloat(b.freeze || 0),
          total: parseFloat(b.free || 0) + parseFloat(b.locked || 0) + parseFloat(b.freeze || 0),
          btcValuation: parseFloat(b.btcValuation || 0)
        }))
        .filter((b) => b.total > 0.000001);
    } catch {
      return [];
    }
  }

  /**
   * Fetch USDT-M Futures Account & Balances
   */
  async getFuturesBalances(req = null) {
    try {
      const [accountRes, posRiskRes, premiumRes] = await Promise.allSettled([
        this.makeSignedRequest('/fapi/v2/account', 'GET', {}, req, 'https://fapi.binance.com'),
        this.makeSignedRequest('/fapi/v2/positionRisk', 'GET', {}, req, 'https://fapi.binance.com'),
        this.makePublicRequest('/fapi/v1/premiumIndex', {}, req, 'https://fapi.binance.com')
      ]);

      if (accountRes.status !== 'fulfilled') {
        throw accountRes.reason;
      }

      const data = accountRes.value;

      // Map positionRisk by symbol for direct markPrice & liquidationPrice
      const posRiskMap = new Map();
      if (posRiskRes.status === 'fulfilled' && Array.isArray(posRiskRes.value)) {
        posRiskRes.value.forEach((pr) => {
          if (pr && pr.symbol) posRiskMap.set(pr.symbol, pr);
        });
      }

      // Map premiumIndex by symbol for official real-time markPrice
      const premiumMap = new Map();
      if (premiumRes.status === 'fulfilled' && Array.isArray(premiumRes.value)) {
        premiumRes.value.forEach((pi) => {
          if (pi && pi.symbol) premiumMap.set(pi.symbol, parseFloat(pi.markPrice || 0));
        });
      }

      const nonZeroAssets = (data.assets || [])
        .map((a) => ({
          asset: a.asset,
          walletBalance: parseFloat(a.walletBalance || 0),
          unrealizedProfit: parseFloat(a.unrealizedProfit || 0),
          marginBalance: parseFloat(a.marginBalance || 0),
          availableBalance: parseFloat(a.availableBalance || 0)
        }))
        .filter((a) => a.marginBalance > 0.000001 || a.walletBalance > 0.000001);

      const activePositions = (data.positions || [])
        .filter((p) => Math.abs(parseFloat(p.positionAmt || 0)) > 0.000001)
        .map((p) => {
          const pr = posRiskMap.get(p.symbol);
          const amt = parseFloat(p.positionAmt);
          const entry = parseFloat(p.entryPrice);
          const pnl = parseFloat(p.unrealizedProfit);

          // Priority 1: positionRisk markPrice
          // Priority 2: premiumIndex official markPrice
          // Priority 3: derived markPrice: entryPrice + (unrealizedProfit / positionAmt)
          let mark = 0;
          if (pr && parseFloat(pr.markPrice) > 0) {
            mark = parseFloat(pr.markPrice);
          } else if (premiumMap.has(p.symbol) && premiumMap.get(p.symbol) > 0) {
            mark = premiumMap.get(p.symbol);
          } else if (amt !== 0) {
            mark = entry + (pnl / amt);
          }

          const liqPrice = pr && parseFloat(pr.liquidationPrice) > 0 ? parseFloat(pr.liquidationPrice) : 0;

          return {
            symbol: p.symbol,
            positionAmt: amt,
            entryPrice: entry,
            markPrice: mark,
            liquidationPrice: liqPrice,
            unRealizedProfit: pnl,
            leverage: parseInt(p.leverage, 10),
            isolated: p.isolated
          };
        });

      return {
        enabled: true,
        totalWalletBalance: parseFloat(data.totalWalletBalance || 0),
        totalUnrealizedProfit: parseFloat(data.totalUnrealizedProfit || 0),
        totalMarginBalance: parseFloat(data.totalMarginBalance || 0),
        availableBalance: parseFloat(data.availableBalance || 0),
        assets: nonZeroAssets,
        positions: activePositions
      };
    } catch (e) {
      return {
        enabled: false,
        totalWalletBalance: 0,
        totalUnrealizedProfit: 0,
        totalMarginBalance: 0,
        availableBalance: 0,
        assets: [],
        positions: [],
        note: e.originalMessage || e.message
      };
    }
  }

  /**
   * Fetch Simple Earn (Flexible & Locked Savings)
   */
  async getSimpleEarnBalances(req = null) {
    try {
      const accountRes = await this.makeSignedRequest('/sapi/v1/simple-earn/account', 'GET', {}, req).catch(() => null);
      const flexiblePositionsRes = await this.makeSignedRequest('/sapi/v1/simple-earn/flexible/position', 'GET', { size: 100 }, req).catch(() => null);
      const lockedPositionsRes = await this.makeSignedRequest('/sapi/v1/simple-earn/locked/position', 'GET', { size: 100 }, req).catch(() => null);

      const flexibleList = (flexiblePositionsRes?.rows || []).map((p) => ({
        asset: p.asset,
        totalAmount: parseFloat(p.totalAmount || 0),
        freeAmount: parseFloat(p.freeAmount || 0),
        annualPercentageRate: parseFloat(p.tierAnnualPercentageRate?.['0-500'] || p.latestAnnualPercentageRate || 0) * 100
      }));

      const lockedList = (lockedPositionsRes?.rows || []).map((p) => ({
        asset: p.asset,
        totalAmount: parseFloat(p.amount || 0),
        duration: p.duration,
        projectTitle: p.projectTitle
      }));

      return {
        enabled: true,
        totalAmountInUSDT: parseFloat(accountRes?.totalAmountInUSDT || 0),
        totalFlexibleAmountInUSDT: parseFloat(accountRes?.totalFlexibleAmountInUSDT || 0),
        totalLockedInUSDT: parseFloat(accountRes?.totalLockedInUSDT || 0),
        flexiblePositions: flexibleList,
        lockedPositions: lockedList
      };
    } catch {
      return {
        enabled: false,
        totalAmountInUSDT: 0,
        totalFlexibleAmountInUSDT: 0,
        totalLockedInUSDT: 0,
        flexiblePositions: [],
        lockedPositions: []
      };
    }
  }

  /**
   * Fetch all wallets combined: Spot, Simple Earn, Funding, Futures
   */
  async getAllWallets(req = null) {
    const [spotRes, fundingRes, futuresRes, earnRes] = await Promise.allSettled([
      this.getAccountInfo(req),
      this.getFundingBalances(req),
      this.getFuturesBalances(req),
      this.getSimpleEarnBalances(req)
    ]);

    const spot = spotRes.status === 'fulfilled' ? spotRes.value : { balances: [] };
    const funding = fundingRes.status === 'fulfilled' ? fundingRes.value : [];
    const futures = futuresRes.status === 'fulfilled' ? futuresRes.value : { enabled: false, assets: [], positions: [] };
    const earn = earnRes.status === 'fulfilled' ? earnRes.value : { enabled: false, flexiblePositions: [], lockedPositions: [] };

    // Separate pure Spot from LD-prefixed Simple Earn in the spot account
    const pureSpotBalances = (spot.balances || []).filter((b) => !b.asset.startsWith('LD'));
    const spotEarnBalances = (spot.balances || []).filter((b) => b.asset.startsWith('LD'));

    return {
      spot: {
        accountType: spot.accountType || 'SPOT',
        canTrade: spot.canTrade,
        balances: pureSpotBalances
      },
      earn: {
        ...earn,
        tokenBalances: spotEarnBalances // LD tokens found in spot wallet
      },
      funding: {
        balances: funding
      },
      futures
    };
  }

  /**
   * Diagnostic inspector that queries all wallet endpoints on Binance
   */
  async diagnoseAllBalances(req = null) {
    const results = {};

    // 1. User Wallet Balance summary (Binance official overview)
    try {
      results.walletSummary = await this.makeSignedRequest('/sapi/v1/asset/wallet/balance', 'GET', {}, req);
    } catch (e) {
      results.walletSummaryError = e.message;
    }

    // 2. Spot account
    try {
      const spot = await this.makeSignedRequest('/api/v3/account', 'GET', {}, req);
      results.spotBalances = (spot.balances || []).filter(b => parseFloat(b.free) + parseFloat(b.locked) > 0.000001);
    } catch (e) {
      results.spotAccountError = e.message;
    }

    // 3. User Asset (POST /sapi/v3/asset/getUserAsset)
    try {
      const userAssets = await this.makeSignedRequest('/sapi/v3/asset/getUserAsset', 'POST', { needBtcValuation: 'true' }, req);
      results.userAssetList = (userAssets || []).filter(b => parseFloat(b.free || 0) + parseFloat(b.locked || 0) + parseFloat(b.freeze || 0) > 0.000001);
    } catch (e) {
      results.userAssetError = e.message;
    }

    // 4. Funding wallet
    try {
      const funding = await this.makeSignedRequest('/sapi/v1/asset/get-funding-asset', 'POST', { needBtcValuation: 'true' }, req);
      results.fundingList = (funding || []).filter(b => parseFloat(b.free || 0) + parseFloat(b.locked || 0) + parseFloat(b.freeze || 0) > 0.000001);
    } catch (e) {
      results.fundingAssetError = e.message;
    }

    // 5. USDT-M Futures
    try {
      const usdtFutures = await this.makeSignedRequest('/fapi/v2/account', 'GET', {}, req, 'https://fapi.binance.com');
      results.usdtFutures = {
        totalWalletBalance: usdtFutures.totalWalletBalance,
        totalUnrealizedProfit: usdtFutures.totalUnrealizedProfit,
        totalMarginBalance: usdtFutures.totalMarginBalance,
        assets: (usdtFutures.assets || []).filter(a => parseFloat(a.walletBalance || 0) > 0.000001),
        positions: (usdtFutures.positions || []).filter(p => Math.abs(parseFloat(p.positionAmt || 0)) > 0.000001)
      };
    } catch (e) {
      results.usdtFuturesError = e.message;
    }

    // 6. Coin-M Futures
    try {
      const coinFutures = await this.makeSignedRequest('/dapi/v1/account', 'GET', {}, req, 'https://dapi.binance.com');
      results.coinFutures = {
        assets: (coinFutures.assets || []).filter(a => parseFloat(a.walletBalance || 0) > 0.000001),
        positions: (coinFutures.positions || []).filter(p => Math.abs(parseFloat(p.positionAmt || 0)) > 0.000001)
      };
    } catch (e) {
      results.coinFuturesError = e.message;
    }

    // 7. Simple Earn Account
    try {
      results.simpleEarnAccount = await this.makeSignedRequest('/sapi/v1/simple-earn/account', 'GET', {}, req);
    } catch (e) {
      results.simpleEarnAccountError = e.message;
    }

    return results;
  }
}

export const binanceClient = new BinanceClient();
