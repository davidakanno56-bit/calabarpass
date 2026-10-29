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
  User,
  Globe
} from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useCurrency } from "../context/CurrencyContext.jsx";
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
  onOpenBookingLookup,
  isVendorAuthenticated = false,
  escrowStats
}) {
  const { isDark, toggleTheme } = useTheme();
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const [megaMenuCategory, setMegaMenuCategory] = useState(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleVendorOrLookupClick = () => {
    setIsMegaMenuOpen(false);
    if (onOpenBookingLookup) {
      onOpenBookingLookup();
    } else if (onOpenVendorPortal) {
      onOpenVendorPortal();
    } else {
      setActiveTab("escrow");
    }
  };

  const handleCategoryClick = (catId) => {
    setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
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
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4 border-b border-slate-100 dark:border-slate-800/60">
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
          {/* Desktop utility row: visible only on md+ viewports */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* 1. Multi-Currency Diaspora Selector */}
            <div className="relative flex items-center">
              <div className="relative flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition">
                <span className="pl-2 pr-1 text-slate-500 dark:text-slate-400 pointer-events-none hidden sm:inline">
                  <Globe className="w-3.5 h-3.5" />
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  aria-label="Select Currency for Diaspora conversion"
                  className="py-1.5 pl-2 sm:pl-1 pr-6 rounded-xl text-xs font-bold bg-transparent text-slate-800 dark:text-slate-200 cursor-pointer outline-none appearance-none"
                  title="Diaspora Currency Converter (NGN ₦, USD $, GBP £, EUR €)"
                >
                  {availableCurrencies.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold">
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Theme Toggle Switch */}
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

            {/* 3. List Property (Host / Operator Onboarding) */}
            {onOpenOnboarding && (
              <button
                onClick={() => {
                  setIsMegaMenuOpen(false);
                  onOpenOnboarding();
                }}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-stateCyan/40 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
                title="Register Hotel, Tour Sanctuary, Restaurant or Band Terminal"
              >
                <Building2 className="w-3.5 h-3.5 text-stateCyan shrink-0" />
                <span className="whitespace-nowrap">List Property</span>
              </button>
            )}

            {/* 4. Scam Shield Vault */}
            <button
              onClick={() => {
                setIsMegaMenuOpen(false);
                setActiveTab("shield");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all border cursor-pointer hover:scale-[1.02] active:scale-95 ${
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

            {/* 5. User / Vendor Action Button: "Vendor Portal / Booking Lookup" */}
            <button
              onClick={handleVendorOrLookupClick}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all border cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeTab === "escrow" || activeTab === "vendor"
                  ? "bg-stateCyan text-white border-stateCyan shadow-md shadow-stateCyan/25"
                  : "bg-slate-100/90 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-stateCyan/40 hover:bg-white dark:hover:bg-slate-800"
              }`}
              title="No account required for tourists. Vendors log in here."
            >
              <div className="relative flex items-center justify-center">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="whitespace-nowrap hidden sm:inline leading-tight">
                  Vendor Portal / Booking Lookup
                </span>
                <span className="whitespace-nowrap sm:hidden">
                  Lookup / Vendor
                </span>
                <span className="hidden xl:block text-[9px] text-slate-400 dark:text-slate-400 font-normal leading-none mt-0.5">
                  No account for tourists • Vendors login
                </span>
              </div>
                        </button>
          </div>

          {/* Mobile Hamburger Trigger: visible only on mobile viewports (< md) */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-stateCyan hover:border-stateCyan/40 transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-stateCyan" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out / Collapsible Menu Drawer (md:hidden) */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0c121e]/98 backdrop-blur-xl px-4 py-4 space-y-3 shadow-2xl transition-all animate-fadeIn"
            role="region"
            aria-label="Mobile Navigation Utility Menu"
          >
            {/* Row 1 in Mobile Menu: Currency Selector & Theme Mode Switch */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Diaspora Currency Selector */}
              <div className="relative flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 p-2 shadow-sm">
                <Globe className="w-4 h-4 text-stateCyan ml-1 shrink-0" />
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                  aria-label="Select Currency for Diaspora conversion"
                  className="w-full py-0.5 pl-2 pr-6 rounded-lg text-xs font-bold bg-transparent text-slate-800 dark:text-slate-100 cursor-pointer outline-none appearance-none"
                >
                  {availableCurrencies.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold">
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                type="button"
                className="flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:border-stateCyan/40 shadow-sm transition active:scale-95 cursor-pointer"
                aria-label="Toggle Light / Dark theme"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-amber-400">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                    <span className="text-xs font-bold text-slate-700">Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Scam Shield Vault Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMegaMenuOpen(false);
                setActiveTab("shield");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                activeTab === "shield"
                  ? "bg-stateCyan text-white border-stateCyan shadow-md shadow-stateCyan/25"
                  : "bg-slate-100/90 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-stateCyan/40"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 dark:text-white">Scam Shield Vault</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Cross River Fair-Price Index &amp; Rate Assurance</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-500 border border-amber-500/30">
                Zero Fraud
              </span>
            </button>

            {/* Vendor Portal / Booking & PIN Lookup Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleVendorOrLookupClick();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                activeTab === "escrow" || activeTab === "vendor"
                  ? "bg-stateCyan text-white border-stateCyan shadow-md shadow-stateCyan/25"
                  : "bg-slate-100/90 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-stateCyan/40"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 dark:text-white">Vendor Portal / Booking Lookup</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Look up 6-digit PIN or merchant payout ledger</div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Lookup
              </span>
            </button>

            {/* List Property / Host & Vendor Onboarding Button */}
            {onOpenOnboarding && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMegaMenuOpen(false);
                  onOpenOnboarding();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-stateCyan/40 cursor-pointer active:scale-95"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stateCyan/10 border border-stateCyan/20 flex items-center justify-center text-stateCyan shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 dark:text-white">List Property / Partner Portal</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Onboard Hotel, Sanctuary, Dining or Band Pass</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-stateCyan">
                  + Onboard
                </span>
              </button>
            )}
          </div>
        )}

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
