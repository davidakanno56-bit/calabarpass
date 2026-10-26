// client/src/components/VerifiedImage.jsx
// CalabarPass Authentic Real-World Photograph Component
// Strictly displays verified photographs of real places, venues, and businesses in Cross River State.
// Features: Loading skeleton, responsive scaling, discrete verification badge,
// attribution popover, multi-angle gallery carousel, and clean branded "Photo not yet available" fallback.

import React, { useState, useEffect } from "react";
import { ShieldCheck, CameraOff, Info, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { resolvePlaceImage, getNeutralFallback } from "../utils/imageService.js";

export default function VerifiedImage({
  item,
  src,
  alt,
  className = "",
  containerClassName = "",
  aspectRatio = "aspect-[16/10]",
  showBadge = true,
  showAttribution = true,
  allowGallery = false,
  badgePosition = "top-left", // "top-left", "top-right", "bottom-left", "bottom-right"
  rounded = "rounded-xl"
}) {
  const [imageMeta, setImageMeta] = useState(() => {
    if (src) {
      // If direct src is passed, resolve place data from item or fallback
      const resolved = resolvePlaceImage(item || src);
      return {
        ...resolved,
        primaryUrl: src || resolved.primaryUrl
      };
    }
    return resolvePlaceImage(item);
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showAttributionModal, setShowAttributionModal] = useState(false);

  useEffect(() => {
    const meta = resolvePlaceImage(item || src);
    if (src) {
      meta.primaryUrl = src;
    }
    setImageMeta(meta);
    setActiveIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, [item, src]);

  // Gallery determination
  const gallery = (imageMeta?.gallery && imageMeta.gallery.length > 0)
    ? imageMeta.gallery
    : (imageMeta?.primaryUrl ? [imageMeta.primaryUrl] : []);

  const currentUrl = gallery[activeIndex] || imageMeta?.primaryUrl;
  const isNeutralFallback = !currentUrl || hasError || imageMeta?.verificationStatus === "photo_not_available";

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (gallery.length > 1) {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
      setIsLoading(true);
      setHasError(false);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (gallery.length > 1) {
      setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      setIsLoading(true);
      setHasError(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${rounded} bg-slate-900/90 border border-slate-800 ${containerClassName}`}>
      {/* 1. Loading Skeleton */}
      {isLoading && !isNeutralFallback && (
        <div className={`absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center`}>
          <div className="flex flex-col items-center gap-2 text-slate-500 text-xs">
            <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
            <span>Loading authentic photo...</span>
          </div>
        </div>
      )}

      {/* 2. Neutral Branded Fallback (No AI / No generic stock) */}
      {isNeutralFallback ? (
        <div className={`w-full ${aspectRatio} flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 select-none border border-dashed border-slate-800`}>
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
            <CameraOff className="w-7 h-7" />
          </div>
          <span className="text-sm font-semibold text-slate-200 tracking-wide">
            Photo Not Yet Available
          </span>
          <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
            Awaiting authentic on-site verification in Cross River State. No synthetic or AI images permitted.
          </p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-800/80 text-amber-400/90 border border-amber-500/20 mt-3">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            CalabarPass Clearinghouse Standard
          </span>
        </div>
      ) : (
        /* 3. Authentic Verified Photograph */
        <div className={`relative w-full ${aspectRatio} group`}>
          <img
            src={currentUrl}
            alt={alt || imageMeta?.altText || "Authentic photograph verified in Cross River State"}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`}
          />

          {/* Gradient Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

          {/* 4. Verification Badge */}
          {showBadge && imageMeta?.verified && (
            <div
              className={`absolute z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md transition-all shadow-md ${
                badgePosition === "top-left"
                  ? "top-3 left-3"
                  : badgePosition === "top-right"
                  ? "top-3 right-3"
                  : badgePosition === "bottom-left"
                  ? "bottom-3 left-3"
                  : "bottom-3 right-3"
              } bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/90`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Verified Calabar Photo</span>
            </div>
          )}

          {/* 5. Attribution Info Button */}
          {showAttribution && imageMeta?.attribution && (
            <div className="absolute bottom-3 right-3 z-20">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAttributionModal(!showAttributionModal);
                }}
                title="View photo attribution & license"
                className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-colors text-xs flex items-center gap-1 shadow-md"
              >
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] hidden sm:inline font-mono">Credit</span>
              </button>
            </div>
          )}

          {/* 6. Multi-angle Carousel Controls */}
          {allowGallery && gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeIndex ? "w-4 bg-amber-400" : "w-1.5 bg-slate-500/70 hover:bg-slate-400"
                    }`}
                    title={`Angle ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* 7. Attribution Overlay Modal */}
          {showAttributionModal && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md p-4 flex flex-col justify-between text-xs text-slate-300 animate-in fade-in duration-200"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="font-semibold text-amber-400 flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Photo Attribution
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAttributionModal(false)}
                    className="text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-[10px]"
                  >
                    Close ✕
                  </button>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <p><strong className="text-slate-200">Location/Subject:</strong> {imageMeta?.name || "Calabar, Cross River State"}</p>
                  <p><strong className="text-slate-200">Author/Photographer:</strong> {imageMeta?.attribution || "Verified Partner"}</p>
                  <p><strong className="text-slate-200">License:</strong> {imageMeta?.license || "Partner Agreement"}</p>
                  {imageMeta?.placeId && (
                    <p className="font-mono text-[10px] text-slate-400 truncate">
                      <strong className="text-slate-200">Place ID:</strong> {imageMeta.placeId}
                    </p>
                  )}
                  {imageMeta?.source && (
                    <p className="capitalize"><strong className="text-slate-200">Source:</strong> {imageMeta.source.replace(/_/g, " ")}</p>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Real-World Verified
                </span>
                {imageMeta?.licenseUrl && (
                  <a
                    href={imageMeta.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 text-[10px]"
                  >
                    License Info <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
