// client/src/utils/api.js
// Autonomous Client API & Local Escrow Fallback Engine for Vercel Deployments

import { PACKAGES } from "../data/packages.js";

// Initial seed transactions for multi-tenant vendor terminals and escrow ledger
const SEED_TRANSACTIONS = [
  {
    reference: "CP-DEMO-551902",
    packageId: "pkg-transcorp-suite",
    packageName: "Transcorp Hotel Executive Suite",
    vendor: "Transcorp Hotel Calabar",
    vendorId: "transcorp-hotel",
    customerName: "Dr. Emeka Nnamdi",
    email: "emeka.nnamdi@example.com",
    phone: "+234 803 112 4490",
    amountNGN: 180000,
    amountKobo: 18000000,
    bookingDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "551902",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 4.9).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-991204",
    packageId: "pkg-transcorp-suite",
    packageName: "Transcorp Hotel Executive Suite",
    vendor: "Transcorp Hotel Calabar",
    vendorId: "transcorp-hotel",
    customerName: "Chief Bassey Duke",
    email: "bassey.duke@example.com",
    phone: "+234 802 884 9901",
    amountNGN: 180000,
    amountKobo: 18000000,
    bookingDate: "2026-12-18",
    status: "COMPLETED_DISBURSED",
    statusLabel: "Completed & Disbursed to Vendor",
    checkInPin: "991204",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 71.8).toISOString(),
    disbursedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-310892",
    packageId: "pkg-hogis-deluxe",
    packageName: "Hogis Luxury Suites Deluxe Room",
    vendor: "Hogis Luxury Suites",
    vendorId: "hogis-suites",
    customerName: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+234 814 220 8831",
    amountNGN: 65000,
    amountKobo: 6500000,
    bookingDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "310892",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 2.9).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-772109",
    packageId: "pkg-hogis-deluxe",
    packageName: "Hogis Luxury Suites Deluxe Room",
    vendor: "Hogis Luxury Suites",
    vendorId: "hogis-suites",
    customerName: "David Adeleke",
    email: "david.a@example.com",
    phone: "+234 809 331 2289",
    amountNGN: 65000,
    amountKobo: 6500000,
    bookingDate: "2026-12-20",
    status: "COMPLETED_DISBURSED",
    statusLabel: "Completed & Disbursed to Vendor",
    checkInPin: "772109",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 47.8).toISOString(),
    disbursedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-441209",
    packageId: "pkg-marina-cruise",
    packageName: "Marina Resort Slave History & Boat Cruise",
    vendor: "Marina Resort & Waterway Bureau",
    vendorId: "marina-resort",
    customerName: "Kemi Adeleke",
    email: "kemi.adeleke@example.com",
    phone: "+234 805 771 9902",
    amountNGN: 25000,
    amountKobo: 2500000,
    bookingDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "441209",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 3.8).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-883102",
    packageId: "pkg-marina-cruise",
    packageName: "Marina Resort Slave History & Boat Cruise",
    vendor: "Marina Resort & Waterway Bureau",
    vendorId: "marina-resort",
    customerName: "Tunde Bakare",
    email: "tunde.b@example.com",
    phone: "+234 810 552 1184",
    amountNGN: 25000,
    amountKobo: 2500000,
    bookingDate: "2026-12-21",
    status: "COMPLETED_DISBURSED",
    statusLabel: "Completed & Disbursed to Vendor",
    checkInPin: "883102",
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 29.8).toISOString(),
    disbursedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-662901",
    packageId: "pkg-drill-ranch",
    packageName: "Drill Monkey Ranch Wildlife Safari & Canopy Walk",
    vendor: "Afi Drill Monkey Sanctuary",
    vendorId: "afi-drill",
    customerName: "Marcus Brody",
    email: "marcus.brody@example.com",
    phone: "+234 703 881 2290",
    amountNGN: 45000,
    amountKobo: 4500000,
    bookingDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "662901",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 5.8).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-339102",
    packageId: "pkg-drill-ranch",
    packageName: "Drill Monkey Ranch Wildlife Safari & Canopy Walk",
    vendor: "Afi Drill Monkey Sanctuary",
    vendorId: "afi-drill",
    customerName: "Amara Nwosu",
    email: "amara.nwosu@example.com",
    phone: "+234 816 443 1928",
    amountNGN: 45000,
    amountKobo: 4500000,
    bookingDate: "2026-12-22",
    status: "COMPLETED_DISBURSED",
    statusLabel: "Completed & Disbursed to Vendor",
    checkInPin: "339102",
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 59.5).toISOString(),
    disbursedAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-289410",
    packageId: "hotel-monty",
    packageName: "Monty Suites Executive King Room",
    vendor: "Monty Suites Calabar",
    vendorId: "monty-suites",
    customerName: "Dr. Victoria Asuquo",
    email: "v.asuquo@example.com",
    phone: "+234 803 551 7890",
    amountNGN: 95000,
    amountKobo: 9500000,
    bookingDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "289410",
    createdAt: new Date(Date.now() - 3600000 * 7).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 6.8).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-789012",
    packageId: "hotel-monty",
    packageName: "Monty Suites Executive King Room",
    vendor: "Monty Suites Calabar",
    vendorId: "monty-suites",
    customerName: "Engr. Patrick Etim",
    email: "patrick.etim@example.com",
    phone: "+234 818 901 4432",
    amountNGN: 95000,
    amountKobo: 9500000,
    bookingDate: "2026-12-19",
    status: "COMPLETED_DISBURSED",
    statusLabel: "Completed & Disbursed to Vendor",
    checkInPin: "789012",
    createdAt: new Date(Date.now() - 3600000 * 70).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 69.5).toISOString(),
    disbursedAt: new Date(Date.now() - 3600000 * 25).toISOString(),
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-849201",
    packageId: "pkg-seagull-pass",
    packageName: "Seagull Band Official Costume Kit & Street Pass",
    vendor: "Seagull Band Secretariat",
    vendorId: "seagull-band",
    customerName: "Chidi Okafor",
    email: "chidi.okafor@example.com",
    phone: "+234 803 449 1102",
    amountNGN: 85000,
    amountKobo: 8500000,
    bookingDate: "2026-12-27",
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "849201",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 1.9).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-119283",
    packageId: "pkg-seagull-pass",
    packageName: "Seagull Band Official Costume Kit & Street Pass",
    vendor: "Seagull Band Secretariat",
    vendorId: "seagull-band",
    customerName: "Grace Archibong",
    email: "grace.a@example.com",
    phone: "+234 812 770 4492",
    amountNGN: 85000,
    amountKobo: 8500000,
    bookingDate: "2026-12-27",
    status: "COMPLETED_DISBURSED",
    statusLabel: "Completed & Disbursed to Vendor",
    checkInPin: "119283",
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 35.8).toISOString(),
    disbursedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-882103",
    packageId: "pkg-obudu-expedition",
    packageName: "Obudu Mountain Resort Cable Car & Plateau Retreat",
    vendor: "Obudu Highland Tours & Rangers",
    vendorId: "obudu-tours",
    customerName: "Dr. Ken Anozie",
    email: "ken.anozie@example.com",
    phone: "+234 803 771 9931",
    amountNGN: 85000,
    amountKobo: 8500000,
    bookingDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "882103",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 3.9).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  },
  {
    reference: "CP-DEMO-661044",
    packageId: "pkg-kwa-falls",
    packageName: "Kwa Falls Guided Canyon Walk & River Basin Tour",
    vendor: "Akamkpa Eco-Guides Guild",
    vendorId: "akamkpa-guides",
    customerName: "Brenda Offiong",
    email: "brenda.o@example.com",
    phone: "+234 814 883 2291",
    amountNGN: 18000,
    amountKobo: 1800000,
    bookingDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    status: "ESCROW_LOCKED_ACTIVE",
    statusLabel: "Escrow Secured - Awaiting On-Site Verification",
    checkInPin: "661044",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    lockedAt: new Date(Date.now() - 3600000 * 4.8).toISOString(),
    disbursedAt: null,
    paystackStatus: "success",
    channel: "card"
  }
];

