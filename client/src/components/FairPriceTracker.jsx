import React, { useState, useEffect } from "react";
import { ShieldCheck, TrendingUp, AlertTriangle, Search, Filter, ShieldAlert } from "lucide-react";

export default function FairPriceTracker() {
  const [fairPrices, setFairPrices] = useState([]);
  const [scamAdvisories, setScamAdvisories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetch("/api/fair-prices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFairPrices(data.fairPrices || []);
          setScamAdvisories(data.scamAdvisories || []);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ["All", "Transport & Logistics", "Accommodation", "Carnival & Bands", "Culinary & Dining", "Waterfront & Eco"];

  const filteredPrices = fairPrices.filter((item) => {
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const matchesQuery = item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.redFlagWarning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cross River State Fair-Price Index</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          December Surge Predictor & Anti-Scam Shield
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Compare verified baseline prices against peak December surge price gouging and avoid street scalper fraud across Calabar.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search e.g. Airport cab, Suya, Hotel..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? "bg-amber-500 text-black font-bold shadow-gold-glow"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fair Price Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {filteredPrices.map((item, index) => (
          <div
            key={index}
            className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                  {item.category}
                </span>
                <span className="text-xs font-extrabold text-rose-400 bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                  Peak Surge {item.surgePercentage}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white font-heading mb-4">
                {item.item}
              </h4>

              {/* Price comparison box */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Fair Price</span>
                  </div>
                  <div className="text-base font-extrabold text-emerald-300 mt-0.5">
                    {item.fairRange}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Street Surge Gouge</span>
                  </div>
                  <div className="text-base font-extrabold text-rose-300 mt-0.5">
                    {item.decemberSurge}
                  </div>
                </div>
              </div>
            </div>

            {/* Red flag notice */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Scam Red Flag: </span>
                <span>{item.redFlagWarning}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Major Anti-Scam Directives Section */}
      <div className="max-w-5xl mx-auto pt-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold font-heading text-white">
            Official Calabar Carnival Anti-Fraud Directives
          </h3>
          <p className="text-xs text-slate-400 mt-1">Direct alerts issued by the Cross River State Tourism Bureau</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scamAdvisories.map((advisory, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#121826] border border-rose-500/30 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{advisory.severity} RISK</span>
                  </span>
                  <span className="text-[11px] text-slate-400">{advisory.route}</span>
                </div>
                <div className="font-bold text-sm text-white">{advisory.title}</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{advisory.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-emerald-300">
                🛡️ <strong>Rule:</strong> {advisory.protectionRule}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
