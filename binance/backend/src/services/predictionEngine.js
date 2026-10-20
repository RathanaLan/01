/**
 * Quantitative Technical Analysis & Machine Learning Price Prediction Engine
 *
 * Combines statistical modeling, multi-timeframe indicators, and trend projection:
 * 1. RSI (Relative Strength Index, 14-period)
 * 2. MACD (Moving Average Convergence Divergence: 12, 26, 9)
 * 3. Exponential Moving Averages (EMA 9, EMA 21, EMA 50)
 * 4. Bollinger Bands (20-period, 2 std dev)
 * 5. Stochastic Oscillator (%K, %D)
 * 6. ATR (Average True Range) for dynamic Stop Loss & Take Profit targets
 * 7. Linear Regression Trendline & Momentum Slope for short-term price forecasting
 */

export class PredictionEngine {
  /**
   * Main analysis entrypoint
   * @param {Array} klines - Array of candle objects [{open, high, low, close, volume, time}, ...]
   * @param {string} symbol - e.g. "BTCUSDT"
   */
  static analyze(klines, symbol = 'BTCUSDT') {
    if (!klines || klines.length < 30) {
      throw new Error('Insufficient historical data for technical analysis (minimum 30 candles required).');
    }

    const closes = klines.map((k) => k.close);
    const highs = klines.map((k) => k.high);
    const lows = klines.map((k) => k.low);
    const volumes = klines.map((k) => k.volume);
    const currentPrice = closes[closes.length - 1];

    // 1. Calculate Technical Indicators
    const rsi = this.calculateRSI(closes, 14);
    const macd = this.calculateMACD(closes, 12, 26, 9);
    const ema9 = this.calculateEMA(closes, 9);
    const ema21 = this.calculateEMA(closes, 21);
    const ema50 = closes.length >= 50 ? this.calculateEMA(closes, 50) : null;
    const bb = this.calculateBollingerBands(closes, 20, 2);
    const stoch = this.calculateStochastic(highs, lows, closes, 14, 3);
    const atr = this.calculateATR(highs, lows, closes, 14);

    // 2. Trend Forecast via Linear Regression on recent closes
    const regression = this.calculateLinearRegression(closes.slice(-20));

    // 3. Multi-Factor Scoring (-100 to +100)
    let score = 0;
    const signals = [];
    const reasons = [];

    // --- Factor A: RSI Evaluation ---
    const latestRSI = rsi[rsi.length - 1];
    if (latestRSI < 30) {
      score += 25;
      signals.push('BULLISH');
      reasons.push(`RSI is oversold at ${latestRSI.toFixed(1)} (bullish bounce anticipated)`);
    } else if (latestRSI < 42) {
      score += 10;
      reasons.push(`RSI is in lower territory at ${latestRSI.toFixed(1)} (moderate upward room)`);
    } else if (latestRSI > 70) {
      score -= 25;
      signals.push('BEARISH');
      reasons.push(`RSI is overbought at ${latestRSI.toFixed(1)} (bearish exhaustion risk)`);
    } else if (latestRSI > 58) {
      score -= 10;
      reasons.push(`RSI is in elevated territory at ${latestRSI.toFixed(1)}`);
    } else {
      reasons.push(`RSI is neutral at ${latestRSI.toFixed(1)}`);
    }

    // --- Factor B: MACD Momentum ---
    const latestMACD = macd[macd.length - 1];
    const prevMACD = macd[macd.length - 2];
    if (latestMACD && prevMACD) {
      const isBullishCrossover = prevMACD.histogram <= 0 && latestMACD.histogram > 0;
      const isBearishCrossover = prevMACD.histogram >= 0 && latestMACD.histogram < 0;

      if (isBullishCrossover) {
        score += 30;
        signals.push('BULLISH');
        reasons.push('MACD confirmed bullish crossover above signal line');
      } else if (latestMACD.histogram > 0 && latestMACD.histogram > prevMACD.histogram) {
        score += 15;
        signals.push('BULLISH');
        reasons.push('MACD histogram expanding positively (increasing bullish momentum)');
      } else if (isBearishCrossover) {
        score -= 30;
        signals.push('BEARISH');
        reasons.push('MACD confirmed bearish crossover below signal line');
      } else if (latestMACD.histogram < 0 && latestMACD.histogram < prevMACD.histogram) {
        score -= 15;
        signals.push('BEARISH');
        reasons.push('MACD histogram deteriorating (increasing selling pressure)');
      }
    }

    // --- Factor C: Moving Average Alignment ---
    const latestEMA9 = ema9[ema9.length - 1];
    const latestEMA21 = ema21[ema21.length - 1];
    if (latestEMA9 > latestEMA21 && currentPrice > latestEMA9) {
      score += 20;
      signals.push('BULLISH');
      reasons.push('Price is trending above bullish stacked EMAs (EMA 9 > EMA 21)');
    } else if (latestEMA9 < latestEMA21 && currentPrice < latestEMA9) {
      score -= 20;
      signals.push('BEARISH');
      reasons.push('Price is pressured below bearish stacked EMAs (EMA 9 < EMA 21)');
    }

    // --- Factor D: Bollinger Bands Volatility & Extremes ---
    const latestBB = bb[bb.length - 1];
    if (latestBB) {
      if (currentPrice <= latestBB.lower) {
        score += 20;
        signals.push('BULLISH');
        reasons.push('Price touching lower Bollinger Band (potential mean reversion bounce)');
      } else if (currentPrice >= latestBB.upper) {
        score -= 20;
        signals.push('BEARISH');
        reasons.push('Price touching upper Bollinger Band (potential resistance rejection)');
      }
    }

    // --- Factor E: Stochastic Oscillator ---
    const latestStoch = stoch[stoch.length - 1];
    if (latestStoch) {
      if (latestStoch.k < 20 && latestStoch.d < 20 && latestStoch.k > latestStoch.d) {
        score += 15;
        signals.push('BULLISH');
        reasons.push('Stochastic %K crossed above %D inside oversold zone (<20)');
      } else if (latestStoch.k > 80 && latestStoch.d > 80 && latestStoch.k < latestStoch.d) {
        score -= 15;
        signals.push('BEARISH');
        reasons.push('Stochastic %K crossed below %D inside overbought zone (>80)');
      }
    }

    // --- Factor F: Trend Projection via Linear Regression ---
    const slopePercent = (regression.slope / currentPrice) * 100;
    if (slopePercent > 0.05) {
      score += 10;
      reasons.push(`Linear regression slope is positive (+${slopePercent.toFixed(2)}%/bar)`);
    } else if (slopePercent < -0.05) {
      score -= 10;
      reasons.push(`Linear regression slope is negative (${slopePercent.toFixed(2)}%/bar)`);
    }

    // 4. Determine Suggestion & Confidence
    let recommendation = 'HOLD';
    let signalType = 'NEUTRAL';

    if (score >= 40) {
      recommendation = 'STRONG BUY';
      signalType = 'BULLISH';
    } else if (score >= 15) {
      recommendation = 'BUY';
      signalType = 'BULLISH';
    } else if (score <= -40) {
      recommendation = 'STRONG SELL';
      signalType = 'BEARISH';
    } else if (score <= -15) {
      recommendation = 'SELL';
      signalType = 'BEARISH';
    } else {
      recommendation = 'HOLD';
      signalType = 'NEUTRAL';
    }

    // Calculate confidence percentage
    const totalSignals = signals.length;
    const bullishSignals = signals.filter((s) => s === 'BULLISH').length;
    const bearishSignals = signals.filter((s) => s === 'BEARISH').length;

    let confidence = 50;
    if (totalSignals > 0) {
      const majorityCount = Math.max(bullishSignals, bearishSignals);
      confidence = Math.min(95, Math.round(50 + (majorityCount / Math.max(totalSignals, 3)) * 45));
    }
    if (recommendation === 'HOLD') {
      confidence = Math.max(50, Math.round(100 - Math.abs(score) * 2));
    }

    // 5. Calculate Realistic Target Prices & Stop Loss using ATR Volatility
    const currentATR = atr[atr.length - 1] || currentPrice * 0.015;
    let targetPrice = currentPrice;
    let stopLoss = currentPrice;

    if (recommendation.includes('BUY')) {
      targetPrice = currentPrice + currentATR * 2.2;
      stopLoss = currentPrice - currentATR * 1.2;
    } else if (recommendation.includes('SELL')) {
      targetPrice = currentPrice - currentATR * 2.2;
      stopLoss = currentPrice + currentATR * 1.2;
    } else {
      targetPrice = currentPrice + regression.slope * 3;
      stopLoss = currentPrice - currentATR * 1.0;
    }

    const projectedChangePct = ((targetPrice - currentPrice) / currentPrice) * 100;
    const riskReward = Math.abs(targetPrice - currentPrice) / Math.max(Math.abs(currentPrice - stopLoss), 0.00000001);

    // Dynamic precision based on price magnitude (handles micro/meme tokens like PEPE, SHIB)
    const decimals = currentPrice < 0.00001 ? 8 : currentPrice < 0.001 ? 6 : currentPrice < 1 ? 4 : 2;

    return {
      symbol,
      currentPrice,
      recommendation,
      signalType,
      confidence,
      score,
      targetPrice: parseFloat(targetPrice.toFixed(decimals)),
      projectedChangePct: parseFloat(projectedChangePct.toFixed(2)),
      stopLoss: parseFloat(stopLoss.toFixed(decimals)),
      riskRewardRatio: parseFloat(riskReward.toFixed(2)),
      reasons,
      indicators: {
        rsi: parseFloat(latestRSI.toFixed(2)),
        macd: {
          macd: parseFloat(latestMACD?.macd?.toFixed(decimals) || 0),
          signal: parseFloat(latestMACD?.signal?.toFixed(decimals) || 0),
          histogram: parseFloat(latestMACD?.histogram?.toFixed(decimals) || 0)
        },
        ema9: parseFloat(latestEMA9?.toFixed(decimals) || 0),
        ema21: parseFloat(latestEMA21?.toFixed(decimals) || 0),
        ema50: ema50 ? parseFloat(ema50[ema50.length - 1]?.toFixed(decimals)) : null,
        bollingerBands: {
          upper: parseFloat(latestBB?.upper?.toFixed(decimals) || 0),
          middle: parseFloat(latestBB?.middle?.toFixed(decimals) || 0),
          lower: parseFloat(latestBB?.lower?.toFixed(decimals) || 0)
        },
        stochastic: {
          k: parseFloat(latestStoch?.k?.toFixed(2) || 0),
          d: parseFloat(latestStoch?.d?.toFixed(2) || 0)
        },
        atr: parseFloat(currentATR.toFixed(decimals)),
        trendSlope: parseFloat(regression.slope.toFixed(8))
      },
      analyzedAt: new Date().toISOString()
    };
  }