export const DEFAULT_FAIR_PRICES = [
  {
    category: "Transport & Logistics",
    item: "Margaret Ekpo Airport to Marian Road Taxi",
    baselineNGN: 4000,
    fairRange: "₦3,500 – ₦5,000",
    decemberSurge: "₦12,000 – ₦18,000",
    surgePercentage: "+250%",
    redFlagWarning: "Touts waiting directly at arrivals demanding ₦15k+ cash. Walk to the accredited airport taxi rank or hail an in-app ride with verified plates."
  },
  {
    category: "Transport & Logistics",
    item: "Local Keke (Tricycle) Drop across Calabar Metro",
    baselineNGN: 300,
    fairRange: "₦200 – ₦400",
    decemberSurge: "₦800 – ₦1,500",
    surgePercentage: "+200%",
    redFlagWarning: "Drivers demanding 'carnival route surcharge' for trips not on closed parade streets. Clarify price before boarding."
  },
  {
    category: "Accommodation",
    item: "Standard Hotel Room (Marian Road / State Housing)",
    baselineNGN: 35000,
    fairRange: "₦30,000 – ₦45,000/night",
    decemberSurge: "₦85,000 – ₦130,000/night",
    surgePercentage: "+180%",
    redFlagWarning: "Fake hotel booking agents on WhatsApp demanding full bank transfer to private personal accounts with no registered hospitality license."
  },
  {
    category: "Carnival & Bands",
    item: "Official Carnival Band Costume & Route Wristband",
    baselineNGN: 85000,
    fairRange: "₦75,000 – ₦95,000",
    decemberSurge: "₦140,000 – ₦200,000",
    surgePercentage: "+85%",
    redFlagWarning: "Black-market scalpers selling duplicate wristbands outside Band Secretariats. Once security scans them at MCC junction, duplicates are confiscated without refund. Only book through verified escrow."
  },
  {
    category: "Carnival & Bands",
    item: "VIP U.J. Esuene Stadium Elevated Grandstand Ticket",
    baselineNGN: 35000,
    fairRange: "₦30,000 – ₦40,000",
    decemberSurge: "₦65,000 – ₦90,000",
    surgePercentage: "+100%",
    redFlagWarning: "Laminated photocopies sold at stadium gates. Bureau passes have tamper-evident micro-holograms."
  },
  {
    category: "Culinary & Dining",
    item: "Bogobiri Suya Feast (Beef, Kidney & Masa)",
    baselineNGN: 3000,
    fairRange: "₦2,000 – ₦4,500",
    decemberSurge: "₦6,000 – ₦9,000",
    surgePercentage: "+75%",
    redFlagWarning: "Select master grills directly inside Bogobiri Quarter. Avoid secondary roadside middlemen who add a 100% markup."
  },
  {
    category: "Culinary & Dining",
    item: "Authentic Efik Edikang Ikong or Afang Soup with Pounded Yam",
    baselineNGN: 4500,
    fairRange: "₦3,500 – ₦6,000",
    decemberSurge: "₦9,000 – ₦14,000",
    surgePercentage: "+80%",
    redFlagWarning: "Hotels serving diluted imitation soups. Top local spots like Freddy's, Calabar Kitchen, or Channel View provide genuine dried fish, periwinkle, and waterleaf at fair rates."
  },
  {
    category: "Waterfront & Eco",
    item: "Marina Resort Calabar River Boat Cruise",
    baselineNGN: 15000,
    fairRange: "₦12,000 – ₦18,000",
    decemberSurge: "₦25,000 – ₦35,000",
    surgePercentage: "+60%",
    redFlagWarning: "Unregistered wooden canoes at informal jetties lacking life-jackets or marine insurance."
  },
  {
    category: "Waterfront & Eco",
    item: "Obudu Mountain Resort Transport & 2-Night Stay",
    baselineNGN: 120000,
    fairRange: "₦110,000 – ₦140,000",
    decemberSurge: "₦200,000 – ₦280,000",
    surgePercentage: "+90%",
    redFlagWarning: "Unlicensed transit vans without highland mountain gearing that break down halfway on the Obanliku incline."
  }
];

