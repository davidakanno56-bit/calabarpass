import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Phone,
  MessageCircle,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  ChevronDown,
  X,
  Key,
  Building2,
  ExternalLink,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Radio
} from "lucide-react";
import confetti from "canvas-confetti";
import { handleLocalEscrowFallback } from "../utils/api.ts";

export interface EscrowBookingRecord {
  reference: string;
  packageName: string;
  vendor: string;
  vendorId?: string;
  customerName: string;
  email: string;
  phone: string;
  amountNGN: number;
  status: "ESCROW_LOCKED_ACTIVE" | "COMPLETED_DISBURSED" | "ESCROW_FROZEN_DISPUTE";
  statusLabel: string;
  checkInPin: string;
  bookingDate: string;
  location?: string;
}

export interface RapidSupportContact {
  id: string;
  title: string;
  badge: string;
  description: string;
  sla: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  accent: "emerald" | "sky" | "amber";
  coverage: string[];
}

export interface TouristProtectionDeskProps {
  onBackToExplore?: () => void;
  onOpenBookingLookup?: () => void;
  initialReference?: string;
}

const RAPID_CONTACTS: RapidSupportContact[] = [
  {
    id: "escort-arrivals",
    title: "Rapid Escort & Airport Arrivals Liaison",
    badge: "24/7 Rapid Transit",
    description: "Official Cross River State Ministry of Tourism security escort & certified corridor transport dispatch for airport, CICC, and festival arrivals.",
    sla: "Immediate Dispatch • Under 5 Mins",
    phone: "+2348002252227",
    whatsapp: "2348002252227",
    whatsappMessage: "Hello CalabarPass Rapid Escort Desk, I have arrived in Cross River State and require certified arrival transit assistance.",
    accent: "emerald",
    coverage: [
      "Margaret Ekpo Intl Airport (CBQ)",
      "Calabar International Convention Centre (CICC)",
      "Tinapa Free Zone & Lakeside Corridor",
      "Obudu Mountain Plateau Transit Hub"
    ]
  },
  {
    id: "escrow-arbitration",
    title: "Escrow Dispute & Merchant Intervention Desk",
    badge: "Zero-Loss Guarantee",
    description: "Statutory arbitration authority empowered to freeze payouts, dispatch state monitors, or issue emergency tourist vouchers on-site.",
    sla: "Arbitrator Response < 10 Mins",
    phone: "+2348035550199",
    whatsapp: "2348035550199",
    whatsappMessage: "Emergency: I am at an authorized Calabar merchant venue and require immediate escrow arbitration for my booking.",
    accent: "sky",
    coverage: [
      "Hotel Room Allocation Disputes",
      "Voucher Non-Honour Overrides",
      "Street Scalper Price Gouge Intervention",
      "Immediate Merchant Subaccount Freezes"
    ]
  },
  {
    id: "carnival-safety",
    title: "Carnival Route Patrol & Medical Liaison",
    badge: "Joint Taskforce",
    description: "Direct telemetry line to the 12km Carnival Calabar marshals, UCTH emergency medical teams, and bilingual tourist safety wardens.",
    sla: "On-Route Marshal SLA < 3 Mins",
    phone: "+2348035550112",
    whatsapp: "2348035550112",
    whatsappMessage: "Carnival Calabar Safety Liaison: Requesting marshal presence or medical assistance along the route.",
    accent: "amber",
    coverage: [
      "12km Carnival Calabar Route",
      "U.J. Esuene Stadium Grandstands",
      "Marian Road & Rabana Roundabout",
      "Marina Waterfront Cultural Pier"
    ]
  }
];

