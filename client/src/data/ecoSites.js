// client/src/data/ecoSites.js
// CalabarPass Eco-Sites & Heritage Data
// Explicit object-ID based image mapping: zero sequential index matching, zero unrelated fallbacks.

import { PACKAGES as CORE_PACKAGES } from "./packages.js";

export const ECO_SITES_IMAGE_MAP = {
  // Obudu Mountain Resort
  "obudu-mountain-resort": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg/1280px-Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg",
  "pkg-obudu-expedition": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg/1280px-Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg",
  "dest-obudu": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg/1280px-Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg",

  // Kwa Falls
  "kwa-falls": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kwa_Falls_Calabar_41.jpg/1280px-Kwa_Falls_Calabar_41.jpg",
  "pkg-kwa-falls": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kwa_Falls_Calabar_41.jpg/1280px-Kwa_Falls_Calabar_41.jpg",
  "dest-kwa-falls": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kwa_Falls_Calabar_41.jpg/1280px-Kwa_Falls_Calabar_41.jpg",

  // Agbokim Waterfalls
  "agbokim-waterfalls": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Agbokim_waterfalls.jpg/1280px-Agbokim_waterfalls.jpg",
  "pkg-agbokim-waterfalls": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Agbokim_waterfalls.jpg/1280px-Agbokim_waterfalls.jpg",
  "dest-agbokim": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Agbokim_waterfalls.jpg/1280px-Agbokim_waterfalls.jpg",
  "eco-agbokim": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Agbokim_waterfalls.jpg/1280px-Agbokim_waterfalls.jpg",

  // Oban Rainforest / Cross River National Park
  "oban-rainforest": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Cross_River_National_Park_1.jpg/1280px-Cross_River_National_Park_1.jpg",
  "vnd-oban-rainforest-lodge-mvl902b": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Cross_River_National_Park_1.jpg/1280px-Cross_River_National_Park_1.jpg",
  "eco-oban-canopy": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Cross_River_National_Park_1.jpg/1280px-Cross_River_National_Park_1.jpg",

  // Drill Monkey Ranch / Afi Mountain Wildlife Sanctuary
  "drill-monkey-ranch": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
  "pkg-drill-ranch": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
  "dest-drill-ranch": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",

  // Marina Resort & Slave History Museum
  "pkg-marina-cruise": "/assets/marina_resort.jpg",
  "dest-marina-resort": "/assets/marina_resort.jpg",
  "eco-marina-resort": "/assets/marina_resort.jpg",

  // National Museum Calabar (Old Residency)
  "dest-national-museum": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Old_Residency%2C_National_Museum%2C_Calabar_02.jpg/1280px-Old_Residency%2C_National_Museum%2C_Calabar_02.jpg",
  "eco-old-residency": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Old_Residency%2C_National_Museum%2C_Calabar_02.jpg/1280px-Old_Residency%2C_National_Museum%2C_Calabar_02.jpg"
};

/**
 * Retrieve verified photo URL strictly by object ID
 */
export function getEcoSiteImageById(id) {
  if (!id) return null;
  const key = String(id).toLowerCase().trim();
  return ECO_SITES_IMAGE_MAP[key] || null;
}

// 6 Eco-Sites & Heritage Directory Cards
export const RAW_ECO_SITES_CARDS = [
  ...CORE_PACKAGES.filter(p => p.id !== "pkg-seagull-pass").map(p => ({
    ...p,
    categoryGroup: "eco-sites",
    subCategory: p.id === "pkg-obudu-expedition" ? "Highland Sanctuary"
      : p.id === "pkg-agbokim-waterfalls" || p.id === "pkg-kwa-falls" ? "Waterfalls & Canyons"
      : p.id === "pkg-drill-ranch" ? "Wildlife & Rainforest"
      : "Waterfront & Heritage",
    imageUrl: ECO_SITES_IMAGE_MAP[p.id] || p.imageUrl || p.image,
    image: p.image && p.image.startsWith("/images/agbokim.jpg") ? p.image : (ECO_SITES_IMAGE_MAP[p.id] || p.image),
    primaryUrl: ECO_SITES_IMAGE_MAP[p.id] || p.primaryUrl || p.image
  })),
  {
    id: "vnd-oban-rainforest-lodge-mvl902b",
    categoryGroup: "eco-sites",
    category: "Eco-Sites & Heritage",
    subCategory: "Wildlife & Rainforest",
    name: "Oban Rainforest Canopy Lodge",
    title: "Oban Rainforest Canopy Lodge & Ranger Tour",
    vendor: "Oban Rainforest Canopy Lodge",
    vendorName: "Oban Rainforest Canopy Lodge",
    vendorId: "vnd-oban-rainforest-lodge-mvl902b",
    location: "Cross River National Park (Oban Division)",
    corridor: "Cross River National Park (Oban Division)",
    placeId: "ChIJk8a2_92jWRAR84m2_04xV88",
    priceNGN: 42000,
    price: 42000,
    rating: 4.8,
    reviews: 78,
    badge: "National Park Sanctuary",
    escrowBadge: "State Bureau Verified Operator",
    imageUrl: ECO_SITES_IMAGE_MAP["oban-rainforest"],
    image: ECO_SITES_IMAGE_MAP["oban-rainforest"],
    primaryUrl: ECO_SITES_IMAGE_MAP["oban-rainforest"],
    gallery: [
      ECO_SITES_IMAGE_MAP["oban-rainforest"],
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rainforest_in_Cross_River_National_Park.jpg/1280px-Rainforest_in_Cross_River_National_Park.jpg"
    ],
    altText: "Authentic photograph of pristine rainforest foliage and canopy walkway trail in Cross River National Park (Oban Division).",
    attribution: "Heinrich-Böll-Stiftung / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "wikimedia_commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rainforest_in_Cross_River_National_Park.jpg",
    verified: true,
    verificationStatus: "verified_real_world",
    verifiedDate: "2026-10-26",
    description: "Eco-certified forest cabins with canopy walkway guides, birdwatching towers, and ranger patrol deep inside Cross River National Park.",
    details: "Full-day guided rainforest expedition, canopy walkway access, binoculars rental, certified park ranger escort, and herbal refreshment kit.",
    included: [
      "Cross River National Park Canopy Walkway Pass",
      "Certified Eco-Ranger & Primatologist Guide",
      "Birdwatching Tower & Binoculars Equipment",
      "Conservation Fund Contribution & Forest Lunch"
    ],
    perks: [
      "Canopy Walkway Pass",
      "Certified Eco-Ranger Guide",
      "Birdwatching Tower Access",
      "Conservation Fund Pass"
    ],
    antiScamAlert: "Unlicensed poachers and illegal tour operators solicit inside Akamkpa junctions. Only book via verified state escrow.",
    scamRisk: "Unlicensed guides without safety equipment soliciting at Akamkpa.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Escrow Protected"
  }
];

export const ECO_SITES_CARDS = RAW_ECO_SITES_CARDS;
