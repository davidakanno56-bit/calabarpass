// test_admin_vendor_queue_and_email.js
// Automated verification suite for Admin Moderation Queue, Merchant Review Workflow & AfSNET Accommodations

import assert from "assert";
import { escrowStore } from "./server/store.js";
import { getDispatchedEmails, clearDispatchedEmails } from "./server/mail.js";
import { officialAfSnetHotels } from "./server/hotels.js";
import { officialAfSnetHotels as clientHotels } from "./client/src/data/hotels.js";
import { 
  handleLocalEscrowFallback,
  getStoredPendingVendors,
  saveStoredPendingVendors
} from "./client/src/utils/api.js";

console.log("======================================================================");
console.log("🧪 TESTING ADMIN MODERATION QUEUE, EMAIL DISPATCH & AFSNET DATASET");
console.log("======================================================================\n");

// 1. Verify Part 2: Official AfSNET Hotel Dataset
console.log("1. Verifying Part 2: Official AfSNET Hotel Dataset Structure & URLs...");
assert(Array.isArray(officialAfSnetHotels), "officialAfSnetHotels must be an array");
assert.strictEqual(officialAfSnetHotels.length, 8, "Must contain exactly 8 official AfSNET hotels");
assert.strictEqual(clientHotels.length, 8, "Client officialAfSnetHotels must contain 8 hotels");

const expectedHotelIds = [
  "metropolitan-hotel",
  "monty-suites",
  "channel-view",
  "gemba-hotel",
  "hogis-royale",
  "pearl-suites",
  "ug-wis",
  "de-grand"
];

for (const id of expectedHotelIds) {
  const hotel = officialAfSnetHotels.find(h => h.id === id);
  assert(!!hotel, `Hotel "${id}" must exist in officialAfSnetHotels`);
  assert(hotel.imageUrl && (hotel.imageUrl.startsWith("https://images.unsplash.com/") || hotel.imageUrl.startsWith("https://encrypted-tbn0.gstatic.com/")), `Hotel ${id} must have real verified photography URL`);
  assert(hotel.pricePerNight && hotel.pricePerNight.startsWith("₦"), `Hotel ${id} must have formatted pricePerNight`);
  assert(hotel.rating && hotel.rating.includes("star"), `Hotel ${id} must have star rating string`);
  assert(hotel.distanceToCICC && hotel.distanceToCICC.includes("minutes to CICC"), `Hotel ${id} must specify distanceToCICC`);
  assert(hotel.phone && hotel.phone.startsWith("+234"), `Hotel ${id} must have official contact phone`);
  assert(hotel.email && hotel.email.includes("@"), `Hotel ${id} must have direct reservation email`);
  console.log(`  ✅ PASS: ${hotel.name} (${hotel.rating}, ${hotel.pricePerNight}, ${hotel.distanceToCICC})`);
}

// 2. Verify Initial Pending Queue in Server Store
console.log("\n2. Verifying Initial Seeded Pending Queue in escrowStore...");
const initialPending = escrowStore.getPendingVendors();
assert(Array.isArray(initialPending), "getPendingVendors must return an array");
assert(initialPending.length >= 2, `Should have at least 2 seeded pending vendors (got ${initialPending.length})`);
for (const p of initialPending) {
  assert.strictEqual(p.status, "pending", "Vendor status must be pending");
  assert(p.business_name, "Vendor must have business_name");
  assert(p.email, "Vendor must have contact email");
  console.log(`  ✅ PASS: Found pending application: "${p.business_name}" (${p.category}) - ${p.email}`);
}

// 3. Verify Incoming Merchant Registration Sits in Pending Queue
console.log("\n3. Verifying Incoming Merchant Self-Registration Sits in Pending Queue...");
const newApplication = {
  businessName: "Calabar Jazz & River Palms Lounge",
  category: "dining-nightlife",
  bankPayoutDetails: "First Bank - 3098271625 (River Palms Ltd)",
  phone: "+234 809 443 2190",
  email: "reservations@riverpalmsjazz.com",
  location: "Calabar River Esplanade",
  priceNGN: 12500
};

const regResult = escrowStore.registerVendor(newApplication);
assert.strictEqual(regResult.success, true);
assert(regResult.vendor.id.startsWith("vnd-calabar-jazz"), "Vendor ID correctly slugged");

// Check pending list
const currentPending = escrowStore.getPendingVendors();
const foundInPending = currentPending.find(v => v.id === regResult.vendor.id);
assert(!!foundInPending, "Newly registered merchant must sit in pending queue");
assert.strictEqual(foundInPending.status, "pending");
assert.strictEqual(foundInPending.email, "reservations@riverpalmsjazz.com");
console.log(`  ✅ PASS: ${foundInPending.business_name} successfully sitting in pending queue with email ${foundInPending.email}`);

// 4. Verify Approval Workflow & Automated Email Dispatch
console.log("\n4. Verifying Approval Workflow & Automated Approval Email Dispatch...");
clearDispatchedEmails();

