import React, { useState, useRef } from "react";
import { ShieldCheck, MapPin, Star, ChevronLeft, ChevronRight, ArrowRight, Building2, Check, Lock, Sparkles, Image as ImageIcon } from "lucide-react";

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
  const cardRef = useRef(null);

  const [tilt, setTilt] = useState({
    rotX: 0,
    rotY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      rotX: -normY * 10,
      rotY: normX * 10,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.22,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotX: 0,
      rotY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false
    });
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
  };

  const handleImgError = (idx) => {
    setFailedImages((prev) => ({ ...prev, [idx]: true }));
  };

  const currentImageUrl = hotel.images[currentImgIdx] || hotel.images[0];
  const isCurrentImgFailed = failedImages[currentImgIdx];

  return (
    <div className="perspective-1000 w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg) scale3d(${
            tilt.isHovered ? 1.02 : 1
          }, ${tilt.isHovered ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: tilt.isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform"
        }}
        className="glass-panel rounded-3xl overflow-hidden flex flex-col border border-white/10 hover:border-amber-500/40 relative group cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 backdrop-blur-xl bg-slate-900/80"
      >
        {/* Specular Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity duration-300"
          style={{
            opacity: tilt.glareOpacity,
            background: `radial-gradient(circle 380px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.2) 0%, rgba(245, 158, 11, 0.1) 35%, transparent 70%)`
          }}
        />

        {/* 4-Photo Carousel Area with 3D Depth */}
        <div
          className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 preserve-3d"
          style={{ transform: "translateZ(15px)" }}
        >
          {isCurrentImgFailed ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2 shadow-gold-glow">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-200">{hotel.name}</span>
              <span className="text-[11px] text-amber-400 mt-0.5">{IMAGE_LABELS[currentImgIdx] || "Verified Stay"}</span>
              <span className="text-[10px] text-emerald-400/90 mt-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                State Bureau Verified Property
              </span>
            </div>
          ) : (
            <img
              src={currentImageUrl}
              alt={`${hotel.name} - ${IMAGE_LABELS[currentImgIdx] || 'Angle'}`}
              onError={() => handleImgError(currentImgIdx)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-black/50 pointer-events-none" />

          {/* Top Badges */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 preserve-3d"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Category */}
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md text-amber-400 border border-amber-500/40 shadow-md">
              {hotel.category}
            </span>

            {/* Verified Escrow Hotel Badge */}
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 backdrop-blur-md shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Stay</span>
            </span>
          </div>

          {/* Carousel Next / Previous Nav Buttons */}
          <button
            type="button"
            onClick={handlePrevImg}
            aria-label="Previous photo angle"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-80 hover:opacity-100 hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextImg}
            aria-label="Next photo angle"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 z-20 transition-all opacity-80 hover:opacity-100 hover:scale-110"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Current Photo Label & Counter */}
          <div
            className="absolute bottom-12 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-slate-300 pointer-events-none z-20 preserve-3d"
            style={{ transform: "translateZ(20px)" }}
          >
            <span className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-amber-300 truncate max-w-[220px]">
              {IMAGE_LABELS[currentImgIdx] || `View ${currentImgIdx + 1}`}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-slate-300">
              {currentImgIdx + 1} / {hotel.images.length}
            </span>
          </div>

          {/* Interactive 4-Photo Thumbnail Switcher Strip */}
          <div
            className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 z-20 preserve-3d"
            style={{ transform: "translateZ(25px)" }}
          >
            {hotel.images.map((_, idx) => {
              const isSelected = idx === currentImgIdx;
              return (
                <button
                  key={`thumb-${hotel.id}-${idx}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIdx(idx);
                  }}
                  className={`flex-1 py-1 px-1.5 rounded-md text-[10px] font-semibold transition-all backdrop-blur-md flex items-center justify-center truncate ${
                    isSelected
                      ? "bg-amber-500 text-black font-bold shadow-sm shadow-amber-500/50 border border-amber-400"
                      : "bg-black/65 text-slate-300 hover:bg-black/85 hover:text-white border border-white/15"
                  }`}
                >
                  <span className="truncate">{SHORT_LABELS[idx] || `Angle ${idx + 1}`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-6 flex-1 flex flex-col preserve-3d">
          {/* Title, Rating & Location */}
          <div style={{ transform: "translateZ(25px)" }} className="preserve-3d">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                {hotel.name}
              </h3>
              {/* Rating */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hotel.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({hotel.reviewCount})</span>
              </div>
            </div>

            {/* Location Area */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{hotel.area}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
              {hotel.description}
            </p>
          </div>

          {/* Amenity Tags */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div
              className="mb-5 flex flex-wrap gap-1.5 preserve-3d"
              style={{ transform: "translateZ(20px)" }}
            >
              {hotel.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/70 text-[11px] font-medium text-slate-300 flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          )}

          {/* Pricing & Compliance Note with 3D Pop */}
          <div
            className="pt-4 border-t border-slate-800/80 mt-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 preserve-3d"
            style={{ transform: "translateZ(35px)" }}
          >
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Indicative Nightly Rate</div>
              <div className="text-2xl font-extrabold font-heading text-white">
                {hotel.priceRange}
              </div>
              <div className="text-[11px] text-amber-400/90 font-medium mt-1 leading-snug">
                {hotel.priceNote}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBookHotel(hotel)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              <Lock className="w-4 h-4" />
              <span>Book via Escrow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
