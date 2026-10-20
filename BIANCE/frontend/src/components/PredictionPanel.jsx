import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Target, 
  ShieldAlert, 
  Cpu, 
  BarChart3, 
  ArrowRight
} from 'lucide-react';
import { formatPrice, formatPercent } from '../utils/formatters';

export default function PredictionPanel({ 
  prediction, 
  loading, 
  onTimeframeChange, 
  activeInterval = '1h',
  onApplySignalToOrder
}) {
  if (loading) {
    return (
      <div className="bg-dark-900 border border-dark-750 rounded-xl p-6 flex flex-col items-center justify-center min-h-[380px]">
        <Cpu className="w-10 h-10 text-trade-cyan animate-spin mb-3" />
        <p className="text-sm font-mono text-slate-300">Calculating Quantitative Indicators...</p>
        <p className="text-xs text-slate-400 font-mono mt-1">Analyzing RSI, MACD, EMAs & Volatility</p>
      </div>
    );
  }

  const symbol = prediction?.symbol || 'BTCUSDT';
  const currentPrice = Number(prediction?.currentPrice) || 0;
  const recommendation = typeof prediction?.recommendation === 'string' ? prediction.recommendation : 'HOLD';
  const signalType = typeof prediction?.signalType === 'string' ? prediction.signalType : 'NEUTRAL';
  const confidence = Number(prediction?.confidence) || 50;
  const score = Number(prediction?.score) || 0;
  const targetPrice = Number(prediction?.targetPrice) || currentPrice;
  const projectedChangePct = Number(prediction?.projectedChangePct) || 0;
  const stopLoss = Number(prediction?.stopLoss) || currentPrice;
  const riskRewardRatio = Number(prediction?.riskRewardRatio) || 1;
  const reasons = Array.isArray(prediction?.reasons) ? prediction.reasons : [];
  const indicators = prediction?.indicators || {};

  // Signal badge styling
  const isBuy = recommendation.includes('BUY');
  const isSell = recommendation.includes('SELL');

  let badgeColor = 'bg-slate-700/50 text-slate-200 border-slate-600';
  let badgeGlow = '';
  let SignalIcon = Minus;

  if (isBuy) {
    badgeColor = 'bg-trade-green/15 text-trade-green border-trade-green/40';
    badgeGlow = 'shadow-lg shadow-trade-green/10';
    SignalIcon = TrendingUp;
  } else if (isSell) {
    badgeColor = 'bg-trade-red/15 text-trade-red border-trade-red/40';
    badgeGlow = 'shadow-lg shadow-trade-red/10';
    SignalIcon = TrendingDown;
  }

  // Safe formatting helpers for indicators
  const rsiVal = indicators.rsi !== undefined && !isNaN(indicators.rsi) ? Number(indicators.rsi).toFixed(1) : '--';
  const macdHist = indicators.macd?.histogram !== undefined && !isNaN(indicators.macd.histogram) ? Number(indicators.macd.histogram).toFixed(2) : '--';
  const stochK = indicators.stochastic?.k !== undefined && !isNaN(indicators.stochastic.k) ? Number(indicators.stochastic.k).toFixed(1) : '--';
  const atrVal = indicators.atr !== undefined && !isNaN(indicators.atr) ? formatPrice(indicators.atr) : '--';

  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-lg flex flex-col">
      {/* Card Header & Timeframe Selector */}
      <div className="px-4 py-3 bg-dark-850/80 border-b border-dark-750 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-trade-cyan" />
          <h2 className="text-xs font-mono font-bold text-white tracking-wider">
            AI PREDICTION ENGINE // {symbol}
          </h2>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex items-center bg-dark-950 p-0.5 rounded-lg border border-dark-750 text-[11px] font-mono">
          {['15m', '1h', '4h', '1d'].map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`btn-3d px-2.5 py-1 rounded transition-colors ${
                activeInterval === tf
                  ? 'bg-trade-cyan text-dark-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {/* Top: Signal Banner & Confidence Gauge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Signal Badge */}
          <div className={`card-3d ${isBuy ? 'card-3d-green' : isSell ? 'card-3d-red' : ''} p-4 rounded-xl border flex flex-col justify-between ${badgeColor} ${badgeGlow}`}>
            <span className="text-[10px] font-mono tracking-wider opacity-80 uppercase block">
              ALGORITHMIC SUGGESTION
            </span>
            <div className="flex items-center gap-2 my-1">
              <SignalIcon className="w-6 h-6 shrink-0" />
              <span className="text-xl font-mono font-extrabold tracking-wide">
                {recommendation}
              </span>
            </div>
            <div className="text-[11px] font-mono opacity-90">
              Quant Score: <span className="font-bold">{score > 0 ? `+${score}` : score} / 100</span>
            </div>
          </div>

          {/* Confidence Meter */}
          <div className="card-3d glass-card p-4 rounded-xl border border-dark-700 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>INDICATOR CONSENSUS</span>
              <span className="text-trade-cyan font-bold">{confidence}%</span>
            </div>
            <div className="w-full bg-dark-950 rounded-full h-3 border border-dark-700 overflow-hidden my-2">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isBuy ? 'bg-trade-green' : isSell ? 'bg-trade-red' : 'bg-trade-cyan'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-300">
              {confidence >= 75 ? 'Strong Signal Agreement' : 'Moderate Market Ambiguity'}
            </span>
          </div>
        </div>

        {/* Middle: Price Forecast Targets & Risk/Reward */}
        <div className="grid grid-cols-3 gap-2 bg-dark-850 p-3 rounded-xl border border-dark-750 font-mono text-center">
          <div>
            <span className="text-[10px] text-slate-400 block">CURRENT</span>
            <span className="text-xs sm:text-sm font-bold text-white">
              {formatPrice(currentPrice)}
            </span>
          </div>
          <div className="border-x border-dark-750 px-2">
            <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
              <Target className="w-3 h-3 text-trade-cyan" />
              TARGET
            </span>
            <span className={`text-xs sm:text-sm font-bold ${projectedChangePct >= 0 ? 'text-trade-green' : 'text-trade-red'}`}>
              {formatPrice(targetPrice)}
            </span>
            <span className="text-[10px] text-slate-400 block">
              {formatPercent(projectedChangePct)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              STOP LOSS
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-300">
              {formatPrice(stopLoss)}
            </span>
            <span className="text-[10px] text-slate-400 block">
              R/R: {riskRewardRatio}
            </span>
          </div>
        </div>

        {/* Indicators Matrix */}
        <div>
          <span className="text-[10px] font-mono text-slate-400 block mb-2 font-semibold">
            KEY TECHNICAL METRICS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            <div className="bg-dark-850 border border-dark-750 p-2 rounded-lg">
              <div className="text-[10px] text-slate-400">RSI (14)</div>
              <div className={`font-bold ${rsiVal !== '--' && Number(rsiVal) < 35 ? 'text-trade-green' : rsiVal !== '--' && Number(rsiVal) > 65 ? 'text-trade-red' : 'text-slate-200'}`}>
                {rsiVal}
              </div>
            </div>
            <div className="bg-dark-850 border border-dark-750 p-2 rounded-lg">
              <div className="text-[10px] text-slate-400">MACD HIST</div>
              <div className={`font-bold ${macdHist !== '--' && Number(macdHist) >= 0 ? 'text-trade-green' : 'text-trade-red'}`}>
                {macdHist}
              </div>
            </div>
            <div className="bg-dark-850 border border-dark-750 p-2 rounded-lg">
              <div className="text-[10px] text-slate-400">STOCH %K</div>
              <div className="font-bold text-slate-200">
                {stochK}
              </div>
            </div>
            <div className="bg-dark-850 border border-dark-750 p-2 rounded-lg">
              <div className="text-[10px] text-slate-400">ATR VOLATILITY</div>
              <div className="font-bold text-slate-200">
                {atrVal}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Natural Language Reasoning */}
        <div className="bg-dark-850 border border-dark-750 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 font-semibold block mb-1.5 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-trade-cyan" />
            QUANT REASONING & EVIDENCE
          </span>
          <ul className="space-y-1.5">
            {reasons.length > 0 ? (
              reasons.map((reason, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-trade-cyan font-mono mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-slate-400">Analyzing candle indicators for {symbol}...</li>
            )}
          </ul>
        </div>

        {/* Action Button: Auto-Fill Trade Execution */}
        {onApplySignalToOrder && (
          <button
            onClick={() => onApplySignalToOrder({
              side: isBuy ? 'BUY' : isSell ? 'SELL' : 'BUY',
              price: targetPrice,
              stopLoss
            })}
            className="w-full py-2.5 px-4 rounded-xl bg-dark-750 hover:bg-dark-700 border border-dark-600 text-xs font-mono font-semibold text-slate-100 flex items-center justify-center gap-2 transition-colors"
          >
            <span>Auto-fill Trade Console with Signal</span>
            <ArrowRight className="w-4 h-4 text-trade-cyan" />
          </button>
        )}
      </div>
    </div>
  );
}
