import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Search, 
  Lock 
} from "lucide-react";

export const VERIFIED_LISTINGS = [
  {
    id: "transcorp-calabar",
    name: "Transcorp Hotels Calabar",
    category: "Executive Hotels",
    corridor: "10 Murtala Mohammed Highway",
    price: 120000,
    rating: 4.8,
    reviews: 142,
    badge: "Luxury Flagship",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["Pool", "24/7 Power", "Fine Dining", "Armed Security"],
    description: "The premier hospitality base for executive delegations and carnival festival VIPs."
  },
  {
    id: "monty-suites",
    name: "Monty Suites Calabar",
    category: "Boutique & Resorts",
    corridor: "Northern Industrial Layout, Behind Zone 6",
    price: 85000,
    rating: 4.7,
    reviews: 98,
    badge: "Premium Boutique",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    amenities: ["Outdoor Pool", "Executive Lounge", "24/7 CCTV", "Breakfast"],
    description: "Quiet luxury in the residential heart of Calabar with top-tier security."
  },
  {
    id: "channel-view",
    name: "Channel View Hotel",
    category: "Executive Hotels",
    corridor: "27/29 MCC Road",
    price: 65000,
    rating: 4.5,
    reviews: 115,
    badge: "Carnival Prime Route",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    amenities: ["Carnival View", "24/7 Electricity", "Event Halls", "Secured Parking"],
    description: "Right on the official carnival procession path with front-row parade viewing."
  },
  {
    id: "mega-hilton",
    name: "Mega Hilton Hotel",
    category: "Executive Hotels",
    corridor: "State Housing Estate",
    price: 50000,
    rating: 4.4,
    reviews: 76,
    badge: "Business & Leisure",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    amenities: ["24/7 Electricity", "Cocktail Bar", "Free WiFi", "Guarded Gate"],
    description: "Affordable luxury nestled in the quiet, green State Housing Estate."
  },
  {
    id: "pyramid-hotel",
    name: "Pyramid Hotel & Suites",
    category: "Boutique & Resorts",
    corridor: "152 Murtala Mohammed Highway",
    price: 45000,
    rating: 4.3,
    reviews: 64,
    badge: "Highway Central",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    amenities: ["Restaurant", "Secure Parking", "Air Conditioning", "24/7 Power"],
    description: "Direct highway access offering quick links to Margaret Ekpo Airport and U.J. Esuene Stadium."
  },
  {
    id: "hotel-45",
    name: "Hotel 45 (Forty-Five)",
    category: "Boutique & Resorts",
    corridor: "45 St. Mary's St, Off Marian Road",
    price: 40000,
    rating: 4.4,
    reviews: 52,
    badge: "Trendy Boutique",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    amenities: ["Cocktail Lounge", "High-Speed WiFi", "24/7 Power", "Modern Interior"],
    description: "Steps away from Marian Road’s vibrant district and festival nightlife."
  },
  {
    id: "tinapa-lakeside",
    name: "Tinapa Lakeside Hotel",
    category: "Boutique & Resorts",
    corridor: "Tinapa Free Zone, Adiabo",
    price: 55000,
    rating: 4.2,
    reviews: 89,
    badge: "Waterfront Resort",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    amenities: ["Lake Views", "Waterpark Access", "Serene Nature", "Conferencing"],
    description: "Picturesque waterfront resort with lush forest views and full resort amenities."
  },
  {
    id: "axari-hotel",
    name: "Axari Hotel & Suites",
    category: "Executive Hotels",
    corridor: "Murtala Mohammed Highway",
    price: 48000,
    rating: 4.3,
    reviews: 58,
    badge: "Executive Comfort",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    amenities: ["Swimming Pool", "Fitness Center", "Conference Hall", "24/7 Power"],
    description: "Centrally located on Murtala Mohammed Highway with executive rooms and private meeting spaces."
  }
];

export default function AccommodationsView({ onBookHotel }) {
  const [selectedCategory, setSelectedCategory] = useState("All Stays");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All Stays", "Executive Hotels", "Boutique & Resorts"];

  const filteredListings = VERIFIED_LISTINGS.filter((item) => {
    const matchesCategory = selectedCategory === "All Stays" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.corridor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>State Bureau Verified Directory • 365 Days</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Calabar Premier Executive Stays
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl">
          Browse {VERIFIED_LISTINGS.length} verified executive hotels and boutique resorts across Calabar. All payments remain locked in the <span className="text-amber-400 font-semibold">CalabarPass Anti-Fraud Escrow Vault</span> until physical check-in.
        </p>

        {/* Protection Banner */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏨</span>
            <div className="text-xs sm:text-sm text-slate-300">
              <span className="font-bold text-emerald-400">Zero-Risk Escrow Guarantee:</span> Room deposits remain safely locked in escrow until you arrive on-site and present your 6-digit PIN at the front desk.
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold shrink-0 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            100% Escrow Protected
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hotel name or corridor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/60"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat === "All Stays" ? `All Stays (${VERIFIED_LISTINGS.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 8 Hotels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 shadow-lg"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-950/80 border border-slate-700 px-2 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {item.rating.toFixed(1)}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-400/90">
                    <Building2 className="w-3.5 h-3.5" />
                    {item.category}
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white leading-tight">{item.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">From / night</div>
                  <div className="text-lg font-extrabold text-amber-400">₦{item.price.toLocaleString()}</div>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{item.corridor}</span>
              </div>

              <div className="mb-4 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {item.rating.toFixed(1)} ({item.reviews} reviews)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  {item.badge}
                </span>
              </div>

              <p className="text-sm text-slate-400 mb-4 line-clamp-3">{item.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {item.amenities.map((amenity) => (
                  <span
                    key={`${item.id}-${amenity}`}
                    className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 border border-slate-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                <button
                  onClick={() => onBookHotel?.(item)}
                  className="flex-1 rounded-xl bg-amber-500 text-black font-bold py-2.5 text-sm hover:bg-amber-400 transition-colors"
                >
                  Reserve stay
                </button>
                <button
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 hover:border-slate-500 transition-colors"
                  aria-label={`View details for ${item.name}`}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!filteredListings.length && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No stays match your search</h3>
          <p className="text-sm text-slate-400">Try another hotel name or corridor, or switch back to all categories.</p>
        </div>
      )}
    </div>
  );
}