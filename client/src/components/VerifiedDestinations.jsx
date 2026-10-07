import React, { useState } from "react";
import { ShieldCheck, MapPin, ArrowRight, Sparkles, Compass, Eye, Mountain, Waves, Landmark, Trees, Flame } from "lucide-react";

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
    image: "/assets/obudu_mountain.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
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
    image: "/assets/agbokim_waterfalls.jpg",
    fallbackImage: "/images/agbokim.jpg",
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
    image: "/assets/marina_resort.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80",
    fallbackImage: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1200&q=80",
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
    image: "/assets/seagull_band.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description: "The crown jewel of African carnival tourism. 12 kilometers of continuous street masquerade, world-class band costume kits, pulsating rhythms, and stadium grandstands.",
    highlights: ["12km Street Route", "Official Band Costumes", "VIP Truck Access", "Security Escort"],
    verifiedVendor: "Seagull Band Secretariat"
  }
];

export default function VerifiedDestinations({ packages = [], onSelectPackage }) {
  const handleDestinationClick = (dest) => {
    // Match package from loaded packages or fallback
    const matchedPkg = packages.find((p) => p.id === dest.packageId) || {
      id: dest.packageId,
      name: dest.name,
      title: dest.name,
      priceNGN: dest.priceRaw,
      vendor: dest.verifiedVendor,
      location: dest.location,
      details: dest.description,
      image: dest.image,
      imageUrl: dest.image
    };

    if (onSelectPackage) {
      onSelectPackage(matchedPkg);
    }
  };

  return (
    <section id="verified-cross-river" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Cross River Tourism Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
            Explore Verified Cross River
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Discover legendary mountain plateaus, rainforest waterfalls, historic waterways, and vibrant cultural celebrations—all shielded by verified operator credentials and digital vouchers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <span className="px-3 py-1.5 text-emerald-400 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>5 Verified Destinations</span>
          </span>
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {DESTINATIONS.map((dest, index) => {
          const IconComponent = dest.icon;

          return (
            <div
              key={dest.id}
              className={`group rounded-3xl overflow-hidden glass-panel border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-amber-500/10 ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src={dest.image}
                  alt={dest.name}
                  onError={(e) => {
                    if (dest.fallbackImage && e.target.src !== dest.fallbackImage) {
                      e.target.src = dest.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-slate-950/40 to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md text-amber-400 border border-amber-500/40 shadow-lg">
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{dest.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-lg">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{dest.badge}</span>
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{dest.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                      {dest.name}
                    </h3>
                  </div>

                  <p className="text-xs text-amber-400 font-semibold tracking-wide">
                    {dest.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {dest.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900/90 text-slate-400 border border-slate-800"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Estimated Budget
                    </span>
                    <span className="text-base sm:text-lg font-black font-heading text-white">
                      {dest.priceIndicator}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDestinationClick(dest)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-gold-glow hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shrink-0"
                  >
                    <span>View Package</span>
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
