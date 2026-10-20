import React, { useState, useEffect } from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  ShieldAlert,
  Percent,
  Zap,
  PiggyBank,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { placeOrder, placeFuturesOrder } from '../services/api';
import { formatPrice, formatNumber } from '../utils/formatters';

export default function TradeExecution({ 
  symbol = 'BTCUSDT', 
  currentPrice = 0, 
  accountBalances = [],
  allWalletsData = null,
  onOrderSuccess,
  prefilledSignal = null,
  marketType = 'SPOT',
  onMarketTypeChange
}) {
  const [internalMarketType, setInternalMarketType] = useState(marketType);
  const [side, setSide] = useState('BUY'); // 'BUY' | 'SELL'
  const [orderType, setOrderType] = useState('LIMIT'); // 'LIMIT' | 'MARKET'
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [leverage, setLeverage] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  // Sync internal market type when prop changes
  useEffect(() => {
    if (marketType) {
      setInternalMarketType(marketType);
    }
  }, [marketType]);

  const isFutures = internalMarketType === 'FUTURES';

  // Extract base and quote assets dynamically (supports USDT, FDUSD, BTC, ETH)
  const quoteAsset = symbol.endsWith('USDT') 
    ? 'USDT' 
    : symbol.endsWith('FDUSD') 
    ? 'FDUSD' 
    : symbol.endsWith('BTC') 
    ? 'BTC' 
    : symbol.endsWith('ETH') 
    ? 'ETH' 
    : 'USDT';
  const baseAsset = symbol.endsWith(quoteAsset) 
    ? symbol.slice(0, -quoteAsset.length) 
    : symbol;

  // Look up balances across all wallets
  const spotQuoteBalance = accountBalances.find((b) => b.asset === quoteAsset)?.free || 0;
  const earnQuoteBalance = accountBalances.find((b) => b.asset === `LD${quoteAsset}`)?.free || 0;
  const futuresQuoteBalance = allWalletsData?.futures?.availableBalance
    || allWalletsData?.futures?.assets?.find((a) => a.asset === quoteAsset)?.availableBalance 
    || allWalletsData?.futures?.assets?.find((a) => a.asset === quoteAsset)?.walletBalance 
    || 0;
  const totalQuoteAvailable = spotQuoteBalance + earnQuoteBalance + futuresQuoteBalance;

  const spotBaseBalance = accountBalances.find((b) => b.asset === baseAsset)?.free || 0;
  const earnBaseBalance = accountBalances.find((b) => b.asset === `LD${baseAsset}`)?.free || 0;
  const totalBaseBalance = spotBaseBalance + earnBaseBalance;

  // Initialize limit price when symbol changes or when price is empty
  useEffect(() => {
    if (currentPrice) {
      setPrice(currentPrice.toString());
      setQuantity('');
    }
  }, [symbol]);

  useEffect(() => {
    if (currentPrice && !price) {
      setPrice(currentPrice.toString());
    }
  }, [currentPrice]);

  // Handle prefilled signal if clicked from the Prediction Panel
  useEffect(() => {
    if (prefilledSignal) {
      if (prefilledSignal.side) setSide(prefilledSignal.side);
      if (prefilledSignal.price) setPrice(prefilledSignal.price.toString());
      setFeedback({
        type: 'info',
        message: `Console prefilled with ${prefilledSignal.side} target price`
      });
    }
  }, [prefilledSignal]);

  // Handle percentage allocation shortcuts
  const handlePercentAllocation = (pct) => {
    const activePrice = orderType === 'LIMIT' ? parseFloat(price) || currentPrice : currentPrice;
    if (!activePrice || activePrice <= 0) return;

    if (isFutures) {
      // Futures leveraged budget calculation
      const availMargin = futuresQuoteBalance > 0 ? futuresQuoteBalance : 50;
      const budget = availMargin * (pct / 100) * leverage;
      const computedQty = budget / activePrice;
      setQuantity(computedQty >= 1 ? Math.floor(computedQty).toString() : computedQty.toFixed(4));
    } else {
      // Spot budget calculation
      if (side === 'BUY') {
        const budget = (spotQuoteBalance > 0 ? spotQuoteBalance : totalQuoteAvailable) * (pct / 100);
        const computedQty = budget / activePrice;
        setQuantity(computedQty.toFixed(5));
      } else {
        const budget = (spotBaseBalance > 0 ? spotBaseBalance : totalBaseBalance) * (pct / 100);
        setQuantity(budget.toFixed(5));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const numQty = parseFloat(quantity);
    const numPrice = orderType === 'LIMIT' ? parseFloat(price) : null;

    if (!numQty || numQty <= 0) {
      setFeedback({ type: 'error', message: 'Please enter a valid positive quantity.' });
      return;
    }

    if (orderType === 'LIMIT' && (!numPrice || numPrice <= 0)) {
      setFeedback({ type: 'error', message: 'Limit orders require a valid price.' });
      return;
    }

    setSubmitting(true);

    try {
      if (isFutures) {
        // Execute USDT-M Futures Order
        const result = await placeFuturesOrder({
          symbol,
          side,
          type: orderType,
          quantity: numQty,
          price: numPrice,
          leverage
        });

        setFeedback({
          type: 'success',
          message: result.message || `Futures ${side} order executed: ${numQty} ${symbol} @ ${numPrice || 'MARKET'} (${leverage}x)`
        });
      } else {
        // Execute Spot Order
        const result = await placeOrder({
          symbol,
          side,
          type: orderType,
          quantity: numQty,
          price: numPrice
        });

        setFeedback({
          type: 'success',
          message: result.message || `Order successfully executed: ${side} ${numQty} ${symbol}`
        });
      }

      setQuantity('');
      if (onOrderSuccess) onOrderSuccess();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to place order. Verify your balance and API permissions.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const totalEstimate = ((parseFloat(price) || currentPrice) * (parseFloat(quantity) || 0)).toFixed(2);
  const requiredMarginEstimate = isFutures ? (parseFloat(totalEstimate) / leverage).toFixed(2) : totalEstimate;

  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-lg flex flex-col font-mono">
      {/* Header & Market Switcher */}
      <div className="px-4 py-3 bg-dark-850/80 border-b border-dark-750 flex items-center justify-between gap-2">
        <h2 className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
          <span>ORDER EXECUTION // {symbol}</span>
        </h2>

        {/* Spot vs Futures Switcher */}
        <div className="flex items-center gap-1 bg-dark-950 p-0.5 rounded-lg border border-dark-750 text-[10px]">
          <button
            type="button"
            onClick={() => {
              setInternalMarketType('SPOT');
              if (onMarketTypeChange) onMarketTypeChange('SPOT');
            }}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              !isFutures
                ? 'bg-trade-cyan text-dark-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SPOT
          </button>
          <button
            type="button"
            onClick={() => {
              setInternalMarketType('FUTURES');
              if (onMarketTypeChange) onMarketTypeChange('FUTURES');
            }}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              isFutures
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            FUTURES
          </button>
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {/* Futures Leverage Selector (Shown only in Futures mode) */}
        {isFutures && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>LEVERAGE</span>
              </span>
              <span className="text-purple-300 font-extrabold text-sm">{leverage}x</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 5, 10, 20].map((lev) => (
                <button
                  key={lev}
                  type="button"
                  onClick={() => setLeverage(lev)}
                  className={`py-1 rounded text-[11px] font-bold border transition-colors ${
                    leverage === lev
                      ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                      : 'bg-dark-900 text-slate-300 border-dark-750 hover:bg-dark-800'
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Buy / Sell Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-dark-950 p-1 rounded-xl border border-dark-750">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className={`py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              side === 'BUY'
                ? 'bg-trade-green text-dark-950 shadow-md shadow-trade-green/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpCircle className="w-4 h-4" />
            <span>{isFutures ? `LONG (BUY)` : `BUY ${baseAsset}`}</span>
          </button>
          <button
            type="button"
            onClick={() => setSide('SELL')}
            className={`py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              side === 'SELL'
                ? 'bg-trade-red text-white shadow-md shadow-trade-red/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span>{isFutures ? `SHORT (SELL)` : `SELL ${baseAsset}`}</span>
          </button>
        </div>

        {/* Order Type (LIMIT vs MARKET) */}
        <div className="flex items-center justify-between text-xs border-b border-dark-750 pb-3">
          <span className="text-slate-400">ORDER TYPE</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOrderType('LIMIT')}
              className={`px-3 py-1 rounded-md transition-colors ${
                orderType === 'LIMIT'
                  ? 'bg-dark-750 text-trade-cyan font-bold border border-trade-cyan/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LIMIT
            </button>
            <button
              type="button"
              onClick={() => setOrderType('MARKET')}
              className={`px-3 py-1 rounded-md transition-colors ${
                orderType === 'MARKET'
                  ? 'bg-dark-750 text-trade-cyan font-bold border border-trade-cyan/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MARKET
            </button>
          </div>
        </div>

        {/* Available Balance indicator */}
        <div className="bg-dark-850 p-2.5 rounded-lg border border-dark-750 text-xs space-y-1.5">
          {isFutures ? (
            <div className="flex items-center justify-between">
              <span className="text-purple-300 flex items-center gap-1.5 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>FUTURES MARGIN AVAILABLE:</span>
              </span>
              <span className="text-white font-bold">
                ${formatNumber(futuresQuoteBalance, 2)} USDT
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">SPOT WALLET (AVAILABLE TO TRADE):</span>
                <span className="text-white font-bold">
                  {side === 'BUY'
                    ? `${formatNumber(spotQuoteBalance, 2)} ${quoteAsset}`
                    : `${formatNumber(spotBaseBalance, 6)} ${baseAsset}`}
                </span>
              </div>

              {side === 'BUY' && futuresQuoteBalance > 0 && (
                <div className="flex items-center justify-between text-[11px] text-purple-400 pt-1 border-t border-dark-750/70">
                  <span className="flex items-center gap-1 font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>IN FUTURES WALLET:</span>
                  </span>
                  <span className="font-bold">{formatNumber(futuresQuoteBalance, 2)} {quoteAsset}</span>
                </div>
              )}
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* Price Input (only active for LIMIT) */}
          <div>
            <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
              <label>ORDER PRICE</label>
              <span>{orderType === 'MARKET' ? 'BEST MARKET PRICE' : 'USDT'}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                disabled={orderType === 'MARKET'}
                value={orderType === 'MARKET' ? currentPrice : price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className={`w-full bg-dark-950 border ${
                  orderType === 'MARKET' ? 'border-dark-750 text-slate-400 cursor-not-allowed' : 'border-dark-700 text-white focus:border-trade-cyan'
                } rounded-lg px-3 py-2.5 focus:outline-none`}
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold">
                USDT
              </span>
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
              <label>AMOUNT</label>
              <span>{baseAsset}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.0000"
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-trade-cyan"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold">
                {baseAsset}
              </span>
            </div>
          </div>

          {/* Quick Percentage Buttons */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {[25, 50, 75, 100].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => handlePercentAllocation(pct)}
                className="btn-3d py-1 bg-dark-800 hover:bg-dark-750 border border-dark-700 rounded text-[11px] text-slate-300 transition-colors"
              >
                {pct}%
              </button>
            ))}
          </div>

          {/* Total Value Estimate & Margin Required */}
          <div className="pt-2 border-t border-dark-750 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">NOTIONAL VALUE:</span>
              <span className="text-white font-bold">≈ ${totalEstimate} USDT</span>
            </div>
            {isFutures && (
              <div className="flex justify-between items-center text-[11px] text-purple-300 font-semibold">
                <span>EST. REQUIRED MARGIN ({leverage}x):</span>
                <span>≈ ${requiredMarginEstimate} USDT</span>
              </div>
            )}
          </div>

          {/* Feedback Messages */}
          {feedback && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                feedback.type === 'success'
                  ? 'bg-trade-green/10 text-trade-green border border-trade-green/30'
                  : feedback.type === 'error'
                  ? 'bg-trade-red/10 text-trade-red border border-trade-red/30'
                  : 'bg-trade-cyan/10 text-trade-cyan border border-trade-cyan/30'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div className="break-all">{feedback.message}</div>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`btn-3d w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-2 shadow-xl ${
              side === 'BUY'
                ? 'bg-trade-green hover:bg-trade-greenDark text-dark-950 shadow-trade-green/25 hover:shadow-trade-green/40'
                : 'bg-trade-red hover:bg-trade-redDark text-white shadow-trade-red/25 hover:shadow-trade-red/40'
            } ${submitting ? 'opacity-60 cursor-wait' : ''}`}
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>ROUTING ORDER TO BINANCE...</span>
              </>
            ) : (
              <span>
                {isFutures 
                  ? `${side === 'BUY' ? 'LONG (BUY)' : 'SHORT (SELL)'} ${baseAsset} (${leverage}x)`
                  : `${side} ${baseAsset} (${orderType})`}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
