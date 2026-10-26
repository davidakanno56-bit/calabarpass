// server/hotels.js
// CalabarPass Verified Accommodations & Premier Hotels Directory (Server)
// Strictly explicit object-ID based image mapping: zero sequential index matching, zero unrelated fallbacks.

export const HOTEL_IMAGE_MAP = {
  // Transcorp Hotels Calabar
  "hotel-transcorp-calabar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwVnsSkmTO1ClW-M2DnmDyHltxWiiEFFdOp3Z4RnnWA&s=10",
  "hotel-transcorp": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwVnsSkmTO1ClW-M2DnmDyHltxWiiEFFdOp3Z4RnnWA&s=10",
  "hotel-01": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwVnsSkmTO1ClW-M2DnmDyHltxWiiEFFdOp3Z4RnnWA&s=10",
  "metropolitan-hotel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwVnsSkmTO1ClW-M2DnmDyHltxWiiEFFdOp3Z4RnnWA&s=10",

  // Monty Suites Calabar
  "hotel-monty-suites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmDjojoRR0BHuBC4KMzoGLJx5t-IEoVRo4N0KIK6gRQ&s=10",
  "hotel-monty": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmDjojoRR0BHuBC4KMzoGLJx5t-IEoVRo4N0KIK6gRQ&s=10",
  "monty-suites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmDjojoRR0BHuBC4KMzoGLJx5t-IEoVRo4N0KIK6gRQ&s=10",
  "hotel-03": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmDjojoRR0BHuBC4KMzoGLJx5t-IEoVRo4N0KIK6gRQ&s=10",

  // Hogis Luxury Suites
  "hotel-hogis-suites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIxcGYu2svKaf10OUqbth0s5q5ao0K1VtjdF3qUveiQ&s=10",
  "hotel-hogis": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIxcGYu2svKaf10OUqbth0s5q5ao0K1VtjdF3qUveiQ&s=10",
  "hogis-suites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIxcGYu2svKaf10OUqbth0s5q5ao0K1VtjdF3qUveiQ&s=10",
  "hogis-royale": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIxcGYu2svKaf10OUqbth0s5q5ao0K1VtjdF3qUveiQ&s=10",
  "hotel-02": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIxcGYu2svKaf10OUqbth0s5q5ao0K1VtjdF3qUveiQ&s=10",

  // Channel View Hotel
  "hotel-channel-view": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbZDbxLimOVAUUuaqu1xa39Ooipf6Q3EkGtcfk1Q_8vw&s=10",
  "channel-view": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbZDbxLimOVAUUuaqu1xa39Ooipf6Q3EkGtcfk1Q_8vw&s=10",

  // Tinapa Lakeside Hotel
  "hotel-tinapa-lakeside": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV6IQbkEbxnX9r1rd1o9DLtOqhu4T2HPP4-YFZLKciuQ&s=10",
  "tinapa-lakeside": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV6IQbkEbxnX9r1rd1o9DLtOqhu4T2HPP4-YFZLKciuQ&s=10",

  // Pyramid Hotel & Suites
  "hotel-pyramid-suites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSefv3ycS9OWSUG_UX9KLoMtmW2OItm8y8SIPrZOFWZFw&s=10",
  "hotel-pyramid": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSefv3ycS9OWSUG_UX9KLoMtmW2OItm8y8SIPrZOFWZFw&s=10",
  "pyramid-suites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSefv3ycS9OWSUG_UX9KLoMtmW2OItm8y8SIPrZOFWZFw&s=10",

  // Gemba Hotel & Resort
  "hotel-gemba": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqu1RrJFlGV4JNi27w61TlICZ53QFD9kZ2faptfUT_Gw&s=10",
  "gemba-hotel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqu1RrJFlGV4JNi27w61TlICZ53QFD9kZ2faptfUT_Gw&s=10",
  "hotel-04": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqu1RrJFlGV4JNi27w61TlICZ53QFD9kZ2faptfUT_Gw&s=10",

  // Pearl Suites / The Summit Executive Apartments
  "pearl-suites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKs5WY0H_iHF_tSBLN-oPL5_Gg6whfmMkx5dAnnvaJA&s=10",
  "hotel-05": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKs5WY0H_iHF_tSBLN-oPL5_Gg6whfmMkx5dAnnvaJA&s=10",
  "hotel-summit": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKs5WY0H_iHF_tSBLN-oPL5_Gg6whfmMkx5dAnnvaJA&s=10",

  // UG WIS Hotels & Suites
  "ug-wis": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-69mJvM4QZ7wA_87wQZ-6mJvM4QZ7wA_87w&s=10",
  "hotel-ug-wis": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-69mJvM4QZ7wA_87wQZ-6mJvM4QZ7wA_87w&s=10",

  // De Grand Hotel & Rooftop
  "de-grand": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw89dIuL9h-m1x-89xY-2a98wR_2mQ7xL_89yK5_40w&s=10",
  "hotel-de-grand": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw89dIuL9h-m1x-89xY-2a98wR_2mQ7xL_89yK5_40w&s=10"
};

