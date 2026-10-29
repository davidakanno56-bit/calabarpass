import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  X, 
  MessageSquare, 
  PhoneCall, 
  ExternalLink,
  QrCode,
  Lock,
  ArrowRight
} from "lucide-react";

export default function PinDispatchSimulationModal({ isOpen, onClose, transaction, onViewVoucher }) {
  const [copiedPin, setCopiedPin] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [dispatchStage, setDispatchStage] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setDispatchStage(1);
      const t1 = setTimeout(() => setDispatchStage(2), 700);
      const t2 = setTimeout(() => setDispatchStage(3), 1500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen]);

  if (!isOpen || !transaction) return null;

  const pin = transaction.checkInPin || "849201";
  const reference = transaction.reference || "CP-DEMO-849201";
  const customerName = transaction.customerName || "Valued Tourist";
  const customerPhone = transaction.customerPhone || "+234 803 000 0000";
  const itemName = transaction.packageName || "CalabarPass Verified Reservation";

  const handleCopyPin = () => {
    navigator.clipboard?.writeText(String(pin));
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(String(reference));
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0e1422] border border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-emerald-950/40 text-slate-100 my-auto max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dispatch-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

                {/* Header: State Clearance & Verification Seal with CP Monogram */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-[#070e1a] border border-stateCyan/40 p-2 shadow-lg shadow-cyan-950/50 shrink-0">
            <img 
              src="/assets/calabarpass-monogram.svg" 
              alt="CalabarPass CP Monogram" 
              className="w-full h-full object-contain drop-shadow"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0e1422] flex items-center justify-center text-[8px] text-white font-bold">
              ✓
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-lg sm:text-xl font-bold tracking-tight font-sans text-white">
                Calabar<span className="text-stateCyan font-extrabold">Pass</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Escrow Clearance Active
              </span>
            </div>
            <h2 id="dispatch-modal-title" className="text-lg sm:text-xl font-bold font-heading text-white">
              Instant Check-In PIN Dispatched
            </h2>
          </div>
        </div>

        {/* Automated API Simulation Ticker */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 mb-4 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>1. Paystack Escrow Vault Secured</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">LOCKED</span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-2">
              {dispatchStage >= 2 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0" />
              )}
              <span>2. WhatsApp Cloud API ({customerPhone})</span>
            </span>
            <span className={`text-[10px] font-bold ${dispatchStage >= 2 ? "text-emerald-400" : "text-amber-400"}`}>
              {dispatchStage >= 2 ? "DELIVERED ✓✓" : "SENDING..."}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-2">
              {dispatchStage >= 3 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0" />
              )}
              <span>3. National Telecom SMS Gateway</span>
            </span>
            <span className={`text-[10px] font-bold ${dispatchStage >= 3 ? "text-emerald-400" : "text-amber-400"}`}>
              {dispatchStage >= 3 ? "DISPATCHED ✓" : "QUEUED..."}
            </span>
          </div>
        </div>

        {/* WhatsApp Simulated Live Message Bubble */}
        <div className="rounded-2xl bg-[#0b141a] border border-[#202c33] p-4 relative overflow-hidden mb-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#202c33] pb-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-emerald-500/40 p-1 flex items-center justify-center shrink-0">
                <img 
                  src="/assets/calabarpass-monogram.svg" 
                  alt="CP Monogram" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-[#e9edef] flex items-center gap-1">
                  <span>Cross River State Tourism Bureau</span>
                  <span className="text-[#00a884] text-[10px]">✓</span>
                </div>
                <div className="text-[10px] text-[#8696a0]">WhatsApp Official Business Account</div>
              </div>
            </div>
            <span className="text-[10px] text-[#8696a0]">Just now</span>
          </div>

          {/* Chat Bubble Body */}
          <div className="bg-[#005c4b] p-3 rounded-xl rounded-tl-none text-xs text-[#e9edef] space-y-2 leading-relaxed max-w-sm">
            <p>
              🌴 <strong>Welcome to Cross River State, {customerName}!</strong>
            </p>
            <p>
              Your reservation for <strong>{itemName}</strong> is confirmed and protected by the <strong>CalabarPass 365-Day Escrow Vault</strong>.
            </p>
            
            {/* Highlighted Secret PIN inside WhatsApp */}
            <div className="p-2.5 bg-black/40 rounded-lg border border-emerald-400/30 text-center space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                Your Secret Check-In PIN
              </div>
              <div className="text-2xl font-black font-mono tracking-widest text-white">
                {pin}
              </div>
              <div className="text-[9px] text-slate-300">
                Booking Reference: <span className="font-mono text-amber-300">{reference}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#d1d7db] pt-1 border-t border-emerald-400/20">
              🛡️ <strong>Safety Directive:</strong> Present this 6-digit PIN only upon arrival at your hotel or tour meeting point to authorize vendor fund disbursement.
            </p>
          </div>
        </div>

        {/* Quick PIN Copy Card */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 mb-5">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              6-Digit Physical Check-In PIN
            </div>
            <div className="text-2xl font-black font-mono text-stateCyan tracking-widest mt-0.5">
              {pin}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              {copiedPin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPin ? "Copied PIN!" : "Copy PIN"}</span>
            </button>
            <button
              onClick={handleCopyRef}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
              title="Copy Booking Reference"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? "Copied Ref!" : "Ref"}</span>
            </button>
          </div>
        </div>

        {/* Actions: View Voucher & Finish */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              onClose();
              if (onViewVoucher) {
                onViewVoucher(transaction);
              }
            }}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-stateCyan hover:opacity-95 text-slate-950 font-extrabold text-xs tracking-tight shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition cursor-pointer hover:scale-[1.01] active:scale-95"
          >
            <QrCode className="w-4 h-4 text-slate-950" />
            <span>Open Digital Voucher &amp; QR Code</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

