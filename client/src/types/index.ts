// client/src/types/index.ts
// CalabarPass Enterprise TypeScript Definitions
// Official Cross River State Tourism Bureau & Clearinghouse Escrow Engine

export type EscrowStatus = 
  | "AWAITING_PAYMENT"
  | "ESCROW_LOCKED_ACTIVE"
  | "COMPLETED_DISBURSED"
  | "ESCROW_FROZEN_DISPUTE"
  | "REFUNDED";

export type VendorCategory = 
  | "accommodations"
  | "eco-sites"
  | "dining-nightlife"
  | "trade-expo"
  | "carnival-culture";

export interface PricingBreakdown {
  basePrice: number;
  platformMarkup: number;
  taxAmount: number;
  taxRatePercent: number;
  vendorPayout: number;
  publicListingPrice: number;
}

export interface Vendor {
  id: string;
  name: string;
  businessName: string;
  business_name?: string;
  category: VendorCategory;
  bankAccount: string;
  bankPayoutDetails?: string;
  subaccount_code?: string | null;
  paystackSubaccount?: Record<string, unknown> | null;
  phone: string;
  email: string;
  logoUrl?: string;
  image?: string;
  imageUrl?: string;
  location: string;
  description: string;
  basePriceNGN?: number;
  platformMarkupNGN?: number;
  taxNGN?: number;
  taxRatePercent?: number;
  vendorPayoutNGN?: number;
  priceNGN: number;
  publicPriceNGN?: number;
  accessCode: string;
  merchant_code?: string;
  registeredAt: string;
  createdAt: string;
  status: "pending" | "approved" | "removed";
  terms?: {
    incoming: string;
    booking: string;
    item: string;
    itemExample: string;
    dateLabel: string;
    amountLabel: string;
  };
  demo?: [string, string, string, string, number];
}

export interface Transaction {
  reference: string;
  packageId: string;
  packageName: string;
  vendor: string;
  vendorId?: string;
  customerName: string;
  email: string;
  phone: string;
  amountNGN: number;
  amountKobo: number;
  basePriceNGN?: number;
  platformMarkupNGN?: number;
  taxNGN?: number;
  vendorPayoutNGN?: number;
  disbursedVendorPayout?: number;
  remittedGovtTax?: number;
  bookingDate: string;
  status: EscrowStatus;
  statusLabel: string;
  checkInPin?: string | null;
  createdAt?: string;
  lockedAt?: string;
  disbursedAt?: string | null;
  paystackStatus?: string;
  channel?: string;
  disputeReason?: string;
  disputeDetails?: string;
  disputedAt?: string;
  vendorDisbursementNote?: string;
}

export interface TourismPackage {
  id: string;
  title: string;
  name?: string;
  vendor: string;
  vendorName?: string;
  vendorId?: string;
  location: string;
  corridor?: string;
  placeId?: string;
  price: number;
  priceNGN: number;
  basePriceNGN?: number;
  platformMarkupNGN?: number;
  taxNGN?: number;
  vendorPayoutNGN?: number;
  category: string;
  categoryGroup?: VendorCategory;
  subCategory?: string;
  tourType?: string;
  season?: string;
  image?: string;
  imageUrl?: string;
  gallery?: string[];
  altText?: string;
  attribution?: string;
  verified?: boolean;
  verificationStatus?: string;
  details: string;
  description: string;
  perks?: string[];
  included?: string[];
  scamRisk?: string;
  streetSurgePrice?: number;
  badge?: string;
  escrowBadge?: string;
  capacityLabel?: string;
  specialty?: string;
}

export interface BankRecord {
  name: string;
  code: string;
  slug?: string;
  nibss_code?: string;
}

// Apple-Grade Component Interfaces for Protection Desk, Gate Scanner, & Organizer Hub
export interface EscrowBookingRecord {
  reference: string;
  packageName: string;
  vendor: string;
  vendorId?: string;
  customerName: string;
  email: string;
  phone: string;
  amountNGN: number;
  status: "ESCROW_LOCKED_ACTIVE" | "COMPLETED_DISBURSED" | "ESCROW_FROZEN_DISPUTE";
  statusLabel: string;
  checkInPin: string;
  bookingDate: string;
  location?: string;
}

export interface RapidSupportContact {
  id: string;
  title: string;
  badge: string;
  description: string;
  sla: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  accent: "emerald" | "sky" | "amber";
  coverage: string[];
}

export type ScannerStatus = "idle" | "scanning" | "valid" | "duplicate" | "fraud";

export interface ScannedPassPayload {
  reference: string;
  attendeeName: string;
  categoryTier: string;
  vendorOrEvent: string;
  gateLocation: string;
  checkInTimestamp: string;
  escrowStatus: "RELEASED_TO_MERCHANT" | "HELD_FOR_REVIEW" | "ALREADY_CLAIMED";
  ticketId: string;
  seatOrGrandstand?: string;
  redemptionHistory?: {
    firstCheckIn: string;
    gate: string;
    operator: string;
  };
}

export interface SettlementLedgerEntry {
  reference: string;
  guestName: string;
  vendorName: string;
  vendorId: string;
  paystackSubaccount: string;
  category: "accommodations" | "eco-sites" | "dining-nightlife" | "trade-expo" | "carnival-culture";
  categoryLabel: string;
  grossAmountNGN: number;
  baseAmountNGN: number;
  platformMarkupNGN: number;
  stateTaxNGN: number;
  netVendorPayoutNGN: number;
  status: "DISBURSED_TO_SUBACCOUNT" | "ESCROW_LOCKED" | "PENDING_CHECKIN" | "FROZEN_DISPUTE";
  checkInTimestamp: string;
  channel: string;
}

export interface TelemetryStats {
  grossProcessedNGN: number;
  activeEscrowsLockedNGN: number;
  totalGateChecks: number;
  stateTaxRemittedNGN: number;
  totalDisbursedNGN: number;
  activePassAuthenticityRate: number;
}