export default function TouristProtectionDesk({
  onBackToExplore,
  onOpenBookingLookup,
  initialReference = ""
}: TouristProtectionDeskProps) {
  const [selectedReference, setSelectedReference] = useState<string>(initialReference || "CP-DEMO-551902");
  const [activeBooking, setActiveBooking] = useState<EscrowBookingRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [pinDigits, setPinDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isReleasing, setIsReleasing] = useState<boolean>(false);
  const [releaseFeedback, setReleaseFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Fetch or mock load target booking record
  useEffect(() => {
    if (!selectedReference) return;

    try {
      const data = handleLocalEscrowFallback("/api/escrow/transactions");
      if (data?.success && Array.isArray(data.transactions)) {
        const found = data.transactions.find(
          (t: EscrowBookingRecord) => t.reference === selectedReference
        );
        if (found) {
          setActiveBooking(found);
          return;
        }
      }
    } catch {
      // Fallback fallback record
    }

    // Default institutional high-fidelity record
    setActiveBooking({
      reference: selectedReference,
      packageName: "Transcorp Hotels Calabar — Executive Presidential Suite",
      vendor: "Transcorp Hotels Calabar",
      vendorId: "transcorp-hotel",
      customerName: "Dr. Emeka Nnamdi",
      email: "emeka.nnamdi@example.com",
      phone: "+234 803 112 4490",
      amountNGN: 150000,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured • Awaiting On-Site Verification",
      checkInPin: "551902",
      bookingDate: "2026-12-24",
      location: "10 Murtala Mohammed Highway, Calabar"
    });
  }, [selectedReference]);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    setReleaseFeedback({ type: null, message: "" });
    setPinDigits(["", "", "", "", "", ""]);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/[^0-9]/g, "").slice(-1);
    const updated = [...pinDigits];
    updated[index] = clean;
    setPinDigits(updated);

    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pinDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pasted) return;

    const updated = [...pinDigits];
    for (let i = 0; i < 6; i++) {
      updated[i] = pasted[i] || "";
    }
    setPinDigits(updated);
    const targetIdx = Math.min(pasted.length, 5);
    inputRefs.current[targetIdx]?.focus();
  };

  const handleExecuteRelease = async () => {
    const fullPin = pinDigits.join("");
    if (fullPin.length !== 6) {
      setReleaseFeedback({
        type: "error",
        message: "Please enter all 6 digits of your private check-in PIN."
      });
      return;
    }

    setIsReleasing(true);
    setReleaseFeedback({ type: null, message: "" });

    try {
      const result = handleLocalEscrowFallback(
        "/api/escrow/release",
        {
          reference: activeBooking?.reference,
          pin: fullPin
        },
        "POST"
      );

      if (result?.success) {
        setReleaseFeedback({
          type: "success",
          message: `Escrow release authorized. ₦${(activeBooking?.amountNGN || 0).toLocaleString()} net disbursement forwarded to ${activeBooking?.vendor}.`
        });

        if (activeBooking) {
          setActiveBooking({
            ...activeBooking,
            status: "COMPLETED_DISBURSED",
            statusLabel: "Completed & Disbursed to Authorized Merchant"
          });
        }

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setReleaseFeedback({
          type: "error",
          message: result?.error || "Invalid 6-digit physical check-in PIN. Funds remain securely locked in state escrow."
        });
      }
    } catch {
      setReleaseFeedback({
        type: "error",
        message: "Network verification interruption. Funds remain safeguarded in state vault."
      });
    } finally {
      setIsReleasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold -tracking-tight mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Cross River State Clearinghouse • 24/7 Rapid Response Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
              Tourist Protection & Escrow Desk
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl leading-relaxed">
              Institutional safety clearinghouse backing every guest reservation across Calabar with physical 6-digit PIN release and instantaneous on-ground dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenBookingLookup && (
              <button
                type="button"
                onClick={onOpenBookingLookup}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-bold text-slate-200 transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Lookup Other Voucher</span>
              </button>
            )}
            {onBackToExplore && (
              <button
                type="button"
                onClick={onBackToExplore}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]"
              >
                <span>Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 1. Primary Live Escrow Guardian Card */}
        <section className="relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.07] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Escrow Summary */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/[0.06] border border-white/[0.1] text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Voucher Ref: {activeBooking?.reference || "CP-DEMO-551902"}</span>
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    activeBooking?.status === "COMPLETED_DISBURSED"
                      ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeBooking?.statusLabel || "100% Escrow Protected"}</span>
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                  {activeBooking?.packageName || "Calabar Premier Reservation"}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300 font-semibold">{activeBooking?.vendor}</span>
                  <span>•</span>
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">{activeBooking?.location || "Calabar Central Corridor"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                    Secured Balance
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    ₦{(activeBooking?.amountNGN || 0).toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                    Verification Method
                  </span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                    <Key className="w-4 h-4" />
                    <span>6-Digit Secret PIN</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                    Arrival Clearance
                  </span>
                  <span className="text-sm font-semibold text-slate-300 block mt-1">
                    {activeBooking?.bookingDate || "Dec 2026"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                <strong className="text-slate-200">Emil Kowalski Trust Rule:</strong> Your funds are held under statutory escrow in the central state settlement clearinghouse. Payout to the merchant only occurs when you physically verify check-in on-site.
              </p>
            </div>

            {/* Right Column: Spring Action Verification Panel */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between space-y-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    On-Site Check-In Verification
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Host Desk Terminal
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Present Voucher PIN to Host
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When you arrive at the front desk or tour meeting point, enter or present your private PIN to disburse the funds and unlock your suite or pass.
                </p>
              </div>

              <div className="pt-2">
                {activeBooking?.status === "COMPLETED_DISBURSED" ? (
                  <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <strong className="block font-bold">Voucher Successfully Disbursed</strong>
                      <span>Check-in verified on-site. Net payout remitted to merchant.</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleOpenDrawer}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-tight transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[0_12px_28px_-6px_rgba(16,185,129,0.4)]"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Enter 6-Digit PIN to Release Funds</span>
                  </button>
                )}
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>State Bureau Audit Ref: CRSTB-{activeBooking?.reference || "551902"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Rapid Response Contact Grid (3 Pillars) */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
              Immediate Emergency & On-Ground Response Desks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              One-tap direct encrypted contact to state clearinghouse officers, corridor escorts, and medical personnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {RAPID_CONTACTS.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/[0.06] text-emerald-400 border border-white/[0.1]">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {item.sla}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      Monitored Corridors
                    </span>
                    <ul className="space-y-1">
                      {item.coverage.map((c, i) => (
                        <li key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instant Action CTA Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-6 mt-4 border-t border-white/[0.06]">
                  <a
                    href={`tel:${item.phone}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-bold border border-white/[0.08] transition-all duration-200 active:scale-[0.97]"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Hotline</span>
                  </a>

                  <a
                    href={`https://wa.me/${item.whatsapp}?text=${encodeURIComponent(item.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-all duration-200 active:scale-[0.97]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Statutory Tourist Escrow Guarantee Notice */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Regulated by the <strong className="text-white">Cross River State Ministry of Tourism & Economic Development</strong> under Escrow Regulation Act 2026. Zero tolerance for unverified operator claims.
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 shrink-0">
            Node ID: CAL-ESC-NODE-01
          </span>
        </div>
      </div>

      {/* 4. PIN Verification Bottom Sheet / Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={handleCloseDrawer}
        >
          <div
            className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-white/[0.12] p-6 sm:p-8 space-y-6 shadow-2xl relative transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sheet Drag Handle */}
            <div className="sm:hidden w-12 h-1.5 rounded-full bg-white/20 mx-auto -mt-2 mb-4" />

            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  <Key className="w-3.5 h-3.5" />
                  <span>Physical Check-In Verification</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Enter 6-Digit Check-In PIN
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Verify receipt of service with <strong className="text-slate-200">{activeBooking?.vendor}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Protected Booking Micro-Card */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Protected Escrow Payout
                </span>
                <span className="text-white font-extrabold text-base font-mono">
                  ₦{(activeBooking?.amountNGN || 0).toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Voucher Reference
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  {activeBooking?.reference}
                </span>
              </div>
            </div>

            {/* 6-Digit PIN Interactive Inputs */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2.5 text-center">
                Private 6-Digit Voucher PIN
              </label>
              <div className="flex justify-between gap-2 max-w-sm mx-auto" onPaste={handlePaste}>
                {pinDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { inputRefs.current[idx] = el; }}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e.target.value ? e : e)}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black font-mono rounded-2xl bg-white/[0.05] border border-white/[0.12] focus:border-emerald-400 focus:bg-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200"
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 block text-center mt-2">
                Demo Auto-Fill PIN: <button type="button" onClick={() => setPinDigits(["5", "5", "1", "9", "0", "2"])} className="text-emerald-400 underline font-mono cursor-pointer">551902</button>
              </span>
            </div>

            {/* Feedback Message */}
            {releaseFeedback.message && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
                  releaseFeedback.type === "success"
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
                }`}
              >
                {releaseFeedback.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{releaseFeedback.message}</span>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleExecuteRelease}
                disabled={isReleasing || pinDigits.some((d) => !d)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm tracking-tight transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[0_12px_28px_-6px_rgba(16,185,129,0.4)]"
              >
                {isReleasing ? (
                  <span>Authorizing Disbursal...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Disburse Escrow</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel & Keep Funds Locked
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

