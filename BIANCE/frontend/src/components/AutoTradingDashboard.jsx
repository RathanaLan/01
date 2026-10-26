import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Square, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  Percent, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Terminal as TerminalIcon, 
  HelpCircle, 
  Sliders, 
  Flame, 
  ArrowUpRight, 
  ArrowDownRight, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  Layers,
  Check,
  Compass,
  Coins
} from 'lucide-react';
import { 
  getBotStatus, 
  startBotSession, 
  pauseBotSession, 
  stopBotSession, 
  closeBotPosition, 
  emergencyCloseAllBotPositions, 
  resetBotMetrics 
} from '../services/api';
import { formatPrice, formatNumber, formatPercent } from '../utils/formatters';
import CoinSelectorModal from './CoinSelectorModal';

const POPULAR_COINS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETHUSDT', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'SOLUSDT', name: 'Solana', icon: '◎' },
  { symbol: '1000PEPEUSDT', name: 'PEPE', icon: '🐸' },
  { symbol: 'DOGEUSDT', name: 'Dogecoin', icon: 'Ð' },
  { symbol: '1000BONKUSDT', name: 'BONK', icon: '🐕' },
  { symbol: 'BNBUSDT', name: 'BNB', icon: '🟡' },
  { symbol: 'XRPUSDT', name: 'Ripple', icon: '✕' },
  { symbol: 'SUIUSDT', name: 'SUI', icon: '💧' }
];

