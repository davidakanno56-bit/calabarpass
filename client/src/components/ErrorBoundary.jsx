import React from "react";
import { AlertTriangle, RefreshCw, Trees } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled rendering error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleClearCacheAndReload = () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        localStorage.removeItem("calabarpass_last_booked_vendor");
        localStorage.removeItem("calabarpass_active_merchant_id");
        localStorage.removeItem("calabarpass_last_booking_ref");
      }
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="my-8 p-6 sm:p-8 max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-stateCyan/15 border border-stateCyan/30 text-stateCyan dark:text-stateCyan flex items-center justify-center mx-auto shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
            {this.props.title || "Unable to Load Section"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            {this.props.message || "A temporary issue prevented this section from displaying. All verified passes and escrow services remain operational."}
          </p>
          {this.state.error?.message && (
            <p className="text-[11px] font-mono text-rose-400/90 bg-rose-950/30 border border-rose-500/20 px-3 py-1.5 rounded-xl max-w-lg mx-auto truncate">
              {this.state.error.message}
            </p>
          )}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stateCyan hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-stateCyan/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Section</span>
            </button>
            <button
              type="button"
              onClick={this.handleClearCacheAndReload}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title="Clears test session storage and reloads fresh"
            >
              <span>Reset Cache & Reload</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

