import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Search, 
  Lock,
  Phone,
  Mail,
  User,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.jsx";

export const officialAfSnetHotels = [
  {
    id: "metropolitan-hotel",
    name: "Metropolitan Hotel",
    rating: "5-star",
    distanceToCICC: "10 minutes to CICC",
    ciccDistance: "10 minutes to CICC",
    pricePerNight: "₦70,000",
    priceRange: "₦70,000 / night",
    contactPerson: "Victor Uyoata",
    phone: "+234 812 369 6019",
    email: "reservations@metropolitanhotelcalabar.com",
    contact: {
      person: "Victor Uyoata",
      email: "reservations@metropolitanhotelcalabar.com",
      phone: "+234 812 369 6019"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwVnsSkmTO1ClW-M2DnmDyHltxWiiEFFdOp3Z4RnnWA&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwVnsSkmTO1ClW-M2DnmDyHltxWiiEFFdOp3Z4RnnWA&s=10"
  },
  {
    id: "monty-suites",
    name: "Monty Suites",
    rating: "5-star",
    distanceToCICC: "10 minutes to CICC",
    ciccDistance: "10 minutes to CICC",
    pricePerNight: "₦155,000",
    priceRange: "₦155,000 / night",
    contactPerson: "Bassey Ita Asuquo",
    phone: "+234 803 646 1074",
    email: "reservations.calabar@montysuites.com",
    contact: {
      person: "Bassey Ita Asuquo",
      email: "reservations.calabar@montysuites.com",
      phone: "+234 803 646 1074"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKsY-oDblH1L4sU6PTj3CLyj_PBzrhVKUoR0tFDUxpzA&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKsY-oDblH1L4sU6PTj3CLyj_PBzrhVKUoR0tFDUxpzA&s=10"
  },
  {
    id: "channel-view",
    name: "Channel View Hotel",
    rating: "4-star",
    distanceToCICC: "13 minutes to CICC",
    ciccDistance: "13 minutes to CICC",
    pricePerNight: "₦140,000",
    priceRange: "₦140,000 / night",
    contactPerson: "Front Desk Manager",
    phone: "+234 803 974 2044",
    email: "info@channelviewhotelsng.com",
    contact: {
      person: "Front Desk Manager",
      email: "info@channelviewhotelsng.com",
      phone: "+234 803 974 2044"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwb1aI1LphamqXx_BkWBLr7veOle8PmW0XSQhwuQ2gzQ&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwb1aI1LphamqXx_BkWBLr7veOle8PmW0XSQhwuQ2gzQ&s=10"
  },
  {
    id: "gemba-hotel",
    name: "Gemba Hotel & Resort",
    rating: "4-star",
    distanceToCICC: "20 minutes to CICC",
    ciccDistance: "20 minutes to CICC",
    pricePerNight: "₦150,000",
    priceRange: "₦150,000 / night",
    contactPerson: "Reservations Desk",
    phone: "+234 902 222 2094",
    email: "info@gembahotelandresort.com",
    contact: {
      person: "Reservations Desk",
      email: "info@gembahotelandresort.com",
      phone: "+234 902 222 2094"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqu1RrJFlGV4JNi27w61TlICZ53QFD9kZ2faptfUT_Gw&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqu1RrJFlGV4JNi27w61TlICZ53QFD9kZ2faptfUT_Gw&s=10"
  },
  {
    id: "hogis-royale",
    name: "Hogis Royale Apartments",
    rating: "4-star",
    distanceToCICC: "16 minutes to CICC",
    ciccDistance: "16 minutes to CICC",
    pricePerNight: "₦160,000",
    priceRange: "₦160,000 / night",
    contactPerson: "Front Office Manager",
    phone: "+234 703 934 2262",
    email: "fom@hogisluxurysuites.com",
    contact: {
      person: "Front Office Manager",
      email: "fom@hogisluxurysuites.com",
      phone: "+234 703 934 2262"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKs5WY0H_iHF_tSBLN-oPL5_Gg6whfmMkx5dAnnvaJA&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKs5WY0H_iHF_tSBLN-oPL5_Gg6whfmMkx5dAnnvaJA&s=10"
  },
  {
    id: "pearl-suites",
    name: "Pearl Suites",
    rating: "3-star",
    distanceToCICC: "12 minutes to CICC",
    ciccDistance: "12 minutes to CICC",
    pricePerNight: "₦138,800",
    priceRange: "₦138,800 / night",
    contactPerson: "Daniel Francis",
    phone: "+234 913 737 3249",
    email: "pearlsuitehotels@yahoo.com",
    contact: {
      person: "Daniel Francis",
      email: "pearlsuitehotels@yahoo.com",
      phone: "+234 913 737 3249"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFrlVdeMYISQYCoZ6ng7laiIphKFYGsxhNwYqyhzo-KA&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFrlVdeMYISQYCoZ6ng7laiIphKFYGsxhNwYqyhzo-KA&s=10"
  },
  {
    id: "ug-wis",
    name: "UG WIS Hotels & Suites",
    rating: "3-star",
    distanceToCICC: "12 minutes to CICC",
    ciccDistance: "12 minutes to CICC",
    pricePerNight: "₦175,000",
    priceRange: "₦175,000 / night",
    contactPerson: "Chris Ogar",
    phone: "+234 803 966 0825",
    email: "ugwishotels@gmail.com",
    contact: {
      person: "Chris Ogar",
      email: "ugwishotels@gmail.com",
      phone: "+234 803 966 0825"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrCoU1I6RSJq24Bu1cUdIMTJdityQLP5R5fqH4nZn1lQ&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrCoU1I6RSJq24Bu1cUdIMTJdityQLP5R5fqH4nZn1lQ&s=10"
  },
  {
    id: "de-grand",
    name: "De Grand Hotel & Rooftop",
    rating: "3-star",
    distanceToCICC: "17 minutes to CICC",
    ciccDistance: "17 minutes to CICC",
    pricePerNight: "₦140,000",
    priceRange: "₦140,000 / night",
    contactPerson: "Obasanjo Omoleke",
    phone: "+234 803 834 5856",
    email: "degrandbayhotel.rooftop@gmail.com",
    contact: {
      person: "Obasanjo Omoleke",
      email: "degrandbayhotel.rooftop@gmail.com",
      phone: "+234 803 834 5856"
    },
    category: "Accommodations",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw89dIuL9h-m1x-89xY-2a98wR_2mQ7xL_89yK5_40w&s=10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw89dIuL9h-m1x-89xY-2a98wR_2mQ7xL_89yK5_40w&s=10"
  }
];

// Backwards compatibility alias
export const VERIFIED_LISTINGS = officialAfSnetHotels;

export default function AccommodationsView({ onBookHotel }) {
  const [selectedRating, setSelectedRating] = useState("All Stays");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHotelDetails, setActiveHotelDetails] = useState(null);

  const filterOptions = ["All Stays", "5-Star Luxury", "4-Star Executive", "3-Star Comfort"];

  const filteredHotels = officialAfSnetHotels.filter((hotel) => {
    const matchesRating =
      selectedRating === "All Stays" ||
      (selectedRating === "5-Star Luxury" && hotel.rating.startsWith("5")) ||
      (selectedRating === "4-Star Executive" && hotel.rating.startsWith("4")) ||
      (selectedRating === "3-Star Comfort" && hotel.rating.startsWith("3"));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      hotel.name.toLowerCase().includes(query) ||
      hotel.distanceToCICC.toLowerCase().includes(query) ||
      (hotel.contactPerson && hotel.contactPerson.toLowerCase().includes(query)) ||
      (hotel.phone && hotel.phone.toLowerCase().includes(query)) ||
      (hotel.email && hotel.email.toLowerCase().includes(query));

    return matchesRating && matchesSearch;
  });

  const handleBookingClick = (hotel) => {
    const parsedPrice = parseInt(hotel.pricePerNight.replace(/[^\d]/g, ""), 10) || 75000;
    const bookingPayload = {
      ...hotel,
      price: parsedPrice,
      priceNGN: parsedPrice,
      image: hotel.imageUrl,
      corridor: hotel.distanceToCICC,
      vendor: hotel.name,
      vendorName: hotel.name,
      vendorId: hotel.id
    };
    onBookHotel?.(bookingPayload);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Official AfSNET Verified Hotel Directory • 365 Days</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
          Calabar Verified AfSNET Executive Accommodations
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl">
          Browse the {officialAfSnetHotels.length} officially accredited AfSNET hotels with verified conference proximity to the Calabar International Convention Centre (CICC). All guest reservations are backed by the <span className="text-amber-400 font-semibold">CalabarPass Anti-Fraud Escrow Protocol</span>.
        </p>

        {/* Protection Guarantee Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏨</span>
            <div className="text-xs sm:text-sm text-slate-300">
              <span className="font-bold text-emerald-400">Zero-Risk Escrow Guarantee:</span> Your room deposit remains safely locked in state escrow until you arrive on-site and present your 6-digit PIN at the hotel front desk.
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold shrink-0 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            100% Escrow Protected
          </div>
        </div>
      </div>

      {/* Search & Rating Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hotel name, CICC distance, or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedRating(opt)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRating === opt
                  ? "bg-stateCyan text-white shadow-md shadow-stateCyan/20"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {opt === "All Stays" ? `All Stays (${officialAfSnetHotels.length})` : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Verified AfSNET Hotels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredHotels.map((hotel) => (
          <article
            key={hotel.id}
            className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 shadow-xl"
          >
            {/* Image Header with Real URLs */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <VerifiedImage
                item={hotel}
                src={hotel.imageUrl || hotel.image}
                alt={hotel.name}
                aspectRatio="h-48"
                rounded="rounded-none"
                showBadge={false}
                showAttribution={true}
                allowGallery={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  AfSNET Verified
                </span>
              </div>

              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-950/80 border border-amber-500/30 px-2.5 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {hotel.rating}
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-200 text-[11px] font-medium bg-slate-950/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{hotel.distanceToCICC}</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {hotel.name}
                </h3>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    AfSNET Conference Rate
                  </span>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    {hotel.pricePerNight}
                    <span className="text-[10px] text-slate-400 font-normal"> / night</span>
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-300">
                {hotel.contactPerson && (
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium text-slate-200">{hotel.contactPerson}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href={`tel:${hotel.phone}`} className="hover:text-white transition underline-offset-2 hover:underline">
                    {hotel.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href={`mailto:${hotel.email}`} className="hover:text-white transition truncate underline-offset-2 hover:underline">
                    {hotel.email}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-2">
                <button
                  type="button"
                  onClick={() => setActiveHotelDetails(hotel)}
                  className="w-full py-2.5 px-4 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-stateCyan/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>View Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">No AfSNET Hotels Match Your Filter</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search criteria or switch back to "All Stays" to view all 8 accredited hotels.
          </p>
        </div>
      )}

      {/* Hotel Quick Details Modal */}
      {activeHotelDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0f1523] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-5">
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <VerifiedImage
                item={activeHotelDetails}
                src={activeHotelDetails.imageUrl || activeHotelDetails.image}
                alt={activeHotelDetails.name}
                aspectRatio="h-44"
                rounded="rounded-2xl"
                showBadge={true}
                showAttribution={true}
                allowGallery={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={() => setActiveHotelDetails(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-stateCyan text-white font-extrabold text-xs">
                  {activeHotelDetails.rating}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white font-heading">
                {activeHotelDetails.name}
              </h3>
              <p className="text-xs text-cyan-400 flex items-center gap-1.5 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeHotelDetails.distanceToCICC}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Official Nightly Rate:</span>
                <span className="text-amber-400 font-extrabold font-mono">{activeHotelDetails.pricePerNight}</span>
              </div>
              {activeHotelDetails.contactPerson && (
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Accredited Contact:</span>
                  <span className="text-slate-200 font-medium">{activeHotelDetails.contactPerson}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Reservations Phone:</span>
                <a href={`tel:${activeHotelDetails.phone}`} className="text-emerald-400 font-mono hover:underline">
                  {activeHotelDetails.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Direct Email:</span>
                <a href={`mailto:${activeHotelDetails.email}`} className="text-cyan-400 truncate max-w-[220px] hover:underline">
                  {activeHotelDetails.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const h = activeHotelDetails;
                  setActiveHotelDetails(null);
                  handleBookingClick(h);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-extrabold text-xs shadow-lg shadow-stateCyan/20 cursor-pointer transition flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Book with Escrow Protection</span>
              </button>
              <button
                onClick={() => setActiveHotelDetails(null)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}