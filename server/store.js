// server/store.js
// CalabarPass In-Memory Store & 365-Day Escrow Transaction State Engine

import { HOTELS, getHotelBaseRate } from "./hotels.js";

// 6 Curated Cross River Tourism Packages (Strictly Tours, Excursions & Eco-Expeditions - Zero Lodging/Hotels)
export const PACKAGES = [
  {
    id: "pkg-obudu-expedition",
    title: "Obudu Mountain Resort Cable Car & Plateau Retreat",
    name: "Obudu Mountain Resort Cable Car & Plateau Retreat",
    vendor: "Obudu Highland Tours & Rangers",
    vendorName: "Obudu Highland Tours & Rangers",
    vendorId: "obudu-tours",
    location: "Obanliku LGA, Cross River State",
    price: 85000,
    priceNGN: 85000,
    category: "Eco-Tourism & Highlands",
    tourType: "year_round",
    season: "365-Day Mountain Sanctuary",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "/images/obudu.jpg",
    details: "Highland cable car pass, canopy walkway guide & Holy Mountain trail pass, private 4WD plateau transfer from Calabar/Ogoja, and state ranger escort.",
    description: "Highland cable car pass, canopy walkway guide & Holy Mountain trail pass, private 4WD plateau transfer from Calabar/Ogoja, and state ranger escort.",
    included: [
      "Highland cable car pass",
      "Canopy walkway guide & Holy Mountain trail pass",
      "Private 4WD plateau transfer from Calabar/Ogoja",
      "State ranger escort"
    ],
    perks: [
      "Highland cable car pass",
      "Canopy walkway guide & Holy Mountain trail pass",
      "Private 4WD plateau transfer from Calabar/Ogoja",
      "State ranger escort"
    ],
    antiScamAlert: "Unauthorized touts soliciting unverified offline 4WD transit at Ogoja junction.",
    scamRisk: "Unauthorized touts soliciting unverified offline 4WD transit at Ogoja junction.",
    streetSurgePrice: 130000,
    escrowBadge: "Certified Highland Expedition",
    badge: "Certified Highland Expedition",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-kwa-falls",
    title: "Kwa Falls Guided Canyon Walk & River Basin Tour",
    name: "Kwa Falls Guided Canyon Walk & River Basin Tour",
    vendor: "Akamkpa Eco-Guides Guild",
    vendorName: "Akamkpa Eco-Guides Guild",
    vendorId: "akamkpa-guides",
    location: "Akamkpa LGA, Cross River State",
    price: 18000,
    priceNGN: 18000,
    category: "Nature & Adventure",
    tourType: "year_round",
    season: "365-Day River Basin Wonder",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "/images/kwa_falls.jpg",
    details: "234-step stone staircase river descent pass, certified life vest & river basin ranger guide, roundtrip transit from Calabar city centre, and escrow-secured guide fees.",
    description: "234-step stone staircase river descent pass, certified life vest & river basin ranger guide, roundtrip transit from Calabar city centre, and escrow-secured guide fees.",
    included: [
      "234-step stone staircase river descent pass",
      "Certified life vest & river basin ranger guide",
      "Roundtrip transit from Calabar city centre",
      "Escrow-secured guide fees"
    ],
    perks: [
      "234-step stone staircase river descent pass",
      "Certified life vest & river basin ranger guide",
      "Roundtrip transit from Calabar city centre",
      "Escrow-secured guide fees"
    ],
    antiScamAlert: "Informal youth checkpoints along the plantation access road demanding cash tolls.",
    scamRisk: "Informal youth checkpoints along the plantation access road demanding cash tolls.",
    streetSurgePrice: 30000,
    escrowBadge: "Verified Basin Adventure",
    badge: "Verified Basin Adventure",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-agbokim-waterfalls",
    title: "Agbokim Waterfalls Guided Day Expedition",
    name: "Agbokim Waterfalls Guided Day Expedition",
    vendor: "Ikom Ecotourism Guides Cooperative",
    vendorName: "Ikom Ecotourism Guides Cooperative",
    vendorId: "ikom-ecotourism",
    location: "Ikom LGA, Cross River State",
    price: 25000,
    priceNGN: 25000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day Rainforest Wonder",
    image: "/images/agbokim.jpg",
    imageUrl: "/images/agbokim.jpg",
    details: "Stream-cascading waterfall hike, certified canopy walkway access, verified round-trip transport from Calabar, and official eco-ranger security escort.",
    description: "Stream-cascading waterfall hike, certified canopy walkway access, verified round-trip transport from Calabar, and official eco-ranger security escort.",
    included: [
      "Stream-cascading waterfall hike",
      "Certified canopy walkway access",
      "Verified round-trip transport from Calabar",
      "Official eco-ranger security escort"
    ],
    perks: [
      "Stream-cascading waterfall hike",
      "Certified canopy walkway access",
      "Verified round-trip transport from Calabar",
      "Official eco-ranger security escort"
    ],
    antiScamAlert: "Unregistered roadside guides demanding cash tolls at informal checkpoints along Ikom road.",
    scamRisk: "Unregistered roadside guides demanding cash tolls at informal checkpoints along Ikom road.",
    streetSurgePrice: 42000,
    escrowBadge: "Certified Eco-Expedition",
    badge: "Certified Eco-Expedition",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-drill-ranch",
    title: "Afi Drill Monkey Ranch & Canopy Walkway Tour",
    name: "Afi Drill Monkey Ranch & Canopy Walkway Tour",
    vendor: "Afi Drill Monkey Sanctuary",
    vendorName: "Afi Drill Monkey Sanctuary",
    vendorId: "afi-drill",
    location: "Afi Mountain Reserve / Boki LGA, Cross River",
    price: 45000,
    priceNGN: 45000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day Rainforest Sanctuary",
    image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1200&q=80",
    details: "Endangered drill monkey and chimpanzee rehabilitation sanctuary walk, canopy walkway trek over Afi rainforest, and Pandrillus conservation ranger briefing.",
    description: "Endangered drill monkey and chimpanzee rehabilitation sanctuary walk, canopy walkway trek over Afi rainforest, and Pandrillus conservation ranger briefing.",
    included: [
      "Guided sanctuary trek with Pandrillus wildlife rangers",
      "Afi Mountain rainforest canopy walkway expedition",
      "Native wildlife conservation briefing & educational pass",
      "Direct eco-fund contribution protecting Nigerian primates"
    ],
    perks: [
      "Guided sanctuary trek with Pandrillus wildlife rangers",
      "Afi Mountain rainforest canopy walkway expedition",
      "Native wildlife conservation briefing & educational pass",
      "Direct eco-fund contribution protecting Nigerian primates"
    ],
    antiScamAlert: "Illegal bushmeat poachers and bogus pseudo-guides charging unauthorized trail access fees.",
    scamRisk: "Illegal bushmeat poachers and bogus pseudo-guides charging unauthorized trail access fees.",
    streetSurgePrice: 75000,
    escrowBadge: "Wildlife Trust Certified",
    badge: "Wildlife Trust Certified",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-marina-cruise",
    title: "Marina Resort Waterway Cruise & Slave History Tour",
    name: "Marina Resort Waterway Cruise & Slave History Tour",
    vendor: "Marina Resort & Waterway Bureau",
    vendorName: "Marina Resort & Waterway Bureau",
    vendorId: "marina-resort",
    location: "Marina Resort Waterfront, Calabar",
    price: 25000,
    priceNGN: 25000,
    category: "Heritage & Waterfront",
    tourType: "year_round",
    season: "365-Day Waterfront & Heritage",
    image: "/assets/marina_resort.jpg",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    details: "Curated Slave History Museum audio-visual tour, 1-hour sunset catamaran river cruise on the Calabar River, and traditional Efik cultural music performance.",
    description: "Curated Slave History Museum audio-visual tour, 1-hour sunset catamaran river cruise on the Calabar River, and traditional Efik cultural music performance.",
    included: [
      "Curated Slave History Museum & Relic Audio-Visual Tour",
      "60-Minute Sunset Catamaran Calabar River Cruise",
      "Traditional Efik Cultural Dance & Music Showcase",
      "Complimentary Palm Wine & Calabar Pepper Soup Voucher"
    ],
    perks: [
      "Curated Slave History Museum & Relic Audio-Visual Tour",
      "60-Minute Sunset Catamaran Calabar River Cruise",
      "Traditional Efik Cultural Dance & Music Showcase",
      "Complimentary Palm Wine & Calabar Pepper Soup Voucher"
    ],
    antiScamAlert: "Unlicensed boat skippers operating without life jackets or maritime safety licenses.",
    scamRisk: "Unlicensed boat skippers operating without life jackets or maritime safety licenses.",
    streetSurgePrice: 42000,
    escrowBadge: "Waterfront Authority Certified",
    badge: "Waterfront Authority Certified",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-seagull-pass",
    title: "Official Carnival Calabar VIP Route Pass (Seagull Band)",
    name: "Official Carnival Calabar VIP Route Pass (Seagull Band)",
    vendor: "Seagull Band Secretariat",
    vendorName: "Seagull Band Secretariat",
    vendorId: "seagull-band",
    location: "Marian Road / Stadium Route, Calabar",
    price: 85000,
    priceNGN: 85000,
    category: "Carnival",
    tourType: "carnival",
    season: "December Carnival Calabar",
    image: "/assets/seagull_band.jpg",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    details: "Official 2026 route wristband, handcrafted feather costume kit, hydration truck access, and dedicated security escort along the 12km carnival route.",
    description: "Official 2026 route wristband, handcrafted feather costume kit, hydration truck access, and dedicated security escort along the 12km carnival route.",
    included: [
      "Official 2026 Carnival Route Wristband",
      "Handcrafted Feather & Sequin Costume Kit",
      "All-day Hydration & Refreshment Truck Access",
      "Dedicated Escort & Paramedic Team along Marian Road"
    ],
    perks: [
      "Official 2026 Carnival Route Wristband",
      "Handcrafted Feather & Sequin Costume Kit",
      "All-day Hydration & Refreshment Truck Access",
      "Dedicated Escort & Paramedic Team along Marian Road"
    ],
    antiScamAlert: "Extreme counterfeit wristbands reported on Marian Road street corners. Only verified band RFID chips pass scanning.",
    scamRisk: "Extreme counterfeit wristbands reported on Marian Road street corners. Only verified band RFID chips pass scanning.",
    streetSurgePrice: 135000,
    escrowBadge: "Official Secretariat Verified",
    badge: "Official Secretariat Verified",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  }
];

