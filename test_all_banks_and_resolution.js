import { resolveBankAccount } from "./server/paystack.js";
import { 
  ALL_NIGERIAN_BANKS, 
  POPULAR_BANKS, 
  searchBanks, 
  getBankByCode 
} from "./client/src/utils/banks.ts";
import { resolveBankAccountClient, resolveBankAndAccount } from "./client/src/utils/api.ts";

async function run() {
  console.log("=====================================================================");
  console.log("🧪 TESTING ALL 290+ NIGERIAN BANKS & NIBSS ACCOUNT RESOLUTION");
  console.log("=====================================================================");

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

  // 1. Bank Catalog Tests
  console.log("\n1. Verifying Full Bank Catalog & Search...");
  assert(ALL_NIGERIAN_BANKS.length >= 290, `Found ${ALL_NIGERIAN_BANKS.length} banks in directory (>= 290 expected)`);
  
  const moniepoint = getBankByCode("50515");
  assert(moniepoint && moniepoint.name.toLowerCase().includes("moniepoint"), `Moniepoint MFB found by code 50515: ${moniepoint?.name}`);

  const palmpay = getBankByCode("999991");
  assert(palmpay && palmpay.name.toLowerCase().includes("palm"), `PalmPay found by code 999991: ${palmpay?.name}`);

  const opay = getBankByCode("999992");
  assert(opay && opay.name.toLowerCase().includes("opay"), `OPay found by code 999992: ${opay?.name}`);

  const searchMonie = searchBanks("monie");
  assert(searchMonie.some(b => b.code === "50515"), "searchBanks('monie') successfully matches Moniepoint MFB");

  const searchPalm = searchBanks("palm");
  assert(searchPalm.some(b => b.code === "999991"), "searchBanks('palm') successfully matches PalmPay");

  // 2. Account Normalization (11-digit mobile vs 10-digit NUBAN)
  console.log("\n2. Testing Smart Account Normalization (Mobile numbers with leading 0)...");
  const norm1 = resolveBankAndAccount("PalmPay", "08035550100");
  assert(norm1.accountNumber === "8035550100", `08035550100 normalized to 10 digits: ${norm1.accountNumber}`);
  assert(norm1.bankCode === "999991", `PalmPay code correctly mapped to 999991 (got: ${norm1.bankCode})`);

  const norm2 = resolveBankAndAccount("Moniepoint", "07012345678");
  assert(norm2.accountNumber === "7012345678", `07012345678 normalized to 10 digits: ${norm2.accountNumber}`);
  assert(norm2.bankCode === "50515", `Moniepoint code correctly mapped to 50515 (got: ${norm2.bankCode})`);

  // 3. Server-side Resolution
  console.log("\n3. Testing Server-side Bank Account Resolution...");
  const resZenith = await resolveBankAccount("0000000000", "057");
  assert(resZenith.success && resZenith.accountName, `Zenith test account resolved: ${resZenith.accountName}`);

  const resPalm = await resolveBankAccount("08035550100", "999991", "David Akanno Tech");
  assert(resPalm.success && resPalm.accountName, `PalmPay resolved with clean name: ${resPalm.accountName}`);
  assert(resPalm.accountNumber === "8035550100", `PalmPay account number auto-normalized: ${resPalm.accountNumber}`);

  const resMonie = await resolveBankAccount("5051234567", "50515", "Akanno Suites");
  assert(resMonie.success && resMonie.accountName, `Moniepoint MFB resolved: ${resMonie.accountName}`);

  // 4. Client-side Resolution (Vercel autonomous mode)
  console.log("\n4. Testing Client-side Autonomous Resolution...");
  const clientPalm = await resolveBankAccountClient({
    accountNumber: "08035550100",
    bankCode: "999991",
    businessName: "David Akanno Studio"
  });
  assert(clientPalm.success && (clientPalm.accountName || clientPalm.account_name), `Client PalmPay resolution succeeded: ${clientPalm.accountName}`);

  const clientMonie = await resolveBankAccountClient({
    accountNumber: "5051234567",
    bankCode: "50515",
    businessName: "Calabar Eco Lounge"
  });
  assert(clientMonie.success && (clientMonie.accountName || clientMonie.account_name), `Client Moniepoint resolution succeeded: ${clientMonie.accountName}`);

  console.log("\n=====================================================================");
  console.log(`RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("=====================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

