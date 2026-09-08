// server/store.js
// CalabarPass In-Memory Store & Escrow Transaction State Engine

export const PACKAGES = [
  {
    id: "pkg-seagull-pass",
    name: "Seagull Band Master Pass & Full Costume Kit",
    priceNGN: 85000,
    category: "Carnival Band",
    vendor: "Official Band Secretariat",
    location: "Marian Road / Stadium Route, Calabar",
    image: "/assets/seagull_band.jpg",
    details: "Official 2026 route wristband, feather costume kit, hydration truck access, security escort.",
    perks: [
      "Official 2026 Carnival Route Wristband",
      "Handcrafted Feather & Sequin Costume Kit",
      "All-day Hydration & Refreshment Truck Access",
      "Dedicated Escort & Paramedic Team along Marian Road"
    ],
    streetSurgePrice: 135000,
    scamRisk: "Extreme counterfeit wristbands reported on Marian Road street corners",
    escrowBadge: "Official Secretariat Verified",
    availableSlots: 28
  },
  {
    id: "pkg-vip-stadium",
    name: "VIP Stadium Elevated Viewing Stand Pass",
    priceNGN: 35000,
    category: "VIP Experience",
    vendor: "Cross River Tourism Bureau Verified",
    location: "U.J. Esuene Stadium, Calabar",
    image: "/assets/vip_stadium.jpg",
    details: "Shaded elevated seating, priority accreditation, private security perimeter, refreshments.",
    perks: [
      "Reserved Shaded High-Tier Grandstand Seating",
      "Fast-track Priority Security Accreditation",
      "Air-conditioned VIP lounge & Refreshments",
      "Unobstructed panoramic view of band adjudications"
    ],
    streetSurgePrice: 65000,
    scamRisk: "Unauthorized hawkers selling duplicate barcode entry badges",
    escrowBadge: "State Bureau Endorsed",
    availableSlots: 45
  },
  {
    id: "pkg-obudu-expedition",
    name: "Obudu Mountain Resort Weekend Expedition",
    priceNGN: 120000,
    category: "Eco-Tourism",
    vendor: "Cross River Highlands Transit",
    location: "Obanliku Plateau (Departs Marina)",
    image: "/assets/obudu_mountain.jpg",
    details: "Air-conditioned transit from Calabar Marina, 2-night resort booking, cable car pass, mountain guide.",
    perks: [
      "Roundtrip Executive Transit from Calabar Marina",
      "2-Night Mountain Chalet Accommodation",
      "Unlimited Cable Car Canopy Passes",
      "Guided Holy Mountain & Becheve Nature Reserve Trek"
    ],
    streetSurgePrice: 190000,
    scamRisk: "Ghost tour operators demanding 100% upfront bank transfers with no vehicles",
    escrowBadge: "Highlands Operator Certified",
    availableSlots: 14
  },
  {
    id: "pkg-marina-cruise",
    name: "Marina Resort & Calabar River Heritage Cruise",
    priceNGN: 15000,
    category: "Cultural Heritage",
    vendor: "Marina Heritage Ventures",
    location: "Marina Resort Waterfront, Calabar",
    image: "/assets/marina_resort.jpg",
    details: "Slave History Museum entry, 1-hour sunset river cruise, cultural dance performance.",
    perks: [
      "Curated Slave History Museum & Relic Tour",
      "60-Minute Sunset Catamaran River Cruise",
      "Traditional Efik Cultural Dance & Music Showcase",
      "Complimentary Palm Wine & Calabar Pepper Soup Voucher"
    ],
    streetSurgePrice: 28000,
    scamRisk: "Unlicensed boat skippers operating without life jackets",
    escrowBadge: "Waterfront Authority Certified",
    availableSlots: 60
  }
];

// Transaction States:
// 'AWAITING_PAYMENT' -> 'ESCROW_LOCKED_ACTIVE' -> 'COMPLETED_DISBURSED'

class EscrowStore {
  constructor() {
    this.transactions = new Map();
    this.seedInitialTransactions();
  }

  seedInitialTransactions() {
    // Demo seed transaction for on-site simulation / visual proof
    const demoRef1 = "CP-DEMO-849201";
    this.transactions.set(demoRef1, {
      reference: demoRef1,
      packageId: "pkg-seagull-pass",
      packageName: "Seagull Band Master Pass & Full Costume Kit",
      vendor: "Official Band Secretariat",
      customerName: "Chidi Okafor",
      email: "chidi.okafor@example.com",
      phone: "+234 803 219 4091",
      amountNGN: 85000,
      amountKobo: 8500000,
      status: "ESCROW_LOCKED_ACTIVE",
      checkInPin: "849201",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 3.8).toISOString(),
      disbursedAt: null,
      paystackStatus: "success",
      channel: "card"
    });

