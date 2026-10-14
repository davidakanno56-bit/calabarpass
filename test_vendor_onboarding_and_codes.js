// test_vendor_onboarding_and_codes.js
// Automated verification suite for Vendor Access Code Generator & Merchant Self-Onboarding Architecture

import assert from "assert";
import { 
  generateVendorAccessCode, 
  getCategoryPrefix, 
  generateSecure4DigitString, 
  isValidVendorAccessCodeFormat 
} from "./server/vendorAuth.js";
import { escrowStore } from "./server/store.js";
import { 
  generateVendorAccessCode as clientGenerateCode, 
  handleLocalEscrowFallback 
} from "./client/src/utils/api.js";

console.log("======================================================================");
console.log("🧪 TESTING VENDOR ACCESS CODE GENERATOR & MERCHANT SELF-ONBOARDING");
console.log("======================================================================\n");

// 1. Verify Category Prefixes for All 5 Categories
console.log("1. Verifying Category Prefix Mapping for all 5 Categories...");

const testCategories = [
  { input: "accommodations", expectedPrefix: "CAL-HTL", label: "Accommodations" },
  { input: "Hotels, Resorts, Suites", expectedPrefix: "CAL-HTL", label: "Accommodations keywords" },
  { input: "eco-sites", expectedPrefix: "CAL-ECO", label: "Eco-Sites & Heritage" },
  { input: "Marina Resort, Agbokim Waterfalls, Drill Ranch, Kwa Falls", expectedPrefix: "CAL-ECO", label: "Eco-Sites keywords" },
  { input: "dining-nightlife", expectedPrefix: "CAL-EAT", label: "Dining & Nightlife" },
  { input: "Eateries, Seafood Hubs, Lounges", expectedPrefix: "CAL-EAT", label: "Dining keywords" },
  { input: "trade-expo", expectedPrefix: "CAL-TRD", label: "Trade & Expo Hub" },
  { input: "Ministry of Commerce Trade Fair Booths", expectedPrefix: "CAL-TRD", label: "Trade keywords" },
  { input: "carnival-culture", expectedPrefix: "CAL-CUL", label: "Carnival & Culture" },
  { input: "Carnival Band Passes, Festival Tickets", expectedPrefix: "CAL-CUL", label: "Carnival keywords" },
];

for (const { input, expectedPrefix, label } of testCategories) {
  const prefix = getCategoryPrefix(input);
  assert.strictEqual(prefix, expectedPrefix, `Prefix for "${input}" (${label}) must be ${expectedPrefix}`);
  console.log(`  ✅ PASS: ${label} -> ${prefix}`);
}

// 2. Verify Cryptographic Random 4-Digit String
console.log("\n2. Verifying Cryptographic 4-Digit String Generation [1000 - 9999]...");
const randomCodes = new Set();
for (let i = 0; i < 200; i++) {
  const digits = generateSecure4DigitString();
  assert.strictEqual(digits.length, 4, "Must be exactly 4 digits");
  const num = parseInt(digits, 10);
  assert(num >= 1000 && num <= 9999, `Number must be between 1000 and 9999 (got: ${num})`);
  randomCodes.add(digits);
}
assert(randomCodes.size > 150, `Expected high entropy across 200 samples (got ${randomCodes.size} unique values)`);
console.log(`  ✅ PASS: 200 random 4-digit samples generated with high cryptographic entropy (${randomCodes.size} distinct)`);

// 3. Verify Code Formatting Across Server & Client
console.log("\n3. Verifying Formatted Access Codes on Server & Client...");
const categories = ["accommodations", "eco-sites", "dining-nightlife", "trade-expo", "carnival-culture"];

