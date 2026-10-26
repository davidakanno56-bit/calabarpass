import React, { useState } from "react";
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Copy, 
  Check, 
  ArrowRight, 
  BedDouble, 
  Trees, 
  Utensils, 
  Briefcase, 
  Flame, 
  Sparkles, 
  CreditCard, 
  Phone, 
  MapPin, 
  Image as ImageIcon,
  Mail 
} from "lucide-react";
import { registerMerchantOnboarding } from "../utils/api.js";

const CATEGORIES = [
  {
    id: "accommodations",
    label: "Accommodations",
    subLabel: "Hotels, Resorts, Suites",
    codePrefix: "CAL-HTL-XXXX",
    icon: BedDouble,
    defaultImage: "/assets/executive_vip.jpg"
  },
  {
    id: "eco-sites",
    label: "Eco-Sites & Heritage",
    subLabel: "Sanctuaries, Falls, Rainforests",
    codePrefix: "CAL-ECO-XXXX",
    icon: Trees,
    defaultImage: "/assets/obudu_mountain.jpg"
  },
  {
    id: "dining-nightlife",
    label: "Dining & Nightlife",
    subLabel: "Eateries, Seafood Hubs, Lounges",
    codePrefix: "CAL-EAT-XXXX",
    icon: Utensils,
    defaultImage: "/assets/marina_resort.jpg"
  },
  {
    id: "trade-expo",
    label: "Trade & Expo Hub",
    subLabel: "Trade Fair Booths, Industrial Passes",
    codePrefix: "CAL-TRD-XXXX",
    icon: Briefcase,
    defaultImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Calabar_International_Convention_Centre.jpg/1280px-Calabar_International_Convention_Centre.jpg"
  },
  {
    id: "carnival-culture",
    label: "Carnival & Culture",
    subLabel: "Band Secretariats, Festival Passes",
    codePrefix: "CAL-CUL-XXXX",
    icon: Flame,
    defaultImage: "/assets/seagull_band.jpg"
  }
];

