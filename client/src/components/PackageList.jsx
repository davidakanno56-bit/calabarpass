import React, { useState, useMemo, useEffect } from "react";
import PackageCard from "./PackageCard.jsx";
import { PackageGridSkeleton } from "./SkeletonLoader.jsx";
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
} from "../data/expandedCategories.js";

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
          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Cross River 365-Day Commercial & Tourism Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Official State Escrow & Pass Directory
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed tracking-tight">
            Operating 365 days a year across Cross River State. Explore verified executive accommodations, rainforest eco-sites, authentic dining spots, Ministry of Commerce trade fair booths, and official Carnival Calabar passes.
          </p>
        </div>

        {/* Total Verified Live Metric */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white dark:bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">Active Directory:</span>
          <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
            {allCards.length} Verified Venues & Passes
          </span>
        </div>
      </div>

      {/* Main 5-Category Tabs Bar (Booking.com & eBay enterprise standard) */}
      <div className="mb-6 p-2 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-wrap gap-2 items-center justify-between shadow-sm">
        <div className="flex flex-wrap gap-2 w-full xl:w-auto">
          {/* "All" Tab */}
          <button
            onClick={() => handleCategoryChange("all")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
              currentCategory === "all"
                ? "bg-stateCyan text-white shadow-md shadow-stateCyan/20 scale-[1.02]"
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
                    ? "bg-stateCyan text-white shadow-md shadow-stateCyan/20 scale-[1.02]"
                    : "bg-slate-100 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                }`}
                title={cat.subtitle}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-stateCyan"}`} />
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
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-stateCyan/30 focus:border-stateCyan transition shadow-inner"
          />
        </div>
      </div>

      {/* Explanatory Informative Callout Banners for each Category */}
      {currentCategory === "accommodations" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
              <BedDouble className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-blue-600 dark:text-blue-300 font-bold block sm:inline">1. Accommodations (Hotels, Resorts, Suites): </strong>
              Verified executive hotels across Highway, State Housing, MCC, and Tinapa corridors. All payments remain securely locked in the <span className="text-amber-600 dark:text-amber-400 font-semibold">CalabarPass Anti-Fraud Escrow Vault</span> until physical check-in.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 whitespace-nowrap self-start md:self-auto">
            <Lock className="w-3.5 h-3.5" />
            100% Escrow Room Protection
          </span>
        </div>
      )}

      {currentCategory === "eco-sites" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <Trees className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-emerald-700 dark:text-emerald-300 font-bold block sm:inline">2. Eco-Sites & Heritage: </strong>
              365-day nature expeditions including Marina Resort Calabar River catamaran cruises, Agbokim Waterfalls canopy treks, Afi Drill Monkey Sanctuary walks, Kwa Falls canyon tours, and Obudu Mountain Resort expeditions.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 whitespace-nowrap self-start md:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            Certified Eco-Ranger Escorts
          </span>
        </div>
      )}

      {currentCategory === "dining-nightlife" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-amber-700 dark:text-amber-300 font-bold block sm:inline">3. Dining & Nightlife (Eateries, Seafood Hubs, Lounges): </strong>
              Explore Crunchies fast-food combos, authentic Efik Fisherman soup at Supreme Viking, Marina Resort river catfish, and VIP nightlife lounges along Marian Road with GPS navigation and escrow vouchers.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap self-start md:self-auto">
            <Utensils className="w-3.5 h-3.5" />
            Verified Culinary Guide
          </span>
        </div>
      )}

      {currentCategory === "trade-expo" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-stateCyan flex items-center justify-center font-bold shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-sky-700 dark:text-cyan-300 font-bold block sm:inline">4. Trade & Expo Hub (Ministry of Commerce): </strong>
              Cross River State commercial architecture backing verified B2B commercial buyer passes, Calabar International Convention Centre (CICC) trade fair exhibitor booths, and Free Trade Zone industrial delegation passes.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-sky-700 dark:text-cyan-300 border border-cyan-500/30 whitespace-nowrap self-start md:self-auto">
            <Building2 className="w-3.5 h-3.5" />
            Ministry Accredited
          </span>
        </div>
      )}

      {currentCategory === "carnival-culture" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-rose-700 dark:text-rose-300 font-bold block sm:inline">5. Carnival & Culture: </strong>
              Direct band secretariat wristband kits for Seagull, Passion 4, Masta Blasta, plus VIP U.J. Esuene stadium box tickets and Leboku New Yam Festival passes with zero scalper counterfeit risk.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 whitespace-nowrap self-start md:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero Counterfeits Guarantee
          </span>
        </div>
      )}

      {/* Cards Grid Rendering */}
      {isLoading ? (
        <PackageGridSkeleton count={6} />
      ) : filteredCards.length > 0 ? (
        <div id="packages-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
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

          <button
            onClick={onOpenShield}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-stateCyan/25 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>View Surge & Scam Shield</span>
          </button>
        </div>
      </div>
    </section>
  );
}
