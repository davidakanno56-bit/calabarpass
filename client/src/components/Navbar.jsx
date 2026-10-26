import React from "react";
import { 
  BedDouble, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  Building2, 
  ShieldAlert, 
  Lock 
} from "lucide-react";

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
  const handleVendorClick = () => {
    if (onOpenVendorPortal) {
      onOpenVendorPortal();
    } else {
      setActiveTab("vendor");
    }
  };

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    if (activeTab !== "packages" && activeTab !== "home") {
      setActiveTab("packages");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    if (onSelectCategory) {
      onSelectCategory("all");
    }
    setActiveTab("packages");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Logo & Brand: Sleek Minimalist Vector Mark */}
          <div 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            title="CalabarPass Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#08182B] border border-cyan-500/30 shadow-md shadow-cyan-950/40 group-hover:border-stateCyan group-hover:shadow-cyan-500/20 transition-all shrink-0">
              <svg 
                viewBox="0 0 36 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-105"
              >
                {/* Precision geometric gateway frame & clearinghouse portal */}
                <rect x="2" y="2" width="32" height="32" rx="8" fill="#08182B" stroke="#0284C7" strokeWidth="1.2" />
                <path d="M10 25V14C10 11.7909 11.7909 10 14 10H22C24.2091 10 26 11.7909 26 14V25" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M14 25V18C14 16.8954 14.8954 16 16 16H20C21.1046 16 22 16.8954 22 18V25" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="18" cy="13" r="1.8" fill="#38BDF8" />
                <line x1="8" y1="25" x2="28" y2="25" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-heading text-white">
                  Calabar<span className="text-stateCyan font-extrabold">Pass</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700/80">
                  365 CLEARINGHOUSE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal tracking-tight hidden xl:block">
                Cross River State Verified Tourism & Commercial Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs - The 5 Distinct Categories */}
          <nav 
            aria-label="365-Day Commercial and Tourism Categories"
            className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/90"
          >
            {NAV_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = (activeTab === "packages" || activeTab === "home") && activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-stateCyan text-white font-semibold shadow-sm shadow-stateCyan/25"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70 font-medium"
                  }`}
                  title={`${cat.label} - ${cat.subLabel}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-stateCyan"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls: Vendor Portal & Escrow Protection */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Surge & Scam Shield Quick Link */}
            <button
              onClick={() => setActiveTab("shield")}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                activeTab === "shield"
                  ? "bg-stateCyan/20 text-stateCyan border-stateCyan/60"
                  : "bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800"
              }`}
              title="Surge & Scam Shield Directory"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-stateCyan" />
              <span className="hidden md:inline">Scam Shield</span>
            </button>

            {/* Onboard Merchant */}
            {onOpenOnboarding && (
              <button
                onClick={onOpenOnboarding}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-stateCyan/30 bg-stateCyan/10 hover:bg-stateCyan/20 text-stateCyan cursor-pointer shadow-sm"
                title="Register Merchant Terminal & Get Access Code"
              >
                <Building2 className="w-3.5 h-3.5 text-stateCyan" />
                <span>Onboard</span>
              </button>
            )}

            {/* Vendor Portal Terminal Access */}
            <button
              onClick={handleVendorClick}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                activeTab === "vendor"
                  ? "bg-stateCyan text-white border-sky-400 shadow-md shadow-stateCyan/30"
                  : "bg-slate-900 text-stateCyan border-stateCyan/40 hover:bg-stateCyan/10 hover:border-stateCyan"
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
              onClick={() => setActiveTab("escrow")}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-full border text-[11px] sm:text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "escrow"
                  ? "bg-emerald-500/30 text-emerald-200 border-emerald-400 shadow-emerald-glow"
                  : "bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:border-emerald-400"
              }`}
              title="100% Escrow Vault & Buyer Protection"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline">100% Escrow Protected</span>
              <span className="sm:hidden font-mono">Escrow</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar - Scrollable 5 Distinct Categories + Utilities */}
        <div 
          aria-label="Mobile Navigation Categories"
          className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-800/80 text-xs scrollbar-none"
        >
          {NAV_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === "packages" && activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-stateCyan text-white shadow-sm"
                    : "text-slate-300 bg-slate-900 border border-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-stateCyan"}`} />
                <span>{cat.shortLabel}</span>
              </button>
            );
          })}

          <button
            onClick={() => setActiveTab("shield")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
              activeTab === "shield"
                ? "bg-stateCyan text-white"
                : "text-slate-400 bg-slate-900 border border-slate-800"
            }`}
          >
            Scam Shield
          </button>

          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold text-xs transition-all cursor-pointer text-stateCyan bg-stateCyan/10 border border-stateCyan/30"
              title="Onboard Merchant"
            >
              <span>+ Onboard</span>
            </button>
          )}

          <button
            onClick={handleVendorClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
              activeTab === "vendor"
                ? "bg-stateCyan text-white"
                : "text-stateCyan bg-slate-900 border border-stateCyan/30"
            }`}
          >
            <span>Vendor Portal</span>
            {!isVendorAuthenticated && (
              <Lock className="w-3 h-3 text-stateCyan/80" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
