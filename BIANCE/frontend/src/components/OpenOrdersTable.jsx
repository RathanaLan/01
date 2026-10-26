import React, { useState } from 'react';
import { Trash2, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { cancelOrder } from '../services/api';
import { formatPrice, formatNumber, formatDate } from '../utils/formatters';

export default function OpenOrdersTable({ 
  orders = [], 
  loading, 
  onRefresh 
}) {
  const [cancellingId, setCancellingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleCancel = async (symbol, orderId) => {
    setCancellingId(orderId);
    setErrorMsg(null);
    try {
      await cancelOrder(symbol, orderId);
      if (onRefresh) onRefresh();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to cancel order');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-lg font-mono">
      <div className="px-5 py-3.5 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-trade-cyan" />
          <h3 className="text-xs font-bold text-white tracking-wider">
            OPEN ORDERS ({orders.length})
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

      {errorMsg && (
        <div className="p-3 bg-trade-red/10 border-b border-trade-red/30 text-trade-red text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950 text-slate-400 border-b border-dark-750 text-[11px]">
              <tr>
                <th className="py-2.5 px-4">DATE</th>
                <th className="py-2.5 px-4">PAIR</th>
                <th className="py-2.5 px-4">TYPE</th>
                <th className="py-2.5 px-4">SIDE</th>
                <th className="py-2.5 px-4">PRICE</th>
                <th className="py-2.5 px-4">AMOUNT</th>
                <th className="py-2.5 px-4">FILLED</th>
                <th className="py-2.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750 text-slate-200">
              {orders.map((ord) => {
                const isBuy = ord.side === 'BUY';
                return (
                  <tr key={ord.orderId} className="hover:bg-dark-800/60 transition-colors">
                    <td className="py-3 px-4 text-slate-400">{formatDate(ord.time)}</td>
                    <td className="py-3 px-4 font-bold text-white">{ord.symbol}</td>
                    <td className="py-3 px-4 text-slate-300">{ord.type}</td>
                    <td className="py-3 px-4 font-bold">
                      <span className={isBuy ? 'text-trade-green' : 'text-trade-red'}>
                        {ord.side}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatPrice(ord.price)}</td>
                    <td className="py-3 px-4">{formatNumber(ord.origQty, 4)}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {((parseFloat(ord.executedQty) / parseFloat(ord.origQty)) * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleCancel(ord.symbol, ord.orderId)}
                        disabled={cancellingId === ord.orderId}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-trade-red/20 text-slate-400 hover:text-trade-red transition-colors"
                        title="Cancel Order"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 text-xs">
          No open orders currently pending execution.
        </div>
      )}
    </div>
  );
}

