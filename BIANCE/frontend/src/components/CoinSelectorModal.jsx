import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  Coins, 
  Zap,
  Check,
  RefreshCw,
  Layers
} from 'lucide-react';
import { formatPrice, formatPercent } from '../utils/formatters';

const SPOT_PINS = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE', 'PEPE', 'SUI', 'XRP', 'AVAX', 'NEAR'];
const FUTURES_PINS = ['BTC', 'ETH', 'SOL', '1000PEPE', 'DOGE', 'JCT', 'DOOD', 'AGT', 'SUI', 'XRP'];

const FALLBACK_SYMBOLS = [
  { symbol: 'BTCUSDT', baseAsset: 'BTC', quoteAsset: 'USDT', marketType: 'SPOT' },
  { symbol: 'ETHUSDT', baseAsset: 'ETH', quoteAsset: 'USDT', marketType: 'SPOT' },
  { symbol: 'SOLUSDT', baseAsset: 'SOL', quoteAsset: 'USDT', marketType: 'SPOT' },
  { symbol: 'BNBUSDT', baseAsset: 'BNB', quoteAsset: 'USDT', marketType: 'SPOT' },
  { symbol: 'DOGEUSDT', baseAsset: 'DOGE', quoteAsset: 'USDT', marketType: 'SPOT' },
  { symbol: 'PEPEUSDT', baseAsset: 'PEPE', quoteAsset: 'USDT', marketType: 'SPOT' },
  { symbol: 'BTCUSDT', baseAsset: 'BTC', quoteAsset: 'USDT', marketType: 'FUTURES' },
  { symbol: 'ETHUSDT', baseAsset: 'ETH', quoteAsset: 'USDT', marketType: 'FUTURES' },
  { symbol: 'SOLUSDT', baseAsset: 'SOL', quoteAsset: 'USDT', marketType: 'FUTURES' },
  { symbol: '1000PEPEUSDT', baseAsset: '1000PEPE', quoteAsset: 'USDT', marketType: 'FUTURES' },
  { symbol: 'JCTUSDT', baseAsset: 'JCT', quoteAsset: 'USDT', marketType: 'FUTURES' },
  { symbol: 'DOODUSDT', baseAsset: 'DOOD', quoteAsset: 'USDT', marketType: 'FUTURES' },
  { symbol: 'AGTUSDT', baseAsset: 'AGT', quoteAsset: 'USDT', marketType: 'FUTURES' },
  { symbol: 'QUSDT', baseAsset: 'Q', quoteAsset: 'USDT', marketType: 'FUTURES' }
];

