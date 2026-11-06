import React, { useState, useEffect, useMemo } from "react";
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
  Mail,
  Landmark,
  ExternalLink,
  Loader2,
  Search
} from "lucide-react";
import { 
  registerMerchantOnboarding, 
  POPULAR_BANKS, 
  ALL_NIGERIAN_BANKS, 
  isPaystackLiveMode, 
  resolveBankAccountClient 
} from "../utils/api.ts";
import { calculatePricingBreakdown, formatNaira } from "../utils/pricing.ts";

const CATEGORIES = [
  {
    id: "accommodations",
    label: "Accommodations",
    subLabel: "Hotels, Resorts, Suites",
    codePrefix: "CAL-HTL-XXXX",
    icon: BedDouble,
    defaultImage: "/assets/calabar-cityscape-aerial.jpg"
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
    bankCode: "057",
    bankName: "Zenith Bank",
    accountNumber: "",
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
  const [copiedSub, setCopiedSub] = useState(false);

  // Bank Search & Live Resolution State
  const [bankSearchTerm, setBankSearchTerm] = useState("");
  const [resolvingAccount, setResolvingAccount] = useState(false);
  const [resolvedAccountName, setResolvedAccountName] = useState("");
  const [isMockResolved, setIsMockResolved] = useState(false);
  const [resolveError, setResolveError] = useState("");

  const isLiveMode = isPaystackLiveMode();

  // Filter 290+ banks by search query
  const filteredBanks = useMemo(() => {
    const q = bankSearchTerm.trim().toLowerCase();
    if (!q) return ALL_NIGERIAN_BANKS;
    return ALL_NIGERIAN_BANKS.filter(
      b => b.name.toLowerCase().includes(q) || b.code.includes(q)
    );
  }, [bankSearchTerm]);

  // Real-time automated platform markup, 2% state tax, and net vendor payout
  const pricing = useMemo(() => {
    return calculatePricingBreakdown(formData.priceNGN);
  }, [formData.priceNGN]);

  // Debounced live bank account verification via Paystack / NIBSS
  useEffect(() => {
    let active = true;
    let cleanNum = (formData.accountNumber || "").replace(/\D/g, "");
    if (cleanNum.length === 11 && cleanNum.startsWith("0")) {
      cleanNum = cleanNum.slice(1);
    }

    if (cleanNum.length !== 10 || !formData.bankCode) {
      setResolvedAccountName("");
      setIsMockResolved(false);
      setResolveError("");
      setResolvingAccount(false);
      return;
    }

    setResolvingAccount(true);
    setResolveError("");

    const timer = setTimeout(async () => {
      try {
        const res = await resolveBankAccountClient({
          accountNumber: cleanNum,
          bankCode: formData.bankCode,
          businessName: formData.businessName
        });
        if (!active) return;
        
        const resolved = res?.accountName || res?.account_name || res?.data?.accountName || res?.data?.account_name;
        const isSuccess = res?.success || res?.data?.success;

        if (isSuccess && resolved) {
          setResolvedAccountName(resolved);
          setIsMockResolved(Boolean(res?.isTestMock || res?.data?.isTestMock));
          setResolveError("");
        } else {
          setResolvedAccountName("");
          setIsMockResolved(false);
          setResolveError(res?.error || res?.data?.error || "Unable to verify account name. Please check NUBAN and bank.");
        }
      } catch (err) {
        if (!active) return;
        setResolvedAccountName("");
        setIsMockResolved(false);
        setResolveError(err?.message || "Verification failed");
      } finally {
        if (active) setResolvingAccount(false);
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [formData.accountNumber, formData.bankCode, formData.businessName]);

  if (!isOpen) return null;

  const selectedCategoryMeta = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[0];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleBankChange = (code, name) => {
    setFormData(prev => ({
      ...prev,
      bankCode: code,
      bankName: name,
      bankPayoutDetails: `${name} - ${prev.accountNumber || ""}`
    }));
  };

  const handleAccountNumberChange = (val) => {
    let clean = val.replace(/\D/g, "").slice(0, 11);
    if (clean.length === 11 && clean.startsWith("0")) {
      clean = clean.slice(1); // Auto-normalize to 10 digits
    }
    setFormData(prev => ({
      ...prev,
      accountNumber: clean,
      bankPayoutDetails: `${prev.bankName || "Zenith Bank"} - ${clean}`
    }));
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
      bankCode: "057",
      bankName: "Zenith Bank",
      accountNumber: "0000000000",
      bankPayoutDetails: "Zenith Bank - 0000000000 (Royal Hospitality Ltd)",
      phone: "+234 803 772 1904",
      email: "reservations@royalefiksuites.com",
      location: "Marian Road / State Housing Estate, Calabar",
      logoUrl: "/assets/calabar-cityscape-aerial.jpg",
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

    let cleanAcc = formData.accountNumber.trim().replace(/\D/g, "");
    if (cleanAcc.length === 11 && cleanAcc.startsWith("0")) {
      cleanAcc = cleanAcc.slice(1);
    }

    if (cleanAcc.length !== 10) {
      setError("Please specify a valid 10-digit settlement account number (or 11-digit mobile account).");
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
        basePriceNGN: pricing.basePrice,
        platformMarkupNGN: pricing.platformMarkup,
        taxNGN: pricing.taxAmount,
        taxRatePercent: 2,
        vendorPayoutNGN: pricing.vendorPayout,
        priceNGN: pricing.publicListingPrice, // Marked-up public guest price
        publicPriceNGN: pricing.publicListingPrice,
        accountNumber: cleanAcc,
        accountName: resolvedAccountName || formData.businessName,
        bankPayoutDetails: resolvedAccountName
          ? `${formData.bankName} - ${cleanAcc} (${resolvedAccountName})`
          : `${formData.bankName} - ${cleanAcc}`,
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
        className="relative w-full max-w-xl bg-[#0d131f] border border-stateCyan/40 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-stateCyan/10 text-slate-100 my-auto max-h-[90vh] overflow-y-auto"
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
              {!isLiveMode && (
                <button
                  type="button"
                  onClick={handlePresetFill}
                  className="px-2.5 py-1 rounded-lg bg-stateCyan/15 hover:bg-stateCyan/25 text-stateCyan font-bold text-[10px] uppercase tracking-wider transition border border-stateCyan/30 cursor-pointer whitespace-nowrap"
                >
                  Auto-Fill Sample
                </button>
              )}
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition"
                  required
                />
              </div>

              {/* Automated Paystack Settlement Account */}
              <div className="rounded-2xl border border-stateCyan/30 bg-slate-950/60 p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stateCyan">
                    <Landmark className="w-4 h-4 text-stateCyan" />
                    <span>3. Settlement Account (Paystack Subaccount) *</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Auto-Provisioned
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-slate-300 text-[11px]">
                        Settlement Bank * ({ALL_NIGERIAN_BANKS.length} Banks)
                      </label>
                      {bankSearchTerm && (
                        <button
                          type="button"
                          onClick={() => setBankSearchTerm("")}
                          className="text-[10px] text-sky-400 hover:underline cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Instant Bank Search Input */}
                    <div className="relative mb-1.5">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={bankSearchTerm}
                        onChange={(e) => setBankSearchTerm(e.target.value)}
                        placeholder="Search: Moniepoint, PalmPay, OPay..."
                        className="w-full pl-7 pr-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-[11px] focus:outline-none focus:border-sky-400 transition"
                      />
                    </div>

                    <select
                      value={formData.bankCode}
                      onChange={(e) => {
                        const selectedBank = ALL_NIGERIAN_BANKS.find(b => b.code === e.target.value);
                        handleBankChange(e.target.value, selectedBank?.name || formData.bankName);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400 transition cursor-pointer"
                    >
                      {!bankSearchTerm && (
                        <optgroup label="🌟 POPULAR / DIGITAL & COMMERCIAL BANKS">
                          {POPULAR_BANKS.map(b => (
                            <option key={`pop-${b.code}`} value={b.code}>
                              {b.name} ({b.code})
                            </option>
                          ))}
                        </optgroup>
                      )}
                      <optgroup label={bankSearchTerm ? `FILTERED RESULTS (${filteredBanks.length})` : "🏛️ ALL 290+ NIGERIAN BANKS (A-Z)"}>
                        {filteredBanks.map(b => (
                          <option key={b.code} value={b.code}>
                            {b.name} ({b.code})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1 text-[11px]">
                      Account Number (NUBAN or Mobile) *
                    </label>
                    <input
                      type="text"
                      maxLength={11}
                      value={formData.accountNumber}
                      onChange={(e) => handleAccountNumberChange(e.target.value)}
                      placeholder="e.g. 8031234567 or 10-digit NUBAN"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition"
                      required
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      💡 PalmPay/OPay: Enter your 10-digit number or 11 digits with 0 (auto-converts).
                    </span>
                  </div>
                </div>

                {/* Live Account Name Verification Preview */}
                {resolvingAccount && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-[11px] animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400 shrink-0" />
                    <span>Verifying settlement account name with NIBSS & Paystack...</span>
                  </div>
                )}

                {!resolvingAccount && resolvedAccountName && (
                  <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-slate-300">Verified Account:</span>
                      <span className="font-bold text-emerald-200 uppercase truncate">{resolvedAccountName}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400/90 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 shrink-0">
                      {isMockResolved ? "NIBSS Sandbox" : "NIBSS Live"}
                    </span>
                  </div>
                )}

                {!resolvingAccount && resolveError && formData.accountNumber.length >= 10 && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 text-[11px]">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{resolveError}</span>
                  </div>
                )}

                <p className="text-[10px] text-slate-400 leading-relaxed">
                  {isLiveMode ? (
                    <span>🔒 <strong>Live Paystack Merchant Settlement:</strong> An official Paystack subaccount will be created and verified directly with your bank. Real customer payments will settle to this account.</span>
                  ) : (
                    <span>⚡ <strong>Automatic Paystack Subaccount:</strong> When submitted, an official Subaccount is created on your Paystack Dashboard (under <em>Akanno Tech</em>). In Test Mode, use <code className="text-stateCyan font-mono">0000000000</code> or your valid NUBAN.</span>
                  )}
                </p>
              </div>

              {/* Operator Phone Number */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stateCyan" />
                  <span>4. Operator Phone Number *</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234 80X XXX XXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition"
                  required
                />
              </div>

              {/* Business Email for Verification & Approval Dispatch */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stateCyan" />
                  <span>Official Business Email (Receives State Merchant Code & Approval Notice)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="e.g. contact@yourbusiness.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>Your Asking Base Rate (₦)</span>
                    <span className="text-[10px] text-emerald-400 font-semibold normal-case">What you want to earn</span>
                  </label>
                  <input
                    type="number"
                    value={formData.priceNGN}
                    onChange={(e) => handleInputChange("priceNGN", e.target.value)}
                    placeholder="45000"
                    min="0"
                    step="500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition font-mono font-bold"
                  />
                </div>
              </div>

              {/* Real-time Automated Markup, 2% Tax & Net Vendor Payout Breakdown */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900 border border-slate-800 shadow-xl space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Your Base Asking Rate:</span>
                  </span>
                  <span className="font-mono font-bold text-white text-sm">
                    {formatNaira(pricing.basePrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-rose-300/90">
                  <span className="flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-rose-400" />
                    <span>State Tourism / Govt Tax (2%):</span>
                  </span>
                  <span className="font-mono font-semibold">
                    -{formatNaira(pricing.taxAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Your Guaranteed Net Payout:</span>
                  </span>
                  <span className="font-mono font-black text-sm text-emerald-200">
                    {formatNaira(pricing.vendorPayout)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-amber-300/90 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>CalabarPass Added Service Fee:</span>
                  </span>
                  <span className="font-mono font-semibold">
                    +{formatNaira(pricing.platformMarkup)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-200 font-bold flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-stateCyan" />
                      <span>Guest Public Listing Price:</span>
                    </span>
                    <span className="text-[10px] text-slate-400 block">Official price displayed on CalabarPass catalog</span>
                  </div>
                  <span className="font-mono font-black text-base text-stateCyan">
                    {formatNaira(pricing.publicListingPrice)}
                  </span>
                </div>

                <div className="mt-1 pt-1.5 border-t border-slate-800/60 flex items-start gap-1.5 text-[10px] text-slate-400 leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Zero-Commission Guarantee:</strong> CalabarPass adds our platform fee on top so we never touch your asking price. You receive 100% of your money (minus the 2% statutory government tax) upon on-site 6-digit PIN check-in.
                  </span>
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition resize-none"
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

            {/* Access Code State Cyan Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-950/60 via-slate-900 to-cyan-950/40 border-2 border-stateCyan/60 shadow-lg shadow-stateCyan/10 max-w-sm mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stateCyan block mb-1">
                Your Official Vendor Access Code
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-sky-200 tracking-wider">
                  {createdVendor.accessCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-2 rounded-xl bg-stateCyan/20 hover:bg-stateCyan/30 text-stateCyan border border-stateCyan/40 transition cursor-pointer"
                  title="Copy Access Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Category prefix: <strong className="text-slate-300 font-mono">{createdVendor.accessCode.split('-').slice(0, 2).join('-')}</strong> • 4-Digit Security Key: <strong className="text-slate-300 font-mono">{createdVendor.accessCode.split('-')[2]}</strong>
              </p>
            </div>

            {/* Paystack Automated Subaccount Box */}
            {(createdVendor.subaccount_code || createdVendor.vendor?.subaccount_code) && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/50 shadow-emerald-glow max-w-sm mx-auto text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Paystack Subaccount Created</span>
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Live on Dashboard
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <div className="overflow-hidden">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-300 tracking-wider truncate block">
                      {createdVendor.subaccount_code || createdVendor.vendor?.subaccount_code}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Bank: <strong className="text-slate-200">{createdVendor.vendor?.bankAccount || `${formData.bankName} - ${formData.accountNumber}`}</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const code = createdVendor.subaccount_code || createdVendor.vendor?.subaccount_code;
                      if (code) {
                        navigator.clipboard?.writeText(code);
                        setCopiedSub(true);
                        setTimeout(() => setCopiedSub(false), 2000);
                      }
                    }}
                    className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition cursor-pointer shrink-0"
                    title="Copy Subaccount Code"
                  >
                    {copiedSub ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2.5 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Paystack: Payments → Subaccounts</span>
                  <a
                    href="https://dashboard.paystack.com/#/subaccounts"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
                  >
                    <span>View in Paystack</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 max-w-md mx-auto space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Directory Status:</span>
                <span className="font-bold text-emerald-400">Live in #directory-catalog</span>
              </div>
              {(createdVendor.subaccount_code || createdVendor.vendor?.subaccount_code) && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Paystack Subaccount:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {createdVendor.subaccount_code || createdVendor.vendor?.subaccount_code}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Settlement Account:</span>
                <span className="font-mono text-slate-200">{createdVendor.vendor?.bankAccount}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-emerald-300 font-semibold">
                <span className="text-slate-400 font-normal">Your Net Bank Payout:</span>
                <span className="font-mono font-black text-sm text-emerald-400">
                  {formatNaira(createdVendor.vendor?.vendorPayoutNGN || pricing.vendorPayout)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>(Base: {formatNaira(createdVendor.vendor?.basePriceNGN || pricing.basePrice)} • 2% State Tax: -{formatNaira(createdVendor.vendor?.taxNGN || pricing.taxAmount)})</span>
                <span className="text-sky-300 font-medium">Guest: {formatNaira(createdVendor.vendor?.priceNGN || pricing.publicListingPrice)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-400">Private Terminal:</span>
                <span className="font-bold text-stateCyan">Isolated & Locked Under Key</span>
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
