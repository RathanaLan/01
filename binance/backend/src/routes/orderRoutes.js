import express from 'express';
import { binanceClient } from '../services/binanceClient.js';

const router = express.Router();

/**
 * GET /api/orders/open
 * Fetch all currently open orders (optionally filter by symbol)
 */
router.get('/open', async (req, res) => {
  try {
    const symbol = req.query.symbol || null;
    const orders = await binanceClient.getOpenOrders(symbol, req);

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

/**
 * GET /api/orders/history
 * Fetch past executed trades
 */
router.get('/history', async (req, res) => {
  try {
    const symbol = (req.query.symbol || 'BTCUSDT').toUpperCase();
    const limit = parseInt(req.query.limit, 10) || 50;

    const trades = await binanceClient.getMyTrades(symbol, limit, req);

    res.json({
      success: true,
      symbol,
      data: trades
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

/**
 * POST /api/orders
 * Place a new Buy or Sell order (LIMIT or MARKET)
 *
 * CRITICAL SAFETY NOTE:
 * - Always double check your symbol, price, and quantity before placing live orders!
 */
router.post('/', async (req, res) => {
  try {
    const { symbol, side, type, quantity, price, timeInForce } = req.body;

    if (!symbol || !side || !type || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: symbol, side, type, quantity are mandatory.'
      });
    }

    if (type.toUpperCase() === 'LIMIT' && !price) {
      return res.status(400).json({
        success: false,
        error: 'Limit orders require a valid price.'
      });
    }

    const orderResult = await binanceClient.createOrder(
      {
        symbol,
        side,
        type,
        quantity,
        price,
        timeInForce
      },
      req
    );

    res.json({
      success: true,
      message: `Order submitted: ${side} ${quantity} ${symbol} @ ${price || 'MARKET'}`,
      data: orderResult
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

/**
 * DELETE /api/orders/:symbol/:orderId
 * Cancel an open order
 */
router.delete('/:symbol/:orderId', async (req, res) => {
  try {
    const { symbol, orderId } = req.params;
    const result = await binanceClient.cancelOrder(symbol, orderId, req);

    res.json({
      success: true,
      message: `Order ${orderId} cancelled successfully`,
      data: result
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

/**
 * POST /api/orders/futures
 * Place a new Futures Order (BUY / LONG or SELL / SHORT) with optional leverage
 */
router.post('/futures', async (req, res) => {
  try {
    const { symbol, side, type, quantity, price, leverage } = req.body;

    if (!symbol || !side || !type || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: symbol, side, type, quantity are mandatory.'
      });
    }

    if (type.toUpperCase() === 'LIMIT' && !price) {
      return res.status(400).json({
        success: false,
        error: 'Limit futures orders require a valid price.'
      });
    }

    // Optionally update leverage first if specified
    if (leverage && parseInt(leverage, 10) > 0) {
      await binanceClient.setFuturesLeverage(symbol, parseInt(leverage, 10), req).catch(() => null);
    }

    const orderResult = await binanceClient.createFuturesOrder(
      {
        symbol,
        side,
        type,
        quantity,
        price,
        reduceOnly: false
      },
      req
    );

    res.json({
      success: true,
      message: `Futures ${side} order submitted: ${quantity} ${symbol} @ ${price || 'MARKET'} (${leverage || 1}x)`,
      data: orderResult
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

/**
 * POST /api/orders/futures/leverage
 * Adjust Futures Leverage for a symbol
 */
router.post('/futures/leverage', async (req, res) => {
  try {
    const { symbol, leverage } = req.body;
    if (!symbol || !leverage) {
      return res.status(400).json({ success: false, error: 'Symbol and leverage are required.' });
    }
    const result = await binanceClient.setFuturesLeverage(symbol, parseInt(leverage, 10), req);
    res.json({
      success: true,
      message: `Leverage successfully updated to ${leverage}x for ${symbol}`,
      data: result
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

/**
 * POST /api/orders/futures/close
 * Close an active Futures position at Market price (reduce-only)
 */
router.post('/futures/close', async (req, res) => {
  try {
    const { symbol, positionAmt, side } = req.body;
    if (!symbol) {
      return res.status(400).json({ success: false, error: 'Symbol is required.' });
    }

    const amt = Math.abs(parseFloat(positionAmt));
    if (!amt || amt <= 0) {
      return res.status(400).json({ success: false, error: 'Valid position size is required.' });
    }

    // If currently LONG (positionAmt > 0 or side === 'LONG' or side === 'BUY'), close with SELL
    // If currently SHORT (positionAmt < 0 or side === 'SHORT' or side === 'SELL'), close with BUY
    const closeSide = (parseFloat(positionAmt) > 0 || side === 'LONG' || side === 'BUY') ? 'SELL' : 'BUY';

    const result = await binanceClient.createFuturesOrder(
      {
        symbol,
        side: closeSide,
        type: 'MARKET',
        quantity: amt.toString(),
        reduceOnly: true
      },
      req
    );

    res.json({
      success: true,
      message: `Position for ${symbol} successfully closed (${closeSide} ${amt})`,
      data: result
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
      binanceCode: error.binanceCode
    });
  }
});

export default router;

