// test_balanced_terminals.js
// Automated verification of Streamlined Packages, Booking-to-Vendor Mapping, and 6 Balanced Launch Terminals

async function runTests() {
  console.log("===============================================================");
  console.log("🧪 CALABARPASS STREAMLINED PACKAGES & BALANCED TERMINALS TEST");
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

  // 1. Verify Streamlined 6 Packages Catalog
  console.log("1. Testing Streamlined 6 Packages Catalog...");
  try {
    const res = await fetch("http://localhost:5000/api/packages");
    const data = await res.json();
    assert(data.success === true, "Packages endpoint returned success: true");
    assert(data.packages.length === 6, `Exactly 6 packages returned (received: ${data.packages.length})`);

    const expected = [
      { id: "pkg-transcorp-suite", vendorId: "transcorp-hotel", price: 180000, cat: "Hotel" },
      { id: "pkg-hogis-deluxe", vendorId: "hogis-suites", price: 65000, cat: "Hotel" },
      { id: "pkg-marina-cruise", vendorId: "marina-resort", price: 25000, cat: "Eco-Tourism" },
      { id: "pkg-drill-ranch", vendorId: "afi-drill", price: 45000, cat: "Eco-Tourism" },
      { id: "pkg-agbokim-waterfalls", vendorId: "ikom-ecotourism", price: 25000, cat: "Eco-Tourism" },
      { id: "pkg-seagull-pass", vendorId: "seagull-band", price: 85000, cat: "Carnival" }
    ];

    for (const exp of expected) {
      const pkg = data.packages.find(p => p.id === exp.id);
      assert(!!pkg, `Package "${exp.id}" exists in catalog`);
      if (pkg) {
        assert(pkg.vendorId === exp.vendorId, `  - ${pkg.name}: vendorId === "${exp.vendorId}"`);
        assert(pkg.priceNGN === exp.price, `  - ${pkg.name}: priceNGN === ₦${exp.price.toLocaleString()}`);
        assert(pkg.category === exp.cat, `  - ${pkg.name}: category === "${exp.cat}"`);
      }
    }
  } catch (err) {
    assert(false, `Packages catalog check failed: ${err.message}`);
  }

  console.log("");

  // 2. Test Booking-to-Vendor Mapping for Marina Resort
  console.log("2. Testing Booking Creation & Vendor Mapping (Marina Resort Cruise)...");
  let newBookingRef = null;
  let newBookingPin = null;

  try {
    const initRes = await fetch("http://localhost:5000/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId: "pkg-marina-cruise",
        customerName: "Blessing Bassey",
        email: "blessing.b@example.com",
        phone: "+234 802 334 1188",
        bookingDate: "2026-10-15"
      })
    });
    const initData = await initRes.json();
    assert(initData.success === true, "Paystack transaction initialized for Marina Resort");
    newBookingRef = initData.reference;
    assert(!!newBookingRef, `Generated Booking Reference: ${newBookingRef}`);

    // Simulate Paystack verified payment callback
    const verifyRes = await fetch(`http://localhost:5000/api/paystack/verify/${encodeURIComponent(newBookingRef)}?simulate=true`);
    const verifyData = await verifyRes.json();
    assert(verifyData.success === true, "Paystack payment verification succeeded");
    assert(verifyData.transaction?.vendorId === "marina-resort", `Transaction vendorId is explicitly "marina-resort" (got: ${verifyData.transaction?.vendorId})`);
    assert(verifyData.transaction?.vendor === "Marina Resort & Waterway Bureau", `Transaction vendor is "Marina Resort & Waterway Bureau"`);
    assert(verifyData.transaction?.status === "ESCROW_LOCKED_ACTIVE", "Escrow status locked as ESCROW_LOCKED_ACTIVE");
    newBookingPin = verifyData.transaction?.checkInPin;
    assert(!!newBookingPin && newBookingPin.length === 6, `Secret 6-Digit Check-In PIN generated: ${newBookingPin}`);
  } catch (err) {
    assert(false, `Booking test failed: ${err.message}`);
  }

  console.log("");

  // 3. Test Vendor Terminal Visibility for Marina Resort
  console.log("3. Testing Terminal Visibility in Marina Resort Terminal...");
  try {
    const termRes = await fetch("http://localhost:5000/api/vendor/payouts?vendor=marina-resort");
    const termData = await termRes.json();
    assert(termData.success === true, "Marina Resort terminal query succeeded");
    assert(Array.isArray(termData.activeBookings), "Returns activeBookings array");

    const foundBooking = termData.activeBookings.find(b => b.reference === newBookingRef);
    assert(!!foundBooking, `New booking ${newBookingRef} shows up in Marina Resort terminal active arrivals!`);
    if (foundBooking) {
      assert(foundBooking.customerName === "Blessing Bassey", `Guest name matches: ${foundBooking.customerName}`);
      assert(foundBooking.amountNGN === 25000, `Amount matches: ₦${foundBooking.amountNGN.toLocaleString()}`);
      assert(foundBooking.checkInPin === "••••••", "PIN is properly masked in list for tourist privacy");
    }

    // Ensure it does NOT appear in another terminal (e.g. Monty Suites)
    const montyRes = await fetch("http://localhost:5000/api/vendor/payouts?vendor=monty-suites");
    const montyData = await montyRes.json();
    const leakedToMonty = (montyData.activeBookings || []).some(b => b.reference === newBookingRef);
    assert(!leakedToMonty, `Tenant Isolation: Booking does NOT leak into Monty Suites terminal`);
  } catch (err) {
    assert(false, `Terminal visibility check failed: ${err.message}`);
  }

  console.log("");

  // 4. Test Cross-Tenant Scope Guard (Monty Suites attempts to claim Marina Resort booking)
  console.log("4. Testing PIN Verification Scope Guard (Monty Suites attempting cross-claim)...");
  try {
    const stealRes = await fetch("http://localhost:5000/api/escrow/release", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference: newBookingRef,
        pin: newBookingPin,
        vendor: "monty-suites"
      })
    });
    const stealData = await stealRes.json();
    assert(stealRes.status === 400 || !stealData.success, "Cross-merchant claim rejected");
    assert(
      stealData.error === "Access Denied: This booking voucher is assigned to another merchant.",
      `Exact required error returned: "${stealData.error}"`
    );
  } catch (err) {
    assert(false, `Scope guard test failed: ${err.message}`);
  }

  console.log("");

  // 5. Test Legitimate On-Site Check-In Redemption by Marina Resort
  console.log("5. Testing Legitimate Redemption by Marina Resort...");
  try {
    const redeemRes = await fetch("http://localhost:5000/api/escrow/release", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference: newBookingRef,
        pin: newBookingPin,
        vendor: "marina-resort"
      })
    });
    const redeemData = await redeemRes.json();
    assert(redeemData.success === true, "Redemption succeeded by authenticated vendor");
    assert(redeemData.transaction?.status === "COMPLETED_DISBURSED", "Status updated to COMPLETED_DISBURSED");

    // Check terminal ledger after redemption
    const postRes = await fetch("http://localhost:5000/api/vendor/payouts?vendor=marina-resort");
    const postData = await postRes.json();
    const inPayouts = (postData.payouts || []).some(p => p.reference === newBookingRef);
    assert(inPayouts, `Booking ${newBookingRef} moved to Completed Merchant Payouts Ledger`);
    const stillInActive = (postData.activeBookings || []).some(b => b.reference === newBookingRef);
    assert(!stillInActive, "Booking successfully removed from incoming active arrivals");
  } catch (err) {
    assert(false, `Legitimate redemption failed: ${err.message}`);
  }

  console.log("\n===============================================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("===============================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
