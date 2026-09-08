import React from "react";
import { ShieldCheck, Sparkles, Lock, Compass, Ticket, CheckCircle2 } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, escrowStats }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab("packages")} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-400 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
              <span className="text-2xl">🌴</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight font-heading text-white">
                  Calabar<span className="gold-gradient-text">Pass</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Fair-Price Tourism Escrow & AI Concierge
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("packages")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "packages"
                  ? "bg-amber-500 text-black font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Ticket className="w-4 h-4" />
              Verified Packages
            </button>

            <button
              onClick={() => setActiveTab("concierge")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "concierge"
                  ? "bg-amber-500 text-black font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Concierge
            </button>

            <button
              onClick={() => setActiveTab("shield")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "shield"
                  ? "bg-amber-500 text-black font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Surge & Scam Shield
            </button>

            <button
              onClick={() => setActiveTab("escrow")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "escrow"
                  ? "bg-amber-500 text-black font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Lock className="w-4 h-4" />
              Escrow Vault & Check-In
              {escrowStats?.activeEscrowBookings > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-black text-xs font-bold flex items-center justify-center">
                  {escrowStats.activeEscrowBookings}
                </span>
              )}
            </button>
          </nav>

          {/* Escrow Verification Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-emerald-glow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Verified by Cross River Tourism Escrow</span>
            </div>

            <button
              onClick={() => setActiveTab("escrow")}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm shadow-gold-glow transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Redeem PIN</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800/60 text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === "packages" ? "bg-amber-500 text-black font-bold" : "text-slate-400 bg-slate-900"
            }`}
          >
            Packages
          </button>
          <button
            onClick={() => setActiveTab("concierge")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === "concierge" ? "bg-amber-500 text-black font-bold" : "text-slate-400 bg-slate-900"
            }`}
          >
            AI Concierge
          </button>
          <button
            onClick={() => setActiveTab("shield")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === "shield" ? "bg-amber-500 text-black font-bold" : "text-slate-400 bg-slate-900"
            }`}
          >
            Scam Shield
          </button>
          <button
            onClick={() => setActiveTab("escrow")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === "escrow" ? "bg-amber-500 text-black font-bold" : "text-slate-400 bg-slate-900"
            }`}
          >
            Escrow & PIN
          </button>
        </div>
      </div>
    </header>
  );
}
