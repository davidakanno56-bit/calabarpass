import React, { useState } from "react";
import { 
  Radio, 
  Tv, 
  Flame, 
  ShieldCheck, 
  Users, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  Clock
} from "lucide-react";

export default function LiveCRBCBroadcast({ onSelectCategory }) {
  const [activeFeed, setActiveFeed] = useState("main");

  const BROADCAST_FEEDS = [
    {
      id: "main",
      label: "Main Broadcast (Studio 1)",
      corridor: "Full Route & Stadium Feed",
      quality: "1080p 60fps",
      embedUrl: "https://www.youtube.com/embed/xMRcchK2tv8?modestbranding=1&rel=0&showinfo=0&controls=1&playsinline=1"
    },
    {
      id: "marian",
      label: "Cam 2: Marian Road Strip",
      corridor: "Street Masquerade & Floats",
      quality: "1080p 60fps",
      embedUrl: "https://www.youtube.com/embed/xMRcchK2tv8?modestbranding=1&rel=0&showinfo=0&controls=1&playsinline=1&start=120"
    },
    {
      id: "stadium",
      label: "Cam 3: Stadium Grandstand",
      corridor: "Band Adjudication & VIP Area",
      quality: "1080p 60fps",
      embedUrl: "https://www.youtube.com/embed/xMRcchK2tv8?modestbranding=1&rel=0&showinfo=0&controls=1&playsinline=1&start=240"
    }
  ];

  const currentFeed = BROADCAST_FEEDS.find(f => f.id === activeFeed) || BROADCAST_FEEDS[0];

  return (
    <section id="live-crbc-broadcast" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* Container with Premium Dark Glassmorphism */}
      <div className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-9 border border-slate-800/90 bg-gradient-to-b from-[#0B1528]/95 via-slate-950 to-[#070b11] shadow-2xl shadow-black/80 relative overflow-hidden">
        {/* Ambient atmospheric red & cyan glow highlights */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-stateCyan/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Header with Live Indicator Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Pulsing Live Badge */}
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

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight">
              CRBC Live Transmission: <span className="text-rose-400">Carnival Calabar Coverage</span>
            </h2>
          </div>

          {/* Real-time viewer stats */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-900/90 border border-slate-800 p-2 sm:p-2.5 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium tracking-tight">Live Global Audience</div>
              <div className="text-sm sm:text-base font-bold font-mono text-white flex items-center gap-1.5">
                <span>31,840 Watching</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Camera Angles / Feed Selectors */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-slate-400 font-semibold tracking-tight mr-1 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-stateCyan" />
            <span>Select Transmission Cam:</span>
          </span>
          {BROADCAST_FEEDS.map((feed) => (
            <button
              key={feed.id}
              type="button"
              onClick={() => setActiveFeed(feed.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                activeFeed === feed.id
                  ? "bg-rose-950/90 text-rose-300 border border-rose-500/60 shadow-sm shadow-rose-950"
                  : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeFeed === feed.id ? "bg-rose-400 animate-ping" : "bg-slate-500"}`} />
              <span>{feed.label}</span>
            </button>
          ))}
        </div>

        {/* 16:9 Responsive Video Player Container for Live Stream */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-black">
          <iframe
            key={currentFeed.id}
            src={currentFeed.embedUrl}
            title="CRBC Live Broadcast: Carnival Calabar & Cultural Transmission"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0 absolute inset-0"
          />

          {/* On-Screen Watermark-Free Feed Badge */}
          <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>CRBC HD FEED</span>
            </div>
            <div className="px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 hidden sm:block">
              {currentFeed.quality}
            </div>
          </div>
        </div>

        {/* Clean Official Metadata Underneath */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-semibold text-slate-200 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Official Media Partner: Cross River Broadcasting Corporation (CRBC) — Real-Time Carnival Calabar & Cultural Parade Transmission.
              </span>
            </p>
            <p className="text-[11px] text-slate-400 font-normal tracking-tight">
              Broadcasting 365-day state cultural events, annual Carnival Calabar 12km street parades, Bikers Carnival, and Leboku New Yam Festival live from Calabar studios.
            </p>
          </div>

          {/* Action button to explore Carnival passes */}
          <button
            type="button"
            onClick={() => onSelectCategory && onSelectCategory("carnival-culture")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-xs tracking-tight shadow-md shadow-rose-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <Flame className="w-3.5 h-3.5 text-amber-200" />
            <span>Book Carnival Band Passes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
