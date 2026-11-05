import React, { useState } from "react";
import { 
  Sparkles, 
  Utensils, 
  Flame, 
  Trees, 
  Crown, 
  Compass, 
  ArrowRight, 
  ChevronRight, 
  BookOpen,
  MapPin,
  CheckCircle2,
  Anchor
} from "lucide-react";

interface StoryChapter {
  id: string;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  quote: string;
  narrative: string;
  image: string;
  imageAlt: string;
  tagline: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  actionLabel: string;
  actionCategory: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "gastronomy",
    badge: "Gastronomic Capital",
    category: "dining-nightlife",
    title: "The Art of Efik Haute Cuisine",
    subtitle: "Centuries of Culinary Royalty & Native Ingredients",
    quote: "In Calabar, dining is not merely sustenance; it is a sacred royal ritual handed down through generations of matriarchs.",
    narrative: "Calabar holds an unchallenged legacy as the gastronomic crown of West Africa. The legendary Edikang Ikong—crafted with tender waterleaf, fluted pumpkin, smoked dried fish, and indigenous periwinkles—represents the epitome of nutrient-dense culinary sophistication. Alongside slow-simmered Afang soup and fresh Calabar River Fisherman Soup brimming with river prawns and blue crab, every meal tells the story of our rich soils and ancient waterways.",
    image: "/assets/marina_resort.jpg",
    imageAlt: "Calabar native culinary spread with Fisherman Soup and waterfront dining",
    tagline: "Slow-Simmered • Native Seafood • Royal Recipes",
    stats: [
      { label: "Signature Native Dishes", value: "18+" },
      { label: "River Prawn Corridors", value: "3 Waterways" },
      { label: "Heritage Culinary Status", value: "National Capital" }
    ],
    highlights: [
      "Authentic Edikang Ikong prepared with pristine upland vegetables",
      "Traditional clay pot Fisherman Soup with freshly harvested river prawns",
      "Aromatic Afang soup simmered with sun-cured fish and native spices",
      "Traditional Ekoki, roasted plantain, and waterfront smoked catfish"
    ],
    actionLabel: "Explore Calabar Dining",
    actionCategory: "dining-nightlife"
  },
  {
    id: "heritage",
    badge: "Royal Monarchy",
    category: "eco-sites",
    title: "Centuries of Efik Majesty & Living Heritage",
    subtitle: "The Kingdom of Calabar & Ancient Secret Societies",
    quote: "A sovereign coastal heritage steeped in elaborate ceremonies, sacred brass arts, and the ancient Ekpe governance.",
    narrative: "Long before modern borders, the Efik Kingdom along the Calabar River fostered profound maritime trade, sophisticated diplomacy, and intricate governance through the sacred Ekpe Society. From the grand colonial architecture of Duke Town and the Old Residency Museum to the sacred stool of the Obong of Calabar, this historic city stands as an open-air museum of resilient African monarchies and deep cultural pride.",
    image: "/assets/calabar-cityscape-aerial.jpg",
    imageAlt: "Aerial view of Calabar heritage quarters and historic river estuary",
    tagline: "Ancient Monarchy • Colonial Architecture • Ekpe Society",
    stats: [
      { label: "Historic Dynasty", value: "600+ Years" },
      { label: "Colonial Monuments", value: "14 Sites" },
      { label: "Sacred Society", value: "Ekpe Order" }
    ],
    highlights: [
      "The sacred coronation seat of the Obong of Calabar",
      "Historic Old Residency Museum overlooking the Calabar River",
      "Duke Town Presbyterian Church (Est. 1846) & Mary Slessor memorial",
      "Ancient Nsibidi ideological script and ceremonial Ekpe masquerades"
    ],
    actionLabel: "Discover Heritage Trails",
    actionCategory: "eco-sites"
  },
  {
    id: "carnival",
    badge: "Africa's Biggest Street Party",
    category: "carnival-culture",
    title: "Carnival Calabar: 12km of Radiant Energy",
    subtitle: "The Crown Jewel of African Tourism & Performing Arts",
    quote: "A breathtaking explosion of color, rhythm, and masquerade across twelve uninterrupted kilometers.",
    narrative: "Every December, the peaceful boulevards of Calabar transform into a global stage of unmatched theatrical spectacle. Carnival Calabar features five competitive bands—including Seagull Band, Passion 4, and Bayside—competing with thousands of dancers clothed in hand-crafted feather regalia. With custom float trucks, rhythmic brass orchestras, and VIP stadium viewing, it remains the ultimate celebration of African creativity and hospitality.",
    image: "/assets/seagull_band.jpg",
    imageAlt: "Carnival Calabar masquerade parade and elaborate band costumes",
    tagline: "12km Parade Route • 5 Master Bands • 50,000+ Masqueraders",
    stats: [
      { label: "Continuous Parade", value: "12 Kilometers" },
      { label: "Official Bands", value: "5 Premier" },
      { label: "Annual Visitors", value: "2M+ Attendants" }
    ],
    highlights: [
      "Official VIP grandstand seating along the Marian & Stadium corridors",
      "Master-crafted band costumes tailored by international couturiers",
      "Governor's Cup competitive street theater and synchronized choreography",
      "24/7 Carnival safety corridors and state-escorted tourist shuttles"
    ],
    actionLabel: "View Carnival Passes",
    actionCategory: "carnival-culture"
  },
  {
    id: "biodiversity",
    badge: "Cloud Forests & Waterfalls",
    category: "eco-sites",
    title: "Pristine Rainforests & Seven-Tiered Cascades",
    subtitle: "From the Obudu Plateau to Agbokim Waterfalls",
    quote: "One of the last virgin primary rainforest biomes in West Africa, sheltered beneath perpetual mountain mists.",
    narrative: "Cross River State contains over 50% of Nigeria's remaining tropical rainforests. The Obudu Plateau ascends to 1,576 meters, welcoming travelers to Africa's longest cable car and crisp alpine breezes. Farther south, Agbokim Waterfalls plunges over seven terraced limestone bluffs surrounded by iridescent rainbow halos, while the Afi Mountain Wildlife Sanctuary shelters the world's most critical breeding population of endangered drill monkeys and chimpanzees.",
    image: "/assets/agbokim_waterfalls.jpg",
    imageAlt: "Agbokim Waterfalls seven cascading tiers with rainbow mist",
    tagline: "1,576m Altitude • Seven Terraced Streams • Endangered Primates",
    stats: [
      { label: "National Forest Canopy", value: "50% of Nigeria" },
      { label: "Plateau Altitude", value: "1,576 Meters" },
      { label: "Waterfall Cascades", value: "7 Streams" }
    ],
    highlights: [
      "Obudu Mountain Resort cable car ascending through dense cloud forests",
      "Agbokim Waterfalls iridescent seven-stream terraced gorge",
      "Afi Mountain canopy walkway and endangered drill primate sanctuary",
      "Kwa Falls tranquil forest basin and ancient granite stone trails"
    ],
    actionLabel: "Explore Eco-Sanctuaries",
    actionCategory: "eco-sites"
  }
];

