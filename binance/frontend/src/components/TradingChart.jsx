import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import { 
  Activity, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  ExternalLink,
  Sliders,
  Clock
} from 'lucide-react';
import { getKlines } from '../services/api';
import { connectBinanceKline } from '../services/binanceSocket';
import { formatPrice, formatNumber, formatDate, formatTime } from '../utils/formatters';

function TradingChart({ symbol = 'BTCUSDT', livePrice }) {
  const [chartMode, setChartMode] = useState('native'); // 'native' | 'tradingview'
  const [interval, setInterval] = useState('1h');
  const [klines, setKlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tvLoading, setTvLoading] = useState(true);

  // Fetch real Kline candlestick data from backend proxy
  const fetchCandles = async (isInitial = true) => {
    if (isInitial) setLoading(true);
    try {
      const res = await getKlines(symbol, interval, 60);
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setKlines(res.data);
      }
    } catch (err) {
      console.warn('Candle fetch notice:', err.message);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandles(true);
    setHoverIndex(null);

    // Connect real-time WebSocket Kline stream
    const unsubKline = connectBinanceKline(symbol, interval, (kline) => {
      setKlines((prev) => {
        if (!prev || prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const isSameCandle = kline.time === last.time || (kline.openTime && kline.openTime === last.openTime);
        if (isSameCandle) {
          const copy = [...prev];
          copy[copy.length - 1] = {
            ...last,
            close: kline.close,
            high: Math.max(last.high, kline.high),
            low: Math.min(last.low, kline.low),
            volume: kline.volume,
            closeTime: kline.closeTime
          };
          return copy;
        } else if (kline.time > last.time) {
          return [...prev.slice(1), kline];
        }
        return prev;
      });
    });

    // Silent background refresh every 6 seconds as backup
    const silentInterval = window.setInterval(() => {
      fetchCandles(false);
    }, 6000);

    return () => {
      unsubKline();
      window.clearInterval(silentInterval);
    };
  }, [symbol, interval]);

  // Update latest candle immediately whenever livePrice ticks
  useEffect(() => {
    if (!livePrice) return;
    setKlines((prev) => {
      if (!prev || prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      if (last.close === livePrice) return prev;
      const copy = [...prev];
      copy[copy.length - 1] = {
        ...last,
        close: livePrice,
        high: Math.max(last.high, livePrice),
        low: Math.min(last.low, livePrice)
      };
      return copy;
    });
  }, [livePrice]);

  // Compute EMA series for the native chart
  const ema9 = useMemo(() => {
    if (!klines || klines.length === 0) return [];
    const k = 2 / (9 + 1);
    const arr = [klines[0].close];
    for (let i = 1; i < klines.length; i++) {
      arr.push(klines[i].close * k + arr[i - 1] * (1 - k));
    }
    return arr;
  }, [klines]);

  const ema21 = useMemo(() => {
    if (!klines || klines.length === 0) return [];
    const k = 2 / (21 + 1);
    const arr = [klines[0].close];
    for (let i = 1; i < klines.length; i++) {
      arr.push(klines[i].close * k + arr[i - 1] * (1 - k));
    }
    return arr;
  }, [klines]);

  // Dimensions & bounds for native SVG rendering
  const chartHeight = 380;
  const chartWidth = 900;
  const padding = { top: 20, right: 75, bottom: 40, left: 10 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const { minPrice, maxPrice, maxVol } = useMemo(() => {
    if (!klines || klines.length === 0) return { minPrice: 0, maxPrice: 1, maxVol: 1 };
    const highs = klines.map((k) => k.high);
    const lows = klines.map((k) => k.low);
    const vols = klines.map((k) => k.volume);
    const minP = Math.min(...lows);
    const maxP = Math.max(...highs);
    const margin = (maxP - minP) * 0.05 || maxP * 0.01;
    return {
      minPrice: Math.max(0, minP - margin),
      maxPrice: maxP + margin,
      maxVol: Math.max(...vols) || 1
    };
  }, [klines]);

  // Coordinate scales
  const priceRange = maxPrice - minPrice || 1;
  const getY = (price) => padding.top + (1 - (price - minPrice) / priceRange) * innerHeight;
  const getX = (index) => padding.left + (index + 0.5) * (innerWidth / Math.max(klines.length, 1));
  const candleWidth = Math.max(4, (innerWidth / Math.max(klines.length, 1)) * 0.65);

  const activeCandle = hoverIndex !== null && klines[hoverIndex] ? klines[hoverIndex] : klines[klines.length - 1];
  const activeChangePct = activeCandle ? ((activeCandle.close - activeCandle.open) / (activeCandle.open || 1)) * 100 : 0;
  const isCandleBullish = activeCandle && activeCandle.close >= activeCandle.open;

  // TradingView embed URL fallback
  const formattedSymbol = `BINANCE:${symbol.toUpperCase()}`;
  const tvEmbedUrl = `https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(
    formattedSymbol
  )}&interval=${interval === '1d' ? 'D' : interval.replace('m', '')}&theme=dark&style=1&timezone=Etc%2FUTC&locale=en`;

  return (
    <div className="relative w-full h-[500px] lg:h-[540px] bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-lg flex flex-col font-mono">
      {/* Top Controls Bar */}
      <div className="h-11 px-4 bg-dark-850 border-b border-dark-750 flex items-center justify-between gap-2 shrink-0">
        {/* Left: Active Pair info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-trade-green animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wider">
              {symbol}
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-trade-green/10 text-trade-green border border-trade-green/30">
              <span className="w-1.5 h-1.5 rounded-full bg-trade-green animate-pulse" />
              LIVE 1s
            </span>
          </div>

          {/* Timeframe selector */}
          <div className="hidden sm:flex items-center bg-dark-950 p-0.5 rounded-lg border border-dark-750 text-[10px]">
            {['15m', '1h', '4h', '1d'].map((tf) => (
              <button
                key={tf}
                onClick={() => setInterval(tf)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  interval === tf
                    ? 'bg-trade-cyan text-dark-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Engine Indicator & Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-dark-950 p-0.5 rounded-lg border border-dark-750 text-[10px]">
            <button
              onClick={() => setChartMode('native')}
              className={`px-2 py-0.5 rounded transition-colors ${
                chartMode === 'native'
                  ? 'bg-dark-750 text-trade-cyan font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              NATIVE FEED
            </button>
            <button
              onClick={() => setChartMode('tradingview')}
              className={`px-2 py-0.5 rounded transition-colors ${
                chartMode === 'tradingview'
                  ? 'bg-dark-750 text-trade-cyan font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TRADINGVIEW
            </button>
          </div>

          <button
            onClick={fetchCandles}
            title="Refresh Candles"
            className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="flex-1 w-full bg-dark-950 relative overflow-hidden flex flex-col justify-between">
        {chartMode === 'native' ? (
          <>
            {/* Live Candle OHLC Header */}
            {activeCandle && (
              <div className="px-4 py-1.5 bg-dark-900/70 border-b border-dark-800 text-[11px] flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 shrink-0 select-none">
                <span className="text-white font-bold">{formatDate(activeCandle.closeTime || activeCandle.time * 1000)}</span>
                <span>O: <span className="text-white font-bold">{formatPrice(activeCandle.open, 4)}</span></span>
                <span>H: <span className="text-white font-bold">{formatPrice(activeCandle.high, 4)}</span></span>
                <span>L: <span className="text-white font-bold">{formatPrice(activeCandle.low, 4)}</span></span>
                <span>C: <span className={`font-bold ${isCandleBullish ? 'text-trade-green' : 'text-trade-red'}`}>{formatPrice(activeCandle.close, 4)}</span></span>
                <span className={`font-semibold ${isCandleBullish ? 'text-trade-green' : 'text-trade-red'}`}>
                  {isCandleBullish ? '+' : ''}{activeChangePct.toFixed(2)}%
                </span>
                <span className="hidden md:inline">Vol: <span className="text-slate-300">{formatNumber(activeCandle.volume, 2)}</span></span>
                <span className="text-trade-cyan text-[10px]">EMA9: {formatPrice(ema9[hoverIndex !== null ? hoverIndex : ema9.length - 1], 4)}</span>
                <span className="text-amber-400 text-[10px]">EMA21: {formatPrice(ema21[hoverIndex !== null ? hoverIndex : ema21.length - 1], 4)}</span>
              </div>
            )}

            {/* SVG Candlestick Canvas */}
            <div className="flex-1 relative w-full h-full">
              {loading && klines.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark-950">
                  <RefreshCw className="w-6 h-6 text-trade-cyan animate-spin" />
                  <span className="text-xs text-slate-400">Loading {symbol} candlesticks...</span>
                </div>
              ) : (
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  preserveAspectRatio="none"
                  className="w-full h-full select-none cursor-crosshair"
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {/* Grid lines */}
                  {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => {
                    const price = minPrice + priceRange * (1 - ratio);
                    const y = padding.top + innerHeight * ratio;
                    return (
                      <g key={i}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke="#1a2232"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={chartWidth - padding.right + 6}
                          y={y + 3}
                          fill="#64748b"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {formatPrice(price, 4)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Volume Bars */}
                  {klines.map((k, idx) => {
                    const x = getX(idx);
                    const isBull = k.close >= k.open;
                    const volHeight = (k.volume / maxVol) * 55;
                    const y = chartHeight - padding.bottom - volHeight;
                    return (
                      <rect
                        key={`vol-${idx}`}
                        x={x - candleWidth / 2}
                        y={y}
                        width={candleWidth}
                        height={volHeight}
                        fill={isBull ? 'rgba(0, 240, 144, 0.18)' : 'rgba(255, 59, 87, 0.18)'}
                      />
                    );
                  })}

                  {/* Candlesticks (Wicks and Bodies) */}
                  {klines.map((k, idx) => {
                    const x = getX(idx);
                    const isBull = k.close >= k.open;
                    const highY = getY(k.high);
                    const lowY = getY(k.low);
                    const openY = getY(k.open);
                    const closeY = getY(k.close);
                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.max(2, Math.abs(closeY - openY));
                    const color = isBull ? '#00f090' : '#ff3b57';

                    return (
                      <g
                        key={`candle-${idx}`}
                        onMouseEnter={() => setHoverIndex(idx)}
                      >
                        {/* Upper & lower wick */}
                        <line
                          x1={x}
                          y1={highY}
                          x2={x}
                          y2={lowY}
                          stroke={color}
                          strokeWidth="1.2"
                        />
                        {/* Candle Body */}
                        <rect
                          x={x - candleWidth / 2}
                          y={bodyTop}
                          width={candleWidth}
                          height={bodyHeight}
                          fill={color}
                          rx="0.5"
                        />
                      </g>
                    );
                  })}

                  {/* EMA 9 Curve (Cyan) */}
                  {ema9.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#00d2ff"
                      strokeWidth="1.5"
                      points={ema9
                        .map((p, idx) => `${getX(idx)},${getY(p)}`)
                        .join(' ')}
                    />
                  )}

                  {/* EMA 21 Curve (Amber) */}
                  {ema21.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      points={ema21
                        .map((p, idx) => `${getX(idx)},${getY(p)}`)
                        .join(' ')}
                    />
                  )}

                  {/* Hover Crosshair */}
                  {hoverIndex !== null && klines[hoverIndex] && (
                    <g>
                      <line
                        x1={getX(hoverIndex)}
                        y1={padding.top}
                        x2={getX(hoverIndex)}
                        y2={chartHeight - padding.bottom}
                        stroke="#94a3b8"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                      />
                      <line
                        x1={padding.left}
                        y1={getY(klines[hoverIndex].close)}
                        x2={chartWidth - padding.right}
                        y2={getY(klines[hoverIndex].close)}
                        stroke="#94a3b8"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                      />
                    </g>
                  )}
                </svg>
              )}
            </div>
          </>
        ) : (
          /* TRADINGVIEW IFRAME VIEW */
          <div className="w-full h-full relative">
            {tvLoading && (
              <div className="absolute inset-0 bg-dark-950 flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
                <RefreshCw className="w-6 h-6 text-trade-cyan animate-spin" />
                <span className="text-xs text-slate-400">Loading TradingView for {symbol}...</span>
              </div>
            )}
            <iframe
              key={symbol}
              src={tvEmbedUrl}
              title={`TradingView Chart ${symbol}`}
              onLoad={() => setTvLoading(false)}
              className="w-full h-full border-0 absolute inset-0"
              allowTransparency="true"
              scrolling="no"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(TradingChart);
