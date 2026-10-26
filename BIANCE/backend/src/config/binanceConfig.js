import dotenv from 'dotenv';
dotenv.config();

function sanitizeKey(val) {
  if (!val) return '';
  let str = String(val).trim();
  // Strip surrounding quotes if copied from .env or config
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.slice(1, -1).trim();
  }
  return str;
}

/**
 * Global Binance configuration state
 * - Public market data (tickers, klines, orderbook) routes to
 *   https://data-api.binance.vision (official global public mirror) with fallbacks
 * - Private trading requests route to testnet or live production clusters
 */
class BinanceConfig {
  constructor() {
    this.apiKey = sanitizeKey(process.env.BINANCE_API_KEY || '');
    this.apiSecret = sanitizeKey(process.env.BINANCE_API_SECRET || '');
    this.useTestnet = process.env.USE_TESTNET !== 'false'; // defaults to testnet for safety
    this.testnetUrl = 'https://testnet.binance.vision';
    this.productionUrls = [
      'https://api.binance.com',
      'https://api1.binance.com',
      'https://api2.binance.com',
      'https://api3.binance.com',
      'https://api.binance.me'
    ];
    this.publicDataUrls = [
      'https://data-api.binance.vision',
      'https://api.binance.com',
      'https://api1.binance.com',
      'https://api.binance.me'
    ];
  }

  updateConfig({ apiKey, apiSecret, useTestnet }) {
    if (apiKey !== undefined) this.apiKey = sanitizeKey(apiKey);
    if (apiSecret !== undefined) this.apiSecret = sanitizeKey(apiSecret);
    if (useTestnet !== undefined) this.useTestnet = Boolean(useTestnet);
  }

  getConfig(req = null) {
    const headerKey = req?.headers['x-binance-api-key'];
    const headerSecret = req?.headers['x-binance-api-secret'];
    const headerTestnet = req?.headers['x-binance-testnet'];

    const apiKey = sanitizeKey(headerKey || this.apiKey);
    const apiSecret = sanitizeKey(headerSecret || this.apiSecret);
    const useTestnet = headerTestnet !== undefined ? headerTestnet === 'true' : this.useTestnet;

    // For signed trading orders
    const baseUrl = useTestnet ? this.testnetUrl : this.productionUrls[0];
    const candidateUrls = useTestnet ? [this.testnetUrl] : this.productionUrls;

    // For public market data: ALWAYS use fast global CDN first
    const publicUrl = this.publicDataUrls[0];
    const candidatePublicUrls = this.publicDataUrls;

    return {
      apiKey,
      apiSecret,
      useTestnet,
      baseUrl,
      candidateUrls,
      publicUrl,
      candidatePublicUrls,
      isConfigured: Boolean(apiKey && apiSecret)
    };
  }
}

export const binanceConfig = new BinanceConfig();

