import React, { useState, useRef } from "react";
import { Shield, ShieldCheck, Lock, ArrowRight, CheckCircle, Key, QrCode, Cpu, Award, BedDouble } from "lucide-react";
import { HOTELS } from "../data/hotels.js";

export default function HeroBanner({ setActiveTab, escrowStats }) {
  const passRef = useRef(null);
  const [passTilt, setPassTilt] = useState({
    rotX: 0,
    rotY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false
  });

  const handlePassMouseMove = (e) => {
    if (!passRef.current) return;
    const rect = passRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setPassTilt({
      rotX: -normY * 18,
      rotY: normX * 18,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.35,
      isHovered: true
    });
  };

  const handlePassMouseLeave = () => {
    setPassTilt({
      rotX: 0,
      rotY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false
    });
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Bureau Endorsement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-emerald-glow">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cross River State Tourism Bureau • Official 365-Day Escrow Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-[1.15]">
              Experience Cross River State With{" "}
              <span className="gold-gradient-text">Zero Scam Risk</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Cross River State's official 365-day tourism clearinghouse, fair-price directory, and anti-fraud escrow platform. Book Obudu Mountain Resort expeditions, Agbokim Waterfalls canopy walks, Marina Resort river cruises, Drill Monkey Ranch safaris, Leboku New Yam Festival, and Carnival Calabar band kits with zero extortion risk and complete escrow protection.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab("packages");
                  window.scrollTo({ top: 550, behavior: "smooth" });
                }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-base shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Verified Packages</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setActiveTab("accommodations");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 hover:text-emerald-200 font-semibold text-base border border-emerald-500/40 hover:border-emerald-500/70 transition-all shadow-sm shadow-emerald-500/10 cursor-pointer"
              >
                <BedDouble className="w-5 h-5 text-emerald-400" />
                <span>Verified Accommodations ({HOTELS?.length || 5} Executive Hotels)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("shield");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Check Fair Street Fares & Scam Shield</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Floating Metallic VIP Escrow Pass */}
          <div className="lg:col-span-5 flex justify-center perspective-1200 py-6">
            <div
              className={`w-full max-w-sm ${!passTilt.isHovered ? "animate-float-pass" : ""}`}
            >
              <div
                ref={passRef}
                onMouseMove={handlePassMouseMove}
                onMouseLeave={handlePassMouseLeave}
                style={{
                  transform: passTilt.isHovered
                    ? `perspective(1200px) rotateX(${passTilt.rotX.toFixed(2)}deg) rotateY(${passTilt.rotY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`
                    : undefined,
                  transformStyle: "preserve-3d",
                  transition: passTilt.isHovered
                    ? "transform 0.08s ease-out"
                    : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                  willChange: "transform"
                }}
                className="relative rounded-3xl p-6 border-2 border-amber-500/60 bg-gradient-to-br from-slate-950 via-[#131b2e] to-slate-950 shadow-2xl shadow-amber-500/20 cursor-grab active:cursor-grabbing preserve-3d overflow-hidden holographic-card"
              >
                {/* 3D Specular Glare */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl z-40 transition-opacity duration-300"
                  style={{
                    opacity: passTilt.glareOpacity,
                    background: `radial-gradient(circle 280px at ${passTilt.glareX}% ${passTilt.glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(245, 158, 11, 0.2) 35%, transparent 70%)`
                  }}
                />

                {/* Top Lanyard Slot Simulation */}
                <div
                  className="w-16 h-2 rounded-full bg-slate-800 border border-slate-700 mx-auto mb-5 preserve-3d"
                  style={{ transform: "translateZ(10px)" }}
                />

                {/* Card Header */}
                <div
                  className="flex items-center justify-between gap-2 border-b border-amber-500/30 pb-4 mb-5 preserve-3d"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-black font-black text-lg shadow-gold-glow">
                      🌴
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                        Cross River State
                      </div>
                      <div className="text-sm font-extrabold font-heading text-white tracking-wide">
                        CalabarPass VIP Protocol
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      LIVE ESCROW
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 mt-0.5">365 PASS</span>
                  </div>
                </div>

                {/* EMV Smart Chip & Contactless Visual with 3D Depth */}
                <div
                  className="flex items-center justify-between mb-5 preserve-3d"
                  style={{ transform: "translateZ(35px)" }}
                >
                  {/* Metallic Gold Chip */}
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 border border-yellow-200/80 p-1 flex flex-col justify-between shadow-md">
                    <div className="h-1 bg-yellow-800/40 rounded-sm" />
                    <div className="flex justify-between">
                      <div className="w-2 h-3 bg-yellow-800/40 rounded-sm" />
                      <div className="w-2 h-3 bg-yellow-800/40 rounded-sm" />
                    </div>
                    <div className="h-1 bg-yellow-800/40 rounded-sm" />
                  </div>

                  {/* Holographic Seal Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>ANTI-SCAM SHIELD</span>
                  </div>
                </div>

                {/* Passholder Information with 3D Depth */}
                <div
                  className="space-y-3 mb-5 preserve-3d"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                      Accreditation Category
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      Executive Dignitary & Band VIP
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                        Redemption Route
                      </div>
                      <div className="font-semibold text-emerald-300">
                        Marian Rd • U.J. Esuene
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                        PIN Escrow Protection
                      </div>
                      <div className="font-mono font-bold text-amber-400">
                        6-Digit Secured
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Barcode & Security Strip */}
                <div
                  className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono preserve-3d"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>CP-2026-NFC-ESCROW</span>
                  </div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>VAULT ACTIVE</span>
                  </div>
                </div>

                {/* Interactive hint */}
                <div
                  className="text-center text-[10px] text-amber-400/80 mt-3 pt-2 border-t border-amber-500/10 preserve-3d"
                  style={{ transform: "translateZ(15px)" }}
                >
                  ✨ Hover & move cursor to test 3D holographic tilt
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Escrow Protection Proof Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
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
  );
}
