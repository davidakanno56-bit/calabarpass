import React, { useState, useEffect, useMemo } from "react";
import {
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  Building2,
  DollarSign,
  TrendingUp,
  Percent,
  RefreshCw,
  ExternalLink,
  Layers,
  ArrowRight
} from "lucide-react";
import { formatNaira, calculatePricingBreakdown } from "../utils/pricing.ts";
import { handleLocalEscrowFallback } from "../utils/api.ts";

export interface SettlementLedgerEntry {
  reference: string;
  guestName: string;
  vendorName: string;
  vendorId: string;
  paystackSubaccount: string;
  category: "accommodations" | "eco-sites" | "dining-nightlife" | "trade-expo" | "carnival-culture";
  categoryLabel: string;
  grossAmountNGN: number;
  baseAmountNGN: number;
  platformMarkupNGN: number;
  stateTaxNGN: number;
  netVendorPayoutNGN: number;
  status: "DISBURSED_TO_SUBACCOUNT" | "ESCROW_LOCKED" | "PENDING_CHECKIN" | "FROZEN_DISPUTE";
  checkInTimestamp: string;
  channel: string;
}

export interface TelemetryStats {
  grossProcessedNGN: number;
  activeEscrowsLockedNGN: number;
  totalGateChecks: number;
  stateTaxRemittedNGN: number;
  totalDisbursedNGN: number;
  activePassAuthenticityRate: number;
}

export interface OrganizerLiveHubProps {
  onOpenGateScanner?: () => void;
  onOpenProtectionDesk?: () => void;
}

const INITIAL_LEDGER: SettlementLedgerEntry[] = [
  {
    reference: "CP-TX-991823",
    guestName: "Lady Helen Henshaw",
    vendorName: "Transcorp Hotels Calabar",
    vendorId: "transcorp-hotel",
    paystackSubaccount: "ACCT_qshq59v158sy8kk",
    category: "accommodations",
    categoryLabel: "Accommodations",
    grossAmountNGN: 160000,
    baseAmountNGN: 150000,
    platformMarkupNGN: 10000,
    stateTaxNGN: 3000,
    netVendorPayoutNGN: 147000,
    status: "DISBURSED_TO_SUBACCOUNT",
    checkInTimestamp: "2026-12-24 16:32:10",
    channel: "Mastercard • Zenith"
  },
  {
    reference: "CP-TX-882194",
    guestName: "Senator Victor Ndoma-Egba",
    vendorName: "Seagull Band Secretariat",
    vendorId: "seagull-band",
    paystackSubaccount: "ACCT_5g61dkacharcohc",
    category: "carnival-culture",
    categoryLabel: "Carnival & Bands",
    grossAmountNGN: 95000,
    baseAmountNGN: 85000,
    platformMarkupNGN: 10000,
    stateTaxNGN: 1700,
    netVendorPayoutNGN: 83300,
    status: "DISBURSED_TO_SUBACCOUNT",
    checkInTimestamp: "2026-12-26 11:15:04",
    channel: "Visa • Access Bank"
  },
  {
    reference: "CP-TX-773105",
    guestName: "Engr. Nkechi Bassey",
    vendorName: "Obudu Highland Tours & Rangers",
    vendorId: "obudu-tours",
    paystackSubaccount: "ACCT_5hnyh5id8i6m41c",
    category: "eco-sites",
    categoryLabel: "Eco-Sites & Heritage",
    grossAmountNGN: 95000,
    baseAmountNGN: 85000,
    platformMarkupNGN: 10000,
    stateTaxNGN: 1700,
    netVendorPayoutNGN: 83300,
    status: "ESCROW_LOCKED",
    checkInTimestamp: "Pending Physical Arrival",
    channel: "Paystack Direct Debit"
  },
  {
    reference: "CP-TX-664219",
    guestName: "Dr. Okey Ndibe",
    vendorName: "Marina Bay Sunset Grill & Bar",
    vendorId: "vnd-marina-bay-sunset",
    paystackSubaccount: "ACCT_aqn9ow8g0sx212n",
    category: "dining-nightlife",
    categoryLabel: "Dining & Nightlife",
    grossAmountNGN: 25000,
    baseAmountNGN: 20000,
    platformMarkupNGN: 5000,
    stateTaxNGN: 400,
    netVendorPayoutNGN: 19600,
    status: "DISBURSED_TO_SUBACCOUNT",
    checkInTimestamp: "2026-12-25 20:41:18",
    channel: "OPay Instant POS"
  },
  {
    reference: "CP-TX-553198",
    guestName: "Arch. Femi Adeyemi",
    vendorName: "Channel View Hotel",
    vendorId: "hotel-channel-view",
    paystackSubaccount: "ACCT_lkwtydt3oueugxi",
    category: "accommodations",
    categoryLabel: "Accommodations",
    grossAmountNGN: 108000,
    baseAmountNGN: 98000,
    platformMarkupNGN: 10000,
    stateTaxNGN: 1960,
    netVendorPayoutNGN: 96040,
    status: "ESCROW_LOCKED",
    checkInTimestamp: "Pending Physical Arrival",
    channel: "Mastercard • GTBank"
  },
  {
    reference: "CP-TX-442110",
    guestName: "Alhaji Farouk Bello",
    vendorName: "Tinapa Lakeside Hotel & Waterpark",
    vendorId: "hotel-tinapa-lakeside",
    paystackSubaccount: "ACCT_qshq59v158sy8kk",
    category: "accommodations",
    categoryLabel: "Accommodations",
    grossAmountNGN: 145000,
    baseAmountNGN: 135000,
    platformMarkupNGN: 10000,
    stateTaxNGN: 2700,
    netVendorPayoutNGN: 132300,
    status: "DISBURSED_TO_SUBACCOUNT",
    checkInTimestamp: "2026-12-24 14:02:55",
    channel: "Zenith Bank Transfer"
  }
];

