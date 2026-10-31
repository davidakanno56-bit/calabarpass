// server/paystack.js
// Paystack Live API Integration & Escrow Engine

import { escrowStore } from "./store.js";
import dotenv from "dotenv";

dotenv.config();

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_59fd3286edace91f4ba9d3c4525687355b76389e";
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY || "pk_test_e911f3fc519a96d916fbfea85742f88078495266";

/**
 * Initialize a Paystack transaction
 * @param {Object} params - { packageId, email, customerName, phone, callbackUrl }
 */
export async function initializeTransaction({ packageId, email, customerName, phone, callbackUrl, bookingDate }) {
  if (!email) {
    throw new Error("Customer email is required");
  }

  const pkg = escrowStore.getPackageById(packageId);
  if (!pkg) {
    throw new Error(`Invalid package ID: ${packageId}`);
  }

  const amountKobo = pkg.priceNGN * 100;
  const reference = `CP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const reservationDate = bookingDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Create local record in AWAITING_PAYMENT state
  escrowStore.createTransaction({
    reference,
    packageId,
    email,
    customerName: customerName || "Carnival Guest",
    phone: phone || "",
    amountKobo,
    bookingDate: reservationDate
  });

  const payload = {
    email,
    amount: amountKobo,
    reference,
    currency: "NGN",
    metadata: {
      packageId: pkg.id,
      packageName: pkg.name,
      customerName: customerName || "Carnival Guest",
      phone: phone || "",
      vendor: pkg.vendor,
      bookingDate: reservationDate,
      escrowType: "CrossRiverState_365Day_FairPrice_Escrow"
    }
  };

  if (callbackUrl) {
    payload.callback_url = callbackUrl;
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to initialize Paystack transaction");
  }

  return {
    success: true,
    reference,
    authorization_url: data.data.authorization_url,
    access_code: data.data.access_code,
    publicKey: PAYSTACK_PUBLIC_KEY,
    amountNGN: pkg.priceNGN,
    packageName: pkg.name,
    vendor: pkg.vendor
  };
}

/**
 * Verify a Paystack transaction and lock funds into escrow
 * @param {string} reference
 */
export async function verifyTransaction(reference) {
  if (!reference) {
    throw new Error("Transaction reference is required");
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to verify transaction with Paystack");
  }

  const paystackData = data.data;

  if (paystackData.status === "success") {
    // If local record didn't exist (e.g. initiated directly via popup), create it
    let record = escrowStore.getTransaction(reference);
    if (!record) {
      const packageId = paystackData.metadata?.packageId || "pkg-seagull-pass";
      const pkg = escrowStore.getPackageById(packageId);
      record = escrowStore.createTransaction({
        reference,
        packageId,
        email: paystackData.customer?.email || "guest@carnivalcalabar.ng",
        customerName: paystackData.metadata?.customerName || "Carnival Guest",
        phone: paystackData.metadata?.phone || "",
        amountKobo: paystackData.amount,
        bookingDate: paystackData.metadata?.bookingDate || new Date(Date.now() + 86400000).toISOString().split('T')[0]
      });
    }

    // Lock funds into ESCROW_LOCKED_ACTIVE & generate 6-digit PIN
    const lockedRecord = escrowStore.lockEscrow(reference, {
      status: paystackData.status,
      channel: paystackData.channel,
      gateway_response: paystackData.gateway_response,
      paid_at: paystackData.paid_at
    });

    return {
      success: true,
      status: lockedRecord.status,
      checkInPin: lockedRecord.checkInPin,
      reference: lockedRecord.reference,
      transaction: lockedRecord,
      message: "Escrow funds locked securely. Present your 6-digit PIN to the vendor on-site in Calabar."
    };
  } else {
    // Transaction not completed or failed
    escrowStore.updateTransaction(reference, {
      paystackStatus: paystackData.status,
      gatewayResponse: paystackData.gateway_response
    });

    return {
      success: false,
      status: paystackData.status,
      message: `Transaction status is: ${paystackData.status} (${paystackData.gateway_response})`
    };
  }
}

/**
 * Disburse escrow funds on-site in Calabar upon 6-digit PIN redemption
 * @param {Object} params - { reference, pin, vendor }
 */
export function releaseEscrowFunds({ reference, pin, vendor }) {
  return escrowStore.releaseEscrow(reference, pin, vendor);
}

export const NIGERIAN_BANKS = [
  { name: "Zenith Bank", code: "057", match: /zenith/i },
  { name: "Access Bank", code: "044", match: /access/i },
  { name: "Guaranty Trust Bank (GTBank)", code: "058", match: /guaranty|gtbank|gtb/i },
  { name: "First Bank of Nigeria", code: "011", match: /first\s*bank|fbn/i },
  { name: "United Bank for Africa (UBA)", code: "033", match: /uba|united\s*bank/i },
  { name: "Kuda Bank", code: "50211", match: /kuda/i },
  { name: "OPay Digital Services", code: "999992", match: /opay/i },
  { name: "PalmPay", code: "999991", match: /palmpay/i },
  { name: "Fidelity Bank", code: "070", match: /fidelity/i },
  { name: "Stanbic IBTC Bank", code: "221", match: /stanbic/i },
  { name: "Union Bank of Nigeria", code: "032", match: /union/i },
  { name: "Sterling Bank", code: "232", match: /sterling/i },
  { name: "Ecobank Nigeria", code: "050", match: /ecobank/i },
  { name: "Wema Bank (ALAT)", code: "035", match: /wema|alat/i },
  { name: "Polaris Bank", code: "076", match: /polaris/i }
];

export function resolveBankAndAccount(bankInput, accountInput) {
  let bankCode = "057";
  let bankName = "Zenith Bank";
  let accountNumber = String(accountInput || "").replace(/\D/g, "").slice(0, 10);

  const combined = `${String(bankInput || "")} ${String(accountInput || "")}`.trim();

  // If accountNumber wasn't clean 10 digits, look for 10 consecutive digits in combined
  if (accountNumber.length !== 10) {
    const numMatch = combined.match(/\b\d{10}\b/);
    if (numMatch) {
      accountNumber = numMatch[0];
    }
  }

  // Find bank code from known list
  for (const b of NIGERIAN_BANKS) {
    if (bankInput === b.code || b.match.test(combined) || (typeof bankInput === "string" && b.match.test(bankInput))) {
      bankCode = b.code;
      bankName = b.name;
      break;
    }
  }

  // Fallback for test mode if no 10-digit number found
  if (accountNumber.length !== 10) {
    accountNumber = "0000000000";
  }

  return { bankCode, bankName, accountNumber };
}

/**
 * Automatically provision a Paystack Merchant Subaccount for vendor settlement
 * @param {Object} params - { business_name, settlement_bank, account_number, percentage_charge, description }
 */
export async function createPaystackSubaccount({
  business_name,
  settlement_bank,
  account_number,
  percentage_charge = 10,
  description = "CalabarPass 365 Verified Partner Terminal"
}) {
  const { bankCode, bankName, accountNumber } = resolveBankAndAccount(settlement_bank, account_number);
  const cleanBusinessName = String(business_name || "CalabarPass Merchant").trim();

  const payload = {
    business_name: cleanBusinessName,
    settlement_bank: bankCode,
    account_number: accountNumber,
    percentage_charge: Math.round(Number(percentage_charge) || 10),
    description: description || `CalabarPass Verified Partner - ${cleanBusinessName}`
  };

  try {
    let res = await fetch(`${PAYSTACK_BASE_URL}/subaccount`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    let data = await res.json();

    // In Paystack Test Mode, if dummy account fails validation, auto-retry with standard sandbox NUBAN (0000000000, 057 Zenith)
    if (!data.status && PAYSTACK_SECRET_KEY.startsWith("sk_test_")) {
      console.warn(`[Paystack Subaccount] Initial creation rejected (${data.message}). Retrying in Test Mode with standard sandbox credentials...`);
      res = await fetch(`${PAYSTACK_BASE_URL}/subaccount`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          business_name: `${cleanBusinessName} (Test Mode)`,
          settlement_bank: "057",
          account_number: "0000000000",
          percentage_charge: Math.round(Number(percentage_charge) || 10),
          description: description || `CalabarPass Verified Partner - ${cleanBusinessName}`
        })
      });
      data = await res.json();
    }

    if (!res.ok || !data.status) {
      console.error("[Paystack Subaccount Error]:", data.message || "Failed to create subaccount");
      return {
        success: false,
        error: data.message || "Failed to create Paystack subaccount",
        subaccount_code: null
      };
    }

    return {
      success: true,
      subaccount_code: data.data.subaccount_code,
      data: data.data,
      bankName: data.data.settlement_bank || bankName,
      accountNumber: data.data.account_number || accountNumber
    };
  } catch (error) {
    console.error("[Paystack Subaccount Network Error]:", error.message);
    return {
      success: false,
      error: error.message,
      subaccount_code: null
    };
  }
}

/**
 * List all provisioned Paystack subaccounts
 */
export async function listPaystackSubaccounts() {
  try {
    const res = await fetch(`${PAYSTACK_BASE_URL}/subaccount`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    return {
      success: data.status,
      subaccounts: data.data || []
    };
  } catch (error) {
    return { success: false, error: error.message, subaccounts: [] };
  }
}
