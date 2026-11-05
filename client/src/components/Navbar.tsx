import React, { useState } from "react";
import {
  Menu,
  X,
  Compass,
  MapPin,
  BedDouble,
  Sparkles,
  Flame,
  Briefcase,
  Search,
  User,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Building2,
  Calendar,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext.tsx";
import { useCurrency } from "../context/CurrencyContext.tsx";
import CategoryMegaMenu from "./CategoryMegaMenu.tsx";

export interface NavItem {
  id: string;
  label: string;
  category?: string;
  action?: "category" | "lookup" | "vendor" | "home" | "modal";
  badge?: string;
}

export const LUXURY_NAV_ITEMS: NavItem[] = [
  { id: "discover", label: "Discover", action: "home" },
  { id: "destinations", label: "Destinations", category: "eco-sites", action: "category" },
  { id: "accommodations", label: "Where to Stay", category: "accommodations", action: "category" },
  { id: "experiences", label: "Experiences", category: "dining-nightlife", action: "category" },
  { id: "culture", label: "Culture & Events", category: "carnival-culture", action: "category", badge: "Carnival 2026" },
  { id: "trade", label: "Trade & Expo", category: "trade-expo", action: "category" }
];

export const NAV_CATEGORIES = [
  {
    id: "accommodations",
    label: "Accommodations",
    shortLabel: "Accommodations",
    subLabel: "Hotels, Luxury Suites & Lodges",
    icon: BedDouble
  },
  {
    id: "eco-sites",
    label: "Eco-Sites & Heritage",
    shortLabel: "Destinations",
    subLabel: "Obudu, Agbokim, Drill Ranch",
    icon: MapPin
  },
  {
    id: "dining-nightlife",
    label: "Dining & Nightlife",
    shortLabel: "Experiences",
    subLabel: "Efik Culinary Arts & Marina Cruises",
    icon: Sparkles
  },
  {
    id: "trade-expo",
    label: "Trade & Expo Hub",
    shortLabel: "Trade & Expo",
    subLabel: "Commerce & Free Zone Clearances",
    icon: Briefcase
  },
  {
    id: "carnival-culture",
    label: "Carnival & Culture",
    shortLabel: "Culture & Events",
    subLabel: "Carnival Passes & Heritage Wristbands",
    icon: Flame
  }
];

export interface NavbarProps {
  activeTab?: string;
  setActiveTab: (tab: string) => void;
  activeCategory?: string;
  onSelectCategory?: (category: string, query?: string) => void;
  onOpenVendorPortal?: () => void;
  onOpenOnboarding?: () => void;
  onOpenBookingLookup?: () => void;
  isVendorAuthenticated?: boolean;
  escrowStats?: {
    totalLockedNGN?: number;
    totalDisbursedNGN?: number;
  } | null;
}

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
}: NavbarProps) {
  const { isDark = true, toggleTheme = () => {} } = useTheme() || {};
  const { currency = "NGN", setCurrency = () => {}, availableCurrencies = [] } = useCurrency() || {};
  const [megaMenuCategory, setMegaMenuCategory] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleVendorClick = () => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onOpenVendorPortal) {
      onOpenVendorPortal();
    } else {
      setActiveTab("vendor");
    }
  };

  const handleVendorOrLookupClick = () => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onOpenBookingLookup) {
      onOpenBookingLookup();
    } else if (onOpenVendorPortal) {
      onOpenVendorPortal();
    } else {
      setActiveTab("escrow");
    }
  };

  const handleCategoryClick = (catId: string) => {
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

  const handleCorridorSelect = (catId: string, query?: string) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
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

  const handleNavItemClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);

    if (item.action === "home") {
      if (onSelectCategory) onSelectCategory("all");
      setActiveTab("packages");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.action === "category" && item.category) {
      if (onSelectCategory) onSelectCategory(item.category);
      setActiveTab("packages");
      setTimeout(() => {
        const target = document.getElementById("package-listing-section") || document.getElementById("packages-grid");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 dark:bg-[#070b11]/90 backdrop-blur-2xl border-b border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Navigation Row */}
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Cross River State Official Emblem & CalabarPass Wordmark */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
            title="CalabarPass — Cross River State Official Tourism Clearinghouse"
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/calabarpass-monogram.svg"
                alt="Cross River State Tourism Crest"
                className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(8,127,91,0.35)]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-heading text-white">
                  Calabar<span className="text-emerald-400 font-extrabold">Pass</span>
                </span>
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hidden sm:inline-block">
                  Cross River State
                </span>
              </div>
              <p className="text-[10px] font-sans font-medium text-slate-400 tracking-tight hidden lg:block">
                Visit Cross River • Tourism & Experience Clearinghouse
              </p>
            </div>
          </div>

          {/* 2. Luxury Editorial Navigation Links (Visit Dubai / Visit Saudi Style) */}
          <nav
            aria-label="Primary Destination Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {LUXURY_NAV_ITEMS.map((item) => {
              const isSelected =
                (item.action === "home" && activeTab === "packages" && activeCategory === "all") ||
                (item.action === "category" && activeCategory === item.category);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item)}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "text-emerald-400 bg-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {item.badge}
                    </span>
                  )}
                  {isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Luxury Actions: Currency, My Bookings, & Merchant Portal */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Currency Selector (Diaspora & International Visitors) */}
            <div className="relative hidden sm:flex items-center">
              <div className="relative flex items-center rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] px-2.5 py-1.5 text-xs text-slate-300 transition-colors">
                <Globe className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  aria-label="Select Currency"
                  className="bg-transparent text-white font-bold outline-none cursor-pointer pr-4 appearance-none text-xs"
                >
                  {(availableCurrencies || []).map((c) => (
                    <option key={c.code} value={c.code} className="bg-slate-900 text-white font-bold">
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none -ml-3" />
              </div>
            </div>

            {/* My Bookings (PIN Voucher Lookup) */}
            {onOpenBookingLookup && (
              <button
                type="button"
                onClick={() => {
                  setIsMegaMenuOpen(false);
                  onOpenBookingLookup();
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                title="Lookup your digital voucher with your 6-digit PIN"
              >
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                <span>My Bookings</span>
              </button>
            )}

            {/* Merchant Portal */}
            <button
              type="button"
              onClick={handleVendorClick}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer active:scale-[0.97] ${
                activeTab === "vendor" || isVendorAuthenticated
                  ? "bg-emerald-500 text-slate-950 font-black shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)]"
                  : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              }`}
              title="Merchant Clearinghouse Portal"
            >
              <div className="relative flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span className="hidden sm:inline">Merchant Portal</span>
              <span className="sm:hidden">Portal</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category Corridor Sub-Bar (Subtle, High-Craft Destination Filters) */}
        <div className="py-2.5 overflow-x-auto scrollbar-none no-scrollbar border-t border-white/[0.05]">
          <div className="flex items-center gap-2 min-w-max">
            <button
              type="button"
              onClick={() => {
                if (onSelectCategory) onSelectCategory("all");
                if (activeTab !== "packages") setActiveTab("packages");
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === "all" && activeTab === "packages"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              All Destinations & Passes
            </button>

            {NAV_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id && activeTab === "packages";

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Mega Menu Dropdown */}
      {isMegaMenuOpen && megaMenuCategory && (
        <CategoryMegaMenu
          category={megaMenuCategory}
          onSelectCorridor={handleCorridorSelect}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-Out Drawer (Visit Dubai / Visit Saudi Mobile UX) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-slate-950/98 backdrop-blur-2xl px-5 py-6 space-y-5 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-3">
              Explore Cross River
            </span>
            {LUXURY_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavItemClick(item)}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-left text-sm font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-300">
                    {item.badge}
                  </span>
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
            {onOpenBookingLookup && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBookingLookup();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Lookup Booking Voucher (6-Digit PIN)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            )}

            <button
              type="button"
              onClick={handleVendorClick}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500 text-slate-950 text-xs font-black"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Merchant Settlement Terminal</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
