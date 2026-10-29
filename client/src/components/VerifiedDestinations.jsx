import React from "react";
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Eye, 
  Mountain, 
  Waves, 
  Landmark, 
  Trees, 
  Flame, 
  Navigation, 
  ArrowUpRight 
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.jsx";

export const DESTINATIONS = [
  {
    id: "dest-obudu",
    packageId: "pkg-obudu-expedition",
    name: "Obudu Mountain Resort",
    location: "Obanliku LGA, Cross River State",
    category: "Highland Sanctuary",
    tagline: "Plateau Cable Car & Mountain Vista",
    badge: "Verified Highland Sanctuary",
    icon: Mountain,
    priceIndicator: "From ₦85,000 / person",
    priceRaw: 85000,
    placeId: "ChIJOZ8oW4iCWRARmZ-M_dO_5-k",
    image: "/assets/obudu_mountain.jpg",
    imageUrl: "/assets/obudu_mountain.jpg",
    primaryUrl: "/assets/obudu_mountain.jpg",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg/1280px-Obudu_Cattle_Ranch%2C_Hilltop_Lodges%2C_Obudu%2C_Cross_river_state.jpg",
    attribution: "Cross River State Tourism Bureau • Obudu Highland Archive",
    license: "Official Tourism Clearinghouse Asset",
    licenseUrl: "https://calabarpass.ng/licensing/verified-media",
    source: "verified_local",
    description: "Africa's iconic plateau cable car, canopy walkway above tropical cloud forests, Holy Mountain trail, and temperate mountain climate at 1,576m altitude.",
    highlights: ["Cable Car Ride", "Canopy Walkway", "Temperate Climate", "Ranger Escort"],
    verifiedVendor: "Obudu Highland Tours & Rangers"
  },
  {
    id: "dest-agbokim",
    packageId: "pkg-agbokim-waterfalls",
    name: "Agbokim Waterfalls",
    location: "Ikom LGA, Cross River State",
    category: "Eco-Wonder",
    tagline: "Seven Terraced Cascades & Rainbow Mist",
    badge: "Verified Nature Wonder",
    icon: Waves,
    priceIndicator: "From ₦25,000 / person",
    priceRaw: 25000,
    placeId: "ChIJb_f8mPuhWRARn0Xq9RkW93w",
    image: "/assets/agbokim_waterfalls.jpg",
    imageUrl: "/assets/agbokim_waterfalls.jpg",
    primaryUrl: "/assets/agbokim_waterfalls.jpg",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Agbokim_waterfalls.jpg/1280px-Agbokim_waterfalls.jpg",
    attribution: "MuaMee / Wikimedia Commons (Agbokim Waterfalls)",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    description: "Spectacular seven-stream waterfall cascading into lush tropical rainforest. Renowned for its misty iridescent rainbows, stone trails, and biodiversity.",
    highlights: ["7 Terraced Cascades", "Rainbow Basin", "Canopy Trail", "Guided Transit"],
    verifiedVendor: "Ikom Ecotourism Guides Cooperative"
  },
  {
    id: "dest-marina",
    packageId: "pkg-marina-cruise",
    name: "Marina Resort",
    location: "Calabar Waterfront, Calabar",
    category: "Heritage & Waterfront",
    tagline: "Calabar River Cruise & Slave History",
    badge: "Verified Heritage Site",
    icon: Landmark,
    priceIndicator: "From ₦25,000 / person",
    priceRaw: 25000,
    placeId: "ChIJZ3qXoO2iWRAReO4n5i6Xz5E",
    image: "/assets/marina_resort.jpg",
    imageUrl: "/assets/marina_resort.jpg",
    primaryUrl: "/assets/marina_resort.jpg",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nigeria_Calabar_Port_11.81.jpg/1280px-Nigeria_Calabar_Port_11.81.jpg",
    attribution: "Marina Resort & Waterway Bureau Archive",
    license: "State Clearinghouse On-Site Verified Asset",
    licenseUrl: "https://calabarpass.ng/licensing/verified-media",
    source: "verified_local",
    description: "Waterfront catamaran cruises on the historic Calabar River, the solemn Slave History Museum audiovisual gallery, and authentic Efik cultural culinary arts.",
    highlights: ["Riverboat Cruise", "Slave History Museum", "Waterfront Lounge", "Efik Heritage"],
    verifiedVendor: "Marina Resort & Waterway Bureau"
  },
  {
    id: "dest-drill-ranch",
    packageId: "pkg-drill-ranch",
    name: "Drill Monkey Ranch",
    location: "Afi Mountain Reserve, Boki LGA",
    category: "Wildlife Sanctuary",
    tagline: "Primate Conservation & Canopy Trek",
    badge: "Verified Wildlife Sanctuary",
    icon: Trees,
    priceIndicator: "From ₦45,000 / person",
    priceRaw: 45000,
    placeId: "ChIJPw0qS9uhWRAR9WzUu3sMv-8",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
    primaryUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Drill_Monkey.jpg/1280px-Drill_Monkey.jpg",
    attribution: "Dotun55 / Wikimedia Commons (Pandrillus Calabar)",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "wikimedia_commons",
    description: "World-renowned sanctuary dedicated to saving the endangered African drill primate and chimpanzees. Experience canopy treks over virgin rainforest with wildlife rangers.",
    highlights: ["Drill & Chimp Sanctuary", "Afi Canopy Walkway", "Pandrillus Conservation", "Native Rainforest"],
    verifiedVendor: "Afi Drill Monkey Sanctuary"
  },
  {
    id: "dest-carnival",
    packageId: "pkg-seagull-pass",
    name: "Calabar Carnival",
    location: "Marian Road & Stadium Route, Calabar",
    category: "Cultural Pageantry",
    tagline: "Africa's Biggest Street Party",
    badge: "Verified Cultural Event",
    icon: Flame,
    priceIndicator: "From ₦85,000 / pass",
    priceRaw: 85000,
    placeId: "ChIJ276fV3mhWRAR66m-x03w7u8",
    image: "/assets/seagull_band.jpg",
    imageUrl: "/assets/seagull_band.jpg",
    primaryUrl: "/assets/seagull_band.jpg",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Calabar_carnival_1.jpg/1280px-Calabar_carnival_1.jpg",
    attribution: "Seagull Band Secretariat / Carnival Calabar Archives",
    license: "Official Secretariat Media Agreement",
    licenseUrl: "https://calabarpass.ng/licensing/seagull-band",
    source: "verified_local",
    description: "The crown jewel of African carnival tourism. 12 kilometers of continuous street masquerade, world-class band costume kits, pulsating rhythms, and stadium grandstands.",
    highlights: ["12km Street Route", "Official Band Costumes", "VIP Truck Access", "Security Escort"],
    verifiedVendor: "Seagull Band Secretariat"
  }
];

