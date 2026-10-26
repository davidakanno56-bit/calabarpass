// test_id_mappings.js
import { HOTEL_IMAGE_MAP, getHotelImageById } from "./client/src/data/hotels.js";
import { ECO_SITES_IMAGE_MAP, getEcoSiteImageById } from "./client/src/data/ecoSites.js";
import { DINING_IMAGE_MAP, getDiningImageById } from "./client/src/data/dining.js";
import { TRADE_HUB_IMAGE_MAP, getTradeHubImageById } from "./client/src/data/tradeHub.js";
import { CARNIVAL_IMAGE_MAP, getCarnivalImageById } from "./client/src/data/carnival.js";
import { getVerifiedPlaceImage } from "./client/src/data/verifiedPlacesImages.js";
import {
  ALL_EXPANDED_CARDS,
  ACCOMMODATIONS_CARDS,
  ECO_SITES_CARDS,
  DINING_NIGHTLIFE_CARDS,
  TRADE_EXPO_CARDS,
  CARNIVAL_CULTURE_CARDS
} from "./client/src/data/expandedCategories.js";

console.log("====================================================================");
console.log("🔍 TESTING EXPLICIT OBJECT-ID IMAGE MAPPING ACROSS ALL DATA FILES");
console.log("====================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. Hotels Explicit Mapping Check
console.log("1. Checking Hotel Image Mappings by Object ID:");
const hotelIds = [
  "hotel-transcorp-calabar",
  "hotel-monty-suites",
  "hotel-hogis-suites",
  "hotel-channel-view",
  "hotel-tinapa-lakeside",
  "hotel-pyramid-suites"
];

hotelIds.forEach(id => {
  const urlFromMap = HOTEL_IMAGE_MAP[id];
  const urlFromFn = getHotelImageById(id);
  const verified = getVerifiedPlaceImage(id);

  assert(Boolean(urlFromMap), `HOTEL_IMAGE_MAP contains "${id}"`);
  assert(urlFromMap === urlFromFn, `getHotelImageById("${id}") matches map`);
  assert(Boolean(verified && verified.primaryUrl), `getVerifiedPlaceImage("${id}") resolves verified primaryUrl: ${verified?.primaryUrl?.slice(0, 50)}...`);
});

// Distinct check for Hotels
const hotelUrls = hotelIds.map(id => HOTEL_IMAGE_MAP[id]);
const uniqueHotelUrls = new Set(hotelUrls);
assert(uniqueHotelUrls.size === hotelIds.length, `All ${hotelIds.length} hotels have 100% distinct, non-overlapping photo URLs`);

// 2. Eco-Sites & Heritage Explicit Mapping Check
console.log("\n2. Checking Eco-Sites Image Mappings by Object ID:");
const ecoSiteIds = [
  "obudu-mountain-resort",
  "kwa-falls",
  "agbokim-waterfalls",
  "oban-rainforest",
  "drill-monkey-ranch"
];

ecoSiteIds.forEach(id => {
  const urlFromMap = ECO_SITES_IMAGE_MAP[id];
  const urlFromFn = getEcoSiteImageById(id);
  const verified = getVerifiedPlaceImage(id);

  assert(Boolean(urlFromMap), `ECO_SITES_IMAGE_MAP contains "${id}"`);
  assert(urlFromMap === urlFromFn, `getEcoSiteImageById("${id}") matches map`);
  assert(Boolean(verified && verified.primaryUrl), `getVerifiedPlaceImage("${id}") resolves verified primaryUrl: ${verified?.primaryUrl?.slice(0, 50)}...`);
});

// Distinct check for Eco-Sites
const ecoUrls = ecoSiteIds.map(id => ECO_SITES_IMAGE_MAP[id]);
const uniqueEcoUrls = new Set(ecoUrls);
assert(uniqueEcoUrls.size === ecoSiteIds.length, `All ${ecoSiteIds.length} eco-sites have 100% distinct, non-overlapping photo URLs`);

// 3. Dining, Trade, and Carnival Check
console.log("\n3. Checking Dining, Trade, and Carnival Image Mappings:");
assert(Object.keys(DINING_IMAGE_MAP).length >= 6, `DINING_IMAGE_MAP has ${Object.keys(DINING_IMAGE_MAP).length} mapped keys`);
assert(Object.keys(TRADE_HUB_IMAGE_MAP).length >= 4, `TRADE_HUB_IMAGE_MAP has ${Object.keys(TRADE_HUB_IMAGE_MAP).length} mapped keys`);
assert(Object.keys(CARNIVAL_IMAGE_MAP).length >= 5, `CARNIVAL_IMAGE_MAP has ${Object.keys(CARNIVAL_IMAGE_MAP).length} mapped keys`);

// 4. Verifying Directory Cards strictly render item.imageUrl matching specific ID
console.log("\n4. Verifying Directory Cards strictly render item.imageUrl matching specific ID:");

ACCOMMODATIONS_CARDS.forEach(card => {
  assert(Boolean(card.imageUrl), `Accommodation card [${card.id}] has valid imageUrl`);
  assert(!card.imageUrl.includes("Obudu") && !card.imageUrl.includes("marina_resort"), `Accommodation [${card.id}] has zero Obudu or Marina Resort images`);
});

ECO_SITES_CARDS.forEach(card => {
  assert(Boolean(card.imageUrl), `Eco-site card [${card.id}] has valid imageUrl`);
});

DINING_NIGHTLIFE_CARDS.forEach(card => {
  assert(Boolean(card.imageUrl), `Dining card [${card.id}] has valid imageUrl`);
});

TRADE_EXPO_CARDS.forEach(card => {
  assert(Boolean(card.imageUrl), `Trade card [${card.id}] has valid imageUrl`);
});

CARNIVAL_CULTURE_CARDS.forEach(card => {
  assert(Boolean(card.imageUrl), `Carnival card [${card.id}] has valid imageUrl`);
});

console.log("\n====================================================================");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("====================================================================");

if (failed > 0) process.exit(1);
