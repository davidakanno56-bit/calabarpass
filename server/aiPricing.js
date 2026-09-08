// server/aiPricing.js
// Carnival Calabar AI Concierge, Fair-Price Predictor & Anti-Scam Advisory Engine

import dotenv from "dotenv";

dotenv.config();

// Comprehensive Calabar Tourism Fair-Price & Surge Dataset
export const FAIR_PRICES = [
  {
    category: "Transport & Logistics",
    item: "Margaret Ekpo Airport to Marian Road Taxi",
    baselineNGN: 4000,
    fairRange: "₦3,500 – ₦5,000",
    decemberSurge: "₦12,000 – ₦18,000",
    surgePercentage: "+250%",
    redFlagWarning: "Touts waiting directly at arrivals demanding ₦15k+ cash. Walk to the accredited airport taxi rank or hail an in-app ride with verified plates."
  },
  {
    category: "Transport & Logistics",
    item: "Local Keke (Tricycle) Drop across Calabar Metro",
    baselineNGN: 300,
    fairRange: "₦200 – ₦400",
    decemberSurge: "₦800 – ₦1,500",
    surgePercentage: "+200%",
    redFlagWarning: "Drivers demanding 'carnival route surcharge' for trips not on closed parade streets. Clarify price before boarding."
  },
  {
    category: "Accommodation",
    item: "Standard Hotel Room (Marian Road / State Housing)",
    baselineNGN: 35000,
    fairRange: "₦30,000 – ₦45,000/night",
    decemberSurge: "₦85,000 – ₦130,000/night",
    surgePercentage: "+180%",
    redFlagWarning: "Fake hotel booking agents on WhatsApp demanding full bank transfer to private personal accounts with no registered hospitality license."
  },
  {
    category: "Carnival & Bands",
    item: "Official Carnival Band Costume & Route Wristband",
    baselineNGN: 85000,
    fairRange: "₦75,000 – ₦95,000",
    decemberSurge: "₦140,000 – ₦200,000",
    surgePercentage: "+85%",
    redFlagWarning: "Black-market scalpers selling duplicate wristbands outside Band Secretariats. Once security scans them at MCC junction, duplicates are confiscated without refund. Only book through verified escrow."
  },
  {
    category: "Carnival & Bands",
    item: "VIP U.J. Esuene Stadium Elevated Grandstand Ticket",
    baselineNGN: 35000,
    fairRange: "₦30,000 – ₦40,000",
    decemberSurge: "₦65,000 – ₦90,000",
    surgePercentage: "+100%",
    redFlagWarning: "Laminated photocopies sold at stadium gates. Bureau passes have tamper-evident micro-holograms."
  },
  {
    category: "Culinary & Dining",
    item: "Bogobiri Suya Feast (Beef, Kidney & Masa)",
    baselineNGN: 3000,
    fairRange: "₦2,000 – ₦4,500",
    decemberSurge: "₦6,000 – ₦9,000",
    surgePercentage: "+75%",
    redFlagWarning: "Select master grills directly inside Bogobiri Quarter. Avoid secondary roadside middlemen who add a 100% markup."
  },
  {
    category: "Culinary & Dining",
    item: "Authentic Efik Edikang Ikong or Afang Soup with Pounded Yam",
    baselineNGN: 4500,
    fairRange: "₦3,500 – ₦6,000",
    decemberSurge: "₦9,000 – ₦14,000",
    surgePercentage: "+80%",
    redFlagWarning: "Hotels serving diluted imitation soups. Top local spots like Freddy's, Calabar Kitchen, or Channel View provide genuine dried fish, periwinkle, and waterleaf at fair rates."
  },
  {
    category: "Waterfront & Eco",
    item: "Marina Resort Calabar River Boat Cruise",
    baselineNGN: 15000,
    fairRange: "₦12,000 – ₦18,000",
    decemberSurge: "₦25,000 – ₦35,000",
    surgePercentage: "+60%",
    redFlagWarning: "Unregistered wooden canoes at informal jetties lacking life-jackets or marine insurance."
  },
  {
    category: "Waterfront & Eco",
    item: "Obudu Mountain Resort Transport & 2-Night Stay",
    baselineNGN: 120000,
    fairRange: "₦110,000 – ₦140,000",
    decemberSurge: "₦200,000 – ₦280,000",
    surgePercentage: "+90%",
    redFlagWarning: "Unlicensed transit vans without highland mountain gearing that break down halfway on the Obanliku incline."
  }
];

