// test_inventory_separation.js
// Verification suite for inventory strict separation and curated tourism packages

import assert from "assert";
import { PACKAGES } from "./client/src/data/packages.js";
import { HOTELS } from "./client/src/data/hotels.js";
import { handleLocalEscrowFallback } from "./client/src/utils/api.js";

console.log("===============================================================");
console.log("🧪 TESTING INVENTORY STRICT SEPARATION & TOUR PACKAGES");
console.log("===============================================================\n");

// 1. Strict Category Isolation
console.log("1. Verifying Strict Category Isolation (Zero hotels in Verified Packages)...");
assert.strictEqual(PACKAGES.length, 6, `Verified Packages must contain exactly 6 packages (got: ${PACKAGES.length})`);
console.log("  ✅ PASS: Exactly 6 packages in Verified Packages");

const lodgingCategories = ["Hotel", "Hotels", "Accommodation", "Accommodations", "Hostel", "Lodging", "Resort Stay"];
const hotelPackages = PACKAGES.filter(p => lodgingCategories.includes(p.category) || p.category.toLowerCase().includes("hotel"));
assert.strictEqual(hotelPackages.length, 0, `No hotel products must exist in Verified Packages (found: ${hotelPackages.length})`);
console.log("  ✅ PASS: 0 hotels/lodging found in Verified Packages tab");

// Check that Transcorp and Hogis hotel room packages are not in PACKAGES
assert(!PACKAGES.some(p => p.id === "pkg-transcorp-suite"), 'Transcorp suite is NOT in packages');
assert(!PACKAGES.some(p => p.id === "pkg-hogis-deluxe"), 'Hogis deluxe room is NOT in packages');
console.log("  ✅ PASS: Transcorp & Hogis room packages completely removed from Verified Packages");

// Verify Accommodations inventory
console.log("\n2. Verifying Accommodations Directory (HOTELS)...");
assert(Array.isArray(HOTELS) && HOTELS.length === 5, `HOTELS must contain 5 executive stays (got: ${HOTELS.length})`);
assert(HOTELS.some(h => h.name.includes("Transcorp")), "Transcorp Hotel in HOTELS directory");
assert(HOTELS.some(h => h.name.includes("Hogis")), "Hogis Luxury Suites in HOTELS directory");
assert(HOTELS.some(h => h.name.includes("Monty")), "Monty Suites in HOTELS directory");
assert(HOTELS.some(h => h.name.includes("Gemba")), "Gemba Resorts in HOTELS directory");
assert(HOTELS.some(h => h.name.includes("Summit")), "The Summit in HOTELS directory");
console.log("  ✅ PASS: Accommodations section strictly contains the 5 executive hotels");

// 3. Verify Package 1: Obudu Mountain Resort Expedition
console.log("\n3. Verifying Package 1: Obudu Mountain Resort Expedition...");
const obudu = PACKAGES.find(p => p.id === "pkg-obudu-expedition");
assert(!!obudu, 'Package "pkg-obudu-expedition" exists');
assert.strictEqual(obudu.title, "Obudu Mountain Resort Cable Car & Plateau Retreat");
assert.strictEqual(obudu.vendor, "Obudu Highland Tours & Rangers");
assert.strictEqual(obudu.vendorId, "obudu-tours");
assert.strictEqual(obudu.location, "Obanliku LGA, Cross River State");
assert.strictEqual(obudu.price, 85000);
assert.strictEqual(obudu.category, "Eco-Tourism & Highlands");
assert(Array.isArray(obudu.included), "included is an array");
assert.strictEqual(obudu.included.length, 4, "included has 4 items");
assert(obudu.included.includes("Highland cable car pass"), "included highland cable car pass");
assert(obudu.included.includes("Canopy walkway guide & Holy Mountain trail pass"), "included canopy walkway guide");
assert(obudu.included.includes("Private 4WD plateau transfer from Calabar/Ogoja"), "included private 4WD plateau transfer");
assert(obudu.included.includes("State ranger escort"), "included state ranger escort");
assert.strictEqual(obudu.antiScamAlert, "Unauthorized touts soliciting unverified offline 4WD transit at Ogoja junction.");
console.log("  ✅ PASS: Obudu Mountain Resort Expedition fields match specifications exactly");

// 4. Verify Package 2: Kwa Falls Ecotourism & River Basin Adventure
console.log("\n4. Verifying Package 2: Kwa Falls Guided Canyon Walk & River Basin Tour...");
const kwa = PACKAGES.find(p => p.id === "pkg-kwa-falls");
assert(!!kwa, 'Package "pkg-kwa-falls" exists');
assert.strictEqual(kwa.title, "Kwa Falls Guided Canyon Walk & River Basin Tour");
assert.strictEqual(kwa.vendor, "Akamkpa Eco-Guides Guild");
assert.strictEqual(kwa.vendorId, "akamkpa-guides");
assert.strictEqual(kwa.location, "Akamkpa LGA, Cross River State");
assert.strictEqual(kwa.price, 18000);
assert.strictEqual(kwa.category, "Nature & Adventure");
assert(Array.isArray(kwa.included), "included is an array");
assert.strictEqual(kwa.included.length, 4, "included has 4 items");
assert(kwa.included.includes("234-step stone staircase river descent pass"), "included 234-step descent");
assert(kwa.included.includes("Certified life vest & river basin ranger guide"), "included life vest & ranger guide");
assert(kwa.included.includes("Roundtrip transit from Calabar city centre"), "included roundtrip transit");
assert(kwa.included.includes("Escrow-secured guide fees"), "included escrow-secured guide fees");
assert.strictEqual(kwa.antiScamAlert, "Informal youth checkpoints along the plantation access road demanding cash tolls.");
console.log("  ✅ PASS: Kwa Falls Guided Canyon Walk fields match specifications exactly");