export default function CoinSelectorModal({
  isOpen,
  onClose,
  selectedSymbol,
  onSelectSymbol,
  allSymbols = [],
  allTickers = [],
  activeMarketType = 'ALL',
  loading = false,
  onRefresh
}) {
  const [search, setSearch] = useState('');
  const [marketTab, setMarketTab] = useState('ALL'); // 'ALL' | 'SPOT' | 'FUTURES'
  const [quoteTab, setQuoteTab] = useState('ALL'); // 'USDT' | 'ALL' | 'BTC' | 'FDUSD'

  // Map tickers by symbol for O(1) fast price & volume lookup
  const tickerMap = useMemo(() => {
    const map = new Map();
    const list = Array.isArray(allTickers) ? allTickers : [];
    list.forEach((t) => {
      if (t && t.symbol) {
        map.set(t.symbol, t);
      }
    });
    return map;
  }, [allTickers]);

  // Sync marketTab if opened with specific activeMarketType
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      if (activeMarketType && activeMarketType !== 'ALL') {
        setMarketTab(activeMarketType);
      }
    }
  }, [isOpen, activeMarketType]);

  // Use allSymbols if populated, otherwise use fallback popular list
  const sourceSymbols = Array.isArray(allSymbols) && allSymbols.length > 0 ? allSymbols : FALLBACK_SYMBOLS;

  // Filter symbols based on search, marketTab, and quoteTab
  const filteredSymbols = useMemo(() => {
    const query = search.trim().toUpperCase();
    return sourceSymbols.filter((item) => {
      if (!item || !item.symbol) return false;
      const base = String(item.baseAsset || '').toUpperCase();
      const quote = String(item.quoteAsset || '').toUpperCase();
      const sym = String(item.symbol).toUpperCase();
      const itemMarketType = item.marketType || (sym.startsWith('1000') || item.contractType ? 'FUTURES' : 'SPOT');

      // 1. Market Tab match
      if (marketTab === 'SPOT' && itemMarketType !== 'SPOT') {
        return false;
      }
      if (marketTab === 'FUTURES' && itemMarketType !== 'FUTURES') {
        return false;
      }

      // 2. Quote Asset match
      if (quoteTab !== 'ALL' && quote !== quoteTab) {
        return false;
      }

      // 3. Search match
      if (!query) return true;
      return sym.includes(query) || base.includes(query) || quote.includes(query);
    });
  }, [sourceSymbols, search, quoteTab, marketTab]);

  if (!isOpen) return null;

  // Slice top 80 items for instant rendering
  const displaySymbols = filteredSymbols.slice(0, 80);

  const spotCount = sourceSymbols.filter((s) => s.marketType === 'SPOT').length;
  const futuresCount = sourceSymbols.filter((s) => s.marketType === 'FUTURES').length;

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none"
    >
      <div className="glass-panel border border-dark-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-[88vh] animate-pageFadeIn">
        {/* Header */}
        <div className="px-5 py-4 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${
              marketTab === 'FUTURES' 
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' 
                : 'bg-dark-800 border-dark-700 text-trade-cyan'
            }`}>
              {marketTab === 'FUTURES' ? <Zap className="w-5 h-5" /> : <Coins className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
                <span>SELECT CRYPTO ASSET</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  marketTab === 'FUTURES'
                    ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                    : 'bg-trade-cyan/15 text-trade-cyan border border-trade-cyan/30'
                }`}>
                  {filteredSymbols.length} Pairs
                </span>
              </h2>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {marketTab === 'FUTURES' 
                  ? 'ALL ACTIVE USDT-M FUTURES & PERPETUAL CONTRACTS ON BINANCE'
                  : marketTab === 'SPOT'
                  ? 'ALL AVAILABLE SPOT MARKETS ON BINANCE'
                  : 'SPOT MARKETS & USDT-M FUTURES CONTRACTS ON BINANCE'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                title="Refresh Coin List"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Market Category Selector Tabs (SPOT vs FUTURES) */}
        <div className="px-5 pt-3 bg-dark-850 flex items-center gap-2 border-b border-dark-750">
          <button
            onClick={() => setMarketTab('ALL')}
            className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              marketTab === 'ALL'
                ? 'border-white text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-slate-300" />
            <span>ALL MARKETS</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-dark-750 text-slate-300">
              {sourceSymbols.length}
            </span>
          </button>

          <button
            onClick={() => setMarketTab('SPOT')}
            className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              marketTab === 'SPOT'
                ? 'border-trade-cyan text-trade-cyan'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>SPOT MARKETS</span>
            {spotCount > 0 && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-dark-750 text-trade-cyan">
                {spotCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMarketTab('FUTURES')}
            className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              marketTab === 'FUTURES'
                ? 'border-purple-400 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>USDT-M FUTURES</span>
            {futuresCount > 0 && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-dark-750 text-purple-400 font-bold">
                {futuresCount} PERP
              </span>
            )}
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-dark-850/60 border-b border-dark-750 space-y-3">
          {/* Instant Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={marketTab === 'FUTURES' 
                ? "Search futures contracts (e.g. BTC, ETH, 1000PEPE, JCT, SOL)..."
                : "Search coins (e.g. BTC, ETH, PEPE, SUI, SOL)..."
              }
              className="w-full bg-dark-950 border border-dark-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-trade-cyan font-mono"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Quote Tabs & Popular Pins */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Quote Tabs */}
            <div className="flex items-center bg-dark-950 p-0.5 rounded-lg border border-dark-750 text-[11px]">
              {(marketTab === 'FUTURES' ? ['ALL', 'USDT'] : ['ALL', 'USDT', 'FDUSD', 'BTC']).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setQuoteTab(tab)}
                  className={`px-3 py-1 rounded transition-colors ${
                    quoteTab === tab
                      ? 'bg-trade-cyan text-dark-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Popular Pins */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Trending:</span>
              {(marketTab === 'FUTURES' ? FUTURES_PINS : SPOT_PINS).slice(0, 6).map((pin) => (
                <button
                  key={pin}
                  onClick={() => setSearch(pin)}
                  className="btn-3d px-1.5 py-0.5 rounded bg-dark-800 hover:bg-dark-750 text-slate-300 hover:text-trade-cyan transition-colors"
                >
                  {pin}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coins List / Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-dark-750 p-2">
          {displaySymbols.length > 0 ? (
            displaySymbols.map((item, idx) => {
              const sym = String(item.symbol);
              const base = String(item.baseAsset || sym);
              const quote = String(item.quoteAsset || 'USDT');
              const ticker = tickerMap.get(sym);
              const isSelected = selectedSymbol === sym;
              const price = ticker ? parseFloat(ticker.lastPrice) : null;
              const changePct = ticker ? parseFloat(ticker.priceChangePercent) : null;
              const isPositive = changePct !== null && changePct >= 0;
              const isFutures = item.marketType === 'FUTURES' || sym.startsWith('1000') || item.contractType === 'PERPETUAL';

              return (
                <div
                  key={`${sym}-${item.marketType || idx}`}
                  onClick={() => {
                    onSelectSymbol(sym, isFutures ? 'FUTURES' : 'SPOT');
                    onClose();
                  }}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-trade-cyan/15 border border-trade-cyan/40 text-white'
                      : 'hover:bg-dark-800/80 text-slate-200'
                  }`}
                >
                  {/* Left: Asset Names & Market Type Badge */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-[10px] shrink-0 ${
                      isFutures
                        ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                        : 'bg-dark-800 border-dark-700 text-trade-cyan'
                    }`}>
                      {base.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                        <span>{base}</span>
                        <span className="text-[10px] text-slate-400">/ {quote}</span>
                        {isFutures ? (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            FUTURES PERP
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold bg-trade-cyan/15 text-trade-cyan border border-trade-cyan/30">
                            SPOT
                          </span>
                        )}
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-trade-cyan ml-1" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {sym}
                      </span>
                    </div>
                  </div>

                  {/* Right: Price & 24h Change */}
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">
                      {price !== null && !isNaN(price) ? formatPrice(price, 4) : '--'}
                    </div>
                    {changePct !== null && !isNaN(changePct) ? (
                      <span
                        className={`inline-flex items-center text-[11px] font-semibold ${
                          isPositive ? 'text-trade-green' : 'text-trade-red'
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-0.5" />
                        )}
                        {formatPercent(changePct)}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">--</span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-trade-cyan animate-spin" />
                  <span>Loading full Binance crypto catalog (Spot & Futures)...</span>
                </div>
              ) : (
                <div>No coins found matching "{search}". Try searching another coin or switch market tab.</div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-dark-850 border-t border-dark-750 flex items-center justify-between text-[11px] text-slate-400">
          <span>Click any coin to switch terminal, chart, AI prediction & order console</span>
          <span className="text-trade-cyan font-bold">{filteredSymbols.length} Available in this view</span>
        </div>
      </div>
    </div>
  );
}