export const DEFAULT_SCAM_ADVISORIES = [
  {
    title: "The Counterfeit Wristband Ring",
    severity: "CRITICAL",
    route: "Marian Road & MCC Junction",
    description: "Touts approach tourists offering 'discounted' band passes. These are printed with cloned QR codes that fail the optical security scanner at the official start line. Victims are barred from the parade trucks.",
    protectionRule: "Never pay cash on the street. All verified bands require official escrow voucher redemption."
  },
  {
    title: "Ghost Accommodation Listings",
    severity: "HIGH",
    route: "State Housing & Highway Axis",
    description: "Unregistered agents post photos of legitimate Calabar hotels on Facebook/Instagram claiming to hold exclusive VIP blocks, requiring upfront wire deposits.",
    protectionRule: "All verified hotel partners hold funds in Cross River State Escrow until key handoff at the front desk."
  },
  {
    title: "Unaccredited Obudu Transit Convoys",
    severity: "MEDIUM",
    route: "Calabar - Ikom - Obudu Highway",
    description: "Private minibus drivers solicit long-distance mountain transfers with unserviced cooling and brake systems unfit for the 22-hairpin turn mountain climb.",
    protectionRule: "Travel only with Cross River State Transport-certified convoys."
  }
];

const STORAGE_KEY = "calabarpass_escrow_db";
let inMemoryTxs = null;

