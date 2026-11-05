import React, { useState, useMemo, useEffect } from "react";
import PackageCard from "./PackageCard.tsx";
import { PackageGridSkeleton } from "./SkeletonLoader.tsx";
import { 
  ShieldCheck, 
  Compass, 
  Search, 
  MapPin, 
  Lock, 
  Filter, 
  Check, 
  ArrowRight, 
  Sparkles,
  BedDouble, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  Building2 
} from "lucide-react";
import { 
  CATEGORIES_CONFIG, 
  ALL_EXPANDED_CARDS, 
  getCategoryCounts 
} from "../data/expandedCategories.ts";

export default function PackageList({ 
  packages = [], 
  dynamicCards = [],
  activeCategory = "all", 
  initialSearchQuery = "",
  onSelectCategory, 
  onSelectPackage, 
  onViewPackage, 
  onOpenShield, 
  isLoading = false 
}) {
  const [currentCategory, setCurrentCategory] = useState(activeCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [subCategory, setSubCategory] = useState("All");

  // Sync with prop if it changes from Navbar
  useEffect(() => {
    if (activeCategory && activeCategory !== currentCategory) {
      setCurrentCategory(activeCategory);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const handleCategoryChange = (catId) => {
    setCurrentCategory(catId);
    setSubCategory("All");
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  // Merge dynamic onboarded cards with baseline directory catalog
  const allCards = useMemo(() => {
    if (!dynamicCards || dynamicCards.length === 0) return ALL_EXPANDED_CARDS;
    const dynamicIds = new Set(dynamicCards.map(c => c.id));
    return [...dynamicCards, ...ALL_EXPANDED_CARDS.filter(c => !dynamicIds.has(c.id))];
  }, [dynamicCards]);

  const categoryCounts = useMemo(() => {
    const counts = {
      all: allCards.length,
      accommodations: 0,
      "eco-sites": 0,
      "dining-nightlife": 0,
      "trade-expo": 0,
      "carnival-culture": 0
    };
    allCards.forEach(c => {
      const g = c.categoryGroup;
      if (counts[g] !== undefined) counts[g]++;
    });
    return counts;
  }, [allCards]);

  // Filter based on selected category, subcategory and text search
  const filteredCards = useMemo(() => {
    return allCards.filter(card => {
      // 1. Primary Category Filter
      if (currentCategory !== "all" && card.categoryGroup !== currentCategory) {
        return false;
      }

      // 2. Subcategory Filter
      if (subCategory !== "All" && card.subCategory !== subCategory && card.category !== subCategory) {
        return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (card.name || card.title || "").toLowerCase().includes(q);
        const matchesLoc = (card.location || card.corridor || "").toLowerCase().includes(q);
        const matchesDesc = (card.description || card.details || "").toLowerCase().includes(q);
        const matchesCategory = (card.category || card.subCategory || "").toLowerCase().includes(q);
        const matchesPerks = (card.perks || []).some(p => p.toLowerCase().includes(q));

        if (!matchesName && !matchesLoc && !matchesDesc && !matchesCategory && !matchesPerks) {
          return false;
        }
      }

      return true;
    });
  }, [allCards, currentCategory, subCategory, searchQuery]);

  const categoryIcons = {
    accommodations: BedDouble,
    "eco-sites": Trees,
    "dining-nightlife": Utensils,
    "trade-expo": Briefcase,
    "carnival-culture": Flame
  };

  return (
    <section id="directory-catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cr-forest dark:text-cr-lagoon text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-cr-forest dark:text-cr-lagoon" />
            <span>Cross River 365-Day Commercial & Tourism Clearinghouse</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Curated Experiences & Verified Passes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed tracking-tight font-light">
            Operating 365 days a year across Cross River State. Explore verified executive accommodations, rainforest eco-sites, authentic culinary dining, trade fair booths, and official Carnival Calabar passes.
          </p>
        </div>

        {/* Total Verified Live Metric */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white dark:bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cr-forest animate-ping"></span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">Active Directory:</span>
          <span className="font-bold text-cr-forest dark:text-cr-lagoon font-mono">
            {allCards.length} Verified Venues & Passes
          </span>
        </div>
      </div>

      {/* Main 5-Category Tabs Bar */}
      <div className="mb-6 p-2.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 w-full xl:w-auto overflow-x-auto scrollbar-none no-scrollbar -mx-1 px-1 touch-pan-x flex-nowrap xl:flex-wrap pb-1 xl:pb-0">
          {/* "All" Tab */}
          <button
            onClick={() => handleCategoryChange("all")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
              currentCategory === "all"
                ? "bg-cr-forest text-white shadow-md shadow-cr-forest/20 scale-[1.02]"
                : "bg-slate-100 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>All Verified (365 Days)</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
              currentCategory === "all" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}>
              {categoryCounts.all}
            </span>
          </button>

          {/* 5 Distinct Categories */}
          {CATEGORIES_CONFIG.map(cat => {
            const Icon = categoryIcons[cat.id] || Compass;
            const isSelected = currentCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-cr-forest text-white shadow-md shadow-cr-forest/20 scale-[1.02]"
                    : "bg-slate-100 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                }`}
                title={cat.subtitle}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-cr-forest dark:text-cr-lagoon"}`} />
                <span>{cat.shortLabel}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full xl:w-72 mt-2 xl:mt-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search passes, hotels, booths..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cr-forest/30 focus:border-cr-forest transition shadow-inner"
          />
        </div>
      </div>

      {/* Explanatory Informative Callout Banners for each Category */}
      {currentCategory === "accommodations" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold shrink-0">
              <BedDouble className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Executive Accommodations &amp; Suites: </strong>
              Verified executive hotels across Highway, State Housing, MCC, and Tinapa corridors. All reservations remain secured in the <span className="text-sky-400 font-semibold">CalabarPass State Escrow Protocol</span> until on-site check-in.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-300 border border-sky-500/20 whitespace-nowrap self-start md:self-auto">
            <Lock className="w-3.5 h-3.5" />
            100% Escrow Protection
          </span>
        </div>
      )}

      {currentCategory === "eco-sites" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <Trees className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Eco-Sanctuaries &amp; Rainforest Expeditions: </strong>
              Year-round nature expeditions including Marina Resort Calabar River catamaran cruises, Agbokim Waterfalls canopy walks, Afi Drill Ranch safaris, Kwa Falls canyon tours, and Obudu Mountain Resort retreats.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 whitespace-nowrap self-start md:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            Certified Eco-Ranger Guides
          </span>
        </div>
      )}

      {currentCategory === "dining-nightlife" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Gastronomy &amp; Waterfront Lounges: </strong>
              Authentic Efik culinary experiences, freshly grilled river catfish at Marina Resort, traditional Fisherman soup, and executive lounges along Marian Road with GPS verified navigation.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 whitespace-nowrap self-start md:self-auto">
            <Utensils className="w-3.5 h-3.5" />
            Verified Culinary Guide
          </span>
        </div>
      )}

      {currentCategory === "trade-expo" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Ministry of Commerce Trade &amp; Industrial Hub: </strong>
              Cross River State commercial architecture supporting official B2B trade delegations, Calabar International Convention Centre (CICC) exhibitor booths, and Calabar Free Trade Zone industrial passes.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 whitespace-nowrap self-start md:self-auto">
            <Building2 className="w-3.5 h-3.5" />
            Ministry Accredited
          </span>
        </div>
      )}

      {currentCategory === "carnival-culture" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Carnival Calabar &amp; Heritage Passports: </strong>
              Official band secretariat wristband kits for Seagull, Passion 4, Masta Blasta, Bayside, and Freedom Band, plus VIP grandstand clearances and Leboku New Yam Festival passes.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20 whitespace-nowrap self-start md:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Band Kits
          </span>
        </div>
      )}

      {/* Cards Grid Rendering */}
      {isLoading ? (
        <PackageGridSkeleton count={6} />
      ) : filteredCards.length > 0 ? (
        <div id="packages-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {filteredCards.map(card => (
            <PackageCard
              key={card.id}
              pkg={card}
              onSelectPackage={onSelectPackage}
              onViewPackage={onViewPackage}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-12 shadow-sm">
          <Search className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No items found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No passes or venues matched your search criteria. Try another keyword or switch back to All Categories.
          </p>
          <button
            onClick={() => {
              setCurrentCategory("all");
              setSubCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-stateCyan text-white text-xs font-bold hover:bg-sky-500 transition shadow-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Escrow Mechanism Callout Banner */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Cross River 365-Day Escrow Protocol</span>
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Worried about inflated street fares or counterfeit tickets?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Check verified airport taxi benchmarks, average hotel seasonal rates, and official scam advisories before arriving in Cross River State.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300">Verified by Cross River Escrow Protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
}
