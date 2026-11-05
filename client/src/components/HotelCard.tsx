// client/src/components/HotelCard.jsx
// $1.5M Prestige Executive Hospitality Card (AfSNET Standard)

import React, { useState } from "react";
import { ShieldCheck, MapPin, Star, ChevronLeft, ChevronRight, ArrowRight, Building2, Check } from "lucide-react";

const IMAGE_LABELS = [
  "Main Building Exterior / Entrance",
  "Executive Bedroom / Master Suite",
  "Swimming Pool / Outdoor Courtyard",
  "Fine Dining Restaurant / Lounge"
];

const SHORT_LABELS = ["1. Exterior", "2. Suite", "3. Pool & Court", "4. Lounge"];

export default function HotelCard({ hotel, onBookHotel }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const images = (Array.isArray(hotel?.images) && hotel.images.length > 0)
    ? hotel.images
    : [hotel?.imageUrl || hotel?.image].filter(Boolean);

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImgError = (idx) => {
    setFailedImages((prev) => ({ ...prev, [idx]: true }));
  };

  const isCurrentImgFailed = failedImages[currentImgIdx];

  return (
    <div 
      onClick={() => onBookHotel(hotel)}
      className="group rounded-3xl overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-sky-500/40 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer text-left relative"
    >
      {/* 4-Photo Carousel Area */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
        {isCurrentImgFailed ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-200">{hotel.name}</span>
            <span className="text-[11px] text-sky-400 mt-0.5">{IMAGE_LABELS[currentImgIdx] || "Verified Stay"}</span>
            <span className="text-[10px] text-emerald-400/90 mt-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              State Bureau Verified Property
            </span>
          </div>
        ) : (
          <img
            src={images[currentImgIdx] || hotel.imageUrl || hotel.image}
            alt={`${hotel.name} - ${IMAGE_LABELS[currentImgIdx] || 'Angle'}`}
            onError={() => handleImgError(currentImgIdx)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}

        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40 pointer-events-none" />

        {/* Floating Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-20">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-md">
            {hotel.category}
          </span>

          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/40 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Stay</span>
          </span>
        </div>

        {/* Carousel Next / Previous Nav Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              aria-label="Previous photo angle"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              aria-label="Next photo angle"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Current Photo Label & Counter */}
        <div className="absolute bottom-11 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-semibold text-slate-300 pointer-events-none z-20">
          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-sky-300 truncate max-w-[200px]">
            {IMAGE_LABELS[currentImgIdx] || `View ${currentImgIdx + 1}`}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-slate-300">
            {currentImgIdx + 1} / {images.length || 1}
          </span>
        </div>

        {/* Interactive Photo Thumbnail Switcher Strip */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center gap-1.5 z-20">
          {images.map((_, idx) => {
            const isSelected = idx === currentImgIdx;
            return (
              <button
                key={`thumb-${hotel.id}-${idx}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIdx(idx);
                }}
                className={`flex-1 py-1 px-1 rounded-md text-[10px] font-semibold transition-all backdrop-blur-md flex items-center justify-center truncate ${
                  isSelected
                    ? "bg-sky-500 text-white font-bold shadow-sm border border-sky-400"
                    : "bg-black/60 text-slate-300 hover:bg-black/80 hover:text-white border border-white/10"
                }`}
              >
                <span className="truncate">{SHORT_LABELS[idx] || `Angle ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-xl font-bold tracking-tight font-heading text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
              {hotel.name}
            </h3>
            {/* Rating */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold shrink-0">
              <Star className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
              <span>{hotel.rating}</span>
            </div>
          </div>

          {/* Location Area */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="truncate">{hotel.area}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
            {hotel.description}
          </p>

          {/* Amenity Tags */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="truncate max-w-[180px]">{amenity}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & State Escrow Payout */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Nightly Rate</div>
            <div className="text-2xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
              {hotel.priceRange}
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              100% Escrow Protected
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBookHotel(hotel)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-xs tracking-tight shadow-md shadow-sky-950/30 flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>Reserve Stay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
