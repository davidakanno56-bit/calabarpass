import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import PackageList from "./components/PackageList.jsx";
import CalabarDiningMapGuide from "./components/CalabarDiningMapGuide.jsx";
import VerifiedDestinations from "./components/VerifiedDestinations.jsx";
import { PackageGridSkeleton, EscrowTableSkeleton } from "./components/SkeletonLoader.jsx";
import { fetchWithSWR } from "./utils/cache.js";
import { PACKAGES as INITIAL_PACKAGES } from "./data/packages.js";
import { ShieldCheck, Lock } from "lucide-react";
import { handleLocalEscrowFallback } from "./utils/api.js";

const PaystackCheckoutModal = lazy(() => import("./components/PaystackCheckoutModal.jsx"));
const EscrowVoucherModal = lazy(() => import("./components/EscrowVoucherModal.jsx"));
const EscrowManager = lazy(() => import("./components/EscrowManager.jsx"));
const FairPriceTracker = lazy(() => import("./components/FairPriceTracker.jsx"));
const AccommodationsView = lazy(() => import("./components/AccommodationsView.jsx"));
const VendorPortal = lazy(() => import("./components/VendorPortal.jsx"));

export default function App() {
  const getInitialTab = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path === "/accommodations") return "accommodations";
      if (path === "/shield") return "shield";
      if (path === "/vendor") return "vendor";
      if (path === "/escrow") return "escrow";
    }
    return "packages";
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [escrowStats, setEscrowStats] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [loadingPackages, setLoadingPackages] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTabState(tab);
    if (typeof window !== "undefined") {
      const path = tab === "packages" ? "/" : `/${tab}`;
      if (window.location.pathname !== path) {
        window.history.pushState(null, "", path);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getInitialTab());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    fetchWithSWR(
      "packages_catalog",
      async () => {
        const endpoint = "/api/packages";
        try {
          const res = await fetch(endpoint);
          const contentType = res.headers.get("content-type");
          if (res.ok && contentType && contentType.includes("application/json")) {
            const data = await res.json();
            return data.success ? data.packages : null;
          }
          const fallback = handleLocalEscrowFallback(endpoint);
          return fallback?.packages || null;
        } catch {
          const fallback = handleLocalEscrowFallback(endpoint);
          return fallback?.packages || null;
        }
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

    fetchWithSWR(
      "paystack_config",
      async () => {
        const endpoint = "/api/config/paystack";
        try {
          const res = await fetch(endpoint);
          const contentType = res.headers.get("content-type");
          if (res.ok && contentType && contentType.includes("application/json")) {
            const data = await res.json();
            return data.success ? data.publicKey : null;
          }
          const fallback = handleLocalEscrowFallback(endpoint);
          return fallback?.publicKey || null;
        } catch {
          const fallback = handleLocalEscrowFallback(endpoint);
          return fallback?.publicKey || null;
        }
      },
      {
        onData: (pubKey) => {
          if (pubKey) setPaystackPublicKey(pubKey);
        }
      }
    ).catch((err) => console.warn("Paystack config error:", err));

    const loadEscrowStats = async () => {
      const endpoint = "/api/escrow/transactions";
      try {
        const res = await fetch(endpoint);
        const contentType = res.headers.get("content-type");
        let data;
        if (res.ok && contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          data = handleLocalEscrowFallback(endpoint);
        }
        if (data?.success && data?.stats) {
          setEscrowStats(data.stats);
        }
      } catch {
        const data = handleLocalEscrowFallback(endpoint);
        if (data?.success && data?.stats) {
          setEscrowStats(data.stats);
        }
      }
    };
    loadEscrowStats();
  }, []);

  const handleCheckoutSuccess = (transaction) => {
    setSelectedPackage(null);
    setActiveVoucher(transaction);

    const refreshEscrow = async () => {
      const endpoint = "/api/escrow/transactions";
      try {
        const res = await fetch(endpoint);
        const contentType = res.headers.get("content-type");
        let data;
        if (res.ok && contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          data = handleLocalEscrowFallback(endpoint);
        }
        if (data?.success && data?.stats) setEscrowStats(data.stats);
      } catch {
        const data = handleLocalEscrowFallback(endpoint);
        if (data?.success && data?.stats) setEscrowStats(data.stats);
      }
    };
    refreshEscrow();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 selection:bg-amber-500 selection:text-black">
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 py-1.5 px-4 text-center text-black font-extrabold text-xs tracking-wide no-print flex items-center justify-center gap-2 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-black shrink-0" />
        <span>OFFICIAL CROSS RIVER STATE 365-DAY TOURISM CLEARINGHOUSE & ANTI-FRAUD ESCROW SYSTEM • 100% BUYER PROTECTION</span>
      </div>

      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        escrowStats={escrowStats}
      />

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
              onOpenShield={() => handleTabChange("shield")}
            />
            <CalabarDiningMapGuide />
            <VerifiedDestinations
              onSelectListing={(item) => setSelectedPackage(item)}
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

        {activeTab === "shield" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Scam & Surge Shield...</div>}>
            <FairPriceTracker />
          </Suspense>
        )}

        {activeTab === "vendor" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Vendor Portal & Clearinghouse...</div>}>
            <VendorPortal
              onOpenVoucher={(tx) => setActiveVoucher(tx)}
            />
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
          />
        </Suspense>
      )}

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
                The premier verified 365-day booking escrow clearinghouse and fair-price directory for Cross River State.
              </p>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">365-Day Escrow Passes</div>
              <ul className="space-y-2">
                <li><button onClick={() => { handleTabChange("accommodations"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-amber-400 cursor-pointer">Verified Accommodations</button></li>
                <li><button onClick={() => { handleTabChange("packages"); window.scrollTo({ top: 500, behavior: "smooth" }); }} className="hover:text-amber-400 cursor-pointer">Obudu Mountain Expedition</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Roles & Portals</div>
              <ul className="space-y-2">
                <li><button onClick={() => handleTabChange("vendor")} className="hover:text-amber-400 text-amber-300 font-semibold cursor-pointer">Merchant Portal & PIN Redemption ↗</button></li>
                <li><button onClick={() => handleTabChange("shield")} className="hover:text-amber-400 cursor-pointer">Surge Predictor</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Paystack Live Integration</div>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Lock className="w-4 h-4" />
                  <span>Paystack Certified Direct API</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>© 2026 CalabarPass • Cross River State Tourism Bureau.</div>
            <div>Guaranteed Fair Prices & Zero Counterfeit Escrow 🌴</div>
          </div>
        </div>
      </footer>
    </div>
  );
}