/**
 * Binance WebSocket Streaming Service
 * Connects directly to Binance Vision high-speed public WebSocket cluster
 * for real-time sub-second price ticks, order book depth, and kline streaming.
 */

const WS_BASE = 'wss://data-stream.binance.vision/ws';

/**
 * Connect to real-time 24h Ticker Stream
 * Updates on every price tick (sub-second)
 */
export function connectBinanceTicker(symbol, onTick, onError = null, marketType = 'SPOT') {
  if (!symbol) return () => {};

  const cleanSymbol = symbol.toLowerCase().trim();
  const isFutures = marketType === 'FUTURES' || cleanSymbol.startsWith('1000') || cleanSymbol.includes('_');
  const wsUrl = isFutures 
    ? `wss://fstream.binance.com/ws/${cleanSymbol}@ticker` 
    : `wss://data-stream.binance.vision/ws/${cleanSymbol}@ticker`;

  let ws = null;
  let isClosedManually = false;
  let reconnectTimeout = null;

  const connect = () => {
    try {
      ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          if (raw && raw.s) {
            const formatted = {
              symbol: raw.s,
              lastPrice: parseFloat(raw.c),
              priceChange: parseFloat(raw.p),
              priceChangePercent: parseFloat(raw.P),
              highPrice: parseFloat(raw.h),
              lowPrice: parseFloat(raw.l),
              volume: parseFloat(raw.v),
              quoteVolume: parseFloat(raw.q),
              openPrice: parseFloat(raw.o),
              weightedAvgPrice: parseFloat(raw.w),
              count: raw.n
            };
            if (onTick) onTick(formatted);
          }
        } catch {
          // Ignore parse errors on individual frames
        }
      };

      ws.onerror = (err) => {
        if (onError) onError(err);
      };

      ws.onclose = () => {
        if (!isClosedManually) {
          reconnectTimeout = setTimeout(connect, 2000);
        }
      };
    } catch (err) {
      if (onError) onError(err);
    }
  };

  connect();

  return () => {
    isClosedManually = true;
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
    if (ws) {
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;
      try {
        ws.close();
      } catch {
        // ignore
      }
    }
  };
}

/**
 * Connect to real-time L2 Order Book Depth Stream
 * Updates every 1000ms with top 10 bids & asks
 */
export function connectBinanceDepth(symbol, onDepth, onError = null, marketType = 'SPOT') {
  if (!symbol) return () => {};

  const cleanSymbol = symbol.toLowerCase().trim();
  const isFutures = marketType === 'FUTURES' || cleanSymbol.startsWith('1000') || cleanSymbol.includes('_');
  const wsUrl = isFutures
    ? `wss://fstream.binance.com/ws/${cleanSymbol}@depth10@1000ms`
    : `${WS_BASE}/${cleanSymbol}@depth10@1000ms`;

  let ws = null;
  let isClosedManually = false;
  let reconnectTimeout = null;

  const connect = () => {
    try {
      ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          if (raw && (raw.bids || raw.asks)) {
            const formatted = {
              bids: (raw.bids || []).map(([price, qty]) => ({
                price: parseFloat(price),
                qty: parseFloat(qty)
              })),
              asks: (raw.asks || []).map(([price, qty]) => ({
                price: parseFloat(price),
                qty: parseFloat(qty)
              }))
            };
            if (onDepth) onDepth(formatted);
          }
        } catch {
          // Ignore frame parse error
        }
      };

      ws.onerror = (err) => {
        if (onError) onError(err);
      };

      ws.onclose = () => {
        if (!isClosedManually) {
          reconnectTimeout = setTimeout(connect, 2000);
        }
      };
    } catch (err) {
      if (onError) onError(err);
    }
  };

  connect();

  return () => {
    isClosedManually = true;
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
    if (ws) {
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;
      try {
        ws.close();
      } catch {
        // ignore
      }
    }
  };
}

/**
 * Connect to real-time Candlestick (Kline) Stream
 * Updates open, high, low, close, volume on every tick for the active timeframe
 */
export function connectBinanceKline(symbol, interval = '1h', onKline, onError = null, marketType = 'SPOT') {
  if (!symbol) return () => {};

  const cleanSymbol = symbol.toLowerCase().trim();
  const isFutures = marketType === 'FUTURES' || cleanSymbol.startsWith('1000') || cleanSymbol.includes('_');
  const wsUrl = isFutures
    ? `wss://fstream.binance.com/ws/${cleanSymbol}@kline_${interval}`
    : `${WS_BASE}/${cleanSymbol}@kline_${interval}`;

  let ws = null;
  let isClosedManually = false;
  let reconnectTimeout = null;

  const connect = () => {
    try {
      ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          if (raw && raw.k) {
            const k = raw.k;
            const candle = {
              time: Math.floor(k.t / 1000),
              openTime: k.t,
              closeTime: k.T,
              open: parseFloat(k.o),
              high: parseFloat(k.h),
              low: parseFloat(k.l),
              close: parseFloat(k.c),
              volume: parseFloat(k.v),
              isClosed: k.x
            };
            if (onKline) onKline(candle);
          }
        } catch {
          // Ignore frame parse error
        }
      };

      ws.onerror = (err) => {
        if (onError) onError(err);
      };

      ws.onclose = () => {
        if (!isClosedManually) {
          reconnectTimeout = setTimeout(connect, 2000);
        }
      };
    } catch (err) {
      if (onError) onError(err);
    }
  };

  connect();

  return () => {
    isClosedManually = true;
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
    if (ws) {
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;
      try {
        ws.close();
      } catch {
        // ignore
      }
    }
  };
}

