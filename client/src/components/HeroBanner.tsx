import React, { useState } from "react";
import {
  Compass,
  MapPin,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Mountain,
  Waves,
  Building2,
  Flame,
  ChevronRight,
  ChevronDown
} from "lucide-react";

export interface HeroBannerProps {
  setActiveTab?: (tab: string) => void;
  onSelectCategory?: (category: string, query?: string) => void;
  escrowStats?: {
    totalLockedNGN?: number;
    totalDisbursedNGN?: number;
  } | null;
}

const HIGHLIGHT_DESTINATIONS = [
  {
    id: "dest-obudu",
    title: "Obudu Mountain Plateau",
    category: "Highland Sanctuary",
    categoryGroup: "eco-sites",
    image: "/assets/obudu_mountain.jpg",
    elevation: "1,576m Altitude",
    tagline: "Above the Clouds"
  },
  {
    id: "dest-agbokim",
    title: "Agbokim Waterfalls",
    category: "Rainforest Wonder",
    categoryGroup: "eco-sites",
    image: "/assets/agbokim_waterfalls.jpg",
    elevation: "7 Terraced Cascades",
    tagline: "Iridescent Mist"
  },
  {
    id: "dest-marina",
    title: "Marina Waterfront Pier",
    category: "Heritage & Waterway",
    categoryGroup: "dining-nightlife",
    image: "/assets/marina_resort.jpg",
    elevation: "Calabar Riverfront",
    tagline: "Sunset Catamaran"
  },
  {
    id: "dest-carnival",
    title: "Carnival Calabar",
    category: "Africa's Biggest Street Party",
    categoryGroup: "carnival-culture",
    image: "/assets/seagull_band.jpg",
    elevation: "12km Route",
    tagline: "December Festival"
  }
];

export default function HeroBanner({
  setActiveTab,
  onSelectCategory,
  escrowStats
}: HeroBannerProps) {
  const [activeHighlightIdx, setActiveHighlightIdx] = useState<number>(0);
  const [selectedCorridor, setSelectedCorridor] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const currentHighlight = HIGHLIGHT_DESTINATIONS[activeHighlightIdx];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(selectedCategory);
    } else {
      setActiveTab?.("packages");
    }

    setTimeout(() => {
      const target = document.getElementById("package-listing-section") || document.getElementById("packages-grid");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const handleExploreClick = () => {
    if (onSelectCategory) {
      onSelectCategory("all");
    } else {
      setActiveTab?.("packages");
    }
    setTimeout(() => {
      const target = document.getElementById("verified-cross-river") || document.getElementById("package-listing-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white select-none">
      {/* 1. Cinematic Background Photography (Obudu Mountain Plateau) */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentHighlight.image}
          alt={currentHighlight.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 ease-out transform scale-100"
          style={{
            animation: "subtleHeroZoom 20s infinite alternate ease-in-out"
          }}
        />

        {/* Carefully controlled multi-layer gradient scrim for maximum editorial legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/20 to-slate-950/80" />
      </div>

      {/* 2. Main Editorial Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-between min-h-[90vh]">
        {/* Top Tag & Trust Indicator */}
        <div className="pt-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] text-xs font-semibold tracking-tight shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
              Cross River State
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-200">The People's Paradise</span>
          </div>
        </div>

        {/* Monumental Editorial Headline & Supporting Copy */}
        <div className="max-w-3xl space-y-6 my-auto pt-6 pb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="editorial-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Discover Cross River.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
              Experience Extraordinary.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 font-light leading-relaxed max-w-2xl drop-shadow-md">
            Explore the breathtaking highlands, vibrant culture, remarkable destinations, and unforgettable experiences of Cross River State.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleExploreClick}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-tight transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[0_12px_28px_-6px_rgba(16,185,129,0.5)]"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (onSelectCategory) onSelectCategory("carnival-culture");
                setTimeout(() => {
                  const target = document.getElementById("package-listing-section");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }, 60);
              }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border border-white/[0.15] text-white font-bold text-sm tracking-tight transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-md"
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Carnival Calabar 2026</span>
            </button>
          </div>
        </div>

        {/* 3. Floating Luxury Concierge Search Bar */}
        <div className="w-full max-w-4xl mx-auto mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <form
            onSubmit={handleSearchSubmit}
            className="p-3 sm:p-4 rounded-3xl sm:rounded-full bg-slate-950/80 backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col sm:flex-row items-center gap-3"
          >
            {/* Search Field 1: Corridor / Destination */}
            <div className="flex-1 w-full px-4 py-2 sm:py-1 sm:border-r border-white/[0.08]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mb-0.5">
                Destination Corridor
              </span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedCorridor}
                  onChange={(e) => setSelectedCorridor(e.target.value)}
                  className="w-full bg-transparent text-white font-semibold text-xs sm:text-sm outline-none cursor-pointer appearance-none"
                >
                  <option value="all" className="bg-slate-900 text-white">All Cross River (Statewide)</option>
                  <option value="obudu" className="bg-slate-900 text-white">Obudu Mountain Sanctuary & Highlands</option>
                  <option value="calabar" className="bg-slate-900 text-white">Calabar City, Marina & Stadium Route</option>
                  <option value="waterfalls" className="bg-slate-900 text-white">Agbokim Waterfalls & Ikom Eco-Corridor</option>
                  <option value="boki" className="bg-slate-900 text-white">Afi Rainforest & Drill Monkey Sanctuary</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Field 2: Experience Category */}
            <div className="flex-1 w-full px-4 py-2 sm:py-1 sm:border-r border-white/[0.08]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mb-0.5">
                Experience Category
              </span>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-white font-semibold text-xs sm:text-sm outline-none cursor-pointer appearance-none"
                >
                  <option value="all" className="bg-slate-900 text-white">All Categories</option>
                  <option value="accommodations" className="bg-slate-900 text-white">Where to Stay (Verified Hotels)</option>
                  <option value="eco-sites" className="bg-slate-900 text-white">Eco-Tourism & Mountain Trails</option>
                  <option value="dining-nightlife" className="bg-slate-900 text-white">Efik Culinary & River Cruises</option>
                  <option value="carnival-culture" className="bg-slate-900 text-white">Carnival Calabar Official Passes</option>
                  <option value="trade-expo" className="bg-slate-900 text-white">Trade, CICC & Expo Delegations</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-tight transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search Curated Passes</span>
            </button>
          </form>
        </div>

        {/* 4. Real Destination Switcher Pills (Visit Dubai Destination Tabs) */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hidden md:inline">
              Featured:
            </span>
            {HIGHLIGHT_DESTINATIONS.map((dest, idx) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => setActiveHighlightIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                  activeHighlightIdx === idx
                    ? "bg-white/[0.12] text-white border border-emerald-400/40 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span>{dest.title}</span>
                <span className="text-[10px] text-emerald-400/80 ml-1.5 font-normal">
                  ({dest.elevation})
                </span>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Designed to support trusted tourism experiences across Cross River State</span>
          </div>
        </div>
      </div>
    </section>
  );
}
