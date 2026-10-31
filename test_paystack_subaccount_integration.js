// test_paystack_subaccount_integration.js
// Verification of Automatic Paystack Subaccount Creation on Vendor Onboarding

import { createPaystackSubaccount, listPaystackSubaccounts, resolveBankAndAccount } from "./server/paystack.js";
import { escrowStore } from "./server/store.js";
import { registerMerchantOnboarding, createPaystackSubaccountClient } from "./client/src/utils/api.js";

async function runTests() {
  console.log("=====================================================================");
  console.log("🧪 TESTING AUTOMATIC PAYSTACK SUBACCOUNT GENERATION & ONBOARDING");
  console.log("=====================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  ✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${msg}`);
      failed++;
    }
  }

  // Test 1: Bank Resolver
  console.log("1. Testing Nigerian Bank & Account Resolution...");
  const res1 = resolveBankAndAccount("Zenith Bank - 1029384756 (Royal Efik)", "");
  assert(res1.bankCode === "057", `Zenith bank code resolved to 057 (got: ${res1.bankCode})`);
  assert(res1.accountNumber === "1029384756", `Account number resolved to 1029384756 (got: ${res1.accountNumber})`);

  const res2 = resolveBankAndAccount("044", "0123456789");
  assert(res2.bankCode === "044", `Access Bank code 044 resolved (got: ${res2.bankCode})`);
  assert(res2.accountNumber === "0123456789", `Account number 0123456789 resolved (got: ${res2.accountNumber})`);

  console.log("\n2. Testing Server-Side Paystack Subaccount Creation via API...");
  const serverSub = await createPaystackSubaccount({
    business_name: `Calabar Heritage Lodge ${Date.now().toString().slice(-4)}`,
    settlement_bank: "057",
    account_number: "0000000000",
    percentage_charge: 10,
    description: "CalabarPass Automated Test Merchant"
  });

  assert(serverSub.success === true, `Subaccount created successfully (success: ${serverSub.success})`);
  assert(!!serverSub.subaccount_code && serverSub.subaccount_code.startsWith("ACCT_"), `Returned valid Paystack code (${serverSub.subaccount_code})`);

  console.log("\n3. Testing Client-Side Paystack Subaccount Creation (Vercel Autonomous Fallback)...");
  const clientSub = await createPaystackSubaccountClient({
    business_name: `Cross River Marina Lounge ${Date.now().toString().slice(-4)}`,
    settlement_bank: "044",
    account_number: "0000000000",
    percentage_charge: 10
  });

  assert(clientSub.success === true, `Client subaccount created successfully (success: ${clientSub.success})`);
  assert(!!clientSub.subaccount_code && clientSub.subaccount_code.startsWith("ACCT_"), `Returned valid Paystack code (${clientSub.subaccount_code})`);

  console.log("\n4. Testing Full Merchant Onboarding via registerMerchantOnboarding...");
  const onboardRes = await registerMerchantOnboarding({
    businessName: "Tinapa Lakeside Executive Resort",
    category: "accommodations",
    bankCode: "057",
    bankName: "Zenith Bank",
    accountNumber: "0000000000",
    bankPayoutDetails: "Zenith Bank - 0000000000",
    phone: "+234 803 999 1122",
    email: "tinapa@hospitality.crossriver.ng",
    location: "Tinapa Business Resort, Calabar",
    priceNGN: 85000
  });

  assert(onboardRes.data?.success === true, "Onboarding returned success: true");
  assert(!!onboardRes.data?.accessCode, `Generated Vendor Access Code: ${onboardRes.data?.accessCode}`);
  assert(!!onboardRes.data?.subaccount_code && onboardRes.data?.subaccount_code.startsWith("ACCT_"), `Onboarded merchant received live Paystack Subaccount: ${onboardRes.data?.subaccount_code}`);

  console.log("\n5. Testing Live Paystack Subaccount Listing on User Account...");
  const subList = await listPaystackSubaccounts();
  assert(subList.success === true, `Retrieved live subaccounts from Paystack`);
  assert(subList.subaccounts.length >= 3, `Paystack account now contains ${subList.subaccounts.length} subaccounts`);
  console.log("   Current Live Paystack Subaccounts on Dashboard:");
  subList.subaccounts.slice(0, 5).forEach(s => {
    console.log(`   - [${s.subaccount_code}] ${s.business_name} (${s.settlement_bank})`);
  });

  console.log("\n=====================================================================");
  console.log(`RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("=====================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
