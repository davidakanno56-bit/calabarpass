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
 * @param {Object} params - { reference, pin }
 */
export function releaseEscrowFunds({ reference, pin }) {
  return escrowStore.releaseEscrow(reference, pin);
}