// 5. Verify Remaining Premier Packages
console.log("\n5. Verifying Remaining 4 Premier Tour Packages...");
const agbokim = PACKAGES.find(p => p.id === "pkg-agbokim-waterfalls");
assert(!!agbokim, 'Package 3: Agbokim Waterfalls exists');
assert.strictEqual(agbokim.title, "Agbokim Waterfalls Guided Day Expedition");
console.log("  ✅ PASS: Package 3: Agbokim Waterfalls Guided Day Expedition verified");

const drillRanch = PACKAGES.find(p => p.id === "pkg-drill-ranch");
assert(!!drillRanch, 'Package 4: Afi Drill Monkey Ranch exists');
assert.strictEqual(drillRanch.title, "Afi Drill Monkey Ranch & Canopy Walkway Tour");
console.log("  ✅ PASS: Package 4: Afi Drill Monkey Ranch & Canopy Walkway Tour verified");

const marinaCruise = PACKAGES.find(p => p.id === "pkg-marina-cruise");
assert(!!marinaCruise, 'Package 5: Marina Resort Cruise exists');
assert.strictEqual(marinaCruise.title, "Marina Resort Waterway Cruise & Slave History Tour");
console.log("  ✅ PASS: Package 5: Marina Resort Waterway Cruise & Slave History Tour verified");

const seagullBand = PACKAGES.find(p => p.id === "pkg-seagull-pass");
assert(!!seagullBand, 'Package 6: Seagull Band VIP Pass exists');
assert.strictEqual(seagullBand.title, "Official Carnival Calabar VIP Route Pass (Seagull Band)");
console.log("  ✅ PASS: Package 6: Official Carnival Calabar VIP Route Pass (Seagull Band) verified");

// 6. Test Autonomous Client API Fallback
console.log("\n6. Testing Autonomous API Fallback with New Inventory...");
const fallbackPkgs = handleLocalEscrowFallback("/api/packages");
assert.strictEqual(fallbackPkgs.success, true);
assert.strictEqual(fallbackPkgs.packages.length, 6);
assert(fallbackPkgs.packages.some(p => p.id === "pkg-obudu-expedition"), "Fallback serves Obudu");
assert(fallbackPkgs.packages.some(p => p.id === "pkg-kwa-falls"), "Fallback serves Kwa Falls");
assert(!fallbackPkgs.packages.some(p => p.id === "pkg-transcorp-suite"), "Fallback does NOT serve hotels as packages");
console.log("  ✅ PASS: Autonomous fallback returns the 6 tour packages with zero hotels");

// 7. Test Obudu booking & Escrow Release in Autonomous Mode
console.log("\n7. Testing Obudu Booking & Terminal Settlement Flow...");
const initObudu = handleLocalEscrowFallback("/api/paystack/initialize", {
  packageId: "pkg-obudu-expedition",
  email: "tourist@example.com",
  customerName: "Chief Okon",
  phone: "+234 802 000 1122"
}, "POST");
assert.strictEqual(initObudu.success, true);
const obuduRef = initObudu.reference;

const verifyObudu = handleLocalEscrowFallback(`/api/paystack/verify/${encodeURIComponent(obuduRef)}`);
assert.strictEqual(verifyObudu.success, true);
assert.strictEqual(verifyObudu.transaction.status, "ESCROW_LOCKED_ACTIVE");
const obuduPin = verifyObudu.transaction.checkInPin;
console.log(`  ✅ PASS: Obudu booking locked in escrow with PIN ${obuduPin}`);

// Check Obudu Vendor Terminal sees booking
const obuduPayouts = handleLocalEscrowFallback(`/api/vendor/payouts?vendor=obudu-tours`);
assert.strictEqual(obuduPayouts.success, true);
assert(obuduPayouts.activeBookings.some(b => b.reference === obuduRef), "Obudu terminal displays active arrival");
console.log("  ✅ PASS: Obudu Highland Tours terminal sees incoming guest arrival");

// Release Obudu Escrow via PIN
const releaseObudu = handleLocalEscrowFallback("/api/escrow/release", {
  reference: obuduRef,
  pin: obuduPin,
  vendor: "obudu-tours"
}, "POST");
assert.strictEqual(releaseObudu.success, true);
assert.strictEqual(releaseObudu.transaction.status, "COMPLETED_DISBURSED");
console.log("  ✅ PASS: Obudu terminal successfully verified PIN and released escrow disbursement");

console.log("\n===============================================================");
console.log("RESULTS: ALL INVENTORY SEPARATION TESTS PASSED (100% SUCCESS)");
console.log("===============================================================\n");
