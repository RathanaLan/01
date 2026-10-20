import { binanceClient } from './binanceClient.js';
import { PredictionEngine } from './predictionEngine.js';

class AutoTradingEngine {
  constructor() {
    this.status = 'IDLE'; // 'IDLE' | 'RUNNING' | 'PAUSED'
    this.sessionId = null;
    this.startTime = null;
    this.lastEvaluationTime = null;
    this.lastTradeCloseTime = 0;
    this.loopTimer = null;
    this.isEvaluating = false;

    // Config defaults
    this.config = {
      symbol: 'BTCUSDT',
      marketType: 'FUTURES', // 'SPOT' | 'FUTURES'
      mode: 'PAPER', // 'PAPER' | 'LIVE'
      allocatedFund: 50, // USDT
      leverage: 5, // 1 to 20
      strategy: 'AI_MULTI_FACTOR', // 'AI_MULTI_FACTOR' | 'EMA_TREND_CROSS' | 'RSI_REVERSION' | 'BREAKOUT_ATR'
      takeProfitPct: 2.0, // Take profit at +2.0%
      stopLossPct: 1.5, // Stop loss at -1.5%
      trailingStop: true,
      trailingStopPct: 0.8, // Trail 0.8% from peak
      timeframe: '15m',
      maxConcurrentTrades: 1,
      cooldownSeconds: 20
    };

    // Stored active positions
    this.activePositions = [];

    // Historical completed bot trades
    this.tradeHistory = [];

    // Performance metrics
    this.metrics = {
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      winRate: 0,
      totalRealizedPnL: 0,
      bestTradePnL: 0,
      worstTradePnL: 0
    };

    // Current market analysis cache
    this.latestAnalysis = null;

    // Recent decision logs (max 100 entries)
    this.logs = [];

    this.addLog('SYSTEM', 'INFO', 'Auto Trading Engine initialized in IDLE state.');
  }

