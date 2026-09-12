// test_vercel_fallback.js
// Verification of Autonomous Client Mode & Vercel HTML/404 Fallback Handling

import { handleLocalEscrowFallback } from "./client/src/utils/api.js";

async function runVercelFallbackTests() {
  console.log("===============================================================");
  console.log("🧪 TESTING VERCEL HTML/404 AUTONOMOUS CLIENT FALLBACK");
  console.log("===============================================================\n");

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

  // 1. Packages Catalog Fallback
  console.log("1. Testing /api/packages fallback...");
  const pkgData = handleLocalEscrowFallback("/api/packages");
  assert(pkgData.success === true, "Returned success: true");
  assert(Array.isArray(pkgData.packages) && pkgData.packages.length === 6, `Returned 6 packages (got: ${pkgData.packages?.length})`);
  assert(pkgData.packages.some(p => p.id === "pkg-agbokim-waterfalls"), 'Contains "pkg-agbokim-waterfalls"');

  console.log("");

  // 2. Paystack Config Fallback
  console.log("2. Testing /api/config/paystack fallback...");
  const configData = handleLocalEscrowFallback("/api/config/paystack");
  assert(configData.success === true, "Returned success: true");
  assert(!!configData.publicKey && configData.publicKey.startsWith("pk_test_"), `Returned valid Paystack public key (${configData.publicKey})`);

  console.log("");

  // 3. Fair Prices Fallback
  console.log("3. Testing /api/fair-prices fallback...");
  const fairData = handleLocalEscrowFallback("/api/fair-prices");
  assert(fairData.success === true, "Returned success: true");
  assert(Array.isArray(fairData.fairPrices) && fairData.fairPrices.length > 0, `Returned ${fairData.fairPrices?.length} fair price benchmarks`);
  assert(Array.isArray(fairData.scamAdvisories) && fairData.scamAdvisories.length > 0, `Returned ${fairData.scamAdvisories?.length} scam advisories`);

  console.log("");

  // 4. Paystack Initialize Fallback
  console.log("4. Testing /api/paystack/initialize fallback...");
  const initPayload = {
    packageId: "pkg-agbokim-waterfalls",
    customerName: "Obinna Emecheta",
    email: "tourist@carnivalcalabar.ng",
    phone: "+234 803 456 7890",
    bookingDate: "2026-11-20"
  };
  const initData = handleLocalEscrowFallback("/api/paystack/initialize", initPayload, "POST");
  assert(initData.success === true, "Initialize returned success: true");
  assert(!!initData.reference && initData.reference.startsWith("CP-"), `Generated booking reference: ${initData.reference}`);

  console.log("");

  // 5. Paystack Verify Fallback
  console.log("5. Testing /api/paystack/verify/:reference fallback...");
  const verifyEndpoint = `/api/paystack/verify/${encodeURIComponent(initData.reference)}`;
  const verifyData = handleLocalEscrowFallback(verifyEndpoint);
  assert(verifyData.success === true, "Verify returned success: true");
  assert(verifyData.transaction?.status === "ESCROW_LOCKED_ACTIVE", "Status locked as ESCROW_LOCKED_ACTIVE");
  assert(verifyData.transaction?.statusLabel === "Escrow Secured - Awaiting On-Site Verification", "statusLabel matches official escrow string");
  assert(!!verifyData.transaction?.checkInPin && verifyData.transaction.checkInPin.length === 6, `Generated 6-digit PIN: ${verifyData.transaction?.checkInPin}`);
  const touristPin = verifyData.transaction.checkInPin;

  console.log("");

  // 6. Vendor Arrivals & Payouts Fallback (Ikom Ecotourism)
  console.log("6. Testing /api/vendor/payouts fallback for Ikom Ecotourism...");
  const vendorData = handleLocalEscrowFallback("/api/vendor/payouts?vendor=ikom-ecotourism");
  assert(vendorData.success === true, "Vendor payouts returned success: true");
  const foundInArrivals = vendorData.activeBookings.find(b => b.reference === initData.reference);
  assert(!!foundInArrivals, `Booking ${initData.reference} found in Ikom Ecotourism active arrivals!`);
  assert(foundInArrivals?.checkInPin === "••••••", "PIN is masked for tourist privacy in arrival list");

  console.log("");

  // 7. Multi-Tenant Scope Guard Fallback (Transcorp attempts to claim Agbokim voucher)
  console.log("7. Testing Multi-Tenant Scope Guard fallback...");
  const crossClaim = handleLocalEscrowFallback("/api/escrow/release", {
    reference: initData.reference,
    pin: touristPin,
    vendor: "transcorp-hotel"
  }, "POST");
  assert(crossClaim.success === false, "Cross-merchant claim rejected");
  assert(crossClaim.error.includes("Access Denied"), `Correct error returned: "${crossClaim.error}"`);

  console.log("");

  // 8. Bad PIN Rejection Fallback
  console.log("8. Testing Invalid PIN Rejection fallback...");
  const badPinClaim = handleLocalEscrowFallback("/api/escrow/release", {
    reference: initData.reference,
    pin: "000000",
    vendor: "ikom-ecotourism"
  }, "POST");
  assert(badPinClaim.success === false, "Invalid PIN rejected");
  assert(badPinClaim.error.includes("Invalid 6-Digit Check-In PIN"), `Correct error returned: "${badPinClaim.error}"`);

  console.log("");

  // 9. Legitimate On-Site Escrow Release Fallback
  console.log("9. Testing Legitimate Escrow Release fallback...");
  const goodClaim = handleLocalEscrowFallback("/api/escrow/release", {
    reference: initData.reference,
    pin: touristPin,
    vendor: "ikom-ecotourism"
  }, "POST");
  assert(goodClaim.success === true, "Escrow release succeeded");
  assert(goodClaim.transaction?.status === "COMPLETED_DISBURSED", "Status updated to COMPLETED_DISBURSED");
  assert(!!goodClaim.transaction?.disbursedAt, `Disbursed timestamp recorded: ${goodClaim.transaction?.disbursedAt}`);

  // Re-check vendor terminal to ensure it moved from activeBookings to payouts
  const postReleaseVendor = handleLocalEscrowFallback("/api/vendor/payouts?vendor=ikom-ecotourism");
  const inPayouts = postReleaseVendor.payouts.some(p => p.reference === initData.reference);
  const inActive = postReleaseVendor.activeBookings.some(b => b.reference === initData.reference);
  assert(inPayouts, `Booking ${initData.reference} moved to Completed Merchant Payouts Ledger`);
  assert(!inActive, "Booking successfully removed from active arrivals");

  console.log("");

  // 10. Escrow Manager Transactions & Stats Fallback
  console.log("10. Testing /api/escrow/transactions audit fallback...");
  const auditData = handleLocalEscrowFallback("/api/escrow/transactions");
  assert(auditData.success === true, "Audit endpoint returned success: true");
  assert(Array.isArray(auditData.transactions) && auditData.transactions.length > 0, `Returned ${auditData.transactions?.length} total escrow transactions`);
  assert(auditData.stats?.totalDisbursedNGN > 0, `Calculated total disbursed: ₦${auditData.stats?.totalDisbursedNGN.toLocaleString()}`);
  assert(auditData.stats?.platformRevenueNGN > 0, `Calculated 7% platform commission: ₦${auditData.stats?.platformRevenueNGN.toLocaleString()}`);

  console.log("\n===============================================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("===============================================================");

  if (failed > 0) process.exit(1);
}

runVercelFallbackTests();
