// client/src/utils/imageService.js
// CalabarPass Client Real-World Image Service
// Cross River 365-Day Clearinghouse authentic photography resolver & manager.

import { VERIFIED_PLACES_IMAGES, getVerifiedPlaceImage } from "../data/verifiedPlacesImages.js";

/**
 * Standard Neutral Fallback Object for listings without a verified photograph yet.
 * Strictly guarantees ZERO synthetic/AI-generated images and ZERO unrelated stock photos.
 */
export function getNeutralFallback(item = {}) {
  const name = typeof item === "string" ? item : (item.name || item.title || "Listing");
  return {
    id: item.id || "unverified",
    name,
    primaryUrl: null,
    gallery: [],
    altText: `Photo not yet available for ${name}. Awaiting authentic on-site photograph verification.`,
    attribution: "CalabarPass Verification Desk",
    license: "State Clearinghouse Standard",
    licenseUrl: "https://calabarpass.ng/verification-standards",
    source: "unverified",
    sourceUrl: null,
    verified: false,
    verificationStatus: "photo_not_available",
    verifiedDate: null,
    message: "Photo not yet available — Awaiting authentic on-site verification"
  };
}

/**
 * Synchronously or asynchronously resolves the authentic photograph for any place/listing.
 * Prefers the local pre-verified registry for instant rendering without layout shifts,
 * and seamlessly supports API resolution if an unknown listing is queried.
 */
export function resolvePlaceImage(identifierOrObj) {
  if (!identifierOrObj) return getNeutralFallback();

  let id, name, placeId, category;
  if (typeof identifierOrObj === "string") {
    id = identifierOrObj;
    name = identifierOrObj;
  } else {
    id = identifierOrObj.id || identifierOrObj.packageId || identifierOrObj.hotelId;
    name = identifierOrObj.name || identifierOrObj.title;
    placeId = identifierOrObj.placeId;
    category = identifierOrObj.category;
  }

  // 1. Direct registry lookup
  const match = getVerifiedPlaceImage(id) || getVerifiedPlaceImage(name) || getVerifiedPlaceImage(placeId);
  if (match) {
    return match;
  }

  // 2. If object already has verified real-world metadata
  if (identifierOrObj.verificationStatus === "verified_real_world" && (identifierOrObj.primaryUrl || identifierOrObj.imageUrl || identifierOrObj.image)) {
    const url = identifierOrObj.primaryUrl || identifierOrObj.imageUrl || identifierOrObj.image;
    return {
      id: id || "custom-verified",
      name: name || "Verified Listing",
      placeId: placeId || null,
      primaryUrl: url,
      gallery: Array.isArray(identifierOrObj.gallery) && identifierOrObj.gallery.length > 0 ? identifierOrObj.gallery : [url],
      altText: identifierOrObj.altText || `Authentic verified photograph of ${name || 'listing'} in Calabar.`,
      attribution: identifierOrObj.attribution || "Merchant Verified On-Site Upload",
      license: identifierOrObj.license || "Verified Partner Media Agreement",
      licenseUrl: identifierOrObj.licenseUrl || "https://calabarpass.ng/licensing/verified-media",
      source: identifierOrObj.source || "merchant_upload",
      sourceUrl: identifierOrObj.sourceUrl || null,
      verified: true,
      verificationStatus: "verified_real_world",
      verifiedDate: identifierOrObj.verifiedDate || new Date().toISOString().split("T")[0]
    };
  }

  // 3. Fallback
  return getNeutralFallback(identifierOrObj);
}

/**
 * Asynchronously fetch from server (which checks overrides, Google Places API & Wikimedia Commons)
 */
export async function fetchLiveResolvedImage({ id, name, location, placeId, category }) {
  try {
    const params = new URLSearchParams();
    if (id) params.set("id", id);
    if (name) params.set("name", name);
    if (location) params.set("location", location);
    if (placeId) params.set("placeId", placeId);
    if (category) params.set("category", category);

    const res = await fetch(`/api/images/resolve?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.image) {
        return data.image;
      }
    }
  } catch (err) {
    console.warn("Live image resolution error, falling back to local registry:", err.message);
  }

  return resolvePlaceImage({ id, name, location, placeId, category });
}

/**
 * Save an administrator or merchant manual photo override
 */
export async function saveImageOverride(id, data, accessCode) {
  try {
    const res = await fetch("/api/images/override", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, data, accessCode })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch image audit statistics from backend
 */
export async function fetchImageAuditStats() {
  try {
    const res = await fetch("/api/images/stats");
    if (res.ok) {
      const data = await res.json();
      return data.stats;
    }
  } catch (err) {
    console.warn("Could not fetch audit stats:", err.message);
  }
  return null;
}
