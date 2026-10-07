import React from "react";
import { ShieldCheck, UserCheck, Layers, Key, Lock, Cpu, CheckCircle } from "lucide-react";

export default function SecurityTrustSection() {
  const trustFeatures = [
    {
      icon: UserCheck,
      title: "Vendor Verification",
      mainText: "Only onboarded vendors can access their assigned merchant portal.",
      details: "Designed to ensure that only authenticated Cross River tour operators, registered band secretariats, and accredited hotels can receive guest bookings and check-in vouchers.",
      badge: "Verified Access Control",
      borderColor: "border-amber-500/30"
    },
    {
      icon: Layers,
      title: "Multi-Tenant Isolation",
      mainText: "Vendors only see bookings and transaction information belonging to their own account.",
      details: "The prototype architecture enforces strict data segregation so competing hotels and tour guides can never access each other's customer records or settlement disbursements.",
      badge: "Tenant Scoped Ledger",
      borderColor: "border-emerald-500/30"
    },
    {
      icon: Key,
      title: "Voucher Authentication",
      mainText: "Unique booking codes help prevent unauthorized redemption.",
      details: "Each transaction produces a cryptographic token and secret 6-digit PIN, designed to eliminate counterfeit wristbands, duplicate room sales, and black-market ticket scalping.",
      badge: "Cryptographic PIN",
      borderColor: "border-amber-400/30"
    },
    {
      icon: Lock,
      title: "Protected Payments",
      mainText: "Payments are processed through the integrated payment infrastructure.",
      details: "Payments are processed through certified Paystack infrastructure, holding reservation funds in a protected vault until the traveler arrives in Cross River and presents their PIN.",
      badge: "PCI-DSS Grade Gateway",
      borderColor: "border-sky-500/30"
    }
  ];

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Prototype Security Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
            Built Around Digital Trust
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Engineered with multi-tenant data isolation, cryptographic voucher validation, and protected financial flows tailored for tourist safety.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Multi-Tenant Guard Active</span>
        </div>
      </div>

      {/* 4 Trust Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trustFeatures.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className={`glass-panel p-6 sm:p-7 rounded-3xl border ${item.borderColor} hover:border-amber-500/50 transition-all duration-300 space-y-4 relative group hover:shadow-xl`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/30">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-emerald-300 font-semibold mb-2">
                  "{item.mainText}"
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified in Hackathon Test Suite</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
