import express from 'express';
import { binanceClient } from '../services/binanceClient.js';
import { PredictionEngine } from '../services/predictionEngine.js';

const router = express.Router();

/**
 * GET /api/analysis/predict/:symbol
 * Runs quantitative multi-indicator prediction on the requested symbol
 */
router.get('/predict/:symbol?', async (req, res) => {
  try {
    const symbol = (req.params.symbol || req.query.symbol || 'BTCUSDT').toUpperCase();
    const interval = req.query.interval || '1h';
    const limit = parseInt(req.query.limit, 10) || 100;

    // Fetch kline candlestick history from Binance
    const klines = await binanceClient.getKlines(symbol, interval, limit, req);

    // Run prediction engine analysis
    const analysis = PredictionEngine.analyze(klines, symbol);

    res.json({
      success: true,
      data: {
        ...analysis,
        interval
      }
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/analysis/market-signals
 * Scans top market pairs simultaneously for quick macro overview
 */
router.get('/market-signals', async (req, res) => {
  const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT'];
  const interval = req.query.interval || '1h';

  try {
    const promises = symbols.map(async (sym) => {
      try {
        const klines = await binanceClient.getKlines(sym, interval, 80, req);
        const analysis = PredictionEngine.analyze(klines, sym);
        return {
          symbol: sym,
          price: analysis.currentPrice,
          recommendation: analysis.recommendation,
          signalType: analysis.signalType,
          confidence: analysis.confidence,
          projectedChangePct: analysis.projectedChangePct,
          rsi: analysis.indicators.rsi
        };
      } catch (err) {
        return {
          symbol: sym,
          error: err.message
        };
      }
    });

    const results = await Promise.all(promises);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      signals: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

