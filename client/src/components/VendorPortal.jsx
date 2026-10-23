import React, { useCallback, useEffect, useState, useMemo } from "react";
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
  Trash2,
  RotateCcw,
  KeyRound,
  ShieldAlert,
  X,
} from "lucide-react";
import { EscrowTableSkeleton } from "./SkeletonLoader.jsx";
import {
  handleLocalEscrowFallback,
  getStoredVendors,
  clearDynamicTestRegistrations,
  deleteDynamicMerchantListing,
  getStoredDynamicCards,
} from "../utils/api.js";
import AdminVendorQueue from "./AdminVendorQueue.jsx";

const MERCHANTS = [
  // 1. ACCOMMODATIONS (Hotels, Resorts, Suites)
  {
    id: "transcorp",
    apiVendorId: "transcorp-hotel",
    name: "Transcorp Hotel Calabar",
    category: "accommodations",
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
    category: "accommodations",
    terminalType: "Executive Hotel",
    bankAccount: "Zenith Bank ****7890",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "Executive King Room",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    aliases: ["monty-suites"],
    demo: ["CP-MON-260827", "894213", "Dr. Victoria Asuquo", "Executive King Room", 95000],
  },
  {
    id: "hogis-suites",
    apiVendorId: "hogis-suites",
    name: "Hogis Luxury Suites",
    category: "accommodations",
    terminalType: "Boutique Executive Suites",
    bankAccount: "First Bank ****1904",
    terms: {
      incoming: "Guest Check-Ins",
      booking: "Room Bookings",
      item: "Room Type",
      itemExample: "VIP Private Suite",
      dateLabel: "Check-in",
      amountLabel: "Nightly rate",
    },
    aliases: ["hogis-suites"],
    demo: ["CP-HOG-260829", "512903", "Chief Bassey Duke", "VIP Private Suite", 75000],
  },
  {
    id: "channel-view",
    apiVendorId: "channel-view",
    name: "Channel View Hotel",
    category: "accommodations",
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
    category: "accommodations",
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
    category: "accommodations",
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
    category: "accommodations",
    terminalType: "Boutique Hotel",
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
    category: "accommodations",
    terminalType: "Resort Hotel",
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

  // 2. ECO-SITES & HERITAGE (Marina Resort, Agbokim Waterfalls, Drill Ranch, Kwa Falls)
  {
    id: "marina-resort",
    apiVendorId: "marina-resort",
    name: "Marina Resort & Waterway Bureau",
    category: "eco-sites",
    terminalType: "Heritage & Waterfront Bureau",
    bankAccount: "Heritage Bank ****6610",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Waterway Cruise Voucher",
      dateLabel: "Visit",
      amountLabel: "Pass rate",
    },
    aliases: ["marina resort & waterway bureau"],
    demo: ["CP-MAR-260823", "301769", "Kemi Adeleke", "Waterway Cruise Voucher", 25000],
  },
  {
    id: "agbokim-falls",
    apiVendorId: "ikom-ecotourism",
    name: "Ikom Ecotourism Guides Cooperative (Agbokim)",
    category: "eco-sites",
    terminalType: "Eco-Tourism Guides",
    bankAccount: "Zenith Bank ****5401",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Agbokim Waterfalls Guided Trek",
      dateLabel: "Visit",
      amountLabel: "Pass rate",
    },
    aliases: ["ikom-ecotourism", "ikom ecotourism guides cooperative"],
    demo: ["CP-AGB-260855", "740261", "Uduak Ekanem", "Agbokim Waterfalls Guided Trek", 25000],
  },
  {
    id: "drill-ranch",
    apiVendorId: "afi-drill",
    name: "Afi Drill Monkey Sanctuary",
    category: "eco-sites",
    terminalType: "Wildlife Sanctuary",
    bankAccount: "Zenith Bank ****3301",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Afi Drill Monkey Ranch & Canopy Walk Tour",
      dateLabel: "Visit",
      amountLabel: "Pass rate",
    },
    aliases: ["afi-drill", "afi drill monkey sanctuary"],
    demo: ["CP-AFI-260859", "362817", "Marcus Brody", "Afi Drill Monkey Ranch & Canopy Walk Tour", 45000],
  },
  {
    id: "kwa-falls",
    apiVendorId: "akamkpa-guides",
    name: "Akamkpa Eco-Guides Guild (Kwa Falls)",
    category: "eco-sites",
    terminalType: "River Basin Eco-Guides",
    bankAccount: "Access Bank ****1932",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Kwa Falls Canyon & River Basin Tour",
      dateLabel: "Visit",
      amountLabel: "Pass rate",
    },
    aliases: ["akamkpa-guides", "akamkpa eco-guides guild"],
    demo: ["CP-KWA-260857", "924615", "Brenda Offiong", "Kwa Falls Canyon & River Basin Tour", 18000],
  },
  {
    id: "obudu-resort",
    apiVendorId: "obudu-tours",
    name: "Obudu Highland Tours & Rangers",
    category: "eco-sites",
    terminalType: "Highland Sanctuary",
    bankAccount: "GTBank ****7721",
    terms: {
      incoming: "Visitor Admissions",
      booking: "Tour Reservations",
      item: "Pass Type",
      itemExample: "Obudu Mountain Resort Pass",
      dateLabel: "Visit",
      amountLabel: "Pass rate",
    },
    aliases: ["obudu-tours", "obudu highland tours & rangers"],
    demo: ["CP-OBU-260831", "572640", "Dr. Ken Anozie", "Obudu Mountain Resort Pass", 85000],
  },

  // 3. DINING & NIGHTLIFE (Eateries, Seafood Hubs, Lounges)
  {
    id: "crunchies-marian",
    apiVendorId: "crunchies-calabar",
    name: "Crunchies Fast Food & Pastries",
    category: "dining-nightlife",
    terminalType: "Fast Food & Bites",
    bankAccount: "Zenith Bank ****4419",
    terms: {
      incoming: "Diner Check-Ins",
      booking: "Meal Voucher Redemptions",
      item: "Meal Combo",
      itemExample: "Family Crispy Chicken Combo",
      dateLabel: "Redemption Date",
      amountLabel: "Voucher value",
    },
    aliases: ["crunchies-calabar", "crunchies fast food"],
    demo: ["CP-CRU-260861", "482019", "Etim Bassey", "Family Crispy Chicken Combo Pass", 4500],
  },
  {
    id: "supreme-viking",
    apiVendorId: "supreme-viking",
    name: "Supreme Viking Native Kitchen",
    category: "dining-nightlife",
    terminalType: "Native Seafood Kitchen",
    bankAccount: "First Bank ****6281",
    terms: {
      incoming: "Table Reservations",
      booking: "Feast Vouchers",
      item: "Feast Type",
      itemExample: "Fisherman Soup Clay-Pot Feast",
      dateLabel: "Dine-in Date",
      amountLabel: "Feast rate",
    },
    aliases: ["supreme-viking", "supreme viking restaurant"],
    demo: ["CP-VIK-260863", "819402", "Barrister Orok", "Fisherman Soup Clay-Pot Feast", 6500],
  },
  {
    id: "marina-seafood",
    apiVendorId: "marina-seafood",
    name: "Marina Resort Waterfront Seafood Hub",
    category: "dining-nightlife",
    terminalType: "Waterfront Seafood Hub",
    bankAccount: "Heritage Bank ****8102",
    terms: {
      incoming: "Waterfront Diners",
      booking: "Dining Passes",
      item: "Platter Selection",
      itemExample: "Grilled River Catfish Feast",
      dateLabel: "Dine-in Date",
      amountLabel: "Platter rate",
    },
    aliases: ["marina-seafood", "marina waterfront seafood"],
    demo: ["CP-MSF-260865", "630184", "Idongesit Udoh", "Grilled River Catfish Feast Pass", 8500],
  },
  {
    id: "the-arena",
    apiVendorId: "the-arena",
    name: "The Arena Lounge & Grills",
    category: "dining-nightlife",
    terminalType: "VIP Lounge & Grills",
    bankAccount: "Access Bank ****9281",
    terms: {
      incoming: "Lounge Guest List",
      booking: "Table Bookings",
      item: "Lounge Package",
      itemExample: "Courtyard BBQ Platter & Cocktails",
      dateLabel: "Visit Date",
      amountLabel: "Table rate",
    },
    aliases: ["the-arena", "the arena lounge"],
    demo: ["CP-ARN-260867", "529148", "Tunde Lawal", "Courtyard BBQ Platter & Cocktails", 7500],
  },
  {
    id: "mayfair-lounge",
    apiVendorId: "mayfair-lounge",
    name: "Mayfair VIP Lounge & Nightclub",
    category: "dining-nightlife",
    terminalType: "VIP Nightclub",
    bankAccount: "GTBank ****3104",
    terms: {
      incoming: "Guest List Admissions",
      booking: "VIP Table Reservations",
      item: "Table Tier",
      itemExample: "Mezzanine VIP Bottle Service",
      dateLabel: "Club Night",
      amountLabel: "Table rate",
    },
    aliases: ["mayfair-lounge", "mayfair club"],
    demo: ["CP-MAY-260869", "941720", "Chuka Eze", "Mezzanine VIP Bottle Service Pass", 15000],
  },

  // 4. TRADE & EXPO HUB (Business Passes, Trade Fair Booths, Industrial Exhibitors under Ministry of Commerce)
  {
    id: "commerce-ministry",
    apiVendorId: "commerce-ministry",
    name: "Cross River State Ministry of Commerce & Trade Bureau",
    category: "trade-expo",
    terminalType: "Ministry of Commerce",
    bankAccount: "Central Bank / Zenith Revenue ****5001",
    terms: {
      incoming: "Commercial Buyer Clearances",
      booking: "Trade Registrations",
      item: "Pass Specification",
      itemExample: "365 Commercial Buyer & Investor Pass",
      dateLabel: "Accreditation Date",
      amountLabel: "Pass fee",
    },
    aliases: ["commerce-ministry", "ministry of commerce"],
    demo: ["CP-COM-260871", "712490", "Engr. Patrick Etim", "Cross River 365 Commercial Buyer Pass", 35000],
  },
  {
    id: "cicc-trade-expo",
    apiVendorId: "cicc-trade-expo",
    name: "Calabar International Convention Centre (CICC) Trade Expo",
    category: "trade-expo",
    terminalType: "Trade Fair Pavilion",
    bankAccount: "Zenith Bank ****8203",
    terms: {
      incoming: "Exhibitor Check-Ins",
      booking: "Booth Allocations",
      item: "Exhibition Space",
      itemExample: "9sqm SME Shell-Scheme Booth",
      dateLabel: "Exhibition Date",
      amountLabel: "Booth fee",
    },
    aliases: ["cicc-trade-expo", "cicc convention centre"],
    demo: ["CP-CIC-260873", "840192", "Mrs. Folake Adebayo", "9sqm Shell-Scheme Exhibition Booth", 150000],
  },
  {
    id: "tinapa-expo-terminal",
    apiVendorId: "tinapa-expo-terminal",
    name: "Tinapa Free Trade Zone Industrial Authority",
    category: "trade-expo",
    terminalType: "FTZ Industrial Authority",
    bankAccount: "UBA ****7740",
    terms: {
      incoming: "Delegation Clearances",
      booking: "Industrial Tours",
      item: "Delegation Pass",
      itemExample: "FTZ Industrial Park Delegation Pass",
      dateLabel: "Tour Date",
      amountLabel: "Delegation fee",
    },
    aliases: ["tinapa-expo-terminal", "tinapa free trade zone"],
    demo: ["CP-FTZ-260875", "419382", "Alhaji Bello Danjuma", "FTZ Industrial Park Delegation Pass", 50000],
  },

  // 5. CARNIVAL & CULTURE (Carnival Band Passes, Festival Tickets)
  {
    id: "seagull-band",
    apiVendorId: "seagull-band",
    name: "Seagull Band Secretariat",
    category: "carnival-culture",
    terminalType: "Band Secretariat",
    bankAccount: "Zenith Bank ****8821",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Seagull VIP Carnival Pass",
      dateLabel: "Pickup",
      amountLabel: "Pass fee",
    },
    aliases: ["seagull band secretariat", "seagull-band"],
    demo: ["CP-SGB-260819", "625184", "Chidi Okafor", "Seagull VIP Carnival Pass", 85000],
  },
  {
    id: "passion4-band",
    apiVendorId: "passion4-band",
    name: "Passion 4 Band Secretariat",
    category: "carnival-culture",
    terminalType: "Band Secretariat",
    bankAccount: "Access Bank ****7731",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Passion 4 Premium Section Pass",
      dateLabel: "Pickup",
      amountLabel: "Pass fee",
    },
    aliases: ["passion4-band", "passion 4 band"],
    demo: ["CP-P4B-260847", "631705", "Ene Inyang", "Passion 4 Premium Section Pass", 78000],
  },
  {
    id: "masta-blasta",
    apiVendorId: "masta-blasta",
    name: "Masta Blasta Band Secretariat",
    category: "carnival-culture",
    terminalType: "Band Secretariat",
    bankAccount: "First Bank ****3419",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Masta Blasta Signature Costume Package",
      dateLabel: "Pickup",
      amountLabel: "Pass fee",
    },
    aliases: ["masta-blasta", "masta blasta band"],
    demo: ["CP-MBB-260849", "721436", "Bassey Ibor", "Masta Blasta Signature Costume Package", 82000],
  },
  {
    id: "bayside-band",
    apiVendorId: "bayside-band",
    name: "Bayside Band Secretariat",
    category: "carnival-culture",
    terminalType: "Band Secretariat",
    bankAccount: "GTBank ****6602",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Bayside VIP Route Package",
      dateLabel: "Pickup",
      amountLabel: "Pass fee",
    },
    aliases: ["bayside-band"],
    demo: ["CP-BSB-260851", "842193", "Ofem Ekanem", "Bayside VIP Route Package", 79000],
  },
  {
    id: "freedom-band",
    apiVendorId: "freedom-band",
    name: "Freedom Band Secretariat",
    category: "carnival-culture",
    terminalType: "Band Secretariat",
    bankAccount: "UBA ****4129",
    terms: {
      incoming: "Band Registrations",
      booking: "Costume Pickups",
      item: "Band Section Package",
      itemExample: "Freedom Carnival Costume & Route Pass",
      dateLabel: "Pickup",
      amountLabel: "Pass fee",
    },
    aliases: ["freedom-band"],
    demo: ["CP-FRB-260853", "513768", "Edim Orok", "Freedom Carnival Costume & Route Pass", 76000],
  },
  {
    id: "stadium-festival-box",
    apiVendorId: "stadium-festival-box",
    name: "Calabar Festival & Stadium Box Office",
    category: "carnival-culture",
    terminalType: "Festival Box Office",
    bankAccount: "Zenith Bank ****9012",
    terms: {
      incoming: "Gate Admissions",
      booking: "Box Office Tickets",
      item: "Seating Tier",
      itemExample: "VIP Stadium Grandstand Ticket",
      dateLabel: "Event Date",
      amountLabel: "Ticket fee",
    },
    aliases: ["stadium-festival-box", "calabar festival secretariat"],
    demo: ["CP-STB-260877", "931204", "Senator Victor Ndoma", "VIP Stadium Grandstand Ticket", 35000],
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
    (merchant.aliases || []).includes(vendorName) ||
    (merchant.category === "trade-expo" && (vendorId.includes("commerce") || vendorName.includes("commerce") || vendorId.includes("cicc") || vendorName.includes("cicc") || vendorId.includes("trade") || vendorName.includes("trade"))) ||
    (merchant.category === "dining-nightlife" && (vendorId.includes("crunchies") || vendorName.includes("crunchies") || vendorId.includes("viking") || vendorName.includes("viking") || vendorId.includes("arena") || vendorName.includes("arena") || vendorId.includes("mayfair") || vendorName.includes("mayfair")))
  );
};

