import React from "react";
import { ShieldCheck, MapPin, Check, AlertTriangle, ArrowRight, ShieldAlert } from "lucide-react";

export default function PackageCard({ pkg, onSelectPackage }) {
  const savings = pkg.streetSurgePrice ? pkg.streetSurgePrice - pkg.priceNGN : 0;

  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow group">
      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-950">
        <img
          src={pkg.image}
          alt={pkg.name || pkg.title}
          onError={(e) => {
            if (pkg.imageUrl && e.target.src !== pkg.imageUrl) {
              e.target.src = pkg.imageUrl;
            }
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-black/40" />

        {/* Category & Season Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
            {pkg.category}
          </span>
          {pkg.season && (
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md border ${
              pkg.tourType === "carnival" 
                ? "bg-amber-950/90 text-amber-300 border-amber-500/40" 
                : "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
            }`}>
              {pkg.tourType === "carnival" ? "🎉 " : "🌿 "}{pkg.season}
            </span>
          )}
        </div>

        {/* Escrow Endorsement Badge */}
        <div className="absolute top-4 right-4">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
            pkg.badge === "Executive Verified" || pkg.escrowBadge === "Executive Verified"
              ? "bg-amber-950/90 text-amber-300 border-amber-500/60 shadow-gold-glow"
              : "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{pkg.badge || pkg.escrowBadge || "Escrow Protected"}</span>
          </span>
        </div>

        {/* Available slots counter */}
        {pkg.availableSlots && (
          <div className="absolute bottom-3 right-4 text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/60 text-slate-300 backdrop-blur-sm">
            🔥 {pkg.availableSlots} slots remaining
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors mb-2">
          {pkg.name}
        </h3>

        {/* Location & Vendor */}
        <div className="space-y-1.5 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{pkg.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Vendor:</span>
            <span className="font-semibold text-emerald-400 truncate">{pkg.vendor}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          {pkg.details}
        </p>

        {/* Included Perks */}
        {pkg.perks && pkg.perks.length > 0 && (
          <div className="mb-5 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Included In Pass:</div>
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
          <div className="mt-auto mb-5 p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-200">Anti-Scam Alert: </span>
              <span>{pkg.scamRisk}</span>
            </div>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-slate-800/80 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Verified Fair Price</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                ₦{pkg.priceNGN.toLocaleString()}
              </span>
            </div>
            {savings > 0 && (
              <div className="text-[11px] text-emerald-400 font-semibold">
                Save ₦{savings.toLocaleString()} vs surge (₦{pkg.streetSurgePrice.toLocaleString()})
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
  );
}