  addLog(category, level, message, details = null) {
    const entry = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      category,
      level, // 'INFO' | 'SIGNAL' | 'EXECUTION' | 'PROFIT' | 'PROTECT' | 'ERROR'
      message,
      details
    };
    this.logs.unshift(entry);
    if (this.logs.length > 120) {
      this.logs.pop();
    }
    console.log(`[AutoBot ${level}] ${message}`);
  }

  getStatus() {
    return {
      status: this.status,
      sessionId: this.sessionId,
      startTime: this.startTime,
      uptimeSeconds: this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0,
      config: this.config,
      activePositions: this.activePositions,
      metrics: this.metrics,
      latestAnalysis: this.latestAnalysis,
      recentLogs: this.logs.slice(0, 50),
      totalTradesRecorded: this.tradeHistory.length
    };
  }

  getTradeHistory() {
    return this.tradeHistory;
  }

  getLogs() {
    return this.logs;
  }

  /**
   * Start Auto Trading Session
   */
  start(newConfig = {}, req = null) {
    this.config = {
      ...this.config,
      ...newConfig,
      allocatedFund: Math.max(5, parseFloat(newConfig.allocatedFund || this.config.allocatedFund || 50)),
      leverage: Math.min(20, Math.max(1, parseInt(newConfig.leverage || this.config.leverage || 5, 10))),
      takeProfitPct: Math.max(0.5, parseFloat(newConfig.takeProfitPct || this.config.takeProfitPct || 2.0)),
      stopLossPct: Math.max(0.5, parseFloat(newConfig.stopLossPct || this.config.stopLossPct || 1.5))
    };

    this.status = 'RUNNING';
    this.sessionId = `session-${Date.now()}`;
    this.startTime = Date.now();
    this.authReq = req; // Preserve auth headers if live

    this.addLog(
      'SESSION',
      'INFO',
      `Auto Trading Session STARTED for ${this.config.symbol} (${this.config.marketType} - ${this.config.mode} MODE). Allocated: $${this.config.allocatedFund} USDT, TP: +${this.config.takeProfitPct}%, SL: -${this.config.stopLossPct}%, Strategy: ${this.config.strategy}`
    );

    // If futures and live, configure leverage on Binance
    if (this.config.marketType === 'FUTURES' && this.config.mode === 'LIVE') {
      binanceClient
        .setFuturesLeverage(this.config.symbol, this.config.leverage, req)
        .then(() => {
          this.addLog('SETUP', 'INFO', `Configured Binance Futures leverage to ${this.config.leverage}x on ${this.config.symbol}`);
        })
        .catch((err) => {
          this.addLog('SETUP', 'ERROR', `Could not set Futures leverage on Binance: ${err.message}`);
        });
    }

    if (this.loopTimer) {
      clearInterval(this.loopTimer);
    }

    // Run evaluation loop every 3 seconds
    this.loopTimer = setInterval(() => {
      this.evaluateTick().catch((err) => {
        console.error('[AutoBot Loop Error]:', err.message);
      });
    }, 3000);

    // Initial immediate evaluation
    this.evaluateTick().catch(() => {});

    return this.getStatus();
  }

  /**
   * Pause Auto Trading Session
   */
  pause() {
    if (this.status === 'RUNNING') {
      this.status = 'PAUSED';
      this.addLog('SESSION', 'INFO', 'Auto Trading Session PAUSED. Existing positions remain monitored.');
    }
    return this.getStatus();
  }

  /**
   * Stop Auto Trading Session
   */
  async stop(closePositions = false) {
    this.status = 'IDLE';
    if (this.loopTimer) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }

    this.addLog('SESSION', 'INFO', `Auto Trading Session STOPPED. Close positions: ${closePositions}`);

    if (closePositions && this.activePositions.length > 0) {
      await this.closeAllPositions('SESSION_STOPPED');
    }

    return this.getStatus();
  }

  /**
   * Resolve appropriate Binance symbol for market type
   * (e.g. Binance Futures requires 1000PEPEUSDT, 1000SHIBUSDT, etc.)
   */
  getTradingSymbol(symbol, marketType) {
    const s = (symbol || 'BTCUSDT').toUpperCase().trim();
    if (marketType === 'FUTURES') {
      const memeMap = {
        'PEPEUSDT': '1000PEPEUSDT',
        'SHIBUSDT': '1000SHIBUSDT',
        'BONKUSDT': '1000BONKUSDT',
        'FLOKIUSDT': '1000FLOKIUSDT',
        'SATSUSDT': '1000SATSUSDT',
        'RATSUSDT': '1000RATSUSDT',
        'LUNCUSDT': '1000LUNCUSDT',
        'XECUSDT': '1000XECUSDT',
        'CATUSDT': '1000CATUSDT',
        'MOGUSDT': '1000MOGUSDT',
        'CHEEMSUSDT': '1000CHEEMSUSDT',
        'WHYUSDT': '1000WHYUSDT'
      };
      return memeMap[s] || s;
    }
    return s;
  }

  /**
   * Format quantity step size to avoid Binance LOT_SIZE filter rejection
   */
  formatQuantity(symbol, qty) {
    const sym = symbol.toUpperCase();
    if (sym.startsWith('1000') || sym.startsWith('SHIB') || sym.startsWith('PEPE') || sym.startsWith('BONK') || sym.startsWith('FLOKI')) {
      return Math.max(1, Math.floor(qty)).toString();
    }
    if (sym.startsWith('BTC')) return Math.max(0.001, parseFloat(qty.toFixed(3))).toString();
    if (sym.startsWith('ETH')) return Math.max(0.001, parseFloat(qty.toFixed(3))).toString();
    if (sym.startsWith('SOL')) return Math.max(0.01, parseFloat(qty.toFixed(2))).toString();
    if (sym.startsWith('BNB')) return Math.max(0.01, parseFloat(qty.toFixed(2))).toString();
    if (sym.startsWith('DOGE') || sym.startsWith('XRP') || sym.startsWith('ADA')) return Math.max(1, Math.floor(qty)).toString();
    return qty.toFixed(2);
  }

  formatPriceLabel(p) {
    if (typeof p !== 'number' || isNaN(p)) return '0.00';
    if (p < 0.00001) return p.toFixed(8);
    if (p < 0.001) return p.toFixed(6);
    if (p < 1) return p.toFixed(4);
    return p.toFixed(2);
  }

  /**
   * Main Evaluation Tick (Runs every 3 seconds)
   */
  async evaluateTick() {
    if (this.status !== 'RUNNING' || this.isEvaluating) return;
    this.isEvaluating = true;

    try {
      const { symbol, timeframe, marketType, mode, strategy, allocatedFund, leverage, takeProfitPct, stopLossPct } = this.config;

      // 1. Fetch latest klines & live price
      const rawKlines = await binanceClient.getKlines(symbol, timeframe, 45);
      const klines = Array.isArray(rawKlines) ? rawKlines : (rawKlines?.data || []);
      if (!Array.isArray(klines) || klines.length < 30) {
        return;
      }

      const currentPrice = klines[klines.length - 1].close;

      // 2. Perform Quantitative & Indicator Analysis (Learning from graph / online)
      const analysis = PredictionEngine.analyze(klines, symbol);
      const signalVerdict = analysis.recommendation || analysis.signalType || 'NEUTRAL';
      const rsiVal = analysis.indicators?.rsi || 50;
      const macdHist = analysis.indicators?.macd?.histogram || 0;
      const ema9Val = analysis.indicators?.ema?.ema9 || 0;
      const ema21Val = analysis.indicators?.ema?.ema21 || 0;

      this.latestAnalysis = {
        symbol,
        currentPrice,
        score: analysis.score,
        signal: signalVerdict,
        confidence: analysis.confidence,
        indicators: {
          rsi: rsiVal,
          macdHistogram: macdHist,
          ema9: ema9Val,
          ema21: ema21Val,
          bollingerBands: analysis.indicators?.bollingerBands,
          atr: analysis.indicators?.atr
        },
        reasons: analysis.reasons?.slice(0, 3) || [],
        evaluatedAt: Date.now()
      };

      // Periodic ambient analysis log (every 20s or on signal change)
      const now = Date.now();
      if (!this.lastAnalysisLogTime || now - this.lastAnalysisLogTime > 20000) {
        this.addLog(
          'ANALYSIS',
          'INFO',
          `Graph Scan: ${symbol} @ $${this.formatPriceLabel(currentPrice)} | RSI: ${rsiVal.toFixed(1)} | Score: ${analysis.score > 0 ? '+' : ''}${analysis.score} | Model: ${signalVerdict}`
        );
        this.lastAnalysisLogTime = now;
      }

      // 3. Monitor Active Open Positions (Check Auto Take Profit & Auto Stop Loss)
      await this.monitorPositions(currentPrice);

      // 4. Check Cooldown between trades
      const secondsSinceLastTrade = (Date.now() - this.lastTradeCloseTime) / 1000;
      if (this.lastTradeCloseTime > 0 && secondsSinceLastTrade < this.config.cooldownSeconds) {
        return;
      }

      // 5. Evaluate Entry Signals if slots available
      if (this.activePositions.length < this.config.maxConcurrentTrades) {
        await this.evaluateEntryTrigger(analysis, currentPrice);
      }
    } catch (err) {
      console.warn('[AutoBot Tick Error]:', err.message);
    } finally {
      this.isEvaluating = false;
    }
  }

  /**
   * Position Monitor: Evaluates Auto Take Profit, Trailing Stop, and Stop Loss
   */
  async monitorPositions(currentPrice) {
    const { takeProfitPct, stopLossPct, trailingStop, trailingStopPct } = this.config;

    for (let i = this.activePositions.length - 1; i >= 0; i--) {
      const pos = this.activePositions[i];
      pos.currentPrice = currentPrice;

      // Calculate Floating PnL
      let pnlPct = 0;
      if (pos.side === 'BUY') {
        pnlPct = ((currentPrice - pos.entryPrice) / pos.entryPrice) * 100 * pos.leverage;
        pos.peakPrice = Math.max(pos.peakPrice || pos.entryPrice, currentPrice);
      } else {
        // SHORT position (Futures only)
        pnlPct = ((pos.entryPrice - currentPrice) / pos.entryPrice) * 100 * pos.leverage;
        pos.peakPrice = Math.min(pos.peakPrice || pos.entryPrice, currentPrice);
      }

      pos.floatingPnLPct = parseFloat(pnlPct.toFixed(2));
      pos.floatingPnLUsd = parseFloat(((pos.investedFund * pnlPct) / 100).toFixed(2));

      // 1. AUTO TAKE PROFIT TRIGGER
      if (pnlPct >= takeProfitPct) {
        this.addLog(
          'PROFIT',
          'PROFIT',
          `🎯 AUTO TAKE PROFIT TRIGGERED on ${pos.symbol} ${pos.side}! Floating profit: +${pnlPct.toFixed(2)}% (+$${pos.floatingPnLUsd} USD). Closing position to bank gains!`
        );
        await this.closePosition(pos.id, 'TAKE_PROFIT', currentPrice);
        continue;
      }

      // 2. TRAILING STOP PROFIT TRIGGER (If in profit and pulls back from peak)
      if (trailingStop && pnlPct >= takeProfitPct * 0.6) {
        let isTrailingTriggered = false;
        if (pos.side === 'BUY') {
          const maxGainPct = ((pos.peakPrice - pos.entryPrice) / pos.entryPrice) * 100 * pos.leverage;
          const pullBackFromPeak = maxGainPct - pnlPct;
          if (pullBackFromPeak >= trailingStopPct) isTrailingTriggered = true;
        } else {
          const maxGainPct = ((pos.entryPrice - pos.peakPrice) / pos.entryPrice) * 100 * pos.leverage;
          const pullBackFromPeak = maxGainPct - pnlPct;
          if (pullBackFromPeak >= trailingStopPct) isTrailingTriggered = true;
        }

        if (isTrailingTriggered) {
          this.addLog(
            'TRAILING',
            'PROFIT',
            `📈 TRAILING STOP LOCK TRIGGERED on ${pos.symbol} ${pos.side}! Securing +${pnlPct.toFixed(2)}% (+$${pos.floatingPnLUsd} USD) before further pullback!`
          );
          await this.closePosition(pos.id, 'TRAILING_STOP', currentPrice);
          continue;
        }
      }

      // 3. AUTO STOP LOSS TRIGGER (Capital Protection)
      if (pnlPct <= -stopLossPct) {
        this.addLog(
          'PROTECT',
          'PROTECT',
          `🛡️ AUTO STOP LOSS TRIGGERED on ${pos.symbol} ${pos.side}! Loss capped at -${Math.abs(pnlPct).toFixed(2)}% (-$${Math.abs(pos.floatingPnLUsd)} USD). Position cut to preserve capital.`
        );
        await this.closePosition(pos.id, 'STOP_LOSS', currentPrice);
        continue;
      }
    }
  }

  /**
   * Entry Trigger Evaluator based on Strategy and Indicators
   */
  async evaluateEntryTrigger(analysis, currentPrice) {
    const { strategy, symbol, marketType, allocatedFund, leverage } = this.config;
    const rsi = analysis.indicators?.rsi || 50;
    const ema9 = analysis.indicators?.ema?.ema9 || 0;
    const ema21 = analysis.indicators?.ema?.ema21 || 0;
    const score = analysis.score || 0;
    const macdHist = analysis.indicators?.macd?.histogram || 0;
    const verdict = analysis.recommendation || analysis.signalType || '';

    let triggerSide = null;
    let triggerReason = '';

    // Strategy 1: Adaptive AI Multi-Factor (Synthesizes Score + Recommendation + Momentum)
    if (strategy === 'AI_MULTI_FACTOR') {
      if ((score >= 20 || verdict === 'STRONG_BUY' || (verdict === 'BUY' && rsi < 65)) && rsi < 68) {
        triggerSide = 'BUY';
        triggerReason = `AI Multi-Factor Score +${score} | Signal: ${verdict} (RSI: ${rsi.toFixed(1)}, MACD: ${macdHist > 0 ? '+' : ''}${macdHist.toFixed(2)})`;
      } else if ((score <= -20 || verdict === 'STRONG_SELL' || (verdict === 'SELL' && rsi > 35)) && rsi > 32 && marketType === 'FUTURES') {
        triggerSide = 'SELL';
        triggerReason = `AI Multi-Factor Score ${score} | Signal: ${verdict} (RSI: ${rsi.toFixed(1)}, Bearish Momentum)`;
      }
    }

    // Strategy 2: Trend Momentum Follower (EMA 9 crossing above EMA 21)
    else if (strategy === 'EMA_TREND_CROSS') {
      if (ema9 > ema21 && currentPrice > ema9 && rsi < 68) {
        triggerSide = 'BUY';
        triggerReason = `EMA 9 ($${ema9.toFixed(2)}) crossed above EMA 21 ($${ema21.toFixed(2)}) - Trend Uptrend confirmed`;
      } else if (ema9 < ema21 && currentPrice < ema9 && rsi > 32 && marketType === 'FUTURES') {
        triggerSide = 'SELL';
        triggerReason = `EMA 9 ($${ema9.toFixed(2)}) crossed below EMA 21 ($${ema21.toFixed(2)}) - Trend Downtrend confirmed`;
      }
    }

    // Strategy 3: RSI Mean Reversion (Oversold Dip Buyer & Overbought Short)
    else if (strategy === 'RSI_REVERSION') {
      if (rsi <= 32) {
        triggerSide = 'BUY';
        triggerReason = `RSI oversold at ${rsi.toFixed(1)} (Mean-reversion bounce expected)`;
      } else if (rsi >= 68 && marketType === 'FUTURES') {
        triggerSide = 'SELL';
        triggerReason = `RSI overbought at ${rsi.toFixed(1)} (Mean-reversion drop expected)`;
      }
    }

    // Strategy 4: Volatility Breakout
    else if (strategy === 'BREAKOUT_ATR') {
      const bbUpper = analysis.indicators?.bollingerBands?.upper || currentPrice * 1.01;
      const bbLower = analysis.indicators?.bollingerBands?.lower || currentPrice * 0.99;
      if (currentPrice > bbUpper && rsi < 70) {
        triggerSide = 'BUY';
        triggerReason = `Price broke above Bollinger Upper Band ($${bbUpper.toFixed(2)}) with strong volume`;
      } else if (currentPrice < bbLower && rsi > 30 && marketType === 'FUTURES') {
        triggerSide = 'SELL';
        triggerReason = `Price broke below Bollinger Lower Band ($${bbLower.toFixed(2)})`;
      }
    }

    // Execute Entry Trade if trigger fired
    if (triggerSide) {
      await this.executeOpenPosition(triggerSide, triggerReason, currentPrice);
    }
  }

  /**
   * Execute Open Position (Auto Buy or Auto Short)
   */
  async executeOpenPosition(side, reason, currentPrice) {
    const { symbol, marketType, mode, allocatedFund, leverage, takeProfitPct, stopLossPct } = this.config;
    const tradingSymbol = this.getTradingSymbol(symbol, marketType);
    const is1000Contract = marketType === 'FUTURES' && tradingSymbol.startsWith('1000');

    // Calculate trade position size (accounts for 1000x multiplier contracts like 1000PEPEUSDT)
    const effectivePrice = is1000Contract ? currentPrice * 1000 : currentPrice;
    const notionalValue = allocatedFund * (marketType === 'FUTURES' ? leverage : 1);
    const rawQty = notionalValue / effectivePrice;
    const formattedQty = this.formatQuantity(tradingSymbol, rawQty);

    const positionId = `pos-${Date.now()}`;
    const tpPrice = side === 'BUY' 
      ? currentPrice * (1 + (takeProfitPct / 100) / (marketType === 'FUTURES' ? leverage : 1))
      : currentPrice * (1 - (takeProfitPct / 100) / (marketType === 'FUTURES' ? leverage : 1));

    const slPrice = side === 'BUY'
      ? currentPrice * (1 - (stopLossPct / 100) / (marketType === 'FUTURES' ? leverage : 1))
      : currentPrice * (1 + (stopLossPct / 100) / (marketType === 'FUTURES' ? leverage : 1));

    const priceLabel = currentPrice < 0.001 ? currentPrice.toFixed(8) : currentPrice < 1 ? currentPrice.toFixed(4) : currentPrice.toFixed(2);

    this.addLog(
      'SIGNAL',
      'SIGNAL',
      `⚡ ENTRY TRIGGER FIRED: ${side} ${symbol} @ $${priceLabel} | Reason: ${reason} | Size: ${formattedQty} ${tradingSymbol} (Fund: $${allocatedFund})`
    );

    // Live Execution on Binance
    let liveExecutionResult = null;
    if (mode === 'LIVE') {
      try {
        if (marketType === 'SPOT') {
          liveExecutionResult = await binanceClient.createOrder(
            {
              symbol,
              side: side.toUpperCase(),
              type: 'MARKET',
              quantity: formattedQty
            },
            this.authReq
          );
        } else {
          liveExecutionResult = await binanceClient.createFuturesOrder(
            {
              symbol: tradingSymbol,
              side: side.toUpperCase(),
              type: 'MARKET',
              quantity: formattedQty
            },
            this.authReq
          );
        }
        this.addLog('EXECUTION', 'EXECUTION', `✅ LIVE Binance Order executed: ${side} ${formattedQty} ${tradingSymbol}`);
      } catch (err) {
        this.addLog('EXECUTION', 'ERROR', `❌ LIVE Order failed: ${err.message}`);
        this.lastTradeCloseTime = Date.now(); // Put on 25s cooldown to prevent error spamming
        return; // Abort if live order failed
      }
    } else {
      this.addLog('EXECUTION', 'EXECUTION', `🧪 [PAPER SIMULATION] Filled ${side} ${formattedQty} ${tradingSymbol} @ $${priceLabel}`);
    }

    const newPosition = {
      id: positionId,
      symbol,
      tradingSymbol,
      marketType,
      mode,
      side,
      entryPrice: currentPrice,
      currentPrice,
      peakPrice: currentPrice,
      quantity: parseFloat(formattedQty),
      investedFund: allocatedFund,
      leverage: marketType === 'FUTURES' ? leverage : 1,
      entryTime: Date.now(),
      entryReason: reason,
      takeProfitPrice: parseFloat(tpPrice.toFixed(6)),
      stopLossPrice: parseFloat(slPrice.toFixed(6)),
      floatingPnLPct: 0,
      floatingPnLUsd: 0,
      liveOrderId: liveExecutionResult?.orderId || null
    };

    this.activePositions.push(newPosition);
  }

  /**
   * Close a Position (Auto Profit / Stop Loss / Manual)
   */
  async closePosition(positionId, reason = 'MANUAL_CLOSE', exitPrice = null) {
    const idx = this.activePositions.findIndex((p) => p.id === positionId);
    if (idx === -1) return null;

    const pos = this.activePositions[idx];
    const closePrice = exitPrice || pos.currentPrice;
    const orderSymbol = pos.tradingSymbol || this.getTradingSymbol(pos.symbol, pos.marketType);

    // Calculate final Realized PnL
    let finalPnLPct = 0;
    if (pos.side === 'BUY') {
      finalPnLPct = ((closePrice - pos.entryPrice) / pos.entryPrice) * 100 * pos.leverage;
    } else {
      finalPnLPct = ((pos.entryPrice - closePrice) / pos.entryPrice) * 100 * pos.leverage;
    }
    const finalPnLUsd = (pos.investedFund * finalPnLPct) / 100;

    // Live Execution on Binance to close
    if (pos.mode === 'LIVE') {
      try {
        if (pos.marketType === 'SPOT') {
          // Sell what we bought
          await binanceClient.createOrder(
            {
              symbol: pos.symbol,
              side: 'SELL',
              type: 'MARKET',
              quantity: pos.quantity.toString()
            },
            this.authReq
          );
        } else {
          // Close Futures position with reduceOnly
          const closeSide = pos.side === 'BUY' ? 'SELL' : 'BUY';
          await binanceClient.createFuturesOrder(
            {
              symbol: orderSymbol,
              side: closeSide,
              type: 'MARKET',
              quantity: pos.quantity.toString(),
              reduceOnly: true
            },
            this.authReq
          );
        }
        this.addLog('EXECUTION', 'EXECUTION', `✅ LIVE Close order executed on Binance: ${orderSymbol}`);
      } catch (err) {
        this.addLog('EXECUTION', 'ERROR', `Could not execute live close on Binance: ${err.message}`);
      }
    }

    // Record trade record
    const completedTrade = {
      id: pos.id,
      symbol: pos.symbol,
      marketType: pos.marketType,
      mode: pos.mode,
      side: pos.side,
      entryPrice: pos.entryPrice,
      exitPrice: closePrice,
      quantity: pos.quantity,
      investedFund: pos.investedFund,
      leverage: pos.leverage,
      entryTime: pos.entryTime,
      exitTime: Date.now(),
      durationSeconds: Math.floor((Date.now() - pos.entryTime) / 1000),
      reason,
      pnlPct: parseFloat(finalPnLPct.toFixed(2)),
      pnlUsd: parseFloat(finalPnLUsd.toFixed(2)),
      isWin: finalPnLUsd > 0
    };

    // Remove from active positions
    this.activePositions.splice(idx, 1);
    this.tradeHistory.unshift(completedTrade);
    this.lastTradeCloseTime = Date.now();

    // Update cumulative metrics
    this.metrics.totalTrades += 1;
    if (completedTrade.isWin) {
      this.metrics.winningTrades += 1;
      this.metrics.bestTradePnL = Math.max(this.metrics.bestTradePnL, completedTrade.pnlUsd);
    } else {
      this.metrics.losingTrades += 1;
      this.metrics.worstTradePnL = Math.min(this.metrics.worstTradePnL, completedTrade.pnlUsd);
    }
    this.metrics.winRate = parseFloat(((this.metrics.winningTrades / this.metrics.totalTrades) * 100).toFixed(1));
    this.metrics.totalRealizedPnL = parseFloat((this.metrics.totalRealizedPnL + completedTrade.pnlUsd).toFixed(2));

    this.addLog(
      'TRADE_CLOSED',
      completedTrade.isWin ? 'PROFIT' : 'PROTECT',
      `CLOSED ${pos.symbol} ${pos.side} @ $${this.formatPriceLabel(closePrice)} | Reason: ${reason} | PnL: ${completedTrade.pnlPct > 0 ? '+' : ''}${completedTrade.pnlPct}% ($${completedTrade.pnlUsd > 0 ? '+' : ''}$${completedTrade.pnlUsd} USD)`
    );

    return completedTrade;
  }

  /**
   * Emergency Close All Positions
   */
  async closeAllPositions(reason = 'EMERGENCY_CLOSE_ALL') {
    this.addLog('ACTION', 'PROTECT', `Emergency closing all ${this.activePositions.length} open bot positions...`);
    const results = [];
    while (this.activePositions.length > 0) {
      const pos = this.activePositions[0];
      const closed = await this.closePosition(pos.id, reason);
      results.push(closed);
    }
    return results;
  }

  /**
   * Reset Metrics and Logs
   */
  resetHistory() {
    this.tradeHistory = [];
    this.metrics = {
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      winRate: 0,
      totalRealizedPnL: 0,
      bestTradePnL: 0,
      worstTradePnL: 0
    };
    this.logs = [];
    this.addLog('SYSTEM', 'INFO', 'Bot metrics and trade history reset.');
    return this.getStatus();
  }
}

export const autoTradingEngine = new AutoTradingEngine();
