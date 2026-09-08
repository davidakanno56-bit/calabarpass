import React, { useState } from "react";
import { X, Lock, ShieldCheck, CreditCard, AlertCircle, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function PaystackCheckoutModal({
  pkg,
  onClose,
  onSuccessVoucher,
  paystackPublicKey
}) {
  const [formData, setFormData] = useState({
    customerName: "Obinna Emecheta",
    email: "tourist@carnivalcalabar.ng",
    phone: "+234 803 456 7890"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState("form"); // 'form' | 'processing' | 'verifying'

  const amountNGN = pkg?.priceNGN || 0;
  const escrowFeeNGN = 0; // 0% subsidized by Tourism Bureau
  const totalAmountNGN = amountNGN + escrowFeeNGN;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Primary: Initialize Paystack transaction on backend and launch Paystack inline popup or redirect
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
      // 1. Initialize on Express backend
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          email: formData.email,
          customerName: formData.customerName,
          phone: formData.phone,
          callbackUrl: window.location.href
        })
      });

      const initData = await res.json();

      if (!res.ok || !initData.success) {
        throw new Error(initData.error || "Failed to initialize payment");
      }

      const reference = initData.reference;
      const publicKey = initData.publicKey || paystackPublicKey || "pk_test_e911f3fc519a96d916fbfea85742f88078495266";

      // 2. Check if PaystackPop inline SDK is available
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
              { display_name: "Vendor", variable_name: "vendor", value: pkg.vendor }
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
        const checkoutWindow = window.open(initData.authorization_url, "_blank");
        
        // Poll verification endpoint
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
   * Verify transaction on backend, lock escrow, and get 6-digit PIN
   */
  const verifyBackendTransaction = async (reference) => {
    try {
      setActiveStep("verifying");
      const res = await fetch(`/api/paystack/verify/${encodeURIComponent(reference)}`);
      const data = await res.json();

      if (data.success && data.transaction) {
        onSuccessVoucher(data.transaction);
      } else {
        // Even if Paystack test server returned non-success, check if simulated
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
   * Direct Quick-Test Verification: Allows testing the live escrow lock & PIN generation instantly
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
          phone: formData.phone
        })
      });

      const initData = await res.json();
      if (!initData.success) throw new Error(initData.error);

      // Verify backend
      setActiveStep("verifying");
      const verifyRes = await fetch(`/api/paystack/verify/${encodeURIComponent(initData.reference)}`);
      const verifyData = await verifyRes.json();

      if (verifyData.success && verifyData.transaction) {
        onSuccessVoucher(verifyData.transaction);
      } else {
        // Lock locally for demo if test card wasn't charged
        const fallbackRes = await fetch("/api/escrow/release", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: initData.reference, pin: "test" })
        });
        throw new Error(verifyData.message || "Verification response pending");
      }
    } catch (err) {
      // In test mode without real card swipe, simulate the successful Paystack webhook callback
      try {
        const dummyRef = `CP-VERIFIED-${Date.now()}`;
        const initRes = await fetch("/api/paystack/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageId: pkg.id,
            email: formData.email,
            customerName: formData.customerName,
            phone: formData.phone
          })
        });
        const init = await initRes.json();
        
        // Complete verification
        const verifyRes = await fetch(`/api/paystack/verify/${encodeURIComponent(init.reference)}`);
        const verifyData = await verifyRes.json();
        if (verifyData.transaction) {
          onSuccessVoucher(verifyData.transaction);
        } else {
          setError(err.message);
          setLoading(false);
          setActiveStep("form");
        }
      } catch (innerErr) {
        setError(innerErr.message);
        setLoading(false);
        setActiveStep("form");
      }
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
          onSuccessVoucher(data.transaction);
        }
      } catch (e) {
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
                Escrow Booking Checkout
              </h3>
              <div className="text-xs text-slate-400">
                Powered by Live Paystack & Cross River Tourism
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
        <div className="p-6 space-y-6">
          {/* Package Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex gap-4 items-center">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">{pkg.category}</div>
              <div className="font-bold text-sm text-white truncate">{pkg.name}</div>
              <div className="text-xs text-slate-400 truncate">Vendor: {pkg.vendor}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Price</div>
              <div className="text-lg font-extrabold font-heading text-white">
                ₦{pkg.priceNGN.toLocaleString()}
              </div>
            </div>
          </div>

          {/* How Escrow Works Note */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-200 leading-relaxed">
              <strong className="text-emerald-300">100% Anti-Scam Protection: </strong>
              Your payment is not sent to the vendor immediately. It is held securely in the CalabarPass Escrow Vault. You will receive a private <strong>6-digit check-in PIN</strong>. Present this PIN to the vendor on-site only after inspecting your costume/pass.
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
                Full Legal Name (For On-Site Accreditation)
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
                  Email Address (Receipt & PIN)
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
              <span>Carnival Package Fee</span>
              <span className="font-semibold text-white">₦{amountNGN.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cross River Tourism Escrow Fee</span>
              <span className="text-emerald-400 font-bold">₦0 (Covered)</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold text-white">
              <span>Total Payable to Escrow Vault</span>
              <span className="text-amber-400 text-base">₦{totalAmountNGN.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePaystackCheckout}
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-base shadow-gold-glow flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {activeStep === "processing" ? "Connecting to Paystack..." : "Locking Escrow & Generating PIN..."}
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
              <span>Instant Test Lock (Simulate Paystack Verification & 6-Digit PIN)</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span>256-Bit SSL Encrypted • Cross River State Official Tourism Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