for (const cat of categories) {
  const serverCode = generateVendorAccessCode(cat);
  const clientCode = clientGenerateCode(cat);

  assert(isValidVendorAccessCodeFormat(serverCode), `Server code "${serverCode}" must pass validation regex`);
  assert(isValidVendorAccessCodeFormat(clientCode), `Client code "${clientCode}" must pass validation regex`);

  const prefix = getCategoryPrefix(cat);
  assert(serverCode.startsWith(prefix), `Server code "${serverCode}" must start with ${prefix}`);
  assert(clientCode.startsWith(prefix), `Client code "${clientCode}" must start with ${prefix}`);

  console.log(`  ✅ PASS: ${cat} -> Server: ${serverCode} | Client: ${clientCode}`);
}

// 4. Verify Server Store Merchant Self-Onboarding
console.log("\n4. Verifying Server Store registerVendor Registration Flow...");
const onboardingPayload = {
  businessName: "Marina Seafood Haven & Catfish Bar",
  category: "dining-nightlife",
  bankPayoutDetails: "Zenith Bank - 1092837465 (Marina Haven Ltd)",
  phone: "+234 803 551 2290",
  location: "Marina Resort Waterfront, Calabar",
  priceNGN: 8500,
  description: "Fresh grilled river catfish and Efik seafood platters with waterfront views."
};

const registered = escrowStore.registerVendor(onboardingPayload);
assert.strictEqual(registered.success, true);
assert(registered.accessCode.startsWith("CAL-EAT-"), `Generated code should start with CAL-EAT (got ${registered.accessCode})`);
assert(registered.vendor.id.startsWith("vnd-marina-seafood-haven"), "Vendor ID correctly slugged");
assert.strictEqual(registered.directoryCard.priceNGN, 8500);
assert.strictEqual(registered.directoryCard.categoryGroup, "dining-nightlife");
console.log(`  ✅ PASS: Registered vendor with code ${registered.accessCode} and directory card ${registered.directoryCard.id}`);

// 5. Verify Terminal Access Verification
console.log("\n5. Verifying Vendor Terminal Access Verification...");
const verifiedVendor = escrowStore.getVendorByAccessCode(registered.accessCode);
assert(!!verifiedVendor, "Vendor must be retrievable via generated access code");
assert.strictEqual(verifiedVendor.name, "Marina Seafood Haven & Catfish Bar");

const masterVendor = escrowStore.getVendorByAccessCode("CALABAR2026");
assert(!!masterVendor && masterVendor.isMaster, "Master code CALABAR2026 verified");
console.log("  ✅ PASS: Generated code and master code CALABAR2026 verified successfully");

// 6. Verify Isolated Terminal Bookings
console.log("\n6. Verifying Private Isolated Terminal Bookings for Newly Onboarded Merchant...");
const activeArrivals = escrowStore.getVendorActiveBookings(registered.vendor.id);
assert(activeArrivals.length >= 1, "New vendor terminal must have isolated initial arrival seeded");
const demoBooking = activeArrivals[0];
assert.strictEqual(demoBooking.vendor, "Marina Seafood Haven & Catfish Bar");
assert.strictEqual(demoBooking.amountNGN, 8500);
console.log(`  ✅ PASS: Isolated terminal booking ${demoBooking.reference} visible only in new vendor's terminal`);

// 7. Verify Multi-Tenant Guard: Other Vendors Cannot Redeem Voucher
console.log("\n7. Verifying Multi-Tenant Isolation (Unauthorized terminal cannot redeem voucher)...");
const unauthorizedRelease = escrowStore.releaseEscrow(demoBooking.reference, "552190", "transcorp-hotel");
assert.strictEqual(unauthorizedRelease.success, false);
assert(unauthorizedRelease.error.includes("Access Denied") || unauthorizedRelease.error.includes("assigned to another merchant"));
console.log("  ✅ PASS: Transcorp Hotel terminal rejected with Access Denied when attempting to redeem Marina Seafood voucher");

// Authorized redemption succeeds
const authorizedRelease = escrowStore.releaseEscrow(demoBooking.reference, "552190", registered.vendor.id);
assert.strictEqual(authorizedRelease.success, true);
assert.strictEqual(authorizedRelease.transaction.status, "COMPLETED_DISBURSED");
console.log("  ✅ PASS: Authorized merchant terminal successfully verified PIN and released escrow payout");

