import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import PackageList from "./components/PackageList.jsx";
import CalabarDiningMapGuide from "./components/CalabarDiningMapGuide.jsx";
import VerifiedDestinations from "./components/VerifiedDestinations.jsx";
import TourismVideoSection from "./components/TourismVideoSection.jsx";
import LiveCRBCBroadcast from "./components/LiveCRBCBroadcast.jsx";
import { PackageGridSkeleton, EscrowTableSkeleton } from "./components/SkeletonLoader.jsx";
import { fetchWithSWR } from "./utils/cache.js";
import { PACKAGES as INITIAL_PACKAGES } from "./data/packages.js";
import { ShieldCheck, Lock } from "lucide-react";
import { handleLocalEscrowFallback, getStoredDynamicCards } from "./utils/api.js";

const PaystackCheckoutModal = lazy(() => import("./components/PaystackCheckoutModal.jsx"));
const EscrowVoucherModal = lazy(() => import("./components/EscrowVoucherModal.jsx"));
const EscrowManager = lazy(() => import("./components/EscrowManager.jsx"));
const FairPriceTracker = lazy(() => import("./components/FairPriceTracker.jsx"));
const AccommodationsView = lazy(() => import("./components/AccommodationsView.jsx"));
const VendorPortal = lazy(() => import("./components/VendorPortal.jsx"));
const PackageDetailsModal = lazy(() => import("./components/PackageDetailsModal.jsx"));
const VendorAuthModal = lazy(() => import("./components/VendorAuthModal.jsx"));
const MerchantOnboardingModal = lazy(() => import("./components/MerchantOnboardingModal.jsx"));
const AdminVendorQueue = lazy(() => import("./components/AdminVendorQueue.jsx"));

