import React from "react";
import { useCurrency } from "../context/CurrencyContext.tsx";
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Compass, 
  Mountain, 
  Waves, 
  Landmark, 
  Trees, 
  Flame, 
  Navigation, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.tsx";

export const DESTINATIONS = [
  {
    id: "dest-obudu",
    packageId: "pkg-obudu-expedition",
    name: "Obudu Mountain Resort",
    location: "Obanliku LGA, Cross River State",
    category: "Highland Sanctuary",
    tagline: "Plateau Cable Car & Misty Cloud Forests",
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
    description: "Africa's iconic plateau cable car ascending through cloud forests, suspended canopy walkways, Holy Mountain peaks, and a refreshing temperate climate at 1,576 meters altitude.",
    highlights: ["1,576m Altitude", "Africa's Longest Cable Car", "Canopy Walkway", "Holy Mountain Trail"],
    verifiedVendor: "Obudu Highland Tours & Rangers"
  },
  {
    id: "dest-agbokim",
    packageId: "pkg-agbokim-waterfalls",
    name: "Agbokim Waterfalls",
    location: "Ikom LGA, Cross River State",
    category: "Eco-Wonder",
    tagline: "Seven Terraced Cascades & Iridescent Rainbow Mist",
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
    description: "A monumental seven-stream waterfall thundering over terraced limestone bluffs into pristine tropical rainforest, veiled in perpetual rainbow mist and emerald moss.",
    highlights: ["7 Terraced Streams", "Perpetual Rainbow Mist", "Ancient Rainforest Trails", "Ranger Escort"],
    verifiedVendor: "Ikom Ecotourism Guides Cooperative"
  },
  {
    id: "dest-marina",
    packageId: "pkg-marina-cruise",
    name: "Marina Resort & Waterfront",
    location: "Calabar Waterfront, Calabar",
    category: "Heritage & Waterfront",
    tagline: "Historic Calabar River & Slave History Museum",
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
    description: "Scenic promenade overlooking the historic Calabar River, featuring sunset river catamaran cruises, the solemn Slave History Museum audiovisual archive, and seaside dining.",
    highlights: ["Sunset River Cruises", "Slave History Museum", "Promenade Dining", "Efik Cultural Arts"],
    verifiedVendor: "Marina Resort & Waterway Bureau"
  },
  {
    id: "dest-drill-ranch",
    packageId: "pkg-drill-ranch",
    name: "Drill Monkey Sanctuary",
    location: "Afi Mountain Reserve, Boki LGA",
    category: "Wildlife Sanctuary",
    tagline: "Primate Conservation & Virgin Rainforest Trek",
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
    description: "Globally acclaimed sanctuary dedicated to protecting the endangered African drill monkey and orphaned chimpanzees amidst the dense canopy of Afi Mountain Wildlife Sanctuary.",
    highlights: ["Endangered Drill Primates", "Afi Canopy Trek", "Pandrillus Conservation", "Virgin Cloud Forest"],
    verifiedVendor: "Afi Drill Monkey Sanctuary"
  },
  {
    id: "dest-carnival",
    packageId: "pkg-seagull-pass",
    name: "Carnival Calabar",
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
    description: "The premier cultural festival in Africa. A 12-kilometer street parade of vibrant masquerades, five competitive bands, pulsating West African rhythms, and world-class costume craftsmanship.",
    highlights: ["12km Street Pageant", "Official Band Kits", "VIP Grandstand Access", "Escort Protocols"],
    verifiedVendor: "Seagull Band Secretariat"
  }
];

