// server/server.js
// CalabarPass Express Backend Server

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { escrowStore } from "./store.js";
import { initializeTransaction, verifyTransaction, releaseEscrowFunds } from "./paystack.js";
import { getAiConciergeResponse, FAIR_PRICES, SCAM_ADVISORIES } from "./aiPricing.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY || "pk_test_e911f3fc519a96d916fbfea85742f88078495266";

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets (images, badges) from server/public
app.use(express.static(path.join(__dirname, "public")));

// API Routes

// 1. Get all verified tourism packages
app.get("/api/packages", (req, res) => {
  try {
    const packages = escrowStore.getPackages();
    res.json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Get single package
app.get("/api/packages/:id", (req, res) => {
  try {
    const pkg = escrowStore.getPackageById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, error: "Package not found" });
    }
    res.json({ success: true, package: pkg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2b. Get all verified executive accommodations (20 hotels)
app.get("/api/hotels", (req, res) => {
  try {
    const hotels = escrowStore.getHotels();
    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2c. Get single hotel by ID
app.get("/api/hotels/:id", (req, res) => {
  try {
    const hotel = escrowStore.getHotelById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, error: "Hotel not found" });
    }
    res.json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Get Paystack Public Configuration
app.get("/api/config/paystack", (req, res) => {
  res.json({
    success: true,
    publicKey: PAYSTACK_PUBLIC_KEY
  });
});

// 4. Initialize Paystack Transaction
app.post("/api/paystack/initialize", async (req, res) => {
  try {
    const { packageId, email, customerName, phone, callbackUrl, bookingDate } = req.body;
    if (!packageId || !email) {
      return res.status(400).json({ success: false, error: "packageId and email are required" });
    }

    const result = await initializeTransaction({
      packageId,
      email,
      customerName,
      phone,
      callbackUrl,
      bookingDate
    });

    res.json(result);
  } catch (error) {
    console.error("Paystack Initialize Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Verify Paystack Transaction & Lock into Escrow
app.get("/api/paystack/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    const { simulate } = req.query;

    if (!reference) {
      return res.status(400).json({ success: false, error: "Reference parameter is required" });
    }

    if (simulate === "true") {
      let record = escrowStore.getTransaction(reference);
      if (!record) {
        record = escrowStore.createTransaction({
          reference,
          packageId: "pkg-obudu-expedition",
          email: "sandbox@crossriver.ng",
          customerName: "Sandbox Tester",
          phone: "+2348000000000",
          amountKobo: 12000000
        });
      }
      const lockedRecord = escrowStore.lockEscrow(reference, {
        status: "success",
        channel: "sandbox_test",
        gateway_response: "Successful (Sandbox Simulation)"
      });
      return res.json({
        success: true,
        status: lockedRecord.status,
        checkInPin: lockedRecord.checkInPin,
        reference: lockedRecord.reference,
        transaction: lockedRecord,
        message: "Escrow funds locked securely in sandbox mode. Present your 6-digit PIN on-site in Cross River."
      });
    }

    const result = await verifyTransaction(reference);
    res.json(result);
  } catch (error) {
    console.error("Paystack Verify Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Release Escrow Funds to Vendor via 6-digit PIN
app.post("/api/escrow/release", (req, res) => {
  try {
    const { reference, pin, vendor } = req.body;
    if (!reference || !pin) {
      return res.status(400).json({ success: false, error: "Both reference and 6-digit PIN are required" });
    }

    const result = releaseEscrowFunds({ reference, pin, vendor });
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error("Escrow Release Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6b. Freeze Escrow & Report Dispute on Arrival
app.post("/api/escrow/dispute", (req, res) => {
  try {
    const { reference, reason, details } = req.body;
    if (!reference) {
      return res.status(400).json({ success: false, error: "Booking reference is required to freeze escrow" });
    }

    const result = escrowStore.disputeEscrow(reference, { reason, details });
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error("Escrow Dispute Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Get All Escrow Transactions & Metrics (Sanitized for Privacy)
app.get("/api/escrow/transactions", (req, res) => {
  try {
    const transactions = escrowStore.getAllTransactions({ sanitized: true });
    const stats = escrowStore.getEscrowStats();
    res.json({ success: true, transactions, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7b. Dedicated Vendor Payouts Endpoint (Completed Disbursed Transactions & Active Arrivals)
app.get("/api/vendor/payouts", (req, res) => {
  try {
    const { vendor } = req.query;
    const payouts = escrowStore.getVendorPayouts(vendor);
    const activeBookings = escrowStore.getVendorActiveBookings(vendor);
    const stats = escrowStore.getEscrowStats(vendor);
    res.json({ success: true, payouts, activeBookings, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7c. Merchant Self-Onboarding Registration Endpoint
const handleVendorRegistration = (req, res) => {
  try {
    const { 
      businessName, 
      business_name,
      name, 
      category, 
      bankPayoutDetails, 
      bankAccount, 
      phone, 
      phoneNumber, 
      email,
      contactEmail,
      logoUrl, 
      image, 
      location, 
      corridor, 
      description, 
      price, 
      priceNGN 
    } = req.body || {};

    const title = businessName || business_name || name;
    if (!title) {
      return res.status(400).json({ success: false, error: "Business name is required." });
    }
    if (!bankPayoutDetails && !bankAccount) {
      return res.status(400).json({ success: false, error: "Bank payout details are required." });
    }
    if (!phone && !phoneNumber) {
      return res.status(400).json({ success: false, error: "Phone number is required." });
    }

    const result = escrowStore.registerVendor({
      businessName: title,
      business_name: title,
      category,
      bankPayoutDetails: bankPayoutDetails || bankAccount,
      phone: phone || phoneNumber,
      email: email || contactEmail,
      logoUrl: logoUrl || image,
      location: location || corridor,
      description,
      priceNGN: priceNGN || price
    });

    res.status(201).json({
      success: true,
      vendor: result.vendor,
      accessCode: result.accessCode,
      directoryCard: result.directoryCard,
      status: result.vendor.status || "pending",
      message: `Merchant registered successfully. Application is in pending review queue.`
    });
  } catch (error) {
    console.error("Vendor Onboarding Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

app.post("/api/vendor/register", handleVendorRegistration);
app.post("/api/vendor/onboard", handleVendorRegistration);

// ==========================================
// Admin Moderation API Endpoints
// ==========================================

// 7c-2. Get all Pending Merchant Applications
app.get("/api/admin/vendors/pending", (req, res) => {
  try {
    const pendingVendors = escrowStore.getPendingVendors();
    res.json(pendingVendors);
  } catch (error) {
    res.status(500).json({ detail: error.message, error: error.message });
  }
});

// 7c-3. Review Merchant Application (Approve or Remove)
app.post("/api/admin/vendors/:vendor_id/review", (req, res) => {
  try {
    const { vendor_id } = req.params;
    const action = req.query.action || req.body?.action;

    if (!action) {
      return res.status(400).json({ detail: "Invalid action parameter." });
    }

    const result = escrowStore.reviewVendor(vendor_id, action);
    if (!result.success) {
      if (result.notFound) {
        return res.status(404).json({ detail: "Vendor not found." });
      }
      if (result.invalidAction) {
        return res.status(400).json({ detail: "Invalid action parameter." });
      }
      return res.status(400).json({ detail: result.error || "Review failed." });
    }

    res.json({ status: "success", message: `Vendor successfully ${action}d.` });
  } catch (error) {
    console.error("Admin Review Error:", error.message);
    res.status(500).json({ detail: error.message, error: error.message });
  }
});

// 7d. Get all Registered Vendors
app.get("/api/vendor/list", (req, res) => {
  try {
    const vendors = escrowStore.getAllVendors();
    res.json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7e. Verify Vendor Access Code
app.post("/api/vendor/verify-access", (req, res) => {
  try {
    const { accessCode } = req.body || {};
    if (!accessCode) {
      return res.status(400).json({ success: false, error: "Access code is required." });
    }
    const vendor = escrowStore.getVendorByAccessCode(accessCode);
    if (!vendor) {
      return res.status(401).json({ success: false, error: "Invalid Vendor Access Code." });
    }
    res.json({ success: true, vendor, accessCode });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7f. Get Dynamic Directory Cards
app.get("/api/vendor/dynamic-cards", (req, res) => {
  try {
    const cards = escrowStore.getDynamicCards();
    res.json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7g. Operator Reset: Clear Dynamic Test Registrations (Master Only)
app.post("/api/vendor/clear-dynamic", (req, res) => {
  try {
    const { accessCode } = req.body || {};
    const result = escrowStore.clearDynamicVendors(accessCode);
    if (!result.success) {
      return res.status(403).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7h. Operator Reset: Delete Specific Dynamic Vendor (Master Only)
app.post("/api/vendor/delete", (req, res) => {
  try {
    const { vendorId, accessCode } = req.body || {};
    const result = escrowStore.deleteDynamicVendor(vendorId, accessCode);
    if (!result.success) {
      return res.status(403).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Fair Price Catalog & Scam Advisories
app.get("/api/fair-prices", (req, res) => {
  res.json({
    success: true,
    fairPrices: FAIR_PRICES,
    scamAdvisories: SCAM_ADVISORIES
  });
});

// 9. AI Tourism Concierge & Surge Predictor
app.post("/api/ai/concierge", async (req, res) => {
  try {
    const { userPrompt, days, travelStyle } = req.body;
    const aiResult = await getAiConciergeResponse({ userPrompt, days, travelStyle });
    res.json({ success: true, ...aiResult });
  } catch (error) {
    console.error("AI Concierge Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve frontend in production (client/dist)
const clientDistPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
  const indexFile = path.join(clientDistPath, "index.html");
  res.sendFile(indexFile, (err) => {
    if (err) {
      // If frontend hasn't been built yet, return informative status
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>CalabarPass API Backend</title>
            <style>
              body { font-family: system-ui, sans-serif; background: #0b0f17; color: #f8fafc; padding: 40px; }
              h1 { color: #f59e0b; }
              a { color: #10b981; }
            </style>
          </head>
          <body>
            <h1>🌴 CalabarPass API Gateway Active</h1>
            <p>The Express backend is live and operational on port ${PORT}.</p>
            <p>API endpoints available at <a href="/api/packages">/api/packages</a>, <a href="/api/fair-prices">/api/fair-prices</a>, <a href="/api/escrow/transactions">/api/escrow/transactions</a>.</p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌴 CalabarPass Escrow & AI Server live on port ${PORT}`);
  console.log(`🛡️  Paystack Mode: LIVE TEST (${PAYSTACK_PUBLIC_KEY.slice(0, 10)}...)`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
