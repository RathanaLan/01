import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TradingChart from './components/TradingChart';
import PredictionPanel from './components/PredictionPanel';
import TradeExecution from './components/TradeExecution';
import OrderBook from './components/OrderBook';
import PortfolioSummary from './components/PortfolioSummary';
import OpenOrdersTable from './components/OpenOrdersTable';
import TradeHistoryTable from './components/TradeHistoryTable';
import MarketScanner from './components/MarketScanner';
import AutoTradingDashboard from './components/AutoTradingDashboard';
import SettingsModal from './components/SettingsModal';
import CoinSelectorModal from './components/CoinSelectorModal';
import { connectBinanceTicker, connectBinanceDepth } from './services/binanceSocket';

import { 
  getAccountStatus, 
  getAccountInfo, 
  getAllWallets,
  getMarketTickers, 
  getPrediction, 
  getOrderBook,
  getOpenOrders,
  getMyTrades,
  getMarketSignals,
  getAvailableSymbols,
  getAllTickers
} from './services/api';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-dark-900 border border-trade-red/40 rounded-xl text-center space-y-4 font-mono">
          <div className="w-12 h-12 rounded-full bg-trade-red/10 border border-trade-red/30 flex items-center justify-center text-trade-red font-bold text-lg">
            !
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Dashboard Refresh Required</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md break-all">
              {this.state.error?.message || 'A visual render error was safely caught.'}
            </p>
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 bg-trade-cyan text-dark-950 font-bold rounded-lg text-xs"
          >
            Reload Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [activeInterval, setActiveInterval] = useState('1h');
  const [marketType, setMarketType] = useState('SPOT'); // 'SPOT' | 'FUTURES'
  
  // Data states
  const [tickers, setTickers] = useState([]);
  const [livePrice, setLivePrice] = useState(null);
  const [allTickers, setAllTickers] = useState([]);
  const [allAvailableSymbols, setAllAvailableSymbols] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [accountStatus, setAccountStatus] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [allWalletsData, setAllWalletsData] = useState(null);
  const [openOrders, setOpenOrders] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [marketSignals, setMarketSignals] = useState([]);

  // UI / Interactive states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCoinSelectorOpen, setIsCoinSelectorOpen] = useState(false);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [loadingCoins, setLoadingCoins] = useState(false);
  const [prefilledSignal, setPrefilledSignal] = useState(null);

  // 1. Fetch Market Tickers
  const fetchTickers = useCallback(async () => {
    try {
      const res = await getMarketTickers();
      if (res.success && res.data) {
        setTickers(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch tickers:', err.message);
    }
  }, []);

  // 2. Fetch All Available Symbols on Binance (Spot & Futures) & Full Market Tickers
  const fetchAvailableCoins = useCallback(async () => {
    setLoadingCoins(true);
    try {
      const [symbolsRes, allTickersRes] = await Promise.allSettled([
        getAvailableSymbols('ALL', '', 'ALL'),
        getAllTickers('ALL')
      ]);

      if (symbolsRes.status === 'fulfilled' && symbolsRes.value?.success) {
        setAllAvailableSymbols(symbolsRes.value.data || []);
      }
      if (allTickersRes.status === 'fulfilled' && allTickersRes.value?.success) {
        setAllTickers(allTickersRes.value.data || []);
      }
    } catch (err) {
      console.warn('Notice loading all Binance coins:', err.message);
    } finally {
      setLoadingCoins(false);
    }
  }, []);

  const handleSelectSymbol = useCallback((sym, mType = null) => {
    setSelectedSymbol(sym);
    if (mType) {
      setMarketType(mType);
    } else if (sym.startsWith('1000') || sym.includes('_')) {
      setMarketType('FUTURES');
    }
  }, []);

  // 3. Fetch AI Prediction
  const fetchPrediction = useCallback(async (sym = selectedSymbol, interval = activeInterval) => {
    setLoadingPrediction(true);
    try {
      const res = await getPrediction(sym, interval);
      if (res.success) {
        setPrediction(res.data);
      } else {
        setPrediction(null);
      }
    } catch (err) {
      console.warn('Prediction engine notice:', err.message);
      setPrediction(null);
    } finally {
      setLoadingPrediction(false);
    }
  }, [selectedSymbol, activeInterval]);

  // 4. Fetch Order Book
  const fetchOrderBook = useCallback(async (sym = selectedSymbol, mType = marketType) => {
    try {
      const res = await getOrderBook(sym, 12, mType);
      if (res.success) {
        setOrderBook({ bids: res.bids || [], asks: res.asks || [] });
      }
    } catch (err) {
      console.warn('Could not fetch orderbook:', err.message);
    }
  }, [selectedSymbol, marketType]);

  // 5. Fetch Account & Auth status (supports silent background updates)
  const fetchAccount = useCallback(async (isSilent = false) => {
    try {
      const status = await getAccountStatus();
      setAccountStatus(status);

      if (status.configured) {
        if (!isSilent) setLoadingAccount(true);
        try {
          const [accRes, walletsRes, ordRes, tradesRes] = await Promise.allSettled([
            getAccountInfo(),
            getAllWallets(),
            getOpenOrders(),
            getMyTrades(selectedSymbol)
          ]);

          if (accRes.status === 'fulfilled' && accRes.value?.success) {
            setAccountData(accRes.value.data);
          }
          if (walletsRes.status === 'fulfilled' && walletsRes.value?.success) {
            setAllWalletsData(walletsRes.value.data);
          }
          if (ordRes.status === 'fulfilled' && ordRes.value?.success) {
            setOpenOrders(ordRes.value.data || []);
          }
          if (tradesRes.status === 'fulfilled' && tradesRes.value?.success) {
            setTradeHistory(tradesRes.value.data || []);
          }
        } catch (innerErr) {
          console.warn('Authenticated account fetch notice:', innerErr.message);
        } finally {
          if (!isSilent) setLoadingAccount(false);
        }
      }
    } catch (err) {
      console.warn('Account status check notice:', err.message);
    }
  }, [selectedSymbol]);

  // 6. Fetch Multi-Pair Market Signals (for Analytics tab)
  const fetchMarketSignals = useCallback(async () => {
    try {
      const res = await getMarketSignals(activeInterval);
      if (res.success && res.signals) {
        setMarketSignals(res.signals);
      }
    } catch (err) {
      console.warn('Market signals notice:', err.message);
    }
  }, [activeInterval]);

  // Initial load: fetch catalog and account
  useEffect(() => {
    fetchTickers();
    fetchAvailableCoins();
    fetchAccount(false);
  }, []);

  // Real-time WebSocket streaming for selectedSymbol (Price ticks & Order book depth)
  useEffect(() => {
    // 1. Initial snapshot of prediction and order book
    fetchPrediction(selectedSymbol, activeInterval);
    fetchOrderBook(selectedSymbol);

    // 2. Real-time Ticker WebSocket (Sub-second price updates)
    const unsubTicker = connectBinanceTicker(selectedSymbol, (tick) => {
      setLivePrice(tick.lastPrice);
      setTickers((prev) => {
        const list = Array.isArray(prev) ? prev : [];
        const idx = list.findIndex((t) => t && t.symbol === tick.symbol);
        if (idx >= 0) {
          const copy = [...list];
          copy[idx] = { ...copy[idx], ...tick };
          return copy;
        }
        return [tick, ...list];
      });
    }, null, marketType);

    // 3. Real-time Order Book Depth WebSocket (1-second depth updates)
    const unsubDepth = connectBinanceDepth(selectedSymbol, (depth) => {
      setOrderBook(depth);
    }, null, marketType);

    if (accountStatus?.configured) {
      getMyTrades(selectedSymbol)
        .then((res) => { if (res.success) setTradeHistory(res.data || []); })
        .catch(() => {});
    }

    return () => {
      unsubTicker();
      unsubDepth();
    };
  }, [selectedSymbol, activeInterval, marketType]);

  // When switching to signals tab
  useEffect(() => {
    if (activeTab === 'signals') {
      fetchMarketSignals();
    }
  }, [activeTab]);

  // Real-time background sync intervals:
  // 1. Order book fallback every 1.5s
  // 2. Account balances & Futures PnL every 3s
  // 3. General market tickers every 4s
  useEffect(() => {
    const fastOrderBookInterval = setInterval(() => {
      fetchOrderBook(selectedSymbol);
    }, 1500);

    const accountSyncInterval = setInterval(() => {
      if (accountStatus?.configured) {
        fetchAccount(true); // Silent update so UI does not flicker
      }
    }, 3000);

    const tickersSyncInterval = setInterval(() => {
      fetchTickers();
    }, 4000);

    return () => {
      clearInterval(fastOrderBookInterval);
      clearInterval(accountSyncInterval);
      clearInterval(tickersSyncInterval);
    };
  }, [selectedSymbol, accountStatus?.configured, fetchOrderBook, fetchAccount, fetchTickers]);

  const handleGlobalRefresh = () => {
    fetchTickers();
    fetchAvailableCoins();
    fetchPrediction(selectedSymbol, activeInterval);
    fetchOrderBook(selectedSymbol);
    fetchAccount();
    if (activeTab === 'signals') fetchMarketSignals();
  };

  const handleApplySignalToOrder = (signalData) => {
    setPrefilledSignal(signalData);
    const elem = document.getElementById('trade-console');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const activeTicker = Array.isArray(tickers) ? tickers.find((t) => t && t.symbol === selectedSymbol) : null;
  const currentPrice = livePrice || (activeTicker ? parseFloat(activeTicker.lastPrice) : (prediction?.currentPrice || 0));

  return (
    <div className="flex h-screen bg-dark-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        accountStatus={accountStatus}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar & Ticker Header */}
        <Navbar 
          tickers={tickers}
          selectedSymbol={selectedSymbol}
          onSelectSymbol={handleSelectSymbol}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenCoinSelector={() => setIsCoinSelectorOpen(true)}
          accountStatus={accountStatus}
          accountData={accountData}
          allWalletsData={allWalletsData}
          onOpenPortfolio={() => setActiveTab('portfolio')}
          onRefresh={handleGlobalRefresh}
          totalAvailableCoins={allAvailableSymbols.length}
          marketType={marketType}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-dark-950 relative overflow-x-hidden">
          {/* Ambient 3D Cyber Light Orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-trade-cyan/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute top-60 right-1/4 w-[550px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <ErrorBoundary>
            <div className="max-w-[1720px] mx-auto space-y-6 relative z-10">

              {/* TAB 1: TRADING TERMINAL */}
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-pageFadeIn">
                  {/* Left Section: Live Chart + Orders (7 Cols on XL) */}
                  <div className="xl:col-span-7 space-y-6">
                    {/* Interactive Candlestick & Volume Chart with Sub-Second Live Price Feed */}
                    <TradingChart key={selectedSymbol} symbol={selectedSymbol} livePrice={currentPrice} />

                    {/* Open Orders & Trades */}
                    <div className="grid grid-cols-1 gap-6">
                      <OpenOrdersTable 
                        orders={openOrders} 
                        onRefresh={fetchAccount} 
                      />
                    </div>
                  </div>

                  {/* Right Section: Quantitative Prediction + Trade Execution + Orderbook (5 Cols on XL) */}
                  <div className="xl:col-span-5 space-y-6">
                    {/* AI Prediction & Buy/Sell Suggestion Panel */}
                    <PredictionPanel 
                      prediction={prediction} 
                      loading={loadingPrediction}
                      activeInterval={activeInterval}
                      onTimeframeChange={setActiveInterval}
                      onApplySignalToOrder={handleApplySignalToOrder}
                    />

                    {/* Trade Execution Console */}
                    <div id="trade-console">
                      <TradeExecution 
                        symbol={selectedSymbol}
                        currentPrice={currentPrice}
                        accountBalances={accountData?.balances || []}
                        allWalletsData={allWalletsData}
                        onOrderSuccess={fetchAccount}
                        prefilledSignal={prefilledSignal}
                        marketType={marketType}
                        onMarketTypeChange={setMarketType}
                      />
                    </div>

                    {/* L2 Order Book Depth */}
                    <OrderBook 
                      orderBook={orderBook}
                      symbol={selectedSymbol}
                      onSelectPrice={(p) => setPrefilledSignal({ price: p })}
                    />
                  </div>
                </div>
              )}

              {/* TAB: AUTONOMOUS QUANT BOT TRADING */}
              {activeTab === 'autotrade' && (
                <div className="animate-pageFadeIn">
                  <AutoTradingDashboard 
                    selectedSymbol={selectedSymbol}
                    onSelectSymbol={setSelectedSymbol}
                    accountData={accountData}
                    allWalletsData={allWalletsData}
                    allSymbols={allAvailableSymbols}
                    tickers={allTickers}
                  />
                </div>
              )}

              {/* TAB 2: MULTI-PAIR SIGNALS & SCANNER */}
              {activeTab === 'signals' && (
                <div className="animate-pageFadeIn">
                  <MarketScanner 
                    signals={marketSignals}
                    loading={false}
                    onRefresh={fetchMarketSignals}
                    onSelectPair={(sym) => {
                      setSelectedSymbol(sym);
                      setActiveTab('dashboard');
                    }}
                  />
                </div>
              )}

              {/* TAB 3: PORTFOLIO & AUDIT */}
              {activeTab === 'portfolio' && (
                <div className="animate-pageFadeIn">
                  <PortfolioSummary 
                    accountData={accountData}
                    allWalletsData={allWalletsData}
                    tickers={allTickers.length > 0 ? allTickers : tickers}
                    loading={loadingAccount}
                    onRefresh={fetchAccount}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    accountStatus={accountStatus}
                  />
                </div>
              )}

              {/* TAB 4: ORDERS & EXECUTION LOGS */}
              {activeTab === 'orders' && (
                <div className="space-y-6 animate-pageFadeIn">
                  <OpenOrdersTable 
                    orders={openOrders} 
                    onRefresh={fetchAccount} 
                  />
                  <TradeHistoryTable 
                    trades={tradeHistory}
                  symbol={selectedSymbol}
                  loading={false}
                  onRefresh={fetchAccount}
                />
              </div>
            )}

          </div>
          </ErrorBoundary>
        </main>
      </div>

      {/* All Coins Selector Modal */}
      <CoinSelectorModal 
        isOpen={isCoinSelectorOpen}
        onClose={() => setIsCoinSelectorOpen(false)}
        selectedSymbol={selectedSymbol}
        onSelectSymbol={handleSelectSymbol}
        allSymbols={allAvailableSymbols}
        allTickers={allTickers}
        activeMarketType={marketType}
        loading={loadingCoins}
        onRefresh={fetchAvailableCoins}
      />

      {/* Security & Binance API Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={() => {
          fetchAccount();
          setIsSettingsOpen(false);
        }}
      />
    </div>
  );
}
