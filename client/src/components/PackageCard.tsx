// client/src/components/PackageCard.tsx
// Luxury Editorial Hospitality & Destination Card (Visit Dubai × Visit Saudi Standard)

import React from "react";
import { useCurrency } from "../context/CurrencyContext.tsx";
import { 
  ShieldCheck, 
  MapPin, 
  Check, 
  ArrowRight, 
  Trees, 
  Sparkles, 
  Utensils, 
  Briefcase, 
  Flame, 
  BedDouble, 
  Navigation, 
  ArrowUpRight, 
  Car,
  Lock
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.tsx";

export default function PackageCard({ pkg, onSelectPackage, onViewPackage }) {
  if (!pkg) return null;
  const { formatPrice } = useCurrency();
  const savings = (pkg?.streetSurgePrice && pkg?.priceNGN) ? pkg.streetSurgePrice - pkg.priceNGN : 0;

  const isDining = pkg?.categoryGroup === "dining-nightlife" || pkg?.category === "Dining & Nightlife";
  const isTrade = pkg?.categoryGroup === "trade-expo" || pkg?.category === "Trade & Expo Hub";
  const isCarnival = pkg?.categoryGroup === "carnival-culture" || pkg?.category === "Carnival & Culture";
  const isEco = pkg?.categoryGroup === "eco-sites" || pkg?.category === "Eco-Sites & Heritage";
  const isAccommodations = pkg?.categoryGroup === "accommodations" || pkg?.category === "Accommodations";

  const CategoryIcon = isDining 
    ? Utensils 
    : isTrade 
    ? Briefcase 
    : isCarnival 
    ? Flame 
    : isEco 
    ? Trees 
    : BedDouble;

  const categoryLabel = isDining
    ? "Dining & Nightlife"
    : isTrade
    ? "Trade & Expo"
    : isCarnival
    ? "Carnival & Culture"
    : isEco
    ? "Eco-Sites & Heritage"
    : "Accommodations";

  // Resolve best image URL for this card
  const cardImage = pkg.image || pkg.imageUrl || (
    isEco ? "/assets/obudu_mountain.jpg" :
    isDining ? "/assets/marina_resort.jpg" :
    isCarnival ? "/assets/seagull_band.jpg" :
    isAccommodations ? "/assets/calabar-cityscape-aerial.jpg" :
    "/assets/calabar-cityscape-aerial.jpg"
  );

  return (
    <div 
      onClick={() => (onViewPackage || onSelectPackage)?.(pkg)}
      className="group rounded-3xl overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cr-forest/50 dark:hover:border-cr-lagoon/50 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer text-left relative"
    >
      {/* 1. Magazine-Quality Photo Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <VerifiedImage
          item={pkg}
          src={cardImage}
          alt={pkg.name || pkg.title}
          aspectRatio="aspect-[16/10]"
          showBadge={false}
          showAttribution={false}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30 pointer-events-none" />

        {/* Floating Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
            <CategoryIcon className="w-3.5 h-3.5 text-cr-lagoon" />
            <span>{pkg.subCategory || categoryLabel}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cr-forest/90 backdrop-blur-md text-white border border-cr-forest/40 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-cr-lagoon" />
            <span>{pkg.badge || pkg.escrowBadge || "Verified Partner"}</span>
          </span>
        </div>

        {/* Bottom Image Overlay: Corridor Tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-xs text-white/90 drop-shadow pointer-events-none">
          <span className="flex items-center gap-1.5 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-cr-lagoon shrink-0" />
            <span className="truncate">{pkg.location || pkg.corridor || "Cross River State"}</span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 shrink-0">
            365 Open
          </span>
        </div>
      </div>

      {/* 2. Content Container: Title, Highlights & Partner Escrow Guarantee */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight group-hover:text-cr-forest dark:group-hover:text-cr-lagoon transition-colors line-clamp-1">
            {pkg.name || pkg.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 font-light">
            {pkg.details || pkg.description}
          </p>
        </div>

        {/* Included Amenities / Perks Pills */}
        {!isCarnival && pkg.perks && pkg.perks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(Array.isArray(pkg?.perks) ? pkg.perks.slice(0, 3) : []).map((perk, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                <Check className="w-3 h-3 text-cr-forest dark:text-cr-lagoon shrink-0" />
                <span className="truncate max-w-[200px]">{perk}</span>
              </span>
            ))}
          </div>
        )}

        {/* Accurate Neutral Trust Assurance */}
        <div className="p-2.5 rounded-xl bg-cr-forest/10 dark:bg-cr-forest/20 border border-cr-forest/30 text-[11px] text-cr-forest dark:text-cr-lagoon flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-cr-forest dark:text-cr-lagoon shrink-0" />
            <span>Verified Partner Escrow</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500 dark:text-cr-lagoon/80 uppercase">
            6-Digit PIN Check-In
          </span>
        </div>

        {/* 3. Action & Pricing Row */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 mt-auto">
          {/* Price */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Verified Rate
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
                {formatPrice(pkg.priceNGN)}
              </span>
            </div>
            {savings > 0 && (
              <div className="text-[10px] font-semibold text-cr-forest dark:text-cr-lagoon">
                Save {formatPrice(savings)} vs street surge
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {/* Map Link */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pkg.name || pkg.title} ${pkg.location || "Calabar"}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title="View on Google Maps"
            >
              <Navigation className="w-4 h-4 text-cr-forest dark:text-cr-lagoon" />
            </a>

            {/* Bolt Ride Button (active on Dining & Carnival) */}
            {(isDining || isTrade || isCarnival) && (
              <a
                href="https://bolt.eu/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#34D186] hover:bg-[#2EB875] text-slate-950 text-xs font-bold transition shadow-sm"
                title="Hail Bolt in Calabar"
              >
                <Car className="w-3.5 h-3.5 text-slate-950" />
                <span>Bolt</span>
              </a>
            )}

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => (onViewPackage || onSelectPackage)?.(pkg)}
              className="px-4 py-2.5 rounded-xl bg-cr-forest hover:bg-cr-tropical text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-cr-forest/20 flex items-center gap-1.5 transition-all cursor-pointer group-hover:bg-cr-lagoon group-hover:text-slate-950"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