export default function VerifiedDestinations({ packages = [], onViewPackage }) {
  const { formatPrice } = useCurrency();
  const safePackages = Array.isArray(packages) ? packages : [];
  const safeDestinations = Array.isArray(DESTINATIONS) ? DESTINATIONS : [];

  const handleDestinationClick = (dest) => {
    if (!dest) return;
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
    <section id="verified-cross-river" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cr-forest/10 dark:bg-cr-forest/20 border border-cr-forest/30 text-cr-forest dark:text-cr-lagoon text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-cr-forest dark:text-cr-lagoon" />
            <span>Iconic Destinations of Cross River State</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white leading-[1.15]">
            Where Wonder Awaits. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cr-forest via-cr-lagoon to-emerald-400">
              Legendary Landscapes & Living Heritage.
            </span>
          </h2>
          
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            From the cloud-veiled peaks of the Obudu Plateau to seven-terraced rainforest waterfalls and the historic Calabar River waterfront—explore authentic destinations safeguarded with verified tariffs and direct escrow protection.
          </p>
        </div>

        {/* Verification Counter Badge */}
        <div className="flex items-center gap-3 self-start lg:self-auto bg-white dark:bg-slate-900/90 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cr-forest/10 dark:bg-cr-forest/20 text-cr-forest dark:text-cr-lagoon text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-cr-forest dark:text-cr-lagoon" />
            <span>5 Verified Destinations</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 pr-2 font-medium hidden sm:inline">
            Direct Bureau & Cooperative Partners
          </span>
        </div>
      </div>

      {/* Featured Destination Bento/Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Primary Hero Card: Obudu Mountain Resort (Takes 7 columns on desktop) */}
        {safeDestinations[0] && (
          <div 
            onClick={() => handleDestinationClick(safeDestinations[0])}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border border-slate-200/40 dark:border-slate-800/80 luxury-card-hover shadow-xl min-h-[460px] sm:min-h-[520px] flex flex-col justify-between"
          >
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <VerifiedImage
                item={safeDestinations[0]}
                src={safeDestinations[0].image || safeDestinations[0].imageUrl}
                alt={safeDestinations[0].name}
                aspectRatio="h-full"
                rounded="rounded-none"
                showBadge={false}
                showAttribution={false}
                allowGallery={false}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20 pointer-events-none" />
            </div>

            {/* Top Badges */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-3 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cr-lagoon border border-cr-lagoon/30 shadow-lg">
                <Mountain className="w-3.5 h-3.5 text-cr-lagoon" />
                <span>{safeDestinations[0].category}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-cr-forest/90 backdrop-blur-md text-white border border-cr-forest/40 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-cr-lagoon" />
                <span>Verified Sanctuary</span>
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-cr-lagoon">
                  <MapPin className="w-4 h-4 text-cr-lagoon shrink-0" />
                  <span>{safeDestinations[0].location}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight group-hover:text-cr-lagoon transition-colors duration-300">
                  {safeDestinations[0].name}
                </h3>
                <p className="text-sm sm:text-base text-slate-200 line-clamp-2 max-w-xl font-light leading-relaxed">
                  {safeDestinations[0].description}
                </p>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pt-1">
                {safeDestinations[0].highlights?.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 backdrop-blur-md text-white border border-white/15"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Action & Tariff */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-300">Verified Budget</div>
                  <div className="text-xl font-black font-heading text-white">
                    {safeDestinations[0].priceRaw ? `From ${formatPrice(safeDestinations[0].priceRaw)} / person` : safeDestinations[0].priceIndicator}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${safeDestinations[0].name} ${safeDestinations[0].location}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer"
                    title="View on Google Maps"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDestinationClick(safeDestinations[0])}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-cr-forest hover:bg-cr-tropical text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cr-forest/30 transition-all cursor-pointer group-hover:bg-cr-lagoon group-hover:text-slate-950"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Card: Agbokim Waterfalls (Takes 5 columns on desktop) */}
        {safeDestinations[1] && (
          <div 
            onClick={() => handleDestinationClick(safeDestinations[1])}
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border border-slate-200/40 dark:border-slate-800/80 luxury-card-hover shadow-xl min-h-[460px] sm:min-h-[520px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 overflow-hidden">
              <VerifiedImage
                item={safeDestinations[1]}
                src={safeDestinations[1].image || safeDestinations[1].imageUrl}
                alt={safeDestinations[1].name}
                aspectRatio="h-full"
                rounded="rounded-none"
                showBadge={false}
                showAttribution={false}
                allowGallery={false}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20 pointer-events-none" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-3 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-emerald-300 border border-emerald-400/30 shadow-lg">
                <Waves className="w-3.5 h-3.5 text-emerald-400" />
                <span>{safeDestinations[1].category}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-cr-forest/90 backdrop-blur-md text-white border border-cr-forest/40 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-cr-lagoon" />
                <span>Nature Wonder</span>
              </span>
            </div>

            <div className="relative z-10 p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{safeDestinations[1].location}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
                  {safeDestinations[1].name}
                </h3>
                <p className="text-sm text-slate-200 line-clamp-2 font-light leading-relaxed">
                  {safeDestinations[1].description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {safeDestinations[1].highlights?.slice(0, 3).map((h, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 backdrop-blur-md text-white border border-white/15"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-300">Verified Budget</div>
                  <div className="text-lg font-black font-heading text-white">
                    {safeDestinations[1].priceRaw ? `From ${formatPrice(safeDestinations[1].priceRaw)} / person` : safeDestinations[1].priceIndicator}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDestinationClick(safeDestinations[1])}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cr-forest hover:bg-cr-tropical text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cr-forest/30 transition-all cursor-pointer group-hover:bg-emerald-400 group-hover:text-slate-950"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Third Row: 3 Editorial Cards (Marina, Drill Ranch, Carnival) */}
        {safeDestinations.slice(2).map((dest) => {
          const IconComp = dest.icon || Landmark;
          return (
            <div
              key={dest.id}
              onClick={() => handleDestinationClick(dest)}
              className="lg:col-span-4 group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border border-slate-200/40 dark:border-slate-800/80 luxury-card-hover shadow-xl min-h-[420px] flex flex-col justify-between"
            >
              <div className="absolute inset-0 overflow-hidden">
                <VerifiedImage
                  item={dest}
                  src={dest.image || dest.imageUrl}
                  alt={dest.name}
                  aspectRatio="h-full"
                  rounded="rounded-none"
                  showBadge={false}
                  showAttribution={false}
                  allowGallery={false}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/25 pointer-events-none" />
              </div>

              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                  <IconComp className="w-3.5 h-3.5 text-cr-lagoon" />
                  <span>{dest.category}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cr-forest/90 backdrop-blur-md text-white border border-cr-forest/40 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-cr-lagoon" />
                  <span>Verified</span>
                </span>
              </div>

              <div className="relative z-10 p-5 sm:p-6 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cr-lagoon">
                    <MapPin className="w-3.5 h-3.5 text-cr-lagoon shrink-0" />
                    <span className="truncate">{dest.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight group-hover:text-cr-lagoon transition-colors duration-300">
                    {dest.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-light leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Tariff</div>
                    <div className="text-base font-extrabold font-heading text-white">
                      {dest.priceRaw ? `From ${formatPrice(dest.priceRaw)}` : dest.priceIndicator}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDestinationClick(dest)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cr-forest hover:bg-cr-tropical text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer group-hover:bg-cr-lagoon group-hover:text-slate-950"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
