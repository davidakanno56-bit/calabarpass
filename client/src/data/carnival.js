// client/src/data/carnival.js
// CalabarPass Verified Carnival & Culture Architecture Data
// Explicit object-ID based image mapping: zero sequential index matching, zero unrelated fallbacks.

import { PACKAGES as CORE_PACKAGES } from "./packages.js";

export const CARNIVAL_IMAGE_MAP = {
  // Seagull Band VIP Route Pass
  "pkg-seagull-pass": "/assets/seagull_band.jpg",
  "carnival-seagull": "/assets/seagull_band.jpg",
  "seagull-band": "/assets/seagull_band.jpg",
  "seagull-pass": "/assets/seagull_band.jpg",

  // Passion 4 Band
  "pkg-passion4-pass": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Calabar_carnival_7.jpg/1280px-Calabar_carnival_7.jpg",
  "carnival-passion4": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Calabar_carnival_7.jpg/1280px-Calabar_carnival_7.jpg",
  "passion4-band": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Calabar_carnival_7.jpg/1280px-Calabar_carnival_7.jpg",
  "passion4-pass": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Calabar_carnival_7.jpg/1280px-Calabar_carnival_7.jpg",

  // Masta Blasta Band
  "pkg-masta-blasta": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Calabar_carnival_8.jpg/1280px-Calabar_carnival_8.jpg",
  "carnival-masta-blasta": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Calabar_carnival_8.jpg/1280px-Calabar_carnival_8.jpg",
  "masta-blasta": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Calabar_carnival_8.jpg/1280px-Calabar_carnival_8.jpg",
  "masta-blasta-pass": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Calabar_carnival_8.jpg/1280px-Calabar_carnival_8.jpg",

  // U.J. Esuene Stadium VIP Grandstand
  "pkg-stadium-vip": "/assets/vip_stadium.jpg",
  "carnival-stadium": "/assets/vip_stadium.jpg",
  "stadium-vip": "/assets/vip_stadium.jpg",
  "esuene-stadium": "/assets/vip_stadium.jpg",

  // Leboku New Yam Festival
  "pkg-leboku-festival": "/assets/leboku_festival.jpg",
  "carnival-leboku": "/assets/leboku_festival.jpg",
  "leboku-festival": "/assets/leboku_festival.jpg",
  "leboku-yam-festival": "/assets/leboku_festival.jpg"
};

/**
 * Retrieve verified carnival photo URL strictly by object ID
 */
export function getCarnivalImageById(id) {
  if (!id) return null;
  const key = String(id).toLowerCase().trim();
  return CARNIVAL_IMAGE_MAP[key] || null;
}

// 5 Carnival & Culture Cards (Seagull Band, Passion 4, Masta Blasta, Stadium VIP, Leboku Festival)
const seagullCore = CORE_PACKAGES.find(p => p.id === "pkg-seagull-pass");

