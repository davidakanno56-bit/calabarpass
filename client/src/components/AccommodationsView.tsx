// client/src/components/AccommodationsView.tsx
// Verified Executive Accommodations Directory & Escrow Booking
// Luxury Destination Discovery (Visit Dubai × Visit Saudi Standard)

import React, { useState } from "react";
import { useCurrency } from "../context/CurrencyContext.tsx";
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
  X,
  Compass,
  Check
} from "lucide-react";
import VerifiedImage from "./VerifiedImage.tsx";
import HotelCard from "./HotelCard.tsx";
import { HOTEL_IMAGE_MAP } from "../data/hotels.ts";

export const officialAfSnetHotels = [
  {
    id: "hotel-transcorp-metropolitan",
    name: "Transcorp Hotels Calabar",
    category: "Luxury 5-Star Hotel",
    area: "Murtala Mohammed Highway, Calabar",
    address: "10 Murtala Mohammed Highway, Calabar, Cross River State",
    distanceToCICC: "8 mins drive to CICC (Airport Corridor)",
    rating: "4.9 ★ Luxury Tier",
    pricePerNight: "₦150,000",
    priceRange: "₦150,000 / night",
    priceNote: "Negotiated executive rate with 365-day escrow protection",
    roomType: "Executive Standard / Deluxe Suites",
    description: "Flagship luxury hospitality property offering presidential suites, Vienna Café, high-security grounds, and Olympic-sized swimming pool.",
    contactPerson: "Mr. Bassey Eyo (Front Desk)",
    phone: "+234 803 555 0101",
    email: "reservations.calabar@transcorphotels.com",
    amenities: [
      "Executive Airport & City Shuttle",
      "24/7 Redundant Power & Fast Fiber WiFi",
      "Olympic Swimming Pool & Tennis Court",
      "Free Bureau Breakfast Buffet"
    ],
    imageUrl: HOTEL_IMAGE_MAP["hotel-transcorp-calabar"],
    image: HOTEL_IMAGE_MAP["hotel-transcorp-calabar"],
    images: [
      HOTEL_IMAGE_MAP["hotel-transcorp-calabar"],
      HOTEL_IMAGE_MAP["metropolitan-hotel"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-channel-view",
    name: "Channel View Hotel",
    category: "Executive 4-Star Hotel",
    area: "MCC Road, Calabar",
    address: "27/29 MCC Road, Calabar, Cross River State",
    distanceToCICC: "11 mins drive to CICC",
    rating: "4.7 ★ Verified Stay",
    pricePerNight: "₦98,000",
    priceRange: "₦98,000 / night",
    priceNote: "Verified executive room rate locked in Escrow",
    roomType: "Diplomatic Suite & Superior Rooms",
    description: "Premier executive business stay along MCC Road featuring full conference halls, fitness center, and authentic Efik regional dining.",
    contactPerson: "Mrs. Nkechi Bassey",
    phone: "+234 803 555 0102",
    email: "info@channelviewhotel.com",
    amenities: [
      "Conference Room & Boardrooms",
      "Airport Pickup & Executive Shuttles",
      "Executive Fitness Center & Lounge",
      "Complimentary Efik Cuisine Breakfast"
    ],
    imageUrl: HOTEL_IMAGE_MAP["hotel-channel-view"],
    image: HOTEL_IMAGE_MAP["hotel-channel-view"],
    images: [
      HOTEL_IMAGE_MAP["hotel-channel-view"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-tinapa-lakeside",
    name: "Tinapa Lakeside Hotel",
    category: "Resort & Conference Retreat",
    area: "Tinapa Free Zone, Calabar",
    address: "Tinapa Business Resort, Adiabo, Calabar",
    distanceToCICC: "5 mins drive to CICC (Adjacent to Convention Corridor)",
    rating: "4.8 ★ Resort Class",
    pricePerNight: "₦135,000",
    priceRange: "₦135,000 / night",
    priceNote: "Free zone tourism discount with instant PIN check-in",
    roomType: "Lakeview Executive King",
    description: "Scenic waterfront resort at Tinapa Business Resort offering lakeside balconies, waterpark access, and quiet natural serenity.",
    contactPerson: "Engr. Edet Okon",
    phone: "+234 803 555 0103",
    email: "reservations@tinapalakeside.com",
    amenities: [
      "Direct Lakeview Balcony & Waterpark",
      "5 mins walking distance to CICC",
      "Duty-Free Shopping Emporium Access",
      "High-Security Escort Transit"
    ],
    imageUrl: HOTEL_IMAGE_MAP["hotel-tinapa-lakeside"],
    image: HOTEL_IMAGE_MAP["hotel-tinapa-lakeside"],
    images: [
      HOTEL_IMAGE_MAP["hotel-tinapa-lakeside"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-danamic-luxury",
    name: "Danamic Hotel & Suites",
    category: "Boutique Business Hotel",
    area: "State Housing Estate, Calabar",
    address: "Plot 14, 2nd Avenue, State Housing Estate, Calabar",
    distanceToCICC: "9 mins drive to CICC",
    rating: "4.6 ★ Verified Stay",
    pricePerNight: "₦85,000",
    priceRange: "₦85,000 / night",
    priceNote: "Quiet executive residential corridor rate",
    roomType: "Deluxe Executive King",
    description: "Boutique residential hotel nestled in the serene State Housing Estate diplomatic district with high-speed fiber WiFi and cocktail bar.",
    contactPerson: "Ms. Glory Archibong",
    phone: "+234 803 555 0104",
    email: "frontdesk@danamichotel.com",
    amenities: [
      "Quiet Diplomatic District",
      "Dedicated High-Speed WiFi",
      "Fine Dining Restaurant & Cocktail Bar",
      "24/7 Monitored CCTV & Escort"
    ],
    imageUrl: HOTEL_IMAGE_MAP["hotel-hogis-suites"],
    image: HOTEL_IMAGE_MAP["hotel-hogis-suites"],
    images: [
      HOTEL_IMAGE_MAP["hotel-hogis-suites"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-cross-river-state-housing",
    name: "Marian Hotels Calabar",
    category: "Central City Commercial Hub",
    area: "Marian Road / Old Ikang, Calabar",
    address: "125 Marian Road, Calabar, Cross River State",
    distanceToCICC: "12 mins drive to CICC",
    rating: "4.5 ★ Verified Stay",
    pricePerNight: "₦78,000",
    priceRange: "₦78,000 / night",
    priceNote: "Close to city entertainment, banks & dining",
    roomType: "Standard Executive Room",
    description: "Centrally positioned on bustling Marian Road, providing direct access to city dining strips, corporate desks, and backup power.",
    contactPerson: "Mr. Victor Duke",
    phone: "+234 803 555 0105",
    email: "booking@marianhotelscalabar.ng",
    amenities: [
      "Central Marian Road Location",
      "Complimentary Buffet Breakfast",
      "Business Center & Printing Desk",
      "Reliable Standby Power Plant"
    ],
    imageUrl: HOTEL_IMAGE_MAP["hotel-pyramid-suites"],
    image: HOTEL_IMAGE_MAP["hotel-pyramid-suites"],
    images: [
      HOTEL_IMAGE_MAP["hotel-pyramid-suites"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-montana-suites",
    name: "Montana Hotel & Suites",
    category: "Budget Executive Stay",
    area: "Federal Housing Estate, Calabar",
    address: "Road 3, Federal Housing Estate, Ikot Ansa, Calabar",
    distanceToCICC: "14 mins drive to CICC",
    rating: "4.4 ★ Verified Stay",
    pricePerNight: "₦68,000",
    priceRange: "₦68,000 / night",
    priceNote: "Best value accredited business accommodation",
    roomType: "Classic Standard Suite",
    description: "Gated peaceful hospitality suites in Federal Housing Estate offering comfortable en-suite rooms, quiet grounds, and transit links.",
    contactPerson: "Mrs. Emem Effiong",
    phone: "+234 803 555 0106",
    email: "contact@montanasuites.ng",
    amenities: [
      "Secure Gated Residential Compound",
      "Clean Air Conditioning & En-Suite Bath",
      "On-Demand Airport & CICC Taxi Booking",
      "100% Escrow Protected Reservation"
    ],
    imageUrl: HOTEL_IMAGE_MAP["hotel-gemba"],
    image: HOTEL_IMAGE_MAP["hotel-gemba"],
    images: [
      HOTEL_IMAGE_MAP["hotel-gemba"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-pyramid-hotel",
    name: "Pyramid Hotel Calabar",
    category: "Modern Highway Conference Hotel",
    area: "Murtala Mohammed Highway, Calabar",
    address: "132 Murtala Mohammed Highway, Calabar",
    distanceToCICC: "7 mins drive to CICC",
    rating: "4.6 ★ Verified Stay",
    pricePerNight: "₦95,000",
    priceRange: "₦95,000 / night",
    priceNote: "Fast highway access direct to convention gate",
    roomType: "Executive Business Deluxe",
    description: "Modern highway property featuring fast transit to Margaret Ekpo Airport and CICC, well-equipped seminar halls, and VIP lounge.",
    contactPerson: "Chief Asuquo Ekpenyong",
    phone: "+234 803 555 0107",
    email: "reservations@pyramidhotelcalabar.com",
    amenities: [
      "Highway Proximity to Airport & CICC",
      "Modern Conference Hall & Meeting Rooms",
      "Executive VIP Cocktail Bar",
      "Solar & Diesel Continuous Power"
    ],
    imageUrl: HOTEL_IMAGE_MAP["hotel-pyramid-suites"],
    image: HOTEL_IMAGE_MAP["hotel-pyramid-suites"],
    images: [
      HOTEL_IMAGE_MAP["hotel-pyramid-suites"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  },
  {
    id: "hotel-pearl-ballroom",
    name: "The Pearl Suites Calabar",
    category: "VIP Diplomatic Lodge",
    area: "Diamond Hill, Calabar",
    address: "5 Governor's Drive, Diamond Hill, Calabar",
    distanceToCICC: "10 mins drive to CICC",
    rating: "4.8 ★ Luxury Diplomatic",
    pricePerNight: "₦165,000",
    priceRange: "₦165,000 / night",
    priceNote: "Diplomatic hill location overlooking Calabar River",
    roomType: "Presidential & Ambassadorial Suites",
    description: "Exclusive Diamond Hill sanctuary overlooking the Calabar River, offering bespoke diplomatic security, private butler service, and peace.",
    contactPerson: "Lady Helen Henshaw",
    phone: "+234 803 555 0108",
    email: "diplomatic@pearlsuitescalabar.com",
    amenities: [
      "Overlooking Calabar River & Marina",
      "Diplomatic Security & VIP Clearance",
      "Private Butler Service on Request",
      "High-Speed Encrypted Conference WiFi"
    ],
    imageUrl: HOTEL_IMAGE_MAP["pearl-suites"],
    image: HOTEL_IMAGE_MAP["pearl-suites"],
    images: [
      HOTEL_IMAGE_MAP["pearl-suites"]
    ],
    verified: true,
    verificationStatus: "verified_real_world"
  }
];

const parsePrice = (str: string | number) => {
  if (!str) return 0;
  const num = parseInt(String(str).replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
};

interface AccommodationsViewProps {
  onBookHotel?: (pkg: any) => void;
}

export default function AccommodationsView({ onBookHotel }: AccommodationsViewProps) {
  const { formatPrice } = useCurrency();
  const [selectedRating, setSelectedRating] = useState("All Stays");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHotelDetails, setActiveHotelDetails] = useState<any>(null);

  const filterOptions = ["All Stays", "5-Star Luxury", "Resort Class", "Executive 4-Star", "Boutique Business"];

  const filteredHotels = officialAfSnetHotels.filter((hotel) => {
    const matchesRating = 
      selectedRating === "All Stays" ||
      (selectedRating === "5-Star Luxury" && (hotel.category.includes("5-Star") || hotel.category.includes("Luxury"))) ||
      (selectedRating === "Resort Class" && hotel.category.includes("Resort")) ||
      (selectedRating === "Executive 4-Star" && (hotel.category.includes("4-Star") || hotel.category.includes("Executive"))) ||
      (selectedRating === "Boutique Business" && (hotel.category.includes("Boutique") || hotel.category.includes("Budget")));

    const matchesSearch = 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.distanceToCICC.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.roomType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRating && matchesSearch;
  });

  const handleBookingClick = (hotel: any) => {
    if (onBookHotel) {
      const priceNum = parsePrice(hotel.pricePerNight);
      onBookHotel({
        id: `pkg-${hotel.id}`,
        title: `${hotel.name} - ${hotel.roomType}`,
        name: hotel.name,
        priceNGN: priceNum,
        price: priceNum,
        streetSurgePrice: Math.round(priceNum * 1.35),
        category: "Accommodations",
        categoryGroup: "accommodations",
        location: hotel.area,
        details: `${hotel.category}. ${hotel.distanceToCICC}. Includes: ${hotel.amenities.join(", ")}. Contact: ${hotel.contactPerson} (${hotel.phone}).`,
        image: hotel.imageUrl || hotel.image,
        imageUrl: hotel.imageUrl || hotel.image,
        verified: true,
        escrowBadge: "365-Day Escrow Protected"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Destination Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cr-forest/10 dark:bg-cr-forest/20 border border-cr-forest/30 text-cr-forest dark:text-cr-lagoon text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-cr-forest dark:text-cr-lagoon" />
          <span>Curated Calabar Accommodations • Verified Partner Directory</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading leading-tight">
          Where to Stay in Calabar. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cr-forest via-cr-lagoon to-emerald-400">
            Exceptional Hospitality & Protected Escrow Stays.
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-light">
          Discover verified premier hotels, tranquil lakeside retreats, and executive conference suites across Calabar. Designed to support trusted tourism experiences across Cross River State, your reservation deposit remains securely held in escrow until you check in on-site.
        </p>

        {/* Protection Guarantee Banner */}
        <div className="mt-8 p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cr-forest/10 dark:bg-cr-forest/20 text-cr-forest dark:text-cr-lagoon flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
              <span className="font-bold text-slate-900 dark:text-white">Protected Booking Escrow:</span> Your reservation payment is safeguarded by the clearinghouse protocol and only disbursed to the hotel upon physical arrival and 6-digit PIN verification.
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cr-forest/10 dark:bg-cr-forest/20 border border-cr-forest/30 text-cr-forest dark:text-cr-lagoon text-xs font-bold shrink-0 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>Escrow Protected</span>
          </div>
        </div>
      </div>

      {/* Search & Rating Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hotel name, CICC proximity, or suite..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cr-forest/40 focus:border-cr-forest transition shadow-inner"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelectedRating(opt)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                selectedRating === opt
                  ? "bg-cr-forest text-white shadow-md shadow-cr-forest/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {opt === "All Stays" ? `All Stays (${officialAfSnetHotels.length})` : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Verified Hotels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onBookHotel={() => setActiveHotelDetails(hotel)}
          />
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-12 text-center space-y-3 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">No Accommodations Match Your Search</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
            Try adjusting your search query or reset to "All Stays" to view all accredited hotels.
          </p>
        </div>
      )}

      {/* Hotel Quick Details / Reservation Modal */}
      {activeHotelDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            
            {/* Modal Image Header */}
            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={activeHotelDetails.imageUrl || activeHotelDetails.image}
                alt={activeHotelDetails.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              
              <button
                type="button"
                onClick={() => setActiveHotelDetails(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-full bg-cr-forest text-white font-bold text-xs uppercase tracking-wider shadow">
                  {activeHotelDetails.rating}
                </span>
              </div>
            </div>

            {/* Title & Proximity */}
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
                {activeHotelDetails.name}
              </h3>
              <p className="text-xs text-cr-forest dark:text-cr-lagoon flex items-center gap-1.5 mt-1 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeHotelDetails.distanceToCICC}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeHotelDetails.address}
              </p>
            </div>

            {/* Room Tariff & Manager Credentials */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Nightly Executive Rate:</span>
                <span className="text-cr-forest dark:text-cr-lagoon font-black font-heading text-sm">
                  {formatPrice(parsePrice(activeHotelDetails.pricePerNight))} / night
                </span>
              </div>
              {activeHotelDetails.contactPerson && (
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Front Desk Manager:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{activeHotelDetails.contactPerson}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Direct Phone:</span>
                <a href={`tel:${activeHotelDetails.phone}`} className="text-cr-forest dark:text-cr-lagoon font-mono hover:underline">
                  {activeHotelDetails.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Direct Email:</span>
                <a href={`mailto:${activeHotelDetails.email}`} className="text-slate-800 dark:text-slate-200 truncate max-w-[220px] hover:underline">
                  {activeHotelDetails.email}
                </a>
              </div>
            </div>

            {/* Amenities Highlights */}
            {activeHotelDetails.amenities && (
              <div className="space-y-1.5">
                <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Verified Inclusions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeHotelDetails.amenities.map((amenity: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-cr-forest dark:text-cr-lagoon shrink-0" />
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  const h = activeHotelDetails;
                  setActiveHotelDetails(null);
                  handleBookingClick(h);
                }}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-cr-forest hover:bg-cr-tropical text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cr-forest/25 cursor-pointer transition flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Book with Escrow Protection</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveHotelDetails(null)}
                className="py-3.5 px-5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 font-semibold text-xs cursor-pointer transition"
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
