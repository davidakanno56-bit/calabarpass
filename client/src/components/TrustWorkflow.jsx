import React from "react";
import { Compass, CreditCard, Key, CheckCircle2, ArrowRight, ShieldCheck, Lock, QrCode, Building2 } from "lucide-react";

export default function TrustWorkflow() {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      headline: "Find Verified Destinations & Packages",
      description: "Explore curated Cross River destinations—from Obudu Mountain Resort to Carnival Calabar—with transparent expected prices and verified operator credentials.",
      icon: Compass,
      color: "from-amber-500 to-amber-600",
      accentBorder: "border-amber-500/30",
      pillText: "Verified Catalog",
      pillColor: "text-amber-400 bg-amber-500/10 border-amber-500/30"
    },
    {
      number: "02",
      title: "BOOK",
      headline: "Choose a Verified Vendor & Pay Securely",
      description: "Select your preferred date and checkout via direct Paystack integration. Your payment is immediately locked in the protected settlement vault.",
      icon: CreditCard,
      color: "from-emerald-500 to-teal-600",
      accentBorder: "border-emerald-500/30",
      pillText: "Protected Payment",
      pillColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      number: "03",
      title: "VERIFY",
      headline: "Receive Unique Voucher & 6-Digit PIN",
      description: "Instantly generate your tamper-proof digital voucher and private 6-digit verification PIN. Offline download and cryptographic QR code are included.",
      icon: Key,
      color: "from-amber-400 to-yellow-500",
      accentBorder: "border-amber-400/30",
      pillText: "6-Digit Secret PIN",
      pillColor: "text-amber-300 bg-amber-400/10 border-amber-400/30"
    },
    {
      number: "04",
      title: "CHECK IN",
      headline: "Vendor Validates Voucher & Confirms Booking",
      description: "Present your secret PIN at the front desk or tour meeting point. The authorized merchant validates the voucher and triggers disbursement.",
      icon: CheckCircle2,
      color: "from-sky-400 to-blue-500",
      accentBorder: "border-sky-500/30",
      pillText: "Verified Check-In",
      pillColor: "text-sky-300 bg-sky-500/10 border-sky-500/30"
    }
  ];

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparent Trust Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
          From Discovery to Check-In
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          How CalabarPass safeguards tourists and authentic Cross River operators through an end-to-end verified booking pipeline.
        </p>
      </div>

      {/* 4-Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`glass-panel rounded-3xl p-6 border ${step.accentBorder} hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between relative group hover:shadow-xl`}
            >
              {/* Top Step Number & Icon */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-black tracking-widest px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                    STEP {step.number}
                  </span>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${step.pillColor}`}>
                    {step.pillText}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/80 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>

                <div className="text-xs font-black uppercase tracking-widest text-amber-400/90 mb-1">
                  {step.title}
                </div>

                <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2 leading-snug">
                  {step.headline}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator arrow for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-[#0b0f17] border border-slate-700 flex items-center justify-center text-slate-400 shadow-md">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* End-to-End Pipeline Summary Bar (Judges Visual) */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[760px] text-xs font-mono font-bold text-slate-400">
          <span className="text-amber-400">TOURIST</span>
          <span className="text-slate-600">→</span>
          <span className="text-white">VERIFIED DESTINATION</span>
          <span className="text-slate-600">→</span>
          <span className="text-emerald-400">FAIR PRICE</span>
          <span className="text-slate-600">→</span>
          <span className="text-sky-400">SECURE PAYMENT</span>
          <span className="text-slate-600">→</span>
          <span className="text-amber-300">DIGITAL VOUCHER</span>
          <span className="text-slate-600">→</span>
          <span className="text-amber-400">6-DIGIT VERIFICATION</span>
          <span className="text-slate-600">→</span>
          <span className="text-white">AUTHORIZED VENDOR</span>
          <span className="text-slate-600">→</span>
          <span className="text-emerald-400 font-extrabold">SUCCESSFUL CHECK-IN</span>
        </div>
      </div>
    </section>
  );
}
