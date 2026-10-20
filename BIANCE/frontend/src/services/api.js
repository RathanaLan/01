/**
 * Frontend API Service Layer
 * Automatically manages local encrypted/session storage of API credentials
 * and attaches them to headers for authenticated endpoints.
 */

const STORAGE_KEYS = {
  API_KEY: 'nexus_binance_api_key',
  API_SECRET: 'nexus_binance_api_secret',
  USE_TESTNET: 'nexus_binance_use_testnet'
};

export const getStoredCredentials = () => {
  const apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  const apiSecret = localStorage.getItem(STORAGE_KEYS.API_SECRET) || '';
  const useTestnet = localStorage.getItem(STORAGE_KEYS.USE_TESTNET) !== 'false'; // default true
  return { apiKey, apiSecret, useTestnet };
};

export const saveStoredCredentials = ({ apiKey, apiSecret, useTestnet }) => {
  if (apiKey !== undefined) localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey.trim());
  if (apiSecret !== undefined) localStorage.setItem(STORAGE_KEYS.API_SECRET, apiSecret.trim());
  if (useTestnet !== undefined) localStorage.setItem(STORAGE_KEYS.USE_TESTNET, String(useTestnet));
};

export const clearStoredCredentials = () => {
  localStorage.removeItem(STORAGE_KEYS.API_KEY);
  localStorage.removeItem(STORAGE_KEYS.API_SECRET);
};

const getRequestHeaders = () => {
  const { apiKey, apiSecret, useTestnet } = getStoredCredentials();
  const headers = {
    'Content-Type': 'application/json'
  };

  if (apiKey) headers['x-binance-api-key'] = apiKey;
  if (apiSecret) headers['x-binance-api-secret'] = apiSecret;
  headers['x-binance-testnet'] = String(useTestnet);

  return headers;
};

// Generic API fetch wrapper
const apiFetch = async (url, options = {}) => {
  const headers = {
    ...getRequestHeaders(),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
};

// --- ACCOUNT & AUTH ---

export const getAccountStatus = async () => {
  return apiFetch('/api/account/status');
};

export const syncBackendConfig = async (config) => {
  return apiFetch('/api/account/configure', {
    method: 'POST',
    body: JSON.stringify(config)
  });
};

export const getAccountInfo = async () => {
  return apiFetch('/api/account');
};

export const getAllWallets = async () => {
  return apiFetch('/api/account/wallets');
};

// --- MARKET DATA ---

export const getAvailableSymbols = async (quoteAsset = 'ALL', search = '', marketType = 'ALL') => {
  const params = new URLSearchParams();
  if (quoteAsset) params.append('quoteAsset', quoteAsset);
  if (search) params.append('search', search);
  if (marketType) params.append('marketType', marketType);
  return apiFetch(`/api/market/symbols?${params.toString()}`);
};

export const getAllTickers = async (marketType = 'ALL') => {
  return apiFetch(`/api/market/ticker?all=true&marketType=${marketType}`);
};

export const getMarketTickers = async (symbol = null, marketType = 'ALL') => {
  const params = new URLSearchParams();
  if (symbol) params.append('symbol', symbol);
  if (marketType) params.append('marketType', marketType);
  const q = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/api/market/ticker${q}`);
};

export const getKlines = async (symbol = 'BTCUSDT', interval = '1h', limit = 100, marketType = 'SPOT') => {
  return apiFetch(`/api/market/klines?symbol=${symbol}&interval=${interval}&limit=${limit}&marketType=${marketType}`);
};

export const getOrderBook = async (symbol = 'BTCUSDT', limit = 15, marketType = 'SPOT') => {
  return apiFetch(`/api/market/orderbook?symbol=${symbol}&limit=${limit}&marketType=${marketType}`);
};

// --- PREDICTION & SIGNALS ---

export const getPrediction = async (symbol = 'BTCUSDT', interval = '1h') => {
  return apiFetch(`/api/analysis/predict/${symbol}?interval=${interval}`);
};

export const getMarketSignals = async (interval = '1h') => {
  return apiFetch(`/api/analysis/market-signals?interval=${interval}`);
};

// --- ORDERS & TRADING ---

export const getOpenOrders = async (symbol = null) => {
  const query = symbol ? `?symbol=${symbol}` : '';
  return apiFetch(`/api/orders/open${query}`);
};

export const getMyTrades = async (symbol = 'BTCUSDT', limit = 50) => {
  return apiFetch(`/api/orders/history?symbol=${symbol}&limit=${limit}`);
};

export const placeOrder = async ({ symbol, side, type, quantity, price, timeInForce }) => {
  return apiFetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({
      symbol,
      side,
      type,
      quantity,
      price,
      timeInForce
    })
  });
};

export const placeFuturesOrder = async ({ symbol, side, type, quantity, price, leverage }) => {
  return apiFetch('/api/orders/futures', {
    method: 'POST',
    body: JSON.stringify({
      symbol,
      side,
      type,
      quantity,
      price,
      leverage
    })
  });
};

export const cancelOrder = async (symbol, orderId) => {
  return apiFetch(`/api/orders/${symbol}/${orderId}`, {
    method: 'DELETE'
  });
};

// --- FUTURES PORTFOLIO CONTROLS ---

export const adjustFuturesLeverage = async (symbol, leverage) => {
  return apiFetch('/api/orders/futures/leverage', {
    method: 'POST',
    body: JSON.stringify({ symbol, leverage })
  });
};

export const closeFuturesPosition = async ({ symbol, positionAmt, side }) => {
  return apiFetch('/api/orders/futures/close', {
    method: 'POST',
    body: JSON.stringify({ symbol, positionAmt, side })
  });
};

// --- AUTO TRADING BOT SESSION ---

export const getBotStatus = async () => {
  return apiFetch('/api/bot/status');
};

export const startBotSession = async (config) => {
  return apiFetch('/api/bot/start', {
    method: 'POST',
    body: JSON.stringify(config)
  });
};

export const pauseBotSession = async () => {
  return apiFetch('/api/bot/pause', {
    method: 'POST'
  });
};

export const stopBotSession = async (closePositions = false) => {
  return apiFetch('/api/bot/stop', {
    method: 'POST',
    body: JSON.stringify({ closePositions })
  });
};

export const closeBotPosition = async (positionId) => {
  return apiFetch('/api/bot/close-position', {
    method: 'POST',
    body: JSON.stringify({ positionId })
  });
};

export const emergencyCloseAllBotPositions = async () => {
  return apiFetch('/api/bot/close-all', {
    method: 'POST'
  });
};

export const getBotTradeHistory = async () => {
  return apiFetch('/api/bot/history');
};

export const getBotLogs = async () => {
  return apiFetch('/api/bot/logs');
};

export const resetBotMetrics = async () => {
  return apiFetch('/api/bot/reset', {
    method: 'POST'
  });
};

