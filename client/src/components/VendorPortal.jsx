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

const MERCHANTS = [
  {
    id: "transcorp-hotel",
    name: "Transcorp Hotel Calabar",
    category: "Hotel",
    terminalType: "Executive Hotel",
    bankAccount: "Access Bank ****4102",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Executive Suite",
    },
  },
  {
    id: "seagull-band",
    name: "Seagull Carnival Band",
    category: "Carnival Band",
    terminalType: "Band HQ",
    bankAccount: "Zenith Bank ****9120",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Pass Type",
      itemExample: "Seagull VIP Carnival Pass",
    },
  },
  {
    id: "marina-resort",
    name: "Marina Resort & Waterway",
    category: "Eco-Tourism & Attractions",
    terminalType: "Eco-Tourism",
    bankAccount: "UBA ****3304",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Waterway Cruise Voucher",
    },
  },
  {
    id: "monty-suites",
    name: "Monty Suites Calabar",
    category: "Hotel",
    terminalType: "Executive Hotel",
    bankAccount: "First Bank ****1188",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Executive King Room",
    },
  },
  {
    id: "obudu-tours",
    name: "Obudu Mountain Resort",
    category: "Eco-Tourism & Attractions",
    terminalType: "Eco-Tourism",
    bankAccount: "GTBank ****7721",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Obudu Mountain Resort Pass",
    },
  },
];

// Explicitly local samples make each terminal useful in demonstrations.
// They are never sent to the live escrow release endpoint.
const DEMO_BOOKINGS = {
  "transcorp-hotel": [
    {
      reference: "CP-TRC-260812",
      pin: "418205",
      customerName: "Dr. Emeka Nnamdi",
      packageName: "Executive Suite",
      bookingDate: "2026-10-09",
      amountNGN: 180000,
    },
  ],
  "seagull-band": [
    {
      reference: "CP-SGB-260819",
      pin: "625184",
      customerName: "Chidi Okafor",
      packageName: "Seagull VIP Carnival Pass",
      bookingDate: "2026-10-12",
      amountNGN: 85000,
    },
  ],
  "marina-resort": [
    {
      reference: "CP-MAR-260823",
      pin: "301769",
      customerName: "Kemi Adeleke",
      packageName: "Waterway Cruise Voucher",
      bookingDate: "2026-10-13",
      amountNGN: 25000,
    },
  ],
  "monty-suites": [
    {
      reference: "CP-MON-260827",
      pin: "894213",
      customerName: "Dr. Victoria Asuquo",
      packageName: "Executive King Room",
      bookingDate: "2026-10-14",
      amountNGN: 95000,
    },
  ],
  "obudu-tours": [
    {
      reference: "CP-OBU-260831",
      pin: "572640",
      customerName: "Dr. Ken Anozie",
      packageName: "Obudu Mountain Resort Pass",
      bookingDate: "2026-10-15",
      amountNGN: 85000,
    },
  ],
};

const DEMO_PAYOUTS = {
  "transcorp-hotel": [
    {
      reference: "CP-TRC-260601",
      customerName: "Chief Bassey Duke",
      packageName: "Presidential Suite",
      bookingDate: "2026-10-02",
      disbursedAt: "2026-10-02T12:00:00.000Z",
      amountNGN: 160000,
      isDemo: true,
    },
  ],
  "seagull-band": [
    {
      reference: "CP-SGB-260603",
      customerName: "Grace Archibong",
      packageName: "Seagull VIP Carnival Pass",
      bookingDate: "2026-10-03",
      disbursedAt: "2026-10-03T12:00:00.000Z",
      amountNGN: 75000,
      isDemo: true,
    },
  ],
  "marina-resort": [
    {
      reference: "CP-MAR-260605",
      customerName: "Tunde Bakare",
      packageName: "Waterway Sunset Cruise",
      bookingDate: "2026-10-04",
      disbursedAt: "2026-10-04T12:00:00.000Z",
      amountNGN: 30000,
      isDemo: true,
    },
  ],
  "monty-suites": [
    {
      reference: "CP-MON-260607",
      customerName: "Engr. Patrick Etim",
      packageName: "Executive King Room",
      bookingDate: "2026-10-05",
      disbursedAt: "2026-10-05T12:00:00.000Z",
      amountNGN: 85000,
      isDemo: true,
    },
  ],
  "obudu-tours": [
    {
      reference: "CP-OBU-260609",
      customerName: "Amara Nwosu",
      packageName: "Mountain Canopy & Cable Car Pass",
      bookingDate: "2026-10-06",
      disbursedAt: "2026-10-06T12:00:00.000Z",
      amountNGN: 65000,
      isDemo: true,
    },
  ],
};

