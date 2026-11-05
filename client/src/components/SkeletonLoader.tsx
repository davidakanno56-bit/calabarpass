import React from 'react';

export const PackageCardSkeleton = () => (
  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl animate-pulse flex flex-col h-full">
    {/* Image placeholder */}
    <div className="h-48 sm:h-52 bg-slate-800 relative">
      <div className="absolute top-3 left-3 w-28 h-6 bg-slate-700/60 rounded-full" />
      <div className="absolute top-3 right-3 w-20 h-6 bg-slate-700/60 rounded-full" />
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-grow justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-slate-800 rounded-full" />
          <div className="w-24 h-4 bg-slate-800 rounded" />
        </div>
        <div className="w-3/4 h-6 bg-slate-800 rounded mb-2" />
        <div className="w-full h-4 bg-slate-800/70 rounded mb-1" />
        <div className="w-2/3 h-4 bg-slate-800/70 rounded" />
      </div>

      {/* Perks / Inclusions */}
      <div className="space-y-2 py-2 border-t border-slate-800/60">
        <div className="w-4/5 h-3 bg-slate-800/50 rounded" />
        <div className="w-3/5 h-3 bg-slate-800/50 rounded" />
        <div className="w-2/3 h-3 bg-slate-800/50 rounded" />
      </div>

      {/* Footer Price & Button */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <div>
          <div className="w-16 h-3 bg-slate-800/60 rounded mb-1" />
          <div className="w-28 h-7 bg-slate-800 rounded" />
        </div>
        <div className="w-28 h-10 bg-slate-800 rounded-xl" />
      </div>
    </div>
  </div>
);

export const PackageGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, idx) => (
      <PackageCardSkeleton key={`skeleton-card-${idx}`} />
    ))}
  </div>
);

export const EscrowTableSkeleton = ({ rows = 4 }) => (
  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden animate-pulse">
    <div className="p-5 border-b border-slate-800 flex items-center justify-between">
      <div className="w-48 h-6 bg-slate-800 rounded" />
      <div className="w-24 h-8 bg-slate-800 rounded-lg" />
    </div>
    <div className="divide-y divide-slate-800/60">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={`table-skel-${idx}`} className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg" />
            <div>
              <div className="w-32 h-4 bg-slate-800 rounded mb-1" />
              <div className="w-20 h-3 bg-slate-800/60 rounded" />
            </div>
          </div>
          <div className="w-24 h-5 bg-slate-800 rounded" />
          <div className="w-28 h-6 bg-slate-800 rounded-full" />
          <div className="w-20 h-8 bg-slate-800 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={`stat-skel-${idx}`} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-center">
        <div className="w-16 h-7 bg-slate-800 rounded mx-auto mb-1" />
        <div className="w-24 h-3 bg-slate-800/60 rounded mx-auto" />
      </div>
    ))}
  </div>
);