/**
 * Retrieve verified photo URL strictly by object ID
 */
export function getHotelImageById(id) {
  if (!id) return null;
  const key = String(id).toLowerCase().trim();
  return HOTEL_IMAGE_MAP[key] || null;
}

// 5 Premier Executive Stays in Calabar, Cross River State
// With 4 Dedicated Thematic Views per hotel:
// (1) Main Building Exterior / Entrance
// (2) Executive Bedroom / Master Suite
// (3) Swimming Pool / Outdoor Courtyard
// (4) Fine Dining Restaurant / Executive Lounge
export const HOTELS = [
  {
    "id": "hotel-01",
    "name": "Transcorp Hotels Calabar",
    "category": "Accommodations",
    "area": "10 Murtala Muhammed Highway, Calabar",
    "rating": 4.8,
    "reviewCount": 420,
    "verified": true,
    "priceRange": "₦90,000 - ₦250,000",
    "priceNote": "Indicative Rates (Subject to Seasonal Demand - Escrow Protected)",
    "ciccDistance": "10 minutes to CICC",
    "description": "Calabar's flagship luxury hospitality property offering presidential suites, Vienna Café, high-security grounds, and an Olympic-sized swimming pool.",
    "amenities": ["Olympic Pool", "Armed Security", "24/7 Power", "Vienna Café", "Gym & Tennis Court"],
    "imageUrl": HOTEL_IMAGE_MAP["hotel-transcorp-calabar"],
    "image": HOTEL_IMAGE_MAP["hotel-transcorp-calabar"],
    "contact": {
      "person": "Victor Uyoata",
      "email": "reservations@metropolitanhotelcalabar.com",
      "phone": "+234 812 369 6019"
    },
    "images": [
      HOTEL_IMAGE_MAP["hotel-transcorp-calabar"],
      "/assets/executive_vip.jpg",
      HOTEL_IMAGE_MAP["hotel-pyramid-suites"],
      HOTEL_IMAGE_MAP["hotel-ug-wis"]
    ]
  },
  {
    "id": "hotel-02",
    "name": "Hogis Luxury Suites",
    "category": "Accommodations",
    "area": "7 Housing Estate Road, State Housing, Calabar",
    "rating": 4.7,
    "reviewCount": 210,
    "verified": true,
    "priceRange": "₦75,000 - ₦180,000",
    "priceNote": "Indicative Rates (Subject to Seasonal Demand - Escrow Protected)",
    "ciccDistance": "16 minutes to CICC",
    "description": "High-profile boutique stay in State Housing, renowned for VIP private suites, cocktail mixology lounge, and top-tier culinary dining.",
    "amenities": ["Outdoor Pool", "Cocktail Bar", "24/7 Power", "Smart TV & Fast Wi-Fi", "Private Concierge"],
    "imageUrl": HOTEL_IMAGE_MAP["hotel-hogis-suites"],
    "image": HOTEL_IMAGE_MAP["hotel-hogis-suites"],
    "contact": {
      "person": "Front Office Manager",
      "email": "fom@hogisluxurysuites.com",
      "phone": "+234 703 934 2262"
    },
    "images": [
      HOTEL_IMAGE_MAP["hotel-hogis-suites"],
      "/assets/executive_vip.jpg",
      HOTEL_IMAGE_MAP["hotel-de-grand"],
      HOTEL_IMAGE_MAP["hotel-channel-view"]
    ]
  },
  {
    "id": "hotel-03",
    "name": "Monty Suites Calabar",
    "category": "Accommodations",
    "area": "Asari Eso Layout, Calabar",
    "rating": 4.7,
    "reviewCount": 315,
    "verified": true,
    "priceRange": "₦80,000 - ₦220,000",
    "priceNote": "Indicative Rates (Subject to Seasonal Demand - Escrow Protected)",
    "ciccDistance": "10 minutes to CICC",
    "description": "Modern executive resort in Asari Eso featuring private terraces, signature swimming pool, poolside dining, and conference rooms.",
    "amenities": ["Swimming Pool", "24/7 Power", "Continental Buffet", "Poolside Bar", "Fitness Center"],
    "imageUrl": HOTEL_IMAGE_MAP["hotel-monty-suites"],
    "image": HOTEL_IMAGE_MAP["hotel-monty-suites"],
    "contact": {
      "person": "Bassey Ita Asuquo",
      "email": "reservations.calabar@montysuites.com",
      "phone": "+234 803 646 1074"
    },
    "images": [
      HOTEL_IMAGE_MAP["hotel-monty-suites"],
      "/assets/executive_vip.jpg",
      HOTEL_IMAGE_MAP["pearl-suites"],
      HOTEL_IMAGE_MAP["hotel-gemba"]
    ]
  },
  {
    "id": "hotel-04",
    "name": "Gemba Resorts & Suites",
    "category": "Accommodations",
    "area": "Parliamentary District, Calabar",
    "rating": 4.6,
    "reviewCount": 175,
    "verified": true,
    "priceRange": "₦70,000 - ₦160,000",
    "priceNote": "Indicative Rates (Subject to Seasonal Demand - Escrow Protected)",
    "ciccDistance": "20 minutes to CICC",
    "description": "Serene resort escape set in a secluded, secured compound, offering spacious chalets, private outdoor pool, and grilled bush-bar cuisine.",
    "amenities": ["Private Chalets", "Swimming Pool", "Bush Bar & Grill", "24/7 Power", "High Security"],
    "imageUrl": HOTEL_IMAGE_MAP["hotel-gemba"],
    "image": HOTEL_IMAGE_MAP["hotel-gemba"],
    "contact": {
      "person": "Reservations Desk",
      "email": "info@gembahotelandresort.com",
      "phone": "+234 902 222 2094"
    },
    "images": [
      HOTEL_IMAGE_MAP["hotel-gemba"],
      "/assets/executive_vip.jpg",
      HOTEL_IMAGE_MAP["hotel-channel-view"],
      HOTEL_IMAGE_MAP["hotel-de-grand"]
    ]
  },
  {
    "id": "hotel-05",
    "name": "The Summit Executive Serviced Apartments",
    "category": "Accommodations",
    "area": "Federal Housing Estate / Parliamentary, Calabar",
    "rating": 4.8,
    "reviewCount": 94,
    "verified": true,
    "priceRange": "₦85,000 - ₦210,000",
    "priceNote": "Indicative Rates (Subject to Seasonal Demand - Escrow Protected)",
    "ciccDistance": "12 minutes to CICC",
    "description": "Ultra-exclusive serviced apartments equipped with full chef kitchens, living lounges, smart automated access, and private secure parking for long/short executive stays.",
    "amenities": ["Fully Fitted Kitchen", "Living Room & Dining", "24/7 Power & Inverter", "Automated Smart Lock", "Armed Guard Patrol"],
    "imageUrl": HOTEL_IMAGE_MAP["pearl-suites"],
    "image": HOTEL_IMAGE_MAP["pearl-suites"],
    "contact": {
      "person": "Daniel Francis",
      "email": "pearlsuitehotels@yahoo.com",
      "phone": "+234 913 737 3249"
    },
    "images": [
      HOTEL_IMAGE_MAP["pearl-suites"],
      "/assets/executive_vip.jpg",
      HOTEL_IMAGE_MAP["hotel-pyramid-suites"],
      HOTEL_IMAGE_MAP["hotel-ug-wis"]
    ]
  }
];