export default function OrganizerLiveHub({
  onOpenGateScanner,
  onOpenProtectionDesk
}: OrganizerLiveHubProps) {
  const [ledger, setLedger] = useState<SettlementLedgerEntry[]>(INITIAL_LEDGER);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Sync with live transactions if available
  const refreshLedger = () => {
    setIsRefreshing(true);
    try {
      const data = handleLocalEscrowFallback("/api/escrow/transactions");
      if (data?.success && Array.isArray(data.transactions) && data.transactions.length > 0) {
        const mapped: SettlementLedgerEntry[] = data.transactions.map((tx: {
          reference: string;
          customerName?: string;
          vendor?: string;
          vendorId?: string;
          amountNGN?: number;
          basePriceNGN?: number;
          platformMarkupNGN?: number;
          taxNGN?: number;
          vendorPayoutNGN?: number;
          status?: string;
          bookingDate?: string;
          channel?: string;
        }) => {
          const breakdown = calculatePricingBreakdown(tx.basePriceNGN || tx.amountNGN || 50000);
          return {
            reference: tx.reference,
            guestName: tx.customerName || "Authorized Guest",
            vendorName: tx.vendor || "Verified Host",
            vendorId: tx.vendorId || "vnd-calabar",
            paystackSubaccount: "ACCT_qshq59v158sy8kk",
            category: "accommodations",
            categoryLabel: "Verified Hospitality",
            grossAmountNGN: tx.amountNGN || breakdown.publicListingPrice,
            baseAmountNGN: tx.basePriceNGN || breakdown.basePrice,
            platformMarkupNGN: tx.platformMarkupNGN || breakdown.platformMarkup,
            stateTaxNGN: tx.taxNGN || breakdown.taxAmount,
            netVendorPayoutNGN: tx.vendorPayoutNGN || breakdown.vendorPayout,
            status: tx.status === "COMPLETED_DISBURSED" ? "DISBURSED_TO_SUBACCOUNT" : "ESCROW_LOCKED",
            checkInTimestamp: tx.bookingDate || "2026-12-24",
            channel: tx.channel || "Paystack Escrow Vault"
          };
        });

        // Merge mapped with seed transactions avoiding duplicate references
        const existingRefs = new Set(mapped.map((m) => m.reference));
        const merged = [...mapped, ...INITIAL_LEDGER.filter((i) => !existingRefs.has(i.reference))];
        setLedger(merged);
      }
    } catch {
      // Keep existing
    } finally {
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  useEffect(() => {
    refreshLedger();
  }, []);

  // Compute telemetry metrics
  const stats: TelemetryStats = useMemo(() => {
    let gross = 0;
    let locked = 0;
    let disbursed = 0;
    let tax = 0;

    ledger.forEach((item) => {
      gross += item.grossAmountNGN;
      tax += item.stateTaxNGN;
      if (item.status === "DISBURSED_TO_SUBACCOUNT") {
        disbursed += item.netVendorPayoutNGN;
      } else {
        locked += item.netVendorPayoutNGN;
      }
    });

    return {
      grossProcessedNGN: gross,
      activeEscrowsLockedNGN: locked,
      totalGateChecks: 1842,
      stateTaxRemittedNGN: tax,
      totalDisbursedNGN: disbursed,
      activePassAuthenticityRate: 99.8
    };
  }, [ledger]);

  // Filtered ledger rows
  const filteredLedger = useMemo(() => {
    return ledger.filter((row) => {
      const matchFilter =
        selectedFilter === "All" ||
        (selectedFilter === "Disbursed" && row.status === "DISBURSED_TO_SUBACCOUNT") ||
        (selectedFilter === "Escrow Locked" && row.status === "ESCROW_LOCKED") ||
        (selectedFilter === "Accommodations" && row.category === "accommodations") ||
        (selectedFilter === "Carnival" && row.category === "carnival-culture");

      const matchSearch =
        row.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.paystackSubaccount.toLowerCase().includes(searchQuery.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [ledger, selectedFilter, searchQuery]);

  const handleExportCSV = () => {
    const headers = "Reference,Guest,Vendor,Subaccount,GrossNGN,MarkupNGN,2%TaxNGN,NetPayoutNGN,Status,Timestamp\n";
    const rows = filteredLedger
      .map(
        (r) =>
          `"${r.reference}","${r.guestName}","${r.vendorName}","${r.paystackSubaccount}",${r.grossAmountNGN},${r.platformMarkupNGN},${r.stateTaxNGN},${r.netVendorPayoutNGN},"${r.status}","${r.checkInTimestamp}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CalabarPass_Settlement_Audit_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Fast Action Triggers */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold -tracking-tight mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Cross River State Clearinghouse • Organizer Live Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
              Settlement & Gate Telemetry
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Real-time monitor tracking direct Paystack subaccount split payouts, on-site turnstile authentications, and Cross River State statutory tourism remittances.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenGateScanner && (
              <button
                type="button"
                onClick={onOpenGateScanner}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]"
              >
                <span>Launch Gate Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenProtectionDesk && (
              <button
                type="button"
                onClick={onOpenProtectionDesk}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-bold text-slate-200 transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protection Desk</span>
              </button>
            )}

            <button
              type="button"
              onClick={refreshLedger}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-slate-300 transition-all active:scale-95 cursor-pointer"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            </button>
          </div>
        </header>

        {/* 1. Minimalist Telemetry Cards (Apple-Grade Grid) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Gross Processed */}
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all hover:border-emerald-500/30">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400">Gross Processed</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18.4%
                </span>
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                ₦{stats.grossProcessedNGN.toLocaleString()}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
              <span>Paystack Verified GMV</span>
              <span className="text-slate-300 font-semibold">{ledger.length} Transactions</span>
            </div>
          </div>

          {/* Card 2: Active Escrows Locked */}
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all hover:border-emerald-500/30">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400">Active Escrow Vault</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Secured
                </span>
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                ₦{stats.activeEscrowsLockedNGN.toLocaleString()}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
              <span>Disbursed to Vendors:</span>
              <span className="text-emerald-400 font-mono font-bold">₦{stats.totalDisbursedNGN.toLocaleString()}</span>
            </div>
          </div>

          {/* Card 3: Gate Scans & Authenticity */}
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all hover:border-emerald-500/30">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400">Turnstile Checks</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {stats.activePassAuthenticityRate}% Authentic
                </span>
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                {stats.totalGateChecks.toLocaleString()}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
              <span>8 Active Corridors</span>
              <span className="text-slate-300 font-semibold">Zero Fraud Breeches</span>
            </div>
          </div>

          {/* Card 4: Cross River State Tax Remitted */}
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all hover:border-emerald-500/30">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400">2% State Tourism Tax</span>
                <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  Statutory
                </span>
              </div>
              <div className="text-3xl font-black text-white font-mono tracking-tight">
                ₦{stats.stateTaxRemittedNGN.toLocaleString()}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
              <span>Remitted to Ministry</span>
              <span className="text-sky-300 font-semibold">Instant Split</span>
            </div>
          </div>
        </section>

        {/* 2. Real-Time Split-Payout Settlement Monitor */}
        <section className="rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
                Live Subaccount Split-Settlement Ledger
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Direct Paystack subaccount disbursements. Zero deductions from vendor price other than the 2% statutory state tourism tax.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-bold text-slate-200 transition-all duration-200 active:scale-95 cursor-pointer self-start md:self-auto"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Audit CSV</span>
            </button>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guest, merchant, or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
              {["All", "Disbursed", "Escrow Locked", "Accommodations", "Carnival"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                    selectedFilter === tab
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                      : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/30">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-white/[0.04] text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4">Reference & Guest</th>
                  <th className="py-3 px-4">Merchant & Subaccount</th>
                  <th className="py-3 px-4 text-right">Guest Total</th>
                  <th className="py-3 px-4 text-right">Platform Markup</th>
                  <th className="py-3 px-4 text-right">2% State Tax</th>
                  <th className="py-3 px-4 text-right">Net Merchant Payout</th>
                  <th className="py-3 px-4 text-center">Settlement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredLedger.length > 0 ? (
                  filteredLedger.map((row) => (
                    <tr key={row.reference} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-white">{row.reference}</div>
                        <div className="text-[11px] text-slate-400">{row.guestName}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{row.vendorName}</div>
                        <div className="text-[10px] font-mono text-emerald-400/80">{row.paystackSubaccount}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        ₦{row.grossAmountNGN.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                        +₦{row.platformMarkupNGN.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-sky-400 font-semibold">
                        -₦{row.stateTaxNGN.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-300 text-sm">
                        ₦{row.netVendorPayoutNGN.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {row.status === "DISBURSED_TO_SUBACCOUNT" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Disbursed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            <Lock className="w-3 h-3 text-amber-400" />
                            <span>Escrow Locked</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No transactions found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 gap-2">
            <span>Showing {filteredLedger.length} of {ledger.length} audited transactions</span>
            <span className="text-[11px] text-slate-500 font-mono">
              Paystack Subaccount Payout Engine v2.4 • Direct NIBSS Route
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
