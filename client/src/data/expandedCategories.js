// client/src/data/expandedCategories.js
// 365-Day Commercial and Tourism Architecture Data for CalabarPass
// Supporting the 5 Distinct Categories:
// 1. Accommodations (Hotels, Resorts, Suites)
// 2. Eco-Sites & Heritage (Marina Resort, Agbokim Waterfalls, Drill Ranch, Kwa Falls)
// 3. Dining & Nightlife (Eateries, Seafood Hubs, Lounges)
// 4. Trade & Expo Hub (Business Passes, Trade Fair Booths, Industrial Exhibitors under Ministry of Commerce)
// 5. Carnival & Culture (Carnival Band Passes, Festival Tickets)

import { PACKAGES as CORE_PACKAGES } from "./packages.js";
import { HOTELS } from "./hotels.js";

export const CATEGORIES_CONFIG = [
  {
    id: "accommodations",
    label: "Accommodations",
    shortLabel: "Accommodations",
    subtitle: "Hotels, Resorts, Suites",
    iconName: "BedDouble",
    tagline: "Executive Hotels, Boutique Resorts & Presidential Suites Across Calabar",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "eco-sites",
    label: "Eco-Sites & Heritage",
    shortLabel: "Eco-Sites & Heritage",
    subtitle: "Marina Resort, Agbokim Waterfalls, Drill Ranch, Kwa Falls",
    iconName: "Trees",
    tagline: "Rainforest Waterfalls, Mountain Plateaus & River Basin Sanctuaries",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "dining-nightlife",
    label: "Dining & Nightlife",
    shortLabel: "Dining & Nightlife",
    subtitle: "Eateries, Seafood Hubs, Lounges",
    iconName: "Utensils",
    tagline: "Authentic Efik Seafood, Fast Bites, Grills & VIP Lounges",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "trade-expo",
    label: "Trade & Expo Hub",
    shortLabel: "Trade & Expo Hub",
    subtitle: "Business Passes, Trade Fair Booths, Industrial Exhibitors under Ministry of Commerce",
    iconName: "Briefcase",
    tagline: "Official Ministry of Commerce Trade Fairs, CICC Booths & Industrial Summits",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "carnival-culture",
    label: "Carnival & Culture",
    shortLabel: "Carnival & Culture",
    subtitle: "Carnival Band Passes, Festival Tickets",
    iconName: "Flame",
    tagline: "Official Band Costumes, Route Passes, Stadium Grandstands & Festivals",
    color: "from-rose-500 to-purple-600"
  }
];

