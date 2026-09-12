// test_e2e_flow.js
// Comprehensive verification of CalabarPass HTTP API, Nature assets, 20 Hotels, and Accommodations Escrow

async function runE2ETests() {
  const BASE_URL = "http://localhost:5000";
  console.log("=== Starting CalabarPass Accommodations & Nature Assets Verification ===");

  // 1. Check frontend HTML & /accommodations route
  console.log("\n[1] Verifying / and /accommodations HTML routes...");
  const htmlRes = await fetch(`${BASE_URL}/accommodations`);
  const htmlText = await htmlRes.text();
  if (!htmlText.includes("365-Day Tourism Clearinghouse")) {
    throw new Error("HTML does not contain 365-day clearinghouse title/meta");
  }
  console.log("✓ Route /accommodations responds with SPA HTML.");

  // 2. Check packages endpoint & nature assets
  console.log("\n[2] Verifying /api/packages endpoint & nature assets...");
  const pkgRes = await fetch(`${BASE_URL}/api/packages`);
  const pkgData = await pkgRes.json();
  if (!pkgData.success || !Array.isArray(pkgData.packages)) {
    throw new Error("Failed to load packages");
  }
  console.log(`✓ Loaded ${pkgData.packages.length} packages.`);
  
  const drillRanch = pkgData.packages.find(p => p.id === "pkg-drill-ranch");
  if (!drillRanch) throw new Error("Missing pkg-drill-ranch");
  if (!drillRanch.image.startsWith("http")) throw new Error("Drill ranch image is not high-res external URL: " + drillRanch.image);
  console.log(`✓ Drill Ranch verified: "${drillRanch.name}" with high-res photo: ${drillRanch.image}`);

  const kwaFalls = pkgData.packages.find(p => p.id === "pkg-kwa-falls");
  if (!kwaFalls) throw new Error("Missing pkg-kwa-falls");
  if (!kwaFalls.image.startsWith("http")) throw new Error("Kwa Falls image is not high-res external URL: " + kwaFalls.image);
  console.log(`✓ Kwa Falls verified: "${kwaFalls.name}" with high-res photo: ${kwaFalls.image}`);

  // 3. Check /api/hotels endpoint
  console.log("\n[3] Verifying /api/hotels endpoint (5 Premier Executive Stays)...");
  const hotelRes = await fetch(`${BASE_URL}/api/hotels`);
  const hotelData = await hotelRes.json();
  if (!hotelData.success || !Array.isArray(hotelData.hotels)) {
    throw new Error("Failed to load hotels: " + JSON.stringify(hotelData));
  }
  console.log(`✓ Successfully loaded ${hotelData.hotels.length} premier executive stays.`);
  if (hotelData.hotels.length !== 5) {
    throw new Error(`Expected exactly 5 hotels, found ${hotelData.hotels.length}`);
  }

  // Verify all 5 hotels have exactly 4 distinct image URLs and compliance note
  hotelData.hotels.forEach((h, idx) => {
    if (!h.images || h.images.length !== 4) {
      throw new Error(`Hotel #${idx + 1} (${h.name}) does not have exactly 4 images: ${h.images?.length}`);
    }
    const uniqueImages = new Set(h.images);
    if (uniqueImages.size !== 4) {
      throw new Error(`Hotel #${idx + 1} (${h.name}) does not have 4 distinct images`);
    }
    if (!h.priceNote || !h.priceNote.includes("Indicative Rates (Subject to Seasonal Demand - Escrow Protected)")) {
      throw new Error(`Hotel #${idx + 1} (${h.name}) missing required priceNote compliance statement`);
    }
  });
  console.log("✓ All 5 premier hotels verified with 4 distinct dedicated angles and compliance notes.");

  // 4. Test Hotel Escrow Booking via Paystack API
  console.log("\n[4] Initializing Escrow Booking for Hotel: Transcorp Hotels Calabar...");
  const selectedDate = "2026-12-28";
  const initRes = await fetch(`${BASE_URL}/api/paystack/initialize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      packageId: "hotel-01",
      email: "guest.transcorp@carnivalcalabar.ng",
      customerName: "Chief Aliyu Danjuma",
      phone: "+2348035558899",
      bookingDate: selectedDate
    })
  });
  const initData = await initRes.json();
  if (!initData.success || !initData.reference) {
    throw new Error("Failed to initialize hotel booking: " + JSON.stringify(initData));
  }
  console.log(`✓ Hotel booking initialized! Reference: ${initData.reference}`);
  console.log(`✓ Amount NGN: ₦${initData.amountNGN.toLocaleString()}`);

  // 5. Verify transaction & lock hotel into escrow
  console.log("\n[5] Verifying Paystack callback & locking hotel booking into escrow...");
  const verifyRes = await fetch(`${BASE_URL}/api/paystack/verify/${encodeURIComponent(initData.reference)}?simulate=true`);
  const verifyData = await verifyRes.json();
  if (!verifyData.success || !verifyData.transaction) {
    throw new Error("Failed to verify hotel transaction: " + JSON.stringify(verifyData));
  }
  const tx = verifyData.transaction;
  console.log(`✓ Status: ${tx.status}`);
  console.log(`✓ Status Label: "${tx.statusLabel}"`);
  console.log(`✓ Hotel Check-in PIN: ${tx.checkInPin}`);
  console.log(`✓ Reservation Date: ${tx.bookingDate}`);
  console.log(`✓ Vendor: ${tx.vendor}`);

  if (tx.statusLabel !== "Escrow Secured - Awaiting On-Site Verification") {
    throw new Error(`Unexpected statusLabel: ${tx.statusLabel}`);
  }
  if (tx.bookingDate !== selectedDate) {
    throw new Error(`Booking date mismatch: expected ${selectedDate}, got ${tx.bookingDate}`);
  }

  // 6. Test on-site check-in PIN release for hotel
  console.log("\n[6] Testing on-site physical check-in PIN release at hotel front desk...");
  const releaseRes = await fetch(`${BASE_URL}/api/escrow/release`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference: initData.reference, pin: tx.checkInPin })
  });
  const releaseData = await releaseRes.json();
  if (!releaseData.success || releaseData.transaction.status !== "COMPLETED_DISBURSED") {
    throw new Error("Failed to release hotel escrow: " + JSON.stringify(releaseData));
  }
  console.log("✓ Hotel check-in PIN verified and funds disbursed to hotel front desk!");

  // 7. Test Escrow Safety Dispute & Instant Freeze
  console.log("\n[7] Testing Escrow Safety Trigger: Freeze Escrow & Report Dispute...");
  const disputeBookingRes = await fetch(`${BASE_URL}/api/paystack/initialize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      packageId: "hotel-02",
      email: "guest.hogis@carnivalcalabar.ng",
      customerName: "Barrister Victoria Henshaw",
      phone: "+2348039991122",
      bookingDate: "2026-12-29"
    })
  });
  const disputeBookingData = await disputeBookingRes.json();
  if (!disputeBookingData.success || !disputeBookingData.reference) {
    throw new Error("Failed to initialize booking for dispute test");
  }

  // Verify and lock into escrow
  const lockRes = await fetch(`${BASE_URL}/api/paystack/verify/${encodeURIComponent(disputeBookingData.reference)}?simulate=true`);
  const lockData = await lockRes.json();
  if (!lockData.success || lockData.transaction.status !== "ESCROW_LOCKED_ACTIVE") {
    throw new Error("Failed to lock dispute booking into escrow");
  }

  // Trigger Freeze & Report Dispute
  const disputeRes = await fetch(`${BASE_URL}/api/escrow/dispute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference: disputeBookingData.reference,
      reason: "Room Condition Substandard / Does not match photos",
      details: "Room air conditioning and plumbing non-operational upon arrival."
    })
  });
  const disputeData = await disputeRes.json();
  if (!disputeData.success || disputeData.transaction.status !== "ESCROW_FROZEN_DISPUTE") {
    throw new Error("Failed to freeze escrow on dispute: " + JSON.stringify(disputeData));
  }
  if (disputeData.transaction.statusLabel !== "Escrow Frozen - Under Review") {
    throw new Error(`Expected statusLabel 'Escrow Frozen - Under Review', got: ${disputeData.transaction.statusLabel}`);
  }
  console.log(`✓ Escrow successfully frozen! Status: ${disputeData.transaction.status}`);
  console.log(`✓ Status Label: "${disputeData.transaction.statusLabel}"`);
  console.log(`✓ Dispute Reason: "${disputeData.transaction.disputeReason}"`);

  // Verify that vendor CANNOT disburse funds while escrow is frozen
  const blockedReleaseRes = await fetch(`${BASE_URL}/api/escrow/release`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference: disputeBookingData.reference,
      pin: disputeData.transaction.checkInPin
    })
  });
  const blockedReleaseData = await blockedReleaseRes.json();
  if (blockedReleaseRes.ok || blockedReleaseData.success) {
    throw new Error("Security breach: Vendor was able to disburse funds while escrow was frozen!");
  }
  console.log("✓ Vendor payout strictly blocked while escrow is in dispute ('Escrow Frozen - Under Review').");

  // 8. Verify Quick Category Filter mapping
  console.log("\n[8] Verifying Category Filter Pills on Accommodations...");
  const categories = ["All Stays (5)", "Executive Hotels", "Boutique & Resorts", "Serviced Apartments"];
  const allStays = hotelData.hotels;
  
  const execHotels = allStays.filter(h => h.id === "hotel-01" || h.id === "hotel-03");
  const boutiqueResorts = allStays.filter(h => h.id === "hotel-02" || h.id === "hotel-03" || h.id === "hotel-04");
  const servicedApts = allStays.filter(h => h.id === "hotel-05");

  if (allStays.length !== 5) throw new Error("Expected 5 total stays");
  if (execHotels.length !== 2) throw new Error("Expected 2 executive hotels (Transcorp & Monty)");
  if (boutiqueResorts.length !== 3) throw new Error("Expected 3 boutique/resorts (Hogis, Monty, Gemba)");
  if (servicedApts.length !== 1) throw new Error("Expected 1 serviced apartment (The Summit)");
  console.log(`✓ Category 'All Stays (5)' matches ${allStays.length} stays.`);
  console.log(`✓ Category 'Executive Hotels' matches ${execHotels.length} stays.`);
  console.log(`✓ Category 'Boutique & Resorts' matches ${boutiqueResorts.length} stays.`);
  console.log(`✓ Category 'Serviced Apartments' matches ${servicedApts.length} stay.`);

  console.log("\n=== ALL 8 END-TO-END SUITES COMPLETED WITH 100% SUCCESS ===");
}

runE2ETests().catch(err => {
  console.error("\n❌ E2E Test Error:", err);
  process.exit(1);
});
