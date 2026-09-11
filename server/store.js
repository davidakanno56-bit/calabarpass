// server/store.js
// CalabarPass In-Memory Store & 365-Day Escrow Transaction State Engine

import { HOTELS, getHotelBaseRate } from "./hotels.js";

export const PACKAGES = [
  {
    id: "pkg-seagull-pass",
    name: "Seagull Band Master Pass & Full Costume Kit",
    priceNGN: 85000,
    category: "Carnival Band",
    tourType: "carnival",
    season: "December Carnival Calabar",
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
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-vip-stadium",
    name: "VIP Stadium Elevated Viewing Stand Pass",
    priceNGN: 35000,
    category: "VIP Experience",
    tourType: "carnival",
    season: "December Carnival Calabar",
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
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-obudu-expedition",
    name: "Obudu Mountain Resort Weekend Expedition",
    priceNGN: 120000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day Highlands Escape",
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
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-marina-cruise",
    name: "Marina Resort & Calabar River Heritage Cruise",
    priceNGN: 15000,
    category: "Cultural Heritage",
    tourType: "year_round",
    season: "365-Day Riverfront & Heritage",
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
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-agbokim-waterfalls",
    name: "Agbokim Waterfalls Eco-Adventure & Canopy Tour",
    priceNGN: 25000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day All-Weather Waterfall Tour",
    vendor: "Ikom Ecotourism Guides Verified",
    location: "Ikom LGA, Cross River",
    image: "/assets/agbokim_waterfalls.jpg",
    details: "Guided 7-stream waterfall hike, rainforest canopy photography pass, and verified local transport escort.",
    perks: [
      "Guided 7-stream cascading waterfall hike & pool tour",
      "Rainforest canopy photography pass & suspension viewpoints",
      "Verified local transport escort from Ikom transit hub",
      "Eco-ranger safety orientation and life-jacket provision"
    ],
    streetSurgePrice: 42000,
    scamRisk: "Unregistered roadside guides demanding cash tolls at informal checkpoints",
    escrowBadge: "Ikom Ecotourism Verified",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-drill-ranch",
    name: "Drill Monkey Ranch (Afi Mountain Sanctuary)",
    priceNGN: 45000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day Rainforest Reserve",
    vendor: "Pandrillus Wildlife Conservation Verified",
    location: "Afi Mountain Reserve / Boki LGA, Cross River",
    image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80",
    details: "Endangered drill monkey sanctuary walk, canopy walkway trek over Afi rainforest, and Pandrillus conservation ranger briefing.",
    perks: [
      "Guided sanctuary trek with Pandrillus wildlife rangers",
      "Afi Mountain rainforest canopy walkway expedition",
      "Native wildlife conservation briefing & educational pass",
      "Direct eco-fund contribution protecting Nigerian primates"
    ],
    streetSurgePrice: 75000,
    scamRisk: "Illegal bushmeat poachers and bogus pseudo-conservation guides charging unauthorized fees",
    escrowBadge: "Wildlife Trust Certified",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-cross-river-safari",
    name: "Cross River Safari National Park & Rainforest Expedition",
    priceNGN: 55000,
    category: "Eco-Tourism",
    tourType: "year_round",
    season: "365-Day Rainforest Safari",
    vendor: "Cross River National Park Eco-Rangers",
    location: "Akamkpa / Oban Hills Division, Cross River",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    details: "Certified eco-ranger guided safari through Oban Division primary rainforest, bird-watching canopy tower access, and native biodiversity tracking.",
    perks: [
      "Certified National Park Ranger Armed Escort & Guide",
      "Oban Division Rainforest Trek & Botanical Canopy Tower Pass",
      "Rare Primates & Forest Elephant Conservation Briefing",
      "Park Entrance Permits & Ecotourism Escrow Protection"
    ],
    streetSurgePrice: 88000,
    scamRisk: "Unregistered poachers and fake guides operating outside designated park borders without radios",
    escrowBadge: "National Park Certified",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-leboku-festival",
    name: "Leboku International New Yam Festival Cultural Access Pass",
    priceNGN: 20000,
    category: "Cultural Heritage",
    tourType: "year_round",
    season: "Annual August Showcase & Cultural Center",
    vendor: "Yakurr Traditional Heritage Council",
    location: "Ugep, Cross River",
    image: "/assets/leboku_festival.jpg",
    details: "Official wrestling bout VIP seating, Mr./Miss Leboku pageant entry, and traditional hospitality tasting.",
    perks: [
      "Official Traditional Wrestling Arena VIP Grandstand Seating",
      "Evening Mr. & Miss Leboku Cultural Pageant Priority Entry",
      "Traditional Yakurr New Yam Feast & Fresh Palm Wine Tasting",
      "Royal Palace Obol Lopon reception viewing escort"
    ],
    streetSurgePrice: 38000,
    scamRisk: "Unauthorized street touts peddling photocopied arena wristbands",
    escrowBadge: "Yakurr Council Endorsed",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  },
  {
    id: "pkg-state-executive-vip",
    name: "Executive Governor's Stand & Official Protocol Pass",
    title: "Executive Governor's Stand & Official Protocol Pass",
    priceNGN: 150000,
    category: "VIP Experience",
    tourType: "carnival",
    season: "December Carnival Calabar",
    vendor: "Cross River State Protocol & Tourism Commission",
    vendorName: "Cross River State Protocol & Tourism Commission",
    location: "U.J. Esuene Stadium Executive Stand, Calabar",
    image: "/assets/executive_vip.jpg",
    imageUrl: "https://cdn.thenationonlineng.net/wp-content/uploads/2024/12/29075713/Otu-commends.jpeg",
    details: "Exclusive accreditation with access to the State Dignitaries Viewing Pavilion, full protocol escort, seated in proximity to state leadership, official state banquet invite, and commemorative medallion.",
    description: "Exclusive accreditation with access to the State Dignitaries Viewing Pavilion, full protocol escort, seated in proximity to state leadership, official state banquet invite, and commemorative medallion.",
    perks: [
      "Exclusive access to the State Dignitaries Viewing Pavilion with Governor Bassey Otu & First Lady",
      "Full Government Protocol & Security Perimeter Escort",
      "Official State Governor's Carnival Banquet Invitation & Accreditation",
      "Commemorative 2026 Gold Medallion & Executive Swag Box",
      "VIP Elevated sightlines directly over the grand adjudication arena"
    ],
    streetSurgePrice: 280000,
    scamRisk: "Counterfeit protocol passes sold by black-market political fixers",
    escrowBadge: "Executive Verified",
    badge: "Executive Verified",
    openCapacity: true,
    capacityLabel: "Open Daily / 365-Day Guarantee",
    bookingMode: "365_day_open"
  }
];

