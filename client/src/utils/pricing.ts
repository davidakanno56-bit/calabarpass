// client/src/utils/pricing.js
// CalabarPass Automated Markup, Tax & Vendor Settlement Engine

/**
 * Calculates the CalabarPass pricing, platform markup, 2% state tax, and vendor payout.
 * 
 * Rules:
 * 1. Vendor sets their base asking price (basePrice).
 * 2. CalabarPass automatically adds platform markup on top (paid by the guest):
 *    - Base >= ₦75,000: +₦10,000 platform markup
 *    - Base >= ₦20,000: +₦5,000 platform markup
 *    - Base < ₦20,000: +₦2,500 (or ₦1,500 if under ₦10,000)
 * 3. We NEVER touch the vendor's money for our platform cut.
 * 4. Only the mandatory 2% Cross River State Tourism / Consumption Tax is deducted from the vendor base.
 * 5. Vendor receives: basePrice - (2% state tax).
 * 6. CalabarPass keeps: platformMarkup (which absorbs Paystack processing fees).
 * 
 * @param {number|string} basePriceInput - Vendor's raw asking amount in NGN
 * @returns {Object} Complete pricing breakdown
 */
export function calculatePricingBreakdown(basePriceInput) {
  const base = Math.max(0, Math.round(Number(basePriceInput) || 0));

  let platformMarkup = 5000;
  if (base >= 75000) {
    platformMarkup = 10000;
  } else if (base >= 20000) {
    platformMarkup = 5000;
  } else if (base > 0) {
    platformMarkup = base >= 10000 ? 2500 : 1500;
  } else {
    platformMarkup = 0;
  }

  const taxRatePercent = 2;
  const taxAmount = Math.round(base * 0.02);
  const vendorPayout = Math.max(0, base - taxAmount);
  const publicListingPrice = base + platformMarkup;

  return {
    basePrice: base,
    platformMarkup,
    taxAmount,
    taxRatePercent,
    vendorPayout,
    publicListingPrice
  };
}

/**
 * Format a number into standard Nigerian Naira currency string
 * @param {number} amount 
 * @returns {string} e.g. "₦50,000"
 */
export function formatNaira(amount) {
  const num = Number(amount) || 0;
  return `₦${num.toLocaleString()}`;
}