export default function MerchantOnboardingModal({ isOpen, onClose, onOnboardSuccess }) {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "accommodations",
    bankPayoutDetails: "",
    phone: "",
    email: "",
    location: "Marian Road / Calabar Municipality",
    logoUrl: "",
    priceNGN: 45000,
    description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdVendor, setCreatedVendor] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const selectedCategoryMeta = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[0];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleCategorySelect = (catId) => {
    const meta = CATEGORIES.find(c => c.id === catId);
    setFormData(prev => ({
      ...prev,
      category: catId,
      logoUrl: prev.logoUrl ? prev.logoUrl : (meta?.defaultImage || "")
    }));
  };

  const handlePresetFill = () => {
    setFormData({
      businessName: "Royal Efik Heritage Suites",
      category: "accommodations",
      bankPayoutDetails: "Zenith Bank - 1029384756 (Royal Hospitality Ltd)",
      phone: "+234 803 772 1904",
      email: "reservations@royalefiksuites.com",
      location: "Marian Road / State Housing Estate, Calabar",
      logoUrl: "/assets/executive_vip.jpg",
      priceNGN: 65000,
      description: "Premier executive boutique suites with 24/7 security, private balcony views, and authentic Efik breakfast."
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");

    if (!formData.businessName.trim()) {
      setError("Please provide your establishment or business name.");
      return;
    }
    if (!formData.bankPayoutDetails.trim()) {
      setError("Please specify your verified settlement bank account.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please provide an active merchant phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registerMerchantOnboarding({
        ...formData,
        logoUrl: formData.logoUrl.trim() || selectedCategoryMeta.defaultImage
      });

      if (res?.data?.success && res?.data?.accessCode) {
        setCreatedVendor(res.data);
      } else {
        setError(res?.data?.error || "Registration failed. Please review your details.");
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred during merchant onboarding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!createdVendor?.accessCode) return;
    navigator.clipboard?.writeText(createdVendor.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToTerminal = () => {
    if (!createdVendor) return;
    // Save authentication session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("calabarpass_vendor_auth", "true");
      sessionStorage.setItem("calabarpass_vendor_auth_time", Date.now().toString());
      sessionStorage.setItem("calabarpass_active_merchant_id", createdVendor.vendor.id);
    }
    onOnboardSuccess?.(createdVendor);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0d131f] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-slate-100 my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close onboarding modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!createdVendor ? (
          <div>
            {/* Header Clearance Badge */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-stateCyan/20 border border-stateCyan/30 flex items-center justify-center text-stateCyan">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-stateCyan">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cross River State Ministry of Tourism Clearinghouse</span>
                </div>
                <p className="text-xs text-slate-400">Merchant Self-Onboarding & Directory Registration</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <h2 id="onboarding-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white">
                Register Merchant Terminal
              </h2>
              <button
                type="button"
                onClick={handlePresetFill}
                className="px-2.5 py-1 rounded-lg bg-stateCyan/15 hover:bg-stateCyan/25 text-stateCyan font-bold text-[10px] uppercase tracking-wider transition border border-stateCyan/30 cursor-pointer whitespace-nowrap"
              >
                Auto-Fill Sample
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Register your business across our 365-day commercial architecture. Upon submission, a cryptographically secure Vendor Access Code is generated and your listing is immediately published.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              {/* Category Picker */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. Select Commercial Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition cursor-pointer ${
                          isSelected
                            ? "bg-stateCyan/15 border-sky-400 text-stateCyan shadow-sm shadow-stateCyan/20"
                            : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 w-full">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-stateCyan" : "text-slate-400"}`} />
                          <span className="font-bold text-[11px] truncate text-white">{cat.label}</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 mt-1">{cat.codePrefix}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  2. Business / Property Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="e.g. Transcorp Hotels, Viking Seafood, Seagull Band..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                  required
                />
              </div>

              {/* Bank Payout Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Settlement Bank Details *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.bankPayoutDetails}
                    onChange={(e) => handleInputChange("bankPayoutDetails", e.target.value)}
                    placeholder="e.g. Zenith Bank - 1029384756"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Operator Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+234 80X XXX XXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                    required
                  />
                </div>
              </div>

              {/* Business Email for Verification & Approval Dispatch */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Business Email (Receives State Merchant Code & Approval Notice)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="e.g. contact@yourbusiness.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              {/* Location & Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Corridor / Street Location</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g. Marian Road, Calabar Municipality"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Base Price / Entry Benchmark (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.priceNGN}
                    onChange={(e) => handleInputChange("priceNGN", e.target.value)}
                    placeholder="35000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              {/* Logo / Image URL */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Photo / Banner Image URL</span>
                </label>
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => handleInputChange("logoUrl", e.target.value)}
                  placeholder={selectedCategoryMeta.defaultImage}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Short Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Highlights, offerings, amenities, or festival passes included..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-stateCyan/25 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>Generating Terminal Key & Registering...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Complete Registration & Generate Access Code</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold transition border border-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS CELEBRATION VIEW */
          <div className="text-center py-4 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Onboarding Approved & Card Published</span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-white">
                {createdVendor.vendor?.name}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Your establishment is now active in the Cross River 365-day commercial directory. Keep your cryptographically generated Vendor Access Code safe:
              </p>
            </div>

            {/* Access Code Golden Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-amber-950/40 border-2 border-amber-500/60 shadow-gold-glow max-w-sm mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Your Official Vendor Access Code
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-wider">
                  {createdVendor.accessCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition cursor-pointer"
                  title="Copy Access Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Category prefix: <strong className="text-slate-300 font-mono">{createdVendor.accessCode.split('-').slice(0, 2).join('-')}</strong> • 4-Digit Security Key: <strong className="text-slate-300 font-mono">{createdVendor.accessCode.split('-')[2]}</strong>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 max-w-md mx-auto space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Directory Status:</span>
                <span className="font-bold text-emerald-400">Live in #directory-catalog</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Settlement Account:</span>
                <span className="font-mono text-slate-200">{createdVendor.vendor?.bankAccount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Private Terminal:</span>
                <span className="font-bold text-amber-300">Isolated & Locked Under Key</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleProceedToTerminal}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stateCyan hover:bg-sky-500 text-white font-extrabold text-xs shadow-lg shadow-stateCyan/25 transition cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Enter Private Terminal Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition border border-slate-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
