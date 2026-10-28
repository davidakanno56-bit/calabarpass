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
  Sparkles
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
    shortLabel: "Dining",
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
    shortLabel: "Carnival",
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
    // If clicking the currently open mega-menu category, toggle it
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
    // Smooth scroll to the package listing section
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Logo & Brand: Professional Interlocking CP Monogram & Typography */}
          <div 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            title="CalabarPass Home"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <img 
                src="/assets/calabarpass-monogram.svg" 
                alt="CalabarPass Interlocking CP Monogram" 
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans text-slate-900 dark:text-white">
                  Calabar<span className="text-stateCyan font-extrabold">Pass</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-stateCyan/10 text-stateCyan border border-stateCyan/30 shadow-sm whitespace-nowrap">
                  365 DAYS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-sans font-medium text-stateCyan tracking-tight hidden sm:block lg:hidden xl:block">
                Cross River State Verified Tourism & Commercial Clearinghouse
              </p>
            </div>
          </div>

          {/* Navigation Tabs - The 5 Distinct Categories with Mega-Menu Trigger */}
          <nav 
            aria-label="365-Day Commercial and Tourism Categories"
            className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800/90 shadow-sm"
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
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs tracking-tight transition-all cursor-pointer whitespace-nowrap font-medium ${
                    isSelected
                      ? "bg-stateCyan text-white font-semibold shadow-sm shadow-stateCyan/25"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/80"
                  }`}
                  title={`${cat.label} - Click to open filter drawer`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-stateCyan"}`} />
                  <span>{cat.label}</span>
                  {isDrawerActive ? (
                    <ChevronUp className="w-3 h-3 opacity-80" />
                  ) : (
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls: Theme Toggle, Scam Shield, Vendor Portal, Escrow Badge */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Light / Dark Mode Toggle Switch */}
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

            {/* Surge & Scam Shield Quick Link */}
            <button
              onClick={() => {
                setIsMegaMenuOpen(false);
                setActiveTab("shield");
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                activeTab === "shield"
                  ? "bg-stateCyan/20 text-stateCyan border-stateCyan/60"
                  : "bg-slate-100/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:text-stateCyan hover:bg-white dark:hover:bg-slate-800"
              }`}
              title="Surge & Scam Shield Directory"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-stateCyan" />
              <span className="hidden md:inline">Scam Shield</span>
            </button>

            {/* Onboard Merchant */}
            {onOpenOnboarding && (
              <button
                onClick={() => {
                  setIsMegaMenuOpen(false);
                  onOpenOnboarding();
                }}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-stateCyan/30 bg-stateCyan/10 hover:bg-stateCyan/20 text-stateCyan cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
                title="Register Merchant Terminal & Get Access Code"
              >
                <Building2 className="w-3.5 h-3.5 text-stateCyan" />
                <span>Onboard</span>
              </button>
            )}

            {/* Vendor Portal Terminal Access */}
            <button
              onClick={handleVendorClick}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeTab === "vendor"
                  ? "bg-stateCyan text-white border-sky-400 shadow-md shadow-stateCyan/30"
                  : "bg-slate-100/80 dark:bg-slate-900 text-stateCyan border-stateCyan/30 hover:bg-stateCyan/10 hover:border-stateCyan"
              }`}
              title="Merchant Settlement Portal & Check-In PIN Redemption (Requires Access Code)"
            >
              <Building2 className="w-4 h-4" />
              <span className="whitespace-nowrap">Vendor Portal</span>
              {!isVendorAuthenticated && (
                <Lock className="w-3 h-3 text-stateCyan/80 opacity-80" />
              )}
            </button>

            {/* Escrow Protected Live Badge */}
            <button
              onClick={() => {
                setIsMegaMenuOpen(false);
                setActiveTab("escrow");
              }}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-full border text-[11px] sm:text-xs font-semibold cursor-pointer transition-all hover:scale-[1.02] active:scale-95 ${
                activeTab === "escrow"
                  ? "bg-emerald-500/25 text-emerald-700 dark:text-emerald-200 border-emerald-500 shadow-emerald-glow"
                  : "bg-emerald-500/10 dark:bg-emerald-950/60 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/60"
              }`}
              title="100% Escrow Vault & Buyer Protection"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline font-bold">100% Escrow Protected</span>
              <span className="sm:hidden font-mono font-bold">Escrow</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar - Scrollable 5 Distinct Categories + Utilities */}
        <div 
          aria-label="Mobile Navigation Categories"
          className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-200 dark:border-slate-800/80 text-xs scrollbar-none"
        >
          {NAV_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === "packages" && activeCategory === cat.id;
            const isDrawerActive = isMegaMenuOpen && megaMenuCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-stateCyan text-white shadow-sm"
                    : "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-stateCyan"}`} />
                <span>{cat.shortLabel}</span>
                {isDrawerActive ? (
                  <ChevronUp className="w-3 h-3 opacity-80" />
                ) : (
                  <ChevronDown className="w-3 h-3 opacity-50" />
                )}
              </button>
            );
          })}

          <button
            onClick={() => {
              setIsMegaMenuOpen(false);
              setActiveTab("shield");
            }}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
              activeTab === "shield"
                ? "bg-stateCyan text-white"
                : "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            }`}
          >
            Scam Shield
          </button>

          {onOpenOnboarding && (
            <button
              onClick={() => {
                setIsMegaMenuOpen(false);
                onOpenOnboarding();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all cursor-pointer text-stateCyan bg-stateCyan/10 border border-stateCyan/30"
              title="Onboard Merchant"
            >
              <span>+ Onboard</span>
            </button>
          )}

          <button
            onClick={handleVendorClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
              activeTab === "vendor"
                ? "bg-stateCyan text-white"
                : "text-stateCyan bg-slate-100 dark:bg-slate-900 border border-stateCyan/30"
            }`}
          >
            <span>Vendor</span>
            {!isVendorAuthenticated && (
              <Lock className="w-3 h-3 text-stateCyan/80" />
            )}
          </button>
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
