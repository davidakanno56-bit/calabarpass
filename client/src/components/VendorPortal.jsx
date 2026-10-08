import React, { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { EscrowTableSkeleton } from "./SkeletonLoader.jsx";
import { handleLocalEscrowFallback } from "../utils/api.js";

// The active terminal is fixed here because this app currently has no vendor
// authentication context from which to resolve a signed-in merchant.
const ACTIVE_TERMINAL = {
  id: "transcorp-hotel",
  name: "Transcorp Hotel Calabar",
  bankAccount: "Access Bank ****4102",
};

const VENDOR_API_ROUTES = {
  payouts: "/api/vendor/payouts",
  release: "/api/escrow/release",
};

async function requestVendorApi(endpoint, options = {}) {
  const method = options.method || "GET";
  let payload = null;

  if (options.body) {
    try {
      payload =
        typeof options.body === "string"
          ? JSON.parse(options.body)
          : options.body;
    } catch {
      payload = options.body;
    }
  }

  const response = await fetch(endpoint, options);
  const contentType = response.headers.get("content-type") || "";

  if (contentType.toLowerCase().includes("application/json")) {
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("The server returned malformed JSON.");
    }

    if (!response.ok) {
      throw new Error(data?.error || `Request failed (${response.status}).`);
    }

    return data;
  }

  console.warn(
    `Vendor API ${endpoint} returned a non-JSON response (HTTP ${response.status}); using the local Vercel fallback.`,
  );
  return handleLocalEscrowFallback(endpoint, payload, method);
}