// 1. Accommodations Cards (Transcorp, Monty Suites, Hogis, Channel View, Mega Hilton, Pyramid, Hotel 45, Tinapa Lakeside)
export const ACCOMMODATIONS_CARDS = [
  {
    id: "hotel-transcorp",
    categoryGroup: "accommodations",
    category: "Accommodations",
    subCategory: "Executive Hotels",
    name: "Transcorp Hotels Calabar",
    title: "Transcorp Hotels Calabar - Presidential & Executive Suites",
    vendor: "Transcorp Hotel Calabar",
    vendorName: "Transcorp Hotel Calabar",
    vendorId: "transcorp-hotel",
    location: "10 Murtala Muhammed Highway, Calabar",
    corridor: "10 Murtala Muhammed Highway",
    priceNGN: 120000,
    price: 120000,
    priceRange: "₦90,000 - ₦250,000",
    rating: 4.8,
    reviews: 420,
    badge: "Luxury Flagship",
    escrowBadge: "State Bureau Verified Stay",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    description: "Calabar's flagship luxury hospitality property offering presidential suites, Vienna Café, high-security grounds, and an Olympic-sized swimming pool.",
    details: "Presidential suites, Olympic-sized swimming pool, 24/7 uninterrupted power, armed diplomatic protection, Vienna Café, and executive concierge.",
    included: [
      "Complimentary Buffet Breakfast at Vienna Café",
      "Full Olympic Pool & Gym Access",
      "Armed Diplomatic Perimeter Escort",
      "High-Speed Fiber Wi-Fi & 24/7 Power"
    ],
    perks: [
      "Complimentary Buffet Breakfast",
      "Olympic Pool & Tennis Court Access",
      "Armed Security Perimeter Guard",
      "24/7 Uninterrupted Electricity"
    ],
    amenities: ["Olympic Pool", "Armed Security", "24/7 Power", "Vienna Café", "Gym & Tennis"],
    antiScamAlert: "Unauthorized touts soliciting fake discounted WhatsApp wire transfers. Only book through official escrow voucher.",
    scamRisk: "Unauthorized touts soliciting fake discounted WhatsApp wire transfers.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Escrow Check-In"
  },
  {
    id: "hotel-monty",
    categoryGroup: "accommodations",
    category: "Accommodations",
    subCategory: "Boutique & Resorts",
    name: "Monty Suites Calabar",
    title: "Monty Suites Calabar - Luxury Contemporary Resort",
    vendor: "Monty Suites Calabar",
    vendorName: "Monty Suites Calabar",
    vendorId: "monty-suites",
    location: "Asari Eso Layout / Northern Industrial, Calabar",
    corridor: "Asari Eso Layout / Behind Zone 6",
    priceNGN: 85000,
    price: 85000,
    priceRange: "₦80,000 - ₦220,000",
    rating: 4.7,
    reviews: 315,
    badge: "Premium Boutique",
    escrowBadge: "State Bureau Verified Stay",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    description: "Modern executive resort in Asari Eso featuring private terraces, signature swimming pool, poolside dining, and executive lounge.",
    details: "Executive King rooms, private terrace views, cocktail lounge, swimming pool, and serene residential security in Asari Eso.",
    included: [
      "Executive King Suite Lodging",
      "Signature Poolside Lounge Access",
      "24/7 High-Definition CCTV & Armed Guards",
      "Complimentary Continental Breakfast"
    ],
    perks: [
      "Executive King Suite Lodging",
      "Signature Poolside Lounge Access",
      "24/7 High-Definition CCTV",
      "Complimentary Continental Breakfast"
    ],
    amenities: ["Outdoor Pool", "Executive Lounge", "24/7 CCTV", "Breakfast", "Cocktail Bar"],
    antiScamAlert: "Third-party social media booking agents charging inflated rates during festival peaks.",
    scamRisk: "Third-party social media booking agents charging inflated rates during festival peaks.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Escrow Check-In"
  },
  {
    id: "hotel-hogis",
    categoryGroup: "accommodations",
    category: "Accommodations",
    subCategory: "Boutique & Resorts",
    name: "Hogis Luxury Suites",
    title: "Hogis Luxury Suites - VIP Private Suites",
    vendor: "Hogis Luxury Suites",
    vendorName: "Hogis Luxury Suites",
    vendorId: "hogis-suites",
    location: "7 Housing Estate Road, State Housing, Calabar",
    corridor: "7 Housing Estate Road, State Housing",
    priceNGN: 75000,
    price: 75000,
    priceRange: "₦75,000 - ₦180,000",
    rating: 4.7,
    reviews: 210,
    badge: "Boutique Executive",
    escrowBadge: "State Bureau Verified Stay",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    description: "High-profile boutique stay in State Housing, renowned for VIP private suites, cocktail mixology lounge, and top-tier culinary dining.",
    details: "VIP private suites, cocktail mixology lounge, 24/7 uninterrupted power, smart TV with streaming, and quiet executive estate location.",
    included: [
      "VIP Deluxe Suite Accommodation",
      "Signature Cocktail Welcome Drink",
      "Smart TV & Ultra-Fast Fiber Wi-Fi",
      "Dedicated Private Concierge Desk"
    ],
    perks: [
      "VIP Deluxe Suite Accommodation",
      "Signature Cocktail Welcome Drink",
      "Smart TV & Ultra-Fast Fiber Wi-Fi",
      "Dedicated Private Concierge Desk"
    ],
    amenities: ["Outdoor Pool", "Cocktail Bar", "24/7 Power", "Smart TV & Fast Wi-Fi", "Private Concierge"],
    antiScamAlert: "Verify check-in PIN directly at front desk. Never transfer deposit to personal mobile accounts.",
    scamRisk: "Never transfer deposit to personal mobile accounts without escrow protection.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Escrow Check-In"
  },
  {
    id: "hotel-channel-view",
    categoryGroup: "accommodations",
    category: "Accommodations",
    subCategory: "Executive Hotels",
    name: "Channel View Hotel",
    title: "Channel View Hotel - Carnival Route Front-Row Lodging",
    vendor: "Channel View Hotel",
    vendorName: "Channel View Hotel",
    vendorId: "channel-view",
    location: "27/29 MCC Road, Calabar",
    corridor: "27/29 MCC Road (Official Carnival Procession Axis)",
    priceNGN: 65000,
    price: 65000,
    priceRange: "₦65,000 - ₦140,000",
    rating: 4.5,
    reviews: 115,
    badge: "Carnival Prime Route",
    escrowBadge: "State Bureau Verified Stay",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    description: "Right on the official carnival procession path with front-row parade viewing, event halls, and 24/7 secured parking.",
    details: "Front-row balconies overlooking MCC Road, spacious rooms, authentic restaurant, banquet halls, and multi-tier security.",
    included: [
      "Prime MCC Road Balcony Suite Access",
      "Secured On-Site Parking with Armed Patrol",
      "24/7 Electricity & Clean Water",
      "In-House Restaurant Breakfast Voucher"
    ],
    perks: [
      "Prime MCC Road Balcony Suite Access",
      "Secured On-Site Parking",
      "24/7 Electricity & Clean Water",
      "In-House Restaurant Breakfast"
    ],
    amenities: ["Carnival View", "24/7 Electricity", "Event Halls", "Secured Parking", "Restaurant"],
    antiScamAlert: "Extreme street price hikes on MCC Road during December. Escrow locks your rate at verified baseline.",
    scamRisk: "Extreme street price hikes on MCC Road during December.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Escrow Check-In"
  },
  {
    id: "hotel-tinapa-lakeside",
    categoryGroup: "accommodations",
    category: "Accommodations",
    subCategory: "Boutique & Resorts",
    name: "Tinapa Lakeside Hotel",
    title: "Tinapa Lakeside Hotel & Waterpark Resort",
    vendor: "Tinapa Lakeside Hotel",
    vendorName: "Tinapa Lakeside Hotel",
    vendorId: "tinapa-lakeside",
    location: "Tinapa Free Zone, Adiabo, Calabar",
    corridor: "Tinapa Free Zone & Resort Complex",
    priceNGN: 55000,
    price: 55000,
    priceRange: "₦55,000 - ₦130,000",
    rating: 4.2,
    reviews: 89,
    badge: "Waterfront Resort",
    escrowBadge: "State Bureau Verified Stay",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "Picturesque waterfront resort set beside the tranquil Tinapa Lake with lush tropical rainforest views and conferencing facilities.",
    details: "Lakefront guest rooms, Tinapa waterpark and movie studio proximity, serene natural breeze, and spacious conferencing halls.",
    included: [
      "Lake-View Executive Room",
      "Tinapa Waterpark Recreational Access",
      "Serene Forest & Lake Walking Trails",
      "Complimentary Buffet Breakfast"
    ],
    perks: [
      "Lake-View Executive Room",
      "Tinapa Waterpark Access",
      "Serene Forest Walking Trails",
      "Complimentary Buffet Breakfast"
    ],
    amenities: ["Lake Views", "Waterpark Access", "Serene Nature", "Conferencing", "24/7 Security"],
    antiScamAlert: "Unlicensed shuttles soliciting rides to Tinapa. Use accredited state transport.",
    scamRisk: "Unlicensed shuttles soliciting rides to Tinapa at high cash rates.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Escrow Check-In"
  },
  {
    id: "hotel-pyramid",
    categoryGroup: "accommodations",
    category: "Accommodations",
    subCategory: "Executive Hotels",
    name: "Pyramid Hotel & Suites",
    title: "Pyramid Hotel & Suites - Highway Central Base",
    vendor: "Pyramid Hotel & Suites",
    vendorName: "Pyramid Hotel & Suites",
    vendorId: "pyramid-hotel",
    location: "152 Murtala Muhammed Highway, Calabar",
    corridor: "152 Murtala Mohammed Highway",
    priceNGN: 45000,
    price: 45000,
    priceRange: "₦45,000 - ₦95,000",
    rating: 4.3,
    reviews: 64,
    badge: "Highway Central",
    escrowBadge: "State Bureau Verified Stay",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    description: "Direct highway access offering quick links to Margaret Ekpo Airport and U.J. Esuene Stadium with full executive amenities.",
    details: "Executive Highway rooms, direct connection to transit hubs, air conditioning, secured gated parking, and prompt room service.",
    included: [
      "Highway Executive Suite",
      "Gated Parking with Armed Guard",
      "Air Conditioning & 24/7 Power Backup",
      "High-Speed Wi-Fi"
    ],
    perks: [
      "Highway Executive Suite",
      "Gated Parking with Armed Guard",
      "Air Conditioning & 24/7 Power",
      "High-Speed Wi-Fi"
    ],
    amenities: ["Restaurant", "Secure Parking", "Air Conditioning", "24/7 Power", "Airport Transit Link"],
    antiScamAlert: "Always demand escrow digital check-in voucher upon arrival.",
    scamRisk: "Always demand escrow digital check-in voucher upon arrival.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Escrow Check-In"
  }
];