// Unified Transaction States:
// 'AWAITING_PAYMENT' -> 'ESCROW_LOCKED_ACTIVE' ('Escrow Secured - Awaiting On-Site Verification') -> 'COMPLETED_DISBURSED'

class EscrowStore {
  constructor() {
    this.transactions = new Map();
    this.seedInitialTransactions();
  }

  seedInitialTransactions() {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
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
      bookingDate: tomorrow,
      status: "ESCROW_LOCKED_ACTIVE",
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
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
      bookingDate: "2026-12-27",
      status: "COMPLETED_DISBURSED",
      statusLabel: "Completed & Disbursed to Vendor",
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

  getHotels() {
    return HOTELS;
  }

  getHotelById(id) {
    return HOTELS.find(h => h.id === id);
  }

  getPackageById(id) {
    const pkg = PACKAGES.find(p => p.id === id);
    if (pkg) return pkg;

    const hotel = HOTELS.find(h => h.id === id);
    if (hotel) {
      return {
        id: hotel.id,
        name: `${hotel.name} - Executive Accommodation`,
        priceNGN: getHotelBaseRate(hotel.priceRange),
        category: hotel.category,
        tourType: "accommodation",
        season: "365-Day Escrow Reservation",
        vendor: `${hotel.name} (Verified Escrow Accommodation)`,
        location: hotel.area,
        image: hotel.images[0],
        imageUrl: hotel.images[0],
        details: hotel.description,
        perks: hotel.amenities,
        openCapacity: true,
        capacityLabel: "Open Daily / 365-Day Guarantee",
        bookingMode: "365_day_open"
      };
    }
    return null;
  }

  createTransaction({ reference, packageId, email, customerName, phone, amountKobo, bookingDate }) {
    const pkg = this.getPackageById(packageId) || {};
    const defaultDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const transaction = {
      reference,
      packageId,
      packageName: pkg.name || "Cross River Tourism Package",
      vendor: pkg.vendor || "Verified Cross River Vendor",
      customerName: customerName || "Guest Explorer",
      email,
      phone: phone || "",
      bookingDate: bookingDate || defaultDate,
      amountNGN: (amountKobo || 0) / 100,
      amountKobo,
      status: "AWAITING_PAYMENT",
      statusLabel: "Awaiting Paystack Payment",
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
      statusLabel: "Escrow Secured - Awaiting On-Site Verification",
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
      statusLabel: "Completed & Disbursed to Vendor",
      disbursedAt: new Date().toISOString(),
      vendorDisbursementNote: `Disbursed to ${transaction.vendor} on-site via physical PIN redemption.`
    };

    this.transactions.set(reference, updated);
    return { success: true, transaction: updated };
  }

  disputeEscrow(reference, { reason, details } = {}) {
    const transaction = this.transactions.get(reference);
    if (!transaction) {
      return { success: false, error: "Booking transaction not found" };
    }

    if (transaction.status === "COMPLETED_DISBURSED") {
      return {
        success: false,
        error: "Cannot dispute booking: funds have already been disbursed to the vendor."
      };
    }

    const updated = {
      ...transaction,
      status: "ESCROW_FROZEN_DISPUTE",
      statusLabel: "Escrow Frozen - Under Review",
      disputeReason: reason || "Tourist Reported On-Site Issue",
      disputeDetails: details || "Dispute registered by guest upon arrival. Funds held safely in vault.",
      disputedAt: new Date().toISOString()
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
    const disputedCount = all.filter(t => t.status === "ESCROW_FROZEN_DISPUTE").length;

    return {
      totalLockedNGN: totalLocked,
      totalDisbursedNGN: totalDisbursed,
      activeEscrowBookings: activeCount,
      completedDisbursedBookings: completedCount,
      disputedEscrowBookings: disputedCount,
      totalTransactions: all.length
    };
  }
}

export const escrowStore = new EscrowStore();
