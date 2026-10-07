import React, { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Navigation,
  Search,
  Utensils,
} from "lucide-react";

const DINING_SPOTS = [
  {
    id: "crunchies-marian",
    name: "Crunchies Fast Food (Marian Road Branch)",
    address: "Marian Road, Calabar",
    corridor: "Marian Road",
    specialty: "Crispy fried chicken, meat pies, and jollof combos",
    category: "Fast Food & Bites",
    mapQuery: "Crunchies Fast Food Marian Road Calabar",
  },
  {
    id: "crunchies-plus",
    name: "Crunchies Plus (Calabar Road / Watt Market)",
    address: "Calabar Road, Commercial District",
    corridor: "Calabar Road / Watt Market",
    specialty: "Fast bites, pastries, and ice cream",
    category: "Fast Food & Bites",
    mapQuery: "Crunchies Plus Calabar Road Watt Market Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Crunchies+Plus+Calabar+Road+Watt+Market+Calabar",
  },
  {
    id: "captain-cook",
    name: "Captain Cook Bakery & Restaurant",
    address: "Marian Road / State Housing Junction",
    corridor: "Marian Road / State Housing Junction",
    specialty: "Pastries, pepper soup, and casual meals",
    category: "Fast Food & Bites",
    mapQuery: "Captain Cook Bakery Marian Road Calabar",
  },
  {
    id: "harmonics",
    name: "Harmonics Restaurant & Crispy Chicken",
    address: "Marian Road / State Housing axis, Calabar",
    corridor: "Marian Road / State Housing axis",
    specialty: "Famous crispy fried chicken, combos, and fresh pastries",
    category: "Fast Food & Bites",
    mapQuery: "Harmonics Crispy Chicken Marian Road Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Harmonics+Crispy+Chicken+Marian+Road+Calabar",
  },
  {
    id: "spar-calabar-mall",
    name: "SPAR Calabar Mall",
    address: "Cultural Centre Complex / Murtala Mohammed Highway, Calabar",
    corridor: "Cultural Centre Complex / Murtala Mohammed Highway",
    specialty: "Premier shopping mall, supermarket bakery, food court, and cinema relaxation hub",
    category: "Relaxation & Sip",
    mapQuery: "SPAR Calabar Mall Cross River",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=SPAR+Calabar+Mall+Cross+River",
  },
  {
    id: "the-arena",
    name: "The Arena Lounge & Grills",
    address: "Marian Road, Calabar",
    corridor: "Marian Road",
    specialty: "BBQ fish platters, grilled wings, and cocktails",
    category: "Lounges & Nightlife",
    mapQuery: "The Arena Lounge and Grills Marian Road Calabar",
  },
  {
    id: "mayfair-lounge",
    name: "Mayfair Lounge & Club",
    address: "Marian Road Corridor, Calabar",
    corridor: "Marian Road Corridor",
    specialty: "High-energy VIP nightlife, bottle service, and resident DJs",
    category: "Lounges & Nightlife",
    mapQuery: "Mayfair Lounge Marian Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Mayfair+Lounge+Marian+Calabar",
  },
  {
    id: "paddles",
    name: "Paddles Sports Bar & Nightclub",
    address: "MCC Road, Calabar",
    corridor: "MCC Road",
    specialty: "Premium dance floor, weekend parties, and late-night lounge",
    category: "Lounges & Nightlife",
    mapQuery: "Paddles Lounge Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Paddles+Lounge+Calabar",
  },
  {
    id: "the-dome",
    name: "The Dome Calabar",
    address: "Murtala Mohammed Highway, Calabar",
    corridor: "Murtala Mohammed Highway",
    specialty: "VIP event lounge, nightlife entertainment, and luxury cocktails",
    category: "Lounges & Nightlife",
    mapQuery: "The Dome Calabar Murtala Mohammed Highway",
  },
  {
    id: "art-and-sip",
    name: "Art & Sip / Paint Experience Hub",
    address: "State Housing Estate, Calabar",
    corridor: "State Housing Estate",
    specialty: "Creative sip-and-paint sessions, cocktails, and outdoor artsy ambience",
    category: "Relaxation & Sip",
    mapQuery: "Art and Sip Paint Experience Hub State Housing Estate Calabar",
  },
  {
    id: "calabar-beach-marina-lounge",
    name: "Calabar Beach & Marina Lounge",
    address: "Marina Resort waterfront, Calabar",
    corridor: "Marina Resort waterfront",
    specialty: "Open-air waterfront relaxation, boat cruise views, and calm afternoon drinks",
    category: "Relaxation & Sip",
    mapQuery: "Calabar Beach Marina Lounge Marina Resort Calabar",
  },
  {
    id: "supreme-viking",
    name: "Supreme Viking Restaurant",
    address: "Murtala Mohammed Highway, Calabar",
    corridor: "Murtala Mohammed Highway",
    specialty: "Calabar native kitchen serving authentic Fisherman soup, Afang, and Edikang Ikong",
    category: "Authentic & Grills",
    mapQuery: "Supreme Viking Restaurant Murtala Mohammed Highway Calabar",
  },
  {
    id: "calabar-marina",
    name: "Marina Resort Waterfront Seafood",
    address: "Marina Resort, Calabar",
    corridor: "Marina Resort Waterfront",
    specialty: "Fresh river catfish, grilled croaker, and waterfront breeze",
    category: "Authentic & Grills",
    mapQuery: "Marina Resort Waterfront Seafood Calabar",
  },
  {
    id: "bogobiri-suya",
    name: "Bogobiri Suya Corner",
    address: "Hausa Quarter, Calabar",
    corridor: "Hausa Quarter",
    specialty: "Open-flame beef suya, masa, and spiced grills",
    category: "Authentic & Grills",
    mapQuery: "Bogobiri Suya Corner Hausa Quarter Calabar",
  },
  {
    id: "freddies",
    name: "Freddie's Continental Restaurant",
    address: "State Housing Estate, Calabar",
    corridor: "State Housing Estate",
    specialty: "Steaks, Lebanese mezze, and fine wine",
    category: "Authentic & Grills",
    mapQuery: "Freddie's Continental Restaurant State Housing Estate Calabar",
  },
];

