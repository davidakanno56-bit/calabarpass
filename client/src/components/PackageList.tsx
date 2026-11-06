import React, { useState, useMemo, useEffect } from "react";
import PackageCard from "./PackageCard.tsx";
import { PackageGridSkeleton } from "./SkeletonLoader.tsx";
import { 
  ShieldCheck, 
  Search, 
  Lock, 
  BedDouble, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  Building2 
} from "lucide-react";
import { 
  CATEGORIES_CONFIG, 
  ALL_EXPANDED_CARDS 
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

  // Merge dynamic onboarded cards with baseline directory catalog
  const allCards = useMemo(() => {
    if (!dynamicCards || dynamicCards.length === 0) return ALL_EXPANDED_CARDS;
    const dynamicIds = new Set(dynamicCards.map(c => c.id));
    return [...dynamicCards, ...ALL_EXPANDED_CARDS.filter(c => !dynamicIds.has(c.id))];
  }, [dynamicCards]);

  // Filter based on selected category and text search
  const filteredCards = useMemo(() => {
    return allCards.filter(card => {
      // 1. Primary Category Filter
      if (currentCategory !== "all" && card.categoryGroup !== currentCategory) {
        return false;
      }

      // 2. Search Query Filter (if any)
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
  }, [allCards, currentCategory, searchQuery]);

  const currentCatConfig = CATEGORIES_CONFIG.find(c => c.id === currentCategory);
  const headerTitle = currentCatConfig ? currentCatConfig.label : "Curated Experiences & Verified Passes";
  const headerSubtitle = currentCatConfig 
    ? currentCatConfig.subtitle 
    : "Operating 365 days a year across Cross River State. Explore verified executive accommodations, rainforest eco-sites, authentic culinary dining, trade fair booths, and official Carnival Calabar passes.";

  return (
    <section id="directory-catalog" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Clean Editorial Category Header (No Dashboard Strip) */}
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stateCyan/10 border border-stateCyan/30 text-stateCyan text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-stateCyan" />
          <span>Cross River 365-Day Clearinghouse</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          {headerTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-light">
          {headerSubtitle}
        </p>
      </div>

      {/* Explanatory Informative Callout Banners for each Category */}
      {currentCategory === "accommodations" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-stateCyan/10 text-stateCyan flex items-center justify-center font-bold shrink-0">
              <BedDouble className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Executive Accommodations &amp; Suites: </strong>
              Verified executive hotels across Highway, State Housing, MCC, and Tinapa corridors. All reservations remain secured in the <span className="text-stateCyan font-semibold">CalabarPass State Escrow Protocol</span> until on-site check-in.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stateCyan/10 text-stateCyan border border-stateCyan/20 whitespace-nowrap self-start md:self-auto">
            <Lock className="w-3.5 h-3.5" />
            100% Escrow Protection
          </span>
        </div>
      )}

      {currentCategory === "eco-sites" && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-stateCyan/10 text-stateCyan flex items-center justify-center font-bold shrink-0">
              <Trees className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Eco-Sanctuaries &amp; Rainforest Expeditions: </strong>
              Year-round nature expeditions including Marina Resort Calabar River catamaran cruises, Agbokim Waterfalls canopy walks, Afi Drill Ranch safaris, Kwa Falls canyon tours, and Obudu Mountain Resort retreats.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stateCyan/10 text-stateCyan border border-stateCyan/20 whitespace-nowrap self-start md:self-auto">
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
            <div className="w-11 h-11 rounded-xl bg-stateCyan/10 text-stateCyan flex items-center justify-center font-bold shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white font-bold block sm:inline">Ministry of Commerce Trade &amp; Industrial Hub: </strong>
              Cross River State commercial architecture supporting official B2B trade delegations, Calabar International Convention Centre (CICC) exhibitor booths, and Calabar Free Trade Zone industrial passes.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stateCyan/10 text-stateCyan border border-stateCyan/20 whitespace-nowrap self-start md:self-auto">
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
            No passes or venues found for this category.
          </p>
        </div>
      )}
    </section>
  );
}
