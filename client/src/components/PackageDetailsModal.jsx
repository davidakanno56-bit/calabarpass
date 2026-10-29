import React, { useEffect, useState } from "react";
import {
  Check,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  X,
  ExternalLink
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.jsx";
import { resolvePlaceImage } from "../utils/imageService.js";

const INCLUDED_ITEMS = {
  "pkg-seagull-pass": [
    "Official Band Costume Kit",
    "Security RFID Wristband",
    "Mobile Sound Truck Refreshments",
    "12km Parade Route Access",
    "Band Secretariat Pickup Voucher",
  ],
  "pkg-drill-ranch": [
    "Forest Sanctuary Entry Permit",
    "Certified Canopy Walkway Guide",
    "Primate Conservation Levy",
  ],
  "pkg-obudu-expedition": [
    "Cable Car Access Pass",
    "Holy Mountain Hike Guide",
    "Plateau Facility Voucher",
  ],
  "pkg-marina-cruise": [
    "60-Minute Sunset Waterway Cruise",
    "Calabar Slave History Museum Entry",
    "Waterfront Lounge Voucher",
  ],
  "pkg-agbokim-waterfalls": [
    "Multi-Tier Waterfall Guided Trek",
    "Eco-Reserve Entry Pass",
    "Photo Rendezvous",
  ],
  "pkg-kwa-falls": [
    "234-Step Canyon Descent Guide",
    "River Basin Nature Walk",
    "Tour Ranger Escort",
  ],
};

const HERO_IMAGES = {
  "pkg-seagull-pass": "/assets/seagull_band.jpg",
  "pkg-drill-ranch": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
  "pkg-obudu-expedition": "/assets/obudu_mountain.jpg",
  "pkg-marina-cruise": "/assets/marina_resort.jpg",
  "pkg-agbokim-waterfalls": "/assets/agbokim_waterfalls.jpg",
  "pkg-kwa-falls": "/assets/kwa_falls.jpg",
};

export default function PackageDetailsModal({ pkg, onClose, onBookNow }) {
  const { formatPrice } = useCurrency();
  const meta = resolvePlaceImage(pkg);
  const preferredImage = HERO_IMAGES[pkg?.id] || meta?.primaryUrl || pkg?.image || pkg?.imageUrl || "";
  const [imageSrc, setImageSrc] = useState(preferredImage);
  const includedItems =
    INCLUDED_ITEMS[pkg?.id] ||
    pkg?.included ||
    pkg?.perks ||
    [pkg?.details || pkg?.description].filter(Boolean);
  const packageName = pkg?.name || pkg?.title || "Verified Cross River Pass";

  useEffect(() => {
    setImageSrc(preferredImage);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, preferredImage]);

  if (!pkg) return null;

  const handleBookNow = () => {
    onClose();
    onBookNow(pkg);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 sm:p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-details-title"
        className="my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-[#0B0F17] shadow-2xl shadow-black/60 max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-56 bg-slate-950 sm:h-72">
          <VerifiedImage
            item={pkg}
            src={imageSrc}
            alt={packageName}
            aspectRatio="h-56 sm:h-72"
            rounded="rounded-none"
            showBadge={true}
            badgePosition="top-left"
            showAttribution={true}
            allowGallery={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/20 to-black/30 pointer-events-none" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close package details"
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 p-2 text-white transition hover:bg-black/80"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3 sm:left-7 sm:right-7">
            <div>
              <span className="mb-2 inline-flex rounded-full border border-amber-400/30 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                {pkg.category || "Verified destination"}
              </span>
              <h2
                id="package-details-title"
                className="text-2xl font-extrabold text-white sm:text-3xl"
              >
                {packageName}
              </h2>
            </div>
            <span className="rounded-xl border border-amber-400/30 bg-[#0B0F17]/90 px-4 py-2 text-sm font-extrabold text-amber-300">
              {formatPrice(pkg.priceNGN ?? pkg.price ?? 0)}{" "}
              / pass
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 flex items-start gap-2 text-sm text-slate-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>{pkg.location || "Cross River State"}</span>
            </div>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">
              What&apos;s Included in This Pass
            </h3>
            <ul className="space-y-3">
              {includedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-5 text-slate-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-start rounded-2xl border border-emerald-500/25 bg-emerald-950/30 p-4">
            <div className="mb-2 flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="text-sm font-extrabold">Escrow Anti-Scam Shield</h3>
            </div>
            <p className="text-xs leading-5 text-slate-300">
              100% of your payment remains locked in the CalabarPass vault until
              you confirm your on-site booking with the physical 6-digit PIN.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <LockKeyhole className="h-3 w-3" />
              Protected until check-in
            </div>
          </aside>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-800 bg-slate-950/60 p-5 sm:flex-row sm:justify-end sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-800"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleBookNow}
            className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
          >
            Lock Escrow Slot / Book Now
          </button>
        </footer>
      </section>
    </div>
  );
}
