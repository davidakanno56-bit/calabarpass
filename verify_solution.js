// verify_solution.js
// Script to verify packages data, dynamic tab counts, image links, Paystack checkout, and Accommodations view

import { PACKAGES } from "./client/src/data/packages.js";
import { HOTELS } from "./client/src/data/hotels.js";

async function verifyAll() {
  console.log("=================================================");
  console.log("🔍 CALABARPASS LANDING PAGE & ESCROW VERIFICATION");
  console.log("=================================================");

  // 1. Verify client/src/data/packages.js length and contents
  console.log(`\n[1] Checking Packages Array Length...`);
  console.log(`Total packages in client/src/data/packages.js: ${PACKAGES.length}`);
  if (PACKAGES.length !== 9) {
    throw new Error(`Expected exactly 9 packages, found ${PACKAGES.length}`);
  }

  // 2. Verify Tab Filter Counts
  const allCount = PACKAGES.length;
  const carnivalCount = PACKAGES.filter(p => p.tourType === "carnival" || p.category === "Carnival").length;
  const ecoCount = PACKAGES.filter(p => p.tourType === "year_round" || p.category === "Eco-Tourism").length;

  console.log(`\n[2] Dynamic Filter Counts:`);
  console.log(`- 'All Verified Experiences': (${allCount})`);
  console.log(`- 'Carnival Specials (December Surge)': (${carnivalCount})`);
  console.log(`- '365-Day Eco-Tourism & Heritage': (${ecoCount})`);

  if (allCount !== 9) throw new Error(`All count must be 9, got ${allCount}`);
  if (carnivalCount !== 4) throw new Error(`Carnival count must be 4, got ${carnivalCount}`);
  if (ecoCount !== 5) throw new Error(`Eco count must be 5, got ${ecoCount}`);
  console.log("✓ Dynamic filter counts match exactly: (9), (4), (5)");

  // 3. Verify each required package name
  const expectedNames = [
    "Seagull Band Master Pass & Full Costume Kit",
    "Passion 4 Band All-Access Street Pass",
    "Masta Blasta Official Carnival Pass & Costume",
    "VIP Stadium Elevated Viewing Stand Pass",
    "Drill Monkey Ranch (Afi Mountain Wildlife Sanctuary) Eco-Tour",
    "Agbokim Waterfalls Guided Day Expedition",
    "Kwa Falls & Oil Palm Plantation Guided Tour",
    "Marina Resort Historical Slave Museum Tour",
    "Leboku New Yam Cultural Festival Experience"
  ];

  console.log(`\n[3] Checking All 9 Required Package Names & Images:`);
  expectedNames.forEach((name, i) => {
    const pkg = PACKAGES.find(p => p.name === name);
    if (!pkg) throw new Error(`Missing package: ${name}`);
    if (!pkg.image && !pkg.imageUrl) throw new Error(`Package ${name} is missing image`);
    console.log(`  ${i + 1}. [${pkg.category}] ${pkg.name} - ₦${pkg.priceNGN.toLocaleString()} (Image: ${pkg.image || pkg.imageUrl})`);
  });

  // 4. Verify HTTP Backend API /api/packages
  console.log(`\n[4] Querying Backend HTTP Endpoint: http://localhost:5000/api/packages...`);
  const res = await fetch("http://localhost:5000/api/packages");
  const data = await res.json();
  if (!data.success || data.packages.length !== 9) {
    throw new Error(`Backend /api/packages returned ${data.packages?.length} packages, expected 9`);
  }
  console.log(`✓ Backend API returned ${data.packages.length} packages successfully.`);

  // 5. Test Paystack Initialization for all 9 packages
  console.log(`\n[5] Testing Paystack Escrow Initialization for all 9 restored packages...`);
  for (const pkg of PACKAGES) {
    const initRes = await fetch("http://localhost:5000/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId: pkg.id,
        email: "test.tourist@carnivalcalabar.ng",
        customerName: "Tourist Test",
        phone: "+2348011223344",
        bookingDate: "2026-12-28"
      })
    });
    const initData = await initRes.json();
    if (!initData.success || !initData.reference) {
      throw new Error(`Failed to initialize Paystack for package ${pkg.id}: ${JSON.stringify(initData)}`);
    }
  }
  console.log("✓ All 9 packages successfully initialize Paystack escrow transactions!");

  // 6. Verify Accommodations Module (5 Executive Hotels)
  console.log(`\n[6] Verifying Accommodations Module (5 Hotels)...`);
  console.log(`Client HOTELS array count: ${HOTELS.length}`);
  if (HOTELS.length !== 5) throw new Error(`Expected 5 hotels, found ${HOTELS.length}`);
  const hotelRes = await fetch("http://localhost:5000/api/hotels");
  const hotelData = await hotelRes.json();
  if (!hotelData.success || hotelData.hotels.length !== 5) {
    throw new Error(`Backend returned ${hotelData.hotels?.length} hotels, expected 5`);
  }
  console.log(`✓ Accommodations module intact with 5 verified executive stays:`);
  HOTELS.forEach((h, i) => console.log(`  ${i + 1}. ${h.name} (${h.area}) - ${h.priceRange}`));

  console.log("\n=================================================");
  console.log("🎉 ALL VERIFICATION CHECKS PASSED WITH 100% SUCCESS!");
  console.log("=================================================");
}

verifyAll().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
