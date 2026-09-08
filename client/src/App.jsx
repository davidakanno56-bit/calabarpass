import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import PackageList from "./components/PackageList.jsx";
import PaystackCheckoutModal from "./components/PaystackCheckoutModal.jsx";
import EscrowVoucherModal from "./components/EscrowVoucherModal.jsx";
import EscrowManager from "./components/EscrowManager.jsx";
import AIConciergeTerminal from "./components/AIConciergeTerminal.jsx";
import FairPriceTracker from "./components/FairPriceTracker.jsx";
import { ShieldCheck, Heart, ExternalLink, Lock } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("packages");
  const [packages, setPackages] = useState([]);
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [escrowStats, setEscrowStats] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial packages and Paystack config
  useEffect(() => {
    const loadAppData = async () => {
      try {
        const [pkgRes, configRes, escrowRes] = await Promise.all([
          fetch("/api/packages"),
          fetch("/api/config/paystack"),
          fetch("/api/escrow/transactions")
        ]);

        const pkgData = await pkgRes.json();
        const configData = await configRes.json();
        const escrowData = await escrowRes.json();

        if (pkgData.success) setPackages(pkgData.packages || []);
        if (configData.success) setPaystackPublicKey(configData.publicKey || "");
        if (escrowData.success) setEscrowStats(escrowData.stats || null);
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAppData();
  }, []);

  const handleCheckoutSuccess = (transaction) => {
    setSelectedPackage(null);
    setActiveVoucher(transaction);
    // Refresh stats
    fetch("/api/escrow/transactions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEscrowStats(data.stats);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Top verified badge header bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 py-1 px-4 text-center text-black font-extrabold text-xs tracking-wide no-print flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-black" />
        <span>OFFICIAL CARNIVAL CALABAR 2026 ANTI-SCAM ESCROW SYSTEM • 100% BUYER PROTECTION</span>
      </div>

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        escrowStats={escrowStats}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === "packages" && (
          <>
            <HeroBanner
              setActiveTab={setActiveTab}
              escrowStats={escrowStats}
            />
            <PackageList
              packages={packages}
              onSelectPackage={(pkg) => setSelectedPackage(pkg)}
              onOpenConcierge={() => setActiveTab("concierge")}
            />
          </>
        )}

        {activeTab === "concierge" && (
          <AIConciergeTerminal
            onSelectPackageFromAI={(pkgId) => {
              const pkg = packages.find((p) => p.id === pkgId);
              if (pkg) setSelectedPackage(pkg);
            }}
          />
        )}

        {activeTab === "shield" && (
          <FairPriceTracker />
        )}

        {activeTab === "escrow" && (
          <EscrowManager
            onOpenVoucher={(tx) => setActiveVoucher(tx)}
          />
        )}
      </main>

      {/* Modals */}
      {selectedPackage && (
        <PaystackCheckoutModal
          pkg={selectedPackage}
          paystackPublicKey={paystackPublicKey}
          onClose={() => setSelectedPackage(null)}
          onSuccessVoucher={handleCheckoutSuccess}
        />
      )}

      {activeVoucher && (
        <EscrowVoucherModal
          transaction={activeVoucher}
          onClose={() => setActiveVoucher(null)}
          onOpenEscrowPortal={() => {
            setActiveVoucher(null);
            setActiveTab("escrow");
          }}
        />
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
                The premier verified booking escrow clearinghouse and AI concierge for Carnival Calabar, Obudu Mountain Resort, and Cross River State tourism.
              </p>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Escrow Protected Passes</div>
              <ul className="space-y-2">
                <li><button onClick={() => { setActiveTab("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">Seagull Band Master Pass</button></li>
                <li><button onClick={() => { setActiveTab("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">VIP Stadium Elevated Stand</button></li>
                <li><button onClick={() => { setActiveTab("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">Obudu Mountain Expedition</button></li>
                <li><button onClick={() => { setActiveTab("packages"); window.scrollTo({ top: 500, behavior: 'smooth'}); }} className="hover:text-amber-400">Marina Resort River Cruise</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Security & Anti-Scam</div>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab("shield")} className="hover:text-amber-400">December Surge Predictor</button></li>
                <li><button onClick={() => setActiveTab("shield")} className="hover:text-amber-400">Fake Wristband Red Flags</button></li>
                <li><button onClick={() => setActiveTab("escrow")} className="hover:text-amber-400">6-Digit PIN Redemption Guide</button></li>
                <li><button onClick={() => setActiveTab("concierge")} className="hover:text-amber-400">AI Concierge Terminal</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Live Payment Infrastructure</div>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Lock className="w-4 h-4" />
                  <span>Paystack Certified Direct API</span>
                </div>
                <p className="text-[11px]">
                  All payments are held in non-custodial escrow until physical on-site redemption in Calabar, Nigeria.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>
              © 2026 CalabarPass • Cross River State Tourism Bureau Accredited Platform.
            </div>
            <div className="flex items-center gap-1">
              Built with precision for Africa's Biggest Street Party 🌴
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
