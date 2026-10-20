import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { 
  getStoredCredentials, 
  saveStoredCredentials, 
  clearStoredCredentials, 
  syncBackendConfig, 
  getAccountStatus 
} from '../services/api';

export default function SettingsModal({ isOpen, onClose, onSaved }) {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [useTestnet, setUseTestnet] = useState(true);
  const [showSecret, setShowSecret] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [copiedIp, setCopiedIp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const creds = getStoredCredentials();
      setApiKey(creds.apiKey);
      setApiSecret(creds.apiSecret);
      setUseTestnet(creds.useTestnet);
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestAndSave = async (e) => {
    e.preventDefault();
    setTesting(true);
    setStatusMessage(null);

    const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
    const cleanSecret = apiSecret.trim().replace(/^["']|["']$/g, '');

    try {
      // 1. Save to local browser session storage
      saveStoredCredentials({ apiKey: cleanKey, apiSecret: cleanSecret, useTestnet });

      // 2. Synchronize to backend memory
      await syncBackendConfig({ apiKey: cleanKey, apiSecret: cleanSecret, useTestnet });

      // 3. Test verification by attempting account ping
      const check = await getAccountStatus();

      if (check.configured && check.connected) {
        setStatusMessage({
          type: 'success',
          text: `Success! Connected to Binance ${useTestnet ? 'Spot Testnet' : 'Live Production'}. Permissions: Spot Trading Active, Withdrawals Blocked.`
        });
        if (onSaved) onSaved();
      } else if (check.configured && !check.connected) {
        const is2015 = check.binanceCode === -2015 || (check.error && check.error.includes('-2015'));
        setStatusMessage({
          type: 'error',
          is2015,
          binanceCode: check.binanceCode || -2015,
          publicIp: check.publicIp,
          keyLength: check.keyLength || cleanKey.length,
          secretLength: check.secretLength || cleanSecret.length,
          text: check.error || 'Authentication error from Binance.'
        });
      } else {
        setStatusMessage({
          type: 'info',
          text: 'Keys updated. Ready for public market data.'
        });
        if (onSaved) onSaved();
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Verification failed. Please verify your keys.'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleClear = () => {
    clearStoredCredentials();
    setApiKey('');
    setApiSecret('');
    syncBackendConfig({ apiKey: '', apiSecret: '', useTestnet });
    setStatusMessage({
      type: 'info',
      text: 'Stored API credentials cleared. Terminal reverted to public view.'
    });
    if (onSaved) onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-dark-900 border border-dark-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="px-6 py-4 bg-dark-850 border-b border-dark-750 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-dark-800 border border-dark-700 text-trade-cyan">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wider">
                BINANCE API CONFIGURATION
              </h2>
              <span className="text-[10px] text-slate-400">
                SECURE CREDENTIAL MANAGEMENT
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleTestAndSave} className="p-6 space-y-5">
          {/* CRITICAL SECURITY CHECKLIST */}
          <div className="bg-dark-950 border border-amber-500/30 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>MANDATORY SECURITY PROTOCOLS</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-trade-green font-bold">✓</span>
                <span>
                  <strong>Permissions:</strong> Only enable <em>"Enable Reading"</em> and <em>"Enable Spot & Margin Trading"</em> in Binance API Management.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-trade-red font-bold">✕</span>
                <span>
                  <strong>STRICTLY FORBIDDEN:</strong> Never enable <em>"Enable Withdrawals"</em>. This dashboard operates on spot markets only and has zero need for withdrawal permissions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-trade-cyan font-bold">ℹ</span>
                <span>
                  <strong>Storage:</strong> Credentials are sent to the backend proxy via encrypted session headers and never stored on public disks. You can also specify them in <code className="text-trade-cyan bg-dark-850 px-1 py-0.5 rounded">backend/.env</code>.
                </span>
              </li>
            </ul>
          </div>

          {/* Network Switch: Live vs Testnet */}
          <div>
            <label className="text-xs text-slate-300 block mb-2 font-semibold">
              TARGET ENVIRONMENT
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUseTestnet(true)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  useTestnet
                    ? 'bg-amber-500/10 border-amber-500/50 text-white'
                    : 'bg-dark-950 border-dark-750 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-amber-400 mb-0.5">
                  SPOT TESTNET (RECOMMENDED)
                </div>
                <div className="text-[10px] text-slate-400">
                  Paper trading with zero risk (testnet.binance.vision)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUseTestnet(false)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  !useTestnet
                    ? 'bg-trade-green/10 border-trade-green/50 text-white'
                    : 'bg-dark-950 border-dark-750 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-trade-green mb-0.5">
                  LIVE PRODUCTION
                </div>
                <div className="text-[10px] text-slate-400">
                  Real Binance spot trading with live capital
                </div>
              </button>
            </div>

            {/* Environment specific note */}
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
              {useTestnet ? (
                <span className="flex items-center gap-1.5 text-amber-400/90">
                  <span>Target: Binance Testnet</span>
                  <span>•</span>
                  <a
                    href="https://testnet.binance.vision"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-trade-cyan hover:underline"
                  >
                    Generate Testnet Keys <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-trade-green/90">
                  <span>Target: Binance.com Production</span>
                  <span>•</span>
                  <a
                    href="https://www.binance.com/en/my/settings/api-management"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-trade-cyan hover:underline"
                  >
                    Binance API Management <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
              )}
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs text-slate-300 font-semibold">
              <label>API KEY</label>
              <span className="text-[10px] text-slate-400 font-normal">Public Identifier</span>
            </div>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="e.g. vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIHtN344Mm9QduGNDT"
              className="w-full bg-dark-950 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-trade-cyan font-mono"
            />
          </div>

          {/* API Secret Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs text-slate-300 font-semibold">
              <label>API SECRET</label>
              <span className="text-[10px] text-slate-400 font-normal">HMAC Signature Key</span>
            </div>
            <div className="relative">
              <input
                type={showSecret ? 'text' : 'password'}
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="e.g. 15a452ef89c3d4e78f... (Stored securely in session)"
                className="w-full bg-dark-950 border border-dark-700 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-trade-cyan font-mono"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Status & Diagnostic Message */}
          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-xs space-y-3 ${
                statusMessage.type === 'success'
                  ? 'bg-trade-green/10 text-trade-green border border-trade-green/30'
                  : 'bg-dark-950 text-slate-200 border border-trade-red/40'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-trade-green shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-trade-red shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-bold text-xs text-white mb-0.5">
                    {statusMessage.type === 'success'
                      ? 'Connection Verified'
                      : statusMessage.is2015
                      ? 'Binance Key Verification Failed (Code -2015)'
                      : 'Verification Error'}
                  </div>
                  <div className="text-slate-300 leading-relaxed text-[11px]">{statusMessage.text}</div>
                </div>
              </div>

              {statusMessage.type === 'error' && (
                <div className="pt-2 border-t border-dark-800 space-y-2.5 text-[11px]">
                  {/* Public IP Display */}
                  {statusMessage.publicIp && (
                    <div className="bg-dark-900 border border-dark-750 rounded-lg p-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold">YOUR OUTBOUND IP ADDRESS</span>
                        <span className="font-mono text-trade-cyan font-bold text-xs">{statusMessage.publicIp}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(statusMessage.publicIp);
                          setCopiedIp(true);
                          setTimeout(() => setCopiedIp(false), 2000);
                        }}
                        className="px-2.5 py-1 bg-dark-800 hover:bg-dark-750 text-slate-300 border border-dark-700 rounded-md flex items-center gap-1.5 transition-colors text-[10px]"
                      >
                        {copiedIp ? <Check className="w-3 h-3 text-trade-green" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIp ? 'Copied!' : 'Copy IP'}</span>
                      </button>
                    </div>
                  )}

                  {/* Specific Actionable Guidance */}
                  <div className="bg-dark-900 border border-dark-750 rounded-lg p-3 space-y-2 text-slate-300">
                    <div className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>How to fix Binance Code -2015:</span>
                    </div>
                    <ul className="space-y-1.5 list-disc pl-4 text-[11px] text-slate-300 leading-relaxed">
                      <li>
                        <strong>IP Whitelist (Most Common):</strong> In your{' '}
                        <a
                          href="https://www.binance.com/en/my/settings/api-management"
                          target="_blank"
                          rel="noreferrer"
                          className="text-trade-cyan underline"
                        >
                          Binance API Settings
                        </a>
                        , look at <em>"IP Access Restriction"</em>. If set to <em>"Restrict access to trusted IPs only"</em>, add your IP{' '}
                        <code className="text-trade-cyan bg-dark-850 px-1 py-0.5 rounded">{statusMessage.publicIp}</code>, or switch to <em>"Unrestricted (Less Secure)"</em>.
                      </li>
                      <li>
                        <strong>Key Length:</strong> Your API Key length is <strong>{statusMessage.keyLength}</strong> (expected: 64), Secret length is <strong>{statusMessage.secretLength}</strong> (expected: 64). Ensure neither has extra quotes or missing characters.
                      </li>
                      <li>
                        <strong>Permissions:</strong> In Binance API settings, ensure <em>"Enable Reading"</em> and <em>"Enable Spot & Margin Trading"</em> are active. Withdrawals must remain disabled.
                      </li>
                      <li>
                        <strong>Environment:</strong> If your keys are from{' '}
                        <a href="https://testnet.binance.vision" target="_blank" rel="noreferrer" className="text-trade-cyan underline">
                          testnet.binance.vision
                        </a>
                        , click <strong>SPOT TESTNET</strong> above. If they are from <strong>binance.com</strong>, click <strong>LIVE PRODUCTION</strong> above.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-dark-750">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-trade-red transition-colors"
            >
              Clear Keys
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-750 text-slate-300 rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={testing}
                className="px-5 py-2 bg-trade-green hover:bg-trade-greenDark text-dark-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-trade-green/20 transition-all disabled:opacity-60"
              >
                {testing && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{testing ? 'Verifying with Binance...' : 'Test & Save Connection'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