// 2. Eco-Sites & Heritage Cards (Marina Resort, Agbokim Waterfalls, Drill Ranch, Kwa Falls, Obudu Mountain Resort)
export const ECO_SITES_CARDS = [
  ...CORE_PACKAGES.filter(p => p.id !== "pkg-seagull-pass").map(p => ({
    ...p,
    categoryGroup: "eco-sites",
    subCategory: p.id === "pkg-obudu-expedition" ? "Highland Sanctuary"
      : p.id === "pkg-agbokim-waterfalls" || p.id === "pkg-kwa-falls" ? "Waterfalls & Canyons"
      : p.id === "pkg-drill-ranch" ? "Wildlife & Rainforest"
      : "Waterfront & Heritage"
  }))
];

// 3. Dining & Nightlife Cards (Eateries, Seafood Hubs, Lounges)
export const DINING_NIGHTLIFE_CARDS = [
  {
    id: "dine-crunchies-marian",
    categoryGroup: "dining-nightlife",
    category: "Dining & Nightlife",
    subCategory: "Eateries & Fast Food",
    name: "Crunchies Fast Food (Marian Road Branch)",
    title: "Crunchies Fast Food Marian Family Combo Pass",
    vendor: "Crunchies Fast Food & Pastries",
    vendorName: "Crunchies Fast Food & Pastries",
    vendorId: "crunchies-calabar",
    location: "Marian Road Corridor, Calabar",
    corridor: "Marian Road",
    specialty: "Crispy fried chicken, golden meat pies, and jollof rice combos",
    priceNGN: 4500,
    price: 4500,
    rating: 4.6,
    reviews: 280,
    badge: "Accredited Fast Food",
    escrowBadge: "Verified Culinary Voucher",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=80",
    description: "Famous fast-food destination on Marian Road known for crispy fried chicken, warm meat pies, soft ice cream, and quick service combos.",
    details: "Redeemable voucher for signature crispy fried chicken combo, side of seasoned jollof or fried rice, golden meat pie, and chilled drink.",
    included: [
      "2-Piece Golden Crispy Chicken & Jollof Rice Combo",
      "Freshly Baked Calabar Meat Pie",
      "Chilled Soft Drink or Fresh Juice",
      "Priority Order Counter Lane for Escrow Holders"
    ],
    perks: [
      "2-Piece Golden Crispy Chicken & Jollof Combo",
      "Freshly Baked Meat Pie",
      "Chilled Drink / Juice",
      "Priority Order Lane"
    ],
    mapQuery: "Crunchies Fast Food Marian Road Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Crunchies+Fast+Food+Marian+Road+Calabar",
    antiScamAlert: "Beware informal street food vendors overcharging visitors with unhygienic street stalls. Use verified food vouchers.",
    scamRisk: "Informal touts reselling expired food coupons on Marian Road.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily 8am - 10pm • Instant Escrow PIN"
  },
  {
    id: "dine-supreme-viking",
    categoryGroup: "dining-nightlife",
    category: "Dining & Nightlife",
    subCategory: "Seafood Hubs & Native",
    name: "Supreme Viking Authentic Seafood & Native Kitchen",
    title: "Supreme Viking Fisherman Soup & Efik Feast Pass",
    vendor: "Supreme Viking Authentic Seafood & Native Kitchen",
    vendorName: "Supreme Viking Authentic Seafood & Native Kitchen",
    vendorId: "supreme-viking",
    location: "Murtala Muhammed Highway, Calabar",
    corridor: "Murtala Mohammed Highway",
    specialty: "Authentic Fisherman soup, Afang, and Edikang Ikong with fresh river periwinkle",
    priceNGN: 6500,
    price: 6500,
    rating: 4.8,
    reviews: 195,
    badge: "Heritage Native Kitchen",
    escrowBadge: "Verified Culinary Voucher",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    description: "The gold standard for traditional Efik culinary cuisine. Famed for rich, authentic Fisherman Soup filled with fresh river catch, periwinkles, and dried prawns.",
    details: "Clay-pot bowl of authentic Calabar Fisherman Soup or rich Afang soup, choice of freshly pounded yam or semo, assorted goat meat, and palm wine.",
    included: [
      "Signature Clay-Pot Fisherman Soup or Edikang Ikong",
      "Fresh Pounded Yam or Starch Swallow",
      "Assorted Smoked Catfish, Snails & Periwinkle",
      "Chilled Calabar Palm Wine or Zobo Cocktail"
    ],
    perks: [
      "Signature Clay-Pot Fisherman Soup",
      "Fresh Pounded Yam Swallow",
      "Smoked Catfish & Periwinkle",
      "Calabar Palm Wine / Zobo"
    ],
    mapQuery: "Supreme Viking Restaurant Murtala Mohammed Highway Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Supreme+Viking+Restaurant+Murtala+Mohammed+Highway+Calabar",
    antiScamAlert: "Beware generic restaurants watering down traditional soups with cheap substitutes. Supreme Viking is Bureau certified.",
    scamRisk: "Watered-down imitation soups served by unregistered street food stalls.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily 11am - 11pm • Instant Escrow PIN"
  },
  {
    id: "dine-marina-seafood",
    categoryGroup: "dining-nightlife",
    category: "Dining & Nightlife",
    subCategory: "Seafood Hubs & Native",
    name: "Marina Resort Waterfront Seafood Hub",
    title: "Marina Resort Waterfront Grilled Catfish Feast",
    vendor: "Marina Resort Waterfront Seafood Hub",
    vendorName: "Marina Resort Waterfront Seafood Hub",
    vendorId: "marina-seafood",
    location: "Marina Resort Waterfront, Calabar",
    corridor: "Marina Resort Waterfront",
    specialty: "Fresh river catfish, grilled croaker, spicy pepper soup & waterfront breeze",
    priceNGN: 8500,
    price: 8500,
    rating: 4.7,
    reviews: 310,
    badge: "Waterfront Seafood Hub",
    escrowBadge: "Verified Culinary Voucher",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
    description: "Dine directly along the Calabar River with open-air sunset views, freshly caught grilled river catfish spiced with authentic local herbs, and roasted plantains.",
    details: "Whole live-grilled river catfish or sea croaker, spicy Efik pepper glaze, roasted ripe plantains (boli), and outdoor waterfront cabana seating.",
    included: [
      "Whole Freshly Charcoal-Grilled River Catfish",
      "Roasted Boli (Plantains) with Spicy Pepper Sauce",
      "Calabar Riverfront Outdoor Table Reservation",
      "Complimentary Waterfront Drink of Choice"
    ],
    perks: [
      "Whole Charcoal-Grilled River Catfish",
      "Roasted Boli & Spicy Pepper Glaze",
      "Riverfront Cabana Reservation",
      "Complimentary Waterfront Drink"
    ],
    mapQuery: "Marina Resort Waterfront Seafood Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Marina+Resort+Waterfront+Seafood+Calabar",
    antiScamAlert: "Unlicensed fish sellers at informal jetties weighing dead fish on rigged scales. Stick to verified resort stalls.",
    scamRisk: "Unlicensed informal fish stalls on unlit waterfront alleys.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily 12pm - Midnight • Instant Escrow PIN"
  },
  {
    id: "dine-the-arena",
    categoryGroup: "dining-nightlife",
    category: "Dining & Nightlife",
    subCategory: "Lounges & Nightlife",
    name: "The Arena Lounge & Grills",
    title: "The Arena Lounge BBQ Fish & Evening Cocktails Pass",
    vendor: "The Arena Lounge & Grills",
    vendorName: "The Arena Lounge & Grills",
    vendorId: "the-arena",
    location: "Marian Road Axis, Calabar",
    corridor: "Marian Road",
    specialty: "BBQ fish platters, grilled spicy wings, signature cocktails & live acoustic sets",
    priceNGN: 7500,
    price: 7500,
    rating: 4.6,
    reviews: 140,
    badge: "VIP Night Lounge",
    escrowBadge: "Verified Nightlife Voucher",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    description: "The heartbeat of Calabar's evening lounge scene on Marian Road, featuring open-air courtyard lounges, artisan grilled wings, and chilled cocktails.",
    details: "Reserved lounge seating, spicy BBQ platter (chicken wings and fish bites), two signature craft cocktails, and live DJ sets.",
    included: [
      "VIP Courtyard Lounge Table Reservation",
      "Signature Arena BBQ Platter with Grilled Wings",
      "Two Premium Craft Cocktails or Beer Buckets",
      "Fast-Track Entry on Weekend Nights"
    ],
    perks: [
      "VIP Courtyard Lounge Reservation",
      "Signature Arena BBQ Platter",
      "Two Premium Craft Cocktails",
      "Fast-Track Entry Lane"
    ],
    mapQuery: "The Arena Lounge and Grills Marian Road Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=The+Arena+Lounge+and+Grills+Marian+Road+Calabar",
    antiScamAlert: "Counterfeit bottle service reported at unverified roadside bars. Only drink sealed bottles at verified venues.",
    scamRisk: "Touts charging unauthorized 'gate access fees' outside Marian lounges.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily 4pm - 3am • Instant Escrow PIN"
  },
  {
    id: "dine-mayfair-lounge",
    categoryGroup: "dining-nightlife",
    category: "Dining & Nightlife",
    subCategory: "Lounges & Nightlife",
    name: "Mayfair VIP Lounge & Nightclub",
    title: "Mayfair VIP Nightlife & Resident DJ Experience",
    vendor: "Mayfair Lounge & Club",
    vendorName: "Mayfair Lounge & Club",
    vendorId: "mayfair-lounge",
    location: "Marian Road Corridor, Calabar",
    corridor: "Marian Road Corridor",
    specialty: "High-energy VIP clubbing, illuminated dance floor & top Nigerian DJs",
    priceNGN: 15000,
    price: 15000,
    rating: 4.7,
    reviews: 220,
    badge: "Premier Nightclub",
    escrowBadge: "Verified Nightlife Voucher",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description: "Cross River State's premier upscale nightlife venue. Premium sound systems, international guest DJs, VIP bottle service, and top-tier security.",
    details: "VIP entry wristband, reserved mezzanine seating, premium bottle discount voucher, and dedicated bouncer escort.",
    included: [
      "Priority VIP Line Skip & Club Entry",
      "Mezzanine VIP Lounge Table Access",
      "₦10,000 Bottle Service Credit Towards Menu",
      "Dedicated Security Escort & Valet Parking"
    ],
    perks: [
      "Priority VIP Line Skip",
      "Mezzanine VIP Table Access",
      "₦10,000 Bottle Service Credit",
      "Dedicated Security Escort"
    ],
    mapQuery: "Mayfair Lounge Marian Calabar",
    navigationUrl: "https://www.google.com/maps/search/?api=1&query=Mayfair+Lounge+Marian+Calabar",
    antiScamAlert: "Unauthorized parking attendants on Marian Road demanding cash fees. Use Mayfair's guarded valet lot.",
    scamRisk: "Fake VIP wristbands sold outside club entrance.",
    bookingMode: "365_day_open",
    capacityLabel: "Wednesday - Sunday 9pm - 5am • Instant Escrow PIN"
  }
];

