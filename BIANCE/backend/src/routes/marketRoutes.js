import express from 'express';
import { binanceClient } from '../services/binanceClient.js';

const router = express.Router();

const DEFAULT_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'DOGEUSDT', 
  'XRPUSDT', 'ADAUSDT', 'PEPEUSDT', 'SUIUSDT', 'AVAXUSDT', 
  'LINKUSDT', 'NEARUSDT', 'SHIBUSDT', 'DOTUSDT', 'TAOUSDT'
];

/**
 * GET /api/market/symbols
 * Returns active trading coins and pairs available on Binance
 * Query options:
 * - marketType: 'SPOT' | 'FUTURES' | 'ALL' (default: 'ALL')
 * - quoteAsset: 'USDT' (default), 'ALL', 'BTC', 'FDUSD', 'ETH'
 * - search: keyword search (e.g. 'PEPE', 'SOL')
 */
router.get('/symbols', async (req, res) => {
  try {
    const marketType = (req.query.marketType || 'ALL').toUpperCase();
    const quoteAsset = (req.query.quoteAsset || 'ALL').toUpperCase();
    const search = (req.query.search || '').toUpperCase().trim();

    let allSymbols = [];

    if (marketType === 'FUTURES') {
      allSymbols = await binanceClient.getFuturesExchangeInfo(req);
    } else if (marketType === 'SPOT') {
      allSymbols = await binanceClient.getExchangeInfo(req);
    } else {
      // 'ALL' - Fetch both Spot and Futures catalogs concurrently
      const [spotRes, futuresRes] = await Promise.allSettled([
        binanceClient.getExchangeInfo(req),
        binanceClient.getFuturesExchangeInfo(req)
      ]);
      const spotList = spotRes.status === 'fulfilled' ? spotRes.value : [];
      const futuresList = futuresRes.status === 'fulfilled' ? futuresRes.value : [];
      allSymbols = [...spotList, ...futuresList];
    }

    let filtered = allSymbols;

    if (quoteAsset !== 'ALL') {
      filtered = filtered.filter((s) => s.quoteAsset === quoteAsset);
    }

    if (search) {
      filtered = filtered.filter(
        (s) => s.symbol.includes(search) || (s.baseAsset && s.baseAsset.includes(search))
      );
    }

    res.json({
      success: true,
      total: filtered.length,
      marketType,
      quoteAsset,
      data: filtered
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/market/ticker
 * Returns 24-hr ticker price change statistics
 * Supports specific symbol, all tickers, or default watchlist
 */
router.get('/ticker', async (req, res) => {
  try {
    const { symbol, all, marketType = 'ALL' } = req.query;

    if (symbol) {
      const sym = symbol.toUpperCase();
      const isFutures = marketType.toUpperCase() === 'FUTURES' || sym.startsWith('1000') || sym.includes('_');

      if (isFutures) {
        try {
          const data = await binanceClient.getFuturesTicker24hr(sym, req);
          return res.json({ success: true, marketType: 'FUTURES', data });
        } catch {
          const data = await binanceClient.getTicker24hr(sym, req);
          return res.json({ success: true, marketType: 'SPOT', data });
        }
      } else {
        try {
          const data = await binanceClient.getTicker24hr(sym, req);
          return res.json({ success: true, marketType: 'SPOT', data });
        } catch {
          const data = await binanceClient.getFuturesTicker24hr(sym, req);
          return res.json({ success: true, marketType: 'FUTURES', data });
        }
      }
    }

    // Fetch all 24hr tickers from Binance
    if (marketType.toUpperCase() === 'FUTURES') {
      const futuresTickers = await binanceClient.getFuturesTicker24hr(null, req);
      return res.json({
        success: true,
        marketType: 'FUTURES',
        total: futuresTickers.length,
        data: futuresTickers
      });
    }

    if (all === 'true') {
      const [spotRes, futuresRes] = await Promise.allSettled([
        binanceClient.getTicker24hr(null, req),
        binanceClient.getFuturesTicker24hr(null, req)
      ]);
      const spotTickers = spotRes.status === 'fulfilled' ? spotRes.value : [];
      const futuresTickers = futuresRes.status === 'fulfilled' ? futuresRes.value : [];
      
      const combinedMap = new Map();
      futuresTickers.forEach((t) => { if (t && t.symbol) combinedMap.set(t.symbol, t); });
      spotTickers.forEach((t) => { if (t && t.symbol && !combinedMap.has(t.symbol)) combinedMap.set(t.symbol, t); });

      const combined = Array.from(combinedMap.values());

      return res.json({
        success: true,
        total: combined.length,
        data: combined
      });
    }

    // Default: return top watchlist
    const allTickers = await binanceClient.getTicker24hr(null, req);
    const watchlistTickers = allTickers.filter((t) => DEFAULT_SYMBOLS.includes(t.symbol));

    res.json({
      success: true,
      data: watchlistTickers
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/market/klines
 * Returns candlestick data for charts
 * Query: symbol, interval (1m, 5m, 15m, 1h, 4h, 1d), limit (default: 100), marketType
 */
router.get('/klines', async (req, res) => {
  try {
    const symbol = (req.query.symbol || 'BTCUSDT').toUpperCase();
    const interval = req.query.interval || '1h';
    const limit = parseInt(req.query.limit, 10) || 100;
    const marketType = (req.query.marketType || 'SPOT').toUpperCase();

    const klines = await binanceClient.getKlines(symbol, interval, limit, req, marketType);

    res.json({
      success: true,
      symbol,
      interval,
      marketType,
      data: klines
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/market/orderbook
 * Returns order book depth bids and asks
 */
router.get('/orderbook', async (req, res) => {
  try {
    const symbol = (req.query.symbol || 'BTCUSDT').toUpperCase();
    const limit = parseInt(req.query.limit, 10) || 15;
    const marketType = (req.query.marketType || 'SPOT').toUpperCase();

    const depth = await binanceClient.getOrderBook(symbol, limit, req, marketType);

    const bids = (depth?.bids || []).map(([price, qty]) => ({ price: parseFloat(price), qty: parseFloat(qty) }));
    const asks = (depth?.asks || []).map(([price, qty]) => ({ price: parseFloat(price), qty: parseFloat(qty) }));

    res.json({
      success: true,
      symbol,
      marketType,
      bids,
      asks
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
