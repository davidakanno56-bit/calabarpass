import React from "react";
import { Sparkles, Flame, ShieldCheck, Film } from "lucide-react";

export default function CarnivalVideoShowcase() {
  return (
    <section id="carnival-video-showcase" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* 16:9 Dark Glassmorphism Container with Zero Watermarks */}
      <div className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-8 border border-slate-800/90 bg-gradient-to-b from-[#0B1528]/95 via-slate-950 to-[#070b11] shadow-2xl shadow-black/80 relative overflow-hidden">
        {/* Ambient atmospheric red & gold glow highlights */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold tracking-tight shadow-md">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Official Carnival Calabar Showcase</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium tracking-tight">
                <Film className="w-3 h-3 text-stateCyan" />
                <span>Official Short Video • 4K HD</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight">
              Experience Carnival Calabar: <span className="text-rose-400">Africa's Biggest Street Party</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed tracking-tight">
              Immerse yourself in the thunderous drums, flamboyant feather masquerades, and 12-kilometer non-stop parade along Calabar's historic cultural corridors.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 self-start md:self-auto bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cross River State Carnival Commission Verified</span>
          </div>
        </div>

        {/* 16:9 Responsive Video Player Container with No Watermarks */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-black">
          <iframe
            src="https://www.youtube.com/embed/3qLUo2K8ksw?modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3&playsinline=1"
            title="Official Carnival Calabar Showcase Short Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0 absolute inset-0"
          />

          {/* Clean Glassmorphic Header Indicator */}
          <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none flex items-center gap-2">
            <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CARNIVAL CALABAR OFFICIAL</span>
            </div>
          </div>
        </div>

        {/* Clean Meta Details Underneath */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p className="font-medium text-slate-300 tracking-tight">
            Official Media Showcase • Filmed across Marian Road, Mary Slessor Avenue, and U.J. Esuene Stadium Route.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>365-Day Escrow Passes Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
