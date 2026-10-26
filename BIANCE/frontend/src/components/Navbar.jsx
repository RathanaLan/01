import React, { useState, useEffect, useRef } from 'react';
import { 
  Key, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Sliders, 
  ChevronDown, 
  Coins,
  Wallet,
  Activity
} from 'lucide-react';
import { formatPrice, formatPercent } from '../utils/formatters';

export default function Navbar({ 
  tickers = [], 
  selectedSymbol = 'BTCUSDT', 
  onSelectSymbol, 
  onOpenSettings, 
  onOpenCoinSelector, 
  accountStatus, 
  accountData = null,
  allWalletsData = null,
  onOpenPortfolio,
  onRefresh, 
  totalAvailableCoins = 0,
  marketType = 'SPOT'
}) {
  const activeSymbol = typeof selectedSymbol === 'string' && selectedSymbol ? selectedSymbol : 'BTCUSDT';
  const tickerList = Array.isArray(tickers) ? tickers : [];
  const currentTicker = tickerList.find((t) => t && t.symbol === activeSymbol) || tickerList[0] || null;
  const isPositive = currentTicker && parseFloat(currentTicker.priceChangePercent) >= 0;

  // Real-time price tick flash animation
  const [priceFlash, setPriceFlash] = useState(null); // 'up' | 'down' | null
  const prevPriceRef = useRef(null);
  const numericPrice = currentTicker ? parseFloat(currentTicker.lastPrice) : null;

  useEffect(() => {
    if (numericPrice !== null) {
      if (prevPriceRef.current !== null && prevPriceRef.current !== numericPrice) {
        if (numericPrice > prevPriceRef.current) {
          setPriceFlash('up');
        } else if (numericPrice < prevPriceRef.current) {
          setPriceFlash('down');
        }
        const timer = setTimeout(() => setPriceFlash(null), 500);
        prevPriceRef.current = numericPrice;
        return () => clearTimeout(timer);
      }
      prevPriceRef.current = numericPrice;
    }
  }, [numericPrice]);

  // Calculate estimated total USD balance across all wallets (Spot, Earn, Funding, Futures)
  const balances = accountData?.balances || [];
  let totalEstimatedUsd = 0;
  for (const b of balances) {
    const isEarn = b.asset.startsWith('LD');
    const underlying = isEarn ? b.asset.slice(2) : b.asset;
    if (underlying === 'USDT' || underlying === 'USDC' || underlying === 'FDUSD' || underlying === 'BUSD') {
      totalEstimatedUsd += b.total;
    } else {
      const match = tickerList.find((t) => t && (t.symbol === `${underlying}USDT` || t.symbol === `${underlying}FDUSD`));
      const price = match ? parseFloat(match.lastPrice) : 0;
      totalEstimatedUsd += b.total * price;
    }
  }

  // Add Funding assets if available
  const fundingBalances = allWalletsData?.funding?.balances || [];
  for (const b of fundingBalances) {
    if (b.asset === 'USDT' || b.asset === 'USDC' || b.asset === 'FDUSD' || b.asset === 'BUSD') {
      totalEstimatedUsd += b.total;
    } else {
      const match = tickerList.find((t) => t && (t.symbol === `${b.asset}USDT` || t.symbol === `${b.asset}FDUSD`));
      const price = match ? parseFloat(match.lastPrice) : 0;
      totalEstimatedUsd += b.total * price;
    }
  }

  // Add Futures Margin balance if available
  if (allWalletsData?.futures?.totalMarginBalance) {
    totalEstimatedUsd += allWalletsData.futures.totalMarginBalance;
  }

  // Add Simple Earn balance if available and not already in spot balances as LD
  const hasLdInBalances = balances.some((b) => b.asset && b.asset.startsWith('LD'));
  if (!hasLdInBalances && allWalletsData?.earn?.totalAmountInUSDT) {
    totalEstimatedUsd += allWalletsData.earn.totalAmountInUSDT;
  }

  // Format display symbol dynamically (supports USDT, FDUSD, BTC, ETH)
  const quote = activeSymbol.endsWith('USDT') 
    ? 'USDT' 
    : activeSymbol.endsWith('FDUSD') 
    ? 'FDUSD' 
    : activeSymbol.endsWith('BTC') 
    ? 'BTC' 
    : activeSymbol.endsWith('ETH') 
    ? 'ETH' 
    : 'USDT';
  const base = activeSymbol.endsWith(quote) 
    ? activeSymbol.slice(0, -quote.length) 
    : activeSymbol;

  return (
    <header className="h-16 bg-dark-900/90 backdrop-blur-md border-b border-dark-750/80 px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 select-none shadow-md">
      {/* Left: Active Pair Details & Coin Selector Launcher */}
      <div className="flex items-center gap-3">
        {/* Coin Selector Launcher Button */}
        <button
          onClick={onOpenCoinSelector}
          className="btn-3d group flex items-center gap-2.5 bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-trade-cyan/50 text-white font-mono rounded-xl px-3 py-2 transition-all duration-150 shadow-sm"
          title="Search all coins available on Binance"
        >
          <div className="w-6 h-6 rounded-lg bg-dark-700 group-hover:bg-trade-cyan/20 flex items-center justify-center text-trade-cyan transition-colors">
            <Coins className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 font-bold text-sm">
              <span>{base || 'BTC'}</span>
              <span className="text-[11px] text-slate-400">/ {quote}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-trade-cyan transition-colors ml-0.5" />
            </div>
          </div>
          <span className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-extrabold border ${
            marketType === 'FUTURES'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
              : 'bg-trade-cyan/15 text-trade-cyan border border-trade-cyan/30'
          }`}>
            {marketType === 'FUTURES' ? 'FUTURES PERP' : 'SPOT'}
          </span>
        </button>

        {/* Current Pair Stats */}
        {currentTicker && (
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono pl-2 border-l border-dark-750">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[10px] block">LAST PRICE</span>
                <span className="inline-flex items-center gap-1 px-1 py-0.2 rounded text-[8px] font-bold bg-trade-green/10 text-trade-green border border-trade-green/30">
                  <span className="w-1 h-1 rounded-full bg-trade-green animate-ping" />
                  LIVE 1s
                </span>
              </div>
              <span className={`text-sm font-bold transition-all duration-200 px-1 py-0.5 rounded inline-block ${
                priceFlash === 'up'
                  ? 'text-trade-green bg-trade-green/20 scale-105'
                  : priceFlash === 'down'
                  ? 'text-trade-red bg-trade-red/20 scale-105'
                  : 'text-white'
              }`}>
                {formatPrice(currentTicker.lastPrice, 4)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">24H CHANGE</span>
              <span className={`flex items-center font-semibold ${isPositive ? 'text-trade-green' : 'text-trade-red'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {formatPercent(currentTicker.priceChangePercent)}
              </span>
            </div>
            <div className="hidden md:block">
              <span className="text-slate-400 text-[10px] block">24H HIGH</span>
              <span className="text-slate-200">{formatPrice(currentTicker.highPrice, 4)}</span>
            </div>
            <div className="hidden md:block">
              <span className="text-slate-400 text-[10px] block">24H LOW</span>
              <span className="text-slate-200">{formatPrice(currentTicker.lowPrice, 4)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Right: Security & Network Badges + Settings Button */}
      <div className="flex items-center gap-3">
        {/* Network Badge */}
        <div className="flex items-center">
          {accountStatus?.useTestnet ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-1.5" />
              SPOT TESTNET
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-trade-green/10 text-trade-green border border-trade-green/30">
              <span className="w-2 h-2 rounded-full bg-trade-green mr-1.5" />
              LIVE PROD
            </span>
          )}
        </div>

        {/* Real Account Balance Badge */}
        {accountStatus?.configured && (accountData || allWalletsData?.futures?.totalMarginBalance || totalEstimatedUsd > 0) && (
          <button
            onClick={onOpenPortfolio}
            className="btn-3d flex items-center gap-2 bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-trade-cyan/50 px-3 py-1.5 rounded-xl font-mono text-xs transition-all shadow-sm"
            title="Click to view complete asset and portfolio breakdown"
          >
            <div className="w-5 h-5 rounded-full bg-trade-green/10 flex items-center justify-center text-trade-green shrink-0">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block leading-none font-semibold">TOTAL BALANCE</span>
              <span className="text-xs font-extrabold text-white leading-tight">
                ${totalEstimatedUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-[10px] font-normal text-slate-400 ml-1">USD</span>
              </span>
            </div>
          </button>
        )}

        {/* API Credentials Badge */}
        {accountStatus?.configured ? (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-dark-800 border border-dark-700 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-trade-green" />
            <span>CONNECTED</span>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-dark-800 border border-dark-700 text-xs font-mono text-slate-400">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>PUBLIC MODE</span>
          </div>
        )}

        {/* Manual Refresh Button */}
        <button
          onClick={onRefresh}
          title="Refresh Market Data"
          className="btn-3d p-2 rounded-lg bg-dark-800 border border-dark-700 hover:bg-dark-750 text-slate-300 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="btn-3d flex items-center gap-2 bg-gradient-to-r from-trade-cyan/20 to-blue-600/20 hover:from-trade-cyan/30 hover:to-blue-600/30 text-trade-cyan border border-trade-cyan/30 px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all duration-200"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>API KEYS</span>
        </button>
      </div>
    </header>
  );
}
