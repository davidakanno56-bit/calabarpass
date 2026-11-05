import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Zap,
  ZapOff,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  X,
  ArrowRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Radio,
  UserCheck,
  Building2,
  Lock,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import confetti from "canvas-confetti";

export type ScannerStatus = "idle" | "scanning" | "valid" | "duplicate" | "fraud";

export interface ScannedPassPayload {
  reference: string;
  attendeeName: string;
  categoryTier: string;
  vendorOrEvent: string;
  gateLocation: string;
  checkInTimestamp: string;
  escrowStatus: "RELEASED_TO_MERCHANT" | "HELD_FOR_REVIEW" | "ALREADY_CLAIMED";
  ticketId: string;
  seatOrGrandstand?: string;
  redemptionHistory?: {
    firstCheckIn: string;
    gate: string;
    operator: string;
  };
}

export interface GateScannerProps {
  onClose?: () => void;
  onNavigateToDashboard?: () => void;
  defaultGate?: string;
}

const SAMPLE_VALID_PASS: ScannedPassPayload = {
  reference: "CP-CARNIVAL-992140",
  attendeeName: "Chief Bassey Duke",
  categoryTier: "VIP Grandstand • Stadium Carnival Route",
  vendorOrEvent: "Carnival Calabar 2026 Pageant",
  gateLocation: "Gate 4 • U.J. Esuene Stadium West",
  checkInTimestamp: new Date().toLocaleTimeString("en-GB", { hour12: false }),
  escrowStatus: "RELEASED_TO_MERCHANT",
  ticketId: "TKT-SEAGULL-8819",
  seatOrGrandstand: "Zone A, Row 2, Seat 14"
};

const SAMPLE_DUPLICATE_PASS: ScannedPassPayload = {
  reference: "CP-DUPLICATE-441029",
  attendeeName: "Unknown Bearer (Counterfeit Re-entry)",
  categoryTier: "General Admission Street Band Kit",
  vendorOrEvent: "Passion 4 Band Secretariat",
  gateLocation: "Gate 1 • Marian Road Junction",
  checkInTimestamp: new Date().toLocaleTimeString("en-GB", { hour12: false }),
  escrowStatus: "ALREADY_CLAIMED",
  ticketId: "TKT-PASSION-0112",
  redemptionHistory: {
    firstCheckIn: "14:18:22 (42 minutes ago)",
    gate: "Marian Gate 2",
    operator: "Marshal Edet O."
  }
};

