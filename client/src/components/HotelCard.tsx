// client/src/components/HotelCard.tsx
// Luxury Executive Hospitality Card (Visit Dubai × Visit Saudi Standard)

import React, { useState } from "react";
import { useCurrency } from "../context/CurrencyContext.tsx";
import { 
  ShieldCheck, 
  MapPin, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Building2, 
  Check, 
  Clock, 
  Lock 
} from "lucide-react";

export default function HotelCard({ hotel, onBookHotel }) {
  const { formatPrice } = useCurrency();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  // Filter out any unwanted / accidental VIP carnival images and invalid paths
  const rawImages = (Array.isArray(hotel?.images) && hotel.images.length > 0)
    ? hotel.images
    : [hotel?.imageUrl || hotel?.image].filter(Boolean);

  const images = rawImages.filter(img => 
    typeof img === "string" && 
    !img.includes("executive_vip.jpg") &&
    img.trim() !== ""
  );

  const safeImages = images.length > 0 ? images : [hotel?.imageUrl || hotel?.image || "/assets/calabar-cityscape-aerial.jpg"];

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  const handleImgError = (idx) => {
    setFailedImages((prev) => ({ ...prev, [idx]: true }));
  };

  const isCurrentImgFailed = failedImages[currentImgIdx];

  const rawPrice = hotel?.pricePerNight 
    ? parseInt(String(hotel.pricePerNight).replace(/[^0-9]/g, ""), 10) 
    : (hotel?.priceRaw || 0);

  return (
    <div 
      onClick={() => onBookHotel?.(hotel)}
      className="group rounded-3xl overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-stateCyan/50 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer text-left relative"
    >
      {/* Photo Area */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
        {isCurrentImgFailed ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-stateCyan/10 border border-stateCyan/20 flex items-center justify-center text-stateCyan mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">{hotel?.name}</span>
            <span className="text-[11px] text-stateCyan mt-0.5">Verified Hospitality</span>
            <span className="text-[10px] text-stateCyan mt-1 bg-stateCyan/10 px-2.5 py-0.5 rounded-full border border-stateCyan/20 font-medium">
              Verified Partner Property
            </span>
          </div>
        ) : (
          <img
            src={safeImages[currentImgIdx] || hotel?.imageUrl || hotel?.image}
            alt={`${hotel?.name} - View ${currentImgIdx + 1}`}
            onError={() => handleImgError(currentImgIdx)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        )}

        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/35 pointer-events-none" />

        {/* Floating Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
            {hotel?.category}
          </span>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-stateCyan/90 backdrop-blur-md text-white border border-stateCyan/40 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Verified Stay</span>
          </span>
        </div>

        {/* Carousel Next / Previous Nav Buttons (Only when multiple photos exist) */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Current Photo Counter (Only when multiple photos exist) */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-2.5 right-3.5 flex items-center gap-1 z-20 pointer-events-none">
            <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-slate-300">
              {currentImgIdx + 1} / {safeImages.length}
            </span>
          </div>
        )}

        {/* Multiple Photo Switcher Dots (Only when multiple photos exist) */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 z-20">
            {safeImages.map((_, idx) => (
              <button
                key={`dot-${hotel?.id}-${idx}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentImgIdx
                    ? "w-5 bg-cr-lagoon shadow-sm"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
                title={`View Photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-xl font-bold tracking-tight font-heading text-slate-900 dark:text-white group-hover:text-stateCyan transition-colors">
              {hotel?.name}
            </h3>
            {hotel?.rating && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{hotel.rating}</span>
              </div>
            )}
          </div>

          {/* Location & Corridor */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <MapPin className="w-3.5 h-3.5 text-stateCyan shrink-0" />
            <span className="truncate">{hotel?.area}</span>
          </div>

          {hotel?.distanceToCICC && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
              <Clock className="w-3.5 h-3.5 text-stateCyan shrink-0" />
              <span>{hotel.distanceToCICC}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2 font-light">
            {hotel?.description}
          </p>

          {/* Amenity Tags */}
          {hotel?.amenities && hotel.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-stateCyan shrink-0" />
                  <span className="truncate max-w-[180px]">{amenity}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Escrow Row */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Nightly Rate</div>
            <div className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
              {rawPrice > 0 ? formatPrice(rawPrice) : (hotel?.priceRange || "Verified Tariff")}
              <span className="text-xs font-normal text-slate-500"> / night</span>
            </div>
            <div className="text-[10px] text-stateCyan font-medium flex items-center gap-1">
              <Lock className="w-3 h-3 text-stateCyan" />
              <span>365-Day Escrow Protection</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBookHotel?.(hotel)}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-stateCyan/20 flex items-center gap-1.5 transition-all cursor-pointer group-hover:bg-sky-400"
          >
            <span>Reserve Stay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