export default function VerifiedDestinations({ packages = [], onViewPackage }) {
  const { formatPrice } = useCurrency();
  const safePackages = Array.isArray(packages) ? packages : [];
  const safeDestinations = Array.isArray(DESTINATIONS) ? DESTINATIONS : [];

  const handleDestinationClick = (dest) => {
    if (!dest) return;
    // Match package from loaded packages or fallback safely with optional chaining
    const matchedPkg = safePackages.find((p) => p?.id === dest?.packageId) || {
      id: dest.packageId || dest.id,
      name: dest.name || "Eco-Site Destination",
      title: dest.name || "Eco-Site Destination",
      priceNGN: dest.priceRaw || 0,
      vendor: dest.verifiedVendor || "Cross River Ecotourism Bureau",
      location: dest.location || "Cross River State",
      details: dest.description || dest.tagline || "",
      image: dest.image || dest.imageUrl || "/assets/obudu_mountain.jpg",
      imageUrl: dest.imageUrl || dest.image || "/assets/obudu_mountain.jpg"
    };

    if (onViewPackage) {
      onViewPackage(matchedPkg);
    }
  };

  return (
    <section id="verified-cross-river" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stateCyan/10 border border-stateCyan/30 text-stateCyan text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-stateCyan" />
            <span>Cross River Tourism Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-heading text-slate-900 dark:text-white">
            Explore Verified Cross River
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Discover legendary mountain plateaus, rainforest waterfalls, historic waterways, and vibrant cultural celebrations—all shielded by verified operator credentials and digital vouchers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-white dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-sm">
          <span className="px-3 py-1.5 text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>5 Verified Destinations</span>
          </span>
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {safeDestinations.map((dest, index) => {
          if (!dest) return null;
          const IconComponent = dest.icon || Trees;
          const highlights = Array.isArray(dest.highlights) ? dest.highlights : [];

          return (
            <div
              key={dest.id}
              className={`group rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-amber-500/10 ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Text-Only Destination Header (Zero Broken Media Frames) */}
              <div className="relative p-6 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 dark:from-emerald-950/40 dark:via-slate-900/90 dark:to-slate-950 flex flex-col justify-between min-h-[9.5rem]">
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-500/40 shadow-sm">
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{dest.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/90 dark:text-emerald-300 dark:border-emerald-500/40 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{dest.badge}</span>
                  </span>
                </div>

                {/* Destination Name & Physical Location */}
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-amber-400 transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-semibold tracking-tight">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">{dest.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white/70 dark:bg-transparent">
                <div className="space-y-2">

                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-tight">
                    {dest.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>

                  {/* Highlights Pills */}
                  {highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {highlights.map((h, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Pricing & CTA */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 block">
                      Estimated Budget
                    </span>
                    <span className="text-base sm:text-lg font-bold tracking-tight font-heading text-slate-900 dark:text-white">
                      {dest.priceRaw ? `From ${formatPrice(dest.priceRaw)} / person` : (dest.priceIndicator || "Standard Tariff")}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${dest?.name || "Eco-Site"} ${dest?.location || "Calabar"}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-stateCyan hover:text-sky-600 dark:hover:text-white text-xs font-semibold tracking-tight border border-stateCyan/30 transition-all cursor-pointer shadow-sm"
                      title={`View ${dest.name} on Google Maps`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Map</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDestinationClick(dest)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-semibold text-xs tracking-tight shadow-md shadow-stateCyan/25 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shrink-0"
                    >
                      <span>View Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