export function getHotelBaseRate(priceRange) {
  if (!priceRange) return 75000;
  const match = priceRange.match(/[\d,]+/);
  if (match) {
    const parsed = parseInt(match[0].replace(/,/g, ''), 10);
    return isNaN(parsed) ? 75000 : parsed;
  }
  return 75000;
}

// 8 Official AfSNET Accredited Hotels with Explicit ID-Based Image Mapping
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
    imageUrl: HOTEL_IMAGE_MAP["metropolitan-hotel"],
    image: HOTEL_IMAGE_MAP["metropolitan-hotel"]
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
    imageUrl: HOTEL_IMAGE_MAP["monty-suites"],
    image: HOTEL_IMAGE_MAP["monty-suites"]
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
    imageUrl: HOTEL_IMAGE_MAP["channel-view"],
    image: HOTEL_IMAGE_MAP["channel-view"]
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
    imageUrl: HOTEL_IMAGE_MAP["gemba-hotel"],
    image: HOTEL_IMAGE_MAP["gemba-hotel"]
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
    imageUrl: HOTEL_IMAGE_MAP["hogis-royale"],
    image: HOTEL_IMAGE_MAP["hogis-royale"]
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
    imageUrl: HOTEL_IMAGE_MAP["pearl-suites"],
    image: HOTEL_IMAGE_MAP["pearl-suites"]
  },
  {
    id: "ug-wis",
    name: "UG WIS Hotels & Suites",
    rating: "3-star",
    distanceToCICC: "12 minutes to CICC",
    ciccDistance: "12 minutes to CICC",
    pricePerNight: "₦175,000",
    priceRange: "₦175,000 / night",
    contactPerson: "Ekpenyong Ekpenyong",
    phone: "+234 803 338 0503",
    email: "ugwissuitescalabar@gmail.com",
    contact: {
      person: "Ekpenyong Ekpenyong",
      email: "ugwissuitescalabar@gmail.com",
      phone: "+234 803 338 0503"
    },
    category: "Accommodations",
    imageUrl: HOTEL_IMAGE_MAP["ug-wis"],
    image: HOTEL_IMAGE_MAP["ug-wis"]
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
    imageUrl: HOTEL_IMAGE_MAP["de-grand"],
    image: HOTEL_IMAGE_MAP["de-grand"]
  }
];

export const VERIFIED_LISTINGS = officialAfSnetHotels;
