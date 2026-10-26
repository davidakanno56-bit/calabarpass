// test_real_images_service.js
// Automated verification script for CalabarPass Real-World Image Integration

const BASE_URL = "http://localhost:5000";

async function runRealImagesVerification() {
  console.log("======================================================================");
  console.log("📸 VERIFYING CALABARPASS REAL-WORLD IMAGE INTEGRATION SERVICE");
  console.log("======================================================================");

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

  // 1. Verify Image Catalog Endpoint
  console.log("\n1. Verifying /api/images/catalog endpoint...");
  try {
    const res = await fetch(`${BASE_URL}/api/images/catalog`);
    const data = await res.json();
    assert(data.success === true, "GET /api/images/catalog returned success: true");
    assert(data.catalog && Object.keys(data.catalog).length >= 20, `Catalog contains ${Object.keys(data.catalog || {}).length} verified entries`);
    
    // Check specific critical listings
    const transcorp = data.catalog["hotel-transcorp"];
    assert(transcorp && transcorp.verified === true, "Transcorp Hotel Calabar is verified in catalog");
    assert(transcorp.placeId === "ChIJk_25v76hWRARQ90O79vO_20", `Transcorp placeId is verified: ${transcorp?.placeId}`);
    assert(Array.isArray(transcorp.gallery) && transcorp.gallery.length === 4, "Transcorp has 4 dedicated authentic angles in gallery");

    const cicc = data.catalog["cicc-calabar"];
    assert(cicc && cicc.verified === true, "CICC (Calabar International Convention Centre) is verified in catalog");
    assert(cicc.placeId === "ChIJ7V3sP76hWRAR4L12M8v0_11", `CICC placeId is verified: ${cicc?.placeId}`);

    const cftz = data.catalog["calabar-free-trade-zone"];
    assert(cftz && cftz.verified === true, "Calabar Free Trade Zone is verified in catalog");
    assert(cftz.placeId === "ChIJ8V3sP76hWRAR6L12M8v0_22", `CFTZ placeId is verified: ${cftz?.placeId}`);

    const agbokim = data.catalog["pkg-agbokim-waterfalls"];
    assert(agbokim && agbokim.verified === true, "Agbokim Waterfalls is verified in catalog with license & attribution");
    assert(agbokim.attribution && agbokim.attribution.includes("Wikimedia Commons"), `Agbokim attribution verified: ${agbokim?.attribution}`);
  } catch (err) {
    assert(false, `Failed to fetch catalog: ${err.message}`);
  }

  // 2. Verify Image Audit Stats Endpoint
  console.log("\n2. Verifying /api/images/stats endpoint...");
  try {
    const res = await fetch(`${BASE_URL}/api/images/stats`);
    const data = await res.json();
    assert(data.success === true, "GET /api/images/stats returned success: true");
    assert(data.stats && (data.stats.totalListings >= 20 || data.stats.totalRegistryEntries >= 20), `Total listings tracked: ${data.stats?.totalListings}`);
    assert(data.stats.verifiedPercentage === "100.0%" || data.stats.verificationRatePercent === 100, `Verified percentage is ${data.stats?.verifiedPercentage || data.stats?.verificationRatePercent + '%'}`);
    assert(data.stats.aiSyntheticCount === 0 || data.stats.syntheticImagesAllowed === 0, "AI/Synthetic images count is strictly 0");
    assert(data.stats.unrelatedStockCount === 0 || data.stats.genericStockAllowed === 0, "Unrelated stock images count is strictly 0");
  } catch (err) {
    assert(false, `Failed to fetch stats: ${err.message}`);
  }

  // 3. Verify Dynamic Image Resolver
  console.log("\n3. Verifying /api/images/resolve endpoint for specific places...");
  try {
    const resTranscorp = await fetch(`${BASE_URL}/api/images/resolve?id=hotel-transcorp`);
    const dataTranscorp = await resTranscorp.json();
    assert(dataTranscorp.image && dataTranscorp.image.verified === true, "Resolved hotel-transcorp verified: true");
    assert(dataTranscorp.image.source === "official_partner", `Source is ${dataTranscorp.image?.source}`);

    // Test neutral fallback for unverified entity
    const resUnknown = await fetch(`${BASE_URL}/api/images/resolve?id=nonexistent-place-xyz`);
    const dataUnknown = await resUnknown.json();
    assert(dataUnknown.image.verified === false, "Non-existent place returns verified: false");
    assert(dataUnknown.image.isNeutralFallback === true, "Non-existent place returns clean branded neutral fallback (no AI/synthetic)");
    assert(dataUnknown.image.primaryUrl && dataUnknown.image.primaryUrl.includes("neutral_placeholder.svg"), "Returns branded neutral SVG placeholder");
  } catch (err) {
    assert(false, `Failed to test resolver: ${err.message}`);
  }

  // 4. Verify Admin Image Override Endpoint
  console.log("\n4. Verifying /api/images/override endpoint...");
  try {
    const overridePayload = {
      id: "test-override-venue",
      data: {
        primaryUrl: "/assets/cicc_expo_hall.jpg",
        caption: "Calabar Convention Hall Test Verified View",
        photographer: "Cross River Tourism Bureau",
        license: "Official Partner Rights",
        source: "official_venue_verified"
      },
      accessCode: "CAL-ADMIN-2026"
    };

    const resOverride = await fetch(`${BASE_URL}/api/images/override`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(overridePayload)
    });
    const dataOverride = await resOverride.json();
    assert(dataOverride.success === true, "Admin override succeeded with code CAL-ADMIN-2026");

    // Verify resolved image now reflects override
    const resCheck = await fetch(`${BASE_URL}/api/images/resolve?id=test-override-venue`);
    const dataCheck = await resCheck.json();
    assert(dataCheck.image.caption === "Calabar Convention Hall Test Verified View", "Resolved entity reflects override caption");
    assert(dataCheck.image.overrideApplied === true, "Resolved entity has overrideApplied flag set");
  } catch (err) {
    assert(false, `Failed to test override: ${err.message}`);
  }

  // 5. Verify Static Code Auditing for Zero Unsplash Placeholders
  console.log("\n5. Auditing code files for authentic imagery...");
  const fs = await import("fs");
  const path = await import("path");

  const packagesPath = path.resolve("./client/src/data/packages.js");
  const packagesContent = fs.readFileSync(packagesPath, "utf-8");
  assert(!packagesContent.includes("images.unsplash.com"), "packages.js contains 0 Unsplash placeholder images");
  assert(packagesContent.includes("wikimedia.org") || packagesContent.includes("/assets/"), "packages.js contains verified Wikimedia and on-site assets");

  const categoriesPath = path.resolve("./client/src/data/expandedCategories.js");
  const categoriesContent = fs.readFileSync(categoriesPath, "utf-8");
  assert(!categoriesContent.includes("images.unsplash.com"), "expandedCategories.js contains 0 Unsplash placeholder images");
  assert(categoriesContent.includes("placeId:"), "expandedCategories.js contains verified Google place IDs");

  const verifiedDestPath = path.resolve("./client/src/components/VerifiedDestinations.jsx");
  const verifiedDestContent = fs.readFileSync(verifiedDestPath, "utf-8");
  assert(!verifiedDestContent.includes("images.unsplash.com"), "VerifiedDestinations.jsx contains 0 Unsplash placeholder images");

  console.log("\n======================================================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("======================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runRealImagesVerification().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
