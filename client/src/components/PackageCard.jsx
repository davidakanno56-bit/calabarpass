import React, { useState, useRef } from "react";
import { ShieldCheck, MapPin, Check, ArrowRight, ShieldAlert, Trees, Leaf, Sparkles } from "lucide-react";

export default function PackageCard({ pkg, onSelectPackage }) {
  const savings = pkg.streetSurgePrice ? pkg.streetSurgePrice - pkg.priceNGN : 0;
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);

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

        {/* Image container with 3D Depth */}
        <div
          className="relative h-56 w-full overflow-hidden bg-slate-950 preserve-3d"
          style={{ transform: "translateZ(15px)" }}
        >
          {imgError ? (
            <div
              className={`w-full h-full flex flex-col items-center justify-center p-6 text-center border-b ${
                pkg.tourType === "carnival" || pkg.category === "Carnival"
                  ? "bg-gradient-to-br from-amber-950/90 via-slate-900 to-rose-950/70 border-amber-500/20"
                  : "bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950/70 border-emerald-500/20"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-2 ${
                  pkg.tourType === "carnival" || pkg.category === "Carnival"
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-gold-glow"
                    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-emerald-glow"
                }`}
              >
                {pkg.tourType === "carnival" || pkg.category === "Carnival" ? (
                  <Sparkles className="w-7 h-7" />
                ) : (
                  <Trees className="w-7 h-7" />
                )}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  pkg.tourType === "carnival" || pkg.category === "Carnival"
                    ? "text-amber-300"
                    : "text-emerald-300"
                }`}
              >
                {pkg.tourType === "carnival" || pkg.category === "Carnival"
                  ? "Carnival Calabar Experience"
                  : "Cross River Eco-Tourism & Heritage"}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 max-w-xs truncate">
                {pkg.name || pkg.title}
              </span>
            </div>
          ) : (
            <img
              src={pkg.image || pkg.imageUrl}
              alt={pkg.name || pkg.title}
              onError={(e) => {
                if (pkg.imageUrl && e.target.src !== pkg.imageUrl) {
                  e.target.src = pkg.imageUrl;
                } else if (!e.target.src.includes("placeholder.jpg")) {
                  e.target.src = "/assets/placeholder.jpg";
                } else {
                  setImgError(true);
                }
              }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-black/40 pointer-events-none" />

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

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col preserve-3d">
          {/* Title & Metadata with 3D Depth */}
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

            {/* Description */}
            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              {pkg.details || pkg.description}
            </p>
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
            className="pt-4 border-t border-slate-800/80 flex items-end justify-between gap-4 preserve-3d"
            style={{ transform: "translateZ(35px)" }}
          >
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Verified Fair Price</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  ₦{pkg.priceNGN.toLocaleString()}
                </span>
              </div>
              {savings > 0 && (
                <div className="text-[11px] text-emerald-400 font-semibold">
                  Save ₦{savings.toLocaleString()} vs surge (₦
                  {pkg.streetSurgePrice.toLocaleString()})
                </div>
              )}
            </div>

            <button
              onClick={() => onSelectPackage(pkg)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              <span>Book via Escrow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
