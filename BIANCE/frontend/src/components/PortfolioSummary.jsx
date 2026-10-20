import React, { useState } from 'react';
import { 
  Wallet, 
  ShieldCheck, 
  Lock, 
  ArrowUpRight, 
  RefreshCw,
  Coins,
  ExternalLink,
  Info,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Layers,
  Zap,
  PiggyBank,
  CreditCard,
  Flame,
  ArrowRight,
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
  X,
  LayoutGrid,
  List,
  Shield
} from 'lucide-react';
import { adjustFuturesLeverage, closeFuturesPosition } from '../services/api';
import { formatPrice, formatNumber, formatPercent } from '../utils/formatters';

export default function PortfolioSummary({ 
  accountData, 
  allWalletsData = null, 
  tickers = [],
  loading, 
  onRefresh, 
  onOpenSettings,
  accountStatus = null
}) {
  const [selectedWalletTab, setSelectedWalletTab] = useState('all'); // 'all' | 'spot' | 'earn' | 'funding' | 'futures'
  const [futuresViewMode, setFuturesViewMode] = useState('cards'); // 'cards' | 'table'
  const [futuresFilter, setFuturesFilter] = useState('all'); // 'all' | 'long' | 'short' | 'profit' | 'loss'

  // Modals for Futures Position Management
  const [closePositionModal, setClosePositionModal] = useState(null); // position object or null
  const [leverageModal, setLeverageModal] = useState(null); // { symbol, currentLeverage, newLeverage } or null
  const [submittingAction, setSubmittingAction] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  const handleConfirmClosePosition = async () => {
    if (!closePositionModal) return;
    setSubmittingAction(true);
    setActionFeedback(null);
    try {
      const res = await closeFuturesPosition({
        symbol: closePositionModal.symbol,
        positionAmt: closePositionModal.positionAmt,
        side: closePositionModal.positionAmt > 0 ? 'LONG' : 'SHORT'
      });
      if (res.success) {
        setActionFeedback({
          type: 'success',
          message: `Position for ${closePositionModal.symbol} closed successfully!`
        });
        setClosePositionModal(null);
        if (onRefresh) onRefresh();
      } else {
        setActionFeedback({
          type: 'error',
          message: res.error || 'Failed to close futures position.'
        });
      }
    } catch (err) {
      setActionFeedback({
        type: 'error',
        message: err.message || 'Error executing position close.'
      });
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleConfirmAdjustLeverage = async () => {
    if (!leverageModal) return;
    setSubmittingAction(true);
    setActionFeedback(null);
    try {
      const res = await adjustFuturesLeverage(leverageModal.symbol, leverageModal.newLeverage);
      if (res.success) {
        setActionFeedback({
          type: 'success',
          message: `Leverage updated to ${leverageModal.newLeverage}x for ${leverageModal.symbol}!`
        });
        setLeverageModal(null);
        if (onRefresh) onRefresh();
      } else {
        setActionFeedback({
          type: 'error',
          message: res.error || 'Failed to adjust leverage.'
        });
      }
    } catch (err) {
      setActionFeedback({
        type: 'error',
        message: err.message || 'Error updating leverage.'
      });
    } finally {
      setSubmittingAction(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-dark-900 border border-dark-750 rounded-xl p-12 flex flex-col items-center justify-center space-y-3">
        <RefreshCw className="w-8 h-8 text-trade-cyan animate-spin" />
        <span className="font-mono text-sm text-slate-300">Synchronizing All Binance Wallets (Spot, Futures, Earn, Funding)...</span>
      </div>
    );
  }

  // Price dictionary for USD valuation
  const priceMap = new Map();
  priceMap.set('USDT', 1);
  priceMap.set('LDUSDT', 1);
  priceMap.set('BUSD', 1);
  priceMap.set('USDC', 1);
  priceMap.set('FDUSD', 1);

  if (Array.isArray(tickers)) {
    for (const t of tickers) {
      if (t && t.symbol && t.lastPrice) {
        priceMap.set(t.symbol, parseFloat(t.lastPrice));
      }
    }
  }

  const getUsdPrice = (asset) => {
    const clean = asset.startsWith('LD') ? asset.slice(2) : asset;
    if (clean === 'USDT' || clean === 'USDC' || clean === 'BUSD' || clean === 'FDUSD') return 1;
    return priceMap.get(`${clean}USDT`) || priceMap.get(`${clean}FDUSD`) || 0;
  };

  // --- 1. SPOT WALLET ASSETS ---
  const rawBalances = accountData?.balances || [];
  const spotBalances = rawBalances
    .filter((b) => !b.asset.startsWith('LD'))
    .map((b) => ({
      ...b,
      wallet: 'SPOT',
      unitPrice: getUsdPrice(b.asset),
      estimatedUsd: b.total * getUsdPrice(b.asset)
    }))
    .sort((a, b) => b.estimatedUsd - a.estimatedUsd);

  const spotTotalUsd = spotBalances.reduce((acc, curr) => acc + curr.estimatedUsd, 0);

  // --- 2. SIMPLE EARN (SAVINGS) ASSETS ---
  // A. Tokens starting with LD in spot account
  const ldTokens = rawBalances
    .filter((b) => b.asset && b.asset.startsWith('LD'))
    .map((b) => {
      const underlying = b.asset.slice(2);
      const unitPrice = getUsdPrice(b.asset);
      return {
        ...b,
        wallet: 'EARN',
        underlying,
        unitPrice,
        estimatedUsd: b.total * unitPrice
      };
    });

  // B. Flexible / locked positions from Binance Simple Earn API
  const flexiblePositions = (allWalletsData?.earn?.flexiblePositions || [])
    .filter((p) => p.totalAmount > 0 && !ldTokens.some((ld) => ld.underlying === p.asset))
    .map((p) => {
      const unitPrice = getUsdPrice(p.asset);
      return {
        asset: `LD${p.asset}`,
        underlying: p.asset,
        free: p.freeAmount || p.totalAmount,
        locked: Math.max(0, (p.totalAmount || 0) - (p.freeAmount || 0)),
        total: p.totalAmount,
        wallet: 'EARN',
        unitPrice,
        estimatedUsd: p.totalAmount * unitPrice,
        apr: p.annualPercentageRate
      };
    });

  // C. Fallback to totalAmountInUSDT if individual positions are empty
  const combinedEarnRows = [...ldTokens, ...flexiblePositions];
  if (combinedEarnRows.length === 0 && (allWalletsData?.earn?.totalAmountInUSDT || 0) > 0) {
    combinedEarnRows.push({
      asset: 'LDUSDT',
      underlying: 'USDT',
      free: allWalletsData.earn.totalAmountInUSDT,
      locked: 0,
      total: allWalletsData.earn.totalAmountInUSDT,
      wallet: 'EARN',
      unitPrice: 1,
      estimatedUsd: allWalletsData.earn.totalAmountInUSDT
    });
  }

  const earnBalances = combinedEarnRows.sort((a, b) => b.estimatedUsd - a.estimatedUsd);
  const earnTotalUsd = earnBalances.reduce((acc, curr) => acc + curr.estimatedUsd, 0) || (allWalletsData?.earn?.totalAmountInUSDT || 0);

  // --- 3. FUNDING WALLET ASSETS ---
  const fundingRaw = allWalletsData?.funding?.balances || [];
  const fundingBalances = fundingRaw
    .map((b) => ({
      ...b,
      wallet: 'FUNDING',
      unitPrice: getUsdPrice(b.asset),
      estimatedUsd: b.total * getUsdPrice(b.asset)
    }))
    .sort((a, b) => b.estimatedUsd - a.estimatedUsd);

  const fundingTotalUsd = fundingBalances.reduce((acc, curr) => acc + curr.estimatedUsd, 0);

  // --- 4. FUTURES WALLET ASSETS & POSITIONS ---
  const futures = allWalletsData?.futures || { enabled: false, assets: [], positions: [] };
  const futuresTotalUsd = futures.totalMarginBalance || futures.totalWalletBalance || 0;
  const futuresUnrealizedPnL = futures.totalUnrealizedProfit || 0;

  // --- 5. UNIFIED TOTAL NET WORTH ---
  const totalNetWorthUsd = spotTotalUsd + earnTotalUsd + fundingTotalUsd + futuresTotalUsd;

  // Filtered table rows based on selected wallet tab
  const getDisplayedRows = () => {
    const futuresRows = (futures.assets || []).map((a) => ({
      asset: a.asset,
      free: a.availableBalance,
      locked: a.marginBalance - a.availableBalance,
      total: a.walletBalance,
      wallet: 'FUTURES',
      unitPrice: 1,
      estimatedUsd: a.marginBalance
    }));

    if (selectedWalletTab === 'spot') return spotBalances;
    if (selectedWalletTab === 'earn') return earnBalances;
    if (selectedWalletTab === 'funding') return fundingBalances;
    if (selectedWalletTab === 'futures') return futuresRows;

    // 'all' tab: combine EVERYTHING across Spot, Simple Earn, Funding, and Futures
    return [...spotBalances, ...earnBalances, ...fundingBalances, ...futuresRows].sort((a, b) => b.estimatedUsd - a.estimatedUsd);
  };

  const displayedRows = getDisplayedRows();

  return (
    <div className="space-y-6">
      {/* 1. API ERROR / IP MISMATCH WARNING BANNER */}
      {(!accountStatus?.connected || allWalletsData?.futures?.note) && (
        <div className="bg-trade-red/10 border-2 border-trade-red/40 rounded-2xl p-5 font-mono space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-trade-red/20 text-trade-red border border-trade-red/30 shrink-0 mt-0.5">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    BINANCE API ACCESS REJECTED (HTTP 401 / CODE -2015)
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-trade-red/25 text-trade-red border border-trade-red/40 font-bold">
                    Action Required
                  </span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Binance responded: <code className="text-trade-red bg-dark-950 px-1.5 py-0.5 rounded font-bold border border-trade-red/30">{allWalletsData?.futures?.note || accountStatus?.error || 'Invalid API-key, IP, or permissions for action'}</code>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Your portfolio and balances cannot be fetched because Binance rejected access. This happens when your ISP IP rotates or changes, or when Futures permissions are disabled on Binance.
                </p>

                <div className="p-3.5 bg-dark-950/80 rounded-xl border border-dark-750 text-xs space-y-2 mt-3">
                  <div className="text-white font-bold text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-trade-cyan">
                      <span>💡 3-Step Fix in Binance API Management:</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Your Request IP: <strong className="text-trade-cyan bg-dark-850 px-1.5 py-0.5 rounded border border-dark-700">{accountStatus?.publicIp || '203.144.68.127'}</strong>
                    </span>
                  </div>
                  <ol className="list-decimal list-inside text-slate-300 text-[11px] space-y-1.5 pl-1 leading-relaxed">
                    <li>
                      Go to <a href="https://www.binance.com/en/my/settings/api-management" target="_blank" rel="noreferrer" className="text-trade-cyan hover:underline font-bold inline-flex items-center gap-1">Binance API Management <ExternalLink className="w-3 h-3" /></a> and click <strong>Edit</strong> on your API key.
                    </li>
                    <li>
                      Under <strong>IP access restrictions</strong>: select <strong>"Unrestricted (Less Secure)"</strong> (recommended if your ISP has dynamic IPs; withdrawals remain completely blocked) OR add <code className="text-trade-cyan font-bold bg-dark-850 px-1 py-0.5 rounded border border-dark-700">{accountStatus?.publicIp || '203.144.68.127'}</code> to your list of trusted IPs.
                    </li>
                    <li>
                      Ensure <strong>"Enable Futures"</strong> and <strong>"Enable Spot & Margin Trading"</strong> checkboxes are checked.
                    </li>
                    <li>Click <strong>Save</strong> and complete your 2FA verification.</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0 md:self-start">
              <a
                href="https://www.binance.com/en/my/settings/api-management"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-trade-cyan hover:bg-trade-cyan/90 text-dark-950 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-trade-cyan/20"
              >
                <span>Edit on Binance</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenSettings}
                className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-dark-700 text-xs font-bold transition-colors text-center"
              >
                Check Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Total Net Worth & Multi-Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Unified Total Net Worth */}
        <div className="glass-panel p-5 rounded-2xl lg:col-span-1 relative overflow-hidden flex flex-col justify-between card-3d">
          <div className="absolute top-0 right-0 w-32 h-32 bg-trade-green/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="font-bold tracking-wider">TOTAL NET WORTH</span>
              <div className="p-1.5 rounded-lg bg-trade-green/15 text-trade-green">
                <CircleDollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-mono font-black text-white tracking-tight drop-shadow-md">
              ${totalNetWorthUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              Combined value of all Binance wallets
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-dark-800/80 flex items-center justify-between text-[11px] font-mono text-trade-green relative z-10">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-trade-green animate-pulse" />
              <span>LIVE FEED (1s)</span>
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-trade-green" />
          </div>
        </div>

        {/* Spot Wallet Card */}
        <div 
          onClick={() => setSelectedWalletTab('spot')}
          className={`glass-card p-5 rounded-2xl cursor-pointer transition-all card-3d ${
            selectedWalletTab === 'spot' ? 'border-trade-cyan shadow-lg shadow-trade-cyan/15 ring-1 ring-trade-cyan/40' : 'hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <div className="p-1 rounded bg-trade-cyan/15 text-trade-cyan">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <span>SPOT WALLET</span>
            </span>
            <span className="text-[10px] text-trade-cyan font-bold">{spotBalances.length} coins</span>
          </div>
          <div className="text-xl font-mono font-black text-white mt-2">
            ${spotTotalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center justify-between">
            <span>Trading Balance</span>
            <span className="text-trade-cyan font-bold">View →</span>
          </div>
        </div>

        {/* Simple Earn (Flexible / Locked) Card */}
        <div 
          onClick={() => setSelectedWalletTab('earn')}
          className={`glass-card p-5 rounded-2xl cursor-pointer transition-all card-3d ${
            selectedWalletTab === 'earn' ? 'border-amber-400 shadow-lg shadow-amber-400/15 ring-1 ring-amber-400/40' : 'hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-bold text-amber-400">
              <div className="p-1 rounded bg-amber-500/15 text-amber-400">
                <PiggyBank className="w-3.5 h-3.5" />
              </div>
              <span>SIMPLE EARN</span>
            </span>
            <span className="text-[10px] text-amber-400 font-bold">{earnBalances.length} positions</span>
          </div>
          <div className="text-xl font-mono font-black text-amber-400 mt-2">
            ${earnTotalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center justify-between">
            <span>Flexible Savings</span>
            <span className="text-amber-400 font-bold">View →</span>
          </div>
        </div>

        {/* Funding Wallet Card */}
        <div 
          onClick={() => setSelectedWalletTab('funding')}
          className={`glass-card p-5 rounded-2xl cursor-pointer transition-all card-3d ${
            selectedWalletTab === 'funding' ? 'border-blue-400 shadow-lg shadow-blue-400/15 ring-1 ring-blue-400/40' : 'hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-bold text-blue-400">
              <div className="p-1 rounded bg-blue-500/15 text-blue-400">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <span>FUNDING</span>
            </span>
            <span className="text-[10px] text-blue-400 font-bold">{fundingBalances.length} assets</span>
          </div>
          <div className="text-xl font-mono font-black text-white mt-2">
            ${fundingTotalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center justify-between">
            <span>P2P & Transfers</span>
            <span className="text-blue-400 font-bold">View →</span>
          </div>
        </div>

        {/* Futures Wallet Card */}
        <div 
          onClick={() => setSelectedWalletTab('futures')}
          className={`glass-card p-5 rounded-2xl cursor-pointer transition-all card-3d card-3d-purple ${
            selectedWalletTab === 'futures' ? 'border-purple-400 shadow-lg shadow-purple-400/20 ring-1 ring-purple-400/40' : 'hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-bold text-purple-400">
              <div className="p-1 rounded bg-purple-500/15 text-purple-400">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span>FUTURES</span>
            </span>
            <span className="text-[10px] text-purple-300 font-bold">
              {futures.enabled ? `${futures.positions?.length || 0} pos` : 'Inactive'}
            </span>
          </div>
          <div className="text-xl font-mono font-black text-white mt-2">
            ${futuresTotalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center justify-between">
            <span className={futuresUnrealizedPnL >= 0 ? 'text-trade-green font-bold' : 'text-trade-red font-bold'}>
              PnL: {futuresUnrealizedPnL >= 0 ? '+' : ''}${futuresUnrealizedPnL.toFixed(2)}
            </span>
            <span className="text-purple-400 font-bold">View →</span>
          </div>
        </div>
      </div>

      {/* Earn Notice If User Has Simple Earn Balance */}
      {earnTotalUsd > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start justify-between gap-4 text-xs font-mono">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-slate-300 leading-relaxed">
              <div className="font-bold text-amber-400 text-sm">
                ${earnTotalUsd.toFixed(2)} USDT is in Binance Simple Earn (Flexible Savings)
              </div>
              <p className="text-[11px] text-slate-400">
                Your funds are earning daily APR under Binance's Flexible Savings program (marked with <code className="text-amber-300 bg-dark-900 px-1 py-0.5 rounded">LD</code> prefix). 
                To execute spot orders, you can redeem funds instantly to your <strong>Spot Wallet</strong> without any fee.
              </p>
            </div>
          </div>
          <a
            href="https://www.binance.com/en/earn/simple-earn"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <span>Redeem in Binance</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Wallet Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-dark-750 pb-3 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setSelectedWalletTab('all')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            selectedWalletTab === 'all'
              ? 'bg-dark-750 text-white border border-dark-650 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-dark-850'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-trade-cyan" />
          <span>ALL WALLETS ({displayedRows.length})</span>
        </button>

        <button
          onClick={() => setSelectedWalletTab('spot')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            selectedWalletTab === 'spot'
              ? 'bg-trade-cyan/15 text-trade-cyan border border-trade-cyan/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-dark-850'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>SPOT WALLET (${spotTotalUsd.toFixed(2)})</span>
        </button>

        <button
          onClick={() => setSelectedWalletTab('earn')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            selectedWalletTab === 'earn'
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-dark-850'
          }`}
        >
          <PiggyBank className="w-3.5 h-3.5" />
          <span>SIMPLE EARN (${earnTotalUsd.toFixed(2)})</span>
        </button>

        <button
          onClick={() => setSelectedWalletTab('funding')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            selectedWalletTab === 'funding'
              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-dark-850'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>FUNDING WALLET (${fundingTotalUsd.toFixed(2)})</span>
        </button>

        <button
          onClick={() => setSelectedWalletTab('futures')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            selectedWalletTab === 'futures'
              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-dark-850'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>FUTURES (${futuresTotalUsd.toFixed(2)})</span>
        </button>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
          actionFeedback.type === 'success'
            ? 'bg-trade-green/10 border-trade-green/40 text-trade-green'
            : 'bg-trade-red/10 border-trade-red/40 text-trade-red'
        }`}>
          <div className="flex items-center gap-2">
            {actionFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{actionFeedback.message}</span>
          </div>
          <button
            onClick={() => setActionFeedback(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Futures Open Positions Section (Shown on All Wallets and Futures Tabs) */}
      {(selectedWalletTab === 'futures' || selectedWalletTab === 'all') && futures.positions && futures.positions.length > 0 && (() => {
        const allPositions = futures.positions;
        const filteredPositions = allPositions.filter((pos) => {
          if (futuresFilter === 'long') return pos.positionAmt > 0;
          if (futuresFilter === 'short') return pos.positionAmt < 0;
          if (futuresFilter === 'profit') return pos.unRealizedProfit > 0;
          if (futuresFilter === 'loss') return pos.unRealizedProfit < 0;
          return true;
        });

        const longCount = allPositions.filter(p => p.positionAmt > 0).length;
        const shortCount = allPositions.filter(p => p.positionAmt < 0).length;
        const profitCount = allPositions.filter(p => p.unRealizedProfit > 0).length;
        const lossCount = allPositions.filter(p => p.unRealizedProfit < 0).length;

        return (
          <div className="bg-dark-900 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-5">
            {/* Header Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-dark-750">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-mono text-sm sm:text-base font-black text-white tracking-wide">
                      LIVE FUTURES OPEN CONTRACTS
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {allPositions.length} ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Real-time position monitoring with high-impact PnL, leverage adjustment & immediate market exit
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Aggregate Futures Unrealized PnL Pill */}
                <div className={`px-4 py-2 rounded-xl border font-mono flex items-center gap-2 shadow-sm ${
                  futuresUnrealizedPnL >= 0 
                    ? 'bg-trade-green/10 border-trade-green/40 text-trade-green' 
                    : 'bg-trade-red/10 border-trade-red/40 text-trade-red'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${futuresUnrealizedPnL >= 0 ? 'bg-trade-green' : 'bg-trade-red'} animate-pulse`} />
                  <span className="text-xs text-slate-400 font-medium">Total PnL:</span>
                  <span className="text-sm font-black">
                    {futuresUnrealizedPnL >= 0 ? '+' : ''}${futuresUnrealizedPnL.toFixed(2)} USD
                  </span>
                </div>

                {/* View Mode Switcher: Cards vs Table */}
                <div className="bg-dark-950 p-1 rounded-xl border border-dark-750 flex items-center gap-1 font-mono text-xs">
                  <button
                    onClick={() => setFuturesViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      futuresViewMode === 'cards'
                        ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-dark-850'
                    }`}
                    title="Card Grid View with Big Unrealized Profit"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => setFuturesViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      futuresViewMode === 'table'
                        ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-dark-850'
                    }`}
                    title="Compact Table View"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-toolbar: Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[11px] text-slate-500 font-bold uppercase mr-1">Filter:</span>
              <button
                onClick={() => setFuturesFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  futuresFilter === 'all'
                    ? 'bg-dark-750 text-white border border-dark-650'
                    : 'text-slate-400 hover:text-white bg-dark-850 border border-transparent'
                }`}
              >
                All ({allPositions.length})
              </button>
              {longCount > 0 && (
                <button
                  onClick={() => setFuturesFilter('long')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    futuresFilter === 'long'
                      ? 'bg-trade-green/20 text-trade-green border border-trade-green/40'
                      : 'text-slate-400 hover:text-trade-green bg-dark-850 border border-transparent'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>Longs ({longCount})</span>
                </button>
              )}
              {shortCount > 0 && (
                <button
                  onClick={() => setFuturesFilter('short')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    futuresFilter === 'short'
                      ? 'bg-trade-red/20 text-trade-red border border-trade-red/40'
                      : 'text-slate-400 hover:text-trade-red bg-dark-850 border border-transparent'
                  }`}
                >
                  <TrendingDown className="w-3 h-3" />
                  <span>Shorts ({shortCount})</span>
                </button>
              )}
              {profitCount > 0 && (
                <button
                  onClick={() => setFuturesFilter('profit')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    futuresFilter === 'profit'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-emerald-400 bg-dark-850 border border-transparent'
                  }`}
                >
                  In Profit ({profitCount})
                </button>
              )}
              {lossCount > 0 && (
                <button
                  onClick={() => setFuturesFilter('loss')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    futuresFilter === 'loss'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'text-slate-400 hover:text-rose-400 bg-dark-850 border border-transparent'
                  }`}
                >
                  In Loss ({lossCount})
                </button>
              )}
            </div>

            {/* Empty Filter State */}
            {filteredPositions.length === 0 && (
              <div className="p-8 text-center bg-dark-950/50 rounded-xl border border-dark-800 font-mono space-y-2">
                <p className="text-slate-300 text-xs">No positions match the current filter "{futuresFilter}".</p>
                <button
                  onClick={() => setFuturesFilter('all')}
                  className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-white text-xs font-bold"
                >
                  Reset Filter to All
                </button>
              </div>
            )}

            {/* 1. CARD VIEW (Default) */}
            {futuresViewMode === 'cards' && filteredPositions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5 pt-1">
                {filteredPositions.map((pos) => {
                  const isLong = pos.positionAmt > 0;
                  const isPnlPositive = pos.unRealizedProfit >= 0;
                  const amt = Math.abs(pos.positionAmt);
                  const mark = (pos.markPrice && pos.markPrice > 0)
                    ? pos.markPrice
                    : (amt !== 0 ? pos.entryPrice + (pos.unRealizedProfit / pos.positionAmt) : pos.entryPrice);
                  const notionalValue = amt * mark;
                  const initialMargin = (amt * pos.entryPrice) / (pos.leverage || 1);
                  const roePercent = initialMargin > 0 ? (pos.unRealizedProfit / initialMargin) * 100 : 0;

                  let liqDistancePercent = null;
                  if (pos.liquidationPrice > 0 && mark > 0) {
                    liqDistancePercent = Math.abs(((pos.liquidationPrice - mark) / mark) * 100);
                  }

                  return (
                    <div
                      key={pos.symbol}
                      className={`relative bg-gradient-to-b from-dark-850 via-dark-900 to-dark-950 border rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden card-3d ${
                        isPnlPositive 
                          ? 'border-dark-750 card-3d-green hover:border-trade-green/50' 
                          : 'border-dark-750 card-3d-red hover:border-trade-red/50'
                      }`}
                    >
                      {/* Top Accent Strip */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                        isPnlPositive 
                          ? 'bg-gradient-to-r from-transparent via-trade-green to-transparent opacity-90' 
                          : 'bg-gradient-to-r from-transparent via-trade-red to-transparent opacity-90'
                      }`} />

                      <div>
                        {/* Card Top: Symbol, Type, Side & Leverage */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-mono text-base font-black text-white tracking-wide">
                                {pos.symbol}
                              </h3>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-dark-750 text-slate-300 font-bold border border-dark-700">
                                PERP
                              </span>
                            </div>
                            <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                              {pos.isolated ? 'Isolated' : 'Cross'} Margin • USDT-M
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black flex items-center gap-1 shadow-sm ${
                              isLong 
                                ? 'bg-trade-green/15 text-trade-green border border-trade-green/30' 
                                : 'bg-trade-red/15 text-trade-red border border-trade-red/30'
                            }`}>
                              {isLong ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                              <span>{isLong ? 'LONG' : 'SHORT'}</span>
                            </span>

                            <button
                              onClick={() => {
                                setActionFeedback(null);
                                setLeverageModal({
                                  symbol: pos.symbol,
                                  currentLeverage: pos.leverage,
                                  newLeverage: pos.leverage
                                });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold flex items-center gap-1 transition-all btn-3d"
                              title="Click to adjust leverage"
                            >
                              <SlidersHorizontal className="w-3 h-3" />
                              <span>{pos.leverage}x</span>
                            </button>
                          </div>
                        </div>

                        {/* BIG UNREALIZED PROFIT HERO BOX */}
                        <div className={`mt-4 mb-4 p-4 rounded-xl border relative overflow-hidden transition-all ${
                          isPnlPositive 
                            ? 'bg-trade-green/10 border-trade-green/30 shadow-lg shadow-trade-green/5' 
                            : 'bg-trade-red/10 border-trade-red/30 shadow-lg shadow-trade-red/5'
                        }`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
                              <CircleDollarSign className="w-3.5 h-3.5 text-slate-400" />
                              <span>UNREALIZED PROFIT (PnL)</span>
                            </span>

                            {/* ROE % Pill */}
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black border shadow-sm ${
                              isPnlPositive
                                ? 'bg-trade-green/20 text-trade-green border-trade-green/40'
                                : 'bg-trade-red/20 text-trade-red border-trade-red/40'
                            }`}>
                              {formatPercent(roePercent)} ROE
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight drop-shadow-md ${
                              isPnlPositive ? 'text-trade-green drop-shadow-[0_0_12px_rgba(0,240,144,0.3)]' : 'text-trade-red drop-shadow-[0_0_12px_rgba(255,59,87,0.3)]'
                            }`}>
                              {isPnlPositive ? '+' : ''}${formatNumber(pos.unRealizedProfit, 2)}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">
                              USDT
                            </span>
                          </div>
                        </div>

                        {/* Key Metrics Grid */}
                        <div className="bg-dark-950/70 border border-dark-800 rounded-xl p-3.5 space-y-2.5 font-mono text-xs">
                          <div className="grid grid-cols-2 gap-3 pb-2.5 border-b border-dark-800">
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Entry Price</span>
                              <span className="text-slate-200 font-bold">{formatPrice(pos.entryPrice, 4)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Mark Price</span>
                              <span className="text-trade-cyan font-bold">{formatPrice(mark, 4)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pb-2.5 border-b border-dark-800">
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Size (Contracts)</span>
                              <span className="text-white font-bold">{formatNumber(amt, 2)}</span>
                              <span className="text-[10px] text-slate-400 block">≈ {formatPrice(notionalValue, 2)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Margin Used</span>
                              <span className="text-slate-200 font-bold">{formatPrice(initialMargin, 2)}</span>
                              <span className="text-[10px] text-purple-400 block">{pos.leverage}x Lev.</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-0.5">
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Est. Liq. Price</span>
                              <span className={`font-bold ${pos.liquidationPrice > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                                {pos.liquidationPrice > 0 ? formatPrice(pos.liquidationPrice, 4) : 'Safe / None'}
                              </span>
                            </div>
                            {liqDistancePercent !== null && (
                              <div className="text-right">
                                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Distance to Liq</span>
                                <span className="text-[11px] font-bold text-slate-300">
                                  {liqDistancePercent.toFixed(1)}% away
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-4 pt-3 border-t border-dark-800/80 grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => {
                            setActionFeedback(null);
                            setLeverageModal({
                              symbol: pos.symbol,
                              currentLeverage: pos.leverage,
                              newLeverage: pos.leverage
                            });
                          }}
                          className="py-2.5 px-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm btn-3d"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>Adjust Lev.</span>
                        </button>

                        <button
                          onClick={() => {
                            setActionFeedback(null);
                            setClosePositionModal(pos);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-trade-red/15 hover:bg-trade-red/25 text-trade-red border border-trade-red/30 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm btn-3d"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Close Position</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. TABLE VIEW */}
            {futuresViewMode === 'table' && filteredPositions.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-dark-750">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-dark-950 text-slate-400 border-b border-dark-750 text-[11px]">
                    <tr>
                      <th className="py-3 px-5">CONTRACT</th>
                      <th className="py-3 px-5">SIDE / SIZE</th>
                      <th className="py-3 px-5">ENTRY PRICE</th>
                      <th className="py-3 px-5">MARK PRICE</th>
                      <th className="py-3 px-5">LIQ. PRICE</th>
                      <th className="py-3 px-5">LEVERAGE</th>
                      <th className="py-3 px-5">UNREALIZED PROFIT</th>
                      <th className="py-3 px-5 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-750 text-slate-200">
                    {filteredPositions.map((pos) => {
                      const isLong = pos.positionAmt > 0;
                      const isPnlPositive = pos.unRealizedProfit >= 0;
                      const amt = Math.abs(pos.positionAmt);
                      const mark = (pos.markPrice && pos.markPrice > 0)
                        ? pos.markPrice
                        : (amt !== 0 ? pos.entryPrice + (pos.unRealizedProfit / pos.positionAmt) : pos.entryPrice);
                      const notionalValue = amt * mark;
                      const initialMargin = (amt * pos.entryPrice) / (pos.leverage || 1);
                      const roePercent = initialMargin > 0 ? (pos.unRealizedProfit / initialMargin) * 100 : 0;

                      return (
                        <tr key={pos.symbol} className="hover:bg-dark-800/60 transition-colors">
                          <td className="py-3 px-5 font-bold text-white">
                            <div className="flex items-center gap-1.5">
                              <span>{pos.symbol}</span>
                              <span className="text-[9px] px-1 py-0.5 rounded bg-dark-750 text-slate-400 font-bold">
                                PERP
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-5">
                            <div className="space-y-0.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isLong ? 'bg-trade-green/20 text-trade-green' : 'bg-trade-red/20 text-trade-red'
                              }`}>
                                {isLong ? 'LONG' : 'SHORT'} {formatNumber(amt, 2)}
                              </span>
                              <span className="text-[10px] text-slate-400 block">≈ {formatPrice(notionalValue, 2)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-5 text-slate-200">{formatPrice(pos.entryPrice, 4)}</td>
                          <td className="py-3 px-5 text-trade-cyan font-bold">{formatPrice(mark, 4)}</td>
                          <td className="py-3 px-5 text-slate-300">
                            {pos.liquidationPrice > 0 ? (
                              <span className="text-amber-400 font-bold">{formatPrice(pos.liquidationPrice, 4)}</span>
                            ) : (
                              <span className="text-slate-500">Safe</span>
                            )}
                          </td>
                          <td className="py-3 px-5">
                            <button
                              onClick={() => {
                                setActionFeedback(null);
                                setLeverageModal({
                                  symbol: pos.symbol,
                                  currentLeverage: pos.leverage,
                                  newLeverage: pos.leverage
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold border border-purple-500/30 text-[11px] flex items-center gap-1 transition-colors"
                              title="Click to adjust leverage"
                            >
                              <SlidersHorizontal className="w-2.5 h-2.5" />
                              <span>{pos.leverage}x</span>
                            </button>
                          </td>
                          <td className="py-3 px-5 font-bold">
                            <div className="space-y-0.5">
                              <div className={`text-sm ${isPnlPositive ? 'text-trade-green' : 'text-trade-red'}`}>
                                {isPnlPositive ? '+' : ''}${formatNumber(pos.unRealizedProfit, 2)} USD
                              </div>
                              <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                isPnlPositive ? 'bg-trade-green/15 text-trade-green' : 'bg-trade-red/15 text-trade-red'
                              }`}>
                                {formatPercent(roePercent)} ROE
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setActionFeedback(null);
                                  setLeverageModal({
                                    symbol: pos.symbol,
                                    currentLeverage: pos.leverage,
                                    newLeverage: pos.leverage
                                  });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                                title="Adjust Leverage"
                              >
                                <SlidersHorizontal className="w-3 h-3" />
                                <span>Adjust</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActionFeedback(null);
                                  setClosePositionModal(pos);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-trade-red/15 hover:bg-trade-red/25 text-trade-red border border-trade-red/30 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                                title="Close Position (Market)"
                              >
                                <X className="w-3 h-3" />
                                <span>Close</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })()}

      {/* Empty State on Futures Tab if no active positions */}
      {selectedWalletTab === 'futures' && (!futures.positions || futures.positions.length === 0) && (
        <div className="bg-dark-900 border border-purple-500/20 rounded-2xl p-8 text-center font-mono space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="text-white font-bold text-sm tracking-wide">NO ACTIVE FUTURES POSITIONS</h4>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
            You currently have no open perpetual futures positions. Your Futures margin balance is{' '}
            <strong className="text-white">${futuresTotalUsd.toFixed(2)} USD</strong> ({futures.availableBalance?.toFixed(2) || '0.00'} USDT available).
          </p>
        </div>
      )}

      {/* Asset Table */}
      <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-trade-cyan" />
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              {selectedWalletTab === 'all' ? 'CONSOLIDATED ASSETS' : `${selectedWalletTab} ASSETS`} ({displayedRows.length} ASSETS)
            </h3>
          </div>
          <button
            onClick={onRefresh}
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {displayedRows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-dark-950 text-slate-400 border-b border-dark-750 text-[11px]">
                <tr>
                  <th className="py-3 px-5">ASSET</th>
                  <th className="py-3 px-5">WALLET CATEGORY</th>
                  <th className="py-3 px-5">ESTIMATED VALUE</th>
                  <th className="py-3 px-5">AVAILABLE (FREE)</th>
                  <th className="py-3 px-5">IN ORDERS / LOCKED</th>
                  <th className="py-3 px-5">TOTAL BALANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-750 text-slate-200">
                {displayedRows.map((item, idx) => {
                  const cleanAsset = item.underlying || (item.asset.startsWith('LD') ? item.asset.slice(2) : item.asset);
                  const isEarn = item.wallet === 'EARN' || item.asset.startsWith('LD');
                  const isFunding = item.wallet === 'FUNDING';
                  const isFutures = item.wallet === 'FUTURES';

                  return (
                    <tr key={`${item.asset}-${item.wallet || idx}`} className="hover:bg-dark-800/60 transition-colors">
                      <td className="py-3 px-5 font-bold text-white flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isEarn
                            ? 'bg-amber-500/20 text-amber-400'
                            : isFunding
                            ? 'bg-blue-500/20 text-blue-400'
                            : isFutures
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-trade-cyan/20 text-trade-cyan'
                        }`}>
                          {cleanAsset.slice(0, 3)}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span>{item.asset}</span>
                            {isEarn && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                SIMPLE EARN
                              </span>
                            )}
                            {isFunding && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                FUNDING
                              </span>
                            )}
                            {isFutures && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                FUTURES
                              </span>
                            )}
                          </div>
                          {isEarn && (
                            <span className="text-[10px] text-slate-400 block font-normal">
                              Flexible {cleanAsset}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`text-[11px] font-semibold ${
                          isEarn ? 'text-amber-400' : isFunding ? 'text-blue-400' : isFutures ? 'text-purple-400' : 'text-trade-cyan'
                        }`}>
                          {isEarn ? 'Simple Earn' : isFunding ? 'Funding Wallet' : isFutures ? 'Futures (USDT-M)' : 'Spot Wallet'}
                        </span>
                      </td>
                      <td className="py-3 px-5 font-bold text-white">
                        ${(item.estimatedUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-5 text-slate-200">
                        {formatNumber(item.free, 6)}
                      </td>
                      <td className="py-3 px-5 text-slate-400">
                        {formatNumber(item.locked || item.freeze || 0, 6)}
                      </td>
                      <td className="py-3 px-5 font-bold text-white">
                        {formatNumber(item.total, 6)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 font-mono text-xs space-y-3">
            <p>No non-zero balances found in this wallet category.</p>
          </div>
        )}
      </div>

      {/* ADJUST LEVERAGE CONFIRMATION MODAL */}
      {leverageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-purple-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-dark-750 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-purple-400" />
                <h3 className="font-mono font-bold text-white text-sm">
                  ADJUST LEVERAGE - {leverageModal.symbol}
                </h3>
              </div>
              <button
                onClick={() => !submittingAction && setLeverageModal(null)}
                className="text-slate-400 hover:text-white"
                disabled={submittingAction}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="bg-dark-850 p-4 rounded-xl border border-dark-750 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">Current Leverage</span>
                  <span className="text-white font-bold text-lg">{leverageModal.currentLeverage}x</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500" />
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">New Leverage</span>
                  <span className="text-purple-400 font-extrabold text-2xl">{leverageModal.newLeverage}x</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>1x (Lowest Risk)</span>
                  <span>50x (Highest Risk)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={leverageModal.newLeverage}
                  onChange={(e) => setLeverageModal({ ...leverageModal, newLeverage: parseInt(e.target.value, 10) })}
                  className="w-full accent-purple-500 cursor-pointer h-2 bg-dark-750 rounded-lg"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5, 10, 20, 25, 50].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setLeverageModal({ ...leverageModal, newLeverage: preset })}
                    className={`py-1.5 rounded-lg font-bold border transition-all ${
                      leverageModal.newLeverage === preset
                        ? 'bg-purple-500 text-white border-purple-400'
                        : 'bg-dark-800 text-slate-300 border-dark-700 hover:bg-dark-750'
                    }`}
                  >
                    {preset}x
                  </button>
                ))}
              </div>

              {/* Warning Notice */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5 text-amber-300 text-[11px]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Caution:</strong> Adjusting leverage will change the margin required for this position and your liquidation price. Please confirm carefully before updating on Binance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLeverageModal(null)}
                disabled={submittingAction}
                className="flex-1 py-2.5 bg-dark-800 hover:bg-dark-750 text-slate-300 font-mono text-xs rounded-xl font-bold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAdjustLeverage}
                disabled={submittingAction || leverageModal.newLeverage === leverageModal.currentLeverage}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs rounded-xl font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingAction ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Confirm {leverageModal.newLeverage}x</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLOSE POSITION CONFIRMATION MODAL */}
      {closePositionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-trade-red/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-dark-750 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-trade-red" />
                <h3 className="font-mono font-bold text-white text-sm">
                  CONFIRM CLOSE POSITION
                </h3>
              </div>
              <button
                onClick={() => !submittingAction && setClosePositionModal(null)}
                className="text-slate-400 hover:text-white"
                disabled={submittingAction}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="bg-dark-850 p-4 rounded-xl border border-dark-750 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Contract</span>
                  <span className="text-white font-bold text-sm">{closePositionModal.symbol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Side & Size</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                    closePositionModal.positionAmt > 0
                      ? 'bg-trade-green/20 text-trade-green'
                      : 'bg-trade-red/20 text-trade-red'
                  }`}>
                    {closePositionModal.positionAmt > 0 ? 'LONG' : 'SHORT'} {Math.abs(closePositionModal.positionAmt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Entry Price</span>
                  <span className="text-white">{formatPrice(closePositionModal.entryPrice, 4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mark Price</span>
                  <span className="text-trade-cyan font-bold">
                    {formatPrice(
                      closePositionModal.markPrice > 0
                        ? closePositionModal.markPrice
                        : (closePositionModal.positionAmt !== 0
                            ? closePositionModal.entryPrice + (closePositionModal.unRealizedProfit / closePositionModal.positionAmt)
                            : closePositionModal.entryPrice),
                      4
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-dark-750 pt-2">
                  <span className="text-slate-400 font-bold">Unrealized PnL</span>
                  <span className={`font-extrabold text-sm ${
                    closePositionModal.unRealizedProfit >= 0 ? 'text-trade-green' : 'text-trade-red'
                  }`}>
                    {closePositionModal.unRealizedProfit >= 0 ? '+' : ''}${formatNumber(closePositionModal.unRealizedProfit, 2)} USD
                  </span>
                </div>
              </div>

              {/* Order Execution Type Notice */}
              <div className="bg-trade-red/10 border border-trade-red/30 rounded-xl p-3 text-slate-300 text-[11px] space-y-1">
                <div className="text-trade-red font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Immediate Market Exit (Reduce-Only)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  This action submits a live <strong>MARKET</strong> order with <code>reduceOnly: true</code> to Binance. 
                  The entire position of <strong>{Math.abs(closePositionModal.positionAmt)} {closePositionModal.symbol}</strong> will be closed immediately at best available market price.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setClosePositionModal(null)}
                disabled={submittingAction}
                className="flex-1 py-2.5 bg-dark-800 hover:bg-dark-750 text-slate-300 font-mono text-xs rounded-xl font-bold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClosePosition}
                disabled={submittingAction}
                className="flex-1 py-2.5 bg-trade-red hover:bg-trade-red/90 text-white font-mono text-xs rounded-xl font-bold transition-all shadow-lg shadow-trade-red/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submittingAction ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Closing...</span>
                  </>
                ) : (
                  <span>Confirm Close Position</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