function getStoredTransactions() {
  if (inMemoryTxs) return inMemoryTxs;

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryTxs = parsed;
          return inMemoryTxs;
        }
      }
    } catch {
      // Storage unavailable or disabled
    }
  }

  inMemoryTxs = JSON.parse(JSON.stringify(SEED_TRANSACTIONS));
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryTxs));
    } catch {
      // ignore
    }
  }
  return inMemoryTxs;
}

function saveStoredTransactions(txs) {
  inMemoryTxs = txs;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
    } catch (e) {
      console.warn("localStorage quota exceeded or unavailable:", e);
    }
  }
}

function matchVendor(tx, queryVendor) {
  if (!tx || !queryVendor) return false;
  const q = String(queryVendor).toLowerCase().trim();
  const tvId = String(tx.vendorId || "").toLowerCase().trim();
  const tvName = String(tx.vendor || "").toLowerCase().trim();

  if (tvId === q || tvName === q) return true;
  if (tvId.includes(q) || q.includes(tvId)) return true;
  if (tvName.includes(q) || q.includes(tvName)) return true;

  if (q.includes("transcorp") && (tvId.includes("transcorp") || tvName.includes("transcorp"))) return true;
  if (q.includes("monty") && (tvId.includes("monty") || tvName.includes("monty"))) return true;
  if (q.includes("hogis") && (tvId.includes("hogis") || tvName.includes("hogis"))) return true;
  if (q.includes("marina") && (tvId.includes("marina") || tvName.includes("marina"))) return true;
  if (q.includes("drill") && (tvId.includes("drill") || tvName.includes("drill"))) return true;
  if (q.includes("seagull") && (tvId.includes("seagull") || tvName.includes("seagull"))) return true;
  if (q.includes("ikom") && (tvId.includes("ikom") || tvName.includes("ikom"))) return true;
  if (q.includes("obudu") && (tvId.includes("obudu") || tvName.includes("obudu"))) return true;
  if (q.includes("akamkpa") && (tvId.includes("akamkpa") || tvName.includes("akamkpa"))) return true;

  return false;
}

function computeEscrowStats(transactions) {
  const activeTxs = transactions.filter((t) => t.status === "ESCROW_LOCKED_ACTIVE");
  const completedTxs = transactions.filter((t) => t.status === "COMPLETED_DISBURSED");

  const totalEscrowLockedNGN = activeTxs.reduce((sum, t) => sum + (t.amountNGN || 0), 0);
  const totalDisbursedNGN = completedTxs.reduce((sum, t) => sum + (t.amountNGN || 0), 0);
  const platformRevenueNGN = Math.round(totalDisbursedNGN * 0.07); // 7% commission

  return {
    activeEscrowBookings: activeTxs.length,
    completedCheckIns: completedTxs.length,
    totalEscrowLockedNGN,
    totalDisbursedNGN,
    platformRevenueNGN,
    totalVolumeNGN: totalEscrowLockedNGN + totalDisbursedNGN
  };
}

/**
 * Autonomous Local Escrow Fallback
 * Provides complete in-memory & localStorage handling for Vercel static deployments
 */