// 8. Verify Client Fallback Handlers
console.log("\n8. Verifying Autonomous Client Fallback Handlers (/api/vendor/*)...");
const clientRegResult = handleLocalEscrowFallback("/api/vendor/register", {
  businessName: "Afi Highland Rainforest Eco-Camp",
  category: "eco-sites",
  bankPayoutDetails: "Access Bank - 9988776655",
  phone: "+234 814 330 9981",
  priceNGN: 35000
}, "POST");

assert.strictEqual(clientRegResult.success, true);
assert(clientRegResult.accessCode.startsWith("CAL-ECO-"));
assert(clientRegResult.directoryCard.id.startsWith("card-vnd-afi-highland"));
console.log(`  ✅ PASS: Client fallback registered vendor with access code ${clientRegResult.accessCode}`);

const clientVerifyResult = handleLocalEscrowFallback("/api/vendor/verify-access", {
  accessCode: clientRegResult.accessCode
}, "POST");
assert.strictEqual(clientVerifyResult.success, true);
console.log("  ✅ PASS: Client fallback verified access code successfully");

const clientCards = handleLocalEscrowFallback("/api/vendor/dynamic-cards");
assert.strictEqual(clientCards.success, true);
assert(clientCards.cards.length >= 1);
console.log(`  ✅ PASS: Client fallback served ${clientCards.cards.length} dynamic directory card(s)`);

// 9. Verify Operator Reset Authentication Guard (CALABAR2026 strictly required)
console.log("\n9. Verifying Operator Reset Authentication Guard (CALABAR2026 required)...");
const unauthClear = handleLocalEscrowFallback("/api/vendor/clear-dynamic", {
  accessCode: "UNAUTHORIZED_123"
}, "POST");
assert.strictEqual(unauthClear.success, false);
assert(unauthClear.error.includes("Access Denied"));
console.log("  ✅ PASS: Non-operator access code rejected with Access Denied for clear-dynamic");

const unauthDelete = handleLocalEscrowFallback("/api/vendor/delete", {
  vendorId: clientRegResult.vendor.id,
  accessCode: "CAL-VND-0000"
}, "POST");
assert.strictEqual(unauthDelete.success, false);
assert(unauthDelete.error.includes("Access Denied"));
console.log("  ✅ PASS: Regular vendor code rejected with Access Denied for delete");

// 10. Verify Authorized Operator Reset & Cleanup
console.log("\n10. Verifying Operator Clear Dynamic Registrations & Storage Cleanup...");
const authClear = handleLocalEscrowFallback("/api/vendor/clear-dynamic", {
  accessCode: "CALABAR2026"
}, "POST");
assert.strictEqual(authClear.success, true);
assert(authClear.message.includes("cleared"));
console.log("  ✅ PASS: CALABAR2026 cleared test registrations successfully");

const postClearCards = handleLocalEscrowFallback("/api/vendor/dynamic-cards");
assert.strictEqual(postClearCards.cards.length, 0, "All dynamic cards purged");
const postClearVendors = handleLocalEscrowFallback("/api/vendor/list");
assert.strictEqual(postClearVendors.vendors.length, 0, "All dynamic vendors purged");
console.log("  ✅ PASS: Dynamic cards and vendors cleanly restored to empty/default baseline");

// 11. Verify Server Store clearDynamicVendors
console.log("\n11. Verifying Server Store clearDynamicVendors (CALABAR2026)...");
const serverClear = escrowStore.clearDynamicVendors("CALABAR2026");
assert.strictEqual(serverClear.success, true);
assert.strictEqual(escrowStore.getDynamicCards().length, 0);
console.log("  ✅ PASS: Server escrowStore cleared all dynamic test cards and restored catalog");

console.log("\n======================================================================");
console.log("RESULTS: ALL VENDOR ONBOARDING & OPERATOR RESET TESTS PASSED (100%)");
console.log("======================================================================\n");