const formatNaira = (amount = 0) =>
  `₦${Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date) => {
  if (!date) return "Date unavailable";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

export default function VendorPortal({ onOpenVoucher }) {
  const [payouts, setPayouts] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ledgerError, setLedgerError] = useState("");
  const [releaseForm, setReleaseForm] = useState({ reference: "", pin: "" });
  const [releaseStatus, setReleaseStatus] = useState(null);
  const [releaseLoading, setReleaseLoading] = useState(false);

  // Every ledger request uses the active terminal scope and rejects invalid API responses.
  const fetchLedger = useCallback(async ({ quiet = false } = {}) => {
    if (quiet) setRefreshing(true);
    else setLoading(true);
    setLedgerError("");

    try {
      const url = `${VENDOR_API_ROUTES.payouts}?vendor=${encodeURIComponent(ACTIVE_TERMINAL.id)}`;
      const data = await requestVendorApi(url);

      if (!data?.success) {
        throw new Error(data.error || "Unable to load the merchant ledger.");
      }

      setPayouts(Array.isArray(data.payouts) ? data.payouts : []);
      setActiveBookings(Array.isArray(data.activeBookings) ? data.activeBookings : []);
    } catch (error) {
      console.error("Vendor ledger request failed:", error);
      setLedgerError(error.message || "Unable to load the merchant ledger.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLedger();
  }, [fetchLedger]);

  // The server validates the physical PIN and updates the escrow booking status.
  const handleReleaseEscrow = async (event) => {
    event.preventDefault();
    const reference = releaseForm.reference.trim();
    const pin = releaseForm.pin.trim();

    if (!reference || !/^\d{6}$/.test(pin)) {
      setReleaseStatus({
        success: false,
        message: "Enter a booking reference and a valid 6-digit check-in PIN.",
      });
      return;
    }

    setReleaseLoading(true);
    setReleaseStatus(null);

    try {
      const data = await requestVendorApi(VENDOR_API_ROUTES.release, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          pin,
          vendor: ACTIVE_TERMINAL.id,
        }),
      });

      if (!data?.success) {
        throw new Error(data.error || "PIN verification could not be completed.");
      }

      setReleaseStatus({
        success: true,
        message: "PIN Verified! Escrow Released",
      });
      setReleaseForm({ reference: "", pin: "" });
      await fetchLedger({ quiet: true });
    } catch (error) {
      console.error("Escrow release request failed:", error);
      setReleaseStatus({
        success: false,
        message: error.message || "PIN verification could not be completed.",
      });
    } finally {
      setReleaseLoading(false);
    }
  };

  const totalDisbursed = payouts.reduce(
    (total, payout) => total + (Number(payout.amountNGN) || 0),
    0,
  );

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
            <Building2 className="h-4 w-4" />
            Merchant settlement terminal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {ACTIVE_TERMINAL.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Verify guest check-ins and review escrow release records for this
            merchant terminal.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchLedger({ quiet: true })}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60 md:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh ledger
        </button>
      </header>

      <section
        aria-label="Merchant terminal and verified settlement account"
        className="flex flex-col gap-4 rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/50 via-slate-900/80 to-slate-900/70 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active terminal
            </p>
            <p className="mt-1 font-bold text-white">{ACTIVE_TERMINAL.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-slate-800 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified settlement account
          </span>
          <span className="font-mono text-sm font-semibold text-slate-100">
            {ACTIVE_TERMINAL.bankAccount}
          </span>
        </div>
      </section>

      {ledgerError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-950/30 p-4 text-sm text-rose-200"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
          <span>{ledgerError}</span>
        </div>
      )}

      <section aria-label="Settlement metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Total disbursed to merchant
            </p>
            <Wallet className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">
            {formatNaira(totalDisbursed)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Total amount in server-confirmed escrow release records
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Completed payouts
            </p>
            <CheckCircle2 className="h-5 w-5 text-sky-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">{payouts.length}</p>
          <p className="mt-1 text-xs text-slate-400">
            Bookings recorded as redeemed by the server
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Settlement protocol
            </p>
            <LockKeyhole className="h-5 w-5 text-amber-400" />
          </div>
          <p className="mt-3 text-lg font-extrabold text-white">
            On-site PIN verification
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Server confirms escrow release after checking the booking reference
            and physical check-in PIN.
          </p>
        </article>
      </section>

      <section aria-labelledby="guest-checkins-heading" className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <div className="mb-1 flex items-center gap-2 text-amber-400">
              <Clock3 className="h-4 w-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Escrow secured
              </span>
            </div>
            <h2 id="guest-checkins-heading" className="text-xl font-bold text-white">
              Incoming Guest Check-Ins &amp; Active Bookings
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {activeBookings.length} active{" "}
            {activeBookings.length === 1 ? "booking" : "bookings"}
          </span>
        </div>

        {loading ? (
          <EscrowTableSkeleton rows={3} />
        ) : activeBookings.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <CalendarDays className="mx-auto h-6 w-6 text-slate-500" />
            <p className="mt-3 text-sm font-semibold text-white">
              No active check-ins
            </p>
            <p className="mt-1 text-xs text-slate-400">
              New escrow-locked bookings for this terminal will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {activeBookings.map((booking) => (
              <article
                key={booking.reference}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="font-mono text-xs font-bold text-amber-300">
                      {booking.reference}
                    </p>
                    <h3 className="mt-1 font-bold text-white">
                      {booking.customerName || "Guest"}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {booking.packageName || "Accommodation booking"}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                    <LockKeyhole className="h-3 w-3" />
                    Escrow Locked
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Check-in {formatDate(booking.bookingDate)}
                  </span>
                  <span className="font-semibold text-slate-200">
                    {formatNaira(booking.amountNGN)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        aria-labelledby="verification-heading"
        className="rounded-3xl border border-amber-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-5 shadow-2xl sm:p-8"
      >
        <div className="mb-6 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
            On-site guest verification
          </p>
          <h2 id="verification-heading" className="text-2xl font-extrabold text-white">
            Verify the guest&apos;s check-in
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Confirm the booking reference and the 6-digit PIN presented by the
            guest. The server validates the PIN before recording the escrow
            release.
          </p>
        </div>

        <form onSubmit={handleReleaseEscrow} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="booking-reference"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Booking Reference ID
              </label>
              <input
                id="booking-reference"
                type="text"
                autoComplete="off"
                required
                value={releaseForm.reference}
                onChange={(event) => {
                  setReleaseForm((form) => ({
                    ...form,
                    reference: event.target.value,
                  }));
                  setReleaseStatus(null);
                }}
                placeholder="e.g. CP-DEMO-551902"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
              />
            </div>
            <div>
              <label
                htmlFor="check-in-pin"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                6-Digit Physical Check-In PIN
              </label>
              <input
                id="check-in-pin"
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                pattern="[0-9]{6}"
                maxLength={6}
                value={releaseForm.pin}
                onChange={(event) => {
                  setReleaseForm((form) => ({
                    ...form,
                    pin: event.target.value.replace(/\D/g, "").slice(0, 6),
                  }));
                  setReleaseStatus(null);
                }}
                placeholder="Enter 6-digit PIN"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 font-mono text-sm tracking-[0.3em] text-white outline-none transition placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-600 focus:border-amber-400"
              />
            </div>
          </div>

          {releaseStatus && (
            <div
              role={releaseStatus.success ? "status" : "alert"}
              className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                releaseStatus.success
                  ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-200"
                  : "border-rose-500/30 bg-rose-950/30 text-rose-200"
              }`}
            >
              {releaseStatus.success ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
              )}
              <span className="font-semibold">{releaseStatus.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={releaseLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {releaseLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Verifying check-in...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Verify PIN &amp; Release Funds
              </>
            )}
          </button>
        </form>
      </section>

      <section aria-labelledby="payout-ledger-heading" className="space-y-4">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">
            Settlement history
          </p>
          <h2 id="payout-ledger-heading" className="text-xl font-bold text-white">
            Payouts &amp; Settlement Ledger
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            This ledger reflects server-confirmed escrow release records. The
            current server endpoint does not return a Paystack transfer receipt.
          </p>
        </div>

        {loading && payouts.length === 0 ? (
          <EscrowTableSkeleton rows={3} />
        ) : payouts.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <Wallet className="mx-auto h-6 w-6 text-slate-500" />
            <p className="mt-3 text-sm font-semibold text-white">
              No completed release records
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Completed guest check-ins will appear here after server verification.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-slate-800 bg-slate-950/70 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Booking reference</th>
                    <th className="px-5 py-4 font-semibold">Guest</th>
                    <th className="px-5 py-4 font-semibold">Stay / package</th>
                    <th className="px-5 py-4 font-semibold">Released amount</th>
                    <th className="px-5 py-4 font-semibold">Release date</th>
                    <th className="px-5 py-4 font-semibold">Status / receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {payouts.map((transaction) => (
                    <tr key={transaction.reference} className="text-slate-300">
                      <td className="px-5 py-4 font-mono text-xs font-semibold text-white">
                        {transaction.reference}
                      </td>
                      <td className="px-5 py-4">
                        {transaction.customerName || "Guest"}
                      </td>
                      <td className="px-5 py-4">
                        {transaction.packageName || "Accommodation booking"}
                      </td>
                      <td className="px-5 py-4 font-bold text-emerald-300">
                        {formatNaira(transaction.amountNGN)}
                      </td>
                      <td className="px-5 py-4">{formatDate(transaction.disbursedAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                            <CheckCircle2 className="h-3 w-3" />
                            Redeemed
                          </span>
                          {onOpenVoucher && (
                            <button
                              type="button"
                              onClick={() => onOpenVoucher(transaction)}
                              className="text-xs font-semibold text-amber-300 underline-offset-4 hover:underline"
                            >
                              View record
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
