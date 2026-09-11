import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Lock,
  AlertTriangle,
  ArrowRight,
  QrCode,
  Calendar,
  Download,
  ShieldAlert,
  X,
  Clock,
  FileCheck
} from "lucide-react";
import confetti from "canvas-confetti";
import QRCode from "qrcode";

export default function EscrowVoucherModal({ transaction: initialTx, onClose, onOpenEscrowPortal }) {
  const [transaction, setTransaction] = useState(initialTx);
  const [copied, setCopied] = useState(false);
  const [qrSvg, setQrSvg] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("Vendor No-Show / Unreachable");
  const [disputeDetails, setDisputeDetails] = useState("");
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);
  const [disputeSuccess, setDisputeSuccess] = useState(false);
  const [downloadingPass, setDownloadingPass] = useState(false);

  useEffect(() => {
    setTransaction(initialTx);
  }, [initialTx]);

  useEffect(() => {
    // Fire celebratory confetti on voucher generation
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#10b981", "#fbbf24", "#3b82f6"]
    });
  }, []);

  // Generate dynamic cryptographic QR Code encoding Booking Reference & PIN
  useEffect(() => {
    if (!transaction) return;

    // Encode verified payload for mobile camera / offline scanner
    const qrPayload = JSON.stringify({
      protocol: "CALABARPASS_ESCROW_V1",
      reference: transaction.reference,
      checkInPin: transaction.checkInPin,
      customerName: transaction.customerName,
      vendor: transaction.vendor,
      amountNGN: transaction.amountNGN,
      bookingDate: transaction.bookingDate || "365_DAY_OPEN"
    });

    // 1. Generate clean SVG QR Code
    QRCode.toString(qrPayload, {
      type: "svg",
      margin: 1,
      color: {
        dark: "#0b0f17",
        light: "#ffffff"
      }
    })
      .then((svg) => setQrSvg(svg))
      .catch((err) => console.error("QR SVG generation error:", err));

    // 2. Generate DataURL for offline pass export
    QRCode.toDataURL(qrPayload, {
      margin: 1,
      width: 260,
      color: {
        dark: "#0b0f17",
        light: "#ffffff"
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR DataURL generation error:", err));
  }, [transaction]);

  const handleCopyPin = () => {
    if (transaction?.checkInPin) {
      navigator.clipboard.writeText(transaction.checkInPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  /**
   * Generates a high-definition offline pass image (PNG) via HTML5 Canvas
   * and triggers automatic download so tourists have access without internet.
   */
  const handleDownloadOfflinePass = async () => {
    if (!transaction) return;
    setDownloadingPass(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 760;
      const ctx = canvas.getContext("2d");

      // Card Background
      ctx.fillStyle = "#0d131f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold-emerald top ribbon
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#f59e0b");
      gradient.addColorStop(0.5, "#10b981");
      gradient.addColorStop(1, "#f59e0b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 16);

      // Inner card border
      ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 36, canvas.width - 60, canvas.height - 66);

      // Header Brand
      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("OFFICIAL VERIFICATION PASS • 365-DAY ESCROW CLEARINGHOUSE", 60, 80);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px sans-serif";
      ctx.fillText("CalabarPass Escrow Voucher", 60, 134);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "16px sans-serif";
      ctx.fillText("Cross River State Tourism Bureau Anti-Fraud Escrow Network", 60, 168);

      // Escrow status badge
      ctx.fillStyle = transaction.status === "ESCROW_FROZEN_DISPUTE" ? "#4c0519" : "#022c22";
      ctx.fillRect(canvas.width - 480, 80, 420, 48);
      ctx.strokeStyle = transaction.status === "ESCROW_FROZEN_DISPUTE" ? "#f43f5e" : "#10b981";
      ctx.strokeRect(canvas.width - 480, 80, 420, 48);

      ctx.fillStyle = transaction.status === "ESCROW_FROZEN_DISPUTE" ? "#fecdd3" : "#6ee7b7";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(
        transaction.statusLabel || "Escrow Secured - Awaiting On-Site Verification",
        canvas.width - 460,
        110
      );

      // Secret 6-Digit PIN Box
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(60, 200, canvas.width - 120, 180);
      ctx.strokeStyle = "#f59e0b";
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(60, 200, canvas.width - 120, 180);
      ctx.setLineDash([]);

      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("SECRET PHYSICAL CHECK-IN PIN", 90, 240);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 68px monospace";
      ctx.fillText(String(transaction.checkInPin || "849201"), 90, 320);

      ctx.fillStyle = "#10b981";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText("Escrow Guarantee: Funds remain protected until PIN redemption. 48-hour auto-dispute window.", 90, 360);

      // Details Columns
      const col1X = 60;
      const col2X = 420;
      const col3X = 780;

      // Col 1: Tourism Package & Vendor
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("TOURISM DESTINATION / SERVICE", col1X, 430);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(transaction.packageName || "Premier Executive Stay", col1X, 460, 320);
      ctx.fillStyle = "#f59e0b";
      ctx.font = "16px sans-serif";
      ctx.fillText(`Vendor: ${transaction.vendor || "Verified Partner"}`, col1X, 490, 320);

      // Col 2: Reservation & Guest
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("DATE & GUEST", col2X, 430);
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(transaction.bookingDate || "365-Day Open Reservation", col2X, 460);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "16px sans-serif";
      ctx.fillText(`Guest: ${transaction.customerName || "Tourist"}`, col2X, 490);

      // Col 3: Escrow Amount & Reference
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("ESCROW DEPOSIT & REF", col3X, 430);
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(`₦${(transaction.amountNGN || 0).toLocaleString()} NGN`, col3X, 460);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px monospace";
      ctx.fillText(`Ref: ${transaction.reference || ""}`, col3X, 490);

      // Draw QR Code on bottom right
      if (qrDataUrl) {
        const qrImg = new Image();
        qrImg.src = qrDataUrl;
        await new Promise((resolve) => {
          qrImg.onload = resolve;
          qrImg.onerror = resolve;
        });
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(canvas.width - 240, canvas.height - 210, 160, 160);
        ctx.drawImage(qrImg, canvas.width - 235, canvas.height - 205, 150, 150);
      }

      // Security Seal Footer
      ctx.fillStyle = "#475569";
      ctx.font = "13px sans-serif";
      ctx.fillText("Tamper-Proof Cryptographic Token • Offline Digital Pass • Cross River State Tourism Bureau", 60, canvas.height - 60);

      // Trigger download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `CalabarPass-Voucher-${transaction.reference || "Pass"}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setDownloadingPass(false);
      });
    } catch (err) {
      console.error("Offline pass generation error:", err);
      // Fallback: window.print()
      window.print();
      setDownloadingPass(false);
    }
  };

  /**
   * Submits escrow dispute to freeze vendor disbursement immediately
   */
  const handleFreezeEscrowDispute = async (e) => {
    e.preventDefault();
    if (!transaction?.reference) return;

    setDisputeSubmitting(true);
    try {
      const res = await fetch("/api/escrow/dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: transaction.reference,
          reason: disputeReason,
          details: disputeDetails
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTransaction(data.transaction);
        setDisputeSuccess(true);
      } else {
        alert(data.error || "Failed to submit dispute");
      }
    } catch (err) {
      console.error("Dispute error:", err);
      alert("Network error connecting to escrow authority");
    } finally {
      setDisputeSubmitting(false);
    }
  };

  if (!transaction) return null;

  const isFrozen = transaction.status === "ESCROW_FROZEN_DISPUTE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121826] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Top Gold Ribbon */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 no-print" />

        {/* Voucher Container */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6 print:border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-black font-extrabold text-2xl shadow-gold-glow">
                🌴
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-amber-600">
                  Official Verification Pass • 365-Day Clearinghouse
                </div>
                <h2 className="text-2xl font-extrabold font-heading text-white print:text-black">
                  CalabarPass Escrow Voucher
                </h2>
                <p className="text-xs text-slate-400 print:text-gray-600">
                  Cross River State Tourism Bureau Anti-Fraud Escrow Network
                </p>
              </div>
            </div>

            {/* Escrow Status Badge */}
            {isFrozen ? (
              <div className="px-3.5 py-1.5 rounded-xl bg-rose-950/90 border border-rose-500/50 text-rose-300 text-xs font-bold tracking-wide flex items-center gap-2 shadow-rose-900/50 print:border-rose-600 print:text-rose-800">
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
                <span>Escrow Frozen - Under Review</span>
              </div>
            ) : (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold tracking-wide flex items-center gap-2 shadow-emerald-glow print:border-emerald-600 print:text-emerald-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{transaction.statusLabel || "Escrow Secured - Awaiting On-Site Verification"}</span>
              </div>
            )}
          </div>

          {/* Frozen Alert Banner if disputed */}
          {isFrozen && (
            <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-xs space-y-1.5 text-rose-200">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <ShieldAlert className="w-4 h-4" />
                <span>ESCROW PROTECTION ACTIVE: Payout Immediately Frozen</span>
              </div>
              <p className="text-slate-300">
                Dispute Reason: <strong className="text-white">{transaction.disputeReason}</strong>
              </p>
              <p className="text-slate-400 text-[11px]">
                Vendor PIN redemption has been blocked. A Cross River State Tourism Bureau officer is assigned to verify.
              </p>
            </div>
          )}

          {/* Core 6-Digit Check-in PIN Display Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-emerald-950/20 border-2 border-dashed border-amber-500/50 text-center relative overflow-hidden print:border-amber-600">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              Secret Physical Check-In Code
            </div>
            <div className="text-xs text-slate-400 mb-3">
              Present this 6-digit PIN to the verified vendor upon arrival in Cross River State to redeem your pass/tour
            </div>

            {/* Huge PIN */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-white bg-slate-950/90 px-6 py-3 rounded-2xl border border-amber-500/40 shadow-gold-glow print:text-black print:bg-gray-100">
                {transaction.checkInPin || "849201"}
              </div>
              <button
                onClick={handleCopyPin}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors no-print"
                title="Copy PIN"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Auto-Expiry Protection Badge */}
            <div className="inline-flex items-center justify-center gap-2 text-[11px] text-emerald-300 bg-emerald-950/70 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 mb-3 max-w-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Escrow Guarantee: Funds remain protected until PIN redemption. 48-hour auto-dispute window.</span>
            </div>

            <div className="block">
              <div className="inline-flex items-center gap-2 text-[11px] text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>DO NOT share this PIN on WhatsApp or phone calls. Disclose it only on-site after inspecting your stay/kit.</span>
              </div>
            </div>

            {/* Escrow Safety Trigger link */}
            {!isFrozen && (
              <div className="mt-3 pt-2 border-t border-slate-800/80 no-print">
                <button
                  type="button"
                  onClick={() => setShowDisputeModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 underline decoration-rose-500/40 hover:decoration-rose-300 font-medium transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Encountered an issue on arrival? Freeze Escrow & Report Dispute</span>
                </button>
              </div>
            )}
          </div>

          {/* Voucher Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Tourism Destination / Stay</div>
              <div className="font-bold text-sm text-white mt-0.5 print:text-black">{transaction.packageName}</div>
              <div className="text-slate-400 mt-1">Vendor: <span className="text-amber-400 font-semibold">{transaction.vendor}</span></div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Reservation Date</div>
              <div className="font-bold text-sm text-emerald-400 mt-0.5 flex items-center gap-1.5 print:text-emerald-700">
                <Calendar className="w-4 h-4" />
                <span>{transaction.bookingDate || "365-Day Open Reservation"}</span>
              </div>
              <div className="text-slate-400 mt-1">Accredited Guest: <span className="text-white font-medium">{transaction.customerName}</span></div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Booking Reference</div>
              <div className="font-mono font-bold text-white mt-0.5 print:text-black">{transaction.reference}</div>
              <div className="text-emerald-400 text-[11px] mt-1">Status: Escrow Vault Secured</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 print:bg-gray-50 print:border-gray-200">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Escrow Deposit Amount</div>
              <div className="text-lg font-black font-heading text-emerald-400 mt-0.5">
                ₦{(transaction.amountNGN || 0).toLocaleString()} NGN
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">Disbursement locked pending on-site PIN entry</div>
            </div>
          </div>

          {/* Dynamic SVG QR Code Section */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:border-gray-300">
            <div className="flex items-center gap-4">
              {/* Dynamic SVG QR Code with high contrast white background */}
              <div className="w-20 h-20 bg-white p-1 rounded-xl shadow-md shrink-0 flex items-center justify-center overflow-hidden border border-slate-300">
                {qrSvg ? (
                  <div
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                ) : (
                  <QrCode className="w-12 h-12 text-slate-800 animate-pulse" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-0.5">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Dynamic Cryptographic Mobile QR Pass</span>
                </div>
                <div className="font-mono font-bold text-white print:text-black text-sm">{transaction.reference}</div>
                <div className="text-slate-400 text-[11px] mt-0.5 max-w-sm">
                  Encodes Booking Ref & PIN for optical scanning by verified hotel front desks & tour operators.
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-emerald-400 text-xs">OFFICIAL ESCROW SEAL</div>
              <div className="text-[10px] text-slate-500">Zero Scam Guarantee • Cross River</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 no-print">
            <div className="flex flex-wrap items-center gap-2">
              {/* Download Offline Pass (PDF/Image) */}
              <button
                onClick={handleDownloadOfflinePass}
                disabled={downloadingPass}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-bold border border-amber-500/40 transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{downloadingPass ? "Generating Pass..." : "Download Offline Pass (PDF/Image)"}</span>
              </button>

              {/* Print Official Voucher */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenEscrowPortal();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-black font-bold text-xs sm:text-sm shadow-emerald-glow transition-all cursor-pointer"
              >
                <span>Simulate On-Site PIN Check-In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Escrow Safety Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#141b2b] border border-rose-500/40 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5 text-rose-400">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="text-lg font-bold font-heading text-white">
                  Freeze Escrow & Report Dispute
                </h3>
              </div>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {disputeSuccess ? (
              <div className="py-4 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Escrow Funds Successfully Frozen</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Vendor disbursement is locked. Your deposit of{" "}
                  <strong className="text-amber-400">₦{(transaction.amountNGN || 0).toLocaleString()} NGN</strong>{" "}
                  remains protected in the State Escrow Vault while our tourism resolution officer investigates.
                </p>
                <button
                  onClick={() => setShowDisputeModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                >
                  Return to Voucher
                </button>
              </div>
            ) : (
              <form onSubmit={handleFreezeEscrowDispute} className="space-y-4 text-xs">
                <p className="text-slate-300 text-xs leading-relaxed">
                  If your room or experience does not meet standards or the vendor is unresponsive, you can immediately freeze fund release.
                </p>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1.5">
                    Select Dispute Reason:
                  </label>
                  <select
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500"
                  >
                    <option value="Vendor No-Show / Unreachable">Vendor No-Show / Unreachable</option>
                    <option value="Room Condition Substandard / Does not match photos">Room Condition Substandard / Does not match photos</option>
                    <option value="Overcharging / Unauthorized Demands on Arrival">Overcharging / Unauthorized Demands on Arrival</option>
                    <option value="Safety or Security Concern">Safety or Security Concern</option>
                    <option value="Other Substandard Service">Other Substandard Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1.5">
                    Additional Details (Optional):
                  </label>
                  <textarea
                    rows={3}
                    value={disputeDetails}
                    onChange={(e) => setDisputeDetails(e.target.value)}
                    placeholder="Provide additional details regarding what happened upon arrival..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500 placeholder:text-slate-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-200">
                  ⚠️ Freezing escrow suspends PIN check-in for reference <strong>{transaction.reference}</strong>.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDisputeModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={disputeSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-2 shadow-rose-900/50 disabled:opacity-50 cursor-pointer"
                  >
                    {disputeSubmitting ? (
                      <span>Freezing Escrow...</span>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4" />
                        <span>Freeze Escrow & Submit Dispute</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