// Anti-Scam Directives for Calabar Carnival
export const SCAM_ADVISORIES = [
  {
    title: "The Counterfeit Wristband Ring",
    severity: "CRITICAL",
    route: "Marian Road & MCC Junction",
    description: "Touts approach tourists offering 'discounted' band passes. These are printed with cloned QR codes that fail the optical security scanner at the official start line. Victims are barred from the parade trucks.",
    protectionRule: "Never pay cash on the street. All verified bands (Seagull, Master Blaster, Passion 4, Bayside, Mbat, Freedom) require official escrow voucher redemption."
  },
  {
    title: "The Ghost Hotel Reservation Scam",
    severity: "HIGH",
    route: "State Housing Estate & Marina",
    description: "Scammers clone legitimate hotel photos on Instagram/TikTok and demand 100% upfront booking deposits via personal peer-to-peer bank transfers. When tourists arrive in Calabar with luggage, the hotel has no record of the booking.",
    protectionRule: "Only book accredited hospitality providers. Escrow holds your payment until your physical check-in PIN is validated at the front desk."
  },
  {
    title: "Obudu Mountain 'Disappearing Charter' Operators",
    severity: "HIGH",
    route: "Marina Resort departure terminal",
    description: "Independent drivers promise an all-inclusive trip to Obudu Plateau, take cash for fuel and park entry, and abandon passengers at Ikom junction.",
    protectionRule: "Travel only with verified Cross River Highlands Transit operators with CalabarPass active escrow tracking."
  }
];

/**
 * Handle AI Concierge Inquiries
 * @param {Object} reqBody - { userPrompt, days, travelStyle }
 */