  // --- MATHEMATICAL / TECHNICAL INDICATOR UTILITIES ---

  static calculateEMA(data, period) {
    const k = 2 / (period + 1);
    const emaArray = [data[0]];
    for (let i = 1; i < data.length; i++) {
      emaArray.push(data[i] * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
  }

  static calculateRSI(closes, period = 14) {
    if (closes.length <= period) return [50];
    const changes = [];
    for (let i = 1; i < closes.length; i++) {
      changes.push(closes[i] - closes[i - 1]);
    }

    let gains = 0;
    let losses = 0;
    for (let i = 0; i < period; i++) {
      if (changes[i] >= 0) gains += changes[i];
      else losses += Math.abs(changes[i]);
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    const rsiValues = [];
    const firstRS = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsiValues.push(100 - 100 / (1 + firstRS));

    for (let i = period; i < changes.length; i++) {
      const change = changes[i];
      const gain = change >= 0 ? change : 0;
      const loss = change < 0 ? Math.abs(change) : 0;

      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;

      if (avgLoss === 0) {
        rsiValues.push(100);
      } else {
        const rs = avgGain / avgLoss;
        rsiValues.push(100 - 100 / (1 + rs));
      }
    }

    return rsiValues;
  }

  static calculateMACD(closes, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    const fastEMA = this.calculateEMA(closes, fastPeriod);
    const slowEMA = this.calculateEMA(closes, slowPeriod);

    const macdLine = [];
    for (let i = 0; i < closes.length; i++) {
      macdLine.push(fastEMA[i] - slowEMA[i]);
    }

    const signalLine = this.calculateEMA(macdLine, signalPeriod);

    const result = [];
    for (let i = 0; i < closes.length; i++) {
      result.push({
        macd: macdLine[i],
        signal: signalLine[i],
        histogram: macdLine[i] - signalLine[i]
      });
    }
    return result;
  }

  static calculateBollingerBands(closes, period = 20, multiplier = 2) {
    const bands = [];
    for (let i = 0; i < closes.length; i++) {
      if (i < period - 1) {
        bands.push(null);
        continue;
      }
      const slice = closes.slice(i - period + 1, i + 1);
      const mean = slice.reduce((acc, val) => acc + val, 0) / period;
      const variance = slice.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / period;
      const stdDev = Math.sqrt(variance);

      bands.push({
        middle: mean,
        upper: mean + stdDev * multiplier,
        lower: mean - stdDev * multiplier
      });
    }
    return bands;
  }

  static calculateStochastic(highs, lows, closes, period = 14, smooth = 3) {
    const kValues = [];
    for (let i = 0; i < closes.length; i++) {
      if (i < period - 1) {
        kValues.push(50);
        continue;
      }
      const highSlice = highs.slice(i - period + 1, i + 1);
      const lowSlice = lows.slice(i - period + 1, i + 1);
      const highestHigh = Math.max(...highSlice);
      const lowestLow = Math.min(...lowSlice);

      if (highestHigh === lowestLow) {
        kValues.push(50);
      } else {
        const k = ((closes[i] - lowestLow) / (highestHigh - lowestLow)) * 100;
        kValues.push(k);
      }
    }

    // %D is simple moving average of %K
    const dValues = [];
    for (let i = 0; i < kValues.length; i++) {
      if (i < smooth - 1) {
        dValues.push(kValues[i]);
        continue;
      }
      const slice = kValues.slice(i - smooth + 1, i + 1);
      const avg = slice.reduce((a, b) => a + b, 0) / smooth;
      dValues.push(avg);
    }

    return kValues.map((k, index) => ({
      k,
      d: dValues[index]
    }));
  }

  static calculateATR(highs, lows, closes, period = 14) {
    const trueRanges = [highs[0] - lows[0]];
    for (let i = 1; i < closes.length; i++) {
      const tr = Math.max(
        highs[i] - lows[i],
        Math.abs(highs[i] - closes[i - 1]),
        Math.abs(lows[i] - closes[i - 1])
      );
      trueRanges.push(tr);
    }

    // Smoothing True Range
    let atr = trueRanges.slice(0, period).reduce((a, b) => a + b, 0) / period;
    const atrValues = [atr];
    for (let i = period; i < trueRanges.length; i++) {
      atr = (atr * (period - 1) + trueRanges[i]) / period;
      atrValues.push(atr);
    }
    return atrValues;
  }

  static calculateLinearRegression(values) {
    const n = values.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let x = 0; x < n; x++) {
      const y = values[x];
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return {
      slope,
      intercept,
      forecastNext: intercept + slope * n
    };
  }
}

