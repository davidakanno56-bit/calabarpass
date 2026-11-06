import React from "react";
import { ArrowRight, ShieldCheck, Compass, Building2, Lock } from "lucide-react";

interface FinalCTAProps {
  onExploreClick?: () => void;
  onAccommodationsClick?: () => void;
}

export default function FinalCTA({ onExploreClick, onAccommodationsClick }: FinalCTAProps) {
  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const elem = document.getElementById("verified-cross-river");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 600, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-[#071328] to-slate-900 border border-stateCyan/30 p-8 sm:p-14 lg:p-20 text-center space-y-8 shadow-2xl">
        {/* Ambient Atmospheric Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-stateCyan/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stateCyan/15 backdrop-blur-md text-stateCyan text-xs font-bold uppercase tracking-wider border border-stateCyan/30 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-stateCyan" />
            <span>Cross River Tourism Clearinghouse • 365-Day Escrow</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1]">
            Begin Your Extraordinary <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-200 to-stateCyan-light">
              Cross River Journey.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
            Misty mountain plateaus, seven-terraced waterfalls, royal culinary traditions, and vibrant cultural hospitality—all curated with verified partner tariffs and guaranteed escrow protection.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleExplore}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-stateCyan hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-stateCyan/30 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Compass className="w-5 h-5 text-white" />
              <span>Explore Verified Destinations</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {onAccommodationsClick && (
              <button
                type="button"
                onClick={onAccommodationsClick}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-sm tracking-tight border border-white/20 transition-all cursor-pointer hover:border-stateCyan/40"
              >
                <Building2 className="w-4 h-4 text-stateCyan" />
                <span>Where to Stay</span>
              </button>
            )}
          </div>

          {/* Institutional Trust Disclaimer */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-light">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-stateCyan" />
              <span>Zero-Counterfeit Escrow PIN System</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div>Designed to support trusted tourism across Cross River State</div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div>Paystack Certified Direct Processing</div>
          </div>
        </div>
      </div>
    </section>
  );
}