// 4. Trade & Expo Hub Cards (Ministry of Commerce 365 Commercial Architecture)
export const TRADE_EXPO_CARDS = [
  {
    id: "trade-fair-pass",
    categoryGroup: "trade-expo",
    category: "Trade & Expo Hub",
    subCategory: "Business Passes",
    name: "Cross River State 365 Trade Fair Commercial Buyer Pass",
    title: "Cross River 365 Commercial Buyer & Investor Pass",
    vendor: "Cross River State Ministry of Commerce & Trade Bureau",
    vendorName: "Cross River State Ministry of Commerce & Trade Bureau",
    vendorId: "commerce-ministry",
    location: "Calabar International Convention Centre (CICC) & Trade Grounds",
    corridor: "Summit Hills & Trade Fair Grounds",
    priceNGN: 35000,
    price: 35000,
    streetSurgePrice: 65000,
    rating: 4.9,
    reviews: 145,
    badge: "Ministry of Commerce Accredited",
    escrowBadge: "State Trade Bureau Certified",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    description: "Official multi-day commercial buyer pass issued under the Cross River State Ministry of Commerce. Grants verified access to trade pavilions, B2B investor lounges, and commercial matchings.",
    details: "All-access 5-day commercial buyer badge, private B2B networking lounge, verified exhibitor registry catalog, Ministry of Commerce trade facilitator briefing, and fast-track security clearance.",
    included: [
      "All-Access Multi-Day Commercial Buyer RFID Pass",
      "Exclusive Access to CICC Executive B2B Investor Lounge",
      "Official Cross River State Exhibitor & Manufacturer Directory",
      "State Ministry of Commerce Trade Facilitation Desk Support"
    ],
    perks: [
      "Multi-Day Buyer RFID Pass",
      "Executive B2B Investor Lounge",
      "Official Exhibitor Directory",
      "Ministry Trade Facilitator Support"
    ],
    antiScamAlert: "Unaccredited street brokers selling counterfeit trade badges outside CICC gates. All genuine passes require digital escrow verification.",
    scamRisk: "Unaccredited street brokers selling counterfeit paper trade badges outside CICC gates.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Commercial Guarantee"
  },
  {
    id: "trade-cicc-booth",
    categoryGroup: "trade-expo",
    category: "Trade & Expo Hub",
    subCategory: "Exhibition Booths",
    name: "CICC SME & Industrial Exhibition Booth Reservation",
    title: "CICC 9sqm Shell-Scheme Exhibition Booth Pass",
    vendor: "Calabar International Convention Centre (CICC)",
    vendorName: "Calabar International Convention Centre (CICC)",
    vendorId: "cicc-trade-expo",
    location: "Summit Hills, CICC Main Exhibition Hall, Calabar",
    corridor: "Summit Hills / CICC Complex",
    priceNGN: 150000,
    price: 150000,
    streetSurgePrice: 220000,
    rating: 4.9,
    reviews: 82,
    badge: "Official Trade Fair Pavilion",
    escrowBadge: "State Trade Bureau Certified",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    description: "Secure an official standard 9sqm shell-scheme commercial exhibition booth at Calabar International Convention Centre under Ministry of Commerce sponsorship.",
    details: "9sqm carpeted shell-scheme exhibition space, 24/7 continuous industrial power supply, 2 spotlights, 1 table, 2 chairs, official fascia board branding, and 3 exhibitor badges.",
    included: [
      "Standard 9sqm Shell-Scheme Booth with Custom Fascia Board",
      "24/7 Redundant Power & Fast Fiber Wi-Fi Connection",
      "3 Full-Access Exhibitor Staff RFID Badges",
      "Company Profile Featured in Official Trade Guide"
    ],
    perks: [
      "Standard 9sqm Shell-Scheme Booth",
      "24/7 Redundant Industrial Power",
      "3 Exhibitor Staff RFID Badges",
      "Feature in Official Trade Guide"
    ],
    antiScamAlert: "Bogus online agencies charging advance fees without Ministry exhibition allocation. Escrow vault protects 100% of booth fee.",
    scamRisk: "Bogus online agencies charging advance booth fees without Ministry allocation.",
    bookingMode: "365_day_open",
    capacityLabel: "Limited Booth Slots • Escrow Protected Allocation"
  },
  {
    id: "trade-ftz-delegation",
    categoryGroup: "trade-expo",
    category: "Trade & Expo Hub",
    subCategory: "Industrial Exhibitors",
    name: "Calabar Free Trade Zone Industrial Delegation Access",
    title: "Calabar FTZ Industrial Park & Port Delegation Pass",
    vendor: "Cross River State Ministry of Commerce & FTZ Authority",
    vendorName: "Cross River State Ministry of Commerce & FTZ Authority",
    vendorId: "commerce-ministry",
    location: "Calabar Free Trade Zone, Port Access Road, Calabar",
    corridor: "Calabar Free Trade Zone Axis",
    priceNGN: 50000,
    price: 50000,
    streetSurgePrice: 85000,
    rating: 4.8,
    reviews: 67,
    badge: "Export & Free Zone Authority",
    escrowBadge: "State Trade Bureau Certified",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Exclusive investor and manufacturer delegation tour of the Calabar Free Trade Zone, modern deep-seaport terminals, tax-free warehousing, and industrial parks.",
    details: "Air-conditioned executive transit from city centre, official Ministry of Commerce industrial officer escort, investor incentive portfolio briefing, and B2B factory floor meetings.",
    included: [
      "Guided Industrial Park & Seaport Inspection Escort",
      "Ministry of Commerce Tax-Incentive Policy Briefing Kit",
      "Direct B2B Matchmaking with Resident Manufacturers",
      "Round-Trip Secured Executive Transit from Transcorp/CICC"
    ],
    perks: [
      "Guided Industrial Park Inspection",
      "Tax-Incentive Policy Briefing Kit",
      "Direct B2B Manufacturer Sessions",
      "Round-Trip Secured Executive Transit"
    ],
    antiScamAlert: "Unofficial touts posing as Free Trade Zone customs agents demanding illegal cash entry tolls at port gates.",
    scamRisk: "Unofficial touts posing as Free Trade Zone customs agents demanding cash entry tolls.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Weekly • 365-Day Industrial Escrow"
  },
  {
    id: "trade-agro-summit",
    categoryGroup: "trade-expo",
    category: "Trade & Expo Hub",
    subCategory: "Business Passes",
    name: "Cross River Agro-Allied & Cocoa Export Summit Delegate Pass",
    title: "Agro-Allied Commodity Export Summit Delegate Pass",
    vendor: "Cross River State Ministry of Commerce & Commercial Agriculture Guild",
    vendorName: "Cross River State Ministry of Commerce & Commercial Agriculture Guild",
    vendorId: "commerce-ministry",
    location: "Cultural Centre Complex / Transcorp Hall, Calabar",
    corridor: "Cultural Centre Complex, Murtala Mohammed Highway",
    priceNGN: 40000,
    price: 40000,
    streetSurgePrice: 70000,
    rating: 4.7,
    reviews: 94,
    badge: "Commercial Agriculture Bureau",
    escrowBadge: "State Trade Bureau Certified",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    description: "Connect directly with top cocoa, oil palm, rubber, and cashew exporters from Cross River State's fertile agricultural belts in Ikom, Etung, and Akamkpa.",
    details: "Full 2-day delegate summit pass, commodity pricing roundtables, export terminal logistics guide, networking luncheon, and certified exporter credential.",
    included: [
      "2-Day Commodity Export Summit Delegate Badge",
      "Cross River Verified Cocoa & Oil Palm Exporters Registry",
      "Networking Executive Luncheon at Transcorp Hall",
      "Ministry of Commerce Export Documentation Assistance"
    ],
    perks: [
      "2-Day Summit Delegate Badge",
      "Cocoa & Oil Palm Exporters Registry",
      "Networking Executive Luncheon",
      "Export Documentation Assistance"
    ],
    antiScamAlert: "Bogus commodity middleman syndicates demanding upfront cash deposits for unverified cocoa warehouses.",
    scamRisk: "Bogus commodity middleman syndicates demanding cash deposits for ghost warehouses.",
    bookingMode: "365_day_open",
    capacityLabel: "Quarterly Summit Series • 365-Day Escrow Protection"
  }
];

