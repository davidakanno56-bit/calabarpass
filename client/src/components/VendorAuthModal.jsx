import React, { useState } from "react";
import { 
  LockKeyhole, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  KeyRound, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowRight 
} from "lucide-react";

import { getStoredVendors } from "../utils/api.js";

// Authorized vendor access codes:
// Master clearinghouse code, official tourism bureau code, and terminal check-in demo PINs
const VALID_ACCESS_CODES = [
  "CALABAR2026",
  "3652026",
  "CALABARPASS",
  "CP2026",
  "849201",
  "712490",
  "418205",
  "894213",
  "512903"
];

export default function VendorAuthModal({ isOpen, onClose, onSuccess, onOpenOnboarding }) {
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError("");

    const cleaned = accessCode.trim().toUpperCase();
    if (!cleaned) {
      setError("Please enter your 6-digit or clearinghouse Vendor Access Code.");
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      const stored = getStoredVendors();
      const matchedVendor = stored.find(
        (v) => (v.accessCode || "").toUpperCase() === cleaned
      );
      const isValidCodeFormat = /^CAL-(HTL|ECO|EAT|TRD|CUL|VND)-\d{4}$/i.test(cleaned);

      if (VALID_ACCESS_CODES.includes(cleaned) || matchedVendor || isValidCodeFormat) {
        setIsSuccess(true);
        setIsVerifying(false);

        // Store session authentication
        if (typeof window !== "undefined") {
          sessionStorage.setItem("calabarpass_vendor_auth", "true");
          sessionStorage.setItem("calabarpass_vendor_auth_time", Date.now().toString());
          if (matchedVendor) {
            sessionStorage.setItem("calabarpass_active_merchant_id", matchedVendor.id);
          }
          const isMaster = ["CALABAR2026", "3652026", "CALABARPASS", "CP2026"].includes(cleaned);
          if (isMaster) {
            sessionStorage.setItem("calabarpass_is_operator", "true");
            sessionStorage.setItem("calabarpass_operator_code", cleaned);
          } else {
            sessionStorage.removeItem("calabarpass_is_operator");
            sessionStorage.removeItem("calabarpass_operator_code");
          }
        }

        setTimeout(() => {
          onSuccess?.(matchedVendor);
        }, 600);
      } else {
        setIsVerifying(false);
        setError("Invalid Vendor Access Code. General public visitors cannot access private merchant ledgers or settlement accounts.");
      }
    }, 450);
  };

  const handleQuickDemoFill = (code = "CALABAR2026") => {
    setAccessCode(code);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#0f1523] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vendor-auth-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-stateCyan/20 border border-stateCyan/30 flex items-center justify-center text-stateCyan">
            <LockKeyhole className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-stateCyan">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cross River Tourism Clearinghouse</span>
            </div>
            <p className="text-xs text-slate-400">Secure Merchant Terminal Gateway</p>
          </div>
        </div>

        {/* Title & Explanatory Text */}
        <h2 id="vendor-auth-title" className="text-xl sm:text-2xl font-bold font-heading text-white">
          Vendor Access Verification
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          This portal contains private merchant accounts, guest booking records, and live bank settlement ledgers. Enter your operator access code to open the terminal.
        </p>

        {/* Quick Demo Hint */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-stateCyan shrink-0" />
            <span className="text-[11px]">
              Demo Terminal Code: <strong className="font-mono text-stateCyan tracking-wider">CALABAR2026</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleQuickDemoFill("CALABAR2026")}
            className="px-2.5 py-1 rounded-lg bg-stateCyan/20 hover:bg-stateCyan/30 text-stateCyan font-bold text-[10px] uppercase tracking-wider transition border border-stateCyan/30 cursor-pointer"
          >
            Auto-Fill
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Merchant Operator Access Code
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter access code or PIN..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 font-mono tracking-widest text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
                title={showPassword ? "Hide Code" : "Show Code"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Authentication approved. Opening terminal...</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isVerifying || isSuccess}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-stateCyan/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Code...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Access Granted</span>
                </>
              ) : (
                <>
                  <Building2 className="w-4 h-4" />
                  <span>Access Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold transition border border-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Self-Onboarding Link */}
        {onOpenOnboarding && (
          <div className="mt-4 pt-3.5 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                onClose?.();
                onOpenOnboarding?.();
              }}
              className="text-xs text-stateCyan hover:text-sky-300 font-bold inline-flex items-center gap-1.5 cursor-pointer transition py-1 px-3 rounded-lg hover:bg-stateCyan/10"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>New Merchant? Register Terminal & Get Access Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Protection Note */}
        <p className="mt-4 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Cross River State Anti-Extortion & Secure Multi-Tenant Escrow Architecture</span>
        </p>
      </div>
    </div>
  );
}