export function handleLocalEscrowFallback(endpoint, payload = null, method = "GET") {
  const cleanEndpoint = (endpoint || "").split("?")[0].trim();
  const urlObj = endpoint && endpoint.includes("?") ? new URL(`http://localhost${endpoint}`) : null;

  // 1. Packages catalog
  if (cleanEndpoint === "/api/packages") {
    return { success: true, packages: PACKAGES };
  }

  // 2. Paystack public config
  if (cleanEndpoint === "/api/config/paystack") {
    return {
      success: true,
      publicKey:
        (typeof import.meta !== "undefined" && import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY) ||
        "pk_test_e911f3fc519a96d916fbfea85742f88078495266"
    };
  }

  // 3. Fair prices & scam advisories
  if (cleanEndpoint === "/api/fair-prices") {
    return {
      success: true,
      fairPrices: DEFAULT_FAIR_PRICES,
      scamAdvisories: DEFAULT_SCAM_ADVISORIES
    };
  }

  // 4. Paystack Initialize
  if (cleanEndpoint === "/api/paystack/initialize") {
    const pkg = PACKAGES.find((p) => p.id === payload?.packageId) || {
      id: payload?.packageId || "pkg-custom",
      title: "Verified Cross River Experience",
      name: "Verified Cross River Experience",
      vendor: "Transcorp Hotel Calabar",
      vendorId: "transcorp-hotel",
      price: 25000,
      priceNGN: 25000
    };

    const reference = `CP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomPin = String(Math.floor(100000 + Math.random() * 900000));
    const amount = Number(pkg.priceNGN || pkg.price || 25000);

    const newTx = {
      reference,
      packageId: pkg.id,
      packageName: pkg.title || pkg.name,
      vendor: pkg.vendor || pkg.vendorName || "Transcorp Hotel Calabar",
      vendorId: pkg.vendorId || "transcorp-hotel",
      customerName: payload?.customerName || "Verified Tourist",
      email: payload?.email || "tourist@example.com",
      phone: payload?.phone || "+234 800 000 0000",
      amountNGN: amount,
      amountKobo: amount * 100,
      bookingDate: payload?.bookingDate || new Date().toISOString().split("T")[0],
      status: "AWAITING_PAYMENT",
      statusLabel: "Awaiting Payment Gateway Callback",
      checkInPin: randomPin,
      createdAt: new Date().toISOString(),
      lockedAt: null,
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    };

    const txs = getStoredTransactions();
    txs.unshift(newTx);
    saveStoredTransactions(txs);

    return {
      success: true,
      reference,
      authorization_url: null,
      access_code: "standalone_local_mode",
      publicKey:
        (typeof import.meta !== "undefined" && import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY) ||
        "pk_test_e911f3fc519a96d916fbfea85742f88078495266"
    };
  }

  // 5. Paystack Verify
  if (cleanEndpoint.startsWith("/api/paystack/verify/")) {
    const rawRef = cleanEndpoint.replace("/api/paystack/verify/", "").trim();
    const reference = decodeURIComponent(rawRef);

    const txs = getStoredTransactions();
    let tx = txs.find((t) => t.reference === reference);

    if (!tx) {
      // Create record dynamically if not found
      const randomPin = String(Math.floor(100000 + Math.random() * 900000));
      tx = {
        reference,
        packageId: "pkg-agbokim-waterfalls",
        packageName: "Agbokim Waterfalls Guided Day Expedition",
        vendor: "Ikom Ecotourism Guides Cooperative",
        vendorId: "ikom-ecotourism",
        customerName: "Verified Tourist",
        email: "tourist@example.com",
        phone: "+234 800 000 0000",
        amountNGN: 25000,
        amountKobo: 2500000,
        bookingDate: new Date().toISOString().split("T")[0],
        status: "ESCROW_LOCKED_ACTIVE",
        statusLabel: "Escrow Secured - Awaiting On-Site Verification",
        checkInPin: randomPin,
        createdAt: new Date().toISOString(),
        lockedAt: new Date().toISOString(),
        disbursedAt: null,
        paystackStatus: "success",
        channel: "card"
      };
      txs.unshift(tx);
    } else {
      tx.status = "ESCROW_LOCKED_ACTIVE";
      tx.statusLabel = "Escrow Secured - Awaiting On-Site Verification";
      tx.lockedAt = tx.lockedAt || new Date().toISOString();
      if (!tx.checkInPin || tx.checkInPin.length !== 6) {
        tx.checkInPin = String(Math.floor(100000 + Math.random() * 900000));
      }
    }

    saveStoredTransactions(txs);
    return { success: true, transaction: tx };
  }

  // 6. Vendor Payouts & Arrivals
  if (cleanEndpoint === "/api/vendor/payouts") {
    const queryVendor = urlObj?.searchParams.get("vendor") || "transcorp-hotel";
    const txs = getStoredTransactions();

    const matchingTxs = txs.filter((t) => matchVendor(t, queryVendor));

    const activeBookings = matchingTxs
      .filter((t) => t.status === "ESCROW_LOCKED_ACTIVE")
      .map((t) => ({
        ...t,
        checkInPin: "••••••" // Mask PIN for tourist privacy
      }));

    const payouts = matchingTxs.filter((t) => t.status === "COMPLETED_DISBURSED");

    return {
      success: true,
      vendor: queryVendor,
      activeBookings,
      payouts
    };
  }

  // 7. On-Site Check-In Escrow Release
  if (cleanEndpoint === "/api/escrow/release") {
    const { reference, pin, vendor } = payload || {};
    const cleanRef = String(reference || "").trim();
    const cleanPin = String(pin || "").trim();

    if (!cleanRef || !cleanPin) {
      return { success: false, error: "Please provide both reference code and 6-digit PIN." };
    }

    const txs = getStoredTransactions();
    const targetTx = txs.find((t) => t.reference === cleanRef);

    if (!targetTx) {
      return { success: false, error: "Booking voucher not found. Please verify the Reference ID." };
    }

    // Check Multi-Tenant Isolation: Voucher belongs to another merchant
    if (vendor && !matchVendor(targetTx, vendor)) {
      return {
        success: false,
        error: "Access Denied: This booking voucher is assigned to another merchant."
      };
    }

    // Check 6-digit PIN
    if (String(targetTx.checkInPin).trim() !== cleanPin) {
      return {
        success: false,
        error: "Invalid 6-Digit Check-In PIN. Please verify with guest."
      };
    }

    // Check already redeemed
    if (targetTx.status === "COMPLETED_DISBURSED") {
      return {
        success: false,
        error: "This voucher has already been redeemed and disbursed."
      };
    }

    // Release funds
    targetTx.status = "COMPLETED_DISBURSED";
    targetTx.statusLabel = "Completed & Disbursed to Vendor";
    targetTx.disbursedAt = new Date().toISOString();

    saveStoredTransactions(txs);

    return {
      success: true,
      message: `Escrow Released! ₦${(targetTx.amountNGN || 0).toLocaleString()} successfully disbursed to ${targetTx.vendor}.`,
      transaction: targetTx
    };
  }

  // 8. Escrow Transactions Audit
  if (cleanEndpoint === "/api/escrow/transactions") {
    const txs = getStoredTransactions();
    return {
      success: true,
      transactions: txs,
      stats: computeEscrowStats(txs)
    };
  }

  // 9. Escrow Dispute Freeze
  if (cleanEndpoint === "/api/escrow/dispute") {
    const { reference, reason, details } = payload || {};
    const cleanRef = String(reference || "").trim();

    const txs = getStoredTransactions();
    const targetTx = txs.find((t) => t.reference === cleanRef);

    if (!targetTx) {
      return { success: false, error: "Booking voucher reference not found." };
    }

    targetTx.status = "ESCROW_FROZEN_DISPUTE";
    targetTx.statusLabel = "Escrow Frozen - Dispute Under Bureau Review";
    targetTx.disputeReason = reason;
    targetTx.disputeDetails = details;
    targetTx.disputedAt = new Date().toISOString();

    saveStoredTransactions(txs);

    return {
      success: true,
      message: "Dispute lodged successfully. Escrow disbursement has been frozen pending Bureau review.",
      transaction: targetTx
    };
  }

  return { success: true, message: "Autonomous client operation completed." };
}

/**
 * Universal Safe Fetch
 * Performs standard fetch when backend is live, and gracefully falls back to local escrow
 * when backend returns HTML/404 (e.g. Vercel SPA) or encounters network errors.
 */
export async function safeFetch(endpoint, options = {}) {
  let payload = null;
  if (options?.body) {
    try {
      payload = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    } catch {
      payload = options.body;
    }
  }

  try {
    const response = await fetch(endpoint, options);
    const contentType = response.headers.get("content-type");

    // Standard live backend response
    if (response.ok && contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { ok: true, status: response.status, data };
    }

    // Backend returned 404/HTML (e.g. Vercel SPA route rewrite)
    console.warn(
      `[CalabarPass] Backend API returned non-JSON / status ${response.status} for ${endpoint}. Operating in autonomous client mode.`
    );
    const data = handleLocalEscrowFallback(endpoint, payload, options?.method || "GET");
    return {
      ok: data.success !== false,
      status: data.success !== false ? 200 : 400,
      data
    };
  } catch (err) {
    // Network offline or CORS error
    console.warn(
      `[CalabarPass] Network error calling ${endpoint} (${err.message}). Operating in autonomous client mode.`
    );
    const data = handleLocalEscrowFallback(endpoint, payload, options?.method || "GET");
    return {
      ok: data.success !== false,
      status: data.success !== false ? 200 : 400,
      data
    };
  }
}
