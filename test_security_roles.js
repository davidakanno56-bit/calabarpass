// test_security_roles.js
// Automated verification for CalabarPass Security, User Roles, and Escrow Commission

async function runSecurityTests() {
  const BASE_URL = "http://localhost:5000";
  console.log("==================================================================");
  console.log("🛡️  CALABARPASS SECURITY, USER ROLES & ESCROW COMMISSION TEST");
  console.log("==================================================================");

  // 1. Test Escrow Transactions Endpoint (Public / Admin Audit)
  console.log("\n[1] Checking /api/escrow/transactions for PIN masking...");
  const txRes = await fetch(`${BASE_URL}/api/escrow/transactions`);
  const txData = await txRes.json();

  if (!txData.success || !Array.isArray(txData.transactions)) {
    throw new Error("Failed to fetch /api/escrow/transactions");
  }

  const activeTx = txData.transactions.find(t => t.status === "ESCROW_LOCKED_ACTIVE");
  if (!activeTx) {
    throw new Error("No active escrow transaction found to test");
  }

  console.log(`- Active Booking Ref: ${activeTx.reference}`);
  console.log(`- Active Booking PIN returned: "${activeTx.checkInPin}"`);

  if (activeTx.checkInPin !== "••••••") {
    throw new Error(`CRITICAL SECURITY FAILURE: Active guest PIN is exposed! Expected "••••••", got "${activeTx.checkInPin}"`);
  }
  console.log("✓ PASS: Active guest PIN is properly masked as '••••••' in public transactions API.");

  // 2. Test Escrow Stats & 7% Platform Commission
  console.log("\n[2] Checking 7% Platform Commission & Escrow Balances in Stats...");
  const stats = txData.stats;
  console.log(`- Total Locked in Escrow Vault: ₦${stats.totalLockedNGN.toLocaleString()}`);
  console.log(`- Disbursed to Local Merchants: ₦${stats.totalDisbursedNGN.toLocaleString()}`);
  console.log(`- Platform Commission Accrued (7%): ₦${stats.platformCommissionNGN.toLocaleString()}`);

  const totalVolume = stats.totalLockedNGN + stats.totalDisbursedNGN;
  const expectedCommission = Math.round(totalVolume * 0.07);

  if (stats.platformCommissionNGN !== expectedCommission) {
    throw new Error(`Commission mismatch: expected ${expectedCommission}, got ${stats.platformCommissionNGN}`);
  }
  console.log(`✓ PASS: Platform Commission is exactly 7% of vault volume (₦${stats.platformCommissionNGN.toLocaleString()}).`);

  // 3. Test Vendor Payouts Endpoint (Isolation & Zero Active PINs)
  console.log("\n[3] Checking /api/vendor/payouts (Vendor Role Isolation)...");
  const payoutRes = await fetch(`${BASE_URL}/api/vendor/payouts`);
  const payoutData = await payoutRes.json();

  if (!payoutData.success || !Array.isArray(payoutData.payouts)) {
    throw new Error("Failed to fetch /api/vendor/payouts");
  }

  console.log(`- Completed Payouts Count: ${payoutData.payouts.length}`);
  
  // Verify NO active transactions exist in vendor payouts
  const containsActive = payoutData.payouts.some(p => p.status !== "COMPLETED_DISBURSED");
  if (containsActive) {
    throw new Error("CRITICAL SECURITY FAILURE: Vendor payouts list contains pending unverified bookings!");
  }
  console.log("✓ PASS: Vendor payouts ledger strictly isolates completed disbursements only.");

  // 4. Test Voucher Verification & PIN Redemption
  console.log("\n[4] Testing On-Site 6-Digit PIN Redemption via /api/escrow/release...");
  // Test invalid PIN
  const badPinRes = await fetch(`${BASE_URL}/api/escrow/release`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference: "CP-DEMO-849201", pin: "000000" })
  });
  const badPinData = await badPinRes.json();
  if (badPinData.success !== false) {
    throw new Error("Security Failure: Wrong PIN was accepted!");
  }
  console.log("✓ PASS: Fraudulent / incorrect PIN correctly rejected by escrow authority.");

  // Test correct PIN
  const goodPinRes = await fetch(`${BASE_URL}/api/escrow/release`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference: "CP-DEMO-849201", pin: "849201" })
  });
  const goodPinData = await goodPinRes.json();
  if (!goodPinData.success || goodPinData.transaction.status !== "COMPLETED_DISBURSED") {
    throw new Error("Valid PIN release failed: " + JSON.stringify(goodPinData));
  }
  console.log(`✓ PASS: Valid 6-digit PIN successfully redeemed and disbursed ₦${goodPinData.transaction.amountNGN.toLocaleString()} to ${goodPinData.transaction.vendor}.`);

  console.log("\n==================================================================");
  console.log("🎉 ALL SECURITY, USER ROLE, AND ESCROW METRICS VERIFIED 100%!");
  console.log("==================================================================");
}

runSecurityTests().catch((err) => {
  console.error("\n❌ TEST FAILED:", err.message);
  process.exit(1);
});
