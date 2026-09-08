import React, { useState } from "react";
import { Sparkles, Send, MapPin, ShieldAlert, DollarSign, Calendar, Compass, Loader2, Bot, ArrowRight } from "lucide-react";

export default function AIConciergeTerminal({ onSelectPackageFromAI }) {
  const [userPrompt, setUserPrompt] = useState("");
  const [days, setDays] = useState(3);
  const [travelStyle, setTravelStyle] = useState("Party & Carnival Band");
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState(null);

  const presetQueries = [
    {
      label: "🌴 Generate 3-Day Itinerary",
      prompt: "Generate a complete 3-day Carnival Calabar itinerary covering Mary Slessor, Bogobiri Suya, Marian Road parade, Marina Resort, and Stadium finale."
    },
    {
      label: "⚖️ Check Fair December Rates",
      prompt: "Check fair December price baselines for airport taxis, Marian Road hotels, suya plates, and carnival band wristbands."
    },
    {
      label: "🛡️ How Escrow Protects Me",
      prompt: "How does CalabarPass escrow and the 6-digit physical check-in PIN protect me from counterfeit wristbands and fake ticket hawkers?"
    },
    {
      label: "🍲 Best Afang & Bogobiri Suya",
      prompt: "Where can I get authentic Efik Edikang Ikong, Afang soup, and late night Bogobiri suya at honest local prices?"
    }
  ];

  const handleAskConcierge = async (customPrompt) => {
    const query = customPrompt || userPrompt;
    if (!query) return;

    setLoading(true);
    setAiOutput(null);

    try {
      const res = await fetch("/api/ai/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: query,
          days: Number(days),
          travelStyle
        })
      });

      const data = await res.json();
      if (data.success) {
        setAiOutput(data);
      } else {
        setAiOutput({
          response: "Unable to contact concierge service. Please check connection.",
          scamAlerts: []
        });
      }
    } catch (err) {
      setAiOutput({
        response: `Concierge error: ${err.message}`,
        scamAlerts: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cross River AI Tourism Concierge</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          Carnival Calabar AI Guide & Surge Predictor
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Ask anything about Carnival routes, Mary Slessor heritage sites, authentic Bogobiri suya spots, honest taxi fares, and anti-scam protection.
        </p>
      </div>

      {/* Terminal Card */}
      <div className="glass-panel rounded-3xl border-slate-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
        {/* Preset Quick Buttons */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Quick Prompts
          </div>
          <div className="flex flex-wrap gap-2">
            {presetQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUserPrompt(item.prompt);
                  handleAskConcierge(item.prompt);
                }}
                disabled={loading}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-xs font-semibold border border-slate-700/80 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Controls: Days & Travel Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Trip Duration: {days} {days === 1 ? "Day" : "Days"}</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>1 Day Quick</span>
              <span>3 Days Carnival Core</span>
              <span>5 Days Full State</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Travel Style</span>
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="Party & Carnival Band">🎉 Party & Carnival Band (Seagull / Parade)</option>
              <option value="Cultural Explorer">🏛️ Cultural Explorer (Mary Slessor / Marina / Museum)</option>
              <option value="VIP Luxury">🥂 VIP Luxury (Air-conditioned Stadium Stands / Resorts)</option>
              <option value="Budget Adventurer">🎒 Budget Adventurer (Suya / Street Hikes / Keke)</option>
            </select>
          </div>
        </div>

        {/* Input & Ask Row */}
        <div className="relative mb-6">
          <textarea
            rows="3"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Ask anything: e.g., 'Plan a 3-day itinerary for Carnival Calabar with Seagull Band, authentic suya at Bogobiri, and safe taxi rates'..."
            className="w-full p-4 pr-32 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            onClick={() => handleAskConcierge()}
            disabled={loading || !userPrompt.trim()}
            className="absolute bottom-4 right-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-bold text-xs shadow-gold-glow flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Ask AI</span>
              </>
            )}
          </button>
        </div>

        {/* AI Output Terminal Card */}
        {aiOutput && (
          <div className="pt-6 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Bot className="w-4 h-4" />
                <span>Concierge Intelligence Response</span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                Source: {aiOutput.source || "Calabar Expert Engine"}
              </span>
            </div>

            {/* Formatted Markdown Content */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {aiOutput.response}
            </div>

            {/* Embedded Anti-Scam Advisories */}
            {aiOutput.scamAlerts && aiOutput.scamAlerts.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Verified Calabar Scam Warnings For Your Route</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiOutput.scamAlerts.slice(0, 2).map((scam, i) => (
                    <div key={i} className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs space-y-1">
                      <div className="font-bold text-rose-300">{scam.title}</div>
                      <div className="text-slate-400">{scam.description}</div>
                      <div className="text-emerald-400 font-medium pt-1">
                        🛡️ <strong>Rule:</strong> {scam.protectionRule}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
