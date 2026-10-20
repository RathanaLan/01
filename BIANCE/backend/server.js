import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import accountRoutes from './src/routes/accountRoutes.js';
import marketRoutes from './src/routes/marketRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import analysisRoutes from './src/routes/analysisRoutes.js';
import botRoutes from './src/routes/botRoutes.js';
import { binanceConfig } from './src/config/binanceConfig.js';

dotenv.config();

// Enforce IPv4 first and secure public DNS resolvers (1.1.1.1, 8.8.8.8) to prevent ISP DNS filtering
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['1.1.1.1', '8.8.8.8', '1.0.0.1', '8.8.4.4']);
} catch (e) {
  console.warn('[Server] DNS setup warning:', e.message);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server (usually localhost:5173) and any local origins
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-binance-api-key',
      'x-binance-api-secret',
      'x-binance-testnet'
    ]
  })
);

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/account', accountRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/bot', botRoutes);

// Root / Health endpoint
app.get('/api/health', (req, res) => {
  const config = binanceConfig.getConfig(req);
  res.json({
    status: 'ONLINE',
    service: 'Binance Trading Dashboard Backend',
    timestamp: new Date().toISOString(),
    network: config.useTestnet ? 'Binance Spot Testnet' : 'Binance Production',
    keysConfigured: config.isConfigured
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  const config = binanceConfig.getConfig();
  console.log('====================================================');
  console.log(`🚀 Binance Trading Engine running on port ${PORT}`);
  console.log(`📡 Base Mode: ${config.useTestnet ? 'TESTNET (Safety Mode)' : 'LIVE PRODUCTION'}`);
  console.log(`🔗 API Base: ${config.baseUrl}`);
  console.log(`🔑 Initial Keys Configured: ${config.isConfigured ? 'YES' : 'NO (Provide via UI or .env)'}`);
  console.log('🔒 SECURITY NOTICE: Withdrawals MUST be disabled on all API keys!');
  console.log('====================================================');
});

