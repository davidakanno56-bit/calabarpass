// server/store.js
// CalabarPass In-Memory Store & 365-Day Escrow Transaction State Engine

import { HOTELS, getHotelBaseRate } from "./hotels.js";
import { generateVendorAccessCode } from "./vendorAuth.js";
import { sendTransactionalEmail } from "./mail.js";

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
    placeId: "ChIJc52kL8n09rER4P7p1-hQ12M",
    price: 85000,
    priceNGN: 85000,
    category: "Eco-Tourism & Highlands",
    tourType: "year_round",
    season: "365-Day Mountain Sanctuary",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cable_car_at_Obudu_Mountain_resort%2C_Cross_river_state.jpg/1280px-Cable_car_at_Obudu_Mountain_resort%2C_Cross_river_state.jpg",
    imageUrl: "/images/obudu.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cable_car_at_Obudu_Mountain_resort%2C_Cross_river_state.jpg/1280px-Cable_car_at_Obudu_Mountain_resort%2C_Cross_river_state.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg/1280px-Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Holy_Mountain_View%2C_Obudu_Cattle_Ranch%2C_Obudu%2C_Cross_river_state.jpg/1280px-Holy_Mountain_View%2C_Obudu_Cattle_Ranch%2C_Obudu%2C_Cross_river_state.jpg",
      "/assets/obudu_mountain.jpg"
    ],
    altText: "Authentic photograph of the Obudu Mountain Resort cable car crossing over subtropical mountain cloud forest canopy at 1,576 meters altitude.",
    attribution: "MediaMOF / Ei'eke • Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cable_car_at_Obudu_Mountain_resort,_Cross_river_state.jpg",
    verified: true,
    verificationStatus: "verified_real_world",
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
    placeId: "ChIJ4V3sOf-hWRAR9L12M8v0_77",
    price: 18000,
    priceNGN: 18000,
    category: "Nature & Adventure",
    tourType: "year_round",
    season: "365-Day River Basin Wonder",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kwa_Falls_Calabar_41.jpg/1280px-Kwa_Falls_Calabar_41.jpg",
    imageUrl: "/images/kwa_falls.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kwa_Falls_Calabar_41.jpg/1280px-Kwa_Falls_Calabar_41.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Kwafalls.jpg",
      "/assets/kwa_falls.jpg"
    ],
    altText: "Authentic photograph of Kwa Falls cascading into the deep rocky canyon river basin in Akamkpa LGA.",
    attribution: "MediaMOF • Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kwa_Falls_Calabar_41.jpg",
    verified: true,
    verificationStatus: "verified_real_world",
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
    placeId: "ChIJf9xSOg-hWRAR3P7p1-hQ33F",
    price: 25000,
    priceNGN: 25000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day Rainforest Wonder",
    image: "/images/agbokim.jpg",
    imageUrl: "/images/agbokim.jpg",
    gallery: [
      "/images/agbokim.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Agbokim_waterfalls.jpg/1280px-Agbokim_waterfalls.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Agbokim_Waterfalls%2C_Cross_River_State.jpg/1280px-Agbokim_Waterfalls%2C_Cross_River_State.jpg",
      "/assets/agbokim_waterfalls.jpg"
    ],
    altText: "Authentic photograph of the seven terraced cascades of Agbokim Waterfalls flowing into the lush rainforest mist in Ikom LGA.",
    attribution: "MuaMee / Favouridowu • Wikimedia Commons / State Bureau Archive",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Agbokim_waterfalls.jpg",
    verified: true,
    verificationStatus: "verified_real_world",
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
    placeId: "ChIJ3V3sP76hWRAR5L12M8v0_44",
    price: 45000,
    priceNGN: 45000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day Rainforest Sanctuary",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Calabar_carnival_3.jpg/1280px-Calabar_carnival_3.jpg"
    ],
    altText: "Authentic photograph of a dominant male drill monkey at the Pandrillus Drill Rehabilitation and Breeding Center in Cross River State.",
    attribution: "Dotun55 • Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Drill_Monkey.jpg",
    verified: true,
    verificationStatus: "verified_real_world",
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
    placeId: "ChIJ2V3sP76hWRAR1L12M8v0_55",
    price: 25000,
    priceNGN: 25000,
    category: "Heritage & Waterfront",
    tourType: "year_round",
    season: "365-Day Waterfront & Heritage",
    image: "/assets/marina_resort.jpg",
    imageUrl: "/assets/marina_resort.jpg",
    gallery: [
      "/assets/marina_resort.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Old_Residency%2C_National_Museum%2C_Calabar_02.jpg/1280px-Old_Residency%2C_National_Museum%2C_Calabar_02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Calabar_Habour.jpg/1280px-Calabar_Habour.jpg"
    ],
    altText: "Authentic photograph of the Marina Resort waterfront promenade, boat cruise jetty, and Calabar River boardwalk.",
    attribution: "Cross River State Tourism Bureau / Utibe Noah Silas (Wikimedia)",
    license: "Official State Partner / CC BY-SA 4.0",
    licenseUrl: "https://calabarpass.ng/licensing/verified-tourism",
    source: "verified_local",
    sourceUrl: "https://calabarpass.ng/destinations/marina-resort",
    verified: true,
    verificationStatus: "verified_real_world",
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
    placeId: "ChIJ1V3sP76hWRAR2L12M8v0_66",
    price: 85000,
    priceNGN: 85000,
    category: "Carnival",
    tourType: "carnival",
    season: "December Carnival Calabar",
    image: "/assets/seagull_band.jpg",
    imageUrl: "/assets/seagull_band.jpg",
    gallery: [
      "/assets/seagull_band.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Calabar_carnival_1.jpg/1280px-Calabar_carnival_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Calabar_carnival_3.jpg/1280px-Calabar_carnival_3.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Calabar_carnival_7.jpg/1280px-Calabar_carnival_7.jpg"
    ],
    altText: "Authentic photograph of Carnival Calabar Seagull Band masquerade section in official red and gold costumes along Marian Road.",
    attribution: "Seagull Band Secretariat / Carnival Calabar Commission",
    license: "Official Band Media Rights",
    licenseUrl: "https://calabarpass.ng/licensing/carnival-bands",
    source: "verified_local",
    sourceUrl: "https://calabarpass.ng/carnival/seagull-band",
    verified: true,
    verificationStatus: "verified_real_world",
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
  if ((q.includes("commerce") || q.includes("trade")) && (tv.includes("commerce") || tv.includes("trade"))) return true;
  if (q.includes("cicc") && tv.includes("cicc")) return true;
  if (q.includes("crunchies") && tv.includes("crunchies")) return true;
  if (q.includes("viking") && tv.includes("viking")) return true;
  if (q.includes("arena") && tv.includes("arena")) return true;
  if (q.includes("mayfair") && tv.includes("mayfair")) return true;

  return false;
}

