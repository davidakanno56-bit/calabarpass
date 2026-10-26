import React from "react";
import { 
  Radio, 
  Tv, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";

export default function LiveCRBCBroadcast({ onSelectCategory }) {
  return (
    <section id="live-news-broadcast" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* Sleek, High-End Official News Portal Banner with Premium Dark Glassmorphism */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/90 bg-gradient-to-r from-[#071328]/95 via-slate-950 to-[#070b11] shadow-2xl shadow-black/80 relative overflow-hidden">
        {/* Ambient atmospheric deep blue & stateCyan glow highlights */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/10 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-stateCyan/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Content Area */}
          <div className="space-y-3 max-w-3xl">
            {/* Badges Row with Pulsing Live Indicator */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/50 text-blue-300 text-xs font-semibold tracking-tight shadow-md shadow-blue-950/50">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span>🔴 LIVE / Official News Broadcast Feed</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-[11px] font-medium tracking-tight">
                <Tv className="w-3 h-3 text-stateCyan" />
                <span>NTA Calabar & Channels TV Live Transmission</span>
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium tracking-tight">
                <Radio className="w-3 h-3 text-cyan-400" />
                <span>24/7 Satellite News Relay</span>
              </span>
            </div>

            {/* Banner Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
              National & State News Network: <span className="text-stateCyan">NTA / Channels TV Live Portal</span>
            </h2>

            {/* Official Metadata */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-semibold text-slate-200 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Official Broadcast Partners: Real-Time Cross River State News, Carnival Calabar Parades, Governance & Cultural Documentaries.
                </span>
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 font-normal leading-relaxed tracking-tight">
                Access uninterrupted live television streaming, breaking regional news, cultural pageantry coverage, and official documentaries directly from accredited national broadcast partners.
              </p>
            </div>
          </div>

          {/* Right Action: Clean CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="https://www.channelstv.com/live"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-tight shadow-xl shadow-cyan-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Tune in to official NTA / Channels TV Live Broadcast"
            >
              <Tv className="w-4 h-4 text-white shrink-0" />
              <span>Tune in to NTA / Channels TV Live Broadcast</span>
              <ExternalLink className="w-4 h-4 text-white shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