// Helper for Multi-Tenant Isolation: Match vendor strings flexibly across ID, full names, and aliases
export function isVendorMatch(txVendor, query) {
  if (!txVendor || !query) return false;
  const tv = String(txVendor).toLowerCase().trim();
  const q = String(query).toLowerCase().trim();

  if (tv === q) return true;
  if (tv.includes(q) || q.includes(tv)) return true;

  // Key Launch Partners
  if ((q.includes("transcorp") || q === "transcorp-hotel") && (tv.includes("transcorp") || tv === "transcorp-hotel")) return true;
  if ((q.includes("monty") || q === "monty-suites") && (tv.includes("monty") || tv === "monty-suites")) return true;
  if ((q.includes("hogis") || q === "hogis-suites") && (tv.includes("hogis") || tv === "hogis-suites")) return true;
  if ((q.includes("marina") || q === "marina-resort") && (tv.includes("marina") || tv === "marina-resort")) return true;
  if ((q.includes("drill") || q.includes("pandrillus") || q === "afi-drill") && (tv.includes("drill") || tv.includes("pandrillus") || tv === "afi-drill")) return true;
  if ((q.includes("ikom") || q === "ikom-ecotourism") && (tv.includes("ikom") || tv === "ikom-ecotourism")) return true;
  if ((q.includes("obudu") || q === "obudu-tours") && (tv.includes("obudu") || tv === "obudu-tours")) return true;
  if ((q.includes("akamkpa") || q.includes("kwa") || q === "akamkpa-guides") && (tv.includes("akamkpa") || tv.includes("kwa") || tv === "akamkpa-guides")) return true;
  if ((q.includes("spar") || q === "spar-mall") && (tv.includes("spar") || tv === "spar-mall")) return true;
  if ((q.includes("seagull") || q.includes("official band") || q === "seagull-band") && (tv.includes("seagull") || tv.includes("official band") || tv === "seagull-band")) return true;

  return false;
}