const VENDOR_API_ROUTES = {
  payouts: "/api/vendor/payouts",
  release: "/api/escrow/release",
};

const PAYOUT_RATE = 0.95;

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

const vendorMatches = (record, merchant) => {
  const vendorId = String(record.vendorId || "").toLowerCase();
  const vendorName = String(record.vendor || "").toLowerCase();
  return (
    vendorId === merchant.id ||
    vendorName === merchant.name.toLowerCase() ||
    (merchant.id === "seagull-band" &&
      vendorName === "seagull band secretariat") ||
    (merchant.id === "marina-resort" &&
      vendorName === "marina resort & waterway bureau") ||
    (merchant.id === "obudu-tours" &&
      vendorName === "obudu highland tours & rangers")
  );
};

const withNetPayout = (transaction) => ({
  ...transaction,
  payoutNGN: Math.round((Number(transaction.amountNGN) || 0) * PAYOUT_RATE),
});

export default function VendorPortal({ onOpenVoucher }) {
  const [activeMerchantId, setActiveMerchantId] = useState(MERCHANTS[0].id);
  const [payouts, setPayouts] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [redeemedDemoBookings, setRedeemedDemoBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ledgerError, setLedgerError] = useState("");
  const [releaseForm, setReleaseForm] = useState({ reference: "", pin: "" });
  const [releaseStatus, setReleaseStatus] = useState(null);
  const [releaseLoading, setReleaseLoading] = useState(false);

  const activeMerchant =
    MERCHANTS.find((merchant) => merchant.id === activeMerchantId) ||
    MERCHANTS[0];

  const fetchLedger = useCallback(
    async ({ quiet = false } = {}) => {
      if (quiet) setRefreshing(true);
      else setLoading(true);
      setLedgerError("");

      try {
        const endpoint = `${VENDOR_API_ROUTES.payouts}?vendor=${encodeURIComponent(activeMerchant.id)}`;
        const data = await requestVendorApi(endpoint);
        if (!data?.success) {
          throw new Error(data?.error || "Unable to load the merchant ledger.");
        }

        const serverBookings = (Array.isArray(data.activeBookings)
          ? data.activeBookings
          : []
        )
          .filter((booking) => vendorMatches(booking, activeMerchant))
          .map((booking) => ({ ...booking, isDemo: false }));
        const serverPayouts = (Array.isArray(data.payouts) ? data.payouts : [])
          .filter((payout) => vendorMatches(payout, activeMerchant))
          .map((payout) => ({ ...payout, isDemo: false }));

        const demoBookings = (DEMO_BOOKINGS[activeMerchant.id] || [])
          .filter(
            (booking) =>
              !(redeemedDemoBookings[activeMerchant.id] || []).some(
                (redeemed) => redeemed.reference === booking.reference,
              ) &&
              !serverBookings.some(
                (serverBooking) => serverBooking.reference === booking.reference,
              ),
          )
          .map((booking) => ({ ...booking, vendorId: activeMerchant.id, isDemo: true }));
        const redeemedPayouts = (redeemedDemoBookings[activeMerchant.id] || []).map(
          withNetPayout,
        );
        const demoPayouts = [
          ...(DEMO_PAYOUTS[activeMerchant.id] || []),
          ...redeemedPayouts,
        ]
          .filter(
            (payout) =>
              !serverPayouts.some(
                (serverPayout) => serverPayout.reference === payout.reference,
              ),
          )
          .map((payout) => ({ ...payout, vendorId: activeMerchant.id }));

        setActiveBookings([...serverBookings, ...demoBookings]);
        setPayouts([...serverPayouts, ...demoPayouts]);
      } catch (error) {
        console.error("Vendor ledger request failed:", error);
        setLedgerError(
          `${error.message || "Unable to load live merchant records."} Showing demo bookings only where available.`,
        );
        setActiveBookings(
          (DEMO_BOOKINGS[activeMerchant.id] || [])
            .filter(
              (booking) =>
                !(redeemedDemoBookings[activeMerchant.id] || []).some(
                  (redeemed) => redeemed.reference === booking.reference,
                ),
            )
            .map((booking) => ({
            ...booking,
            vendorId: activeMerchant.id,
            isDemo: true,
            })),
        );
        setPayouts(
          [
            ...(DEMO_PAYOUTS[activeMerchant.id] || []),
            ...(redeemedDemoBookings[activeMerchant.id] || []).map(
              withNetPayout,
            ),
          ].map((payout) => ({
              ...payout,
              vendorId: activeMerchant.id,
            })),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeMerchant, redeemedDemoBookings],
  );

  useEffect(() => {
    setLoading(true);
    setReleaseForm({ reference: "", pin: "" });
    setReleaseStatus(null);
    fetchLedger();
  }, [fetchLedger]);

  useEffect(() => {
    if (!releaseStatus) return undefined;
    const timer = window.setTimeout(() => setReleaseStatus(null), 5000);
    return () => window.clearTimeout(timer);
  }, [releaseStatus]);

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
      const demoBooking = activeBookings.find(
        (booking) => booking.isDemo && booking.reference === reference,
      );

      if (demoBooking) {
        if (demoBooking.pin !== pin) {
          throw new Error("Invalid physical check-in PIN for this demo booking.");
        }

        const payout = withNetPayout({
          ...demoBooking,
          vendorId: activeMerchant.id,
          vendor: activeMerchant.name,
          status: "COMPLETED_DISBURSED",
          statusLabel: "Demo redeemed • 95% net settlement",
          disbursedAt: new Date().toISOString(),
          isDemo: true,
        });
        setActiveBookings((bookings) =>
          bookings.filter((booking) => booking.reference !== reference),
        );
        setRedeemedDemoBookings((bookings) => ({
          ...bookings,
          [activeMerchant.id]: [
            ...(bookings[activeMerchant.id] || []).filter(
              (item) => item.reference !== reference,
            ),
            payout,
          ],
        }));
        setPayouts((currentPayouts) => [
          payout,
          ...currentPayouts.filter((item) => item.reference !== reference),
        ]);
        setReleaseStatus({
          success: true,
          message: `PIN Verified! Demo booking redeemed • ${formatNaira(payout.payoutNGN)} net settlement (5% platform fee).`,
          isDemo: true,
        });
      } else {
        const data = await requestVendorApi(VENDOR_API_ROUTES.release, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference,
            pin,
            vendor: activeMerchant.id,
          }),
        });

        if (!data?.success) {
          throw new Error(
            data?.error || "PIN verification could not be completed.",
          );
        }

        setReleaseStatus({
          success: true,
          message: `PIN Verified! Escrow Released • ${formatNaira(
            Math.round((Number(data.transaction?.amountNGN) || 0) * PAYOUT_RATE),
          )} net settlement after 5% platform fee.`,
        });
        await fetchLedger({ quiet: true });
      }

      setReleaseForm({ reference: "", pin: "" });
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
    (total, payout) =>
      total +
      (Number(payout.payoutNGN) ||
        Math.round((Number(payout.amountNGN) || 0) * PAYOUT_RATE)),
    0,
  );
  const bookingWord = activeMerchant.terms.booking.toLowerCase();

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
            <Building2 className="h-4 w-4" />
            Merchant settlement terminal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {activeMerchant.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Review {activeMerchant.terms.booking.toLowerCase()} and verify
            on-site check-ins for this terminal.
          </p>
        </div>

        <label className="flex flex-col gap-2 text-xs font-semibold text-slate-400 sm:min-w-80">
          Switch active terminal
          <select
            value={activeMerchantId}
            onChange={(event) => setActiveMerchantId(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition hover:border-amber-500/60 focus:border-amber-400"
          >
            {MERCHANTS.map((merchant) => (
              <option key={merchant.id} value={merchant.id}>
                {merchant.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section
        aria-label="Active terminal and verified settlement account"
        className="flex flex-col gap-5 rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/50 via-slate-900/80 to-slate-900/70 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-bold text-white">{activeMerchant.name}</p>
              <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                {activeMerchant.terminalType}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {activeMerchant.category} • Active terminal
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-slate-800 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified settlement account
          </span>
          <span className="font-mono text-sm font-semibold text-slate-100">
            {activeMerchant.bankAccount}
          </span>
        </div>
        <button
          type="button"
          onClick={() => fetchLedger({ quiet: true })}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
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

      <section
        aria-label="Settlement metrics"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
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
            95% net settlement after the 5% platform fee
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Completed payouts
            </p>
            <CheckCircle2 className="h-5 w-5 text-sky-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">
            {payouts.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Redeemed {activeMerchant.terms.booking.toLowerCase()}
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
            Vendor-scoped escrow validation • 95% net merchant settlement
          </p>
        </article>
      </section>

      <section aria-labelledby="incoming-heading" className="space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <div className="mb-1 flex items-center gap-2 text-amber-400">
              <Clock3 className="h-4 w-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Escrow secured
              </span>
            </div>
            <h2 id="incoming-heading" className="text-xl font-bold text-white">
              Incoming {activeMerchant.terms.incoming} &amp;{" "}
              {activeMerchant.terms.booking}
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
              No active {bookingWord}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              New escrow-locked {bookingWord} for this terminal will appear
              here.
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
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-xs font-bold text-amber-300">
                        {booking.reference}
                      </p>
                      {booking.isDemo && (
                        <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                          Demo
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-bold text-white">
                      {booking.customerName || "Guest"}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {activeMerchant.terms.item}:{" "}
                      {booking.packageName || activeMerchant.terms.itemExample}
                    </p>
                    {booking.isDemo && (
                      <p className="mt-2 font-mono text-[11px] text-slate-500">
                        Demo PIN: <span className="text-slate-300">{booking.pin}</span>
                      </p>
                    )}
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
            On-site terminal • {activeMerchant.terminalType}
          </p>
          <h2
            id="verification-heading"
            className="text-2xl font-extrabold text-white"
          >
            Verify the guest&apos;s check-in
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Confirm the booking reference and the 6-digit PIN presented by the
            guest before releasing escrow.
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

      <section aria-labelledby="ledger-heading" className="space-y-4">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">
            Settlement history
          </p>
          <h2 id="ledger-heading" className="text-xl font-bold text-white">
            Payouts &amp; Settlement Ledger
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            {activeMerchant.name} only • Merchant settlement is displayed net
            of the 5% platform fee.
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
              Completed {bookingWord} will appear here after verification.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="border-b border-slate-800 bg-slate-950/70 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Booking reference</th>
                    <th className="px-5 py-4 font-semibold">Guest / visitor</th>
                    <th className="px-5 py-4 font-semibold">
                      {activeMerchant.terms.item}
                    </th>
                    <th className="px-5 py-4 font-semibold">Net settlement</th>
                    <th className="px-5 py-4 font-semibold">Release date</th>
                    <th className="px-5 py-4 font-semibold">Status / record</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {payouts.map((transaction) => {
                    const netAmount =
                      Number(transaction.payoutNGN) ||
                      Math.round(
                        (Number(transaction.amountNGN) || 0) * PAYOUT_RATE,
                      );
                    return (
                      <tr
                        key={transaction.reference}
                        className="text-slate-300"
                      >
                        <td className="px-5 py-4">
                          <div className="font-mono text-xs font-semibold text-white">
                            {transaction.reference}
                          </div>
                          {transaction.isDemo && (
                            <span className="mt-1 inline-flex rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                              Demo
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {transaction.customerName || "Guest"}
                        </td>
                        <td className="px-5 py-4">
                          {transaction.packageName ||
                            activeMerchant.terms.itemExample}
                        </td>
                        <td className="px-5 py-4 font-bold text-emerald-300">
                          {formatNaira(netAmount)}
                        </td>
                        <td className="px-5 py-4">
                          {formatDate(transaction.disbursedAt)}
                        </td>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {releaseStatus && (
        <div
          role={releaseStatus.success ? "status" : "alert"}
          aria-live="polite"
          className={`fixed right-4 top-4 z-50 flex max-w-md items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-2xl ${
            releaseStatus.success
              ? "border-emerald-500/30 bg-emerald-950 text-emerald-100"
              : "border-rose-500/30 bg-rose-950 text-rose-100"
          }`}
        >
          {releaseStatus.success ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
          )}
          <span>{releaseStatus.message}</span>
          {releaseStatus.isDemo && (
            <span className="ml-1 shrink-0 rounded-full border border-slate-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300">
              Demo
            </span>
          )}
        </div>
      )}
    </main>
  );
}
