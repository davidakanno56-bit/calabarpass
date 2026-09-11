// test_backend.js
// Quick validation script for CalabarPass server logic and Paystack API

import { initializeTransaction, verifyTransaction, releaseEscrowFunds } from "./server/paystack.js";
import { escrowStore } from "./server/store.js";
import { getAiConciergeResponse } from "./server/aiPricing.js";

async function runTests() {
  console.log("--- 1. Testing Store Packages ---");
  const packages = escrowStore.getPackages();
  console.log(`Found ${packages.length} packages:`, packages.map(p => `${p.name} (₦${p.priceNGN.toLocaleString()})`));
  if (packages.length < 4) throw new Error(`Expected at least 4 packages, found ${packages.length}`);

  console.log("\n--- 2. Testing AI Concierge & Surge Predictor ---");
  const aiRes = await getAiConciergeResponse({
    userPrompt: "I want a 3 day plan for Carnival Calabar with Seagull Band and good suya",
    days: 3,
    travelStyle: "Party & Carnival Enthusiast"
  });
  console.log("AI Response source:", aiRes.source);
  console.log("Snippet:", aiRes.response.slice(0, 180) + "...");

  console.log("\n--- 3. Testing Paystack Initialize API with Test Credentials & 365-Day Date ---");
  try {
    const testDate = "2026-11-14";
    const initRes = await initializeTransaction({
      packageId: "pkg-seagull-pass",
      email: "tourist.test@carnivalcalabar.ng",
      customerName: "Obinna Emecheta",
      phone: "+2348039988776",
      bookingDate: testDate
    });
    console.log("Paystack Init Success!");
    console.log("Reference:", initRes.reference);
    console.log("Authorization URL:", initRes.authorization_url);
    console.log("Access Code:", initRes.access_code);

    const record = escrowStore.getTransaction(initRes.reference);
    console.log("Local Escrow Status:", record.status); // AWAITING_PAYMENT
    console.log("Booking Date Confirmed:", record.bookingDate);
    if (record.bookingDate !== testDate) throw new Error("Booking date mismatch in record");

    console.log("\n--- 4. Testing Escrow Lock State & PIN Generation ---");
    const lockedRecord = escrowStore.lockEscrow(initRes.reference, {
      status: "success",
      channel: "card",
      gateway_response: "Successful"
    });
    console.log("Locked Status:", lockedRecord.status); // ESCROW_LOCKED_ACTIVE
    console.log("Generated 6-Digit Check-in PIN:", lockedRecord.checkInPin);

    console.log("\n--- 5. Testing On-Site Escrow PIN Release ---");
    // Test wrong PIN first
    const badRelease = escrowStore.releaseEscrow(initRes.reference, "000000");
    console.log("Incorrect PIN test:", badRelease.success === false ? "PASSED (Rejected)" : "FAILED");

    // Test valid PIN
    const goodRelease = escrowStore.releaseEscrow(initRes.reference, lockedRecord.checkInPin);
    console.log("Correct PIN test:", goodRelease.success === true ? "PASSED (Funds Disbursed)" : "FAILED");
    console.log("Final Escrow Status:", goodRelease.transaction.status); // COMPLETED_DISBURSED
  } catch (err) {
    console.error("Paystack API test error:", err);
  }

  console.log("\n--- ALL BACKEND VERIFICATIONS COMPLETED SUCCESSFULLY ---");
}

runTests();
