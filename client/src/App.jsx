import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import PackageList from "./components/PackageList.jsx";
import { PackageGridSkeleton, EscrowTableSkeleton } from "./components/SkeletonLoader.jsx";
import { fetchWithSWR } from "./utils/cache.js";
import { ShieldCheck, Lock } from "lucide-react";

// Lazy-load heavy components and modals to keep initial bundle ultra-fast
const PaystackCheckoutModal = lazy(() => import("./components/PaystackCheckoutModal.jsx"));
const EscrowVoucherModal = lazy(() => import("./components/EscrowVoucherModal.jsx"));
const EscrowManager = lazy(() => import("./components/EscrowManager.jsx"));
const AIConciergeTerminal = lazy(() => import("./components/AIConciergeTerminal.jsx"));
const FairPriceTracker = lazy(() => import("./components/FairPriceTracker.jsx"));
const AccommodationsView = lazy(() => import("./components/AccommodationsView.jsx"));

export default function App() {
  const getInitialTab = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path === "/accommodations") return "accommodations";
      if (path === "/concierge") return "concierge";
      if (path === "/shield") return "shield";
      if (path === "/escrow") return "escrow";
    }
    return "packages";
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [packages, setPackages] = useState([]);
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [escrowStats, setEscrowStats] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [loadingPackages, setLoadingPackages] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTabState(tab);
    if (typeof window !== "undefined") {
      const path = tab === "packages" ? "/" : `/${tab}`;
      if (window.location.pathname !== path) {
        window.history.pushState(null, "", path);
      }
    }
  };

  // Listen to browser Back / Forward buttons for seamless URL navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getInitialTab());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Load app data using Stale-While-Revalidate caching pattern
  useEffect(() => {
    // 1. Packages with SWR cache
    fetchWithSWR(
      "packages_catalog",
      async () => {
        const res = await fetch("/api/packages");
        const data = await res.json();
        return data.success ? data.packages : null;
      },
      {
        onData: (pkgList) => {
          if (pkgList && pkgList.length > 0) {
            setPackages(pkgList);
            setLoadingPackages(false);
          }
        }
      }
    ).catch((err) => {
      console.warn("Packages fetch error:", err);
      setLoadingPackages(false);
    });

    // 2. Paystack Config with cache
    fetchWithSWR(
      "paystack_config",
      async () => {
        const res = await fetch("/api/config/paystack");
        const data = await res.json();
        return data.success ? data.publicKey : null;
      },
      {
        onData: (pubKey) => {
          if (pubKey) setPaystackPublicKey(pubKey);
        }
      }
    ).catch((err) => console.warn("Paystack config error:", err));

    // 3. Escrow stats
    fetch("/api/escrow/transactions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.stats) {
          setEscrowStats(data.stats);
        }
      })
      .catch((err) => console.warn("Escrow stats error:", err));
  }, []);

  const handleCheckoutSuccess = (transaction) => {
    // Instant modal switch without full page reload
    setSelectedPackage(null);
    setActiveVoucher(transaction);

    // Refresh escrow stats in background
    fetch("/api/escrow/transactions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEscrowStats(data.stats);
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Top Verified Badge Header Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 py-1.5 px-4 text-center text-black font-extrabold text-xs tracking-wide no-print flex items-center justify-center gap-2 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-black shrink-0" />
        <span>OFFICIAL CROSS RIVER STATE 365-DAY TOURISM CLEARINGHOUSE & ANTI-FRAUD ESCROW SYSTEM • 100% BUYER PROTECTION</span>
      </div>

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        escrowStats={escrowStats}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === "packages" && (
          <>
            <HeroBanner
              setActiveTab={handleTabChange}
              escrowStats={escrowStats}
            />
            <PackageList
              packages={packages}
              isLoading={loadingPackages && packages.length === 0}
              onSelectPackage={(pkg) => setSelectedPackage(pkg)}
              onOpenConcierge={() => handleTabChange("concierge")}
            />
          </>
        )}

        {activeTab === "accommodations" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Calabar Executive Accommodations...</div>}>
            <AccommodationsView
              onBookHotel={(hotel) => setSelectedPackage(hotel)}
            />
          </Suspense>
        )}

        {activeTab === "concierge" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading AI Concierge Terminal...</div>}>
            <AIConciergeTerminal
              onSelectPackageFromAI={(pkgId) => {
                const pkg = packages.find((p) => p.id === pkgId);
                if (pkg) setSelectedPackage(pkg);
              }}
            />
          </Suspense>
        )}

        {activeTab === "shield" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Scam & Surge Shield...</div>}>
            <FairPriceTracker />
          </Suspense>
        )}

        {activeTab === "escrow" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400"><EscrowTableSkeleton rows={4} /></div>}>
            <EscrowManager
              onOpenVoucher={(tx) => setActiveVoucher(tx)}
            />
          </Suspense>
        )}
      </main>

      {/* Modals wrapped in Suspense */}
      {selectedPackage && (
        <Suspense fallback={null}>
          <PaystackCheckoutModal
            pkg={selectedPackage}
            paystackPublicKey={paystackPublicKey}
            onClose={() => setSelectedPackage(null)}
            onSuccessVoucher={handleCheckoutSuccess}
          />
        </Suspense>
      )}

      {activeVoucher && (
        <Suspense fallback={null}>
          <EscrowVoucherModal
            transaction={activeVoucher}
            onClose={() => setActiveVoucher(null)}
            onOpenEscrowPortal={() => {
              setActiveVoucher(null);
              handleTabChange("escrow");
            }}
          />
        </Suspense>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 py-12 text-slate-400 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌴</span>
                <span className="text-xl font-extrabold font-heading text-white">
                  Calabar<span className="gold-gradient-text">Pass</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                The premier verified 365-day booking escrow clearinghouse and AI concierge for Cross River State, covering 20 verified executive hotels, Obudu Mountain Resort, Agbokim Waterfalls, Marina Resort, Drill Monkey Ranch, Leboku Festival, and Carnival Calabar.
              </p>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">365-Day Escrow Passes</div>
              <ul className="space-y-2">
                <li><button onClick={() => { handleTabChange("accommodations"); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-amber-400">Executive Hotels (20 Verified)</button></li>
                <li><button onClick={() => { handleTabChange("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">Obudu Mountain Expedition</button></li>
                <li><button onClick={() => { handleTabChange("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">Agbokim Waterfalls Canopy Tour</button></li>
                <li><button onClick={() => { handleTabChange("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">Drill Monkey Rainforest Safari</button></li>
                <li><button onClick={() => { handleTabChange("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">Cross River Safari National Park</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Security & Anti-Fraud</div>
              <ul className="space-y-2">
                <li><button onClick={() => handleTabChange("shield")} className="hover:text-amber-400">December Surge Predictor</button></li>
                <li><button onClick={() => handleTabChange("shield")} className="hover:text-amber-400">Fake Wristband Red Flags</button></li>
                <li><button onClick={() => handleTabChange("escrow")} className="hover:text-amber-400">6-Digit PIN Redemption Guide</button></li>
                <li><button onClick={() => handleTabChange("concierge")} className="hover:text-amber-400">AI Concierge Terminal</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Paystack Live Integration</div>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Lock className="w-4 h-4" />
                  <span>Paystack Certified Direct API</span>
                </div>
                <p className="text-[11px]">
                  All hotel room deposits and pass fees are held in secure escrow until physical on-site check-in via your 6-digit PIN in Cross River State.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>
              © 2026 CalabarPass • Cross River State Tourism Bureau Clearinghouse Platform.
            </div>
            <div className="flex items-center gap-1">
              Guaranteed Fair Prices & Zero Counterfeit Escrow 🌴
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