const withNetPayout = (transaction) => ({
  ...transaction,
  payoutNGN: Math.round((Number(transaction.amountNGN) || 0) * PAYOUT_RATE),
});

export default function VendorPortal({ onOpenVoucher, onLockTerminal, onDynamicCardsChange }) {
  const [registeredVendors, setRegisteredVendors] = useState(() => getStoredVendors());
  const [portalView, setPortalView] = useState("terminal"); // 'terminal' | 'admin'

  const staticIds = useMemo(() => new Set(MERCHANTS.map((m) => m.id)), []);

  // Merge dynamically registered merchants with static baseline merchants
  const allMerchants = useMemo(() => {
    const dynamicFormatted = (registeredVendors || [])
      .filter((v) => !staticIds.has(v.id))
      .map((v) => ({
        id: v.id,
        isDynamic: true,
        apiVendorId: v.apiVendorId || v.id,
        name: v.name || v.businessName,
        category: v.category || "accommodations",
        terminalType: v.terminalType || "Verified Merchant",
        bankAccount: v.bankAccount || "Verified Settlement Account",
        terms: v.terms || {
          incoming: "Guest Check-Ins",
          booking: "Bookings",
          item: "Service",
          itemExample: `${v.name || v.businessName} Pass`,
          dateLabel: "Verification Date",
          amountLabel: "Rate",
        },
        aliases: v.aliases || [v.id],
        demo: v.demo || [
          `CP-${(v.accessCode || "DEMO").replace(/[^A-Z0-9]/g, "")}`,
          "552190",
          "Verified Onboarding Guest",
          `${v.name || v.businessName} Pass`,
          35000,
        ],
      }));
    return [...dynamicFormatted, ...MERCHANTS];
  }, [registeredVendors, staticIds]);

  const dynamicMerchants = useMemo(
    () => (registeredVendors || []).filter((v) => !staticIds.has(v.id)),
    [registeredVendors, staticIds]
  );

  const [activeMerchantId, setActiveMerchantId] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("calabarpass_active_merchant_id");
      if (saved) return saved;
    }
    return MERCHANTS[0].id;
  });

  const [vendorCategoryFilter, setVendorCategoryFilter] = useState("all");
  const [payouts, setPayouts] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [redeemedDemoBookings, setRedeemedDemoBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ledgerError, setLedgerError] = useState("");
  const [releaseForm, setReleaseForm] = useState({ reference: "", pin: "" });
  const [releaseStatus, setReleaseStatus] = useState(null);
  const [releaseLoading, setReleaseLoading] = useState(false);

  // Operator modal state
  const [operatorModal, setOperatorModal] = useState({
    isOpen: false,
    type: "clear", // "clear" | "delete"
    targetVendorId: null,
    targetVendorName: "",
  });
  const [operatorCodeInput, setOperatorCodeInput] = useState("");
  const [operatorError, setOperatorError] = useState("");
  const [operatorLoading, setOperatorLoading] = useState(false);

  const activeMerchant =
    allMerchants.find((merchant) => merchant.id === activeMerchantId) ||
    allMerchants[0] ||
    MERCHANTS[0];

  const isCurrentDynamic = Boolean(activeMerchant?.isDynamic || !staticIds.has(activeMerchant?.id));

  const handleOpenOperatorModal = (type = "clear", targetVendorId = null, targetVendorName = "") => {
    const savedCode =
      typeof window !== "undefined"
        ? sessionStorage.getItem("calabarpass_operator_code") || ""
        : "";
    setOperatorCodeInput(savedCode || "");
    setOperatorError("");
    setOperatorModal({
      isOpen: true,
      type,
      targetVendorId: targetVendorId || (type === "delete" ? activeMerchant.id : null),
      targetVendorName: targetVendorName || (type === "delete" ? activeMerchant.name : ""),
    });
  };

  const handleOperatorSubmit = async (e) => {
    e?.preventDefault();
    setOperatorError("");
    const cleaned = operatorCodeInput.trim().toUpperCase();
    const isMaster = ["CALABAR2026", "3652026", "CALABARPASS", "CP2026"].includes(cleaned);

    if (!isMaster) {
      setOperatorError(
        "Access Denied: Master Operator Code (CALABAR2026) required to authorize this action."
      );
      return;
    }

    setOperatorLoading(true);

    try {
      if (operatorModal.type === "clear") {
        const res = await clearDynamicTestRegistrations(cleaned);
        if (!res.ok || res.data?.success === false) {
          throw new Error(res.data?.error || "Failed to clear test registrations.");
        }
        setRegisteredVendors([]);
        setActiveMerchantId(MERCHANTS[0].id);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("calabarpass_active_merchant_id", MERCHANTS[0].id);
        }
        onDynamicCardsChange?.([]);
        setOperatorModal({
          isOpen: false,
          type: "clear",
          targetVendorId: null,
          targetVendorName: "",
        });
        setReleaseStatus({
          success: true,
          message:
            res.data?.message ||
            "Successfully cleared test registrations. Public directory catalog restored to verified defaults.",
        });
      } else if (operatorModal.type === "delete") {
        const vendorId = operatorModal.targetVendorId || activeMerchant.id;
        const res = await deleteDynamicMerchantListing(vendorId, cleaned);
        if (!res.ok || res.data?.success === false) {
          throw new Error(res.data?.error || "Failed to delete dynamic merchant.");
        }
        setRegisteredVendors((prev) => prev.filter((v) => v.id !== vendorId));
        if (activeMerchantId === vendorId) {
          setActiveMerchantId(MERCHANTS[0].id);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("calabarpass_active_merchant_id", MERCHANTS[0].id);
          }
        }
        const remainingCards = getStoredDynamicCards();
        onDynamicCardsChange?.(remainingCards);
        setOperatorModal({
          isOpen: false,
          type: "delete",
          targetVendorId: null,
          targetVendorName: "",
        });
        setReleaseStatus({
          success: true,
          message:
            res.data?.message ||
            `Merchant removed successfully. Catalog restored to verified baseline.`,
        });
      }
    } catch (err) {
      setOperatorError(err.message || "An error occurred during operator execution.");
    } finally {
      setOperatorLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/vendor/list")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.vendors) && data.vendors.length > 0) {
          setRegisteredVendors(data.vendors);
        }
      })
      .catch(() => {});
  }, []);

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

        const baseDemoBooking = DEMO_BOOKINGS[activeMerchant.id] || (activeMerchant.demo ? [{
          reference: activeMerchant.demo[0],
          pin: activeMerchant.demo[1],
          customerName: activeMerchant.demo[2],
          packageName: activeMerchant.demo[3],
          bookingDate: new Date().toISOString().slice(0, 10),
          amountNGN: activeMerchant.demo[4],
          vendorId: activeMerchant.id,
          vendor: activeMerchant.name,
          isDemo: true,
        }] : []);

        const demoBookings = baseDemoBooking
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
        const baseDemoBooking = DEMO_BOOKINGS[activeMerchant.id] || (activeMerchant.demo ? [{
          reference: activeMerchant.demo[0],
          pin: activeMerchant.demo[1],
          customerName: activeMerchant.demo[2],
          packageName: activeMerchant.demo[3],
          bookingDate: new Date().toISOString().slice(0, 10),
          amountNGN: activeMerchant.demo[4],
          vendorId: activeMerchant.id,
          vendor: activeMerchant.name,
          isDemo: true,
        }] : []);

        setActiveBookings(
          baseDemoBooking
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
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
              <Building2 className="h-4 w-4" />
              <span>Merchant settlement terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenOperatorModal("clear")}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
                title="Operator Reset: Clear dynamic test registrations (requires CALABAR2026)"
              >
                <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                <span>Clear Test Registrations{dynamicMerchants.length > 0 ? ` (${dynamicMerchants.length})` : ""}</span>
              </button>
              <button
                type="button"
                onClick={() => setPortalView(prev => prev === "admin" ? "terminal" : "admin")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  portalView === "admin"
                    ? "bg-amber-500 text-black border-amber-400 shadow-gold-glow"
                    : "bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/30"
                }`}
                title="Toggle Pending Merchant Approvals Queue"
              >
                <Clock3 className="h-3.5 w-3.5" />
                <span>{portalView === "admin" ? "Back to Terminal" : "Pending Approvals"}</span>
              </button>
              {onLockTerminal && (
                <button
                  type="button"
                  onClick={onLockTerminal}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-rose-200 border border-rose-500/30 text-xs font-bold transition cursor-pointer"
                  title="Lock terminal and end merchant operator session"
                >
                  <LockKeyhole className="h-3.5 w-3.5" />
                  <span>Lock Terminal</span>
                </button>
              )}
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {activeMerchant.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Review {activeMerchant.terms.booking.toLowerCase()} and verify
            on-site check-ins for this terminal.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:min-w-80">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Switch active terminal</span>
            <span className="text-[10px] text-amber-400 font-mono">
              {allMerchants.length} Verified Terminals
            </span>
          </div>

          {/* Quick Category Filter for Terminals */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none text-[11px]">
            {[
              { id: "all", label: "All" },
              { id: "accommodations", label: "Accommodations" },
              { id: "eco-sites", label: "Eco-Sites" },
              { id: "dining-nightlife", label: "Dining" },
              { id: "trade-expo", label: "Trade & Expo" },
              { id: "carnival-culture", label: "Carnival" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setVendorCategoryFilter(cat.id)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap transition cursor-pointer ${
                  vendorCategoryFilter === cat.id
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-slate-800/80 text-slate-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <select
            value={activeMerchantId}
            onChange={(event) => setActiveMerchantId(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition hover:border-amber-500/60 focus:border-amber-400 cursor-pointer"
          >
            {(vendorCategoryFilter === "all" || vendorCategoryFilter === "accommodations") && (
              <optgroup label="1. Accommodations (Hotels, Resorts, Suites)">
                {allMerchants.filter((merchant) => merchant.category === "accommodations").map(
                  (merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.name} ({merchant.bankAccount})
                    </option>
                  ),
                )}
              </optgroup>
            )}
            {(vendorCategoryFilter === "all" || vendorCategoryFilter === "eco-sites") && (
              <optgroup label="2. Eco-Sites & Heritage (Marina Resort, Agbokim, Drill Ranch, Kwa Falls)">
                {allMerchants.filter((merchant) => merchant.category === "eco-sites").map(
                  (merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.name} ({merchant.bankAccount})
                    </option>
                  ),
                )}
              </optgroup>
            )}
            {(vendorCategoryFilter === "all" || vendorCategoryFilter === "dining-nightlife") && (
              <optgroup label="3. Dining & Nightlife (Eateries, Seafood Hubs, Lounges)">
                {allMerchants.filter((merchant) => merchant.category === "dining-nightlife").map(
                  (merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.name} ({merchant.bankAccount})
                    </option>
                  ),
                )}
              </optgroup>
            )}
            {(vendorCategoryFilter === "all" || vendorCategoryFilter === "trade-expo") && (
              <optgroup label="4. Trade & Expo Hub (Ministry of Commerce & Exhibitors)">
                {allMerchants.filter((merchant) => merchant.category === "trade-expo").map(
                  (merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.name} ({merchant.bankAccount})
                    </option>
                  ),
                )}
              </optgroup>
            )}
            {(vendorCategoryFilter === "all" || vendorCategoryFilter === "carnival-culture") && (
              <optgroup label="5. Carnival & Culture (Carnival Band Passes & Festivals)">
                {allMerchants.filter((merchant) => merchant.category === "carnival-culture").map(
                  (merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.name} ({merchant.bankAccount})
                    </option>
                  ),
                )}
              </optgroup>
            )}
          </select>
        </div>
      </header>

      {/* Operator Clearinghouse Control Section (Private to Vendor Terminal) */}
      {dynamicMerchants.length > 0 && (
        <section
          aria-label="Clearinghouse operator administration"
          className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-slate-900/80 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-black/40"
        >
          <div className="flex items-start gap-3.5">
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-2.5 text-amber-400 shrink-0">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-bold text-white tracking-wide">Operator Clearinghouse Control: Test Registrations</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-extrabold border border-amber-500/40">
                  {dynamicMerchants.length} Custom Test Registration{dynamicMerchants.length === 1 ? "" : "s"} Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                Custom merchant listings (e.g. Obudu Cattle Ranch) are currently rendering live on the public directory catalog (<strong className="text-slate-300">#directory-catalog</strong>).
                Triggering the reset permanently removes custom registered entries from storage and cleanly restores the directory catalog to verified defaults (strictly locked behind operator key <code className="text-amber-300 font-mono bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/30">CALABAR2026</code>).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {isCurrentDynamic && (
              <button
                type="button"
                onClick={() => handleOpenOperatorModal("delete", activeMerchant.id, activeMerchant.name)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-950/70 hover:bg-rose-900/90 text-rose-200 hover:text-white border border-rose-500/50 text-xs font-extrabold transition shadow-sm cursor-pointer"
                title="Delete this test merchant registration"
              >
                <Trash2 className="h-4 w-4 text-rose-400" />
                <span>Delete Item</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => handleOpenOperatorModal("clear")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs transition shadow-gold-glow cursor-pointer"
              title="Clear all custom test registrations"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear Test Registrations</span>
            </button>
          </div>
        </section>
      )}

      {portalView === "admin" ? (
        <AdminVendorQueue 
          onApprovalSuccess={() => {
            fetch("/api/vendor/list")
              .then(r => r.ok ? r.json() : null)
              .then(d => {
                if (d?.success && Array.isArray(d.vendors)) {
                  setRegisteredVendors(d.vendors);
                }
              })
              .catch(() => {});
          }} 
        />
      ) : (
        <>
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
              {isCurrentDynamic && (
                <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                  Custom Test Registration
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {activeMerchant.category === "accommodations"
                ? "1. Accommodations (Hotels, Resorts, Suites)"
                : activeMerchant.category === "eco-sites"
                  ? "2. Eco-Sites & Heritage (Marina, Agbokim, Drill Ranch, Kwa Falls)"
                  : activeMerchant.category === "dining-nightlife"
                    ? "3. Dining & Nightlife (Eateries, Seafood Hubs, Lounges)"
                    : activeMerchant.category === "trade-expo"
                      ? "4. Trade & Expo Hub (Ministry of Commerce Architecture)"
                      : "5. Carnival & Culture (Band Passes & Festival Tickets)"}{" "}
              • Active Verified Settlement Terminal
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
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {isCurrentDynamic && (
            <button
              type="button"
              onClick={() => handleOpenOperatorModal("delete", activeMerchant.id, activeMerchant.name)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-950/40 hover:bg-rose-900/60 px-3.5 py-2.5 text-xs font-bold text-rose-200 transition cursor-pointer"
              title="Operator Delete: Remove this custom merchant from catalog and terminal"
            >
              <Trash2 className="h-4 w-4 text-rose-400" />
              <span>Delete Item</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => fetchLedger({ quiet: true })}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
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
      </>
      )}

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

      {/* Operator Authorization & Confirmation Modal */}
      {operatorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-md bg-[#0f1523] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="operator-modal-title"
          >
            <button
              type="button"
              onClick={() => setOperatorModal({ isOpen: false, type: "clear", targetVendorId: null, targetVendorName: "" })}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 id="operator-modal-title" className="text-lg font-bold text-white">
                  {operatorModal.type === "clear" ? "Clear Test Registrations" : "Delete Item"}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium">Operator Authentication (CALABAR2026)</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {operatorModal.type === "clear"
                ? `You are about to purge all ${dynamicMerchants.length} custom test merchant registration(s). All custom listings will be removed from state and storage, cleanly restoring the public directory catalog (#directory-catalog) to the default verified listings.`
                : `You are about to permanently delete '${operatorModal.targetVendorName || activeMerchant.name}' from storage, private vendor terminals, and the public directory catalog (#directory-catalog).`}
            </p>

            <form onSubmit={handleOperatorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Master Operator Code <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={operatorCodeInput}
                    onChange={(e) => {
                      setOperatorCodeInput(e.target.value);
                      if (operatorError) setOperatorError("");
                    }}
                    placeholder="Enter CALABAR2026"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder-slate-500 outline-none transition"
                    autoFocus
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Strictly locked to authorized operators</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOperatorCodeInput("CALABAR2026");
                      if (operatorError) setOperatorError("");
                    }}
                    className="text-amber-300 hover:text-amber-200 underline font-mono cursor-pointer"
                  >
                    Use CALABAR2026
                  </button>
                </div>
              </div>

              {operatorError && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{operatorError}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={operatorLoading}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 ${
                    operatorModal.type === "clear"
                      ? "bg-amber-500 hover:bg-amber-400 text-black shadow-gold-glow"
                      : "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {operatorLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : operatorModal.type === "clear" ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Confirm &amp; Clear Registrations</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Confirm &amp; Delete Item</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setOperatorModal({ isOpen: false, type: "clear", targetVendorId: null, targetVendorName: "" })}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
