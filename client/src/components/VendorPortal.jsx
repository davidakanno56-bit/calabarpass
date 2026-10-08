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
    id: "transcorp",
    apiVendorId: "transcorp-hotel",
    name: "Transcorp Hotel Calabar",
    category: "hotel",
    terminalType: "Executive Hotel",
    bankAccount: "Access Bank ****4102",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Executive Suite",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    aliases: ["transcorp-hotel"],
    demo: ["CP-TRC-260812", "418205", "Dr. Emeka Nnamdi", "Executive Suite", 180000],
  },
  {
    id: "monty-suites",
    apiVendorId: "monty-suites",
    name: "Monty Suites Calabar",
    category: "hotel",
    terminalType: "Executive Hotel",
    bankAccount: "First Bank ****1188",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Executive King Room",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    demo: ["CP-MON-260827", "894213", "Dr. Victoria Asuquo", "Executive King Room", 95000],
  },
  {
    id: "channel-view",
    apiVendorId: "channel-view",
    name: "Channel View Hotel",
    category: "hotel",
    terminalType: "Executive Hotel",
    bankAccount: "Zenith Bank ****2045",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Carnival View Suite",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    demo: ["CP-CHV-260833", "471926", "Nseobong Ekpo", "Carnival View Suite", 65000],
  },
  {
    id: "mega-hilton",
    apiVendorId: "mega-hilton",
    name: "Mega Hilton Hotel",
    category: "hotel",
    terminalType: "Executive Hotel",
    bankAccount: "GTBank ****8839",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Business Deluxe Room",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    demo: ["CP-MGH-260839", "905317", "Imaobong Etta", "Business Deluxe Room", 50000],
  },
  {
    id: "pyramid-hotel",
    apiVendorId: "pyramid-hotel",
    name: "Pyramid Hotel & Suites",
    category: "hotel",
    terminalType: "Executive Hotel",
    bankAccount: "Fidelity Bank ****6210",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Highway Executive Room",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    demo: ["CP-PYR-260841", "306582", "Ekaette Bassey", "Highway Executive Room", 45000],
  },
  {
    id: "hotel-45",
    apiVendorId: "hotel-45",
    name: "Hotel 45 (Forty-Five)",
    category: "hotel",
    terminalType: "Executive Hotel",
    bankAccount: "Stanbic IBTC ****9044",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Marian Boutique Suite",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    demo: ["CP-H45-260843", "713804", "Anietie Duke", "Marian Boutique Suite", 40000],
  },
  {
    id: "tinapa-lakeside",
    apiVendorId: "tinapa-lakeside",
    name: "Tinapa Lakeside Hotel",
    category: "hotel",
    terminalType: "Executive Hotel",
    bankAccount: "UBA ****5518",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Lakeside Retreat Room",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    demo: ["CP-TLH-260845", "182639", "Mfon Okon", "Lakeside Retreat Room", 55000],
  },
  {
    id: "seagull-band",
    apiVendorId: "seagull-band",
    name: "Seagull Carnival Band",
    category: "band",
    terminalType: "Band HQ",
    bankAccount: "Zenith Bank ****9120",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Seagull VIP Carnival Pass",
      dateLabel: "Pickup",
    },
    aliases: ["seagull band secretariat"],
    demo: ["CP-SGB-260819", "625184", "Chidi Okafor", "Seagull VIP Carnival Pass", 85000],
  },
  {
    id: "passion4-band",
    apiVendorId: "passion4-band",
    name: "Passion 4 Band",
    category: "band",
    terminalType: "Band HQ",
    bankAccount: "Access Bank ****7731",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Passion 4 Premium Section Pass",
      dateLabel: "Pickup",
    },
    demo: ["CP-P4B-260847", "631705", "Ene Inyang", "Passion 4 Premium Section Pass", 78000],
  },
  {
    id: "masta-blasta",
    apiVendorId: "masta-blasta",
    name: "Masta Blasta Band",
    category: "band",
    terminalType: "Band HQ",
    bankAccount: "First Bank ****3419",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Masta Blasta Signature Costume Package",
      dateLabel: "Pickup",
    },
    demo: ["CP-MBB-260849", "721436", "Bassey Ibor", "Masta Blasta Signature Costume Package", 82000],
  },
  {
    id: "bayside-band",
    apiVendorId: "bayside-band",
    name: "Bayside Band",
    category: "band",
    terminalType: "Band HQ",
    bankAccount: "GTBank ****6602",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Bayside VIP Route Package",
      dateLabel: "Pickup",
    },
    demo: ["CP-BSB-260851", "842193", "Ofem Ekanem", "Bayside VIP Route Package", 79000],
  },
  {
    id: "freedom-band",
    apiVendorId: "freedom-band",
    name: "Freedom Band",
    category: "band",
    terminalType: "Band HQ",
    bankAccount: "UBA ****4129",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Freedom Carnival Costume & Route Pass",
      dateLabel: "Pickup",
    },
    demo: ["CP-FRB-260853", "513768", "Edim Orok", "Freedom Carnival Costume & Route Pass", 76000],
  },
  {
    id: "obudu-resort",
    apiVendorId: "obudu-tours",
    name: "Obudu Mountain Resort",
    category: "eco",
    terminalType: "Eco-Tourism",
    bankAccount: "GTBank ****7721",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Obudu Mountain Resort Pass",
      dateLabel: "Visit",
    },
    aliases: ["obudu-tours", "obudu highland tours & rangers"],
    demo: ["CP-OBU-260831", "572640", "Dr. Ken Anozie", "Obudu Mountain Resort Pass", 85000],
  },
  {
    id: "marina-resort",
    apiVendorId: "marina-resort",
    name: "Marina Resort & Waterway",
    category: "eco",
    terminalType: "Eco-Tourism",
    bankAccount: "UBA ****3304",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Waterway Cruise Voucher",
      dateLabel: "Visit",
    },
    aliases: ["marina resort & waterway bureau"],
    demo: ["CP-MAR-260823", "301769", "Kemi Adeleke", "Waterway Cruise Voucher", 25000],
  },
  {
    id: "agbokim-falls",
    apiVendorId: "ikom-ecotourism",
    name: "Agbokim Waterfalls Guided Tour",
    category: "eco",
    terminalType: "Eco-Tourism",
    bankAccount: "Zenith Bank ****5401",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Agbokim Waterfalls Guided Trek",
      dateLabel: "Visit",
    },
    aliases: ["ikom-ecotourism", "ikom ecotourism guides cooperative"],
    demo: ["CP-AGB-260855", "740261", "Uduak Ekanem", "Agbokim Waterfalls Guided Trek", 25000],
  },
  {
    id: "kwa-falls",
    apiVendorId: "akamkpa-guides",
    name: "Kwa Falls Canyon & River Basin",
    category: "eco",
    terminalType: "Eco-Tourism",
    bankAccount: "Access Bank ****1932",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Kwa Falls Canyon & River Basin Tour",
      dateLabel: "Visit",
    },
    aliases: ["akamkpa-guides", "akamkpa eco-guides guild"],
    demo: ["CP-KWA-260857", "924615", "Brenda Offiong", "Kwa Falls Canyon & River Basin Tour", 18000],
  },
  {
    id: "drill-ranch",
    apiVendorId: "afi-drill",
    name: "Afi Drill Monkey Ranch & Canopy Walk",
    category: "eco",
    terminalType: "Eco-Tourism",
    bankAccount: "First Bank ****8290",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Afi Drill Monkey Ranch & Canopy Walk Tour",
      dateLabel: "Visit",
    },
    aliases: ["afi-drill", "afi drill monkey sanctuary"],
    demo: ["CP-AFI-260859", "362817", "Marcus Brody", "Afi Drill Monkey Ranch & Canopy Walk Tour", 45000],
  },
];

