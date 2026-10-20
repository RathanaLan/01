import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Wallet, 
  History, 
  ShieldAlert, 
  Sliders,
  Terminal,
  Zap,
  Lock,
  Bot
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenSettings, accountStatus }) {
  const navItems = [
    { id: 'dashboard', label: 'Terminal', icon: Terminal, desc: 'Live Trading & AI Signals' },
    { id: 'autotrade', label: 'Auto Trading Bot', icon: Bot, desc: 'Spot/Futures Auto Session' },
    { id: 'signals', label: 'Predictions', icon: Activity, desc: 'Multi-Indicator Screener' },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet, desc: 'Balances & Asset Breakdown' },
    { id: 'orders', label: 'Order History', icon: History, desc: 'Open Orders & Trades' },
    { id: 'settings', label: 'Security & Keys', icon: Sliders, desc: 'Binance API Credentials' },
  ];

  return (
    <aside className="w-16 md:w-64 bg-dark-900 border-r border-dark-750 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center gap-3 border-b border-dark-750">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-trade-green to-trade-cyan flex items-center justify-center shadow-lg shadow-trade-cyan/15 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer animate-pulseGlowCyan">
            <Zap className="w-5 h-5 text-dark-950 font-bold" />
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-sm text-white">NEXUS</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-trade-green/10 text-trade-green border border-trade-green/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">BINANCE QUANT ENGINE</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-2 md:p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'settings') {
                    onOpenSettings();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`btn-3d w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
                  isActive
                    ? 'bg-dark-750 text-white border-l-2 border-trade-cyan font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-trade-cyan' : 'text-slate-400'}`} />
                <div className="hidden md:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs block font-medium">{item.label}</span>
                    {item.id === 'autotrade' && (
                      <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-gradient-to-r from-trade-cyan to-trade-green text-dark-950">
                        NEW
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Safety & Protocol Footer */}
      <div className="p-3 border-t border-dark-750">
        <div className="hidden md:block bg-dark-850 border border-dark-700/80 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-xs text-trade-green font-mono font-medium mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>SAFETY PROTOCOL</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Spot execution only. Withdrawals are disabled & blocked at the protocol level.
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-trade-green animate-ping" />
            <span className="hidden md:inline">SYSTEM ONLINE</span>
          </div>
          <span className="hidden md:inline text-slate-400">v1.2.0</span>
        </div>
      </div>
    </aside>
  );
}

