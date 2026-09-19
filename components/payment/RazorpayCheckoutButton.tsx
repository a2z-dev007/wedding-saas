"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkle,
  LockOpen,
  CheckCircle,
  ShieldCheck,
  Spinner,
  ShareNetwork,
  House,
  ArrowSquareOut,
  X,
} from "@phosphor-icons/react";
import confetti from "canvas-confetti";

interface RazorpayCheckoutButtonProps {
  invitationId: string;
  slug?: string;
  templateId?: string;
  amount?: number; // e.g. 1499
  amountPaise?: number; // e.g. 149900
  brideName?: string;
  groomName?: string;
  onSuccess?: (liveUrl: string) => void;
  className?: string;
  buttonText?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayCheckoutButton({
  invitationId,
  slug,
  templateId = "kitab-e-nikah",
  amount,
  amountPaise,
  brideName = "Bride",
  groomName = "Groom",
  onSuccess,
  className = "",
  buttonText = "Unlock Permanent Live Website · ₹1,499",
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmailPromptOpen, setIsEmailPromptOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [successData, setSuccessData] = useState<{
    liveUrl: string;
    email?: string;
    slug?: string;
  } | null>(null);

  const finalAmount = amount || (amountPaise ? Math.floor(amountPaise / 100) : 1499);

  // Load Razorpay SDK script dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleInitialClick = () => {
    const existingEmail = typeof window !== "undefined" ? localStorage.getItem("unfold_user_email") || "" : "";
    if (existingEmail && existingEmail.includes("@")) {
      setCustomerEmail(existingEmail);
      startPayment(existingEmail, customerPhone);
    } else {
      setIsEmailPromptOpen(true);
    }
  };

  const startPayment = async (payerEmail: string, payerPhone?: string) => {
    try {
      setIsEmailPromptOpen(false);
      setLoading(true);

      // 1. Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Failed to load Razorpay payment gateway. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // 2. Create order on server
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId,
          templateId,
          amount: finalAmount,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.orderId) {
        throw new Error(orderData.error || "Failed to initiate payment order");
      }

      // 3. Configure Razorpay checkout options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Unfold Wedding Invitation",
        description: `Permanent Live Link & RSVPs for ${brideName} & ${groomName}`,
        order_id: orderData.orderId,
        prefill: {
          name: `${brideName} & ${groomName}`,
          email: payerEmail || "",
          contact: payerPhone || "",
        },
        notes: {
          invitationId,
          slug: slug || "",
          couple: `${brideName} & ${groomName}`,
          email: payerEmail || "",
        },
        theme: {
          color: "#082F27",
        },
        handler: async function (response: any) {
          try {
            // 4. Verify payment on server with auto-account link
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id || orderData.orderId,
                razorpayPaymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
                razorpaySignature: response.razorpay_signature || "mock_signature",
                invitationId,
                customerEmail: payerEmail,
                customerPhone: payerPhone,
                customerName: `${brideName} & ${groomName}`,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setIsSuccess(true);
              const userEmail = verifyData.user?.email || payerEmail || "";
              
              setSuccessData({
                liveUrl: verifyData.liveUrl || `/${slug || invitationId}`,
                email: userEmail,
                slug: slug || verifyData.invitation?.slug,
              });

              // Save to client localStorage for instant dashboard sync
              if (typeof window !== "undefined") {
                try {
                  if (userEmail) localStorage.setItem("unfold_user_email", userEmail);
                  const storedInvites = localStorage.getItem("unfold_active_invitations");
                  const currentList = storedInvites ? JSON.parse(storedInvites) : [];
                  const newInvite = {
                    id: invitationId,
                    slug: slug || verifyData.invitation?.slug,
                    brideName,
                    groomName,
                    templateId,
                    isPublished: true,
                    weddingDate: new Date().toISOString(),
                  };
                  const filtered = currentList.filter((it: any) => it.id !== invitationId && it.slug !== slug);
                  localStorage.setItem("unfold_active_invitations", JSON.stringify([newInvite, ...filtered]));
                } catch (_) {}
              }

              try {
                confetti({
                  particleCount: 140,
                  spread: 100,
                  origin: { y: 0.5 },
                  colors: ["#D4AF37", "#10B981", "#FEF0C7", "#991B1B", "#FFFFFF"],
                });
              } catch (_) {}

              if (onSuccess) {
                onSuccess(verifyData.liveUrl);
              }
            } else {
              alert(verifyData.error || "Payment verification failed.");
            }
          } catch (err: any) {
            console.error("Verification error:", err);
            alert("Error confirming payment. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // 5. Open Razorpay modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      alert(err.message || "Failed to start payment.");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleInitialClick}
        disabled={loading || isSuccess}
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-serif font-bold tracking-wide transition-all shadow-lg active:scale-95 disabled:opacity-75 disabled:pointer-events-none ${
          isSuccess
            ? "bg-emerald-600 text-white shadow-emerald-500/25"
            : "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B89730] text-[#1B1202] hover:brightness-105 shadow-amber-500/30"
        } ${className}`}
      >
        {loading ? (
          <>
            <Spinner className="animate-spin text-current" size={18} />
            <span>Securing Payment...</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle size={18} weight="fill" />
            <span>Payment Verified · Unlocked!</span>
          </>
        ) : (
          <>
            <LockOpen size={18} weight="bold" />
            <span>{buttonText}</span>
            <Sparkle size={16} weight="fill" />
          </>
        )}
      </button>

      {/* Pre-Payment Account Email Prompt Modal */}
      {isEmailPromptOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in pointer-events-auto">
          <div className="relative w-full max-w-md bg-[#FCFBF7] text-[#1A1A1A] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-up">
            <button
              onClick={() => setIsEmailPromptOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="h-12 w-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300/80 flex items-center justify-center text-amber-700">
                <Sparkle size={24} weight="fill" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Link Your Wedding Dashboard
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Enter your email address so you can manage RSVPs, edit ceremony details, and receive your receipt.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!customerEmail || !customerEmail.includes("@")) {
                  alert("Please enter a valid email address.");
                  return;
                }
                startPayment(customerEmail, customerPhone);
              }}
              className="space-y-4 pt-1"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. diya.shaan@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-[#082F27] focus:ring-1 focus:ring-[#082F27]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-[#082F27] focus:ring-1 focus:ring-[#082F27]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B89730] text-[#1B1202] font-serif font-bold text-sm transition-all shadow-lg hover:brightness-105 active:scale-95"
              >
                <span>Continue to Pay ₹{finalAmount}</span>
                <Sparkle size={16} weight="fill" />
              </button>

              <p className="text-[11px] text-center text-stone-400">
                🔒 256-Bit SSL Encrypted Payment via Razorpay UPI &amp; Cards
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Post-Purchase Success & Auto-Link Modal */}
      {successData && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in pointer-events-auto">
          <div className="relative w-full max-w-md bg-[#FCFBF7] text-[#1A1A1A] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-scale-up">
            <button
              onClick={() => setSuccessData(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircle size={36} weight="fill" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-700 bg-amber-100/70 border border-amber-300/60 px-3 py-0.5 rounded-full">
                🎉 Lifetime Access Active
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Your Invitation is Live!
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                All watermark badges and demo timers are permanently removed. Your guests can now view and RSVP anytime.
              </p>
            </div>

            {/* Account Auto-Link Confirmation Box */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-left text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <ShieldCheck size={16} weight="fill" className="text-amber-700" />
                <span>Dashboard Account Connected</span>
              </div>
              <p className="text-[11px] text-amber-900">
                Linked to your payment email. You can manage RSVPs, change timings, or download guest lists anytime.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={successData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#082F27] text-white hover:bg-[#0C4337] font-semibold text-xs transition-all shadow-md"
              >
                <span>View Live Invitation</span>
                <ArrowSquareOut size={16} />
              </a>

              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs transition-all"
              >
                <House size={16} />
                <span>Go to My Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

