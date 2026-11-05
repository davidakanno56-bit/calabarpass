// test_markup_and_tax_payout.js
// Verification suite for CalabarPass Automated Markup, 2% State Tax, and Net Vendor Payouts

import assert from "assert";
import { calculatePricingBreakdown, formatNaira } from "./client/src/utils/pricing.ts";
import { escrowStore } from "./server/store.js";
import { handleLocalEscrowFallback } from "./client/src/utils/api.ts";

console.log("=====================================================================");
console.log("🧪 TESTING AUTOMATED PLATFORM MARKUP, 2% STATE TAX & NET VENDOR PAYOUT");
console.log("=====================================================================\n");

// 1. Unit Tests for calculatePricingBreakdown
console.log("1. Testing calculatePricingBreakdown math across price tiers...");

// Case A: ₦50,000 (Standard mid-range tier -> +₦5,000 markup)
const midTier = calculatePricingBreakdown(50000);
assert.strictEqual(midTier.basePrice, 50000, "Base price should be 50,000");
assert.strictEqual(midTier.platformMarkup, 5000, "Platform markup should be 5,000 for 50k base");
assert.strictEqual(midTier.taxAmount, 1000, "2% tax on 50,000 should be 1,000");
assert.strictEqual(midTier.vendorPayout, 49000, "Vendor payout should be 49,000 (50k - 1k tax)");
assert.strictEqual(midTier.publicListingPrice, 55000, "Public listing price should be 55,000");
assert.strictEqual(midTier.vendorPayout + midTier.taxAmount + midTier.platformMarkup, midTier.publicListingPrice, "Total split must balance with public price");
console.log("  ✅ PASS: ₦50,000 Base -> Public: ₦55,000 | Payout: ₦49,000 | Tax: ₦1,000 | Markup: ₦5,000");

// Case B: ₦100,000 (High-tier >= ₦75,000 -> +₦10,000 markup)
const highTier = calculatePricingBreakdown(100000);
assert.strictEqual(highTier.basePrice, 100000);
assert.strictEqual(highTier.platformMarkup, 10000, "Platform markup should be 10,000 for 100k base");
assert.strictEqual(highTier.taxAmount, 2000, "2% tax on 100,000 should be 2,000");
assert.strictEqual(highTier.vendorPayout, 98000, "Vendor payout should be 98,000");
assert.strictEqual(highTier.publicListingPrice, 110000, "Public listing price should be 110,000");
console.log("  ✅ PASS: ₦100,000 Base -> Public: ₦110,000 | Payout: ₦98,000 | Tax: ₦2,000 | Markup: ₦10,000");

// Case C: ₦15,000 (Budget tier < ₦20,000 -> +₦2,500 markup)
const budgetTier = calculatePricingBreakdown(15000);
assert.strictEqual(budgetTier.basePrice, 15000);
assert.strictEqual(budgetTier.platformMarkup, 2500);
assert.strictEqual(budgetTier.taxAmount, 300, "2% tax on 15,000 should be 300");
assert.strictEqual(budgetTier.vendorPayout, 14700, "Vendor payout should be 14,700");
assert.strictEqual(budgetTier.publicListingPrice, 17500);
console.log("  ✅ PASS: ₦15,000 Base -> Public: ₦17,500 | Payout: ₦14,700 | Tax: ₦300 | Markup: ₦2,500");

// 2. Server-side EscrowStore Registration
console.log("\n2. Testing Server EscrowStore registerVendor pricing integration...");
const serverVendor = escrowStore.registerVendor({
  businessName: "Grand Calabar Waterfront Resort",
  category: "accommodations",
  bankPayoutDetails: "Zenith Bank - 1029384756",
  phone: "+234 803 111 2233",
  email: "reservations@grandcalabarwaterfront.ng",
  priceNGN: 50000
});

assert.strictEqual(serverVendor.success, true);
assert.strictEqual(serverVendor.vendor.basePriceNGN, 50000, "Vendor record preserves base price of 50,000");
assert.strictEqual(serverVendor.vendor.platformMarkupNGN, 5000, "Platform markup is 5,000");
assert.strictEqual(serverVendor.vendor.taxNGN, 1000, "Tax is 1,000");
assert.strictEqual(serverVendor.vendor.vendorPayoutNGN, 49000, "Net payout is 49,000");
assert.strictEqual(serverVendor.directoryCard.priceNGN, 55000, "Public card price includes 5k markup (55,000)");
assert.strictEqual(serverVendor.directoryCard.basePriceNGN, 50000);
assert.strictEqual(serverVendor.directoryCard.vendorPayoutNGN, 49000);
console.log("  ✅ PASS: Server registerVendor successfully saved base ₦50k, marked up card to ₦55k, and set net payout ₦49k");

// 3. Admin Pending Queue Pricing Transparency
console.log("\n3. Testing Admin Pending Queue pricing fields...");
const pendingList = escrowStore.getPendingVendors();
const pendingVendor = pendingList.find(v => v.id === serverVendor.vendor.id);
assert(!!pendingVendor, "Newly registered vendor must be in pending list");
assert.strictEqual(pendingVendor.basePriceNGN, 50000);
assert.strictEqual(pendingVendor.platformMarkupNGN, 5000);
assert.strictEqual(pendingVendor.taxNGN, 1000);
assert.strictEqual(pendingVendor.vendorPayoutNGN, 49000);
assert.strictEqual(pendingVendor.priceNGN, 55000);
console.log("  ✅ PASS: Admin queue has full transparency over Base, Markup, 2% Tax, and Net Payout");

// 4. Client Autonomous Fallback Engine
console.log("\n4. Testing Autonomous Client Fallback (/api/vendor/register)...");
const clientRes = handleLocalEscrowFallback("/api/vendor/register", {
  businessName: "Marina Floating Seafood Terrace",
  category: "dining-nightlife",
  bankPayoutDetails: "Access Bank - 0987654321",
  phone: "+234 802 334 5566",
  email: "orders@marinafloatingseafood.ng",
  priceNGN: 20000
});

assert.strictEqual(clientRes.success, true);
assert.strictEqual(clientRes.vendor.basePriceNGN, 20000);
assert.strictEqual(clientRes.vendor.platformMarkupNGN, 5000);
assert.strictEqual(clientRes.vendor.taxNGN, 400); // 2% of 20,000
assert.strictEqual(clientRes.vendor.vendorPayoutNGN, 19600); // 20,000 - 400
assert.strictEqual(clientRes.directoryCard.priceNGN, 25000); // 20,000 + 5,000
console.log("  ✅ PASS: Client fallback registered vendor with base ₦20k, card ₦25k, net payout ₦19.6k");

// 5. Escrow Release Net Payout
console.log("\n5. Testing Escrow Release net payout verification...");
const initialBookingRef = clientRes.vendor.demo[0];
const releaseRes = handleLocalEscrowFallback("/api/escrow/release", {
  reference: initialBookingRef,
  pin: "552190",
  vendor: "Marina Floating Seafood Terrace"
});

assert.strictEqual(releaseRes.success, true);
assert.strictEqual(releaseRes.transaction.status, "COMPLETED_DISBURSED");
assert(releaseRes.message.includes("19,600"), `Message should mention net payout ₦19,600 (got: ${releaseRes.message})`);
assert(releaseRes.message.includes("2% state tax"), "Message should mention 2% state tax");
console.log("  ✅ PASS: Escrow release message correctly disburses net ₦19,600 after 2% state tax");

console.log("\n=====================================================================");
console.log("RESULTS: ALL MARKUP, 2% TAX & VENDOR PAYOUT TESTS PASSED (100%)");
console.log("=====================================================================");
