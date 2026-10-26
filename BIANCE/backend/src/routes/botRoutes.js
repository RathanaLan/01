import express from 'express';
import { autoTradingEngine } from '../services/autoTradingEngine.js';

const router = express.Router();

/**
 * GET /api/bot/status
 * Returns current bot session status, active positions, metrics, and latest indicators
 */
router.get('/status', (req, res) => {
  try {
    const status = autoTradingEngine.getStatus();
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/bot/start
 * Start an auto trading session with user-defined parameters
 */
router.post('/start', (req, res) => {
  try {
    const config = req.body || {};
    const status = autoTradingEngine.start(config, req);
    res.json({
      success: true,
      message: `Auto Trading Bot started for ${status.config.symbol} in ${status.config.mode} mode`,
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/bot/pause
 * Pause session evaluations
 */
router.post('/pause', (req, res) => {
  try {
    const status = autoTradingEngine.pause();
    res.json({
      success: true,
      message: 'Auto Trading Bot paused',
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/bot/stop
 * Stop session and optionally close existing positions
 */
router.post('/stop', async (req, res) => {
  try {
    const { closePositions = false } = req.body || {};
    const status = await autoTradingEngine.stop(Boolean(closePositions));
    res.json({
      success: true,
      message: 'Auto Trading Bot stopped',
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/bot/close-position
 * Close a specific active position immediately
 */
router.post('/close-position', async (req, res) => {
  try {
    const { positionId } = req.body || {};
    if (!positionId) {
      return res.status(400).json({ success: false, error: 'positionId is required' });
    }
    const result = await autoTradingEngine.closePosition(positionId, 'MANUAL_CLOSE');
    res.json({
      success: true,
      message: 'Position closed successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/bot/close-all
 * Emergency close all open positions immediately
 */
router.post('/close-all', async (req, res) => {
  try {
    const results = await autoTradingEngine.closeAllPositions('EMERGENCY_PANIC_CLOSE');
    res.json({
      success: true,
      message: `Closed all ${results.length} positions successfully`,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/bot/history
 * Fetch completed bot trade history
 */
router.get('/history', (req, res) => {
  try {
    const history = autoTradingEngine.getTradeHistory();
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/bot/logs
 * Fetch real-time decision logs
 */
router.get('/logs', (req, res) => {
  try {
    const logs = autoTradingEngine.getLogs();
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/bot/reset
 * Reset metrics and trade history
 */
router.post('/reset', (req, res) => {
  try {
    const status = autoTradingEngine.resetHistory();
    res.json({
      success: true,
      message: 'Bot metrics and trade history reset successfully',
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

