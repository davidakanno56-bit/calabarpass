import React, { useMemo } from 'react';
import { Calendar, Sun, CloudRain, Sparkles, Check, ChevronRight } from 'lucide-react';

export const CalendarPicker = ({ selectedDate, onChange, className = "" }) => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  // Calculate quick chip dates
  const quickChips = useMemo(() => {
    const now = new Date();
    
    // Tomorrow
    const tmrw = new Date(now);
    tmrw.setDate(tmrw.getDate() + 1);
    const tomorrowStr = tmrw.toISOString().split('T')[0];

    // This weekend (Saturday)
    const sat = new Date(now);
    const dayOfWeek = sat.getDay();
    const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
    sat.setDate(sat.getDate() + daysUntilSat);
    const satStr = sat.toISOString().split('T')[0];

    // Next Month (same day next month)
    const nextMo = new Date(now);
    nextMo.setMonth(nextMo.getMonth() + 1);
    const nextMoStr = nextMo.toISOString().split('T')[0];

    // December Carnival (Dec 27 of current or next year)
    const currentYear = now.getFullYear();
    const carnivalDate = new Date(currentYear, 11, 27); // Dec 27
    if (carnivalDate < now) {
      carnivalDate.setFullYear(currentYear + 1);
    }
    const carnivalStr = carnivalDate.toISOString().split('T')[0];

    // August Leboku Festival (Aug 20)
    const lebokuDate = new Date(currentYear, 7, 20); // Aug 20
    if (lebokuDate < now) {
      lebokuDate.setFullYear(currentYear + 1);
    }
    const lebokuStr = lebokuDate.toISOString().split('T')[0];

    return [
      { label: 'Tomorrow', date: tomorrowStr, badge: 'Instant Confirmation' },
      { label: 'This Weekend', date: satStr, badge: 'Weekend Getaway' },
      { label: 'Next Month', date: nextMoStr, badge: 'Advance Booking' },
      { label: 'Carnival Calabar (Dec 27)', date: carnivalStr, badge: 'Carnival Peak' },
      { label: 'Leboku Festival (Aug 20)', date: lebokuStr, badge: 'Cultural Peak' }
    ];
  }, []);

  // Compute seasonal insight for selected date
  const seasonalInsight = useMemo(() => {
    if (!selectedDate) return null;
    const dateObj = new Date(selectedDate);
    const month = dateObj.getMonth(); // 0 = Jan, 11 = Dec

    if (month === 11) {
      return {
        icon: Sparkles,
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        title: 'December Carnival Calabar Festivities',
        desc: 'Peak carnival season across Marian Road and U.J. Esuene Stadium. Early escrow reservation guarantees official band kits and viewing stands.'
      };
    } else if (month === 7 || month === 8) {
      return {
        icon: Sun,
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        title: 'Leboku New Yam & Cultural Season',
        desc: 'Traditional festivals in Yakurr/Ugep, lush green scenery, and cool highland breezes across Obudu Plateau.'
      };
    } else if (month >= 3 && month <= 9) {
      return {
        icon: CloudRain,
        color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        title: 'Ecotourism High Flow Season',
        desc: 'Agbokim Waterfalls is at its most magnificent, thunderous 7-stream flow. Afi Rainforest canopy is brilliantly emerald.'
      };
    } else {
      return {
        icon: Sun,
        color: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
        title: 'Sunny Dry Highlands Season',
        desc: 'Crisp clear skies at Obudu Mountain cable car, ideal river cruising on the Calabar River, and comfortable travel weather.'
      };
    }
  }, [selectedDate]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          Choose Reservation Date (365 Days Available)
        </label>
        <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Open Year-Round
        </span>
      </div>

      {/* Date Picker Input */}
      <div className="relative">
        <input
          type="date"
          min={today}
          value={selectedDate || today}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/50 focus:border-amber-500 rounded-xl px-4 py-3 text-slate-100 text-sm font-medium shadow-inner focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
        />
      </div>

      {/* Quick Select Chips */}
      <div>
        <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Quick Date Presets:</div>
        <div className="flex flex-wrap gap-1.5">
          {quickChips.map((chip) => {
            const isSelected = selectedDate === chip.date;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => onChange(chip.date)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-semibold border-amber-400 shadow-sm shadow-amber-500/30'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/70 hover:bg-slate-750 hover:border-slate-600'
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seasonal Weather / Event Insight */}
      {seasonalInsight && (
        <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${seasonalInsight.color}`}>
          <seasonalInsight.icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">{seasonalInsight.title}</div>
            <div className="text-slate-300/90 text-[11px] mt-0.5 leading-relaxed">
              {seasonalInsight.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
