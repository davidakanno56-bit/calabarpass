import React, { useState } from "react";
import PackageCard from "./PackageCard.jsx";
import { ShieldCheck, Filter, Sparkles } from "lucide-react";

export default function PackageList({ packages, onSelectPackage, onOpenConcierge }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Carnival Band", "VIP Experience", "Eco-Tourism", "Cultural Heritage"];

  const filteredPackages = selectedCategory === "All"
    ? packages
    : packages.filter(p => p.category === selectedCategory);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official 2026 Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Verified Carnival & Cross River Packages
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Each package is directly accredited by the Cross River State Tourism Bureau. Your payment is held in escrow until you physically inspect your pass or arrive at the destination.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black shadow-gold-glow"
                  : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {filteredPackages.map(pkg => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onSelectPackage={onSelectPackage}
          />
        ))}
      </div>

      {/* Escrow Mechanism Callout Banner */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Cross River Tourism Escrow Protocol</span>
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              Not sure which Carnival band or itinerary fits your schedule?
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
              Our AI Concierge can calculate your 3-day budget, check peak December surge rates on hotels along Marian Road, and verify legitimate ticket sellers.
            </p>
          </div>

          <button
            onClick={onOpenConcierge}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI Concierge</span>
          </button>
        </div>
      </div>
    </section>
  );
}