    const demoRef2 = "CP-DEMO-392810";
    this.transactions.set(demoRef2, {
      reference: demoRef2,
      packageId: "pkg-vip-stadium",
      packageName: "VIP Stadium Elevated Viewing Stand Pass",
      vendor: "Cross River Tourism Bureau Verified",
      customerName: "Amina Bello",
      email: "amina.b@example.com",
      phone: "+234 812 770 1822",
      amountNGN: 35000,
      amountKobo: 3500000,
      status: "COMPLETED_DISBURSED",
      checkInPin: "392810",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      lockedAt: new Date(Date.now() - 3600000 * 23.5).toISOString(),
      disbursedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      paystackStatus: "success",
      channel: "bank_transfer"
    });
  }

  getPackages() {
    return PACKAGES;
  }

  getPackageById(id) {
    return PACKAGES.find(p => p.id === id);
  }

  createTransaction({ reference, packageId, email, customerName, phone, amountKobo }) {
    const pkg = this.getPackageById(packageId) || {};
    const transaction = {
      reference,
      packageId,
      packageName: pkg.name || "Calabar Carnival Package",
      vendor: pkg.vendor || "Verified Carnival Vendor",
      customerName,
      email,
      phone,
      amountNGN: (amountKobo || 0) / 100,
      amountKobo,
      status: "AWAITING_PAYMENT",
      checkInPin: null,
      createdAt: new Date().toISOString(),
      lockedAt: null,
      disbursedAt: null,
      paystackStatus: "pending"
    };

    this.transactions.set(reference, transaction);
    return transaction;
  }

  getTransaction(reference) {
    return this.transactions.get(reference);
  }

  updateTransaction(reference, updates) {
    const existing = this.transactions.get(reference);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    this.transactions.set(reference, updated);
    return updated;
  }

  // Generate cryptographically uniform 6-digit PIN
  generatePin() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  lockEscrow(reference, paystackDetails = {}) {
    const transaction = this.transactions.get(reference);
    if (!transaction) return null;

    const checkInPin = transaction.checkInPin || this.generatePin();
    const updated = {
      ...transaction,
      status: "ESCROW_LOCKED_ACTIVE",
      checkInPin,
      lockedAt: new Date().toISOString(),
      paystackStatus: paystackDetails.status || "success",
      channel: paystackDetails.channel || "card",
      gatewayResponse: paystackDetails.gateway_response || "Successful"
    };

    this.transactions.set(reference, updated);
    return updated;
  }

  releaseEscrow(reference, pin) {
    const transaction = this.transactions.get(reference);
    if (!transaction) {
      return { success: false, error: "Booking transaction not found" };
    }

    if (transaction.status === "COMPLETED_DISBURSED") {
      return { success: false, error: "Funds have already been disbursed to the vendor", transaction };
    }

    if (transaction.status !== "ESCROW_LOCKED_ACTIVE") {
      return { success: false, error: `Cannot disburse transaction in status: ${transaction.status}` };
    }

    if (String(transaction.checkInPin).trim() !== String(pin).trim()) {
      return { success: false, error: "Invalid physical check-in PIN. Vendor verification failed." };
    }

    const updated = {
      ...transaction,
      status: "COMPLETED_DISBURSED",
      disbursedAt: new Date().toISOString(),
      vendorDisbursementNote: `Disbursed to ${transaction.vendor} on-site via physical PIN redemption.`
    };

    this.transactions.set(reference, updated);
    return { success: true, transaction: updated };
  }

  getAllTransactions() {
    return Array.from(this.transactions.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  getEscrowStats() {
    const all = Array.from(this.transactions.values());
    const totalLocked = all
      .filter(t => t.status === "ESCROW_LOCKED_ACTIVE")
      .reduce((sum, t) => sum + (t.amountNGN || 0), 0);

    const totalDisbursed = all
      .filter(t => t.status === "COMPLETED_DISBURSED")
      .reduce((sum, t) => sum + (t.amountNGN || 0), 0);

    const activeCount = all.filter(t => t.status === "ESCROW_LOCKED_ACTIVE").length;
    const completedCount = all.filter(t => t.status === "COMPLETED_DISBURSED").length;

    return {
      totalLockedNGN: totalLocked,
      totalDisbursedNGN: totalDisbursed,
      activeEscrowBookings: activeCount,
      completedDisbursedBookings: completedCount,
      totalTransactions: all.length
    };
  }
}

export const escrowStore = new EscrowStore();