const approveResult = escrowStore.reviewVendor(regResult.vendor.id, "approve");
assert.strictEqual(approveResult.status, "success");
assert.strictEqual(approveResult.success, true);
assert(approveResult.merchant_code.startsWith("CAL-DIN-"), `Merchant code should be CAL-DIN-... (got ${approveResult.merchant_code})`);

// Verify email dispatch
const emails = getDispatchedEmails("reservations@riverpalmsjazz.com");
assert.strictEqual(emails.length, 1, "Exactly 1 email dispatched to merchant");
const approvalEmail = emails[0];
assert.strictEqual(approvalEmail.subject, "🎉 Your CalabarPass Merchant Account is Approved!");
assert(approvalEmail.body.includes(approveResult.merchant_code), "Approval body includes official state merchant code");
assert(approvalEmail.body.includes("Calabar Jazz & River Palms Lounge"), "Approval body includes business name");
assert(approvalEmail.body.includes("Vendor Settlement Terminal"), "Approval body mentions settlement terminal");
console.log(`  ✅ PASS: Approval email successfully triggered to ${approvalEmail.to}`);
console.log(`          Code issued: ${approveResult.merchant_code}`);

// Verify vendor is removed from pending queue
const postApprovePending = escrowStore.getPendingVendors();
assert(!postApprovePending.some(v => v.id === regResult.vendor.id), "Vendor must be removed from pending queue upon approval");
console.log("  ✅ PASS: Approved vendor cleanly cleared from pending queue");

// 5. Verify Removal / Rejection Workflow & Rejection Email Dispatch
console.log("\n5. Verifying Removal / Rejection Workflow & Rejection Email Dispatch...");
clearDispatchedEmails();

const rejectApplication = {
  businessName: "Suspicious Unlicensed Street Kiosk",
  category: "trade-expo",
  bankPayoutDetails: "Unknown Bank - 0000000000",
  phone: "+234 800 111 2222",
  email: "fakeoperator@unknownbox.com",
  priceNGN: 5000
};

const rejectReg = escrowStore.registerVendor(rejectApplication);
assert.strictEqual(rejectReg.success, true);

const removeResult = escrowStore.reviewVendor(rejectReg.vendor.id, "remove");
assert.strictEqual(removeResult.status, "success");
assert.strictEqual(removeResult.success, true);

// Verify rejection email dispatch
const rejectEmails = getDispatchedEmails("fakeoperator@unknownbox.com");
assert.strictEqual(rejectEmails.length, 1, "Exactly 1 rejection email dispatched");
const rejectionEmail = rejectEmails[0];
assert.strictEqual(rejectionEmail.subject, "Update Regarding Your CalabarPass Registration");
assert(rejectionEmail.body.includes("compliance and security standards"), "Rejection body mentions compliance standards");
assert(rejectionEmail.body.includes("Suspicious Unlicensed Street Kiosk"), "Rejection body includes business name");
console.log(`  ✅ PASS: Removal email successfully triggered to ${rejectionEmail.to}`);

// Verify invalid action validation
console.log("\n6. Verifying Validation Guards (Invalid action & Non-existent vendor)...");
const existingPending = escrowStore.getPendingVendors()[0];
const invalidAction = escrowStore.reviewVendor(existingPending.id, "destroy");
assert.strictEqual(invalidAction.success, false);
assert.strictEqual(invalidAction.invalidAction, true);
assert.strictEqual(invalidAction.error, "Invalid action parameter.");
console.log("  ✅ PASS: Invalid action parameter rejected with 400 error");

const notFound = escrowStore.reviewVendor("non-existent-vendor-id-999", "approve");
assert.strictEqual(notFound.success, false);
assert.strictEqual(notFound.notFound, true);
assert.strictEqual(notFound.error, "Vendor not found.");
console.log("  ✅ PASS: Non-existent vendor rejected with 404 error");

// 7. Verify Autonomous Client Fallback Review Handlers
console.log("\n7. Verifying Autonomous Client Fallback (/api/admin/vendors/*)...");
const clientPending = handleLocalEscrowFallback("/api/admin/vendors/pending");
assert(Array.isArray(clientPending), "Client fallback pending must return array");
assert(clientPending.length >= 1, "Client fallback has pending items");

const testClientVendorId = clientPending[0].id;
const clientApprove = handleLocalEscrowFallback(
  `/api/admin/vendors/${testClientVendorId}/review?action=approve`,
  { action: "approve" },
  "POST"
);
assert.strictEqual(clientApprove.status, "success");
assert(clientApprove.message.includes("approved"));
assert(clientApprove.merchant_code.startsWith("CAL-"), "Client issued state code");
console.log(`  ✅ PASS: Client fallback approved vendor ${testClientVendorId} with code ${clientApprove.merchant_code}`);

const clientPendingAfter = handleLocalEscrowFallback("/api/admin/vendors/pending");
assert(!clientPendingAfter.some(v => v.id === testClientVendorId), "Client pending queue updated");
console.log("  ✅ PASS: Client pending queue cleanly updated after review");

console.log("\n======================================================================");
console.log("RESULTS: ALL ADMIN QUEUE, EMAIL DISPATCH & AFSNET TESTS PASSED (100%)");
console.log("======================================================================\n");
