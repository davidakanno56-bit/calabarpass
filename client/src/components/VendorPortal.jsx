import React, { useState, useEffect } from "react";
import {
  Key,
  Unlock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Calendar,
  Building2,
  Wallet,
  Lock,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  User,
  ArrowDownRight,
  Clock
} from "lucide-react";
import confetti from "canvas-confetti";
import { EscrowTableSkeleton } from "./SkeletonLoader.jsx";
import { handleLocalEscrowFallback } from "../utils/api.js";

// 6 Official Launch Partner Terminals Covering Hotels, Eco-Tourism, Retail & Carnival
export const VERIFIED_MERCHANTS = [
  {
    id: "transcorp-hotel",
    name: "Transcorp Hotel Calabar",
    category: "Hotel",
    bankAccount: "Access Bank ****4102",
    ledgerTitle: "Transcorp Hotel Payouts & Settlement Ledger",
    queryKey: "transcorp-hotel",
    demoReservation: {
      reference: "CP-DEMO-551902",
      pin: "551902",
      description: "Executive Suite • Dr. Emeka Nnamdi (₦180,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-849201",
      pin: "849201",
      description: "Seagull Band Pass • Chidi Okafor (₦85,000)",
      owner: "Seagull Band Secretariat"
    }
  },
  {
    id: "hogis-suites",
    name: "Hogis Luxury Suites",
    category: "Hotel",
    bankAccount: "First Bank ****1904",
    ledgerTitle: "Hogis Luxury Suites Payouts & Settlement Ledger",
    queryKey: "hogis-suites",
    demoReservation: {
      reference: "CP-DEMO-310892",
      pin: "310892",
      description: "Deluxe Room • Sarah Johnson (₦65,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-441209",
      pin: "441209",
      description: "Marina Resort Cruise • Kemi Adeleke (₦25,000)",
      owner: "Marina Resort & Waterway Bureau"
    }
  },
  {
    id: "marina-resort",
    name: "Marina Resort & Waterway Bureau",
    category: "Eco-Tourism / Cruise",
    bankAccount: "Heritage Bank ****6610",
    ledgerTitle: "Marina Resort & Waterway Bureau Payouts & Settlement Ledger",
    queryKey: "marina-resort",
    demoReservation: {
      reference: "CP-DEMO-441209",
      pin: "441209",
      description: "Slave History & Boat Cruise • Kemi Adeleke (₦25,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-551902",
      pin: "551902",
      description: "Transcorp Suite • Dr. Emeka Nnamdi (₦180,000)",
      owner: "Transcorp Hotel Calabar"
    }
  },
  {
    id: "afi-drill",
    name: "Afi Drill Monkey Sanctuary",
    category: "Eco-Tourism",
    bankAccount: "Zenith Bank ****3301",
    ledgerTitle: "Afi Drill Monkey Sanctuary Payouts & Settlement Ledger",
    queryKey: "afi-drill",
    demoReservation: {
      reference: "CP-DEMO-662901",
      pin: "662901",
      description: "Wildlife Safari & Canopy Walk • Marcus Brody (₦45,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-289410",
      pin: "289410",
      description: "Monty Suites King Room • Dr. Victoria Asuquo (₦95,000)",
      owner: "Monty Suites Calabar"
    }
  },
  {
    id: "monty-suites",
    name: "Monty Suites Calabar",
    category: "Hotel",
    bankAccount: "Zenith Bank ****7890",
    ledgerTitle: "Monty Suites Calabar Payouts & Settlement Ledger",
    queryKey: "monty-suites",
    demoReservation: {
      reference: "CP-DEMO-289410",
      pin: "289410",
      description: "Executive King Room • Dr. Victoria Asuquo (₦95,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-849201",
      pin: "849201",
      description: "Seagull Band Pass • Chidi Okafor (₦85,000)",
      owner: "Seagull Band Secretariat"
    }
  },
  {
    id: "seagull-band",
    name: "Seagull Band Secretariat",
    category: "Carnival",
    bankAccount: "Zenith Bank ****8821",
    ledgerTitle: "Seagull Band Secretariat Payouts & Settlement Ledger",
    queryKey: "seagull-band",
    demoReservation: {
      reference: "CP-DEMO-849201",
      pin: "849201",
      description: "Official Costume Kit & Street Pass • Chidi Okafor (₦85,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-441209",
      pin: "441209",
      description: "Marina Resort Cruise • Kemi Adeleke (₦25,000)",
      owner: "Marina Resort & Waterway Bureau"
    }
  },
  {
    id: "obudu-tours",
    name: "Obudu Highland Tours & Rangers",
    category: "Eco-Tourism / Highlands",
    bankAccount: "Heritage Bank ****4491",
    ledgerTitle: "Obudu Highland Tours & Rangers Payouts & Settlement Ledger",
    queryKey: "obudu-tours",
    demoReservation: {
      reference: "CP-DEMO-882103",
      pin: "882103",
      description: "Cable Car & Plateau Retreat • Dr. Ken Anozie (₦85,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-661044",
      pin: "661044",
      description: "Kwa Falls Guided Canyon Walk • Brenda Offiong (₦18,000)",
      owner: "Akamkpa Eco-Guides Guild"
    }
  },
  {
    id: "akamkpa-guides",
    name: "Akamkpa Eco-Guides Guild",
    category: "Nature & Adventure",
    bankAccount: "First Bank ****8820",
    ledgerTitle: "Akamkpa Eco-Guides Guild Payouts & Settlement Ledger",
    queryKey: "akamkpa-guides",
    demoReservation: {
      reference: "CP-DEMO-661044",
      pin: "661044",
      description: "Kwa Falls Guided Canyon Walk • Brenda Offiong (₦18,000)"
    },
    competitorVoucher: {
      reference: "CP-DEMO-882103",
      pin: "882103",
      description: "Cable Car & Plateau Retreat • Dr. Ken Anozie (₦85,000)",
      owner: "Obudu Highland Tours & Rangers"
    }
  }
];

