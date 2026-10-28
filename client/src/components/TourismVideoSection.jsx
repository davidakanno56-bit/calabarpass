import React, { useState } from "react";
import { 
  Play, 
  MapPin, 
  Compass, 
  BedDouble, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Navigation,
  ArrowRight
} from "lucide-react";

export default function TourismVideoSection({ onSelectCategory }) {
  const [activeTourStop, setActiveTourStop] = useState(0);

  const TOUR_STOPS = [
    {
      id: "marian-corridor",
      label: "Marian Road Corridor",
      desc: "Calabar's primary commercial, dining, and nightlife boulevard",
      category: "dining-nightlife",
      icon: Utensils,
      color: "text-amber-400 border-amber-500/40 bg-amber-950/60"
    },
    {
      id: "mary-slessor",
      label: "Mary Slessor Roundabout",
      desc: "Historic colonial heritage landmark and central transit hub",
      category: "eco-sites",
      icon: Trees,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/60"
    },
    {
      id: "marina-waterfront",
      label: "Marina Resort Waterfront",
      desc: "Calabar River cruises, Slave History Museum, and evening breezes",
      category: "eco-sites",
      icon: Compass,
      color: "text-stateCyan border-stateCyan/40 bg-sky-950/60"
    },
    {
      id: "cicc-summit",
      label: "CICC & Cultural Centre",
      desc: "World-class convention halls and international trade summits",
      category: "trade-expo",
      icon: Briefcase,
      color: "text-purple-400 border-purple-500/40 bg-purple-950/60"
    },
    {
      id: "carnival-route",
      label: "12km Carnival Route",
      desc: "Africa's biggest street pageantry route along Stadium & Marian",
      category: "carnival-culture",
      icon: Flame,
      color: "text-rose-400 border-rose-500/40 bg-rose-950/60"
    }
  ];

  const CATEGORY_SHORTCUTS = [
    { id: "accommodations", label: "Accommodations", count: "6 Stays", icon: BedDouble, color: "hover:border-blue-500/60 hover:text-blue-400" },
    { id: "eco-sites", label: "Eco-Sites & Heritage", count: "6 Sanctuaries", icon: Trees, color: "hover:border-emerald-500/60 hover:text-emerald-400" },
    { id: "dining-nightlife", label: "Dining & Nightlife", count: "6 Spots", icon: Utensils, color: "hover:border-amber-500/60 hover:text-amber-400" },
    { id: "trade-expo", label: "Trade & Expo Hub", count: "4 Commercial", icon: Briefcase, color: "hover:border-cyan-500/60 hover:text-cyan-400" },
    { id: "carnival-culture", label: "Carnival & Culture", count: "5 Passes", icon: Flame, color: "hover:border-rose-500/60 hover:text-rose-400" }
  ];

  return (
    <section id="experience-calabar-tour" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stateCyan/10 border border-stateCyan/30 text-stateCyan text-xs font-bold uppercase tracking-wider shadow-sm">
          <Play className="w-3.5 h-3.5 fill-stateCyan" />
          <span>Official Cross River Tourism Showcase • 4K Experience</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
          Experience Calabar: <span className="gold-gradient-text font-bold">City Drive & Tourism Tour</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal tracking-tight max-w-2xl mx-auto">
          Take an immersive visual drive through Nigeria's cleanest, greenest capital. Discover iconic palm-lined boulevards, historic roundabouts, vibrant commercial corridors, and waterfront heritage before browsing our verified clearinghouse categories.
        </p>
      </div>

      {/* Main Glassmorphic Video Showcase Card */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-slate-800/90 bg-white/80 dark:bg-gradient-to-b dark:from-slate-900/90 dark:via-slate-950 dark:to-[#070b11] shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/70 relative overflow-hidden">
        {/* Subtle decorative glow accents */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-stateCyan/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Video Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center font-bold">
              <Play className="w-4 h-4 fill-red-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Official Calabar City & Tourism Drive</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Cross River State Capital • Marian Road • Mary Slessor • Calabar River
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Tourism Bureau Footage</span>
            </span>
          </div>
        </div>

        {/* 16:9 Responsive Video Player Container with clean masking and watermark suppression */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700/70 shadow-2xl bg-black">
          <iframe
            src="https://www.youtube.com/embed/xMRcchK2tv8?modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3&playsinline=1"
            title="Experience Calabar: City Drive & Tourism Tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0 absolute inset-0"
          />
        </div>

        {/* Interactive Tour Highlights Strip */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Tour Waypoints & Key Corridors Featured in Video:</span>
            </h3>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Click a corridor to explore its directory category
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TOUR_STOPS.map((stop, idx) => {
              const Icon = stop.icon;
              return (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => {
                    setActiveTourStop(idx);
                    if (onSelectCategory) {
                      onSelectCategory(stop.category);
                    }
                  }}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    activeTourStop === idx
                      ? `${stop.color} shadow-md scale-[1.02]`
                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs font-bold truncate">{stop.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {stop.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explore Categories Banner */}
      <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm shadow-lg dark:shadow-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-stateCyan mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore CalabarPass Clearinghouse</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Browse Curated Listings by Category
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Specific verified hotel bookings, eco-sanctuary passes, dining menus, and trade booths are organized into dedicated category views with escrow fraud protection.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            365-Day Escrow Guarantee
          </span>
        </div>

        {/* Category Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORY_SHORTCUTS.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`flex flex-col items-center justify-center text-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 transition-all hover:bg-white dark:hover:bg-slate-900 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group shadow-sm ${cat.color}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-2.5 group-hover:border-amber-500/40 transition-colors">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {cat.label}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  {cat.count}
                </span>
                <span className="mt-2 text-[10px] text-stateCyan flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
