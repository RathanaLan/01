import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { formatPrice, formatPercent } from '../utils/formatters';

export default function MarketScanner({ 
  signals = [], 
  loading, 
  onRefresh, 
  onSelectPair 
}) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-dark-900 border border-dark-750 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-trade-cyan" />
            <h2 className="text-base font-mono font-bold text-white">
              ALGORITHMIC MARKET SCANNER & SIGNAL MATRIX
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Simultaneous multi-asset quantitative scan evaluating momentum, RSI, Bollinger Bands, and trend slopes.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="self-start md:self-center px-4 py-2 bg-dark-800 hover:bg-dark-750 border border-dark-700 text-xs font-mono text-slate-200 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Rescan Market</span>
        </button>
      </div>

      {/* Signals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.map((sig) => {
          if (!sig || sig.error) return null;
          const isBuy = sig.recommendation?.includes('BUY');
          const isSell = sig.recommendation?.includes('SELL');

          let cardBorder = 'border-dark-750';
          let badgeBg = 'bg-dark-800 text-slate-300';
          if (isBuy) {
            cardBorder = 'border-trade-green/30 hover:border-trade-green/60';
            badgeBg = 'bg-trade-green/15 text-trade-green border border-trade-green/40';
          } else if (isSell) {
            cardBorder = 'border-trade-red/30 hover:border-trade-red/60';
            badgeBg = 'bg-trade-red/15 text-trade-red border border-trade-red/40';
          }

          return (
            <div
              key={sig.symbol}
              className={`card-3d ${isBuy ? 'card-3d-green' : isSell ? 'card-3d-red' : ''} glass-card border ${cardBorder} rounded-xl p-5 shadow-lg flex flex-col justify-between`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center font-mono font-bold text-xs text-trade-cyan">
                      {sig.symbol.replace('USDT', '')}
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-white">
                        {sig.symbol}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">SPOT PAIR</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${badgeBg}`}>
                    {sig.recommendation}
                  </span>
                </div>

                {/* Price & Delta */}
                <div className="my-3 bg-dark-850 p-3 rounded-lg border border-dark-750 font-mono flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">PRICE</span>
                    <span className="text-sm font-bold text-white">
                      {formatPrice(sig.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">PROJECTED MOVE</span>
                    <span className={`text-sm font-bold ${sig.projectedChangePct >= 0 ? 'text-trade-green' : 'text-trade-red'}`}>
                      {formatPercent(sig.projectedChangePct)}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                  <div className="bg-dark-950 p-2 rounded border border-dark-750">
                    <span className="text-[10px] text-slate-400 block">RSI (14)</span>
                    <span className="font-semibold text-slate-200">{sig.rsi}</span>
                  </div>
                  <div className="bg-dark-950 p-2 rounded border border-dark-750">
                    <span className="text-[10px] text-slate-400 block">CONFIDENCE</span>
                    <span className="font-semibold text-trade-cyan">{sig.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPair(sig.symbol)}
                className="btn-3d w-full py-2 bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-trade-cyan/40 text-xs font-mono font-semibold text-white rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Launch in Terminal</span>
                <ArrowRight className="w-3.5 h-3.5 text-trade-cyan" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