// Local-only samples keep each terminal demonstrable without impersonating a
// real API release or exposing demo PINs as live booking credentials.
const DEMO_BOOKINGS = Object.fromEntries(
  MERCHANTS.map((merchant, index) => {
    const [reference, pin, customerName, packageName, amountNGN] = merchant.demo;
    const bookingDate = new Date(Date.UTC(2026, 9, 9 + index))
      .toISOString()
      .slice(0, 10);
    return [
      merchant.id,
      [{
        reference,
        pin,
        customerName,
        packageName,
        bookingDate,
        amountNGN,
        vendorId: merchant.id,
        vendor: merchant.name,
        isDemo: true,
      }],
    ];
  }),
);

const VENDOR_API_ROUTES = {
  payouts: "/api/vendor/payouts",
  release: "/api/escrow/release",
};

const PAYOUT_RATE = 0.95;

const DEMO_PAYOUTS = Object.fromEntries(
  MERCHANTS.map((merchant, index) => {
    const [, , customerName, packageName, amountNGN] = merchant.demo;
    const disbursedAt = new Date(Date.UTC(2026, 9, 1 + index, 12)).toISOString();
    return [
      merchant.id,
      [{
        reference: `${merchant.demo[0]}-SETTLED`,
        customerName: `${customerName} (Previous stay)`,
        packageName,
        bookingDate: disbursedAt.slice(0, 10),
        disbursedAt,
        amountNGN,
        vendorId: merchant.id,
        vendor: merchant.name,
        isDemo: true,
      }],
    ];
  }),
);

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
    vendorId === merchant.apiVendorId ||
    (merchant.aliases || []).includes(vendorId) ||
    vendorName === merchant.name.toLowerCase() ||
    (merchant.aliases || []).includes(vendorName)
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
        const endpoint = `${VENDOR_API_ROUTES.payouts}?vendor=${encodeURIComponent(activeMerchant.apiVendorId)}`;
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
            vendor: activeMerchant.apiVendorId,
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
            <optgroup label="Executive Hotels">
              {MERCHANTS.filter((merchant) => merchant.category === "hotel").map(
                (merchant) => (
                  <option key={merchant.id} value={merchant.id}>
                    {merchant.name}
                  </option>
                ),
              )}
            </optgroup>
            <optgroup label="Official Carnival Bands">
              {MERCHANTS.filter((merchant) => merchant.category === "band").map(
                (merchant) => (
                  <option key={merchant.id} value={merchant.id}>
                    {merchant.name}
                  </option>
                ),
              )}
            </optgroup>
            <optgroup label="Eco-Tourism & Attractions">
              {MERCHANTS.filter((merchant) => merchant.category === "eco").map(
                (merchant) => (
                  <option key={merchant.id} value={merchant.id}>
                    {merchant.name}
                  </option>
                ),
              )}
            </optgroup>
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
              {activeMerchant.category === "hotel"
                ? "Accommodations & Executive Hotels"
                : activeMerchant.category === "band"
                  ? "Official Carnival Bands"
                  : "Eco-Tourism & Attractions"}{" "}
              • Active terminal
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
                    {activeMerchant.terms.dateLabel}{" "}
                    {formatDate(booking.bookingDate)}
                  </span>
                  <span className="text-right">
                    <span className="block text-[10px] text-slate-500">
                      {activeMerchant.terms.amountLabel || "Booking value"}
                    </span>
                    <span className="font-semibold text-slate-200">
                      {formatNaira(booking.amountNGN)}
                      {activeMerchant.category === "hotel" ? " / night" : ""}
                    </span>
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