export default function AutoTradingDashboard({ 
  selectedSymbol = 'BTCUSDT', 
  onSelectSymbol, 
  accountData = null, 
  allWalletsData = null,
  allSymbols = [],
  tickers = []
}) {
  const [botState, setBotState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Form Configuration states
  const [symbol, setSymbol] = useState(selectedSymbol || 'BTCUSDT');
  const [marketType, setMarketType] = useState('FUTURES'); // 'SPOT' | 'FUTURES'
  const [mode, setMode] = useState('PAPER'); // 'PAPER' | 'LIVE'
  const [allocatedFund, setAllocatedFund] = useState('50');
  const [leverage, setLeverage] = useState(5);
  const [strategy, setStrategy] = useState('AI_MULTI_FACTOR');
  const [takeProfitPct, setTakeProfitPct] = useState('2.5');
  const [stopLossPct, setStopLossPct] = useState('1.5');
  const [trailingStop, setTrailingStop] = useState(true);
  const [trailingStopPct, setTrailingStopPct] = useState('0.8');
  const [timeframe, setTimeframe] = useState('15m');

  // Easy Mode: 1-Click Risk Profiles
  const [riskProfile, setRiskProfile] = useState('balanced'); // 'conservative' | 'balanced' | 'scalper' | 'custom'
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);

  // Confirmation modal for starting in LIVE mode
  const [showLiveConfirmModal, setShowLiveConfirmModal] = useState(false);

  // Auto-scroll terminal log ref
  const logTerminalRef = useRef(null);

  // Sync selectedSymbol if prop changes
  useEffect(() => {
    if (selectedSymbol && botState?.status !== 'RUNNING') {
      setSymbol(selectedSymbol);
    }
  }, [selectedSymbol]);

  // Fetch bot status
  const fetchStatus = async () => {
    try {
      const res = await getBotStatus();
      if (res.success && res.data) {
        setBotState(res.data);
      }
    } catch (err) {
      console.warn('Bot status sync notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Poll bot status every 2 seconds for real-time tracking
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // Calculate user's available balance in selected market
  const spotUsdt = (accountData?.balances || []).find((b) => b.asset === 'USDT')?.free || 0;
  const futuresUsdt = allWalletsData?.futures?.availableBalance || 0;
  const availableCapital = marketType === 'FUTURES' ? futuresUsdt : spotUsdt;

  // Apply 1-Click Risk Profile
  const applyProfile = (profileKey) => {
    setRiskProfile(profileKey);
    if (profileKey === 'conservative') {
      setLeverage(2);
      setTakeProfitPct('1.5');
      setStopLossPct('1.0');
      setStrategy('AI_MULTI_FACTOR');
      setTimeframe('15m');
      setTrailingStop(true);
      setTrailingStopPct('0.5');
    } else if (profileKey === 'balanced') {
      setLeverage(5);
      setTakeProfitPct('2.5');
      setStopLossPct('1.5');
      setStrategy('AI_MULTI_FACTOR');
      setTimeframe('15m');
      setTrailingStop(true);
      setTrailingStopPct('0.8');
    } else if (profileKey === 'scalper') {
      setLeverage(10);
      setTakeProfitPct('1.2');
      setStopLossPct('0.8');
      setStrategy('EMA_TREND_CROSS');
      setTimeframe('5m');
      setTrailingStop(true);
      setTrailingStopPct('0.4');
    }
  };

  const handleSetFundPercent = (pct) => {
    if (availableCapital <= 0) {
      setAllocatedFund('25');
      return;
    }
    const calc = Math.max(5, (availableCapital * pct) / 100);
    setAllocatedFund(calc.toFixed(0));
  };

  const handleStartBot = async (bypassConfirm = false) => {
    if (mode === 'LIVE' && !bypassConfirm) {
      setShowLiveConfirmModal(true);
      return;
    }

    setActionLoading(true);
    setFeedback(null);
    try {
      const config = {
        symbol,
        marketType,
        mode,
        allocatedFund: parseFloat(allocatedFund) || 50,
        leverage: parseInt(leverage, 10) || 5,
        strategy,
        takeProfitPct: parseFloat(takeProfitPct) || 2.5,
        stopLossPct: parseFloat(stopLossPct) || 1.5,
        trailingStop,
        trailingStopPct: parseFloat(trailingStopPct) || 0.8,
        timeframe
      };

      const res = await startBotSession(config);
      if (res.success) {
        setBotState(res.data);
        setFeedback({ type: 'success', message: res.message || 'Auto Trading Bot started successfully!' });
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to start bot' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setActionLoading(false);
      setShowLiveConfirmModal(false);
    }
  };

  const handlePauseBot = async () => {
    setActionLoading(true);
    try {
      const res = await pauseBotSession();
      if (res.success) setBotState(res.data);
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleStopBot = async (closePositions = false) => {
    setActionLoading(true);
    try {
      const res = await stopBotSession(closePositions);
      if (res.success) {
        setBotState(res.data);
        setFeedback({ type: 'info', message: 'Auto Trading Session stopped.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleClosePosition = async (positionId) => {
    setActionLoading(true);
    try {
      const res = await closeBotPosition(positionId);
      if (res.success) {
        fetchStatus();
        setFeedback({ type: 'success', message: 'Position closed successfully.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEmergencyCloseAll = async () => {
    if (!window.confirm('EMERGENCY ACTION: Are you sure you want to market-close ALL open positions immediately?')) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await emergencyCloseAllBotPositions();
      if (res.success) {
        fetchStatus();
        setFeedback({ type: 'success', message: `Emergency closed ${res.data?.length || 0} positions!` });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetMetrics = async () => {
    if (!window.confirm('Reset bot metrics, win rate, and trade history?')) return;
    try {
      const res = await resetBotMetrics();
      if (res.success) setBotState(res.data);
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  const isRunning = botState?.status === 'RUNNING';
  const isPaused = botState?.status === 'PAUSED';
  const activePositions = botState?.activePositions || [];
  const metrics = botState?.metrics || { totalTrades: 0, winningTrades: 0, losingTrades: 0, winRate: 0, totalRealizedPnL: 0 };
  const logs = botState?.recentLogs || [];
  const analysis = botState?.latestAnalysis || null;

  // Potential Return / Risk Calculations
  const fundNum = parseFloat(allocatedFund) || 0;
  const levNum = marketType === 'FUTURES' ? parseInt(leverage, 10) || 1 : 1;
  const tpNum = parseFloat(takeProfitPct) || 0;
  const slNum = parseFloat(stopLossPct) || 0;
  const projectedProfitUsd = (fundNum * (tpNum / 100) * levNum);
  const projectedProfitRoi = (tpNum * levNum);
  const projectedLossUsd = (fundNum * (slNum / 100) * levNum);
  const projectedLossRoi = (slNum * levNum);
  const riskRewardRatio = slNum > 0 ? (tpNum / slNum).toFixed(2) : '1.0';

  return (
    <div className="space-y-6 font-mono text-slate-100">
      {/* 1. TOP HEADER & PERFORMANCE HERO */}
      <div className="glass-panel rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-3d">
        <div className="flex items-center gap-3.5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all animate-float3d ${
            isRunning 
              ? 'bg-trade-green/20 border-2 border-trade-green text-trade-green shadow-trade-green/25 animate-pulseGlowGreen' 
              : isPaused
              ? 'bg-amber-500/20 border-2 border-amber-500 text-amber-400'
              : 'bg-dark-800 border border-dark-700 text-slate-400'
          }`}>
            <Bot className={`w-7 h-7 ${isRunning ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-wider flex items-center gap-1.5">
                <span>EASY AUTO TRADING BOT</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                  AI QUANT
                </span>
              </h1>
              {isRunning && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-trade-green/15 text-trade-green border border-trade-green/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-trade-green animate-ping" />
                  LIVE TRADING ACTIVE
                </span>
              )}
              {isPaused && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  PAUSED
                </span>
              )}
              {!isRunning && !isPaused && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-dark-800 text-slate-400 border border-dark-700">
                  READY TO START
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated buy, sell & profit taking for Spot & Futures with graph learning and capital protection.
            </p>
          </div>
        </div>

        {/* Global Control Buttons */}
        <div className="flex items-center gap-2 self-stretch md:self-auto">
          {isRunning ? (
            <>
              <button
                onClick={handlePauseBot}
                disabled={actionLoading}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-bold transition-all"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </button>
              <button
                onClick={() => handleStopBot(false)}
                disabled={actionLoading}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-300 border border-dark-700 text-xs font-bold transition-all"
              >
                <Square className="w-3.5 h-3.5" />
                <span>STOP</span>
              </button>
            </>
          ) : isPaused ? (
            <>
              <button
                onClick={() => handleStartBot(true)}
                disabled={actionLoading}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-trade-green hover:bg-trade-green/90 text-dark-950 font-bold text-xs shadow-md shadow-trade-green/20 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-dark-950" />
                <span>RESUME</span>
              </button>
              <button
                onClick={() => handleStopBot(false)}
                disabled={actionLoading}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-300 border border-dark-700 text-xs font-bold transition-all"
              >
                <Square className="w-3.5 h-3.5" />
                <span>STOP</span>
              </button>
            </>
          ) : null}

          {/* Emergency Panic Button */}
          {activePositions.length > 0 && (
            <button
              onClick={handleEmergencyCloseAll}
              disabled={actionLoading}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-trade-red/20 hover:bg-trade-red/30 text-trade-red border border-trade-red/40 text-xs font-bold transition-all shadow-md shadow-trade-red/10"
              title="Close all open positions immediately at market price"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>PANIC CLOSE ALL</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
          feedback.type === 'success' 
            ? 'bg-trade-green/10 border-trade-green/30 text-trade-green'
            : feedback.type === 'error'
            ? 'bg-trade-red/10 border-trade-red/30 text-trade-red'
            : 'bg-dark-850 border-dark-700 text-slate-300'
        }`}>
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white text-sm ml-2">✕</button>
        </div>
      )}

      {/* 2. REAL-TIME METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {/* Realized PnL */}
        <div className="glass-card card-3d p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span className="font-bold">REALIZED NET PnL</span>
            <DollarSign className="w-3.5 h-3.5 text-trade-green" />
          </div>
          <div className={`text-lg md:text-xl font-black drop-shadow-sm ${
            metrics.totalRealizedPnL >= 0 ? 'text-trade-green' : 'text-trade-red'
          }`}>
            {metrics.totalRealizedPnL >= 0 ? '+' : ''}${metrics.totalRealizedPnL.toFixed(2)}
            <span className="text-[10px] font-normal text-slate-400 ml-1">USDT</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            From {metrics.totalTrades} closed trades
          </div>
        </div>

        {/* Win Rate */}
        <div className="glass-card card-3d p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span className="font-bold">WIN RATE</span>
            <Target className="w-3.5 h-3.5 text-trade-cyan" />
          </div>
          <div className="text-lg md:text-xl font-black text-white drop-shadow-sm">
            {metrics.winRate}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
            <span className="text-trade-green font-bold">{metrics.winningTrades}W</span>
            <span>/</span>
            <span className="text-trade-red font-bold">{metrics.losingTrades}L</span>
          </div>
        </div>

        {/* Active In-Play Capital */}
        <div className="glass-card card-3d p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span className="font-bold">ALLOCATED CAPITAL</span>
            <Percent className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg md:text-xl font-black text-amber-400 drop-shadow-sm">
            ${botState?.config?.allocatedFund || allocatedFund}
            <span className="text-[10px] font-normal text-slate-400 ml-1">USDT</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {botState?.config?.marketType === 'FUTURES' ? `${botState?.config?.leverage || leverage}x Leverage` : 'Spot (1x)'}
          </div>
        </div>

        {/* Active Open Positions Count & Floating PnL */}
        <div className="glass-card card-3d p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span className="font-bold">OPEN POSITIONS</span>
            <Zap className="w-3.5 h-3.5 text-trade-cyan" />
          </div>
          <div className="text-lg md:text-xl font-black text-white flex items-center gap-2">
            <span>{activePositions.length}</span>
            {activePositions.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                (activePositions[0]?.floatingPnLPct || 0) >= 0 
                  ? 'bg-trade-green/15 text-trade-green border border-trade-green/30' 
                  : 'bg-trade-red/15 text-trade-red border border-trade-red/30'
              }`}>
                {(activePositions[0]?.floatingPnLPct || 0) >= 0 ? '+' : ''}{activePositions[0]?.floatingPnLPct || 0}%
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Target TP: +{botState?.config?.takeProfitPct || takeProfitPct}%
          </div>
        </div>

        {/* Engine Mode */}
        <div className="col-span-2 md:col-span-4 lg:col-span-1 glass-card card-3d p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
            <span className="font-bold">EXECUTION MODE</span>
            <ShieldCheck className="w-3.5 h-3.5 text-trade-cyan" />
          </div>
          <div className="text-xs font-bold mt-1">
            {(botState?.config?.mode || mode) === 'PAPER' ? (
              <span className="text-trade-cyan flex items-center gap-1 font-bold">
                <span>🧪 PAPER SIMULATION</span>
              </span>
            ) : (
              <span className="text-trade-green flex items-center gap-1 font-extrabold">
                <span>⚡ LIVE BINANCE REAL</span>
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
            <span>{botState?.config?.marketType || marketType}</span>
            <button
              onClick={handleResetMetrics}
              title="Reset metrics"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE OPEN POSITION CARD (HIGH-IMPACT VISUAL) */}
      {activePositions.length > 0 && (
        <div className="bg-dark-900 border-2 border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-dark-750 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-trade-green animate-ping" />
              <h2 className="text-xs sm:text-sm font-black text-white tracking-wider flex items-center gap-2">
                <span>BOT ACTIVE POSITION UNDER MANAGEMENT</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">
                  AUTO-EXIT ARMED
                </span>
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Ticks every 3s</span>
          </div>

          {activePositions.map((pos) => {
            const isProfit = pos.floatingPnLPct >= 0;
            const targetTp = botState?.config?.takeProfitPct || parseFloat(takeProfitPct) || 2.5;
            const tpProgress = Math.min(100, Math.max(0, (pos.floatingPnLPct / targetTp) * 100));

            return (
              <div 
                key={pos.id} 
                className={`card-3d ${isProfit ? 'card-3d-green' : 'card-3d-red'} bg-gradient-to-b from-dark-850 via-dark-900 to-dark-950 border rounded-2xl p-5 space-y-4 shadow-xl ${
                  isProfit ? 'border-trade-green/30' : 'border-trade-red/30'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm ${
                      pos.side === 'BUY' 
                        ? 'bg-trade-green/20 text-trade-green border border-trade-green/40' 
                        : 'bg-trade-red/20 text-trade-red border border-trade-red/40'
                    }`}>
                      {pos.side === 'BUY' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span>{pos.side === 'BUY' ? 'LONG' : 'SHORT'}</span>
                    </span>
                    <span className="text-base font-black text-white">{pos.symbol}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-dark-750 text-slate-300 border border-dark-700">
                      {pos.leverage > 1 ? `${pos.leverage}x Lev` : 'Spot 1x'}
                    </span>
                    <span className="text-xs text-slate-400">Qty: {pos.quantity}</span>
                  </div>

                  {/* Manual Close Button */}
                  <button
                    onClick={() => handleClosePosition(pos.id)}
                    disabled={actionLoading}
                    className="btn-3d px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 text-dark-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-dark-950" />
                    <span>BANK PROFIT & CLOSE NOW</span>
                  </button>
                </div>

                {/* Big Floating Unrealized Profit Hero */}
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  isProfit ? 'bg-trade-green/10 border-trade-green/30' : 'bg-trade-red/10 border-trade-red/30'
                }`}>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      FLOATING UNREALIZED PROFIT (PnL)
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl sm:text-4xl font-black tracking-tight ${
                        isProfit ? 'text-trade-green' : 'text-trade-red'
                      }`}>
                        {isProfit ? '+' : ''}${pos.floatingPnLUsd}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">USD</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xl sm:text-2xl font-black px-3 py-1 rounded-xl border inline-block ${
                      isProfit 
                        ? 'bg-trade-green/20 text-trade-green border-trade-green/40' 
                        : 'bg-trade-red/20 text-trade-red border-trade-red/40'
                    }`}>
                      {isProfit ? '+' : ''}{pos.floatingPnLPct}% ROI
                    </span>
                  </div>
                </div>

                {/* Take Profit Progress Bar */}
                <div className="space-y-1.5 bg-dark-950/70 p-3 rounded-xl border border-dark-800">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-trade-green" />
                      <span>Auto-Take Profit Progress (+{targetTp}%)</span>
                    </span>
                    <span className="text-trade-green font-black">{tpProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-dark-900 rounded-full overflow-hidden border border-dark-750">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isProfit ? 'bg-gradient-to-r from-trade-green to-trade-cyan' : 'bg-trade-red'
                      }`} 
                      style={{ width: `${tpProgress}%` }}
                    />
                  </div>
                </div>

                {/* Price Matrix */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1 text-xs">
                  <div className="bg-dark-950/60 p-2.5 rounded-lg border border-dark-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Entry Price</span>
                    <span className="font-bold text-white">{formatPrice(pos.entryPrice, 4)}</span>
                  </div>
                  <div className="bg-dark-950/60 p-2.5 rounded-lg border border-dark-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Current Price (Live)</span>
                    <span className="font-bold text-trade-cyan">{formatPrice(pos.currentPrice, 4)}</span>
                  </div>
                  <div className="bg-dark-950/60 p-2.5 rounded-lg border border-dark-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Take Profit Target</span>
                    <span className="font-bold text-trade-green">{formatPrice(pos.takeProfitPrice, 4)}</span>
                  </div>
                  <div className="bg-dark-950/60 p-2.5 rounded-lg border border-dark-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Stop Loss Barrier</span>
                    <span className="font-bold text-trade-red">{formatPrice(pos.stopLossPrice, 4)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. MAIN WORKSPACE: EASY 3-STEP BOT LAUNCHER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Easy Session Setup */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-dark-900 border border-dark-750 rounded-2xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="px-5 py-4 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-trade-cyan/15 text-trade-cyan border border-trade-cyan/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    EASY BOT SETUP (3 SIMPLE STEPS)
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Pick your coin, choose risk style, set your fund, and launch!
                  </p>
                </div>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-dark-750 text-slate-300 font-bold border border-dark-700">
                STEP-BY-STEP
              </span>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              {/* STEP 1: CHOOSE MARKET & TARGET COIN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-trade-cyan/20 text-trade-cyan border border-trade-cyan/40 flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>CHOOSE MARKET & TARGET COIN</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Current: <strong className="text-white">{symbol}</strong>
                  </span>
                </div>

                {/* Execution Mode (Paper vs Live) */}
                <div className="grid grid-cols-2 gap-2 bg-dark-950 p-1.5 rounded-xl border border-dark-750">
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => setMode('PAPER')}
                    className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      mode === 'PAPER'
                        ? 'bg-trade-cyan text-dark-950 shadow-md shadow-trade-cyan/20 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🧪 Risk-Free Simulation (Paper)</span>
                  </button>
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => setMode('LIVE')}
                    className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      mode === 'LIVE'
                        ? 'bg-trade-green text-dark-950 shadow-md shadow-trade-green/20 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>⚡ Live Real Binance Orders</span>
                  </button>
                </div>

                {/* Market Type (Futures vs Spot) */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => {
                      setMarketType('FUTURES');
                      if (leverage === 1) setLeverage(5);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      marketType === 'FUTURES'
                        ? 'bg-purple-500/15 border-purple-500/50 text-white shadow-sm'
                        : 'bg-dark-950 border-dark-750 text-slate-400 hover:border-dark-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs flex items-center gap-1 text-purple-400">
                        <Zap className="w-3.5 h-3.5" />
                        <span>FUTURES (USDT-M)</span>
                      </span>
                      {marketType === 'FUTURES' && <Check className="w-3.5 h-3.5 text-purple-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Allows both <strong>Longs & Shorts</strong> with leverage (2x-20x)
                    </p>
                  </button>

                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => {
                      setMarketType('SPOT');
                      setLeverage(1);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      marketType === 'SPOT'
                        ? 'bg-trade-cyan/15 border-trade-cyan/50 text-white shadow-sm'
                        : 'bg-dark-950 border-dark-750 text-slate-400 hover:border-dark-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs flex items-center gap-1 text-trade-cyan">
                        <Coins className="w-3.5 h-3.5" />
                        <span>SPOT (LONG ONLY)</span>
                      </span>
                      {marketType === 'SPOT' && <Check className="w-3.5 h-3.5 text-trade-cyan" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Standard asset buy & sell without borrowing (1x leverage)
                    </p>
                  </button>
                </div>

                {/* Popular Coin Chips & Search Button */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-slate-400 font-bold">HOT COINS (ONE-CLICK PICK):</span>
                    <button
                      type="button"
                      disabled={isRunning}
                      onClick={() => setShowCoinModal(true)}
                      className="text-[11px] text-trade-cyan hover:underline flex items-center gap-1 font-bold"
                    >
                      <Search className="w-3 h-3" />
                      <span>Browse 500+ Coins</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_COINS.map((c) => {
                      const isSelected = symbol === c.symbol || (marketType === 'FUTURES' && symbol === c.symbol);
                      return (
                        <button
                          key={c.symbol}
                          type="button"
                          disabled={isRunning}
                          onClick={() => {
                            setSymbol(c.symbol);
                            if (onSelectSymbol) onSelectSymbol(c.symbol);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isSelected
                              ? 'bg-trade-cyan text-dark-950 font-black shadow-md shadow-trade-cyan/20'
                              : 'bg-dark-950 hover:bg-dark-800 text-slate-300 border border-dark-750'
                          }`}
                        >
                          <span>{c.icon}</span>
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 2: 1-CLICK STRATEGY RISK PROFILES */}
              <div className="space-y-3 pt-3 border-t border-dark-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-trade-green/20 text-trade-green border border-trade-green/40 flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>CHOOSE TRADING RISK STYLE</span>
                  </label>
                  <span className="text-[11px] text-slate-400">1-Click presets</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Profile 1: Conservative */}
                  <div
                    onClick={() => !isRunning && applyProfile('conservative')}
                    className={`card-3d p-3.5 rounded-xl border cursor-pointer transition-all ${
                      riskProfile === 'conservative'
                        ? 'bg-dark-800 border-trade-green shadow-md shadow-trade-green/10 card-3d-green'
                        : 'bg-dark-950 border-dark-750 hover:border-dark-700 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-trade-green flex items-center gap-1">
                        🛡️ Conservative
                      </span>
                      {riskProfile === 'conservative' && <Check className="w-3.5 h-3.5 text-trade-green" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Safe & steady growth. Low leverage (2x) with tight 1.0% stop loss.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-dark-750 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">TP: +1.5%</span>
                      <span className="text-trade-red">SL: -1.0%</span>
                    </div>
                  </div>

                  {/* Profile 2: Balanced */}
                  <div
                    onClick={() => !isRunning && applyProfile('balanced')}
                    className={`card-3d p-3.5 rounded-xl border cursor-pointer transition-all ${
                      riskProfile === 'balanced'
                        ? 'bg-dark-800 border-trade-cyan shadow-md shadow-trade-cyan/10 card-3d-cyan'
                        : 'bg-dark-950 border-dark-750 hover:border-dark-700 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-trade-cyan flex items-center gap-1">
                        ⚡ Balanced (Best)
                      </span>
                      {riskProfile === 'balanced' && <Check className="w-3.5 h-3.5 text-trade-cyan" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Optimal risk-reward. 5x leverage, +2.5% profit target, trailing stop.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-dark-750 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-trade-green">TP: +2.5%</span>
                      <span className="text-trade-red">SL: -1.5%</span>
                    </div>
                  </div>

                  {/* Profile 3: Aggressive Scalper */}
                  <div
                    onClick={() => !isRunning && applyProfile('scalper')}
                    className={`card-3d p-3.5 rounded-xl border cursor-pointer transition-all ${
                      riskProfile === 'scalper'
                        ? 'bg-dark-800 border-amber-400 shadow-md shadow-amber-400/10'
                        : 'bg-dark-950 border-dark-750 hover:border-dark-700 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-amber-400 flex items-center gap-1">
                        🚀 Scalper
                      </span>
                      {riskProfile === 'scalper' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      High frequency scalps. 10x leverage, fast +1.2% quick profit exit.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-dark-750 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-trade-green">TP: +1.2%</span>
                      <span className="text-trade-red">SL: -0.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: SET YOUR FUND & PROJECTED RETURN */}
              <div className="space-y-3 pt-3 border-t border-dark-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <span>SET CAPITAL FOR TRADING</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Wallet Avail: <strong className="text-trade-cyan">${formatNumber(availableCapital, 2)} USDT</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fund Input & Quick Buttons */}
                  <div className="space-y-2">
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        disabled={isRunning}
                        value={allocatedFund}
                        onChange={(e) => setAllocatedFund(e.target.value)}
                        className="w-full bg-dark-950 border border-dark-750 rounded-xl pl-8 pr-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-trade-cyan"
                        placeholder="50"
                        min="5"
                      />
                      <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 font-bold">USDT</span>
                    </div>

                    {/* Quick percentage buttons */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {[10, 25, 50, 100].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          disabled={isRunning}
                          onClick={() => handleSetFundPercent(pct)}
                          className="btn-3d py-1 text-[11px] bg-dark-950 hover:bg-dark-800 border border-dark-750 rounded-lg text-slate-300 font-bold transition-colors"
                        >
                          {pct === 100 ? 'MAX' : `${pct}%`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Projected Return Card */}
                  <div className="bg-dark-950 p-3.5 rounded-xl border border-dark-750 space-y-2 text-xs">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">
                      PROJECTED RETURN PER TRADE:
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">If Take Profit Hits:</span>
                      <span className="text-trade-green font-black">
                        +${projectedProfitUsd.toFixed(2)} USD (+{projectedProfitRoi.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">If Stop Loss Hits:</span>
                      <span className="text-trade-red font-black">
                        -${projectedLossUsd.toFixed(2)} USD (-{projectedLossRoi.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-dark-850 text-[10px]">
                      <span className="text-slate-500">Risk/Reward Ratio:</span>
                      <span className="text-slate-300 font-bold">1 : {riskRewardRatio}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTIONAL ACCORDION: FINE-TUNE ADVANCED SETTINGS */}
              <div className="pt-2 border-t border-dark-800">
                <button
                  type="button"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white py-1 transition-colors"
                >
                  <span className="flex items-center gap-1.5 font-bold">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-trade-cyan" />
                    <span>Advanced Strategy & Indicator Settings (Optional)</span>
                  </span>
                  {showAdvancedSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showAdvancedSettings && (
                  <div className="mt-3 p-4 bg-dark-950 rounded-xl border border-dark-750 space-y-4 text-xs animate-fadeIn">
                    {/* Strategy Pick */}
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1">
                        TECHNICAL STRATEGY ENGINE
                      </label>
                      <select
                        disabled={isRunning}
                        value={strategy}
                        onChange={(e) => {
                          setStrategy(e.target.value);
                          setRiskProfile('custom');
                        }}
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="AI_MULTI_FACTOR">🧠 Adaptive AI Multi-Factor (RSI + MACD + Momentum)</option>
                        <option value="EMA_TREND_CROSS">📈 EMA Trend Cross (EMA 9 crossing EMA 21)</option>
                        <option value="RSI_REVERSION">🔄 RSI Mean Reversion (Oversold Dip Buyer)</option>
                        <option value="BREAKOUT_ATR">⚡ Volatility Breakout (Bollinger Bands Squeeze)</option>
                      </select>
                    </div>

                    {/* Leverage Buttons (Futures) */}
                    {marketType === 'FUTURES' && (
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">
                          CUSTOM LEVERAGE
                        </label>
                        <div className="grid grid-cols-6 gap-1">
                          {[1, 2, 3, 5, 10, 20].map((l) => (
                            <button
                              key={l}
                              type="button"
                              disabled={isRunning}
                              onClick={() => {
                                setLeverage(l);
                                setRiskProfile('custom');
                              }}
                              className={`py-1.5 text-xs rounded border font-bold transition-colors ${
                                leverage === l 
                                  ? 'bg-purple-500 text-white border-purple-400 font-black' 
                                  : 'bg-dark-900 border-dark-700 text-slate-400 hover:text-white'
                              }`}
                            >
                              {l}x
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TP & SL Fine tuning */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Take Profit %</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          disabled={isRunning}
                          value={takeProfitPct}
                          onChange={(e) => {
                            setTakeProfitPct(e.target.value);
                            setRiskProfile('custom');
                          }}
                          className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-1.5 text-xs text-trade-green font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Stop Loss %</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          disabled={isRunning}
                          value={stopLossPct}
                          onChange={(e) => {
                            setStopLossPct(e.target.value);
                            setRiskProfile('custom');
                          }}
                          className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-1.5 text-xs text-trade-red font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Candle Timeframe</label>
                        <select
                          disabled={isRunning}
                          value={timeframe}
                          onChange={(e) => {
                            setTimeframe(e.target.value);
                            setRiskProfile('custom');
                          }}
                          className="w-full bg-dark-900 border border-dark-700 rounded-lg px-2 py-1.5 text-xs text-white"
                        >
                          <option value="5m">5m (Fast)</option>
                          <option value="15m">15m (Standard)</option>
                          <option value="1h">1h (Swing)</option>
                        </select>
                      </div>
                    </div>

                    {/* Trailing Stop */}
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          disabled={isRunning}
                          checked={trailingStop}
                          onChange={(e) => setTrailingStop(e.target.checked)}
                          className="rounded bg-dark-900 border-dark-700 text-trade-green focus:ring-0"
                        />
                        <span className="text-slate-300">Trailing Stop (locks maximum peak gains)</span>
                      </label>
                      <span className="text-slate-400 text-[10px]">Trail 0.8%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* START SESSION CTA BUTTON */}
              {!isRunning ? (
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleStartBot(false)}
                  className={`btn-3d w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl ${
                    mode === 'LIVE'
                      ? 'bg-gradient-to-r from-trade-green to-emerald-500 hover:opacity-95 text-dark-950 shadow-trade-green/25 hover:shadow-trade-green/40'
                      : 'bg-gradient-to-r from-trade-cyan to-blue-500 hover:opacity-95 text-dark-950 shadow-trade-cyan/25 hover:shadow-trade-cyan/40'
                  }`}
                >
                  <Play className="w-5 h-5 fill-dark-950" />
                  <span>START AUTO TRADING BOT ({mode === 'LIVE' ? 'LIVE BINANCE' : 'PAPER SIMULATION'})</span>
                </button>
              ) : (
                <div className="p-4 bg-trade-green/10 border-2 border-trade-green/40 rounded-2xl text-center space-y-1.5">
                  <div className="text-xs text-trade-green font-black flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-trade-green animate-ping" />
                    <span>BOT ACTIVELY TRADING {symbol} ({mode} MODE)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Evaluating ticks every 3s. To change settings or coin, click <strong>PAUSE</strong> or <strong>STOP</strong> at the top.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Live Indicators & Real-Time Decision Terminal */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Indicator Gauges (Learning from Online Graph) */}
          <div className="glass-panel card-3d rounded-2xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-dark-750 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Activity className="w-4 h-4 text-trade-cyan" />
                <span>ONLINE GRAPH SIGNALS // {symbol}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-trade-green/10 text-trade-green border border-trade-green/30">
                <span className="w-1.5 h-1.5 rounded-full bg-trade-green animate-pulse" />
                LIVE STREAM
              </span>
            </div>

            {analysis ? (
              <div className="space-y-3">
                {/* Score & Verdict */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-dark-750">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">AI COMPOSITE SCORE</span>
                    <span className={`text-lg font-black ${
                      analysis.score > 20 ? 'text-trade-green' : analysis.score < -20 ? 'text-trade-red' : 'text-slate-300'
                    }`}>
                      {analysis.score > 0 ? '+' : ''}{analysis.score} / 100
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">BOT SIGNAL VERDICT</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black inline-block ${
                      analysis.signal?.includes('BUY') 
                        ? 'bg-trade-green/20 text-trade-green border border-trade-green/40' 
                        : analysis.signal?.includes('SELL')
                        ? 'bg-trade-red/20 text-trade-red border border-trade-red/40'
                        : 'bg-dark-800 text-slate-400'
                    }`}>
                      {analysis.signal || 'NEUTRAL'}
                    </span>
                  </div>
                </div>

                {/* Sub-indicators Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-dark-950 p-2.5 rounded-xl border border-dark-800">
                    <span className="text-slate-400 text-[10px] block font-semibold">RSI (14)</span>
                    <span className="font-bold text-white text-sm">{analysis.indicators?.rsi?.toFixed(1) || '--'}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {analysis.indicators?.rsi < 32 ? '🟢 Oversold' : analysis.indicators?.rsi > 68 ? '🔴 Overbought' : '⚪ Neutral'}
                    </span>
                  </div>
                  <div className="bg-dark-950 p-2.5 rounded-xl border border-dark-800">
                    <span className="text-slate-400 text-[10px] block font-semibold">MACD MOMENTUM</span>
                    <span className={`font-bold text-sm ${analysis.indicators?.macdHistogram >= 0 ? 'text-trade-green' : 'text-trade-red'}`}>
                      {analysis.indicators?.macdHistogram?.toFixed(3) || '--'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {analysis.indicators?.macdHistogram >= 0 ? 'Bullish Mom.' : 'Bearish Press.'}
                    </span>
                  </div>
                </div>

                {/* Reasons List */}
                <div className="text-xs text-slate-300 space-y-1.5 bg-dark-950 p-3 rounded-xl border border-dark-800">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">GRAPH OBSERVATIONS:</span>
                  {(analysis.reasons || []).map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <span className="text-trade-cyan font-bold">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                Analyzing market graph data...
              </div>
            )}
          </div>

          {/* Real-Time Decision Terminal Logs */}
          <div className="glass-panel rounded-2xl overflow-hidden shadow-xl flex flex-col h-[340px] border border-dark-750">
            <div className="px-4 py-3 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5 text-trade-cyan" />
                <h3 className="text-xs font-bold text-white tracking-wider">
                  BOT DECISION TERMINAL
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">STREAMING</span>
            </div>

            <div 
              ref={logTerminalRef}
              className="flex-1 p-3.5 overflow-y-auto space-y-2 bg-dark-950 font-mono text-[10px] select-text"
            >
              {logs.length === 0 ? (
                <div className="text-slate-500 text-center py-12">
                  Waiting for bot actions... Click "START AUTO TRADING BOT" above.
                </div>
              ) : (
                logs.map((log) => {
                  const time = new Date(log.timestamp).toLocaleTimeString();
                  let color = 'text-slate-300';
                  if (log.level === 'PROFIT') color = 'text-trade-green font-bold';
                  if (log.level === 'SIGNAL') color = 'text-trade-cyan font-semibold';
                  if (log.level === 'EXECUTION') color = 'text-emerald-400 font-semibold';
                  if (log.level === 'PROTECT') color = 'text-amber-400 font-semibold';
                  if (log.level === 'ERROR') color = 'text-trade-red font-bold';

                  return (
                    <div key={log.id} className="leading-relaxed border-b border-dark-850/50 pb-1">
                      <span className="text-slate-500 mr-1.5">[{time}]</span>
                      <span className={`px-1 py-0.2 rounded text-[9px] mr-1.5 ${
                        log.level === 'PROFIT' ? 'bg-trade-green/10 text-trade-green' : 'bg-dark-800 text-slate-400'
                      }`}>
                        {log.level}
                      </span>
                      <span className={color}>{log.message}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. COIN SELECTOR MODAL */}
      <CoinSelectorModal
        isOpen={showCoinModal}
        onClose={() => setShowCoinModal(false)}
        selectedSymbol={symbol}
        onSelectSymbol={(newSym, symObj) => {
          setSymbol(newSym);
          if (onSelectSymbol) onSelectSymbol(newSym);
          if (symObj?.marketType) setMarketType(symObj.marketType);
          setShowCoinModal(false);
        }}
        allSymbols={allSymbols}
        allTickers={tickers}
        activeMarketType={marketType}
      />

      {/* 6. CONFIRMATION MODAL FOR LIVE REAL TRADING */}
      {showLiveConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-dark-900 border-2 border-trade-green/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-trade-green/20 border border-trade-green/40 flex items-center justify-center text-trade-green mx-auto">
              <Zap className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-white">CONFIRM LIVE REAL TRADING</h3>
              <p className="text-xs text-slate-300">
                You are launching automated trading with <strong>REAL BINANCE FUNDS</strong>.
              </p>
            </div>

            <div className="bg-dark-950 p-4 rounded-xl border border-dark-750 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Pair:</span>
                <span className="text-white font-bold">{symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Market Type:</span>
                <span className="text-white font-bold">{marketType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Allocated Fund:</span>
                <span className="text-trade-cyan font-bold">${allocatedFund} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Leverage:</span>
                <span className="text-white font-bold">{marketType === 'FUTURES' ? `${leverage}x` : '1x (Spot)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Auto Take Profit:</span>
                <span className="text-trade-green font-bold">+{takeProfitPct}% (+${projectedProfitUsd.toFixed(2)} USD)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Auto Stop Loss:</span>
                <span className="text-trade-red font-bold">-{stopLossPct}% (-${projectedLossUsd.toFixed(2)} USD)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 leading-snug">
              ⚠️ The bot will execute live market orders and automatically close positions when your take profit target or stop loss barrier is reached.
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLiveConfirmModal(false)}
                className="py-3 rounded-xl bg-dark-800 hover:bg-dark-750 border border-dark-700 text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleStartBot(true)}
                className="py-3 rounded-xl bg-trade-green hover:bg-trade-green/90 text-dark-950 text-xs font-black shadow-lg shadow-trade-green/20"
              >
                CONFIRM & LAUNCH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
