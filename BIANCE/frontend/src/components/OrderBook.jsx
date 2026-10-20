import React from 'react';
import { Layers } from 'lucide-react';
import { formatPrice, formatNumber } from '../utils/formatters';

export default function OrderBook({ 
  orderBook = { bids: [], asks: [] }, 
  symbol = 'BTCUSDT', 
  onSelectPrice 
}) {
  const bids = orderBook.bids || [];
  const asks = (orderBook.asks || []).slice(0, 8); // Top 8 asks
  const topBids = bids.slice(0, 8); // Top 8 bids

  // Find max quantity to compute depth visual bar percentages
  const allQtys = [...asks, ...topBids].map((item) => item.qty);
  const maxQty = allQtys.length > 0 ? Math.max(...allQtys) : 1;

  const highestBid = topBids[0]?.price || 0;
  const lowestAsk = asks[0]?.price || 0;
  const spread = lowestAsk && highestBid ? Math.abs(lowestAsk - highestBid) : 0;

  return (
    <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-lg font-mono text-xs flex flex-col">
      <div className="px-4 py-3 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-trade-cyan" />
          <h3 className="font-bold text-white tracking-wider text-xs">
            ORDER BOOK // {symbol}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400">DEPTH (L2)</span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-trade-green/10 text-trade-green border border-trade-green/30">
            <span className="w-1.5 h-1.5 rounded-full bg-trade-green animate-pulse" />
            LIVE 1s
          </span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-2 text-[10px] text-slate-400 border-b border-dark-750 pb-1">
          <span>PRICE (USDT)</span>
          <span className="text-right">SIZE</span>
        </div>

        {/* Asks (Sells) in reverse order (highest to lowest) */}
        <div className="space-y-1">
          {asks.slice().reverse().map((ask, idx) => {
            const widthPct = Math.min(100, (ask.qty / maxQty) * 100);
            return (
              <div
                key={`ask-${idx}`}
                onClick={() => onSelectPrice && onSelectPrice(ask.price)}
                className="relative grid grid-cols-2 py-0.5 px-1 rounded hover:bg-dark-800 cursor-pointer transition-colors"
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-trade-red/10 rounded pointer-events-none"
                  style={{ width: `${widthPct}%` }}
                />
                <span className="text-trade-red font-semibold z-10">
                  {formatPrice(ask.price)}
                </span>
                <span className="text-right text-slate-400 z-10">
                  {formatNumber(ask.qty, 4)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Spread Divider */}
        <div className="py-1 px-2 my-1 bg-dark-950 border-y border-dark-750 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">SPREAD</span>
          <span className="text-trade-cyan font-bold">
            {formatPrice(spread, 3)}
          </span>
        </div>

        {/* Bids (Buys) */}
        <div className="space-y-1">
          {topBids.map((bid, idx) => {
            const widthPct = Math.min(100, (bid.qty / maxQty) * 100);
            return (
              <div
                key={`bid-${idx}`}
                onClick={() => onSelectPrice && onSelectPrice(bid.price)}
                className="relative grid grid-cols-2 py-0.5 px-1 rounded hover:bg-dark-800 cursor-pointer transition-colors"
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-trade-green/10 rounded pointer-events-none"
                  style={{ width: `${widthPct}%` }}
                />
                <span className="text-trade-green font-semibold z-10">
                  {formatPrice(bid.price)}
                </span>
                <span className="text-right text-slate-400 z-10">
                  {formatNumber(bid.qty, 4)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