export async function getAiConciergeResponse({ userPrompt = "", days = 3, travelStyle = "Balanced Explorer" }) {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the official Carnival Calabar & Cross River State AI Tourism Concierge and Fair-Price Escrow Advisor.
Tourists visit Calabar for Africa's Biggest Street Party (Carnival Calabar) in December.
Tourists are prone to surge pricing (3x hotel rates, 4x taxi rates) and black-market fake ticket/wristband scams.

User Request: "${userPrompt}"
Trip Duration: ${days} days
Travel Style: ${travelStyle}

Provide a structured, engaging, hyper-local response formatted with clear Markdown headers:
1. 🌴 Personalized Day-by-Day Calabar Itinerary (incorporate Mary Slessor Roundabout/Cottage, Bogobiri Suya spot, Marian Road parade corridor, Marina Resort & Slave Museum, U.J. Esuene Stadium, and culinary stops for Edikang Ikong/Afang soup).
2. ⚖️ Fair-Price Baseline & December Surge Check (Provide realistic NGN estimates for cabs, food, accommodations, and passes to prevent gouging).
3. 🛡️ Anti-Scam Shield & Escrow Guidance (Explain why they should never buy wristbands on Marian Road street corners and how CalabarPass 6-digit PIN escrow protects them).`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1400
            }
          })
        }
      );

      const geminiData = await response.json();
      const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        return {
          source: "gemini-2.5-flash",
          response: generatedText,
          fairPriceHighlights: FAIR_PRICES.slice(0, 4),
          scamAlerts: SCAM_ADVISORIES
        };
      }
    } catch (err) {
      console.warn("Gemini API call error, falling back to local Calabar intelligence engine:", err.message);
    }
  }

  // Built-in Local Expert Intelligence Engine
  const promptLower = (userPrompt || "").toLowerCase();
  let customizedItinerary = [];

  if (days >= 1) {
    customizedItinerary.push({
      day: "Day 1: Arrival, Heritage & Golden Hour on Calabar River",
      highlights: [
        "Morning: Land at Margaret Ekpo International Airport. Take accredited taxi to State Housing / Marian Road (Fair rate: ₦3,500 – ₦5,000, do not pay ₦15,000+).",
        "Midday: Visit Mary Slessor Tomb & Historical Cottage at Creek Town or the Mary Slessor Roundabout monument; lunch on authentic Afang Soup with stockfish at Calabar Kitchen (Fair price: ₦4,000).",
        "Late Afternoon: Stroll through Marina Resort, tour the Slave History Museum and embark on a 60-min sunset catamaran cruise along the Calabar River (₦15,000 via verified escrow).",
        "Night: Head to Bogobiri Quarter for legendary freshly grilled suya, roasted kidney, and masa (Fair spend: ₦3,000 for a massive platter)."
      ]
    });
  }

  if (days >= 2) {
    customizedItinerary.push({
      day: "Day 2: The Carnival Calabar Street Extravaganza (Marian Road Route)",
      highlights: [
        "Morning: Pick up your official Seagull Band costume kit and wristband at the verified band secretariat on Marian Road using your CalabarPass 6-digit check-in PIN.",
        "Midday: Join the 12-kilometer carnival parade procession marching from Millennium Park along Marian Road through MCC Road. Revel with top floats, music trucks, and security escort.",
        "Afternoon Hydration: Refuel at official band hydration trucks (included in your verified package). Avoid unregistered roadside coolers with unsealed beverages.",
        "Late Evening: Watch the energetic street adjudication dances as competing bands showcase their choreography before moving to the stadium."
      ]
    });
  }

  if (days >= 3) {
    customizedItinerary.push({
      day: "Day 3: Grand Stadium Finale or Obudu Highland Escape",
      highlights: [
        "Option A (Stadium Grand Finale): Settle into your VIP Elevated Viewing Stand at U.J. Esuene Stadium (Fair pass: ₦35,000). Enjoy shaded sightlines, VIP refreshments, and the crowning of the 2026 Champion Band.",
        "Option B (Highlands Expedition): Board the executive Cross River Highlands Transit departing Marina for the Obudu Mountain Resort plateau. Ride the famous cable car above the misty rainforest canopy (Fair package: ₦120,000).",
        "Night: Celebrate at the Millennium Park Calabar Festival Village with live Afrobeats concerts and fireworks."
      ]
    });
  }

  let specificAdvice = "";
  if (promptLower.includes("price") || promptLower.includes("rate") || promptLower.includes("surge") || promptLower.includes("cost")) {
    specificAdvice = "🚨 **December Surge Alert**: Calabar sees an influx of over 1.5 million visitors in December. Hotels surge by up to 250% and street taxis quote exorbitant rates. Stick to the CalabarPass fair price baselines and book through escrow to lock in verified rates.";
  } else if (promptLower.includes("scam") || promptLower.includes("safe") || promptLower.includes("security") || promptLower.includes("fake")) {
    specificAdvice = "🛡️ **Anti-Scam Protocol**: Over 1,200 tourists were stranded last season due to counterfeit wristbands sold by street scalpers. Never pay cash on Marian Road. With CalabarPass, your money is held in our neutral vault and only released when you physically inspect your kit and provide your 6-digit PIN.";
  } else {
    specificAdvice = "✨ **Carnival Insider Tip**: Ensure you stay hydrated during the 12km parade. Wear comfortable footwear under your feathered carnival gear and keep your physical check-in PIN secure until meeting your verified vendor.";
  }

  const formattedResponse = `### 🌴 Curated ${days}-Day Carnival Calabar & Cross River Itinerary
*Style: ${travelStyle} | Tailored by CalabarPass Intelligence*

${customizedItinerary.map(d => `#### ${d.day}\n${d.highlights.map(h => `- ${h}`).join("\n")}`).join("\n\n")}

---

### ⚖️ Fair-Price Baseline & Surge Shield
- **Airport Cab**: Fair **₦4,000** (Surge Gouging: ₦15,000+)
- **Seagull Band Pass**: Fair **₦85,000** (Street Scalpers: ₦140,000+)
- **VIP Stadium Seat**: Fair **₦35,000** (Hawkers: ₦75,000+)
- **Bogobiri Suya Feast**: Fair **₦3,000** (Inflated tourist charge: ₦8,000+)

---

### 🛡️ Calabar Anti-Scam Directive
${specificAdvice}

> **How CalabarPass Escrow Protects You:**
> When you book on CalabarPass, your payment is held securely in the **Cross River Tourism Escrow Vault**. You receive a private **6-Digit Check-in PIN**. The vendor receives **₦0** until you physically arrive on Marian Road or U.J. Esuene Stadium, inspect your credentials, and submit your PIN.`;

  return {
    source: "local-calabar-intelligence",
    response: formattedResponse,
    itinerary: customizedItinerary,
    fairPriceHighlights: FAIR_PRICES.slice(0, 4),
    scamAlerts: SCAM_ADVISORIES
  };
}
