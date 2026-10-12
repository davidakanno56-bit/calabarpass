import React from "react";
import { 
  ShieldCheck, 
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
    if (activeTab !== "packages") {
      setActiveTab("packages");
    }
    setTimeout(() => {
      const el = document.getElementById("directory-catalog");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
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
          {/* Logo & Brand */}
          <div 
            onClick={handleLogoClick} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
            title="CalabarPass Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-400 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
              <span className="text-xl sm:text-2xl">🌴</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading text-white">
                  Calabar<span className="gold-gradient-text">Pass</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  365 DAYS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden xl:block">
                Cross River 365-Day Commercial & Tourism Clearinghouse
              </p>
            </div>
          </div>

          {/* Navigation Tabs - The 5 Distinct Categories */}
          <nav 
            aria-label="365-Day Commercial and Tourism Categories"
            className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800"
          >
            {NAV_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeTab === "packages" && activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-amber-500 text-black font-extrabold shadow-sm shadow-amber-500/30 scale-[1.02]"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  }`}
                  title={`${cat.label} - ${cat.subLabel}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-amber-400"}`} />
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
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/60"
                  : "bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800"
              }`}
              title="Surge & Scam Shield Directory"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Scam Shield</span>
            </button>

            {/* Vendor Portal Terminal Access */}
            <button
              onClick={handleVendorClick}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                activeTab === "vendor"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-400 shadow-gold-glow"
                  : "bg-slate-900 text-amber-400 border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400"
              }`}
              title="Merchant Settlement Portal & Check-In PIN Redemption (Requires Access Code)"
            >
              <Building2 className="w-4 h-4" />
              <span className="whitespace-nowrap">Vendor Portal</span>
              {!isVendorAuthenticated && (
                <Lock className="w-3 h-3 text-amber-400/80 opacity-80" />
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
                    ? "bg-amber-500 text-black shadow-sm"
                    : "text-slate-300 bg-slate-900 border border-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-amber-400"}`} />
                <span>{cat.shortLabel}</span>
              </button>
            );
          })}

          <button
            onClick={() => setActiveTab("shield")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
              activeTab === "shield"
                ? "bg-amber-500 text-black"
                : "text-slate-400 bg-slate-900 border border-slate-800"
            }`}
          >
            Scam Shield
          </button>

          <button
            onClick={handleVendorClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
              activeTab === "vendor"
                ? "bg-amber-500 text-black"
                : "text-amber-300 bg-slate-900 border border-amber-500/30"
            }`}
          >
            <span>Vendor Portal</span>
            {!isVendorAuthenticated && (
              <Lock className="w-3 h-3 text-amber-400/80" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
