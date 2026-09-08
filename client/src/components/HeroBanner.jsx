import React from "react";
import { Shield, Sparkles, Lock, ArrowRight, CheckCircle, AlertTriangle, Key } from "lucide-react";

export default function HeroBanner({ setActiveTab, escrowStats }) {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-18">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-emerald-500/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill Alert */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 shadow-gold-glow animate-pulse-slow">
            <span className="text-base">✨</span>
            <span>Carnival Calabar 2026 Official Tourism Escrow Gateway</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-emerald-400 font-semibold">Zero Counterfeits Guarantee</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-tight text-white mb-6">
            Experience Calabar With <br className="hidden sm:block" />
            <span className="carnival-gradient-text">Guaranteed Fair Prices</span> & Escrow
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Avoid December surge gouging and black-market fake ticket rings. Book verified carnival band costumes, VIP stadium stands, and eco-expeditions with funds safely locked in escrow until you physically inspect your pass in Calabar.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("packages")}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-base shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Verified Packages</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab("concierge")}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 hover:border-amber-500/50 transition-all"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Ask Carnival AI Concierge</span>
            </button>
          </div>

          {/* Escrow Protection Proof Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl text-left border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Shield className="w-4 h-4" />
                <span>Anti-Scam Vault</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-white">₦0 Upfront</div>
              <p className="text-xs text-slate-400 mt-0.5">Vendors get paid only upon physical check-in</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-left border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Key className="w-4 h-4" />
                <span>6-Digit PIN</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-white">Secret Code</div>
              <p className="text-xs text-slate-400 mt-0.5">Physical voucher verification on Marian Road</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-left border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>Fair Pricing</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-white">Save Up To 45%</div>
              <p className="text-xs text-slate-400 mt-0.5">Direct price cap against scalper extortion</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-left border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Lock className="w-4 h-4" />
                <span>Paystack Live</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-white">Bank Grade</div>
              <p className="text-xs text-slate-400 mt-0.5">Encrypted card & bank transfer checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
