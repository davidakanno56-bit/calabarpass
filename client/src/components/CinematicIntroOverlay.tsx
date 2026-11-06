import React, { useState, useEffect } from "react";
import { Compass, ArrowRight, Building2, Lock, ShieldCheck, X } from "lucide-react";

interface CinematicIntroOverlayProps {
  onExplore: () => void;
  onWhereToStay: () => void;
}

export default function CinematicIntroOverlay({
  onExplore,
  onWhereToStay
}: CinematicIntroOverlayProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already dismissed intro in this browser session
    const hasSeen = sessionStorage.getItem("calabarpass_intro_dismissed");
    if (!hasSeen) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (callback?: () => void) => {
    setIsExiting(true);
    sessionStorage.setItem("calabarpass_intro_dismissed", "true");
    setTimeout(() => {
      setIsVisible(false);
      if (callback) {
        callback();
      }
    }, 850);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Cross River State"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950 transition-all duration-1000 ease-out ${
        isExiting
          ? "opacity-0 scale-105 blur-md pointer-events-none"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      {/* 1. Cinematic Ambient Background (Obudu Mountain Highlands Scrim) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/obudu_mountain.jpg"
          alt="Obudu Mountain Plateau Cross River State"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[20000ms] ease-out animate-pulse-slow"
        />
        {/* Deep Multi-Layer Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stateCyan/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Top-Right Quick Skip Action */}
      <button
        type="button"
        onClick={() => handleDismiss(onExplore)}
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-slate-300 hover:text-white text-xs font-semibold tracking-wide border border-white/15 transition-all cursor-pointer shadow-lg active:scale-95"
        title="Enter site directly"
      >
        <span>Skip to Site</span>
        <X className="w-3.5 h-3.5 ml-0.5" />
      </button>

      {/* 2. Glassmorphic Luxury Welcome Card (Image 4 Design) */}
      <div className="relative z-10 w-full max-w-4xl mx-4 sm:mx-6 lg:mx-8 animate-in fade-in zoom-in-95 duration-700">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950/95 via-[#071328]/95 to-slate-900/90 border border-stateCyan/30 p-7 sm:p-12 lg:p-16 text-center space-y-7 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(2,132,199,0.15)] backdrop-blur-2xl">
          
          {/* Ambient Corner Glows (State Cyan + Subtle Deep Trust Blue) */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-stateCyan/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            {/* Top State Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stateCyan/15 backdrop-blur-md text-stateCyan text-xs font-bold uppercase tracking-wider border border-stateCyan/30 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-stateCyan" />
              <span>Cross River Tourism Clearinghouse • 365-Day Escrow</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1] drop-shadow-md">
              Begin Your Extraordinary <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-200 to-stateCyan-light">
                Cross River Journey.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed font-light drop-shadow-sm">
              Misty mountain plateaus, seven-terraced waterfalls, royal culinary traditions, and vibrant cultural hospitality—all curated with verified partner tariffs and guaranteed escrow protection.
            </p>

            {/* Main Interactive Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleDismiss(onExplore)}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-stateCyan hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-stateCyan/30 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Compass className="w-5 h-5 text-white" />
                <span>Explore Verified Destinations</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleDismiss(onWhereToStay)}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-sm tracking-tight border border-white/20 transition-all cursor-pointer hover:border-stateCyan/40 active:scale-[0.98]"
              >
                <Building2 className="w-4 h-4 text-stateCyan" />
                <span>Where to Stay</span>
              </button>
            </div>

            {/* Institutional Trust Disclaimer Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-light">
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
      </div>
    </div>
  );
}