export default function App() {
  const isSessionVendorAuthenticated = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("calabarpass_vendor_auth") === "true";
    }
    return false;
  };

  const getInitialTab = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path === "/admin" || path === "/moderation") return "admin";
      if (path === "/shield") return "shield";
      if (path === "/vendor") {
        return isSessionVendorAuthenticated() ? "vendor" : "packages";
      }
      if (path === "/escrow") return "escrow";
      if (path === "/accommodations") return "packages"; // Handled via activeCategory
    }
    return "packages";
  };

  const getInitialCategory = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path === "/accommodations") return "accommodations";
      if (path === "/eco-sites") return "eco-sites";
      if (path === "/dining" || path === "/dining-nightlife") return "dining-nightlife";
      if (path === "/trade" || path === "/trade-expo") return "trade-expo";
      if (path === "/carnival" || path === "/carnival-culture") return "carnival-culture";
    }
    return "all";
  };

  const [isVendorAuthenticated, setIsVendorAuthenticated] = useState(isSessionVendorAuthenticated);
  const [showVendorAuthModal, setShowVendorAuthModal] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname.toLowerCase() === "/vendor" && !isSessionVendorAuthenticated();
    }
    return false;
  });
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [dynamicVendorCards, setDynamicVendorCards] = useState(() => getStoredDynamicCards());
  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [activeCategory, setActiveCategory] = useState(getInitialCategory);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [escrowStats, setEscrowStats] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageForDetails, setPackageForDetails] = useState(null);
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [loadingPackages, setLoadingPackages] = useState(false);

  const closePackageDetails = useCallback(() => setPackageForDetails(null), []);

  const handleOpenVendorPortal = () => {
    if (isVendorAuthenticated) {
      handleTabChange("vendor");
    } else {
      setShowVendorAuthModal(true);
    }
  };

  const handleVendorAuthSuccess = (matchedVendor) => {
    setIsVendorAuthenticated(true);
    setShowVendorAuthModal(false);
    setActiveTabState("vendor");
    if (matchedVendor?.id && typeof window !== "undefined") {
      sessionStorage.setItem("calabarpass_active_merchant_id", matchedVendor.id);
    }
    if (typeof window !== "undefined" && window.location.pathname !== "/vendor") {
      window.history.pushState(null, "", "/vendor");
    }
  };

  const handleOnboardSuccess = (created) => {
    if (created?.directoryCard) {
      setDynamicVendorCards((prev) => [
        created.directoryCard,
        ...prev.filter((c) => c.id !== created.directoryCard.id),
      ]);
    }
    setIsVendorAuthenticated(true);
    setShowVendorAuthModal(false);
    setShowOnboardingModal(false);
    setActiveTabState("vendor");
    if (created?.vendor?.id && typeof window !== "undefined") {
      sessionStorage.setItem("calabarpass_active_merchant_id", created.vendor.id);
    }
    if (typeof window !== "undefined" && window.location.pathname !== "/vendor") {
      window.history.pushState(null, "", "/vendor");
    }
  };

  const handleLockTerminal = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("calabarpass_vendor_auth");
      sessionStorage.removeItem("calabarpass_vendor_auth_time");
      sessionStorage.removeItem("calabarpass_active_merchant_id");
      sessionStorage.removeItem("calabarpass_is_operator");
      sessionStorage.removeItem("calabarpass_operator_code");
    }
    setIsVendorAuthenticated(false);
    handleTabChange("packages");
  };

  const handleTabChange = (tab) => {
    if (tab === "vendor" && !isVendorAuthenticated) {
      setShowVendorAuthModal(true);
      return;
    }
    setActiveTabState(tab);
    if (typeof window !== "undefined") {
      const path = tab === "packages" ? "/" : `/${tab}`;
      if (window.location.pathname !== path) {
        window.history.pushState(null, "", path);
      }
    }
  };

  const isHomeView = (activeTab === "home" || activeTab === "packages") && (activeCategory === "all" || !activeCategory);

  const [initialSearchQuery, setInitialSearchQuery] = useState("");

  const handleCategoryChange = (category, query = "") => {
    if (query) {
      setInitialSearchQuery(query);
    } else {
      setInitialSearchQuery("");
    }
    setActiveCategory(category);
    if (activeTab !== "packages" && activeTab !== "home") {
      setActiveTabState("packages");
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `/${category}`);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getInitialTab());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleCardsSync = () => {
      setDynamicVendorCards(getStoredDynamicCards());
    };
    window.addEventListener("calabarpass_dynamic_cards_updated", handleCardsSync);
    return () => window.removeEventListener("calabarpass_dynamic_cards_updated", handleCardsSync);
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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100 selection:bg-stateCyan selection:text-white transition-colors duration-200 relative">
      <div className="bg-gradient-to-r from-stateBlue via-stateCyan to-stateGreen py-1.5 px-3 sm:px-4 text-center text-white font-extrabold text-[11px] sm:text-xs tracking-wide no-print flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm">
        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
        <span className="hidden sm:inline">OFFICIAL CROSS RIVER STATE 365-DAY TOURISM CLEARINGHOUSE & ANTI-FRAUD ESCROW SYSTEM • 100% BUYER PROTECTION</span>
        <span className="sm:hidden truncate">OFFICIAL CROSS RIVER 365-DAY ESCROW CLEARINGHOUSE</span>
      </div>

      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
        onOpenVendorPortal={handleOpenVendorPortal}
        onOpenOnboarding={() => setShowOnboardingModal(true)}
        isVendorAuthenticated={isVendorAuthenticated}
        escrowStats={escrowStats}
      />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 1. Main Homepage View (activeTab === 'home' or default landing with activeCategory === 'all'):
            Cross River State tour video and hero elements render ONLY here */}
        {isHomeView && (
          <>
            <HeroBanner
              setActiveTab={handleTabChange}
              onSelectCategory={handleCategoryChange}
              escrowStats={escrowStats}
            />
            <TourismVideoSection onSelectCategory={handleCategoryChange} />
            <LiveCRBCBroadcast onSelectCategory={handleCategoryChange} />
            <CalabarDiningMapGuide />
          </>
        )}

        {/* 2. Sub-Tabs & Category Views (Accommodations, Eco-Sites & Heritage, Dining & Nightlife, Trade & Expo Hub, Carnival & Culture):
            Video banner and hero elements are completely hidden/removed */}
        {!isHomeView && (activeTab === "packages" || activeTab === "home") && (
          <div className="pt-4">
            {activeCategory === "accommodations" ? (
              <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Calabar Executive Accommodations...</div>}>
                <AccommodationsView
                  onBookHotel={(hotel) => setSelectedPackage(hotel)}
                />
              </Suspense>
            ) : (
              <>
                <PackageList
                  packages={packages}
                  dynamicCards={dynamicVendorCards}
                  activeCategory={activeCategory}
                  initialSearchQuery={initialSearchQuery}
                  onSelectCategory={handleCategoryChange}
                  isLoading={loadingPackages && packages.length === 0}
                  onSelectPackage={(pkg) => setSelectedPackage(pkg)}
                  onViewPackage={(pkg) => setPackageForDetails(pkg)}
                  onOpenShield={() => handleTabChange("shield")}
                />
                {activeCategory === "dining-nightlife" && (
                  <CalabarDiningMapGuide />
                )}
                {activeCategory === "eco-sites" && (
                  <VerifiedDestinations
                    packages={packages}
                    onViewPackage={(item) => setPackageForDetails(item)}
                  />
                )}
              </>
            )}
          </div>
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

        {activeTab === "admin" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Admin Moderation Queue...</div>}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <AdminVendorQueue />
            </div>
          </Suspense>
        )}

        {activeTab === "vendor" && (
          <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Vendor Portal & Clearinghouse...</div>}>
            {isVendorAuthenticated ? (
              <VendorPortal
                onOpenVoucher={(tx) => setActiveVoucher(tx)}
                onLockTerminal={handleLockTerminal}
                onDynamicCardsChange={(updatedCards) => setDynamicVendorCards(updatedCards)}
              />
            ) : (
              <div className="py-20 px-4 max-w-xl mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-stateCyan/20 border border-stateCyan/40 text-stateCyan flex items-center justify-center mx-auto shadow-lg shadow-stateCyan/20">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Merchant Settlement Terminal Locked</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Direct access to merchant settlement ledgers is restricted to authorized Cross River hospitality and tour operators. Please authenticate with your Vendor Access Code.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setShowVendorAuthModal(true)}
                    className="px-6 py-3 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-extrabold text-sm shadow-lg shadow-stateCyan/25 transition cursor-pointer"
                  >
                    Enter Vendor Access Code
                  </button>
                  <button
                    onClick={() => setShowOnboardingModal(true)}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-stateCyan font-bold text-sm border border-stateCyan/30 transition cursor-pointer"
                  >
                    + Register Merchant Terminal
                  </button>
                </div>
              </div>
            )}
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

      {packageForDetails && (
        <Suspense fallback={null}>
          <PackageDetailsModal
            pkg={packageForDetails}
            onClose={closePackageDetails}
            onBookNow={(pkg) => setSelectedPackage(pkg)}
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

      {showVendorAuthModal && (
        <Suspense fallback={null}>
          <VendorAuthModal
            isOpen={showVendorAuthModal}
            onClose={() => setShowVendorAuthModal(false)}
            onSuccess={handleVendorAuthSuccess}
            onOpenOnboarding={() => {
              setShowVendorAuthModal(false);
              setShowOnboardingModal(true);
            }}
          />
        </Suspense>
      )}

      {showOnboardingModal && (
        <Suspense fallback={null}>
          <MerchantOnboardingModal
            isOpen={showOnboardingModal}
            onClose={() => setShowOnboardingModal(false)}
            onOnboardSuccess={handleOnboardSuccess}
          />
        </Suspense>
      )}

      <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 py-12 text-slate-400 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#08182B] border border-cyan-500/30 shadow-sm shrink-0">
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5">
                    <rect x="2" y="2" width="32" height="32" rx="8" fill="#08182B" stroke="#0284C7" strokeWidth="1.2" />
                    <path d="M10 25V14C10 11.7909 11.7909 10 14 10H22C24.2091 10 26 11.7909 26 14V25" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M14 25V18C14 16.8954 14.8954 16 16 16H20C21.1046 16 22 16.8954 22 18V25" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="18" cy="13" r="1.8" fill="#38BDF8" />
                    <line x1="8" y1="25" x2="28" y2="25" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-tight font-heading text-white">
                  Calabar<span className="text-stateCyan font-extrabold">Pass</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed tracking-tight">
                The premier verified 365-day booking escrow clearinghouse and fair-price directory for Cross River State.
              </p>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">365-Day Escrow Passes</div>
              <ul className="space-y-2">
                <li><button onClick={() => { handleTabChange("accommodations"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-stateCyan cursor-pointer">Verified Accommodations</button></li>
                <li><button onClick={() => { handleTabChange("packages"); window.scrollTo({ top: 500, behavior: "smooth" }); }} className="hover:text-stateCyan cursor-pointer">Obudu Mountain Expedition</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Roles & Portals</div>
              <ul className="space-y-2">
                <li><button onClick={handleOpenVendorPortal} className="hover:text-stateCyan text-stateCyan font-semibold cursor-pointer">Merchant Portal & PIN Redemption ↗</button></li>
                <li><button onClick={() => handleTabChange("shield")} className="hover:text-stateCyan cursor-pointer">Surge Predictor</button></li>
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