import React, { useState, useMemo } from "react";
import HotelCard from "./HotelCard.jsx";
import { HOTELS } from "../data/hotels.js";
import { ShieldCheck, Search, Building, Sparkles, Filter, Lock, CheckCircle2, BedDouble } from "lucide-react";

export default function AccommodationsView({ onBookHotel }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Stays (5)");

  const categories = useMemo(() => {
    return [
      "All Stays (5)",
      "Executive Hotels",
      "Boutique & Resorts",
      "Serviced Apartments"
    ];
  }, []);

  const filteredHotels = useMemo(() => {
    return HOTELS.filter((hotel) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === "Executive Hotels") {
        matchesCategory =
          hotel.id === "hotel-01" ||
          hotel.id === "hotel-03" ||
          hotel.category.toLowerCase().includes("landmark") ||
          hotel.category.toLowerCase().includes("executive hotel") ||
          hotel.name.includes("Transcorp");
      } else if (selectedCategory === "Boutique & Resorts") {
        matchesCategory =
          hotel.id === "hotel-02" ||
          hotel.id === "hotel-03" ||
          hotel.id === "hotel-04" ||
          hotel.category.toLowerCase().includes("boutique") ||
          hotel.category.toLowerCase().includes("resort");
      } else if (selectedCategory === "Serviced Apartments") {
        matchesCategory =
          hotel.id === "hotel-05" ||
          hotel.category.toLowerCase().includes("serviced") ||
          hotel.category.toLowerCase().includes("apartment") ||
          hotel.category.toLowerCase().includes("living");
      }

      // Search query filter (matches name, area, or amenities)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        hotel.name.toLowerCase().includes(q) ||
        hotel.area.toLowerCase().includes(q) ||
        hotel.category.toLowerCase().includes(q) ||
        hotel.amenities.some((a) => a.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>State Bureau Verified Directory • 365 Days</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
            Calabar Premier Executive Stays
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
            5 premier executive destinations across Murtala Muhammed Highway, State Housing Estate, Asari Eso Layout, Parliamentary, and Federal Housing. Every reservation is shielded by the <strong>CalabarPass Anti-Fraud Escrow Vault</strong>.
          </p>
        </div>

        {/* Quick Trust Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0 self-start md:self-auto shadow-emerald-glow">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>100% Escrow Protected Reservation</span>
        </div>
      </div>

      {/* Escrow Guarantee Callout Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/30 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0">
            🏨
          </div>
          <div className="text-xs sm:text-sm text-slate-300">
            <strong className="text-emerald-300 font-bold">Zero-Risk Hotel Booking Guarantee: </strong>
            Room deposits remain locked in the State Escrow Vault. Hotels receive disbursement only when you arrive on-site and present your private <strong>6-digit check-in PIN</strong> at the front desk.
          </div>
        </div>

        <div className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 whitespace-nowrap">
          Indicative Rates • Peak Protected
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hotel name, location (e.g. State Housing, Highway), or amenity..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-500"
            />
          </div>

          {/* Results counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 text-slate-400 text-xs font-semibold shrink-0 border border-slate-800">
            <Building className="w-4 h-4 text-amber-400" />
            <span>{filteredHotels.length} Premier Stays Available</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-amber-500 text-black font-bold shadow-gold-glow scale-[1.02]"
                    : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hotels Grid */}
      {filteredHotels.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-3xl border border-slate-800 space-y-3">
          <BedDouble className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No hotels match your search</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or selecting "All" categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onBookHotel={onBookHotel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
