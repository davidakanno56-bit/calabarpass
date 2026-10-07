import React from "react";
import { ArrowRight, ShieldCheck, Compass, Sparkles } from "lucide-react";

export default function FinalCTA({ onExploreClick }) {
  const handleClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const elem = document.getElementById("verified-cross-river");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 500, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-amber-500/40 p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Smart Tourism Clearinghouse</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Travel Cross River With <span className="gold-gradient-text">Confidence.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            One platform for verified places, fair prices, trusted vendors, and secure booking verification.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleClick}
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-base shadow-gold-glow hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Compass className="w-5 h-5 text-black" />
              <span>Explore Cross River</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
