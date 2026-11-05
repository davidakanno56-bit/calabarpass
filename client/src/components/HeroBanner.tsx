// client/src/components/HeroBanner.jsx
// Official Cross River State Tourism Bureau & Commercial Clearinghouse
// $1.5M Prestige Civic-Fintech & Editorial Luxury Showcase

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Search, 
  Sparkles, 
  Building2, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  KeyRound, 
  Shield, 
  Award, 
  ChevronRight,
  Compass
} from "lucide-react";
import { HOTELS } from "../data/hotels.ts";

const FEATURED_SHOWCASES = [
  {
    id: "obudu",
    title: "Obudu Mountain Resort",
    category: "Eco-Sites & Heritage",
    subtitle: "Highland Plateau & Cable Car Expeditions",
    image: "/assets/obudu_mountain.jpg",
    location: "Obanliku LGA • Sankwala Mountains",
    tag: "Crown Eco Sanctuary",
    stat: "1,576m Altitude"
  },
  {
    id: "marina",
    title: "Marina Resort & Waterfront",
    category: "Dining & Nightlife",
    subtitle: "Calabar River Cruises & Slave History Museum",
    image: "/assets/marina_resort.jpg",
    location: "Marina Road, Calabar Waterfront",
    tag: "Historic Heritage Port",
    stat: "Calabar Riverfront"
  },
  {
    id: "executive",
    title: "AfSNET Executive Hospitality",
    category: "Accommodations",
    subtitle: "5-Star Diplomatic Suites Near CICC",
    image: "/assets/executive_vip.jpg",
    location: "Summit Hills • Marian Road Corridor",
    tag: "Diplomatic Tier",
    stat: "Near CICC"
  },
  {
    id: "carnival",
    title: "Carnival Calabar Cultural Passes",
    category: "Carnival & Culture",
    subtitle: "Africa's Biggest Street Party Official Kits",
    image: "/assets/seagull_band.jpg",
    location: "Mary Slessor • U.J. Esuene Stadium Route",
    tag: "VIP Festival Clearances",
    stat: "365 Festival Vault"
  }
];