interface CultureStorytellingProps {
  onSelectCategory?: (category: string) => void;
}

export default function CultureStorytelling({ onSelectCategory }: CultureStorytellingProps) {
  const [activeTab, setActiveTab] = useState<string>("gastronomy");
  const currentChapter = STORY_CHAPTERS.find((c) => c.id === activeTab) || STORY_CHAPTERS[0];

  const handleAction = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <section id="culture-storytelling" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-slate-800/80">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cr-forest/10 dark:bg-cr-forest/20 border border-cr-forest/30 text-cr-forest dark:text-cr-lagoon text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cr-forest dark:text-cr-lagoon" />
          <span>Culture, Heritage & Nature</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white leading-[1.15]">
          A Tapestry of Majesty. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cr-forest via-cr-lagoon to-emerald-400">
            Ancient Roots & Living Wonder.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          Cross River State is defined by deep hospitality, world-renowned culinary excellence, unbroken royal ceremonies, and protected ecological sanctuaries.
        </p>

        {/* Tab Selection Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {STORY_CHAPTERS.map((chap) => {
            const isActive = chap.id === activeTab;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => setActiveTab(chap.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-cr-forest text-white shadow-lg shadow-cr-forest/25 scale-[1.02]"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {chap.id === "gastronomy" && <Utensils className="w-3.5 h-3.5" />}
                {chap.id === "heritage" && <Crown className="w-3.5 h-3.5" />}
                {chap.id === "carnival" && <Flame className="w-3.5 h-3.5" />}
                {chap.id === "biodiversity" && <Trees className="w-3.5 h-3.5" />}
                <span>{chap.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Chapter Display (Alternating Master Layout) */}
      <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full overflow-hidden bg-slate-950">
            <img
              src={currentChapter.image}
              alt={currentChapter.imageAlt}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/20 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cr-lagoon border border-cr-lagoon/30 shadow-md">
                {currentChapter.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-md border border-white/10">
                Official Cross River Archive
              </span>
            </div>

            {/* Bottom Pull-Quote */}
            <div className="absolute bottom-6 left-6 right-6 z-10 p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white space-y-2">
              <p className="text-xs sm:text-sm italic font-light text-slate-200 leading-relaxed">
                "{currentChapter.quote}"
              </p>
              <div className="text-[10px] uppercase font-bold tracking-wider text-cr-lagoon">
                {currentChapter.tagline}
              </div>
            </div>
          </div>

          {/* Editorial Content (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cr-forest dark:text-cr-lagoon block">
                  {currentChapter.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                  {currentChapter.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                {currentChapter.narrative}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Curated Highlights
                </div>
                {currentChapter.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cr-forest dark:text-cr-lagoon shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Telemetry Stats Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                {currentChapter.stats.map((s, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="text-base sm:text-lg font-black font-heading text-slate-900 dark:text-white">
                      {s.value}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleAction(currentChapter.actionCategory)}
                className="w-full py-3.5 px-6 rounded-2xl bg-cr-forest hover:bg-cr-tropical text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cr-forest/25 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{currentChapter.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
