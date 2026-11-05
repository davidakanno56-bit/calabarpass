import React, { useState } from "react";
import { 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  AlertTriangle, 
  X, 
  ChevronUp, 
  Lock, 
  Clock, 
  Car, 
  CheckCircle2 
} from "lucide-react";

export default function TouristHelplineWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyWhatsAppUrl = `https://api.whatsapp.com/send?phone=2348035550100&text=${encodeURIComponent(
    "Hello CalabarPass Clearinghouse, I am a tourist in Calabar and need immediate assistance with my verified booking / festival escort."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 no-print font-sans">
      {/* Expanded Rapid Response Card */}
      {isOpen && (
        <div 
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 rounded-3xl bg-[#0a101d]/95 backdrop-blur-xl border border-emerald-500/40 p-5 shadow-2xl shadow-emerald-950/50 text-slate-100 animate-slideUp text-xs"
          role="dialog"
          aria-labelledby="helpline-title"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>24/7 Rapid Response Desk</span>
                </div>
                <h3 id="helpline-title" className="text-sm font-bold text-white font-heading">
                  Ministry Tourist Support
                </h3>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              aria-label="Close Rapid Response Window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Official Cross River State Ministry of Tourism & CalabarPass traveler incident line. We protect tourists from overcharging, counterfeit passes, and check-in delays.
            </p>

            {/* Direct WhatsApp Instant Desk */}
            <a
              href={emergencyWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-white transition group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#25D366] text-black flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 fill-black" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span>Chat on WhatsApp</span>
                    <span className="text-[9px] font-mono bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.2 rounded font-bold">LIVE</span>
                  </div>
                  <div className="text-[10px] text-emerald-200/80">Average response time: &lt; 2 minutes</div>
                </div>
              </div>
              <span className="text-xs text-[#25D366] font-bold group-hover:translate-x-0.5 transition">↗</span>
            </a>

            {/* Direct Phone Call Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:+2348035550100"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-stateCyan text-slate-200 hover:text-white transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-stateCyan shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Escort / Arrivals</div>
                  <div className="font-mono text-[11px] text-white truncate">+234 803 555 0100</div>
                </div>
              </a>

              <a
                href="tel:+2348035550105"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-stateCyan text-slate-200 hover:text-white transition"
              >
                <Lock className="w-3.5 h-3.5 text-stateCyan shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Escrow Dispute</div>
                  <div className="font-mono text-[11px] text-white truncate">+234 803 555 0105</div>
                </div>
              </a>
            </div>

            {/* Escrow Rule Reminder */}
            <div className="p-2.5 rounded-xl bg-stateCyan/10 border border-stateCyan/30 text-sky-200 text-[10px] leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-stateCyan shrink-0 mt-0.5" />
              <span>
                <strong>Tourist Golden Rule:</strong> Never reveal your 6-digit Secret PIN before arriving at the venue and verifying your room or service. Releasing the PIN immediately settles funds to the vendor.
              </span>
            </div>

            {/* Locations on Patrol */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <Car className="w-3 h-3 text-slate-500" />
                <span>Patrol Units: Airport &bull; CICC &bull; Marian</span>
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>24/7 Active</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-2xl transition cursor-pointer select-none border ${
          isOpen
            ? "bg-slate-900 border-emerald-500 text-white shadow-emerald-500/20"
            : "bg-slate-950/90 hover:bg-slate-900 border-emerald-500/50 hover:border-emerald-400 text-slate-100 shadow-emerald-950/60 hover:scale-105"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        
        <div className="flex items-center gap-1.5 text-xs font-bold font-heading tracking-tight">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tourist 24/7 Helpline</span>
        </div>

        {isOpen ? (
          <X className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
        )}
      </button>
    </div>
  );
}