// 5. Carnival & Culture Cards (Carnival Band Passes, Festival Tickets)
export const CARNIVAL_CULTURE_CARDS = [
  CORE_PACKAGES.find(p => p.id === "pkg-seagull-pass") ? {
    ...CORE_PACKAGES.find(p => p.id === "pkg-seagull-pass"),
    categoryGroup: "carnival-culture",
    subCategory: "Carnival Band Passes"
  } : {
    id: "pkg-seagull-pass",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Carnival Band Passes",
    title: "Official Carnival Calabar VIP Route Pass (Seagull Band)",
    name: "Official Carnival Calabar VIP Route Pass (Seagull Band)",
    vendor: "Seagull Band Secretariat",
    vendorName: "Seagull Band Secretariat",
    vendorId: "seagull-band",
    location: "Marian Road / Stadium Route, Calabar",
    corridor: "Marian Road / Stadium Route",
    priceNGN: 85000,
    price: 85000,
    streetSurgePrice: 135000,
    badge: "Official Secretariat Verified",
    escrowBadge: "Official Secretariat Verified",
    image: "/assets/seagull_band.jpg",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description: "Official 2026 route wristband, handcrafted feather costume kit, hydration truck access, and dedicated security escort along the 12km carnival route.",
    details: "Official 2026 route wristband, handcrafted feather costume kit, hydration truck access, and dedicated security escort along the 12km carnival route.",
    included: [
      "Official 2026 Carnival Route Wristband",
      "Handcrafted Feather & Sequin Costume Kit",
      "All-Day Hydration & Refreshment Truck Access",
      "Dedicated Escort & Paramedic Team along Marian Road"
    ],
    perks: [
      "Official 2026 Carnival Route Wristband",
      "Handcrafted Feather & Sequin Costume Kit",
      "All-Day Hydration & Refreshment Truck Access",
      "Dedicated Escort & Paramedic Team"
    ],
    antiScamAlert: "Extreme counterfeit wristbands reported on Marian Road street corners. Only verified band RFID chips pass scanning.",
    scamRisk: "Extreme counterfeit wristbands reported on Marian Road street corners.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Guarantee"
  },
  {
    id: "pkg-passion4-pass",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Carnival Band Passes",
    title: "Passion 4 Band All-Access Street Pass & Costume",
    name: "Passion 4 Band All-Access Street Pass & Costume",
    vendor: "Passion 4 Band Secretariat",
    vendorName: "Passion 4 Band Secretariat",
    vendorId: "passion4-band",
    location: "Marian Road / MCC Procession Axis, Calabar",
    corridor: "Marian Road / MCC Procession Axis",
    priceNGN: 78000,
    price: 78000,
    streetSurgePrice: 125000,
    rating: 4.9,
    reviews: 320,
    badge: "Official Secretariat Verified",
    escrowBadge: "Official Secretariat Verified",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    description: "March with the most decorated band in Carnival Calabar history. Includes competition section wristband, signature green-and-gold costume, and float truck access.",
    details: "Authentic Passion 4 registration, competition adjudication zone clearance, bespoke handcrafted costume kit, chilled refreshments, and emergency response escort.",
    included: [
      "Official 2026 Passion 4 Competition Wristband",
      "Signature Handcrafted Feather Costume Kit",
      "Mobile Sound Truck & Refreshment Access",
      "Official Band Secretarial Verification PIN"
    ],
    perks: [
      "Official Passion 4 Competition Wristband",
      "Signature Handcrafted Feather Costume",
      "Sound Truck & Refreshment Access",
      "Official Secretarial Verification PIN"
    ],
    antiScamAlert: "Cloned wristbands sold by street scalpers fail optical gate scanners. Book only via CalabarPass escrow.",
    scamRisk: "Cloned wristbands sold by street scalpers fail optical gate scanners.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Guarantee"
  },
  {
    id: "pkg-masta-blasta",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Carnival Band Passes",
    title: "Masta Blasta Official Carnival Pass & Costume",
    name: "Masta Blasta Official Carnival Pass & Costume",
    vendor: "Masta Blasta Band Secretariat",
    vendorName: "Masta Blasta Band Secretariat",
    vendorId: "masta-blasta",
    location: "Marian Road / Stadium Route, Calabar",
    corridor: "Marian Road / Stadium Route",
    priceNGN: 82000,
    price: 82000,
    streetSurgePrice: 130000,
    rating: 4.8,
    reviews: 210,
    badge: "Official Secretariat Verified",
    escrowBadge: "Official Secretariat Verified",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    description: "Join the explosive high-energy orange army. Signature orange and gold costume package, all-day DJ sound float accompany, and secured carnival corridor access.",
    details: "Official Masta Blasta parade section kit, security clearance wristband, hydration truck supply, and medical team escort.",
    included: [
      "Official Masta Blasta 2026 RFID Wristband",
      "Vibrant Orange Carnival Costume & Headpiece",
      "All-Day Float Music & Energy Truck Access",
      "Dedicated Paramedic & Security Detail"
    ],
    perks: [
      "Official 2026 RFID Wristband",
      "Vibrant Orange Costume & Headpiece",
      "All-Day Float Music & Energy Truck",
      "Dedicated Paramedic Detail"
    ],
    antiScamAlert: "Scalpers selling fake wristbands outside MCC junction. Only official escrow vouchers are accepted at band secretariat.",
    scamRisk: "Scalpers selling fake wristbands outside MCC junction.",
    bookingMode: "365_day_open",
    capacityLabel: "Open Daily • 365-Day Guarantee"
  },
  {
    id: "pkg-stadium-vip",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Festival Tickets",
    name: "VIP U.J. Esuene Stadium Elevated Grandstand Ticket",
    title: "VIP Stadium Elevated Grandstand & Adjudication Box",
    vendor: "Calabar Festival Secretariat & Ministry of Tourism",
    vendorName: "Calabar Festival Secretariat & Ministry of Tourism",
    vendorId: "stadium-festival-box",
    location: "U.J. Esuene Stadium, Calabar",
    corridor: "U.J. Esuene Stadium Complex",
    priceNGN: 35000,
    price: 35000,
    streetSurgePrice: 65000,
    rating: 4.9,
    reviews: 180,
    badge: "Festival Bureau Certified",
    escrowBadge: "State Bureau Verified Pass",
    image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1200&q=80",
    description: "Unobstructed elevated view of the final carnival band grand finale performances and international concerts inside U.J. Esuene Stadium.",
    details: "Shaded VIP grandstand seat, dedicated security turnstile, air-conditioned restroom access, and official festival programme guide.",
    included: [
      "Reserved Shaded Grandstand Seating with Clear Stage View",
      "Fast-Track Turnstile Entry Gate Access",
      "Air-Conditioned VIP Restroom & Refreshment Bar Access",
      "Tamper-Proof Micro-Holographic Digital Ticket"
    ],
    perks: [
      "Reserved Shaded Grandstand Seating",
      "Fast-Track Turnstile Entry",
      "Air-Conditioned VIP Restroom Access",
      "Tamper-Proof Holographic Pass"
    ],
    antiScamAlert: "Laminated photocopies sold at stadium gates. Bureau passes have tamper-evident micro-holograms and 6-digit escrow verification.",
    scamRisk: "Laminated photocopies sold at stadium gates.",
    bookingMode: "365_day_open",
    capacityLabel: "Numbered Seating • 100% Escrow Protected"
  },
  {
    id: "pkg-leboku-festival",
    categoryGroup: "carnival-culture",
    category: "Carnival & Culture",
    subCategory: "Festival Tickets",
    name: "Leboku New Yam Cultural Festival Experience",
    title: "Leboku New Yam Cultural Festival & Royal Pageant Pass",
    vendor: "Leboku Cultural Council & Ugep Tourism Guild",
    vendorName: "Leboku Cultural Council & Ugep Tourism Guild",
    vendorId: "leboku-council",
    location: "Ugep, Yakurr LGA, Cross River State",
    corridor: "Ugep Royal Palace & Festival Arena",
    priceNGN: 20000,
    price: 20000,
    streetSurgePrice: 38000,
    rating: 4.8,
    reviews: 95,
    badge: "Royal Heritage Council",
    escrowBadge: "State Bureau Verified Pass",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    description: "August cultural celebration of the legendary Leboku New Yam Festival in Ugep. Traditional Yakurr wrestling arena, Miss Leboku beauty pageant, and Obol Lopon royal court.",
    details: "Arena grandstand pass, Yakurr cultural council escort, traditional palm wine & roasted yam feast, and Obol Lopon palace courtyard viewing access.",
    included: [
      "Leboku Festival Arena Reserved Seating Pass",
      "Traditional Yakurr Wrestling Tournament Access",
      "Royal Palace Courtyard Viewing & Cultural Pageant",
      "Authentic Roasted Yam Feast with Traditional Herbs"
    ],
    perks: [
      "Leboku Arena Reserved Seating Pass",
      "Yakurr Wrestling Tournament Access",
      "Royal Palace Courtyard Access",
      "Authentic Roasted Yam Feast"
    ],
    antiScamAlert: "Unregistered roadside guides demanding cash tolls along Calabar-Ikom highway. Escrow guarantees verified festival guild transit.",
    scamRisk: "Unregistered roadside guides demanding cash tolls.",
    bookingMode: "365_day_open",
    capacityLabel: "Annual August Showcase • 365-Day Escrow Protection"
  }
];

// Unified Catalogue of All Cards across 5 Categories
export const ALL_EXPANDED_CARDS = [
  ...ACCOMMODATIONS_CARDS,
  ...ECO_SITES_CARDS,
  ...DINING_NIGHTLIFE_CARDS,
  ...TRADE_EXPO_CARDS,
  ...CARNIVAL_CULTURE_CARDS
];

export function getCardsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return ALL_EXPANDED_CARDS;
  return ALL_EXPANDED_CARDS.filter(card => card.categoryGroup === categoryId);
}

export function getCategoryCounts() {
  return {
    all: ALL_EXPANDED_CARDS.length,
    accommodations: ACCOMMODATIONS_CARDS.length,
    "eco-sites": ECO_SITES_CARDS.length,
    "dining-nightlife": DINING_NIGHTLIFE_CARDS.length,
    "trade-expo": TRADE_EXPO_CARDS.length,
    "carnival-culture": CARNIVAL_CULTURE_CARDS.length
  };
}
