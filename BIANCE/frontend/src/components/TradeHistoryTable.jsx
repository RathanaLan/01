import React from 'react';
import { History, RefreshCw } from 'lucide-react';
import { formatPrice, formatNumber, formatDate } from '../utils/formatters';

export default function TradeHistoryTable({ 
  trades = [], 
  symbol = 'BTCUSDT', 
  loading, 
  onRefresh 
}) {
  return (
    <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-lg font-mono">
      <div className="px-5 py-3.5 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-trade-cyan" />
          <h3 className="text-xs font-bold text-white tracking-wider">
            TRADE HISTORY // {symbol} ({trades.length})
          </h3>
        </div>
        <button
          onClick={onRefresh}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {trades.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950 text-slate-400 border-b border-dark-750 text-[11px]">
              <tr>
                <th className="py-2.5 px-4">TIME</th>
                <th className="py-2.5 px-4">SIDE</th>
                <th className="py-2.5 px-4">EXECUTION PRICE</th>
                <th className="py-2.5 px-4">QUANTITY</th>
                <th className="py-2.5 px-4">TOTAL (USDT)</th>
                <th className="py-2.5 px-4">FEE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750 text-slate-200">
              {trades.map((trade) => {
                const isBuy = trade.isBuyer;
                return (
                  <tr key={trade.id} className="hover:bg-dark-800/60 transition-colors">
                    <td className="py-2.5 px-4 text-slate-400">{formatDate(trade.time)}</td>
                    <td className="py-2.5 px-4 font-bold">
                      <span className={isBuy ? 'text-trade-green' : 'text-trade-red'}>
                        {isBuy ? 'BUY' : 'SELL'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-white font-bold">{formatPrice(trade.price)}</td>
                    <td className="py-2.5 px-4">{formatNumber(trade.qty, 5)}</td>
                    <td className="py-2.5 px-4 text-slate-300">{formatPrice(trade.quoteQty)}</td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {trade.commission} {trade.commissionAsset}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 text-xs">
          No executed trade history found for {symbol}.
        </div>
      )}
    </div>
  );
}

