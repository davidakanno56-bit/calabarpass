// server/vendorAuth.js
// Cryptographically Secure Vendor Access Code Generator & Verification Service

import crypto from "crypto";

/**
 * Category Prefix Mapping:
 * - Accommodations (Hotels, Resorts, Suites): CAL-HTL-XXXX
 * - Eco-Sites & Heritage (Marina, Agbokim, Drill, Kwa): CAL-ECO-XXXX
 * - Dining & Nightlife (Eateries, Seafood Hubs, Lounges): CAL-EAT-XXXX
 * - Trade & Expo Hub (Business Passes, Trade Fair Booths): CAL-TRD-XXXX
 * - Carnival & Culture (Carnival Band Passes, Festival Tickets): CAL-CUL-XXXX
 */
export const CATEGORY_PREFIXES = {
  accommodations: "CAL-HTL",
  "eco-sites": "CAL-ECO",
  "dining-nightlife": "CAL-EAT",
  "trade-expo": "CAL-TRD",
  "carnival-culture": "CAL-CUL"
};

/**
 * Maps any category input (slug, display title, keywords) to its standard prefix
 * @param {string} category 
 * @returns {string} Prefix such as CAL-HTL, CAL-ECO, etc.
 */
export function getCategoryPrefix(category = "") {
  const cat = String(category || "").toLowerCase().trim();

  // 1. Exact Category Slugs
  if (cat === "accommodations") return "CAL-HTL";
  if (cat === "eco-sites" || cat === "eco-tourism") return "CAL-ECO";
  if (cat === "dining-nightlife" || cat === "dining") return "CAL-EAT";
  if (cat === "trade-expo" || cat === "trade") return "CAL-TRD";
  if (cat === "carnival-culture" || cat === "carnival") return "CAL-CUL";

  // 2. Specific Eco & Heritage Keywords
  if (
    cat.includes("eco") || 
    cat.includes("heritage") || 
    cat.includes("waterfall") || 
    cat.includes("ranch") || 
    cat.includes("park") ||
    cat.includes("falls") ||
    cat.includes("marina") ||
    cat.includes("obudu") ||
    cat.includes("sanctuary") ||
    cat.includes("canyon")
  ) {
    return "CAL-ECO";
  }

  // 3. Specific Dining & Nightlife Keywords
  if (
    cat.includes("din") || 
    cat.includes("night") || 
    cat.includes("eat") || 
    cat.includes("food") || 
    cat.includes("lounge") || 
    cat.includes("seafood") ||
    cat.includes("restaurant") ||
    cat.includes("kitchen") ||
    cat.includes("grill")
  ) {
    return "CAL-EAT";
  }

  // 4. Specific Trade & Expo Keywords
  if (
    cat.includes("trade") || 
    cat.includes("expo") || 
    cat.includes("commerce") || 
    cat.includes("booth") || 
    cat.includes("ftz") ||
    cat.includes("exhibitor") ||
    cat.includes("cicc")
  ) {
    return "CAL-TRD";
  }

  // 5. Specific Carnival & Culture Keywords
  if (
    cat.includes("carnival") || 
    cat.includes("cultur") || 
    cat.includes("band") || 
    cat.includes("festival") ||
    cat.includes("costume")
  ) {
    return "CAL-CUL";
  }

  // 6. Accommodations Keywords
  if (
    cat.includes("accom") || 
    cat.includes("hotel") || 
    cat.includes("resort") || 
    cat.includes("suite") ||
    cat.includes("lodge") ||
    cat.includes("stay")
  ) {
    return "CAL-HTL";
  }

  return "CAL-VND";
}

/**
 * Generates a cryptographically secure 4-digit numeric string [1000 - 9999]
 * @returns {string}
 */
export function generateSecure4DigitString() {
  if (crypto && typeof crypto.randomInt === "function") {
    // Cryptographically secure integer in range [1000, 10000)
    return crypto.randomInt(1000, 10000).toString();
  }

  // Fallback using crypto.randomBytes
  if (crypto && typeof crypto.randomBytes === "function") {
    const buffer = crypto.randomBytes(2);
    const num = (buffer.readUInt16BE(0) % 9000) + 1000;
    return num.toString();
  }

  // Web Crypto fallback
  if (typeof globalThis !== "undefined" && globalThis.crypto && typeof globalThis.crypto.getRandomValues === "function") {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    const num = (array[0] % 9000) + 1000;
    return num.toString();
  }

  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Generates a formatted Vendor Access Code for a given category
 * @param {string} category Category name, slug or keyword
 * @returns {string} Formatted code like CAL-HTL-8821
 */
export function generateVendorAccessCode(category = "") {
  const prefix = getCategoryPrefix(category);
  const code = generateSecure4DigitString();
  return `${prefix}-${code}`;
}

/**
 * Validates whether a given code matches the expected format CAL-[PREFIX]-XXXX
 * @param {string} code 
 * @returns {boolean}
 */
export function isValidVendorAccessCodeFormat(code = "") {
  if (!code) return false;
  const regex = /^CAL-(HTL|ECO|EAT|TRD|CUL|VND)-\d{4}$/i;
  return regex.test(String(code).trim());
}