const CATEGORIES = [
  "All Spots",
  "Fast Food & Bites",
  "Lounges & Nightlife",
  "Relaxation & Sip",
  "Authentic & Grills",
];

export default function CalabarDiningMapGuide() {
  const [selectedCategory, setSelectedCategory] = useState("All Spots");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpotId, setSelectedSpotId] = useState(DINING_SPOTS[0].id);

  const filteredSpots = DINING_SPOTS.filter((spot) => {
    const matchesCategory =
      selectedCategory === "All Spots" || spot.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [spot.name, spot.address, spot.corridor, spot.specialty]
        .some((value) => value.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  const selectedSpot =
    filteredSpots.find((spot) => spot.id === selectedSpotId) ?? filteredSpots[0];
  const mapUrl = selectedSpot
    ? `https://maps.google.com/maps?q=${encodeURIComponent(selectedSpot.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : null;
  const navigationUrl = selectedSpot
    ? selectedSpot.navigationUrl ??
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSpot.mapQuery)}`
    : null;

  return (
    <section className="bg-[#070b11] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
            <Utensils className="h-3.5 w-3.5" />
            Calabar lifestyle & street guide
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Find your next Calabar destination
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Explore active fast-food favourites, local cuisine, nightlife,
            shopping, and relaxing spots around the city. Choose a destination
            to see it on the map and get directions.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <div className="mb-4 flex flex-col gap-3">
              <label className="relative block">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search spots, corridors, or dishes..."
                  aria-label="Search dining spots"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-500/60"
                />
              </label>
              <div className="flex flex-wrap gap-2" aria-label="Destination categories">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      const firstSpot = DINING_SPOTS.find(
                        (spot) =>
                          category === "All Spots" || spot.category === category,
                      );
                      if (firstSpot) setSelectedSpotId(firstSpot.id);
                    }}
                    aria-pressed={selectedCategory === category}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                      selectedCategory === category
                        ? "border-amber-400 bg-amber-400 text-slate-950"
                        : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[34rem] space-y-3 overflow-y-auto pr-1">
              {filteredSpots.map((spot) => {
                const isSelected = selectedSpot?.id === spot.id;
                return (
                  <article
                    key={spot.id}
                    className={`rounded-2xl border bg-slate-900/60 p-4 transition sm:p-5 ${
                      isSelected
                        ? "border-amber-400/60 shadow-lg shadow-amber-950/20"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400">
                          <MapPin className="h-3 w-3" />
                          {spot.corridor}
                        </span>
                        <span className="mb-2 ml-2 inline-flex rounded-full border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                          {spot.category}
                        </span>
                        <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                          {spot.name}
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-slate-400">
                          {spot.specialty}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedSpotId(spot.id)}
                        aria-label={`Show ${spot.name} on the map`}
                        aria-pressed={isSelected}
                        className={`shrink-0 rounded-xl p-2.5 transition ${
                          isSelected
                            ? "bg-amber-400 text-slate-950"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                      </button>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name} ${spot.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSelectedSpotId(spot.id)}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 px-3 py-2 text-xs font-bold text-amber-400 transition hover:bg-amber-500/10"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Navigate
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </article>
                );
              })}
              {!filteredSpots.length && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
                  <Search className="mx-auto h-6 w-6 text-slate-500" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    No dining spots found
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Try another search or category.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/30 lg:sticky lg:top-6">
            <div className="flex items-center gap-3 border-b border-slate-800 p-4 sm:p-5">
              <MapPin className="h-5 w-5 shrink-0 text-amber-400" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Selected destination
                </p>
                <p className="truncate text-sm font-semibold text-white">
                  {selectedSpot?.name ?? "Choose a dining spot"}
                </p>
              </div>
            </div>

            {mapUrl ? (
              <iframe
                key={selectedSpot.id}
                title={`Map showing ${selectedSpot.name}`}
                src={mapUrl}
                className="h-72 w-full border-0 sm:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex h-72 items-center justify-center bg-slate-950/70 px-6 text-center text-sm text-slate-400 sm:h-96">
                Select a dining spot to view its location on the map.
              </div>
            )}

            <div className="space-y-4 p-4 sm:p-5">
              <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#070b11] px-3.5 py-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Address
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedSpot?.address ?? "No address available"}
                  </p>
                </div>
              </div>
              <a
                href={navigationUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!navigationUrl}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold transition ${
                  navigationUrl
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-950/30 hover:bg-amber-300"
                    : "pointer-events-none bg-slate-800 text-slate-500"
                }`}
              >
                <Navigation className="h-4 w-4" />
                Start GPS Navigation
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="text-center text-[11px] leading-5 text-slate-500">
                Opens Google Maps directions in a new tab. Dining guide only;
                reservations and food purchases are not handled here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
