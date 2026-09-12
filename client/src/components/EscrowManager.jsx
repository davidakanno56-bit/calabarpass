import React, { useState, useEffect } from "react";
import { Lock, Unlock, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Key, ArrowRight, Calendar, UserCheck, Clock, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";
import { EscrowTableSkeleton } from "./SkeletonLoader.jsx";
import { handleLocalEscrowFallback } from "../utils/api.js";

export default function EscrowManager({ onOpenVoucher }) {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [releaseForm, setReleaseForm] = useState({ reference: "", pin: "" });
  const [releaseStatus, setReleaseStatus] = useState(null);
  const [releaseLoading, setReleaseLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    const endpoint = "/api/escrow/transactions";
    let data;
    try {
      const res = await fetch(endpoint);
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        console.warn("Backend API not reachable; operating in autonomous client mode");
        data = handleLocalEscrowFallback(endpoint);
      }
    } catch (err) {
      console.warn("Backend API not reachable; operating in autonomous client mode", err);
      data = handleLocalEscrowFallback(endpoint);
    } finally {
      if (data?.success) {
        setTransactions(data.transactions || []);
        setStats(data.stats || null);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleReleaseEscrow = async (e) => {
    e?.preventDefault();
    const refToRelease = releaseForm.reference.trim();
    const pinToRelease = releaseForm.pin.trim();

    if (!refToRelease || !pinToRelease) {
      setReleaseStatus({ success: false, error: "Please provide both reference code and 6-digit PIN" });
      return;
    }

    setReleaseLoading(true);
    setReleaseStatus(null);

    // Optimistic UI state update
    const previousTransactions = [...transactions];
    const targetTx = transactions.find((t) => t.reference === refToRelease);

    if (targetTx && String(targetTx.checkInPin).trim() === pinToRelease) {
      setTransactions(
        transactions.map((t) =>
          t.reference === refToRelease
            ? {
                ...t,
                status: "COMPLETED_DISBURSED",
                statusLabel: "Completed & Disbursed to Vendor",
                disbursedAt: new Date().toISOString()
              }
            : t
        )
      );
    }

    const endpoint = "/api/escrow/release";
    const payload = {
      reference: refToRelease,
      pin: pinToRelease
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
          message: `Success! Escrow released. ₦${(data.transaction?.amountNGN || 0).toLocaleString()} disbursed to vendor (${data.transaction?.vendor}).`
        });

        // Trigger confetti celebration
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });

        // Background ledger refresh
        fetchTransactions();
      } else {
        // Rollback optimistic update
        setTransactions(previousTransactions);
        setReleaseStatus({
          success: false,
          error: data?.error || "PIN verification failed. Funds remain locked in escrow."
        });
      }
      setReleaseLoading(false);
    }
  };

  const getStatusBadge = (tx) => {
    const status = tx?.status;
    switch (status) {
      case "ESCROW_LOCKED_ACTIVE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Escrow Secured - Awaiting On-Site Verification</span>
          </span>
        );
      case "COMPLETED_DISBURSED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-950/80 border border-sky-500/40 text-sky-300">
            <CheckCircle2 className="w-3 h-3 text-sky-400" />
            <span>Completed & Disbursed</span>
          </span>
        );
      case "ESCROW_FROZEN_DISPUTE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 border border-rose-500/50 text-rose-300">
            <ShieldAlert className="w-3 h-3 text-rose-400 animate-pulse" />
            <span>Escrow Frozen - Under Review</span>
          </span>
        );
      case "AWAITING_PAYMENT":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 border border-amber-500/40 text-amber-300">
            <Clock className="w-3 h-3" />
            <span>Awaiting Payment</span>
          </span>
        );
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Cross River State Escrow Clearinghouse</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Live Escrow Vault & 365-Day Redemption
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time funds held in escrow across Obudu, Agbokim, Marina, and Carnival Calabar. Disbursed only when the traveler provides their 6-digit PIN on-site.
          </p>
        </div>

        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold self-start md:self-auto hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {/* Escrow Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Locked in Escrow Vault */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            Total Locked in Escrow Vault
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-white">
            ₦{(stats?.totalLockedNGN || 0).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Active buyer-protected deposits</div>
        </div>

        {/* Platform Commission Accrued (7%) */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            Platform Commission Accrued (7%)
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-300">
            ₦{(stats?.platformCommissionNGN || Math.round(((stats?.totalLockedNGN || 0) + (stats?.totalDisbursedNGN || 0)) * 0.07)).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Cross River State Clearinghouse Fee</div>
        </div>

        {/* Disbursed to Local Merchants */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
            Disbursed to Local Merchants
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-white">
            ₦{(stats?.totalDisbursedNGN || 0).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Verified on-site PIN settlements</div>
        </div>

        {/* Active Escrow Holds */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
            Active Escrow Holds
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-white">
            {stats?.activeEscrowBookings || 0} Bookings
          </div>
          <div className="text-xs text-slate-400 mt-1">Awaiting physical on-site check-in</div>
        </div>
      </div>

      {/* On-Site PIN Redemption Terminal */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-500/30">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Key className="w-4 h-4" />
            <span>Official On-Site Vendor Redemption Portal</span>
          </div>
          <h3 className="text-2xl font-bold font-heading text-white mb-2">
            Redeem 6-Digit Check-In PIN
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            When tourists meet their vendor in Cross River State (Marian Road, Obanliku Plateau, or Marina Waterfront), the vendor delivers the verified pass/service. The tourist then reveals their private 6-digit PIN to release funds from escrow.
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
                  placeholder="e.g. CP-DEMO-849201"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-500"
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
                  placeholder="e.g. 849201"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold tracking-widest text-base focus:outline-none focus:border-amber-500 text-center sm:text-left"
                />
              </div>
            </div>

            {releaseStatus && (
              <div
                className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                  releaseStatus.success
                    ? "bg-emerald-950/70 border border-emerald-500/50 text-emerald-200"
                    : "bg-rose-950/70 border border-rose-500/50 text-rose-200"
                }`}
              >
                {releaseStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{releaseStatus.success ? releaseStatus.message : releaseStatus.error}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={releaseLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-extrabold text-sm shadow-gold-glow flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {releaseLoading ? (
                  <span>Verifying PIN & Disbursing...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Verify PIN & Disburse Escrow Funds</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setReleaseForm({ reference: "CP-DEMO-849201", pin: "849201" })}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                Auto-Fill Demo Active Booking (849201)
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Transactions Ledger Table */}
      {loading && transactions.length === 0 ? (
        <EscrowTableSkeleton rows={4} />
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden border-slate-800">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-heading text-white">Escrow Transactions Ledger</h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time state tracking of 365-day Cross River State tourism bookings</p>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              {transactions.length} Total Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Reference & Guest</th>
                  <th className="px-6 py-4">Package & Vendor</th>
                  <th className="px-6 py-4">Reservation Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Escrow Status</th>
                  <th className="px-6 py-4">6-Digit PIN</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions.map((tx) => (
                  <tr key={tx.reference} className="hover:bg-slate-900/40 transition-colors">
                    {/* Reference & Guest */}
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-white">{tx.reference}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{tx.customerName}</div>
                      <div className="text-slate-500 text-[10px]">{tx.email}</div>
                    </td>

                    {/* Package & Vendor */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{tx.packageName}</div>
                      <div className="text-amber-400 text-[11px] mt-0.5">Vendor: {tx.vendor}</div>
                    </td>

                    {/* Reservation Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{tx.bookingDate || "Open 365 Days"}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-white font-heading">
                        ₦{(tx.amountNGN || 0).toLocaleString()}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(tx)}
                    </td>

                    {/* PIN Security Display */}
                    <td className="px-6 py-4">
                      {tx.status === "COMPLETED_DISBURSED" ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 font-mono font-bold text-sky-400 border border-sky-500/30">
                          <CheckCircle2 className="w-3 h-3 text-sky-400" />
                          <span>Redeemed ({tx.checkInPin || "Verified"})</span>
                        </div>
                      ) : tx.checkInPin ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 font-mono font-bold text-amber-400/90 border border-amber-500/30" title="Private to guest: revealed only on-site to vendor">
                          <Lock className="w-3 h-3 text-amber-400" />
                          <span>{tx.checkInPin.includes("•") ? tx.checkInPin : "•••••• (Guest Private)"}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Pending Payment</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenVoucher(tx)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          View Voucher
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
