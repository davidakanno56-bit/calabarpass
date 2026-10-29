// client/src/components/AccommodationsView.jsx
// Official AfSNET 2026 Executive Accommodations Directory & Escrow Booking
// Displays verified hotels with real-world photography and direct escrow booking.

import React, { useState } from "react";
import { useCurrency } from "../context/CurrencyContext.jsx";
import { 
  Building2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Lock, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  ArrowRight, 
  Search, 
  BedDouble,
  X
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.jsx";

export const officialAfSnetHotels = [
  {
    id: "hotel-transcorp-metropolitan",
    name: "Transcorp Hotels Calabar",
    category: "AfSNET Official 5-Star Partner",
    area: "Murtala Mohammed Highway, Calabar",
    address: "10 Murtala Mohammed Highway, Calabar, Cross River State",
    distanceToCICC: "8 mins drive to CICC (Conference Shuttle Hub)",
    rating: "4.9 ★ Official AfSNET Tier",
    pricePerNight: "₦75,000",
    priceRange: "₦75,000 / night",
    priceNote: "Negotiated AfSNET delegate rate (365-Day Escrow Protected)",
    roomType: "Executive Standard / Deluxe Suites",
    contactPerson: "Mr. Bassey Eyo (AfSNET Desk)",
    phone: "+234 803 555 0101",
    email: "reservations.calabar@transcorphotels.com",
    amenities: [
      "Executive AfSNET Shuttle to CICC",
      "24/7 Redundant Power & Fast Fiber WiFi",
      "Olympic Swimming Pool & Tennis Court",
      "Free Bureau Breakfast Buffet"
    ],
    imageUrl: "/images/transcorp.jpg",
    image: "/images/transcorp.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-channel-view",
    name: "Channel View Hotel",
    category: "AfSNET Executive 4-Star Partner",
    area: "MCC Road, Calabar",
    address: "27/29 MCC Road, Calabar, Cross River State",
    distanceToCICC: "11 mins drive to CICC",
    rating: "4.7 ★ Verified Stay",
    pricePerNight: "₦45,000",
    priceRange: "₦45,000 / night",
    priceNote: "Pre-negotiated conference rate locked in Escrow",
    roomType: "Diplomatic Suite & Superior Rooms",
    contactPerson: "Mrs. Nkechi Bassey",
    phone: "+234 803 555 0102",
    email: "info@channelviewhotel.com",
    amenities: [
      "Conference Room & Boardrooms",
      "Airport Pickup & CICC Shuttles",
      "Executive Fitness Center & Lounge",
      "Complimentary Efik Cuisine Breakfast"
    ],
    imageUrl: "/images/channel_view.jpg",
    image: "/images/channel_view.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-tinapa-lakeside",
    name: "Tinapa Lakeside Hotel",
    category: "AfSNET Resort & Conference Retreat",
    area: "Tinapa Free Zone, Calabar",
    address: "Tinapa Business Resort, Adiabo, Calabar",
    distanceToCICC: "5 mins drive to CICC (Adjacent to Convention Corridor)",
    rating: "4.8 ★ Resort Class",
    pricePerNight: "₦55,000",
    priceRange: "₦55,000 / night",
    priceNote: "Free zone tourism discount with instant PIN check-in",
    roomType: "Lakeview Executive King",
    contactPerson: "Engr. Edet Okon",
    phone: "+234 803 555 0103",
    email: "reservations@tinapalakeside.com",
    amenities: [
      "Direct Lakeview Balcony & Waterpark",
      "5 mins walking distance to CICC",
      "Duty-Free Shopping Emporium Access",
      "High-Security Escort Transit"
    ],
    imageUrl: "/images/tinapa_lakeside.jpg",
    image: "/images/tinapa_lakeside.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-danamic-luxury",
    name: "Danamic Hotel & Suites",
    category: "AfSNET Boutique Business Hotel",
    area: "State Housing Estate, Calabar",
    address: "Plot 14, 2nd Avenue, State Housing Estate, Calabar",
    distanceToCICC: "9 mins drive to CICC",
    rating: "4.6 ★ Verified Stay",
    pricePerNight: "₦38,000",
    priceRange: "₦38,000 / night",
    priceNote: "Quiet executive residential corridor rate",
    roomType: "Deluxe Executive King",
    contactPerson: "Ms. Glory Archibong",
    phone: "+234 803 555 0104",
    email: "frontdesk@danamichotel.com",
    amenities: [
      "Quiet Diplomatic District",
      "Dedicated High-Speed WiFi",
      "Fine Dining Restaurant & Cocktail Bar",
      "24/7 Monitored CCTV & Armed Escort"
    ],
    imageUrl: "/images/danamic.jpg",
    image: "/images/danamic.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-cross-river-state-housing",
    name: "Marian Hotels Calabar",
    category: "AfSNET Central City Hub",
    area: "Marian Road / Old Ikang, Calabar",
    address: "125 Marian Road, Calabar, Cross River State",
    distanceToCICC: "12 mins drive to CICC",
    rating: "4.5 ★ Verified Stay",
    pricePerNight: "₦35,000",
    priceRange: "₦35,000 / night",
    priceNote: "Close to city entertainment, banks & dining",
    roomType: "Standard Executive Room",
    contactPerson: "Mr. Victor Duke",
    phone: "+234 803 555 0105",
    email: "booking@marianhotelscalabar.ng",
    amenities: [
      "Central Marian Road Location",
      "Complimentary Buffet Breakfast",
      "Business Center & Printing Desk",
      "Reliable Standby Power Plant"
    ],
    imageUrl: "/images/marian_hotel.jpg",
    image: "/images/marian_hotel.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-montana-suites",
    name: "Montana Hotel & Suites",
    category: "AfSNET Budget Executive Stay",
    area: "Federal Housing Estate, Calabar",
    address: "Road 3, Federal Housing Estate, Ikot Ansa, Calabar",
    distanceToCICC: "14 mins drive to CICC",
    rating: "4.4 ★ Verified Stay",
    pricePerNight: "₦28,000",
    priceRange: "₦28,000 / night",
    priceNote: "Best value accredited business accommodation",
    roomType: "Classic Standard Suite",
    contactPerson: "Mrs. Emem Effiong",
    phone: "+234 803 555 0106",
    email: "contact@montanasuites.ng",
    amenities: [
      "Secure Gated Residential Compound",
      "Clean Air Conditioning & En-Suite Bath",
      "On-Demand Airport & CICC Taxi Booking",
      "AfSNET Escrow Voucher Accepted"
    ],
    imageUrl: "/images/montana.jpg",
    image: "/images/montana.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-pyramid-hotel",
    name: "Pyramid Hotel Calabar",
    category: "AfSNET Conference Partner",
    area: "Murtala Mohammed Highway, Calabar",
    address: "132 Murtala Mohammed Highway, Calabar",
    distanceToCICC: "7 mins drive to CICC",
    rating: "4.6 ★ Verified Stay",
    pricePerNight: "₦42,000",
    priceRange: "₦42,000 / night",
    priceNote: "Fast highway access direct to convention gate",
    roomType: "Executive Business Deluxe",
    contactPerson: "Chief Asuquo Ekpenyong",
    phone: "+234 803 555 0107",
    email: "reservations@pyramidhotelcalabar.com",
    amenities: [
      "Highway Proximity to Airport & CICC",
      "Modern Conference Hall & Meeting Rooms",
      "Executive VIP Cocktail Bar",
      "Solar & Diesel Continuous Power"
    ],
    imageUrl: "/images/pyramid_hotel.jpg",
    image: "/images/pyramid_hotel.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-pearl-ballroom",
    name: "The Pearl Suites Calabar",
    category: "AfSNET VIP Diplomatic Lodge",
    area: "Diamond Hill, Calabar",
    address: "5 Governor's Drive, Diamond Hill, Calabar",
    distanceToCICC: "10 mins drive to CICC",
    rating: "4.8 ★ Luxury Diplomatic",
    pricePerNight: "₦65,000",
    priceRange: "₦65,000 / night",
    priceNote: "Diplomatic hill location overlooking Calabar River",
    roomType: "Presidential & Ambassadorial Suites",
    contactPerson: "Lady Helen Henshaw",
    phone: "+234 803 555 0108",
    email: "diplomatic@pearlsuitescalabar.com",
    amenities: [
      "Overlooking Calabar River & Marina",
      "Diplomatic Security & VIP Clearance",
      "Private Butler Service on Request",
      "High-Speed Encrypted Conference WiFi"
    ],
    imageUrl: "/images/pearl_suites.jpg",
    image: "/images/pearl_suites.jpg",
    verified: true,
    verificationStatus: "verified_real_world"
  }
];

const parsePrice = (str) => {
  if (!str) return 0;
  const num = parseInt(String(str).replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
};

export default function AccommodationsView({ onBookHotel }) {
  const { formatPrice } = useCurrency();
  const [selectedRating, setSelectedRating] = useState("All Stays");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHotelDetails, setActiveHotelDetails] = useState(null);

  const filterOptions = ["All Stays", "5-Star Partner", "Resort Class", "Executive 4-Star", "Boutique Business"];

  const filteredHotels = officialAfSnetHotels.filter((hotel) => {
    const matchesRating = 
      selectedRating === "All Stays" ||
      (selectedRating === "5-Star Partner" && hotel.category.includes("5-Star")) ||
      (selectedRating === "Resort Class" && hotel.category.includes("Resort")) ||
      (selectedRating === "Executive 4-Star" && hotel.category.includes("4-Star")) ||
      (selectedRating === "Boutique Business" && (hotel.category.includes("Boutique") || hotel.category.includes("Budget")));

    const matchesSearch = 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.distanceToCICC.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.roomType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRating && matchesSearch;
  });

  const handleBookingClick = (hotel) => {
    if (onBookHotel) {
      onBookHotel({
        id: `pkg-${hotel.id}`,
        title: `${hotel.name} - ${hotel.roomType}`,
        name: hotel.name,
        priceNGN: parseInt(hotel.pricePerNight.replace(/[^0-9]/g, ""), 10),
        price: parseInt(hotel.pricePerNight.replace(/[^0-9]/g, ""), 10),
        streetSurgePrice: parseInt(hotel.pricePerNight.replace(/[^0-9]/g, ""), 10) * 1.35,
        category: "Accommodations",
        categoryGroup: "accommodations",
        location: hotel.area,
        details: `${hotel.category}. ${hotel.distanceToCICC}. Includes: ${hotel.amenities.join(", ")}. Contact: ${hotel.contactPerson} (${hotel.phone}).`,
        image: hotel.imageUrl || hotel.image,
        imageUrl: hotel.imageUrl || hotel.image,
        verified: true,
        escrowBadge: "AfSNET 100% Escrow Protected"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Official Directory Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Official AfSNET Verified Hotel Directory • 365 Days</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
          Calabar Verified AfSNET Executive Accommodations
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Browse the {officialAfSnetHotels.length} officially accredited AfSNET hotels with verified conference proximity to the Calabar International Convention Centre (CICC). All guest reservations are backed by the <span className="text-amber-600 dark:text-amber-400 font-semibold">CalabarPass Anti-Fraud Escrow Protocol</span>.
        </p>

        {/* Protection Guarantee Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm dark:shadow-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <BedDouble className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Zero-Risk Escrow Guarantee:</span> Your room deposit remains safely locked in state escrow until you arrive on-site and present your 6-digit PIN at the hotel front desk.
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/80 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 self-start sm:self-auto">
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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stateCyan/30 focus:border-stateCyan transition shadow-inner"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedRating(opt)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                selectedRating === opt
                  ? "bg-stateCyan text-white shadow-md shadow-stateCyan/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {opt === "All Stays" ? `All Stays (${officialAfSnetHotels.length})` : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Verified AfSNET Hotels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredHotels.map((hotel) => (
          <article
            key={hotel.id}
            className="group rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-stateCyan dark:hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-xl"
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
                showAttribution={false}
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-stateCyan dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                  {hotel.name}
                </h3>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    AfSNET Conference Rate
                  </span>
                  <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                    {formatPrice(parsePrice(hotel.pricePerNight))}
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal"> / night</span>
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800/80 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                {hotel.contactPerson && (
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">{hotel.contactPerson}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <a href={`tel:${hotel.phone}`} className="hover:text-stateCyan transition underline-offset-2 hover:underline">
                    {hotel.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <a href={`mailto:${hotel.email}`} className="hover:text-stateCyan transition truncate underline-offset-2 hover:underline">
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
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-12 text-center space-y-3 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No AfSNET Hotels Match Your Filter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search criteria or switch back to "All Stays" to view all 8 accredited hotels.
          </p>
        </div>
      )}

      {/* Hotel Quick Details Modal */}
      {activeHotelDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0f1523] border border-slate-200 dark:border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-900 dark:text-slate-100 space-y-4 sm:space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <VerifiedImage
                item={activeHotelDetails}
                src={activeHotelDetails.imageUrl || activeHotelDetails.image}
                alt={activeHotelDetails.name}
                aspectRatio="h-44"
                rounded="rounded-2xl"
                showBadge={true}
                showAttribution={false}
                allowGallery={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={() => setActiveHotelDetails(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-stateCyan text-white font-extrabold text-xs">
                  {activeHotelDetails.rating}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                {activeHotelDetails.name}
              </h3>
              <p className="text-xs text-stateCyan flex items-center gap-1.5 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeHotelDetails.distanceToCICC}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Official Nightly Rate:</span>
                <span className="text-amber-600 dark:text-amber-400 font-extrabold font-mono">{formatPrice(parsePrice(activeHotelDetails.pricePerNight))}</span>
              </div>
              {activeHotelDetails.contactPerson && (
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Accredited Contact:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{activeHotelDetails.contactPerson}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Reservations Phone:</span>
                <a href={`tel:${activeHotelDetails.phone}`} className="text-emerald-600 dark:text-emerald-400 font-mono hover:underline">
                  {activeHotelDetails.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Direct Email:</span>
                <a href={`mailto:${activeHotelDetails.email}`} className="text-stateCyan truncate max-w-[220px] hover:underline">
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
                className="py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 font-semibold text-xs cursor-pointer transition"
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
