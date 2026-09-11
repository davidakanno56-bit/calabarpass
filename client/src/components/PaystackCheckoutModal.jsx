import React, { useState } from "react";
import { X, Lock, ShieldCheck, CreditCard, AlertCircle, ArrowRight, CheckCircle2, Loader2, Sparkles, Copy, Check, Calendar } from "lucide-react";
import { CalendarPicker } from "./CalendarPicker.jsx";
import { loadPaystackScript } from "../utils/paystackLoader.js";
import { getHotelBaseRate } from "../data/hotels.js";

export default function PaystackCheckoutModal({
  pkg,
  onClose,
  onSuccessVoucher,
  paystackPublicKey
}) {
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(tomorrowStr);
  const [formData, setFormData] = useState({
    customerName: "Obinna Emecheta",
    email: "tourist@carnivalcalabar.ng",
    phone: "+234 803 456 7890"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState("form"); // 'form' | 'processing' | 'verifying'
  const [copiedCard, setCopiedCard] = useState(false);

  const isHotel = !!pkg?.priceRange;
  const amountNGN = pkg?.priceNGN || (isHotel ? getHotelBaseRate(pkg.priceRange) : 0);
  const displayImage = pkg?.image || (Array.isArray(pkg?.images) ? pkg.images[0] : "");
  const vendorName = pkg?.vendor || (isHotel ? `${pkg.name} Front Desk` : "Verified Cross River Vendor");
  const itemName = pkg?.name || "Experience";

  const escrowFeeNGN = 0; // 0% subsidized by Cross River Tourism Bureau
  const totalAmountNGN = amountNGN + escrowFeeNGN;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyTestCard = () => {
    navigator.clipboard.writeText("4084084084084081");
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2500);
  };

  /**
   * Primary: Initialize Paystack transaction on backend, dynamically load Paystack SDK,
   * launch Paystack inline popup modal, and verify on callback without full page reload.
   */
  const handlePaystackCheckout = async () => {
    if (!formData.email || !formData.customerName) {
      setError("Please provide your name and email address");
      return;
    }

    setLoading(true);
    setError(null);
    setActiveStep("processing");

    try {
      // 1. Initialize on Express backend with selectedDate
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          email: formData.email,
          customerName: formData.customerName,
          phone: formData.phone,
          bookingDate: selectedDate,
          callbackUrl: window.location.href
        })
      });

      const initData = await res.json();

      if (!res.ok || !initData.success) {
        throw new Error(initData.error || "Failed to initialize payment");
      }

      const reference = initData.reference;
      const publicKey = initData.publicKey || paystackPublicKey || "pk_test_e911f3fc519a96d916fbfea85742f88078495266";

      // 2. Dynamically load Paystack Popup SDK on demand
      let PaystackPop;
      try {
        PaystackPop = await loadPaystackScript();
      } catch (scriptErr) {
        console.warn("Paystack script dynamic load notice:", scriptErr);
      }

      // 3. Launch Paystack inline popup if available
      if (window.PaystackPop && typeof window.PaystackPop.setup === "function") {
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: formData.email,
          amount: totalAmountNGN * 100, // kobo
          currency: "NGN",
          ref: reference,
          metadata: {
            custom_fields: [
              { display_name: "Customer Name", variable_name: "customer_name", value: formData.customerName },
              { display_name: "Package", variable_name: "package_name", value: pkg.name },
              { display_name: "Vendor", variable_name: "vendor", value: pkg.vendor },
              { display_name: "Booking Date", variable_name: "booking_date", value: selectedDate }
            ]
          },
          callback: function (response) {
            // Payment success callback from Paystack iframe
            setActiveStep("verifying");
            verifyBackendTransaction(response.reference || reference);
          },
          onClose: function () {
            setLoading(false);
            setActiveStep("form");
          }
        });

        handler.openIframe();
      } else if (initData.authorization_url) {
        // Fallback: popup window or redirect
        window.open(initData.authorization_url, "_blank");
        pollForVerification(reference);
      } else {
        throw new Error("Unable to open Paystack payment modal.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
      setActiveStep("form");
    }
  };

  /**
   * Verify transaction on backend, lock escrow, and get 6-digit PIN without page reload
   */
  const verifyBackendTransaction = async (reference) => {
    try {
      setActiveStep("verifying");
      const res = await fetch(`/api/paystack/verify/${encodeURIComponent(reference)}`);
      const data = await res.json();

      if (data.success && data.transaction) {
        // Ensure status label matches requirement
        const updatedTx = {
          ...data.transaction,
          statusLabel: "Escrow Secured - Awaiting On-Site Verification"
        };
        onSuccessVoucher(updatedTx);
      } else {
        throw new Error(data.message || "Payment verification failed");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message);
      setLoading(false);
      setActiveStep("form");
    }
  };

  /**
   * Instant Test Lock: Allows instant sandbox verification without modal interaction
   */
  const handleQuickTestCheckout = async () => {
    setLoading(true);
    setError(null);
    setActiveStep("processing");

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          email: formData.email,
          customerName: formData.customerName,
          phone: formData.phone,
          bookingDate: selectedDate
        })
      });

      const initData = await res.json();
      if (!initData.success) throw new Error(initData.error);

      // Verify backend and transition
      setActiveStep("verifying");
      const verifyRes = await fetch(`/api/paystack/verify/${encodeURIComponent(initData.reference)}?simulate=true`);
      const verifyData = await verifyRes.json();

      if (verifyData.success && verifyData.transaction) {
        const updatedTx = {
          ...verifyData.transaction,
          statusLabel: "Escrow Secured - Awaiting On-Site Verification"
        };
        onSuccessVoucher(updatedTx);
      } else {
        throw new Error(verifyData.message || "Verification response pending");
      }
    } catch (err) {
      console.error("Quick test checkout error:", err);
      setError(err.message);
      setLoading(false);
      setActiveStep("form");
    }
  };

  const pollForVerification = (reference) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/api/paystack/verify/${encodeURIComponent(reference)}`);
        const data = await res.json();
        if (data.success && data.transaction) {
          clearInterval(interval);
          const updatedTx = {
            ...data.transaction,
            statusLabel: "Escrow Secured - Awaiting On-Site Verification"
          };
          onSuccessVoucher(updatedTx);
        }
      } catch {
        // continue polling
      }
      if (attempts > 30) {
        clearInterval(interval);
        setLoading(false);
        setActiveStep("form");
      }
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121826] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                365-Day Escrow Booking Checkout
              </h3>
              <div className="text-xs text-slate-400">
                Live Paystack Sandbox • Cross River State Tourism Escrow
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Paystack Sandbox Helper Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Paystack Test Credentials</span>
              </div>
              <button
                type="button"
                onClick={handleCopyTestCard}
                className="flex items-center gap-1 text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
              >
                {copiedCard ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCard ? "Copied!" : "Copy Card"}</span>
              </button>
            </div>
            <div className="font-mono text-[11px] bg-black/40 p-2 rounded-lg text-amber-100/90 border border-amber-500/20 break-all select-all">
              Sandbox Testing: Card: 4084 0840 8408 4081 | CVV: 408 | Exp: Any future date | OTP: 123456
            </div>
          </div>

          {/* Package or Hotel Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex gap-4 items-center">
            <img
              src={displayImage}
              alt={itemName}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
              onError={(e) => {
                if (pkg?.images && pkg.images[1]) e.target.src = pkg.images[1];
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">{pkg.category}</div>
              <div className="font-bold text-sm text-white truncate">{itemName}</div>
              <div className="text-xs text-slate-400 truncate">
                {isHotel ? `Location: ${pkg.area}` : `Vendor: ${vendorName}`}
              </div>
              {isHotel && pkg.priceNote && (
                <div className="text-[10px] text-amber-400/90 font-medium mt-0.5 truncate">{pkg.priceNote}</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">{isHotel ? "Base Rate" : "Price"}</div>
              <div className="text-lg font-extrabold font-heading text-white">
                ₦{amountNGN.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Dynamic 365-Day Calendar Picker */}
          <CalendarPicker
            selectedDate={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />

          {/* How Escrow Works Note */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-200 leading-relaxed">
              <strong className="text-emerald-300">100% Anti-Scam Protection: </strong>
              Funds are not released immediately. They remain locked safely in the CalabarPass Escrow Vault. Upon payment callback, an official <strong>6-digit check-in PIN</strong> will be generated. Present this PIN on-site in Cross River State only after you inspect your pass or tour vehicle.
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/40 flex items-start gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Legal Name (For Accreditation)
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                placeholder="e.g. Obinna Emecheta"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address (For PIN & Voucher)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  placeholder="+234 803 000 0000"
                />
              </div>
            </div>
          </div>

          {/* Transparent Fee Summary */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Experience Fee ({selectedDate})</span>
              <span className="font-semibold text-white">₦{amountNGN.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cross River Tourism Escrow Protection</span>
              <span className="text-emerald-400 font-bold">₦0 (Subsidized)</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold text-white">
              <span>Total Payable to Escrow Vault</span>
              <span className="text-amber-400 text-base">₦{totalAmountNGN.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-1">
            <button
              onClick={handlePaystackCheckout}
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-base shadow-gold-glow flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {activeStep === "processing" ? "Opening Paystack Sandbox..." : "Locking Escrow & Generating PIN..."}
                  </span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Pay ₦{totalAmountNGN.toLocaleString()} via Paystack</span>
                </>
              )}
            </button>

            {/* Test Simulation Button */}
            <button
              type="button"
              onClick={handleQuickTestCheckout}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Test Lock (Simulate Paystack Callback & 6-Digit PIN)</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span>256-Bit SSL Encrypted • Paystack Certified Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
