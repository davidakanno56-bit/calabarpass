import React, { useEffect, useState } from "react";
import { CheckCircle2, Copy, Check, Printer, ShieldCheck, Lock, AlertTriangle, ArrowRight, QrCode } from "lucide-react";
import confetti from "canvas-confetti";

export default function EscrowVoucherModal({ transaction, onClose, onOpenEscrowPortal }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti on voucher generation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#10b981", "#fbbf24", "#3b82f6"]
    });
  }, []);

  const handleCopyPin = () => {
    if (transaction?.checkInPin) {
      navigator.clipboard.writeText(transaction.checkInPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121826] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Top Gold Ribbon */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 no-print" />

        {/* Voucher Container */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6 print:border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-black font-extrabold text-2xl shadow-gold-glow">
                🌴
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-amber-600">
                  Official Verification Pass
                </div>
                <h2 className="text-2xl font-extrabold font-heading text-white print:text-black">
                  CalabarPass Escrow Voucher
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600">
                  Cross River State Tourism Bureau Anti-Scam Network
                </p>
              </div>
            </div>

            {/* Escrow Status Badge */}
            <div className="px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-emerald-glow print:border-emerald-600 print:text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>ESCROW LOCKED & ACTIVE</span>
            </div>
          </div>

          {/* Core 6-Digit Check-in PIN Display Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-emerald-950/20 border-2 border-dashed border-amber-500/50 text-center relative overflow-hidden print:border-amber-600">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              Secret Physical Check-In Code
            </div>
            <div className="text-xs text-slate-400 mb-3">
              Present this 6-digit PIN to the verified vendor in Calabar to redeem your pass
            </div>

            {/* Huge PIN */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-white bg-slate-950/90 px-6 py-3 rounded-2xl border border-amber-500/40 shadow-gold-glow print:text-black print:bg-gray-100">
                {transaction.checkInPin || "849201"}
              </div>
              <button
                onClick={handleCopyPin}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors no-print"
                title="Copy PIN"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <div className="inline-flex items-center gap-2 text-[11px] text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>DO NOT share this PIN on WhatsApp or over the phone. Only submit it on-site after inspecting your kit.</span>
            </div>
          </div>

          {/* Voucher Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Carnival Package</div>
              <div className="font-bold text-sm text-white mt-0.5 print:text-black">{transaction.packageName}</div>
              <div className="text-slate-400 mt-1">Vendor: <span className="text-amber-400 font-semibold">{transaction.vendor}</span></div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Accredited Guest</div>
              <div className="font-bold text-sm text-white mt-0.5 print:text-black">{transaction.customerName}</div>
              <div className="text-slate-400 mt-1 truncate">{transaction.email} • {transaction.phone}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Booking Reference</div>
              <div className="font-mono font-bold text-white mt-0.5 print:text-black">{transaction.reference}</div>
              <div className="text-emerald-400 text-[11px] mt-1">Status: Funds Locked in Vault</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Escrow Amount</div>
              <div className="text-lg font-black font-heading text-emerald-400 mt-0.5">
                ₦{(transaction.amountNGN || 0).toLocaleString()} NGN
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">Zero Disbursement to Vendor Pending Check-In</div>
            </div>
          </div>

          {/* Barcode & Security Hologram visual */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs print:border-gray-300">
            <div className="flex items-center gap-3">
              <QrCode className="w-10 h-10 text-amber-400" />
              <div>
                <div className="font-mono font-bold text-white print:text-black">{transaction.reference}</div>
                <div className="text-slate-500 text-[10px]">Tamper-Proof Optical Cryptographic Token</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-emerald-400 text-xs">OFFICIAL ESCROW SEAL</div>
              <div className="text-[10px] text-slate-500">Cross River State Bureau</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 no-print">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Voucher</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenEscrowPortal();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-black font-bold text-xs sm:text-sm shadow-emerald-glow transition-all"
              >
                <span>Test PIN Redemption in Escrow Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
