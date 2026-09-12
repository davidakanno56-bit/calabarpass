// test_multitenant_isolation.js
// Automated verification of Multi-Tenant Data Isolation and Scope Guards

async function runTests() {
  console.log("=================================================");
  console.log("🧪 CALABARPASS MULTI-TENANT ISOLATION TEST SUITE");
  console.log("=================================================\n");

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

  // TEST 1: Transcorp Hotel Payouts Isolation
  console.log("1. Testing Transcorp Hotel Isolated Ledger Query...");
  try {
    const res = await fetch("http://localhost:5000/api/vendor/payouts?vendor=Transcorp");
    const data = await res.json();
    assert(data.success === true, "Query returned success: true");
    assert(data.payouts.length > 0, `Found ${data.payouts.length} payout(s) for Transcorp`);
    const allTranscorp = data.payouts.every(p => (p.vendor || "").toLowerCase().includes("transcorp"));
    assert(allTranscorp, "All returned transactions strictly belong to Transcorp Hotel");
    const hasCompetitor = data.payouts.some(p => (p.vendor || "").toLowerCase().includes("seagull"));
    assert(!hasCompetitor, "No competitor (Seagull Band) transactions exposed in Transcorp ledger");
  } catch (err) {
    assert(false, `Transcorp ledger query failed with error: ${err.message}`);
  }

  console.log("");

  // TEST 2: Seagull Band Secretariat Isolation
  console.log("2. Testing Seagull Band Secretariat Isolated Ledger Query...");
  try {
    const res = await fetch("http://localhost:5000/api/vendor/payouts?vendor=Seagull");
    const data = await res.json();
    assert(data.success === true, "Query returned success: true");
    assert(data.payouts.length > 0, `Found ${data.payouts.length} payout(s) for Seagull Band`);
    const allSeagull = data.payouts.every(p => (p.vendor || "").toLowerCase().includes("seagull"));
    assert(allSeagull, "All returned transactions strictly belong to Seagull Band Secretariat");
    const hasTranscorp = data.payouts.some(p => (p.vendor || "").toLowerCase().includes("transcorp"));
    assert(!hasTranscorp, "No competitor (Transcorp Hotel) transactions exposed in Seagull Band ledger");
  } catch (err) {
    assert(false, `Seagull Band ledger query failed with error: ${err.message}`);
  }

  console.log("");

  // TEST 3: PIN Verification Scope Guard (Competitor Voucher Denial)
  console.log("3. Testing PIN Verification Scope Guard (Cross-Merchant Voucher Rejection)...");
  try {
    // Transcorp attempts to redeem Seagull Band voucher CP-DEMO-849201 with PIN 849201
    const res = await fetch("http://localhost:5000/api/escrow/release", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference: "CP-DEMO-849201",
        pin: "849201",
        vendor: "Transcorp Hotel Calabar"
      })
    });
    const data = await res.json();
    assert(res.status === 400 || !data.success, "Cross-merchant redemption was rejected");
    assert(
      data.error === "Access Denied: This booking voucher is assigned to another merchant.",
      `Exact error returned: "${data.error}"`
    );
  } catch (err) {
    assert(false, `Scope guard test failed with error: ${err.message}`);
  }

  console.log("");

  // TEST 4: Valid PIN Redemption for Authenticated Merchant
  console.log("4. Testing Valid Check-In Redemption for Authenticated Merchant...");
  try {
    // Transcorp redeems its own active reservation CP-DEMO-551902 with PIN 551902
    const res = await fetch("http://localhost:5000/api/escrow/release", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference: "CP-DEMO-551902",
        pin: "551902",
        vendor: "Transcorp Hotel Calabar"
      })
    });
    const data = await res.json();
    assert(data.success === true, "Legitimate voucher redemption succeeded");
    assert(data.transaction?.status === "COMPLETED_DISBURSED", "Status updated to COMPLETED_DISBURSED");
    assert(data.transaction?.amountNGN === 90000, "Disbursed amount is ₦90,000");
  } catch (err) {
    assert(false, `Legitimate redemption failed with error: ${err.message}`);
  }

  console.log("");

  // TEST 5: Ledger Update Verification Post-Disbursement
  console.log("5. Testing Dynamic Ledger Update After Legitimate Settlement...");
  try {
    const res = await fetch("http://localhost:5000/api/vendor/payouts?vendor=Transcorp");
    const data = await res.json();
    const hasNewDisbursement = data.payouts.some(p => p.reference === "CP-DEMO-551902");
    assert(hasNewDisbursement, "Newly redeemed voucher CP-DEMO-551902 now appears in Transcorp ledger");
    const totalDisbursed = data.payouts.reduce((sum, p) => sum + (p.amountNGN || 0), 0);
    assert(totalDisbursed === 270000, `Transcorp total disbursed calculated accurately as ₦${totalDisbursed.toLocaleString()} (was ₦180,000 + ₦90,000)`);
  } catch (err) {
    assert(false, `Post-settlement ledger check failed with error: ${err.message}`);
  }

  console.log("\n=================================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
