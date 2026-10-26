# 🚀 NEXUS CRYPTO // Binance Algorithmic Trading Terminal

A full-stack financial trading dashboard and quantitative analysis terminal integrated with the **Binance REST API**. Features live candlestick charts, a multi-indicator price prediction engine, automated buy/sell signals with confidence scoring, real-time order book depth, portfolio auditing, and spot order execution.

---

## ⚡ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, TradingView Advanced Widget |
| **Backend** | Node.js (Express), Axios, Crypto (HMAC-SHA256), Dotenv, CORS |
| **Data & Exchange** | Binance Spot REST API (v3) & Binance Spot Testnet |
| **Quantitative Engine** | Multi-factor TA model (RSI-14, MACD, EMA-9/21/50, Bollinger Bands, Stochastic, ATR, Linear Regression) |

---

## 🔒 Critical Security & Safety Protocols (MUST READ)

> [!CAUTION]
> **WITHDRAWALS MUST BE STRICTLY DISABLED AT ALL TIMES**
> When creating your Binance API key in Binance API Management:
> 1. ✅ **Enable Reading** (Mandatory)
> 2. ✅ **Enable Spot & Margin Trading** (Optional, only needed if placing orders)
> 3. ❌ **Enable Withdrawals** — **NEVER ENABLE THIS!** The dashboard strictly rejects and does not support withdrawal operations.

### API Key Storage Options:
1. **Frontend Session Storage (Recommended for Multi-User / Testing):**
   - Click the **API Keys** button in the dashboard navigation bar.
   - Enter your API Key and Secret.
   - Keys are stored in your browser session and sent to the backend proxy via encrypted headers (`x-binance-api-key`, `x-binance-api-secret`).
   - You can clear your keys at any time with one click.
2. **Backend `.env` File (Recommended for Local Dev):**
   - Create `backend/.env` based on `backend/.env.example`:
     ```env
     PORT=5000
     BINANCE_API_KEY=your_api_key_here
     BINANCE_API_SECRET=your_api_secret_here
     USE_TESTNET=true
     ```
   - **Never commit `.env` to Git repositories.**

---

## 📁 Project Structure

```text
BIANCE/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── binanceConfig.js      # Configuration state & base URL routing
│   │   ├── routes/
│   │   │   ├── accountRoutes.js      # Account balances, status, permissions
│   │   │   ├── analysisRoutes.js     # Prediction engine & market screener
│   │   │   ├── marketRoutes.js       # 24hr tickers, klines, orderbook depth
│   │   │   └── orderRoutes.js        # Limit & Market order execution
│   │   └── services/
│   │       ├── binanceClient.js      # Signed HMAC-SHA256 Binance client
│   │       └── predictionEngine.js   # Multi-factor quantitative scoring engine
│   ├── .env.example                  # Environment variable template
│   ├── package.json
│   └── server.js                     # Express API entrypoint
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MarketScanner.jsx     # Multi-asset quantitative signal matrix
│   │   │   ├── Navbar.jsx            # Top ticker tape & connection status
│   │   │   ├── OpenOrdersTable.jsx   # Active open orders with cancel button
│   │   │   ├── OrderBook.jsx         # Real-time L2 orderbook bids & asks
│   │   │   ├── PortfolioSummary.jsx  # Wallet balances & security audit
│   │   │   ├── PredictionPanel.jsx   # AI signal gauge, target price, reasoning
│   │   │   ├── SettingsModal.jsx     # Secure API key dialog & safety checklist
│   │   │   ├── Sidebar.jsx           # Bloomberg-style dark navigation sidebar
│   │   │   ├── TradeExecution.jsx    # Limit & Market Buy/Sell order console
│   │   │   ├── TradeHistoryTable.jsx # Past filled trades log
│   │   │   └── TradingChart.jsx      # TradingView live candlestick feed
│   │   ├── services/
│   │   │   └── api.js                # Centralized API service with header injection
│   │   ├── utils/
│   │   │   └── formatters.js         # Currency, percentage, and time formatting
│   │   ├── App.jsx                   # Main terminal controller
│   │   ├── index.css                 # Dark financial styling & custom scrollbars
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── package.json                      # Workspace runner scripts
└── README.md
```

