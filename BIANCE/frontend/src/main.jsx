import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Fatal Application Crash:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-950 text-white p-8 font-mono flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full bg-dark-900 border border-trade-red/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-trade-red">
              <div className="w-8 h-8 rounded-lg bg-trade-red/15 border border-trade-red/30 flex items-center justify-center font-bold">
                ✕
              </div>
              <div>
                <h1 className="text-base font-bold">Terminal Interface Recovered</h1>
                <p className="text-xs text-slate-400">An unexpected component error occurred</p>
              </div>
            </div>

            <div className="p-3 bg-dark-950 rounded-xl border border-dark-750 text-xs text-trade-cyan overflow-x-auto">
              <div className="font-bold text-white mb-1">Error Details:</div>
              <div>{this.state.error?.toString()}</div>
              {this.state.error?.stack && (
                <pre className="text-[10px] text-slate-500 mt-2 whitespace-pre-wrap">
                  {this.state.error.stack.split('\n').slice(0, 5).join('\n')}
                </pre>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-750 border border-dark-700 text-slate-300 rounded-xl text-xs transition-colors"
              >
                Reset Session & Cache
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="px-5 py-2 bg-trade-cyan hover:bg-cyan-400 text-dark-950 font-bold rounded-xl text-xs transition-colors"
              >
                Reload Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalErrorBoundary>
    <App />
  </GlobalErrorBoundary>
);
