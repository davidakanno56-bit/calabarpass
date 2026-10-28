import React, { useState, useRef } from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  Trees, 
  Leaf, 
  Sparkles, 
  Utensils, 
  Briefcase, 
  Flame, 
  BedDouble, 
  Navigation, 
  ArrowUpRight, 
  ExternalLink, 
  Car 
} from "lucide-react";

export default function PackageCard({ pkg, onSelectPackage, onViewPackage }) {
  const savings = pkg.streetSurgePrice ? pkg.streetSurgePrice - pkg.priceNGN : 0;
  const cardRef = useRef(null);

  const isDining = pkg?.categoryGroup === "dining-nightlife" || pkg?.category === "Dining & Nightlife";
  const isTrade = pkg?.categoryGroup === "trade-expo" || pkg?.category === "Trade & Expo Hub";
  const isCarnival = pkg?.categoryGroup === "carnival-culture" || pkg?.category === "Carnival & Culture";
  const isEco = pkg?.categoryGroup === "eco-sites" || pkg?.category === "Eco-Sites & Heritage";
  const isAccommodations = pkg?.categoryGroup === "accommodations" || pkg?.category === "Accommodations";

  const [tilt, setTilt] = useState({
    rotX: 0,
    rotY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize from -1 to 1 based on center of card
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Max 12 degrees rotation
    const rotX = -normY * 12;
    const rotY = normX * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      rotX,
      rotY,
      glareX,
      glareY,
      glareOpacity: 0.22,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotX: 0,
      rotY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false
    });
  };

  const CategoryIcon = isDining 
    ? Utensils 
    : isTrade 
    ? Briefcase 
    : isCarnival 
    ? Flame 
    : isEco 
    ? Trees 
    : BedDouble;

  const headerGradient = isDining
    ? "from-amber-50/90 via-white to-amber-50/40 dark:from-amber-950/40 dark:via-slate-900/90 dark:to-slate-950 border-amber-200 dark:border-amber-500/20"
    : isTrade
    ? "from-cyan-50/90 via-white to-cyan-50/40 dark:from-cyan-950/40 dark:via-slate-900/90 dark:to-slate-950 border-cyan-200 dark:border-cyan-500/20"
    : isCarnival
    ? "from-rose-50/90 via-white to-rose-50/40 dark:from-rose-950/40 dark:via-slate-900/90 dark:to-slate-950 border-rose-200 dark:border-rose-500/20"
    : isEco
    ? "from-emerald-50/90 via-white to-emerald-50/40 dark:from-emerald-950/40 dark:via-slate-900/90 dark:to-slate-950 border-emerald-200 dark:border-emerald-500/20"
    : "from-blue-50/90 via-white to-blue-50/40 dark:from-blue-950/40 dark:via-slate-900/90 dark:to-slate-950 border-blue-200 dark:border-blue-500/20";

  const badgeColor = isDining
    ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-500/40"
    : isTrade
    ? "bg-cyan-100 text-sky-800 border-cyan-300 dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-500/40"
    : isCarnival
    ? "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-500/40"
    : isEco
    ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-500/40"
    : "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-500/40";

  const categoryGuideLabel = isDining
    ? "Culinary Guide"
    : isTrade
    ? "Commercial Hub"
    : isCarnival
    ? "Carnival & Cultural Guide"
    : isEco
    ? "Eco-Sites & Heritage Guide"
    : "Accommodations Guide";

  return (
    <div className="perspective-1000 w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => (onViewPackage || onSelectPackage)?.(pkg)}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg) scale3d(${
            tilt.isHovered ? 1.02 : 1
          }, ${tilt.isHovered ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: tilt.isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform"
        }}
        className="glass-panel rounded-3xl overflow-hidden flex flex-col border border-slate-200/90 dark:border-slate-800 hover:border-stateCyan/60 dark:hover:border-amber-500/40 relative group cursor-pointer shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-gold-glow transition-all duration-300"
      >
        {/* Dynamic 3D Glare / Specular Shine Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
          style={{
            opacity: tilt.glareOpacity,
            background: `radial-gradient(circle 380px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(245, 158, 11, 0.12) 30%, transparent 70%)`
          }}
        />

        {/* 1. Header Area: Text-Only Venue Header (Zero Image Placeholders / Broken Frames) */}
        <div
          className={`relative p-6 border-b bg-gradient-to-br preserve-3d flex flex-col justify-between min-h-[11.5rem] ${headerGradient}`}
          style={{ transform: "translateZ(18px)" }}
        >
          {/* Top Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${badgeColor}`}
            >
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{pkg.subCategory || pkg.category}</span>
            </span>

            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/85 dark:text-emerald-300 dark:border-emerald-500/40 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {pkg.badge || pkg.escrowBadge || (isCarnival ? "Verified Cultural Pass" : isEco ? "Verified Nature Wonder" : "Verified Venue")}
              </span>
            </span>
          </div>

          {/* Business / Venue / Band / Site Name in Bold Text + Physical Location */}
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white tracking-tight group-hover:text-stateCyan dark:group-hover:text-amber-400 transition-colors">
              {pkg.name || pkg.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-semibold tracking-tight">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {pkg.location || pkg.corridor || "Calabar, Cross River State"}
              </span>
            </div>
          </div>

          {/* Verification Guarantee Tag */}
          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{pkg.capacityLabel || "Open Daily • 365-Day Escrow Check-In"}</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase tracking-wider">
              {categoryGuideLabel}
            </span>
          </div>
        </div>

        {/* 2. Content Container: Description, Specialty, and Action Buttons */}
        <div className="p-6 flex-1 flex flex-col bg-white/70 dark:bg-transparent preserve-3d">
          {/* Detailed Description */}
          <div style={{ transform: "translateZ(20px)" }} className="preserve-3d mb-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pkg.details || pkg.description}
            </p>
            {isDining && pkg.specialty && (
              <p className="text-xs text-amber-700 dark:text-amber-300/90 mt-2 font-medium">
                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] block">House Specialty:</span>
                {pkg.specialty}
              </p>
            )}
          </div>

          {/* Included Perks (omitted for carnival cards) */}
          {!isCarnival && pkg.perks && pkg.perks.length > 0 && (
            <div
              className="mb-5 space-y-2 preserve-3d"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Included In Pass:
              </div>
              <div className="space-y-1.5">
                {pkg.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scam Warning & Surge Alert (omitted for carnival cards) */}
          {!isCarnival && pkg.scamRisk && (
            <div
              className="mt-auto mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/20 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2 preserve-3d"
              style={{ transform: "translateZ(18px)" }}
            >
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-800 dark:text-rose-200">Anti-Scam Alert: </span>
                <span>{pkg.scamRisk}</span>
              </div>
            </div>
          )}

          {/* Action Row */}
          {isCarnival ? (
            /* Carnival & Culture Cards: Strictly bold titles, locations, descriptions, map links, and "Order Ride via Bolt" buttons */
            <div
              className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2 w-full justify-start sm:justify-end preserve-3d mt-auto"
              style={{ transform: "translateZ(35px)" }}
            >
              {/* Map Navigation Link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pkg.name || pkg.title} ${pkg.location || "Calabar"}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-stateCyan hover:text-sky-600 dark:hover:text-white text-xs font-semibold tracking-tight border border-stateCyan/30 transition-all cursor-pointer shadow-sm"
                title="View on Google Maps"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Map</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              {/* Order Ride via Bolt Button (Carnival retains Bolt) */}
              <a
                href="https://bolt.eu/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#34D186] hover:bg-[#2EB875] text-slate-950 text-xs font-bold tracking-tight shadow-md shadow-emerald-950/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Hail a ride via Bolt in Calabar"
              >
                <Car className="w-3.5 h-3.5 text-slate-950" />
                <span>Order Ride via Bolt</span>
                <ExternalLink className="w-3 h-3 text-slate-950" />
              </a>
            </div>
          ) : (
            <div
              className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4 preserve-3d mt-auto"
              style={{ transform: "translateZ(35px)" }}
            >
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5 tracking-tight font-medium">Verified Fair Price</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-slate-900 dark:text-white">
                    ₦{pkg.priceNGN.toLocaleString()}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-tight">
                    Save ₦{savings.toLocaleString()} vs surge (₦{pkg.streetSurgePrice.toLocaleString()})
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
                {/* Map Navigation Link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pkg.name || pkg.title} ${pkg.location || "Calabar"}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-stateCyan hover:text-sky-600 dark:hover:text-white text-xs font-semibold tracking-tight border border-stateCyan/30 transition-all cursor-pointer shadow-sm"
                  title="View on Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Map</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                {/* Order Ride via Bolt Button - Active ONLY on Dining & Nightlife and Trade & Expo Hub (and Carnival handled above) */}
                {(isDining || isTrade) && (
                  <a
                    href="https://bolt.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#34D186] hover:bg-[#2EB875] text-slate-950 text-xs font-bold tracking-tight shadow-md shadow-emerald-950/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Hail a ride via Bolt in Calabar"
                  >
                    <Car className="w-3.5 h-3.5 text-slate-950" />
                    <span>Order Ride via Bolt</span>
                    <ExternalLink className="w-3 h-3 text-slate-950" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => (onViewPackage || onSelectPackage)?.(pkg)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-stateCyan hover:bg-sky-500 px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight text-white shadow-md shadow-stateCyan/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>View Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