---

## 🚀 Step-by-Step Setup Instructions

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v26)
- **npm** v9+

### 2. Quick Start

Open **two terminal windows** (or tabs):

#### Terminal 1 — Start the Backend Server:
```powershell
cd backend
npm start
```
*The backend starts at `http://localhost:5000`.*

#### Terminal 2 — Start the Frontend Terminal:
```powershell
cd frontend
npm run dev
```
*The frontend starts at `http://localhost:5173`.*

Open your browser to: **`http://localhost:5173`**

---

## 🧠 How the Price Prediction Engine Works

The prediction engine (`backend/src/services/predictionEngine.js`) is an algorithmic, multi-factor quantitative model that processes the last 100 historical candles (Klines) from Binance:

### 1. Indicators Evaluated
1. **Relative Strength Index (RSI 14):**
   - `< 30`: Oversold territory (+25 Bullish Score, expecting mean-reverting bounce)
   - `> 70`: Overbought territory (-25 Bearish Score, high risk of exhaustion)
2. **MACD (12, 26, 9):**
   - Bullish Crossover (MACD crosses above Signal line): +30 Score
   - Bearish Crossover (MACD crosses below Signal line): -30 Score
   - Expanding histogram: tracks momentum acceleration
3. **Stacked Exponential Moving Averages (EMA 9, 21, 50):**
   - `Price > EMA 9 > EMA 21`: Confirms upward short-term trend (+20 Score)
   - `Price < EMA 9 < EMA 21`: Confirms downward trend (-20 Score)
4. **Bollinger Bands (20, 2 std dev):**
   - Price <= Lower Band: Mean reversion long setup (+20 Score)
   - Price >= Upper Band: Overextended short setup (-20 Score)
5. **Stochastic Oscillator (%K, %D):**
   - %K crosses above %D in the sub-20 region: Bullish oversold trigger (+15 Score)
   - %K crosses below %D in the 80+ region: Bearish overbought trigger (-15 Score)
6. **Linear Regression Trend Forecast:**
   - Fits an Ordinary Least Squares (OLS) line on recent closes to measure the bar-by-bar slope percentage.
7. **Average True Range (ATR 14):**
   - Measures true volatility in dollar terms.
   - Used to formulate **dynamic Risk-Reward targets**:
     - Long Target: `Current Price + (2.2 * ATR)`
     - Long Stop Loss: `Current Price - (1.2 * ATR)`

### 2. Recommendation Logic
The composite score spans from **-100 to +100**:
- **`STRONG BUY`**: Score $\ge +40$
- **`BUY`**: $+15 \le \text{Score} < +40$
- **`HOLD / NEUTRAL`**: $-15 < \text{Score} < +15$
- **`SELL`**: $-40 < \text{Score} \le -15$
- **`STRONG SELL`**: Score $\le -40$

**Confidence Percentage:** Calculated by the degree of consensus among independent indicators (e.g., if RSI, MACD, EMAs, and Bollinger Bands all point in the same direction, confidence reaches 85–95%).

---

## 🧪 Paper Trading with Binance Testnet

To practice risk-free without using real cryptocurrency:
1. Visit the [Binance Spot Testnet](https://testnet.binance.vision).
2. Log in with GitHub to generate a Testnet **API Key** and **Secret Key**.
3. Open the **API Keys** settings dialog in the dashboard.
4. Select **SPOT TESTNET (RECOMMENDED)**.
5. Paste your Testnet credentials and click **Test & Save Connection**.
6. The terminal will immediately fetch your virtual test balances (e.g. 10,000 USDT) and allow you to test live order routing safely!

---

## 📜 License
MIT License. Built for algorithmic cryptocurrency traders and financial software engineers.

