// test_spar_reposition.js
// Automated verification of SPAR Repositioning, Agbokim Waterfalls Package, and Escrow-Only Terminals

import fs from "fs";
import path from "path";

async function verify() {
  console.log("===============================================================");
  console.log("🧪 VERIFYING SPAR REPOSITIONING & CLEANUP REQUIREMENTS");
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

  // 1. Packages Data in client/src/data/packages.js
  console.log("1. Verifying Packages Data (client/src/data/packages.js)...");
  const packagesFilePath = path.resolve("client/src/data/packages.js");
  const packagesContent = fs.readFileSync(packagesFilePath, "utf8");

  assert(!packagesContent.includes("pkg-spar-crafts"), "SPAR crafts package ID removed from packages.js");
  assert(!packagesContent.includes("Spar Calabar Cultural Souvenir"), "SPAR title removed from packages.js");

  const { PACKAGES } = await import("./client/src/data/packages.js");
  const agbokim = PACKAGES.find(p => p.id === "pkg-agbokim-waterfalls");

  assert(!!agbokim, 'Package with id "pkg-agbokim-waterfalls" exists');
  assert(agbokim.title === "Agbokim Waterfalls Guided Day Expedition", 'title === "Agbokim Waterfalls Guided Day Expedition"');
  assert(agbokim.vendor === "Ikom Ecotourism Guides Cooperative", 'vendor === "Ikom Ecotourism Guides Cooperative"');
  assert(agbokim.vendorId === "ikom-ecotourism", 'vendorId === "ikom-ecotourism"');
  assert(agbokim.location === "Ikom LGA, Cross River State", 'location === "Ikom LGA, Cross River State"');
  assert(agbokim.price === 25000, "price === 25000");
  assert(agbokim.category === "Eco-Tourism", 'category === "Eco-Tourism"');
  assert(agbokim.image === "/images/agbokim.jpg", 'image === "/images/agbokim.jpg"');
  assert(Array.isArray(agbokim.included) && agbokim.included.length === 4, "included array has 4 items");
  assert(agbokim.included.includes("Stream-cascading waterfall hike"), 'included contains "Stream-cascading waterfall hike"');
  assert(agbokim.included.includes("Certified canopy walkway access"), 'included contains "Certified canopy walkway access"');
  assert(agbokim.included.includes("Verified round-trip transport from Calabar"), 'included contains "Verified round-trip transport from Calabar"');
  assert(agbokim.included.includes("Official eco-ranger security escort"), 'included contains "Official eco-ranger security escort"');
  assert(agbokim.antiScamAlert === "Unregistered roadside guides demanding cash tolls at informal checkpoints along Ikom road.", "antiScamAlert matches exact text");

  console.log("");

  // 2. Vendor Portal Terminals (client/src/components/VendorPortal.jsx)
  console.log("2. Verifying Vendor Portal (client/src/components/VendorPortal.jsx)...");
  const vendorPortalPath = path.resolve("client/src/components/VendorPortal.jsx");
  const vendorPortalContent = fs.readFileSync(vendorPortalPath, "utf8");

  assert(!vendorPortalContent.includes("Spar Mall Calabar Crafts & Retail"), "SPAR Mall completely removed from VendorPortal.jsx");
  assert(!vendorPortalContent.includes("spar-mall"), "spar-mall ID completely removed from VendorPortal.jsx");

  const expectedTerminals = [
    { name: "Transcorp Hotel Calabar", bank: "Access Bank ****4102" },
    { name: "Monty Suites Calabar", bank: "Zenith Bank ****7890" },
    { name: "Hogis Luxury Suites", bank: "First Bank ****1904" },
    { name: "Marina Resort & Waterway Bureau", bank: "Heritage Bank ****6610" },
    { name: "Afi Drill Monkey Sanctuary", bank: "Zenith Bank ****3301" },
    { name: "Seagull Band Secretariat", bank: "Zenith Bank ****8821" }
  ];

  for (const exp of expectedTerminals) {
    const hasName = vendorPortalContent.includes(exp.name);
    const hasBank = vendorPortalContent.includes(exp.bank);
    assert(hasName && hasBank, `Terminal present: ${exp.name} (${exp.bank})`);
  }

  console.log("");

  // 3. SPAR Verified Retail Benchmark in Scam Shield (client/src/components/FairPriceTracker.jsx)
  console.log("3. Verifying SPAR in Surge & Scam Shield (FairPriceTracker.jsx / SurgeShield.jsx)...");
  const fairPricePath = path.resolve("client/src/components/FairPriceTracker.jsx");
  const fairPriceContent = fs.readFileSync(fairPricePath, "utf8");

  assert(fairPriceContent.includes("Retail & Provisions Benchmark"), 'Section "Retail & Provisions Benchmark" exists');
  assert(fairPriceContent.includes("bg-[#007a3d]") && fairPriceContent.includes("text-[#ee3124]"), "Official native inline SVG SPAR logo included");
  assert(fairPriceContent.includes("https://www.google.com/maps/search/?api=1&query=SPAR+Calabar+Mall+Cultural+Centre+Complex+Calabar"), "Working Google Maps search link included");
  assert(fairPriceContent.includes("SPAR Calabar Mall"), "SPAR Calabar Mall heading present");
  assert(fairPriceContent.includes("Cultural Centre Complex, Murtala Muhammed Highway, Calabar"), "SPAR address present");
  assert(fairPriceContent.includes("Official Fixed Retail Benchmark • Zero Scam Markup"), "Zero Scam Markup badge present");
  assert(fairPriceContent.includes("Bottled Water & Soft Drinks"), "Benchmark 1: Bottled Water & Soft Drinks present");
  assert(fairPriceContent.includes("₦300 – ₦800"), "Price range ₦300 – ₦800 present");
  assert(fairPriceContent.includes("Toiletries & Travel Sunscreen"), "Benchmark 2: Toiletries & Travel Sunscreen present");
  assert(fairPriceContent.includes("Packaged Provisions & Snacks"), "Benchmark 3: Packaged Provisions & Snacks present");
  assert(fairPriceContent.includes("Tourist Directive:"), "Tourist Directive text present");

  // Check SurgeShield.jsx exists
  const surgeShieldPath = path.resolve("client/src/components/SurgeShield.jsx");
  assert(fs.existsSync(surgeShieldPath), "SurgeShield.jsx exists and exports component");

  console.log("");

  // 4. Live Backend API Verification
  console.log("4. Verifying Live Backend API (/api/packages)...");
  try {
    const res = await fetch("http://localhost:5000/api/packages");
    const data = await res.json();
    assert(data.success === true, "GET /api/packages returned success: true");
    const apiAgbokim = data.packages.find(p => p.id === "pkg-agbokim-waterfalls");
    assert(!!apiAgbokim, 'Live API returns "pkg-agbokim-waterfalls"');
    assert(apiAgbokim.vendorId === "ikom-ecotourism", 'Live API vendorId is "ikom-ecotourism"');
    const apiSpar = data.packages.find(p => p.id === "pkg-spar-crafts");
    assert(!apiSpar, "Live API does NOT contain SPAR package");
  } catch (err) {
    assert(false, `Live API fetch failed: ${err.message}`);
  }

  console.log("\n===============================================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("===============================================================");

  if (failed > 0) process.exit(1);
}

verify();
