import React from "react";
import { 
  Radio, 
  Tv, 
  ShieldCheck, 
  ExternalLink,
  Users
} from "lucide-react";

export default function LiveCRBCBroadcast({ onSelectCategory }) {
  return (
    <section id="live-crbc-broadcast" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* High-End Clean CTA Banner with Premium Dark Glassmorphism */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/90 bg-gradient-to-r from-[#0B1528]/95 via-slate-950 to-[#070b11] shadow-2xl shadow-black/80 relative overflow-hidden">
        {/* Ambient atmospheric red & cyan glow highlights */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-600/10 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-stateCyan/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Content Area */}
          <div className="space-y-3 max-w-3xl">
            {/* Badges Row with Pulsing Live Indicator */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold tracking-tight shadow-md shadow-rose-950/50">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span>🔴 LIVE / CRBC Broadcast Feed</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-[11px] font-medium tracking-tight">
                <Tv className="w-3 h-3 text-stateCyan" />
                <span>CRBC Calabar Channel 27 UHF</span>
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium tracking-tight">
                <Radio className="w-3 h-3 text-emerald-400" />
                <span>105.5 FM Radio Relay</span>
              </span>
            </div>

            {/* Banner Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
              Cross River Broadcasting Corporation <span className="text-rose-400">(CRBC Live)</span>
            </h2>

            {/* Official Metadata */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-semibold text-slate-200 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Official Media Partner: Cross River Broadcasting Corporation (CRBC) — Real-Time Carnival Calabar & Cultural Parade Transmission.
                </span>
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 font-normal leading-relaxed tracking-tight">
                Direct live transmission of Carnival Calabar 12km street parades, Bikers Carnival, Band Adjudication, and state cultural coverage from Calabar studios.
              </p>
            </div>
          </div>

          {/* Right Action: Clean CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="https://crbc.gov.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm tracking-tight shadow-xl shadow-rose-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Watch official CRBC Live Channel"
            >
              <Tv className="w-4 h-4 text-white shrink-0" />
              <span>Tune in to CRBC Live Channel</span>
              <ExternalLink className="w-4 h-4 text-white shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
