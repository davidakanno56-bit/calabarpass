import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  UtensilsCrossed, 
  Sparkles, 
  Check, 
  Search, 
  Lock 
} from "lucide-react";

export const VERIFIED_LISTINGS = [
  // 7 Verified Executive & Boutique Hotels
  {
    id: "transcorp-calabar",
    name: "Transcorp Hotels Calabar",
    category: "Executive Hotels",
    corridor: "Murtala Mohammed Highway",
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
    corridor: "State Housing Corridor",
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
    corridor: "MCC Road",
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
    corridor: "Highway Central",
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
    corridor: "Off Marian Road",
    price: 40000,
    rating: 4.4,
    reviews: 52,
    badge: "Trendy Boutique",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    amenities: ["Cocktail Lounge", "High-Speed WiFi", "24/7 Power", "Modern Interior"],
    description: "Steps away from Marian Road’s legendary nightlife and authentic Calabar street cuisine."
  },
  {
    id: "tinapa-lakeside",
    name: "Tinapa Lakeside Hotel",
    category: "Boutique & Resorts",
    corridor: "Tinapa Free Zone",
    price: 55000,
    rating: 4.2,
    reviews: 89,
    badge: "Waterfront Resort",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    amenities: ["Lake Views", "Waterpark Access", "Serene Nature", "Conferencing"],
    description: "Picturesque waterfront resort with lush forest views and full resort amenities."
  },

  // 5 Verified Dining & Nightlife Passes
  {
    id: "the-arena",
    name: "The Arena Lounge & Sports Bar",
    category: "Dining & Lounges",
    corridor: "Marian Road",
    price: 12000,
    rating: 4.8,
    reviews: 210,
    badge: "VIP Dining Pass",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    amenities: ["VIP Table", "Live DJ", "Signature Grills", "Priority Entry"],
    description: "Fixed food & cocktail pass. Skip the rush with guaranteed VIP seating during festival peak."
  },
  {
    id: "supreme-viking",
    name: "Supreme Viking Restaurant",
    category: "Dining & Lounges",
    corridor: "Murtala Mohammed Highway",
    price: 8500,
    rating: 4.6,
    reviews: 135,
    badge: "Authentic Calabar Cuisine",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    amenities: ["Fresh Fishermans Soup", "Afang Special", "AC Dining", "Takeaway Option"],
    description: "The gold standard for world-famous Calabar dishes prepared with morning fresh catches."
  },
  {
    id: "marina-seafood",
    name: "Marina Resort Waterfront Seafood",
    category: "Dining & Lounges",
    corridor: "Marina Waterfront",
    price: 15000,
    rating: 4.7,
    reviews: 178,
    badge: "Waterfront Dining",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    amenities: ["River View Deck", "Grilled Jumbo Prawns", "Sunset Ambience", "Cocktail Bar"],
    description: "Scenic waterfront open-air dining along the Calabar River with signature spiced fish platters."
  },
  {
    id: "bogobiri-suya",
    name: "Bogobiri Suya Hub & Asun Spot",
    category: "Dining & Lounges",
    corridor: "Bogobiri Quarter",
    price: 4000,
    rating: 4.9,
    reviews: 320,
    badge: "Legendary Street Grill",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    amenities: ["Boneless Beef Suya", "Masa & Spices", "Express Pickup", "Certified Hygiene"],
    description: "Guaranteed authentic Northern grilled suya credit with express counter pickup."
  },
  {
    id: "freddies-calabar",
    name: "Freddie's Continental & Wine Bar",
    category: "Dining & Lounges",
    corridor: "State Housing Estate",
    price: 18000,
    rating: 4.7,
    reviews: 88,
    badge: "Chef's Tasting Voucher",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    amenities: ["Imported Wines", "Continental Cuts", "Jazz Nights", "Private Booths"],
    description: "Intimate fine dining and wine cellar experience in the heart of State Housing."
  }
];

export default function AccommodationsView({ onBookHotel }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Executive Hotels", "Boutique & Resorts", "Dining & Lounges"];

  const filteredListings = VERIFIED_LISTINGS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.corridor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
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
          Calabar Premier Stays & Dining Passes
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl">
          Verified executive hotels, boutique resorts, and premium dining vouchers across Murtala Mohammed Highway, State Housing Estate, MCC Road, and Marian. All payments remain locked in the <span className="text-amber-400 font-semibold">CalabarPass Anti-Fraud Escrow Vault</span> until physical redemption.
        </p>

        {/* Protection Banner */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏨</span>
            <div className="text-xs sm:text-sm text-slate-300">
              <span className="font-bold text-emerald-400">Zero-Risk Escrow Guarantee:</span> Disbursements occur only after you arrive on-site and present your private 6-digit PIN at the counter.
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
            placeholder="Search hotel, restaurant, or corridor..."
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
              {cat === "All" ? `All Listings (${VERIFIED_LISTINGS.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 shadow-lg"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-bold text-amber-400">
                {item.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {item.corridor}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Amenities / Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {item.category === "Dining & Lounges" ? "Voucher Credit" : "Per Night"}
                  </span>
                  <span className="text-xl font-extrabold text-amber-400">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onBookHotel && onBookHotel(item)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Lock In Escrow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}