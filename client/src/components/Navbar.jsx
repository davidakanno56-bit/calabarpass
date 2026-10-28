import React, { useState } from "react";
import { 
  BedDouble, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  Building2, 
  ShieldAlert, 
  Lock,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  User
} from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import CategoryMegaMenu from "./CategoryMegaMenu.jsx";

export const NAV_CATEGORIES = [
  {
    id: "accommodations",
    label: "Accommodations",
    shortLabel: "Accommodations",
    subLabel: "Hotels, Resorts, Suites",
    icon: BedDouble
  },
  {
    id: "eco-sites",
    label: "Eco-Sites & Heritage",
    shortLabel: "Eco-Sites",
    subLabel: "Marina, Agbokim, Drill, Kwa",
    icon: Trees
  },
  {
    id: "dining-nightlife",
    label: "Dining & Nightlife",
    shortLabel: "Dining & Nightlife",
    subLabel: "Eateries, Seafood, Lounges",
    icon: Utensils
  },
  {
    id: "trade-expo",
    label: "Trade & Expo Hub",
    shortLabel: "Trade & Expo",
    subLabel: "Ministry of Commerce Passes",
    icon: Briefcase
  },
  {
    id: "carnival-culture",
    label: "Carnival & Culture",
    shortLabel: "Carnival & Culture",
    subLabel: "Band Passes & Festival Tickets",
    icon: Flame
  }
];

export default function Navbar({
  activeTab = "packages",
  setActiveTab,
  activeCategory = "all",
  onSelectCategory,
  onOpenVendorPortal,
  onOpenOnboarding,
  isVendorAuthenticated = false,
  escrowStats
}) {
  const { isDark, toggleTheme } = useTheme();
  const [megaMenuCategory, setMegaMenuCategory] = useState(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const handleVendorClick = () => {
    setIsMegaMenuOpen(false);
    if (onOpenVendorPortal) {
      onOpenVendorPortal();
    } else {
      setActiveTab("vendor");
    }
  };

  const handleCategoryClick = (catId) => {
    if (isMegaMenuOpen && megaMenuCategory === catId) {
      setIsMegaMenuOpen(false);
    } else {
      setMegaMenuCategory(catId);
      setIsMegaMenuOpen(true);
    }

    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    if (activeTab !== "packages" && activeTab !== "home") {
      setActiveTab("packages");
    }
  };

  const handleCorridorSelect = (catId, query) => {
    setIsMegaMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId, query);
    }
    if (activeTab !== "packages" && activeTab !== "home") {
      setActiveTab("packages");
    }
    setTimeout(() => {
      const target = document.getElementById("package-listing-section") || document.getElementById("packages-grid");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleLogoClick = () => {
    setIsMegaMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory("all");
    }
    setActiveTab("packages");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: Top Navigation Bar (Logo on Left, Clean Utility Actions on Right) */}
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-4 border-b border-slate-100 dark:border-slate-800/60">
          {/* Left side: Clean CalabarPass logo and brand mark */}
          <div 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            title="CalabarPass Home"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <img 
                src="/assets/calabarpass-monogram.svg" 
                alt="CalabarPass Monogram" 
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans text-slate-900 dark:text-white">
                  Calabar<span className="text-stateCyan font-extrabold">Pass</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stateCyan/10 text-stateCyan border border-stateCyan/30 whitespace-nowrap hidden sm:inline-block">
                  365 DAYS
                </span>
              </div>
              <p className="text-[10px] font-sans font-medium text-stateCyan tracking-tight hidden lg:block">
                Cross River State Tourism & Commercial Clearinghouse
              </p>
            </div>
          </div>

          {/* Right side: Clean utility actions arranged neatly in a single row without any duplication */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* 1. Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold transition-all border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-[1.03] active:scale-95"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Light / Dark theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden xl:inline text-[11px] font-bold text-amber-400">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                  <span className="hidden xl:inline text-[11px] font-bold text-slate-700">Dark</span>
                </>
              )}
            </button>

            {/* 2. List Property / Vendor Portal */}
            <button
              onClick={handleVendorClick}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all border cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeTab === "vendor"
                  ? "bg-stateCyan text-white border-stateCyan shadow-md shadow-stateCyan/25"
                  : "bg-slate-100/90 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-stateCyan/40 hover:bg-white dark:hover:bg-slate-800"
              }`}
              title="List Property / Open Merchant Terminal"
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stateCyan shrink-0" />
              <span className="whitespace-nowrap hidden sm:inline">List Property / Vendor Portal</span>
              <span className="whitespace-nowrap sm:hidden">List Property</span>
              {!isVendorAuthenticated && (
                <Lock className="w-3 h-3 text-slate-400 opacity-70 shrink-0" />
              )}
            </button>

            {/* 3. Scam Shield Vault */}
            <button
              onClick={() => {
                setIsMegaMenuOpen(false);
                setActiveTab("shield");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all border cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeTab === "shield"
                  ? "bg-stateCyan text-white border-stateCyan shadow-md shadow-stateCyan/25"
                  : "bg-slate-100/90 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-stateCyan/40 hover:bg-white dark:hover:bg-slate-800"
              }`}
              title="Cross River Fair-Price Index & Scam Shield Vault"
            >
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
              <span className="whitespace-nowrap hidden sm:inline">Scam Shield Vault</span>
              <span className="whitespace-nowrap sm:hidden">Shield</span>
            </button>

            {/* 4. User Profile / Escrow Login */}
            <button
              onClick={() => {
                setIsMegaMenuOpen(false);
                setActiveTab("escrow");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all border cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeTab === "escrow"
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-emerald-glow"
                  : "bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:border-emerald-500/60"
              }`}
              title="Escrow Account & Buyer Protection"
            >
              <div className="relative flex items-center justify-center">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="whitespace-nowrap hidden sm:inline">User Profile / Login</span>
              <span className="whitespace-nowrap sm:hidden font-mono">Login</span>
            </button>
          </div>
        </div>

        {/* Row 2: Unified Booking.com-Style Horizontal Category Bar */}
        <div className="py-2.5 overflow-x-auto scrollbar-none no-scrollbar touch-pan-x -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <nav 
            aria-label="Cross River State Tourism & Commerce Sectors"
            className="flex items-center gap-2 min-w-max"
          >
            {NAV_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = (activeTab === "packages" || activeTab === "home") && activeCategory === cat.id;
              const isDrawerActive = isMegaMenuOpen && megaMenuCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  data-mega-trigger={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? "bg-stateCyan text-white border-stateCyan shadow-sm shadow-stateCyan/25"
                      : "bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800/90 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                  }`}
                  title={`${cat.label} - Click to filter directory & view corridors`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-stateCyan"}`} />
                  <span>{cat.label}</span>
                  {isDrawerActive ? (
                    <ChevronUp className="w-3 h-3 opacity-80 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3 h-3 opacity-50 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Structured Category Mega-Menu & Filter Drawer (Booking.com style) */}
      <CategoryMegaMenu
        activeCategory={megaMenuCategory}
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={(catId) => {
          if (onSelectCategory) onSelectCategory(catId);
          if (activeTab !== "packages" && activeTab !== "home") setActiveTab("packages");
        }}
        onSelectCorridor={handleCorridorSelect}
      />
    </header>
  );
}