export default function HeroBanner({ setActiveTab, onSelectCategory, escrowStats }) {
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const [searchCorridor, setSearchCorridor] = useState("all");
  const [searchCategory, setSearchCategory] = useState("all");

  const activeShowcase = FEATURED_SHOWCASES[activeShowcaseIdx];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(searchCategory);
    } else {
      setActiveTab?.("packages");
    }
    setTimeout(() => {
      const target = document.getElementById("directory-catalog") || document.getElementById("experience-calabar-tour");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const handleCategoryJump = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setActiveTab?.("packages");
    }
    setTimeout(() => {
      const targetId = catId === "all" ? "experience-calabar-tour" : "directory-catalog";
      const el = document.getElementById(targetId) || document.getElementById("directory-catalog");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-800/80 bg-[#070b13]">
      {/* 1. Subtle, Architectural Calabar Aerial Underlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/assets/calabar-cityscape-aerial.jpg" 
          alt="Calabar Cityscape & Waterways Aerial View" 
          className="w-full h-full object-cover object-center opacity-25 filter saturate-[1.05] contrast-[1.2]"
        />
        {/* Deep, refined gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b13]/90 via-[#0a1120]/85 to-[#070b13]" />
        {/* Subtle, understated ambient depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.12),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Editorial Positioning */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Diplomatic State Clearinghouse Seal */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-slate-700/80 text-slate-200 text-xs backdrop-blur-md shadow-sm max-w-full flex-wrap justify-center lg:justify-start">
              <img 
                src="/assets/calabarpass-monogram.svg" 
                alt="Cross River State Seal" 
                className="w-4 h-4 object-contain"
              />
              <span className="font-semibold text-white tracking-tight">Cross River State Government</span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-400 font-medium">Ministry of Tourism & Clearinghouse Bureau</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:inline text-emerald-400 font-semibold">Official 365 Escrow Protocol</span>
            </div>

            {/* Prestige Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold font-heading text-white tracking-tight leading-[1.12]">
              The Official Tourism Clearinghouse for{" "}
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                Cross River State
              </span>
            </h1>

            {/* Editorial Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Curated 365-day executive hospitality, eco-heritage expeditions, and festival clearances — authenticated by state clearinghouse escrow. Zero extortion, guaranteed benchmark rates, and instant 6-digit verification keys.
            </p>

            {/* Interactive Luxury Concierge Search & Filter Bar (Airbnb / Stripe Class) */}
            <div className="pt-2">
              <form 
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/90 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-12 gap-2 text-left"
              >
                {/* Field 1: Corridor / Region */}
                <div className="sm:col-span-4 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-center">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>Corridor / Region</span>
                  </label>
                  <select
                    value={searchCorridor}
                    onChange={(e) => setSearchCorridor(e.target.value)}
                    className="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer mt-0.5"
                  >
                    <option value="all" className="bg-slate-900 text-white">All Cross River Corridors</option>
                    <option value="marian" className="bg-slate-900 text-white">Marian Road / State Housing</option>
                    <option value="waterfront" className="bg-slate-900 text-white">Marina Waterfront & Port</option>
                    <option value="cicc" className="bg-slate-900 text-white">Summit Hills / CICC Corridor</option>
                    <option value="murtala" className="bg-slate-900 text-white">Murtala Mohammed Highway</option>
                    <option value="obudu" className="bg-slate-900 text-white">Obudu Mountain Plateau</option>
                  </select>
                </div>

                {/* Field 2: Experience / Category */}
                <div className="sm:col-span-4 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-center">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-emerald-400" />
                    <span>Experience Category</span>
                  </label>
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer mt-0.5"
                  >
                    <option value="all" className="bg-slate-900 text-white">All 365 Collections</option>
                    <option value="accommodations" className="bg-slate-900 text-white">Accommodations & Suites</option>
                    <option value="eco-sites" className="bg-slate-900 text-white">Eco-Sites & Rainforests</option>
                    <option value="dining-nightlife" className="bg-slate-900 text-white">Dining & Waterfront Lounges</option>
                    <option value="trade-expo" className="bg-slate-900 text-white">Trade & Expo Hub</option>
                    <option value="carnival-culture" className="bg-slate-900 text-white">Carnival & Cultural Passes</option>
                  </select>
                </div>

                {/* Field 3: Explore Button */}
                <div className="sm:col-span-4 flex items-center">
                  <button
                    type="submit"
                    className="w-full h-full min-h-[46px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-xs sm:text-sm tracking-tight shadow-lg shadow-sky-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Verified Passes</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-400">
              <span className="text-[11px] font-medium text-slate-400">Popular Clearances:</span>
              <button
                type="button"
                onClick={() => handleCategoryJump("accommodations")}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              >
                🏨 Executive Hotels ({HOTELS?.length || 8})
              </button>
              <button
                type="button"
                onClick={() => handleCategoryJump("eco-sites")}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              >
                🌲 Obudu &amp; Agbokim Falls
              </button>
              <button
                type="button"
                onClick={() => handleCategoryJump("dining-nightlife")}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              >
                🍽️ Marina Waterfront Dining
              </button>
            </div>

          </div>

          {/* Right Column: Editorial Visual Masterpiece Showcase (Replacing the toy 3D plastic card) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl group">
              
              {/* Featured Visual Image with Smooth Cinematic Ken Burns Hover */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-950">
                <img
                  src={activeShowcase.image}
                  alt={activeShowcase.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

                {/* Top Corner State Verification Seal Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                    State Verified 365 Pass
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/85 border border-slate-700/80 backdrop-blur-md text-[10px] font-mono text-slate-300">
                  {activeShowcase.stat}
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider">
                    {activeShowcase.category}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                    {activeShowcase.title}
                  </h3>
                  
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {activeShowcase.subtitle}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{activeShowcase.location}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCategoryJump(activeShowcase.id === "obudu" ? "eco-sites" : activeShowcase.id === "executive" ? "accommodations" : "all")}
                      className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Showcase Navigation Thumbnails (4-way luxury tab) */}
              <div className="p-3 bg-slate-950/95 border-t border-slate-800 grid grid-cols-4 gap-2">
                {FEATURED_SHOWCASES.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveShowcaseIdx(idx)}
                    className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                      activeShowcaseIdx === idx
                        ? "bg-slate-800/90 border border-sky-500/40 text-white shadow-sm"
                        : "bg-transparent hover:bg-slate-900 border border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider truncate text-sky-400">
                      0{idx + 1}
                    </div>
                    <div className="text-[11px] font-bold truncate mt-0.5">
                      {item.title.split(" ")[0]}
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Institutional Trust Pillars (Replacing the neon gamer boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto pt-10 sm:pt-14">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition shadow-sm text-left">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold font-heading text-white">State Escrow Protection</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Funds remain secured in state escrow until you arrive and verify service on-site.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition shadow-sm text-left">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold font-heading text-white">Cryptographic 6-Digit PIN</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Merchant cannot access funds without your physical check-in key.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition shadow-sm text-left">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold font-heading text-white">Statutory Fair-Rate Cap</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Official price caps protected against black-market and carnival season surge.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition shadow-sm text-left">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold font-heading text-white">Direct Settlement Clearances</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Settlement powered by Paystack and Central Bank licensed banking rails.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