export default function VendorPortal({ onOpenVoucher }) {
  const [selectedMerchantId, setSelectedMerchantId] = useState("transcorp-hotel");
  const [payouts, setPayouts] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [releaseForm, setReleaseForm] = useState({ reference: "", pin: "" });
  const [releaseStatus, setReleaseStatus] = useState(null);
  const [releaseLoading, setReleaseLoading] = useState(false);

  // Active authenticated vendor object
  const currentVendor =
    VERIFIED_MERCHANTS.find((m) => m.id === selectedMerchantId) || VERIFIED_MERCHANTS[0];

  // Fetch payouts and incoming arrivals strictly scoped to the active terminal
  const fetchPayouts = async () => {
    setLoading(true);
    const url = `/api/vendor/payouts?vendor=${encodeURIComponent(currentVendor.id)}`;
    let data;
    try {
      const res = await fetch(url);
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        console.warn("Backend API not reachable; operating in autonomous client mode");
        data = handleLocalEscrowFallback(url);
      }
    } catch (err) {
      console.warn("Backend API not reachable; operating in autonomous client mode", err);
      data = handleLocalEscrowFallback(url);
    } finally {
      if (data?.success) {
        setPayouts(data.payouts || []);
        setActiveBookings(data.activeBookings || []);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, [currentVendor.id]);

  // Handle on-site PIN check-in & escrow release with Multi-Tenant Scope Guard
  const handleReleaseEscrow = async (e) => {
    e?.preventDefault();
    const refToRelease = releaseForm.reference.trim();
    const pinToRelease = releaseForm.pin.trim();

    if (!refToRelease || !pinToRelease) {
      setReleaseStatus({
        success: false,
        error: "Please provide both the Booking Reference ID and the 6-digit PIN presented by the guest."
      });
      return;
    }

    setReleaseLoading(true);
    setReleaseStatus(null);

    const endpoint = "/api/escrow/release";
    const payload = {
      reference: refToRelease,
      pin: pinToRelease,
      vendor: currentVendor.id
    };

    let data;
    let isOk = false;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
        isOk = res.ok;
      } else {
        console.warn("Backend API not reachable; operating in autonomous client mode");
        data = handleLocalEscrowFallback(endpoint, payload, "POST");
        isOk = data?.success !== false;
      }
    } catch (err) {
      console.warn("Backend API not reachable; operating in autonomous client mode", err);
      data = handleLocalEscrowFallback(endpoint, payload, "POST");
      isOk = data?.success !== false;
    } finally {
      if (isOk && data?.success) {
        setReleaseStatus({
          success: true,
          message: `Escrow Released! ₦${(data.transaction?.amountNGN || 0).toLocaleString()} successfully disbursed to ${data.transaction?.vendor} (${currentVendor.bankAccount}).`
        });

        // Celebrate successful release
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#10b981", "#3b82f6"]
        });

        // Clear input form
        setReleaseForm({ reference: "", pin: "" });

        // Refresh arrivals and payouts ledger for this terminal
        fetchPayouts();
      } else {
        setReleaseStatus({
          success: false,
          error:
            data?.error ||
            "PIN verification failed. The provided PIN does not match the active voucher."
        });
      }
      setReleaseLoading(false);
    }
  };

  // Strictly compute metrics ONLY from this specific vendor's payouts
  const totalDisbursedToMerchant = payouts.reduce(
    (sum, tx) => sum + (tx.amountNGN || 0),
    0
  );
  const completedPayoutsCount = payouts.length;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* 1. Clear Merchant Header & Active Terminal Security Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/70 border border-emerald-500/40 p-4 sm:p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Isolated Tenant Session
              </span>
              <span className="text-xs text-slate-400 font-semibold">[{currentVendor.category}]</span>
            </div>

            {/* Prominent Active Terminal Badge */}
            <div className="text-sm sm:text-base text-white font-medium flex flex-wrap items-center gap-2">
              <span className="text-slate-300">Active Terminal:</span>
              <span className="font-extrabold text-amber-400 font-heading text-lg">
                {currentVendor.name}
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-300">Verified Settlement Bank Account:</span>
              <span className="font-mono font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg text-xs sm:text-sm">
                {currentVendor.bankAccount}
              </span>
            </div>
          </div>

          {/* Terminal Switcher for Testing Multi-Tenant Scope Isolation */}
          <div className="flex items-center gap-2 self-start lg:self-auto shrink-0 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <label className="text-xs font-bold text-slate-400 whitespace-nowrap">
              Switch Terminal:
            </label>
            <select
              value={selectedMerchantId}
              onChange={(e) => {
                setSelectedMerchantId(e.target.value);
                setReleaseStatus(null);
                setReleaseForm({ reference: "", pin: "" });
              }}
              className="bg-slate-900 border border-slate-700 hover:border-amber-500 text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer transition-colors"
            >
              {VERIFIED_MERCHANTS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.bankAccount})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Building2 className="w-4 h-4" />
            <span>Cross River Tourism Clearinghouse • Merchant Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            {currentVendor.name} Terminal
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Strict Multi-Tenant Clearinghouse: Enter the guest's secret 6-digit physical check-in PIN upon arrival to unlock escrow funds directly to your verified bank account ({currentVendor.bankAccount}).
          </p>
        </div>

        <button
          onClick={fetchPayouts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold self-start md:self-auto hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Terminal</span>
        </button>
      </div>

      {/* 2. Merchant Metrics Summary (Calculated ONLY from this specific vendor's bookings) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Disbursed to This Merchant */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Total Disbursed to Merchant
            </div>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-white mt-2">
            ₦{totalDisbursedToMerchant.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Verified disbursements to {currentVendor.name}
          </div>
        </div>

        {/* Completed Payouts for This Merchant */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Completed Payouts
            </div>
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-white mt-2">
            {completedPayoutsCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Successfully redeemed check-in vouchers
          </div>
        </div>

        {/* Settlement Protocol & Vault Isolation */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Settlement Protocol
            </div>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-heading text-white mt-2">
            Direct Merchant Vault
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {currentVendor.bankAccount} • 100% Escrow Backed
          </div>
        </div>
      </div>

      {/* 3. Incoming Guest Check-Ins & Active Bookings (Awaiting PIN Redemption) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-lg font-bold font-heading text-white">
              Incoming Guest Check-Ins & Active Bookings ({activeBookings.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Escrow Secured • Ready for On-Site PIN Redemption
          </span>
        </div>

        {activeBookings.length === 0 ? (
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center text-xs text-slate-400">
            No incoming guest arrivals awaiting PIN redemption for <strong className="text-slate-300">{currentVendor.name}</strong>. When a tourist completes payment, the reservation will appear here immediately.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeBookings.map((b) => (
              <div
                key={b.reference}
                className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/60 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-400">
                      {b.reference}
                    </div>
                    <div className="font-bold text-white text-sm mt-0.5">
                      {b.packageName}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-emerald-400 font-heading">
                      ₦{(b.amountNGN || 0).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-amber-400/80 uppercase font-semibold">
                      Escrow Locked
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-200 font-medium">{b.customerName}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{b.bookingDate}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setReleaseForm({
                        reference: b.reference,
                        pin: b.rawPinForDemo || ""
                      });
                      // Scroll to redemption form
                      const formElem = document.getElementById("pin-redemption-terminal");
                      if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white text-xs font-bold border border-amber-500/40 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Enter PIN to Redeem</span>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. 6-Digit PIN Redemption Form with Scope Guard */}
      <div id="pin-redemption-terminal" className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Key className="w-4 h-4" />
            <span>On-Site Guest Verification Terminal • {currentVendor.name}</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-white mb-2">
            Redeem 6-Digit Check-In PIN
          </h2>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Verify the traveler on arrival by entering their <strong>Booking Reference ID</strong> and secret <strong>6-digit check-in PIN</strong>. The PIN verification scope guard ensures this voucher belongs to <strong>{currentVendor.name}</strong> before disbursing funds to <strong>{currentVendor.bankAccount}</strong>.
          </p>

          <form onSubmit={handleReleaseEscrow} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Booking Reference ID
                </label>
                <input
                  type="text"
                  value={releaseForm.reference}
                  onChange={(e) => setReleaseForm({ ...releaseForm, reference: e.target.value })}
                  placeholder={`e.g. ${currentVendor.demoReservation.reference}`}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  6-Digit Physical Check-In PIN
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={releaseForm.pin}
                  onChange={(e) => setReleaseForm({ ...releaseForm, pin: e.target.value })}
                  placeholder={`e.g. ${currentVendor.demoReservation.pin}`}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold tracking-widest text-lg focus:outline-none focus:border-amber-500 text-center sm:text-left placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-normal placeholder:text-sm"
                />
              </div>
            </div>

            {/* Scope Guard Rejection / Success Alerts */}
            {releaseStatus && (
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3 ${
                  releaseStatus.success
                    ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-200"
                    : "bg-rose-950/80 border border-rose-500/50 text-rose-200"
                }`}
              >
                {releaseStatus.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold">
                    {releaseStatus.success ? "Escrow Disbursed" : "Redemption Failed"}
                  </div>
                  <div className="leading-relaxed font-mono text-xs">
                    {releaseStatus.success ? releaseStatus.message : releaseStatus.error}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={releaseLoading}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-extrabold text-sm shadow-gold-glow flex items-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                {releaseLoading ? (
                  <span>Verifying PIN & Unlocking Escrow...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Verify PIN & Release Funds</span>
                  </>
                )}
              </button>

              {/* Fast Test Action 1: Auto-Fill Active Tenant Voucher */}
              <button
                type="button"
                onClick={() =>
                  setReleaseForm({
                    reference: currentVendor.demoReservation.reference,
                    pin: currentVendor.demoReservation.pin
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
                title={`Auto-fill active reservation for ${currentVendor.name}`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Auto-Fill My Voucher ({currentVendor.demoReservation.pin})</span>
              </button>

              {/* Fast Test Action 2: Simulate Cross-Tenant Competitor Attack */}
              {currentVendor.competitorVoucher && (
                <button
                  type="button"
                  onClick={() =>
                    setReleaseForm({
                      reference: currentVendor.competitorVoucher.reference,
                      pin: currentVendor.competitorVoucher.pin
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 hover:text-rose-200 text-xs font-semibold border border-rose-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
                  title={`Test security guard: attempt redeeming voucher belonging to ${currentVendor.competitorVoucher.owner}`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Test Competitor Voucher Attack ({currentVendor.competitorVoucher.pin})</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 5. Completed Merchant Payouts Ledger (Strict Multi-Tenant Scoping - NO Competitor Filter) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <span>{currentVendor.ledgerTitle}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium font-sans">
                Strict Tenant Isolation
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Displaying verified settlement disbursements for <strong>{currentVendor.name}</strong> only. Competitor books and unverified guest PINs are strictly isolated.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Merchant: {currentVendor.name}
          </div>
        </div>

        {loading && payouts.length === 0 ? (
          <EscrowTableSkeleton rows={3} />
        ) : payouts.length === 0 ? (
          <div className="glass-panel p-10 rounded-2xl border-slate-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-base font-bold text-white">No Completed Disbursements Found</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No completed payouts found for <strong>{currentVendor.name}</strong> yet. Redeem an active guest check-in PIN above to disburse escrow funds directly to {currentVendor.bankAccount}.
            </p>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl overflow-hidden border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Booking Ref</th>
                    <th className="px-6 py-4">Verified Guest</th>
                    <th className="px-6 py-4">Package / Accommodation</th>
                    <th className="px-6 py-4">Disbursed Amount</th>
                    <th className="px-6 py-4">Settlement Date</th>
                    <th className="px-6 py-4">Payout Status</th>
                    <th className="px-6 py-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payouts.map((tx) => (
                    <tr key={tx.reference} className="hover:bg-slate-900/40 transition-colors">
                      {/* Booking Ref */}
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {tx.reference}
                      </td>

                      {/* Guest */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-200">{tx.customerName}</div>
                        <div className="text-slate-500 text-[10px]">{tx.phone || tx.email}</div>
                      </td>

                      {/* Package / Accommodation */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-300">{tx.packageName}</div>
                        <div className="text-amber-400 text-[10px] mt-0.5">
                          Merchant: {tx.vendor}
                        </div>
                      </td>

                      {/* Disbursed Amount */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-sm text-emerald-400 font-heading">
                          ₦{(tx.amountNGN || 0).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500">100% Net Disbursed</div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>
                            {tx.disbursedAt
                              ? new Date(tx.disbursedAt).toLocaleDateString("en-NG", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric"
                                })
                              : tx.bookingDate || "Disbursed"}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Disbursed to Merchant</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onOpenVoucher && onOpenVoucher(tx)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