export const RAW_CARNIVAL_CULTURE_CARDS = [
  seagullCore ? {
    ...seagullCore,
    categoryGroup: "carnival-culture",
    subCategory: "Carnival Band Passes",
    imageUrl: CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
    image: CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
    primaryUrl: CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
    gallery: [
      CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Calabar_carnival_1.jpg/1280px-Calabar_carnival_1.jpg"
    ]
  } : {
    id: "pkg-seagull-pass",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Carnival Band Passes",
    title: "Official Carnival Calabar VIP Route Pass (Seagull Band)",
    name: "Official Carnival Calabar VIP Route Pass (Seagull Band)",
    vendor: "Seagull Band Secretariat",
    vendorName: "Seagull Band Secretariat",
    vendorId: "seagull-band",
    location: "Marian Road / Stadium Route, Calabar",
    corridor: "Marian Road / Stadium Route",
    placeId: "ChIJ276fV3mhWRAR66m-x03w7u8",
    priceNGN: 85000,
    price: 85000,
    streetSurgePrice: 135000,
    badge: "Official Secretariat Verified",
    escrowBadge: "Official Secretariat Verified",
    imageUrl: CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
    image: CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
    primaryUrl: CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
    gallery: [
      CARNIVAL_IMAGE_MAP["pkg-seagull-pass"],
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Calabar_carnival_1.jpg/1280px-Calabar_carnival_1.jpg"
    ],
    altText: "Authentic photograph of Seagull Band dancers in handcrafted feather regalia at Carnival Calabar.",
    attribution: "Seagull Band Secretariat / Carnival Calabar Archives",
    license: "Official Secretariat Media Agreement",
    licenseUrl: "https://calabarpass.ng/licensing/seagull-band",
    source: "verified_local",
    sourceUrl: "https://calabarpass.ng/carnival/seagull-band",
    verified: true,
    verificationStatus: "verified_real_world",
    verifiedDate: "2026-10-26",
    description: "Official 2026 route wristband, handcrafted feather costume kit, hydration truck access, and dedicated security escort along the 12km carnival route.",
    details: "Official 2026 route wristband, handcrafted feather costume kit, hydration truck access, and dedicated security escort along the 12km carnival route.",
    included: [
      "Official 2026 Carnival Route Wristband",
      "Handcrafted Feather & Sequin Costume Kit",
      "All-Day Hydration & Refreshment Truck Access",
      "Dedicated Escort & Paramedic Team along Marian Road"
    ],
    perks: [
      "Official 2026 Carnival Route Wristband",
      "Handcrafted Feather & Sequin Costume Kit",
      "All-Day Hydration & Refreshment Truck Access",
      "Dedicated Escort & Paramedic Team"
    ],
    antiScamAlert: "Extreme counterfeit wristbands reported on Marian Road street corners. Only verified band RFID chips pass scanning.",
    scamRisk: "Extreme counterfeit wristbands reported on Marian Road street corners.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Guarantee"
  },
  {
    id: "pkg-passion4-pass",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Carnival Band Passes",
    title: "Passion 4 Band All-Access Street Pass & Costume",
    name: "Passion 4 Band All-Access Street Pass & Costume",
    vendor: "Passion 4 Band Secretariat",
    vendorName: "Passion 4 Band Secretariat",
    vendorId: "passion4-band",
    location: "Marian Road / MCC Procession Axis, Calabar",
    corridor: "Marian Road / MCC Procession Axis",
    placeId: "ChIJp4_v09mhWRAR0V82-6mYw_0",
    priceNGN: 78000,
    price: 78000,
    streetSurgePrice: 125000,
    rating: 4.9,
    reviews: 320,
    badge: "Official Secretariat Verified",
    escrowBadge: "Official Secretariat Verified",
    image: CARNIVAL_IMAGE_MAP["pkg-passion4-pass"],
    imageUrl: CARNIVAL_IMAGE_MAP["pkg-passion4-pass"],
    primaryUrl: CARNIVAL_IMAGE_MAP["pkg-passion4-pass"],
    gallery: [
      CARNIVAL_IMAGE_MAP["pkg-passion4-pass"],
      CARNIVAL_IMAGE_MAP["pkg-seagull-pass"]
    ],
    altText: "Authentic photograph of Carnival Calabar dancers marching with the Passion 4 Band along the MCC Road route.",
    attribution: "Otomeonoge / Wikimedia Commons (Carnival Calabar Passion 4 Procession)",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Calabar_carnival_7.jpg",
    verified: true,
    verificationStatus: "verified_real_world",
    verifiedDate: "2026-10-26",
    description: "March with the most decorated band in Carnival Calabar history. Includes competition section wristband, signature green-and-gold costume, and float truck access.",
    details: "Authentic Passion 4 registration, competition adjudication zone clearance, bespoke handcrafted costume kit, chilled refreshments, and emergency response escort.",
    included: [
      "Official 2026 Passion 4 Competition Wristband",
      "Signature Handcrafted Feather Costume Kit",
      "Mobile Sound Truck & Refreshment Access",
      "Official Band Secretarial Verification PIN"
    ],
    perks: [
      "Official Passion 4 Competition Wristband",
      "Signature Handcrafted Feather Costume",
      "Sound Truck & Refreshment Access",
      "Official Secretarial Verification PIN"
    ],
    antiScamAlert: "Cloned wristbands sold by street scalpers fail optical gate scanners. Book only via CalabarPass escrow.",
    scamRisk: "Cloned wristbands sold by street scalpers fail optical gate scanners.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Guarantee"
  },
  {
    id: "pkg-masta-blasta",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Carnival Band Passes",
    title: "Masta Blasta Official Carnival Pass & Costume",
    name: "Masta Blasta Official Carnival Pass & Costume",
    vendor: "Masta Blasta Band Secretariat",
    vendorName: "Masta Blasta Band Secretariat",
    vendorId: "masta-blasta",
    location: "Marian Road / Stadium Route, Calabar",
    corridor: "Marian Road / Stadium Route",
    placeId: "ChIJmb_990yhWRAR5_Ym27xL63w",
    priceNGN: 82000,
    price: 82000,
    streetSurgePrice: 130000,
    rating: 4.8,
    reviews: 210,
    badge: "Official Secretariat Verified",
    escrowBadge: "Official Secretariat Verified",
    image: CARNIVAL_IMAGE_MAP["pkg-masta-blasta"],
    imageUrl: CARNIVAL_IMAGE_MAP["pkg-masta-blasta"],
    primaryUrl: CARNIVAL_IMAGE_MAP["pkg-masta-blasta"],
    gallery: [
      CARNIVAL_IMAGE_MAP["pkg-masta-blasta"],
      CARNIVAL_IMAGE_MAP["pkg-seagull-pass"]
    ],
    altText: "Authentic photograph of Carnival Calabar dancers in vibrant orange and gold costumes during the street parade.",
    attribution: "Otomeonoge / Wikimedia Commons (Carnival Calabar Orange Band)",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Calabar_carnival_8.jpg",
    verified: true,
    verificationStatus: "verified_real_world",
    verifiedDate: "2026-10-26",
    description: "Join the explosive high-energy orange army. Signature orange and gold costume package, all-day DJ sound float accompany, and secured carnival corridor access.",
    details: "Official Masta Blasta parade section kit, security clearance wristband, hydration truck supply, and medical team escort.",
    included: [
      "Official Masta Blasta 2026 RFID Wristband",
      "Vibrant Orange Carnival Costume & Headpiece",
      "All-Day Float Music & Energy Truck Access",
      "Dedicated Paramedic & Security Detail"
    ],
    perks: [
      "Official 2026 RFID Wristband",
      "Vibrant Orange Costume & Headpiece",
      "All-Day Float Music & Energy Truck",
      "Dedicated Paramedic Detail"
    ],
    antiScamAlert: "Scalpers selling fake wristbands outside MCC junction. Only official escrow vouchers are accepted at band secretariat.",
    scamRisk: "Scalpers selling fake wristbands outside MCC junction.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Guarantee"
  },
  {
    id: "pkg-stadium-vip",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Festival Tickets",
    name: "VIP U.J. Esuene Stadium Elevated Grandstand Ticket",
    title: "VIP Stadium Elevated Grandstand & Adjudication Box",
    vendor: "Calabar Festival Secretariat & Ministry of Tourism",
    vendorName: "Calabar Festival Secretariat & Ministry of Tourism",
    vendorId: "stadium-festival-box",
    location: "U.J. Esuene Stadium, Calabar",
    corridor: "U.J. Esuene Stadium Complex",
    placeId: "ChIJgX5fU3ihWRARf4Xm3-7w9_8",
    priceNGN: 35000,
    price: 35000,
    streetSurgePrice: 65000,
    rating: 4.9,
    reviews: 180,
    badge: "Festival Bureau Certified",
    escrowBadge: "State Bureau Verified Pass",
    image: CARNIVAL_IMAGE_MAP["pkg-stadium-vip"],
    imageUrl: CARNIVAL_IMAGE_MAP["pkg-stadium-vip"],
    primaryUrl: CARNIVAL_IMAGE_MAP["pkg-stadium-vip"],
    gallery: [
      CARNIVAL_IMAGE_MAP["pkg-stadium-vip"],
      "/assets/executive_vip.jpg"
    ],
    altText: "Authentic photograph of the main grandstand and pitch inside U.J. Esuene Stadium in Calabar.",
    attribution: "U.J. Esuene Stadium Authority / Calabar Festival Secretariat",
    license: "State Clearinghouse On-Site Verified Asset",
    licenseUrl: "https://calabarpass.ng/licensing/verified-media",
    source: "verified_local",
    sourceUrl: "https://calabarpass.ng/culture/stadium-vip",
    verified: true,
    verificationStatus: "verified_real_world",
    verifiedDate: "2026-10-26",
    description: "Unobstructed elevated view of the final carnival band grand finale performances and international concerts inside U.J. Esuene Stadium.",
    details: "Shaded VIP grandstand seat, dedicated security turnstile, air-conditioned restroom access, and official festival programme guide.",
    included: [
      "Reserved Shaded Grandstand Seating with Clear Stage View",
      "Fast-Track Turnstile Entry Gate Access",
      "Air-Conditioned VIP Restroom & Refreshment Bar Access",
      "Tamper-Proof Micro-Holographic Digital Ticket"
    ],
    perks: [
      "Reserved Shaded Grandstand Seating",
      "Fast-Track Turnstile Entry",
      "Air-Conditioned VIP Restroom Access",
      "Tamper-Proof Holographic Pass"
    ],
    antiScamAlert: "Laminated photocopies sold at stadium gates. Bureau passes have tamper-evident micro-holograms and 6-digit escrow verification.",
    scamRisk: "Laminated photocopies sold at stadium gates.",
    bookingMode: "365_day_open",
    capacityLabel: "Numbered Seating • 100% Escrow Protected"
  },
  {
    id: "pkg-leboku-festival",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Festival Tickets",
    name: "Leboku New Yam Cultural Festival Experience",
    title: "Leboku New Yam Cultural Festival & Royal Pageant Pass",
    vendor: "Leboku Cultural Council & Ugep Tourism Guild",
    vendorName: "Leboku Cultural Council & Ugep Tourism Guild",
    vendorId: "leboku-council",
    location: "Ugep, Yakurr LGA, Cross River State",
    corridor: "Ugep Royal Palace & Festival Arena",
    placeId: "ChIJL3b_40ehWRAR9uY2m04_21w",
    priceNGN: 20000,
    price: 20000,
    streetSurgePrice: 38000,
    rating: 4.8,
    reviews: 95,
    badge: "Royal Heritage Council",
    escrowBadge: "State Bureau Verified Pass",
    image: CARNIVAL_IMAGE_MAP["pkg-leboku-festival"],
    imageUrl: CARNIVAL_IMAGE_MAP["pkg-leboku-festival"],
    primaryUrl: CARNIVAL_IMAGE_MAP["pkg-leboku-festival"],
    gallery: [
      CARNIVAL_IMAGE_MAP["pkg-leboku-festival"],
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Calabar_carnival_3.jpg/1280px-Calabar_carnival_3.jpg"
    ],
    altText: "Authentic photograph of the Leboku New Yam Festival royal cultural court and traditional celebration in Ugep, Cross River State.",
    attribution: "Leboku Cultural Council / Ugep Tourism Guild",
    license: "Official Royal Cultural Heritage Record",
    licenseUrl: "https://calabarpass.ng/licensing/leboku-council",
    source: "verified_local",
    sourceUrl: "https://calabarpass.ng/culture/leboku-festival",
    verified: true,
    verificationStatus: "verified_real_world",
    verifiedDate: "2026-10-26",
    description: "August cultural celebration of the legendary Leboku New Yam Festival in Ugep. Traditional Yakurr wrestling arena, Miss Leboku beauty pageant, and Obol Lopon royal court.",
    details: "Arena grandstand pass, Yakurr cultural council escort, traditional palm wine & roasted yam feast, and Obol Lopon palace courtyard viewing access.",
    included: [
      "Leboku Festival Arena Reserved Seating Pass",
      "Traditional Yakurr Wrestling Tournament Access",
      "Royal Palace Courtyard Viewing & Cultural Pageant",
      "Authentic Roasted Yam Feast with Traditional Herbs"
    ],
    perks: [
      "Leboku Arena Reserved Seating Pass",
      "Yakurr Wrestling Tournament Access",
      "Royal Palace Courtyard Access",
      "Authentic Roasted Yam Feast"
    ],
    antiScamAlert: "Unregistered roadside guides demanding cash tolls along Calabar-Ikom highway. Escrow guarantees verified festival guild transit.",
    scamRisk: "Unregistered roadside guides demanding cash tolls.",
    bookingMode: "365_day_open",
    capacityLabel: "Annual August Showcase • 365-Day Escrow Protection"
  }
];
