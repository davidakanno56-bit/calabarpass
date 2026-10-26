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
  Navigation,
  ArrowUpRight,
  ExternalLink,
  Car
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.jsx";

export default function PackageCard({ pkg, onSelectPackage, onViewPackage }) {
  const savings = pkg.streetSurgePrice ? pkg.streetSurgePrice - pkg.priceNGN : 0;
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  const isDining = pkg?.categoryGroup === "dining-nightlife" || pkg?.category === "Dining & Nightlife";
  const isTrade = pkg?.categoryGroup === "trade-expo" || pkg?.category === "Trade & Expo Hub";
  const isDiningOrTrade = isDining || isTrade;
  const isDestination = pkg?.categoryGroup === "eco-sites" || pkg?.category === "Eco-Sites & Heritage" || pkg?.categoryGroup === "carnival-culture" || pkg?.category === "Carnival & Culture";
  const hasRideOption = isDining || isDestination;

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
      glareOpacity: 0.25,
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

  return (
    <div className="perspective-1000 w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
        className="glass-panel rounded-3xl overflow-hidden flex flex-col border-slate-800 hover:border-amber-500/40 relative group cursor-pointer shadow-xl hover:shadow-gold-glow"
      >
        {/* Dynamic 3D Glare / Specular Shine Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
          style={{
            opacity: tilt.glareOpacity,
            background: `radial-gradient(circle 380px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(245, 158, 11, 0.12) 30%, transparent 70%)`
          }}
        />

        {/* 1. Header Area: For Dining & Trade Expo -> Text-Only Venue Header (Zero Image Rendering) */}
        {isDiningOrTrade ? (
          <div
            className={`relative p-6 border-b border-slate-800/80 preserve-3d flex flex-col justify-between min-h-[11.5rem] ${
              isDining
                ? "bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950 border-amber-500/20"
                : "bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 border-cyan-500/20"
            }`}
            style={{ transform: "translateZ(18px)" }}
          >
            {/* Top Badge Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-md ${
                  isDining
                    ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                    : "bg-cyan-950/80 text-cyan-300 border-cyan-500/40"
                }`}
              >
                {isDining ? <Utensils className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                <span>{pkg.subCategory || pkg.category}</span>
              </span>

              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{pkg.badge || pkg.escrowBadge || "Verified Venue"}</span>
              </span>
            </div>

            {/* Business/Venue Name in Bold Text + Physical Location */}
            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight group-hover:text-amber-400 transition-colors">
                {pkg.name || pkg.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-amber-400 font-semibold tracking-tight">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-slate-200">{pkg.location || pkg.corridor || "Calabar, Cross River State"}</span>
              </div>
            </div>

            {/* Verification Guarantee Tag */}
            <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{pkg.capacityLabel || "Open Daily • 365-Day Escrow Check-In"}</span>
              </div>
              <span className="text-slate-500 text-[10px] font-mono uppercase tracking-wider">
                {isDining ? "Culinary Guide" : "Commercial Hub"}
              </span>
            </div>
          </div>
        ) : (
          /* 2. For Accommodations, Eco-Sites, Carnival: VerifiedImage container with 3D Depth */
          <div
            className="relative h-56 w-full overflow-hidden bg-slate-950 preserve-3d"
            style={{ transform: "translateZ(15px)" }}
          >
            <VerifiedImage
              item={pkg}
              src={pkg.imageUrl || pkg.image}
              alt={pkg.name || pkg.title}
              aspectRatio="h-56"
              rounded="rounded-none"
              showBadge={true}
              badgePosition="bottom-left"
              showAttribution={true}
              allowGallery={false}
            />

            {/* Category & Season Badges with High 3D Depth */}
            <div
              className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10 preserve-3d"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md text-amber-400 border border-amber-500/30 shadow-md">
                {pkg.category}
              </span>
              {pkg.season && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md border shadow-md ${
                    pkg.tourType === "carnival"
                      ? "bg-amber-950/90 text-amber-300 border-amber-500/40"
                      : "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
                  }`}
                >
                  {pkg.tourType === "carnival" ? "🎉 " : "🌿 "}
                  {pkg.season}
                </span>
              )}
            </div>

            {/* Escrow Endorsement Badge with 3D Pop */}
            <div
              className="absolute top-4 right-4 z-10 preserve-3d"
              style={{ transform: "translateZ(30px)" }}
            >
              <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border shadow-md ${
                  pkg.badge === "Executive Verified" || pkg.escrowBadge === "Executive Verified"
                    ? "bg-amber-950/90 text-amber-300 border-amber-500/60 shadow-gold-glow"
                    : "bg-emerald-950/85 text-emerald-300 border-emerald-500/40"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{pkg.badge || pkg.escrowBadge || "Escrow Protected"}</span>
              </span>
            </div>

            {/* 365-Day Unlimited Booking Guarantee Badge */}
            <div
              className="absolute bottom-3 right-4 text-xs font-semibold px-3 py-1 rounded-lg bg-black/85 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm z-10 preserve-3d flex items-center gap-1.5 shadow-md"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{pkg.capacityLabel || "Open Daily • 365-Day Booking"}</span>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col preserve-3d">
          {/* Metadata for non-dining/trade cards (already in header for dining/trade) */}
          {!isDiningOrTrade && (
            <div style={{ transform: "translateZ(25px)" }} className="preserve-3d">
              <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors mb-2">
                {pkg.name || pkg.title}
              </h3>

              {/* Location & Vendor */}
              <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{pkg.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-slate-500">Vendor:</span>
                  <span className="font-semibold text-emerald-400 truncate">
                    {pkg.vendor || pkg.vendorName}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div style={{ transform: "translateZ(20px)" }} className="preserve-3d mb-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              {pkg.details || pkg.description}
            </p>
            {pkg.specialty && (
              <p className="text-xs text-amber-300/90 mt-2 font-medium">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">House Specialty:</span>
                {pkg.specialty}
              </p>
            )}
          </div>

          {/* Included Perks with 3D Depth */}
          {pkg.perks && pkg.perks.length > 0 && (
            <div
              className="mb-5 space-y-2 preserve-3d"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Included In Pass:
              </div>
              <div className="space-y-1.5">
                {pkg.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scam Warning & Surge Alert */}
          {pkg.scamRisk && (
            <div
              className="mt-auto mb-5 p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2 preserve-3d"
              style={{ transform: "translateZ(18px)" }}
            >
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-200">Anti-Scam Alert: </span>
                <span>{pkg.scamRisk}</span>
              </div>
            </div>
          )}

          {/* Price & Action Row with Prominent 3D Elevation */}
          <div
            className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4 preserve-3d"
            style={{ transform: "translateZ(35px)" }}
          >
            <div>
              <div className="text-xs text-slate-400 mb-0.5 tracking-tight">Verified Fair Price</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight font-heading text-white">
                  ₦{pkg.priceNGN.toLocaleString()}
                </span>
              </div>
              {savings > 0 && (
                <div className="text-[11px] text-emerald-400 font-medium tracking-tight">
                  Save ₦{savings.toLocaleString()} vs surge (₦
                  {pkg.streetSurgePrice.toLocaleString()})
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-end">
              {/* Map Navigation Link for Dining & Destination cards */}
              {hasRideOption && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pkg.name || pkg.title} ${pkg.location || "Calabar"}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-stateCyan hover:text-white text-xs font-semibold tracking-tight border border-stateCyan/30 transition-all cursor-pointer"
                  title="View on Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Map</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}

              {/* Order Ride via Bolt Button */}
              {hasRideOption && (
                <a
                  href="https://bolt.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#34D186] hover:bg-[#2EB875] text-slate-950 text-xs font-bold tracking-tight shadow-md shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
                className="flex items-center gap-2 rounded-xl bg-stateCyan hover:bg-sky-500 px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight text-white shadow-lg shadow-stateCyan/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>View Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