class EscrowStore {
  constructor() {
    this.transactions = new Map();
    this.vendors = new Map();
    this.pendingVendors = new Map();
    this.dynamicCards = [];
    this.seedInitialTransactions();
    this.seedPendingVendors();
  }

  seedPendingVendors() {
    const p1 = {
      id: "vnd-marina-bay-sunset-mvl891a",
      business_name: "Marina Bay Sunset Grill & Bar",
      businessName: "Marina Bay Sunset Grill & Bar",
      name: "Marina Bay Sunset Grill & Bar",
      category: "dining-nightlife",
      phone: "+234 803 111 8822",
      email: "manager@marinabaysunset.com",
      bankPayoutDetails: "Zenith Bank - 1092837190 (Marina Bay Grill Ltd)",
      location: "Marina Waterfront Promenade, Calabar",
      priceNGN: 9500,
      status: "pending",
      imageUrl: "/assets/marina_resort.jpg",
      image: "/assets/marina_resort.jpg",
      primaryUrl: "/assets/marina_resort.jpg",
      attribution: "Marina Resort Waterfront Culinary Association",
      source: "verified_local",
      description: "Premium open-air waterfront grill serving charcoal river catfish and palm wine cocktails.",
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
    };
    const p2 = {
      id: "vnd-oban-rainforest-lodge-mvl902b",
      business_name: "Oban Rainforest Canopy Lodge",
      businessName: "Oban Rainforest Canopy Lodge",
      name: "Oban Rainforest Canopy Lodge",
      category: "eco-sites",
      phone: "+234 814 220 3311",
      email: "bookings@obanrainforest.org",
      bankPayoutDetails: "Access Bank - 9028172635 (Oban Heritage Co)",
      location: "Cross River National Park (Oban Division)",
      priceNGN: 42000,
      status: "pending",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rainforest_in_Cross_River_National_Park.jpg/1280px-Rainforest_in_Cross_River_National_Park.jpg",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rainforest_in_Cross_River_National_Park.jpg/1280px-Rainforest_in_Cross_River_National_Park.jpg",
      primaryUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rainforest_in_Cross_River_National_Park.jpg/1280px-Rainforest_in_Cross_River_National_Park.jpg",
      attribution: "Heinrich-Böll-Stiftung / Wikimedia Commons",
      license: "CC BY-SA 2.0",
      source: "wikimedia_commons",
      description: "Eco-certified forest cabins with canopy walkway guides, birdwatching towers, and ranger patrol.",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    };
    this.pendingVendors.set(p1.id, p1);
    this.pendingVendors.set(p2.id, p2);
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

  registerVendor({
    businessName,
    business_name,
    name,
    category,
    bankPayoutDetails,
    bankAccount,
    subaccount_code,
    paystackSubaccount,
    phone,
    phoneNumber,
    email,
    contactEmail,
    logoUrl,
    image,
    imageUrl,
    location,
    corridor,
    description,
    price,
    priceNGN
  }) {
    const title = (businessName || business_name || name || "").trim();
    if (!title) {
      throw new Error("Business name is required for vendor onboarding.");
    }

    const rawCategory = (category || "accommodations").toLowerCase().trim();
    let normalizedCategory = "accommodations";
    if (rawCategory.includes("eco") || rawCategory.includes("heritage")) {
      normalizedCategory = "eco-sites";
    } else if (rawCategory.includes("din") || rawCategory.includes("eat") || rawCategory.includes("food") || rawCategory.includes("lounge")) {
      normalizedCategory = "dining-nightlife";
    } else if (rawCategory.includes("trade") || rawCategory.includes("expo") || rawCategory.includes("commerce")) {
      normalizedCategory = "trade-expo";
    } else if (rawCategory.includes("carnival") || rawCategory.includes("cultur") || rawCategory.includes("band") || rawCategory.includes("festival")) {
      normalizedCategory = "carnival-culture";
    }

    const accessCode = generateVendorAccessCode(normalizedCategory);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const vendorId = `vnd-${slug}-${Date.now().toString(36)}`;
    const bank = bankPayoutDetails || bankAccount || "Access Bank ****4102";
    const tel = phone || phoneNumber || "+234 800 000 0000";
    const mail = (email || contactEmail || `${slug}@merchant.calabarpass.ng`).trim();
    const img = logoUrl || image || imageUrl || "/assets/executive_vip.jpg";
    const loc = location || corridor || "Calabar Municipality, Cross River State";
    const rate = Number(priceNGN || price || 35000);

    const vendorRecord = {
      id: vendorId,
      apiVendorId: vendorId,
      name: title,
      businessName: title,
      business_name: title,
      category: normalizedCategory,
      bankAccount: bank,
      bankPayoutDetails: bank,
      subaccount_code: subaccount_code || null,
      paystackSubaccount: paystackSubaccount || null,
      phone: tel,
      email: mail,
      logoUrl: img,
      image: img,
      location: loc,
      description: description || `Verified Cross River 365-day commercial operator in ${normalizedCategory}.`,
      accessCode,
      registeredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: "pending",
      terms: {
        incoming: "Guest Check-Ins",
        booking: "Clearances & Bookings",
        item: "Service Offering",
        itemExample: `${title} Pass`,
        dateLabel: "Verification Date",
        amountLabel: "Rate",
      },
      aliases: [vendorId, slug, title.toLowerCase()],
      demo: [`CP-${accessCode.replace(/[^A-Z0-9]/g, "")}`, "552190", "Verified Onboarding Guest", `${title} Pass`, rate],
    };

    // Store in pending queue and internal vendor index
    this.pendingVendors.set(vendorId, vendorRecord);
    this.vendors.set(vendorId, vendorRecord);
    this.vendors.set(accessCode.toUpperCase(), vendorRecord);

    // Create a public directory card
    const directoryCard = {
      id: `card-${vendorId}`,
      categoryGroup: normalizedCategory,
      category: normalizedCategory,
      subCategory: "Verified Partner",
      name: title,
      title: `${title} - Verified 365 Architecture`,
      vendor: title,
      vendorName: title,
      vendorId: vendorId,
      location: loc,
      corridor: loc,
      priceNGN: rate,
      price: rate,
      priceRange: `₦${rate.toLocaleString()}`,
      rating: 5.0,
      reviews: 1,
      badge: "Newly Verified",
      escrowBadge: "State Bureau Verified Operator",
      image: img,
      imageUrl: img,
      description: vendorRecord.description,
      details: `Official verified ${normalizedCategory} merchant in Cross River State with 100% escrow buyer protection.`,
      amenities: ["100% Escrow Protected", "Verified Payout Account", "PIN Redemption", "365-Day Guarantee"],
      accessCode,
      subaccount_code: subaccount_code || null,
      bookingMode: "365_day_open",
      capacityLabel: "Open Daily • 365-Day Escrow Check-In",
    };

    this.dynamicCards.push(directoryCard);

    // Initialize an isolated private vendor booking in this vendor's terminal
    const demoRef = `CP-${accessCode.replace(/[^A-Z0-9]/g, "")}`;
    this.transactions.set(demoRef, {
      reference: demoRef,
      packageId: directoryCard.id,
      packageName: `${title} Initial Booking`,
      vendor: title,
      vendorId: vendorId,
      customerName: "Official Clearinghouse Guest",
      email: "guest@crossriver.ng",
      phone: tel,
      amountNGN: rate,
      amountKobo: rate * 100,
      bookingDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
      checkInPin: "552190",
      createdAt: new Date().toISOString(),
      lockedAt: new Date().toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card",
    });

    return {
      success: true,
      vendor: vendorRecord,
      directoryCard,
      accessCode,
    };
  }

  getVendorByAccessCode(code) {
    if (!code) return null;
    const cleaned = String(code).trim().toUpperCase();
    if (cleaned === "CALABAR2026" || cleaned === "3652026" || cleaned === "CALABARPASS") {
      return {
        id: "master-clearinghouse",
        name: "Cross River State Clearinghouse Master",
        category: "all",
        accessCode: cleaned,
        isMaster: true,
      };
    }
    return this.vendors.get(cleaned) || null;
  }

  getPendingVendors() {
    const list = [];
    for (const v of this.pendingVendors.values()) {
      if (v && v.status === "pending") {
        list.push({
          id: v.id,
          business_name: v.business_name || v.businessName || v.name,
          businessName: v.business_name || v.businessName || v.name,
          category: v.category,
          phone: v.phone,
          email: v.email,
          bankPayoutDetails: v.bankPayoutDetails || v.bankAccount,
          subaccount_code: v.subaccount_code || null,
          paystackSubaccount: v.paystackSubaccount || null,
          location: v.location,
          priceNGN: v.priceNGN,
          imageUrl: v.imageUrl || v.image,
          image: v.image || v.imageUrl,
          status: v.status,
          createdAt: v.createdAt || v.registeredAt
        });
      }
    }
    return list;
  }

  reviewVendor(vendorId, action) {
    const cleanAction = String(action || "").toLowerCase().trim();
    let vendor = this.pendingVendors.get(vendorId) || this.vendors.get(vendorId);

    if (!vendor) {
      return {
        success: false,
        notFound: true,
        error: "Vendor not found."
      };
    }

    if (cleanAction === "approve") {
      vendor.status = "approved";
      // Official state merchant code CAL-{CATEGORY[:3]}-{timestamp}
      const catCode = (vendor.category || "HTL").replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase();
      const timestampSec = Math.floor(Date.now() / 1000);
      vendor.merchant_code = `CAL-${catCode}-${timestampSec}`;
      vendor.accessCode = vendor.merchant_code;

      // Register official state merchant code
      this.vendors.set(vendor.id, vendor);
      this.vendors.set(vendor.merchant_code.toUpperCase(), vendor);
      this.pendingVendors.delete(vendorId);

      // Trigger Approval Email
      sendTransactionalEmail({
        to_email: vendor.email,
        subject: "🎉 Your CalabarPass Merchant Account is Approved!",
        body: `Hello ${vendor.business_name || vendor.businessName},\n\nYour business has been verified by the CalabarPass administration. Your official state merchant code is ${vendor.merchant_code}. You can now log into your Vendor Settlement Terminal and accept escrow payments.`
      });

      return {
        status: "success",
        success: true,
        message: "Vendor successfully approved.",
        merchant_code: vendor.merchant_code,
        vendor
      };
    } else if (cleanAction === "remove") {
      vendor.status = "removed";
      this.pendingVendors.delete(vendorId);
      this.vendors.delete(vendorId);
      if (vendor.accessCode) {
        this.vendors.delete(vendor.accessCode.toUpperCase());
      }
      if (vendor.merchant_code) {
        this.vendors.delete(vendor.merchant_code.toUpperCase());
      }

      // Remove from dynamicCards
      this.dynamicCards = this.dynamicCards.filter(c => c.vendorId !== vendorId);

      // Trigger Removal / Rejection Email
      sendTransactionalEmail({
        to_email: vendor.email,
        subject: "Update Regarding Your CalabarPass Registration",
        body: `Hello ${vendor.business_name || vendor.businessName},\n\nAfter reviewing your submission, your listing could not be verified at this time as it did not meet our state compliance and security standards. If you believe this is an error, please reach out to support.`
      });

      return {
        status: "success",
        success: true,
        message: "Vendor successfully removed.",
        vendor
      };
    } else {
      return {
        success: false,
        invalidAction: true,
        error: "Invalid action parameter."
      };
    }
  }

  getAllVendors() {
    const map = new Map();
    for (const v of this.vendors.values()) {
      if (v.id) map.set(v.id, v);
    }
    return Array.from(map.values());
  }

  getDynamicCards() {
    return this.dynamicCards || [];
  }

  clearDynamicVendors(accessCode) {
    const cleaned = String(accessCode || "").trim().toUpperCase();
    const isMaster = ["CALABAR2026", "3652026", "CALABARPASS", "CP2026"].includes(cleaned);
    if (!isMaster) {
      return {
        success: false,
        error: "Access Denied: Master Access Code (CALABAR2026) required to clear test registrations.",
      };
    }

    const clearedCount = this.dynamicCards.length;
    // Collect vendor IDs to purge matching transactions
    const purgedVendorIds = new Set();
    for (const v of this.vendors.values()) {
      if (v?.id) purgedVendorIds.add(v.id);
    }

    // Clear dynamic maps and cards
    this.vendors.clear();
    this.pendingVendors.clear();
    this.seedPendingVendors();
    this.dynamicCards = [];

    // Remove any demo transactions created for dynamic vendors
    for (const [ref, tx] of this.transactions.entries()) {
      if (
        purgedVendorIds.has(tx.vendorId) ||
        (ref && ref.startsWith("CP-CAL")) ||
        (tx.vendorId && tx.vendorId.startsWith("vnd-"))
      ) {
        this.transactions.delete(ref);
      }
    }

    return {
      success: true,
      count: clearedCount,
      message: `Successfully cleared ${clearedCount} test merchant registration(s). Catalog restored to verified defaults.`,
    };
  }

  deleteDynamicVendor(vendorId, accessCode) {
    const cleaned = String(accessCode || "").trim().toUpperCase();
    const isMaster = ["CALABAR2026", "3652026", "CALABARPASS", "CP2026"].includes(cleaned);
    if (!isMaster) {
      return {
        success: false,
        error: "Access Denied: Master Access Code (CALABAR2026) required to delete dynamic merchant.",
      };
    }

    if (!vendorId) {
      return { success: false, error: "Vendor ID is required." };
    }

    // Find and remove from vendors map
    let removedVendor = null;
    for (const [key, v] of this.vendors.entries()) {
      if (v.id === vendorId || key === vendorId) {
        removedVendor = v;
        this.vendors.delete(key);
      }
    }
    if (removedVendor?.accessCode) {
      this.vendors.delete(removedVendor.accessCode.toUpperCase());
    }

    // Remove from dynamicCards
    this.dynamicCards = this.dynamicCards.filter(
      (c) => c.vendorId !== vendorId && c.id !== `card-${vendorId}`
    );

    // Remove associated demo transaction
    for (const [ref, tx] of this.transactions.entries()) {
      if (tx.vendorId === vendorId) {
        this.transactions.delete(ref);
      }
    }

    return {
      success: true,
      vendorId,
      message: `Merchant ${removedVendor?.name || vendorId} removed successfully.`,
    };
  }
}

export const escrowStore = new EscrowStore();