export default function MobileGateScanner({
  onClose,
  onNavigateToDashboard,
  defaultGate = "Turnstile Gate 4 • CICC Central"
}: GateScannerProps) {
  const [status, setStatus] = useState<ScannerStatus>("scanning");
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [scannedPass, setScannedPass] = useState<ScannedPassPayload | null>(null);
  const [manualCode, setManualCode] = useState<string>("");
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const [stats, setStats] = useState<{ total: number; valid: number; rejected: number }>({
    total: 342,
    valid: 338,
    rejected: 4
  });

  const bannerTimeoutRef = useRef<number | null>(null);

  // Trigger Apple-grade haptic vibration when duplicate or fraud detected
  const triggerHaptic = (type: "success" | "warning" | "error") => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      if (type === "success") {
        navigator.vibrate?.([40]);
      } else if (type === "warning") {
        navigator.vibrate?.([100, 50, 100]);
      } else {
        navigator.vibrate?.([150, 50, 150, 50, 250]);
      }
    }
  };

  const handleTriggerValidScan = () => {
    if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    setStatus("valid");
    setScannedPass({
      ...SAMPLE_VALID_PASS,
      checkInTimestamp: new Date().toLocaleTimeString("en-GB", { hour12: false })
    });
    setStats((prev) => ({ ...prev, total: prev.total + 1, valid: prev.valid + 1 }));
    triggerHaptic("success");

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.15 }
    });

    bannerTimeoutRef.current = window.setTimeout(() => {
      setStatus("scanning");
    }, 6500);
  };

  const handleTriggerDuplicateScan = () => {
    if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    setStatus("duplicate");
    setScannedPass({
      ...SAMPLE_DUPLICATE_PASS,
      checkInTimestamp: new Date().toLocaleTimeString("en-GB", { hour12: false })
    });
    setStats((prev) => ({ ...prev, total: prev.total + 1, rejected: prev.rejected + 1 }));
    triggerHaptic("error");

    bannerTimeoutRef.current = window.setTimeout(() => {
      setStatus("scanning");
    }, 8000);
  };

  const handleManualLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    if (manualCode.toUpperCase().includes("DUP") || manualCode.toUpperCase().includes("BAD")) {
      handleTriggerDuplicateScan();
    } else {
      handleTriggerValidScan();
    }
    setManualCode("");
    setShowManualInput(false);
  };

  const handleDismissBanner = () => {
    if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    setStatus("scanning");
  };

  useEffect(() => {
    return () => {
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-black text-slate-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Viewfinder Background Grid & Animated Scan Line */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950 flex items-center justify-center pointer-events-none">
        {/* Subtle camera video feed simulation layer */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Viewfinder Target Reticle */}
        <div className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-3xl border border-white/[0.08] shadow-[0_0_100px_rgba(16,185,129,0.08)] flex items-center justify-center">
          {/* 4 Tactile Corner Guides */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-3 border-l-3 border-emerald-400 rounded-tl-2xl shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-3 border-r-3 border-emerald-400 rounded-tr-2xl shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-3 border-l-3 border-emerald-400 rounded-bl-2xl shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-3 border-r-3 border-emerald-400 rounded-br-2xl shadow-[0_0_12px_rgba(16,185,129,0.6)]" />

          {/* Animated Sweeping Laser Ray */}
          <div className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_16px_rgba(16,185,129,0.9)] animate-pulse" style={{
            top: status === "scanning" ? "48%" : "50%",
            transition: "top 0.4s ease-in-out"
          }} />

          <div className="text-center p-6 space-y-1">
            <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400/90 font-mono">
              NFC / QR Field Active
            </span>
            <p className="text-xs text-slate-400 font-light">
              Align pass token or guest wristband inside the guide
            </p>
          </div>
        </div>
      </div>

      {/* 2. Top Header & Dynamic Island Pill Notification */}
      <header className="relative z-30 pt-6 px-4 sm:px-6 flex flex-col items-center">
        {/* Gate Officer Bar */}
        <div className="w-full max-w-md flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-slate-200 tracking-tight">{defaultGate}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTorchOn(!torchOn)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
                torchOn
                  ? "bg-amber-400 text-slate-950 shadow-[0_0_16px_rgba(251,191,36,0.6)]"
                  : "bg-white/[0.08] text-slate-300 hover:bg-white/[0.14] border border-white/[0.1]"
              }`}
              title="Toggle Viewfinder Torch"
            >
              {torchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-slate-300 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                title="Close Scanner"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Apple-Style Dynamic Notification Island */}
        <div className="w-full max-w-md">
          {status === "valid" && scannedPass && (
            <div
              className="w-full rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/50 p-5 shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all duration-500 ease-out transform translate-y-0"
              style={{
                boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.35), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)"
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                      Pass Authorized • Escrow Disbursed
                    </span>
                    <h3 className="text-lg font-extrabold text-white tracking-tight">
                      {scannedPass.attendeeName}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDismissBanner}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block font-semibold uppercase">Category Tier</span>
                  <span className="text-white font-bold">{scannedPass.categoryTier}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block font-semibold uppercase">Voucher Token</span>
                  <span className="text-emerald-400 font-mono font-bold">{scannedPass.reference}</span>
                </div>
              </div>

              {scannedPass.seatOrGrandstand && (
                <div className="mt-2 text-[11px] text-slate-300 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/[0.06] flex items-center justify-between">
                  <span>Reserved Seating:</span>
                  <strong className="text-white">{scannedPass.seatOrGrandstand}</strong>
                </div>
              )}
            </div>
          )}

          {status === "duplicate" && scannedPass && (
            <div
              className="w-full rounded-3xl bg-rose-950/95 backdrop-blur-2xl border border-rose-500/60 p-5 shadow-[0_20px_50px_rgba(244,63,94,0.35)] transition-all duration-500 ease-out transform translate-y-0"
              style={{
                boxShadow: "0 25px 50px -12px rgba(244, 63, 94, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)"
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-rose-500/25 border border-rose-500/50 text-rose-400 flex items-center justify-center shrink-0 animate-pulse">
                    <ShieldAlert className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                      SECURITY ALERT • DUPLICATE PASS
                    </span>
                    <h3 className="text-base font-extrabold text-white tracking-tight">
                      Voucher Already Redeemed
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDismissBanner}
                  className="text-rose-300 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-rose-500/30 text-xs text-rose-200/90 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Token ID:</span>
                  <span className="font-mono font-bold text-white">{scannedPass.reference}</span>
                </div>
                {scannedPass.redemptionHistory && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">First Used:</span>
                    <span className="font-semibold text-rose-300">{scannedPass.redemptionHistory.firstCheckIn} at {scannedPass.redemptionHistory.gate}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Incident Flagged: Security patrol dispatched to ${defaultGate}. Voucher ${scannedPass.reference} locked.`)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all active:scale-[0.97]"
                >
                  Flag Security Patrol
                </button>
                <button
                  type="button"
                  onClick={handleDismissBanner}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-slate-300 font-semibold text-xs transition-all active:scale-[0.97]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {status === "scanning" && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-xs font-semibold text-slate-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Gate Optical Reader Online • Point Camera at Ticket</span>
            </div>
          )}
        </div>
      </header>

      {/* 4. Bottom Controls & Rapid Testing Triggers */}
      <footer className="relative z-30 pb-8 px-4 sm:px-6 flex flex-col items-center space-y-4">
        {/* Turnstile Telemetry Counters */}
        <div className="w-full max-w-md grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08]">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Scanned</span>
            <span className="text-base font-extrabold text-white font-mono">{stats.total}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08]">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">Admitted</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">{stats.valid}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08]">
            <span className="text-[10px] text-rose-400 uppercase font-bold block">Rejected</span>
            <span className="text-base font-extrabold text-rose-400 font-mono">{stats.rejected}</span>
          </div>
        </div>

        {/* Manual Code Input Drawer or Simulation Bar */}
        <div className="w-full max-w-md space-y-2.5">
          {showManualInput ? (
            <form onSubmit={handleManualLookupSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Reference (e.g. CP-CARNIVAL-992140)"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                autoFocus
                className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.08] border border-white/[0.15] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all active:scale-95 cursor-pointer"
              >
                Verify
              </button>
              <button
                type="button"
                onClick={() => setShowManualInput(false)}
                className="px-3 py-3 rounded-2xl bg-white/[0.08] text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleTriggerValidScan}
                className="py-3 px-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all active:scale-[0.96] cursor-pointer shadow-sm"
              >
                Simulate Valid Pass
              </button>

              <button
                type="button"
                onClick={handleTriggerDuplicateScan}
                className="py-3 px-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-all active:scale-[0.96] cursor-pointer shadow-sm"
              >
                Simulate Fraud Pass
              </button>

              <button
                type="button"
                onClick={() => setShowManualInput(true)}
                className="py-3 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 font-bold text-xs transition-all active:scale-[0.96] cursor-pointer"
              >
                Manual Key-In
              </button>
            </div>
          )}

          {onNavigateToDashboard && (
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="w-full py-2.5 text-center text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Organizer Telemetry Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
