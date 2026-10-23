import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone, 
  Building2, 
  CreditCard, 
  RefreshCw,
  Sparkles,
  Inbox
} from "lucide-react";
import { handleLocalEscrowFallback } from "../utils/api.js";

export default function AdminVendorQueue({ onApprovalSuccess }) {
  const [pendingVendors, setPendingVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchPendingQueue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/vendors/pending");
      const contentType = res.headers.get("content-type");
      let data;
      if (res.ok && contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = handleLocalEscrowFallback("/api/admin/vendors/pending");
      }
      setPendingVendors(Array.isArray(data) ? data : (data?.pendingVendors || []));
    } catch (err) {
      console.warn("Falling back to local escrow engine for admin pending queue:", err);
      const data = handleLocalEscrowFallback("/api/admin/vendors/pending");
      setPendingVendors(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingQueue();
  }, []);

  const handleReview = async (vendorId, action) => {
    setProcessingId(vendorId);
    const targetVendor = pendingVendors.find(v => v.id === vendorId);

    try {
      const res = await fetch(`/api/admin/vendors/${vendorId}/review?action=${action}`, {
        method: "POST"
      });

      let success = false;
      let resultData = null;

      if (res.ok) {
        success = true;
        try {
          resultData = await res.json();
        } catch {}
      } else {
        // Fallback for standalone/local client mode
        const fallbackRes = handleLocalEscrowFallback(
          `/api/admin/vendors/${vendorId}/review?action=${action}`,
          { action },
          "POST"
        );
        if (fallbackRes?.status === "success" || fallbackRes?.success) {
          success = true;
          resultData = fallbackRes;
        }
      }

      if (success) {
        setPendingVendors(prev => prev.filter(v => v.id !== vendorId));
        const actionVerb = action === "approve" ? "approved" : "removed";
        const emailMsg = targetVendor?.email 
          ? `Dispatched official ${action === "approve" ? "approval" : "notice"} email to ${targetVendor.email}.`
          : "Dispatched automated email notice.";
        
        setNotification({
          type: action === "approve" ? "success" : "warning",
          message: `Vendor ${targetVendor?.business_name || vendorId} successfully ${actionVerb}. ${emailMsg}`
        });

        if (action === "approve" && onApprovalSuccess) {
          onApprovalSuccess(resultData);
        }
      } else {
        alert(`Error processing review: ${resultData?.detail || "Action failed"}`);
      }
    } catch (error) {
      console.error("Error processing review:", error);
      alert(`Error processing review: ${error.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Cross River State Clearinghouse Moderation</span>
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-white tracking-tight">
            Pending Merchant Approvals
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming vendor registrations. Approving generates an official State Merchant Code and automatically dispatches the verification email.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold font-mono text-amber-300">
            {pendingVendors.length} In Queue
          </span>
          <button
            onClick={fetchPendingQueue}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
            title="Refresh Queue"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs animate-fadeIn ${
          notification.type === "success" 
            ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200" 
            : "bg-amber-950/60 border-amber-500/40 text-amber-200"
        }`}>
          <div className="flex items-center gap-2.5">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Vendor Queue List */}
      {loading && pendingVendors.length === 0 ? (
        <div className="py-12 text-center text-slate-400 space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-400" />
          <p className="text-sm">Fetching pending applications from state bureau registry...</p>
        </div>
      ) : pendingVendors.length === 0 ? (
        <div className="py-12 text-center rounded-xl bg-slate-950/60 border border-dashed border-slate-800 space-y-3">
          <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Pending Queue Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No pending merchant applications in queue. Incoming vendor onboarding registrations will appear here for administrative verification.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="p-5 bg-slate-800/80 hover:bg-slate-800 rounded-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border border-slate-700 transition"
            >
              <div className="flex items-start gap-4 flex-1">
                {(vendor.imageUrl || vendor.image) && (
                  <img
                    src={vendor.imageUrl || vendor.image}
                    alt={vendor.business_name || vendor.businessName}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-700/80 shadow-md shrink-0 hidden sm:block"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-bold text-lg text-white">
                      {vendor.business_name || vendor.businessName}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {vendor.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700">
                      ID: {vendor.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{vendor.phone}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{vendor.email || "No email provided"}</span>
                    </span>
                    {vendor.bankPayoutDetails && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                        <span>{vendor.bankPayoutDetails}</span>
                      </span>
                    )}
                  </div>

                  {vendor.location && (
                    <p className="text-[11px] text-slate-400">
                      📍 {vendor.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                <button
                  onClick={() => handleReview(vendor.id, "approve")}
                  disabled={processingId === vendor.id}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve &amp; Issue Code</span>
                </button>
                <button
                  onClick={() => handleReview(vendor.id, "remove")}
                  disabled={processingId === vendor.id}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 text-white rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-rose-950/40"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Remove / Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