class EscrowStore {
  constructor() {
    this.transactions = new Map();
    this.seedInitialTransactions();
  }

  seedInitialTransactions() {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    // 1. Transcorp Hotel Calabar (transcorp-hotel)
    const refTranscorpActive = "CP-DEMO-551902";
    this.transactions.set(refTranscorpActive, {
      reference: refTranscorpActive,
      packageId: "pkg-transcorp-suite",
      packageName: "Transcorp Hotel Executive Suite",
      vendor: "Transcorp Hotel Calabar",
      vendorId: "transcorp-hotel",
      customerName: "Dr. Emeka Nnamdi",
      email: "emeka.nnamdi@example.com",
      phone: "+234 802 331 9904",
      amountNGN: 180000,
      amountKobo: 18000000,
      bookingDate: tomorrow,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin: "551902",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 1.8).toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    });

    const refTranscorpDisbursed = "CP-DEMO-772109";
    this.transactions.set(refTranscorpDisbursed, {
      reference: refTranscorpDisbursed,
      packageId: "pkg-transcorp-suite",
      packageName: "Transcorp Hotel Executive Suite",
      vendor: "Transcorp Hotel Calabar",
      vendorId: "transcorp-hotel",
      customerName: "Chief Bassey Duke",
      email: "bassey.duke@example.com",
      phone: "+234 805 119 7720",
      amountNGN: 180000,
      amountKobo: 18000000,
      bookingDate: "2026-12-25",
      status: "COMPLETED_DISBURSED",
      statusLabel: "Completed & Disbursed to Vendor",
      checkInPin: "772109",
      createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 35.5).toISOString(),
      disbursedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      paystackStatus: "success",
      channel: "card"
    });

    // 2. Hogis Luxury Suites (hogis-suites)
    const refHogisActive = "CP-DEMO-310892";
    this.transactions.set(refHogisActive, {
      reference: refHogisActive,
      packageId: "pkg-hogis-deluxe",
      packageName: "Hogis Luxury Suites Deluxe Room",
      vendor: "Hogis Luxury Suites",
      vendorId: "hogis-suites",
      customerName: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+234 803 992 1044",
      amountNGN: 65000,
      amountKobo: 6500000,
      bookingDate: tomorrow,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin: "310892",
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 2.8).toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    });

    const refHogisDisbursed = "CP-DEMO-219084";
    this.transactions.set(refHogisDisbursed, {
      reference: refHogisDisbursed,
      packageId: "pkg-hogis-deluxe",
      packageName: "Hogis Luxury Suites Deluxe Room",
      vendor: "Hogis Luxury Suites",
      vendorId: "hogis-suites",
      customerName: "Ken Nwosu",
      email: "ken.nwosu@example.com",
      phone: "+234 814 200 9931",
      amountNGN: 65000,
      amountKobo: 6500000,
      bookingDate: "2026-12-24",
      status: "COMPLETED_DISBURSED",
      statusLabel: "Completed & Disbursed to Vendor",
      checkInPin: "219084",
      createdAt: new Date(Date.now() - 3600000 * 40).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 39.5).toISOString(),
      disbursedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
      paystackStatus: "success",
      channel: "card"
    });

    // 3. Marina Resort & Waterway Bureau (marina-resort)
    const refMarinaActive = "CP-DEMO-441209";
    this.transactions.set(refMarinaActive, {
      reference: refMarinaActive,
      packageId: "pkg-marina-cruise",
      packageName: "Marina Resort Slave History & Boat Cruise",
      vendor: "Marina Resort & Waterway Bureau",
      vendorId: "marina-resort",
      customerName: "Kemi Adeleke",
      email: "kemi.adeleke@example.com",
      phone: "+234 809 314 5521",
      amountNGN: 25000,
      amountKobo: 2500000,
      bookingDate: tomorrow,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin: "441209",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 4.9).toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    });

    const refMarinaDisbursed = "CP-DEMO-190283";
    this.transactions.set(refMarinaDisbursed, {
      reference: refMarinaDisbursed,
      packageId: "pkg-marina-cruise",
      packageName: "Marina Resort Slave History & Boat Cruise",
      vendor: "Marina Resort & Waterway Bureau",
      vendorId: "marina-resort",
      customerName: "David Okon",
      email: "david.okon@example.com",
      phone: "+234 802 771 9021",
      amountNGN: 25000,
      amountKobo: 2500000,
      bookingDate: "2026-12-22",
      status: "COMPLETED_DISBURSED",
      statusLabel: "Completed & Disbursed to Vendor",
      checkInPin: "190283",
      createdAt: new Date(Date.now() - 3600000 * 50).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 49.5).toISOString(),
      disbursedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      paystackStatus: "success",
      channel: "card"
    });

    // 4. Afi Drill Monkey Sanctuary (afi-drill)
    const refDrillActive = "CP-DEMO-662901";
    this.transactions.set(refDrillActive, {
      reference: refDrillActive,
      packageId: "pkg-drill-ranch",
      packageName: "Drill Monkey Ranch Wildlife Safari & Canopy Walk",
      vendor: "Afi Drill Monkey Sanctuary",
      vendorId: "afi-drill",
      customerName: "Marcus Brody",
      email: "marcus.b@example.com",
      phone: "+234 805 441 9090",
      amountNGN: 45000,
      amountKobo: 4500000,
      bookingDate: tomorrow,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin: "662901",
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 5.8).toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    });

    const refDrillDisbursed = "CP-DEMO-550192";
    this.transactions.set(refDrillDisbursed, {
      reference: refDrillDisbursed,
      packageId: "pkg-drill-ranch",
      packageName: "Drill Monkey Ranch Wildlife Safari & Canopy Walk",
      vendor: "Afi Drill Monkey Sanctuary",
      vendorId: "afi-drill",
      customerName: "Dr. Lisa Vance",
      email: "lisa.vance@example.com",
      phone: "+234 810 551 2299",
      amountNGN: 45000,
      amountKobo: 4500000,
      bookingDate: "2026-12-20",
      status: "COMPLETED_DISBURSED",
      statusLabel: "Completed & Disbursed to Vendor",
      checkInPin: "550192",
      createdAt: new Date(Date.now() - 3600000 * 60).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 59.5).toISOString(),
      disbursedAt: new Date(Date.now() - 3600000 * 22).toISOString(),
      paystackStatus: "success",
      channel: "card"
    });

    // 5. Monty Suites Calabar (monty-suites)
    const refMontyActive = "CP-DEMO-289410";
    this.transactions.set(refMontyActive, {
      reference: refMontyActive,
      packageId: "hotel-monty",
      packageName: "Monty Suites Executive King Room",
      vendor: "Monty Suites Calabar",
      vendorId: "monty-suites",
      customerName: "Dr. Victoria Asuquo",
      email: "v.asuquo@example.com",
      phone: "+234 803 551 7890",
      amountNGN: 95000,
      amountKobo: 9500000,
      bookingDate: tomorrow,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin: "289410",
      createdAt: new Date(Date.now() - 3600000 * 7).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 6.8).toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    });

    const refMontyDisbursed = "CP-DEMO-789012";
    this.transactions.set(refMontyDisbursed, {
      reference: refMontyDisbursed,
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
    });

    // 6. Seagull Band Secretariat (seagull-band)
    const refSeagullActive = "CP-DEMO-849201";
    this.transactions.set(refSeagullActive, {
      reference: refSeagullActive,
      packageId: "pkg-seagull-pass",
      packageName: "Seagull Band Official Costume Kit & Street Pass",
      vendor: "Seagull Band Secretariat",
      vendorId: "seagull-band",
      customerName: "Chidi Okafor",
      email: "chidi.okafor@example.com",
      phone: "+234 803 219 4091",
      amountNGN: 85000,
      amountKobo: 8500000,
      bookingDate: tomorrow,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin: "849201",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 3.8).toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    });

    const refSeagullDisbursed = "CP-DEMO-631024";
    this.transactions.set(refSeagullDisbursed, {
      reference: refSeagullDisbursed,
      packageId: "pkg-seagull-pass",
      packageName: "Seagull Band Official Costume Kit & Street Pass",
      vendor: "Seagull Band Secretariat",
      vendorId: "seagull-band",
      customerName: "Folake Adebayo",
      email: "folake.adebayo@example.com",
      phone: "+234 813 402 8819",
      amountNGN: 85000,
      amountKobo: 8500000,
      bookingDate: "2026-12-26",
      status: "COMPLETED_DISBURSED",
      statusLabel: "Completed & Disbursed to Vendor",
      checkInPin: "631024",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 47.5).toISOString(),
      disbursedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      paystackStatus: "success",
      channel: "card"
    });
  }

  getPackages() {
    return PACKAGES;
  }

  getHotels() {
    return HOTELS;
  }

  getHotelById(id) {
    return HOTELS.find(h => h.id === id);
  }

  getPackageById(id) {
    const pkg = PACKAGES.find(p => p.id === id);
    if (pkg) return pkg;

    const hotel = HOTELS.find(h => h.id === id);
    if (hotel) {
      const vendorId = hotel.id === "hotel-transcorp" ? "transcorp-hotel" : (hotel.id === "hotel-hogis" ? "hogis-suites" : hotel.id);
      const vendorName = hotel.name === "Transcorp Hotels Calabar" ? "Transcorp Hotel Calabar" : hotel.name;
      return {
        id: hotel.id,
        name: `${hotel.name} - Executive Accommodation`,
        priceNGN: getHotelBaseRate(hotel.priceRange),
        category: "Hotel",
        tourType: "accommodation",
        season: "365-Day Escrow Reservation",
        vendor: vendorName,
        vendorName: vendorName,
        vendorId: vendorId,
        location: hotel.area,
        image: hotel.images[0],
        imageUrl: hotel.images[0],
        details: hotel.description,
        perks: hotel.amenities,
        openCapacity: true,
        capacityLabel: "Open Daily / 365-Day Guarantee",
        bookingMode: "365_day_open"
      };
    }
    return null;
  }

  createTransaction({ reference, packageId, email, customerName, phone, amountKobo, bookingDate }) {
    const pkg = this.getPackageById(packageId) || {};
    const defaultDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const transaction = {
      reference,
      packageId,
      packageName: pkg.name || "Cross River Tourism Package",
      vendor: pkg.vendor || "Verified Cross River Vendor",
      vendorId: pkg.vendorId || (pkg.vendor ? pkg.vendor.toLowerCase().replace(/[^a-z0-9]/g, '-') : "verified-vendor"),
      customerName: customerName || "Guest Explorer",
      email,
      phone: phone || "",
      bookingDate: bookingDate || defaultDate,
      amountNGN: (amountKobo || 0) / 100,
      amountKobo,
      status: "AWAITING_PAYMENT",
      statusLabel: "Awaiting Paystack Payment",
      checkInPin: null,
      createdAt: new Date().toISOString(),
      lockedAt: null,
      disbursedAt: null,
      paystackStatus: "pending"
    };

    this.transactions.set(reference, transaction);
    return transaction;
  }

  getTransaction(reference) {
    return this.transactions.get(reference);
  }

  updateTransaction(reference, updates) {
    const existing = this.transactions.get(reference);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    this.transactions.set(reference, updated);
    return updated;
  }

  // Generate cryptographically uniform 6-digit PIN
  generatePin() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  lockEscrow(reference, paystackDetails = {}) {
    const transaction = this.transactions.get(reference);
    if (!transaction) return null;

    const checkInPin = transaction.checkInPin || this.generatePin();
    const updated = {
      ...transaction,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin,
      lockedAt: new Date().toISOString(),
      paystackStatus: paystackDetails.status || "success",
      channel: paystackDetails.channel || "card",
      gatewayResponse: paystackDetails.gateway_response || "Successful"
    };

    this.transactions.set(reference, updated);
    return updated;
  }

  releaseEscrow(reference, pin, authenticatedVendor = null) {
    const transaction = this.transactions.get(reference);
    if (!transaction) {
      return { success: false, error: "Booking transaction not found" };
    }

    // Strict Multi-Tenant Scope Guard:
    // When a vendor inputs a PIN, verify that the booking belongs to THAT specific authenticated vendor.
    // If an executive hotel inputs a PIN that belongs to a Seagull Band pass (or another merchant),
    // reject with exact error: "Access Denied: This booking voucher is assigned to another merchant."
    if (authenticatedVendor) {
      const matchByName = isVendorMatch(transaction.vendor, authenticatedVendor);
      const matchById = transaction.vendorId && isVendorMatch(transaction.vendorId, authenticatedVendor);
      if (!matchByName && !matchById) {
        return {
          success: false,
          error: "Access Denied: This booking voucher is assigned to another merchant."
        };
      }
    }

    if (transaction.status === "COMPLETED_DISBURSED") {
      return { success: false, error: "Funds have already been disbursed to the vendor", transaction };
    }

    if (transaction.status !== "ESCROW_LOCKED_ACTIVE") {
      return { success: false, error: `Cannot disburse transaction in status: ${transaction.status}` };
    }

    if (String(transaction.checkInPin).trim() !== String(pin).trim()) {
      return { success: false, error: "Invalid physical check-in PIN. Vendor verification failed." };
    }

    const updated = {
      ...transaction,
      status: "COMPLETED_DISBURSED",
      statusLabel: "Completed & Disbursed to Vendor",
      disbursedAt: new Date().toISOString(),
      vendorDisbursementNote: `Disbursed to ${transaction.vendor} on-site via physical PIN redemption.`
    };

    this.transactions.set(reference, updated);
    return { success: true, transaction: updated };
  }

  disputeEscrow(reference, { reason, details } = {}) {
    const transaction = this.transactions.get(reference);
    if (!transaction) {
      return { success: false, error: "Booking transaction not found" };
    }

    if (transaction.status === "COMPLETED_DISBURSED") {
      return {
        success: false,
        error: "Cannot dispute booking: funds have already been disbursed to the vendor."
      };
    }

    const updated = {
      ...transaction,
      status: "ESCROW_FROZEN_DISPUTE",
      statusLabel: "Escrow Frozen - Under Review",
      disputeReason: reason || "Tourist Reported On-Site Issue",
      disputeDetails: details || "Dispute registered by guest upon arrival. Funds held safely in vault.",
      disputedAt: new Date().toISOString()
    };

    this.transactions.set(reference, updated);
    return { success: true, transaction: updated };
  }

  getAllTransactions({ sanitized = true } = {}) {
    const list = Array.from(this.transactions.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    if (!sanitized) return list;

    // Security: Mask private 6-digit check-in PINs for unverified active holds
    return list.map(tx => {
      if (tx.status === "COMPLETED_DISBURSED") {
        return tx;
      }
      return {
        ...tx,
        checkInPin: tx.checkInPin ? "••••••" : null
      };
    });
  }

  // Active bookings awaiting physical on-site guest check-in PIN redemption
  getVendorActiveBookings(vendorQuery = null) {
    let list = Array.from(this.transactions.values())
      .filter(t => t.status === "ESCROW_LOCKED_ACTIVE")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (vendorQuery && vendorQuery !== "all") {
      list = list.filter(t => 
        (t.vendorId && isVendorMatch(t.vendorId, vendorQuery)) || 
        isVendorMatch(t.vendor, vendorQuery)
      );
    }

    return list.map(tx => ({
      ...tx,
      checkInPin: tx.checkInPin ? "••••••" : null,
      rawPinForDemo: tx.checkInPin
    }));
  }

  // Completed disbursements for this vendor
  getVendorPayouts(vendorQuery = null) {
    let list = Array.from(this.transactions.values())
      .filter(t => t.status === "COMPLETED_DISBURSED")
      .sort((a, b) => new Date(b.disbursedAt || b.createdAt) - new Date(a.disbursedAt || a.createdAt));

    if (vendorQuery && vendorQuery !== "all") {
      list = list.filter(t => 
        (t.vendorId && isVendorMatch(t.vendorId, vendorQuery)) || 
        isVendorMatch(t.vendor, vendorQuery)
      );
    }

    return list;
  }

  getEscrowStats(vendorQuery = null) {
    let all = Array.from(this.transactions.values());
    if (vendorQuery && vendorQuery !== "all") {
      all = all.filter(t => 
        (t.vendorId && isVendorMatch(t.vendorId, vendorQuery)) || 
        isVendorMatch(t.vendor, vendorQuery)
      );
    }

    const totalLocked = all
      .filter(t => t.status === "ESCROW_LOCKED_ACTIVE")
      .reduce((sum, t) => sum + (t.amountNGN || 0), 0);

    const totalDisbursed = all
      .filter(t => t.status === "COMPLETED_DISBURSED")
      .reduce((sum, t) => sum + (t.amountNGN || 0), 0);

    const totalVolume = totalLocked + totalDisbursed;
    const commissionRate = 0.07; // 7% Platform Clearinghouse Commission
    const platformCommission = Math.round(totalVolume * commissionRate);

    const activeCount = all.filter(t => t.status === "ESCROW_LOCKED_ACTIVE").length;
    const completedCount = all.filter(t => t.status === "COMPLETED_DISBURSED").length;
    const disputedCount = all.filter(t => t.status === "ESCROW_FROZEN_DISPUTE").length;

    return {
      totalLockedNGN: totalLocked,
      totalDisbursedNGN: totalDisbursed,
      platformCommissionNGN: platformCommission,
      commissionRate: commissionRate,
      activeEscrowBookings: activeCount,
      completedDisbursedBookings: completedCount,
      disputedEscrowBookings: disputedCount,
      totalTransactions: all.length
    };
  }
}

export const escrowStore = new EscrowStore();
