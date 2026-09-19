"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { GlassNav } from "@/components/ui/glass-nav";
import { PremiumFooter } from "@/components/ui/premium-footer";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { fadeUp } from "@/components/ui/motion-primitives";
import { EnvelopeSimple, Key, ShieldCheck, Sparkle, LockOpen, ArrowRight } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage(res.error || "Invalid credentials. Please check your details.");
      } else if (res?.ok) {
        if (typeof window !== "undefined") {
          localStorage.setItem("unfold_user_email", email.trim().toLowerCase());
        }
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await signIn("email", {
        email: email.trim().toLowerCase(),
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res?.ok) {
        setIsMagicLinkSent(true);
      } else {
        setErrorMessage("Magic link failed to send. Try Email + Password login or Developer bypass.");
      }
    } catch {
      setErrorMessage("SMTP connection failed. Try Email + Password or Developer bypass.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF7] text-[#1A1A1A]">
      <GlassNav />
      <main className="flex-grow flex items-center justify-center pt-28 px-4 sm:px-6 pb-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full max-w-md">
          <DoubleBezelCard className="p-6 sm:p-8 bg-white border-stone-200/60 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 text-amber-600 mb-2">
                <Sparkle className="h-4 w-4" weight="fill" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Dashboard Access</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">Welcome Back</h1>
              <p className="text-xs text-stone-500 mt-1.5">
                Manage your wedding website, guest RSVPs, and live timings.
              </p>
            </div>

            {/* Google 1-Click Login */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-stone-250 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google (1-Click)</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-stone-200 w-full"></div>
                <span className="bg-white px-3 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Or Log In with
                </span>
                <div className="border-t border-stone-200 w-full"></div>
              </div>
            </div>

            {/* Auth Mode Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => { setAuthMode("password"); setErrorMessage(""); }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === "password"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                Email &amp; Password
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode("magic"); setErrorMessage(""); }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === "magic"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                Passwordless Magic Link
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
                {errorMessage}
              </div>
            )}

            {authMode === "password" ? (
              <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeSimple className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      required
                      className="w-full bg-stone-50 border border-stone-250 rounded-xl pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] uppercase font-bold text-stone-400">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-stone-50 border border-stone-250 rounded-xl pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <PremiumButton type="submit" disabled={isSubmitting} className="w-full justify-center">
                  {isSubmitting ? "Logging In..." : "Sign In to Dashboard"}
                </PremiumButton>
              </form>
            ) : isMagicLinkSent ? (
              <div className="text-center py-4 space-y-2">
                <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto">
                  <ShieldCheck className="h-6 w-6" weight="bold" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">Check Your Inbox</h4>
                <p className="text-xs text-stone-500">
                  We sent a magic sign-in link to <strong>{email}</strong>. Click it to log in instantly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMagicLinkSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeSimple className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      required
                      className="w-full bg-stone-50 border border-stone-250 rounded-xl pl-10 pr-3.5 py-2.5 text-xs outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
                <PremiumButton type="submit" disabled={isSubmitting} className="w-full justify-center">
                  {isSubmitting ? "Sending Link..." : "Send Magic Link"}
                </PremiumButton>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Don't have an account?</span>
              <Link href="/signup" className="text-amber-700 font-bold hover:underline">
                Create Account →
              </Link>
            </div>

            <div className="mt-3 text-center">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-[11px] text-stone-400 font-medium hover:text-stone-600 hover:underline"
              >
                Developer sandbox bypass → Dashboard
              </button>
            </div>
          </DoubleBezelCard>
        </motion.div>
      </main>
      <PremiumFooter />
    </div>
  );
}
