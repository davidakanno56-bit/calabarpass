import React, { useEffect, useRef } from "react";
import { 
  BedDouble, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Compass, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export const CATEGORY_DETAILS = {
  accommodations: {
    id: "accommodations",
    label: "Accommodations",
    tagline: "Official AfSNET & Ministry Accredited Hotels, Resorts & Executive Suites",
    icon: BedDouble,
    badgeText: "100% Escrow Room Protection",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    accentColor: "text-stateCyan",
    bgAccent: "from-blue-500/5 to-transparent",
    corridors: [
      { name: "State Housing Estate", desc: "Executive diplomacy & quiet luxury residences", query: "State Housing" },
      { name: "MCC Road Corridor", desc: "Central business, banking & dining access", query: "MCC" },
      { name: "Murtala Muhammed Highway", desc: "Fast airport, highway & conference transit", query: "Highway" },
      { name: "Tinapa Free Zone", desc: "Scenic lakeside resort & duty-free trade hub", query: "Tinapa" },
      { name: "Diamond Hill & Marina", desc: "Historic Government House & river vistas", query: "Marina" },
      { name: "Marian Road Corridor", desc: "Vibrant city center, nightlife & shopping", query: "Marian" },
    ],
    perks: [
      "Official Nightly Rate Cap (Anti-Surge)",
      "Guaranteed 24/7 Redundant Power & Security",
      "Direct Bureau Verification & Check-In PIN",
      "Refundable Escrow Protection if Room Unavailable"
    ],
    actionText: "Explore All Verified Accommodations",
  },
  "eco-sites": {
    id: "eco-sites",
    label: "Eco-Sites & Heritage",
    tagline: "Cross River State Forestry & Conservation Cleared Nature Expeditions",
    icon: Trees,
    badgeText: "Certified Eco-Ranger Escorts",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    accentColor: "text-emerald-500",
    bgAccent: "from-emerald-500/5 to-transparent",
    corridors: [
      { name: "Obudu Mountain Resort", desc: "1,576m highland plateau, cable car & cloud forest", query: "Obudu" },
      { name: "Agbokim Waterfalls", desc: "Seven terraced cascades & rainbow iridescence", query: "Agbokim" },
      { name: "Marina Resort & Waterfront", desc: "Catamaran river cruises & Slave History Museum", query: "Marina" },
      { name: "Afi Drill Monkey Ranch", desc: "Endangered primates & virgin canopy walkway", query: "Drill" },
      { name: "Kwa Falls & River Gorge", desc: "Rainforest stone steps & natural freshwater pools", query: "Kwa" },
      { name: "Ikom Monoliths Heritage", desc: "Ancient volcanic stone carved cultural artifacts", query: "Ikom" },
    ],
    perks: [
      "Official Ranger & Bureau Escorts Included",
      "Zero Unauthorized Tout Solicitation Risk",
      "All-Weather 4WD Mountain Transit Coordination",
      "Standardized State Ecotourism Tariff"
    ],
    actionText: "Explore All Eco-Sites & Heritage",
  },
  "dining-nightlife": {
    id: "dining-nightlife",
    label: "Dining & Nightlife",
    tagline: "Authentic Efik Culinary Heritage, River Catfish & VIP City Lounges",
    icon: Utensils,
    badgeText: "Culinary Guild Verified",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    accentColor: "text-amber-500",
    bgAccent: "from-amber-500/5 to-transparent",
    corridors: [
      { name: "Marian Road Food Strip", desc: "Kilishi, authentic point & kill, grills & nightlife", query: "Marian" },
      { name: "Marina Waterfront Promenade", desc: "Fresh catfish, river view cocktails & breeze", query: "Marina" },
      { name: "State Housing Executive Dining", desc: "Upscale continental restaurants & VIP lounges", query: "State Housing" },
      { name: "Atekong Drive Gourmet", desc: "Famous traditional Edikang Ikong & Afang masters", query: "Atekong" },
      { name: "Calabar Road Street Delicacies", desc: "Freshly roasted plantain, suya & local spices", query: "Calabar Road" },
      { name: "Federal Housing Food Hub", desc: "Quick-service eateries & family dinner spots", query: "Federal Housing" },
    ],
    perks: [
      "Interactive Real-Time GPS Directions",
      "Verified Hygiene & Hospitality Standards",
      "Escrow Meal & Table Reservation Passes",
      "Standardized Transparent Street Pricing"
    ],
    actionText: "Open Calabar Dining Map Guide",
  },
  "trade-expo": {
    id: "trade-expo",
    label: "Trade & Expo Hub",
    tagline: "Ministry of Commerce Approved B2B Delegation, Industrial & Convention Passes",
    icon: Briefcase,
    badgeText: "Ministry of Commerce Backed",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    accentColor: "text-stateCyan",
    bgAccent: "from-cyan-500/5 to-transparent",
    corridors: [
      { name: "CICC International Conventions", desc: "Summit halls, plenary pavilions & trade fairs", query: "CICC" },
      { name: "Calabar Free Trade Zone (CFTZ)", desc: "Export processing, manufacturing & tax-free zones", query: "Free Trade Zone" },
      { name: "Agricultural Commodity Exchange", desc: "Cocoa, oil palm, timber & cashew trade desks", query: "Agriculture" },
      { name: "Cross River SME B2B Network", desc: "Accredited local producers, artisans & vendors", query: "SME" },
      { name: "Tinapa Wholesale Emporiums", desc: "Commercial container freight & wholesale goods", query: "Tinapa" },
      { name: "Maritime Port & River Logistics", desc: "Calabar seaport freight & Atlantic corridor trade", query: "Maritime" },
    ],
    perks: [
      "Fast-Track Executive Registration Badges",
      "100% Escrow Exhibition Booth Settlement",
      "Official Chamber of Commerce Delegation Escort",
      "Verified Corporate Invoice & Tax Compliance"
    ],
    actionText: "View Trade & Commercial Passes",
  },
  "carnival-culture": {
    id: "carnival-culture",
    label: "Carnival & Culture",
    tagline: "Africa's Biggest Street Party, Band Secretariats & Ancient Cultural Festivals",
    icon: Flame,
    badgeText: "Carnival Commission Clearinghouse",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    accentColor: "text-rose-500",
    bgAccent: "from-rose-500/5 to-transparent",
    corridors: [
      { name: "Passion 4 Band Secretariat", desc: "The Green & Gold Champions (State Housing)", query: "Passion 4" },
      { name: "Seagull Band Secretariat", desc: "The Patriotic Red & Gold Royalty", query: "Seagull" },
      { name: "Masta Blasta Band", desc: "The Orange Family Energy Giant", query: "Masta Blasta" },
      { name: "Calabar 12km Carnival Route", desc: "Mary Slessor, Marian Road to Stadium arena", query: "Route" },
      { name: "Leboku New Yam Festival (Ugep)", desc: "Sacred ancestral rites, dances & maidens", query: "Leboku" },
      { name: "Bikers & Calasvegas Parade", desc: "High-octane superbike stunts & musical shows", query: "Bikers" },
    ],
    perks: [
      "100% Genuine RFID Wristband Guarantee",
      "Zero Counterfeits or Street Scalper Gouging",
      "Direct Band Secretariat Authorized Collection",
      "VIP Stadium Box & Adjudication Stand Access"
    ],
    actionText: "Explore Carnival & Cultural Passes",
  }
};

export default function CategoryMegaMenu({
  activeCategory,
  isOpen,
  onClose,
  onSelectCategory,
  onSelectCorridor
}) {
  const menuRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close when clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        // Only close if not clicking an element with the mega-menu-trigger attribute
        if (!e.target.closest("[data-mega-trigger]")) {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !activeCategory || !CATEGORY_DETAILS[activeCategory]) {
    return null;
  }

  const details = CATEGORY_DETAILS[activeCategory];
  const Icon = details.icon;

  const handleCorridorClick = (corridor) => {
    if (onSelectCorridor) {
      onSelectCorridor(details.id, corridor.query || corridor.name);
    } else if (onSelectCategory) {
      onSelectCategory(details.id);
    }
    onClose();
  };

  const handleExploreAll = () => {
    if (onSelectCategory) {
      onSelectCategory(details.id);
    }
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      role="region"
      aria-label={`${details.label} Category Mega Menu`}
      className="absolute top-full left-0 right-0 z-50 bg-white/95 dark:bg-[#0c121e]/98 backdrop-blur-2xl border-b border-slate-200/90 dark:border-slate-800 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto overscroll-contain"
    >
      {/* Decorative Brand Top Glow Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-stateBlue via-stateCyan to-stateGreen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Row: Title, Tagline, Escrow Protection Badge & Close Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-stateCyan/10 dark:bg-stateCyan/15 text-stateCyan flex items-center justify-center shrink-0 border border-stateCyan/25 shadow-sm">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                  {details.label}
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${details.badgeColor}`}>
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{details.badgeText}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
                {details.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={handleExploreAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-tight text-white bg-stateCyan hover:bg-sky-500 shadow-md shadow-stateCyan/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{details.actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close mega menu"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mega Menu Body: 2 Columns (Booking.com style: Popular Corridors & Verification Perks) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Column 1: Featured Corridors & Notable Destinations (8 Columns) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stateCyan" />
                Featured Corridors & Priority Locations
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">
                Click any corridor to filter instantly
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {details.corridors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCorridorClick(c)}
                  className="group p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-850 hover:border-stateCyan/50 dark:hover:border-stateCyan/50 text-left transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-stateCyan transition-colors">
                        {c.name}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-stateCyan group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                      {c.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: State Trust & Escrow Guarantee (4 Columns) */}
          <div className="lg:col-span-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Cross River Escrow Guarantee
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Official Buyer Protection Framework
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 my-4">
                {details.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-2">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Verified 365 Days a Year</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Zero Touts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

