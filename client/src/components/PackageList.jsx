import React, { useState } from "react";
import PackageCard from "./PackageCard.jsx";
import { PackageGridSkeleton } from "./SkeletonLoader.jsx";
import { ShieldCheck, Sparkles, Calendar, Compass, Sun, Flame } from "lucide-react";

export default function PackageList({ packages = [], onSelectPackage, onOpenConcierge, isLoading = false }) {
  const [seasonFilter, setSeasonFilter] = useState("all"); // 'all' | 'carnival' | 'year_round'
  const [subCategory, setSubCategory] = useState("All");

  const seasonTabs = [
    {
      id: "all",
      label: "All Verified Experiences",
      icon: Compass,
      count: packages.length
    },
    {
      id: "carnival",
      label: "🎉 Carnival Specials (December Surge)",
      icon: Flame,
      count: packages.filter(p => p.tourType === "carnival").length
    },
    {
      id: "year_round",
      label: "🌿 365-Day Eco-Tourism & Heritage",
      icon: Sun,
      count: packages.filter(p => p.tourType === "year_round").length
    }
  ];

  // Primary filter by season/tourism type
  const seasonFiltered = packages.filter(pkg => {
    if (seasonFilter === "all") return true;
    if (seasonFilter === "carnival") return pkg.tourType === "carnival";
    if (seasonFilter === "year_round") return pkg.tourType === "year_round";
    return true;
  });

  // Secondary sub-category filter
  const availableSubCategories = ["All", ...new Set(seasonFiltered.map(p => p.category))];

  const displayedPackages = subCategory === "All"
    ? seasonFiltered
    : seasonFiltered.filter(p => p.category === subCategory);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>State-Verified Tourism Clearinghouse</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Cross River Tourism & Escrow Directory
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Operating 365 days a year across Cross River State. From Africa's biggest street party in December to year-round rainforest waterfalls, mountain plateaus, and ancient heritage festivals.
          </p>
        </div>
      </div>

      {/* Main Filter Pill Buttons (Primary Tabs) */}
      <div className="mb-6 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {seasonTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = seasonFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSeasonFilter(tab.id);
                  setSubCategory("All");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-gold-glow scale-[1.02]"
                    : "bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                  isActive ? "bg-black/20 text-black" : "bg-slate-800 text-slate-400"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Category Pills */}
        {availableSubCategories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] uppercase font-bold text-slate-500 hidden sm:inline mr-1">
              Category:
            </span>
            {availableSubCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSubCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  subCategory === cat
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Year-Round Tourism Informative Banner */}
      {seasonFilter === "year_round" && (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl shrink-0">
              🌿
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-emerald-300 font-bold">365-Day Cross River Eco-Tourism: </strong>
              CalabarPass protects bookings throughout the entire year — including Obudu Mountain Resort expeditions, Agbokim Waterfalls canopy tours, Leboku Festival in Ugep, and Calabar River heritage cruises.
            </div>
          </div>
          <span className="hidden md:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 whitespace-nowrap">
            100% Escrow Protected Year-Round
          </span>
        </div>
      )}

      {seasonFilter === "carnival" && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl shrink-0">
              🎉
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-amber-300 font-bold">December Carnival Calabar Official Passes: </strong>
              Guaranteed fair baseline pricing with verified band secretariats and stadium box access to shield tourists from black-market ticket scalpers.
            </div>
          </div>
          <span className="hidden md:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 whitespace-nowrap">
            Zero Counterfeits Guarantee
          </span>
        </div>
      )}

      {/* Package Grid */}
      {isLoading ? (
        <PackageGridSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {displayedPackages.map(pkg => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onSelectPackage={onSelectPackage}
            />
          ))}
        </div>
      )}

      {/* Escrow Mechanism Callout Banner */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Cross River Tourism Escrow Protocol</span>
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              Not sure which Carnival band or year-round itinerary fits your schedule?
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
              Our AI Concierge can calculate your 3-day budget, check peak December surge rates, or plan a 365-day ecotourism getaway to Agbokim Waterfalls and Obudu Mountain Resort.
            </p>
          </div>

          <button
            onClick={onOpenConcierge}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI Concierge</span>
          </button>
        </div>
      </div>
    </section>
  );
}
