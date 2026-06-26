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
import { EnvelopeSimple, ShieldCheck, Sparkle } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await signIn("email", { email, redirect: false, callbackUrl: "/dashboard" });
      if (res?.ok) setIsSent(true);
      else alert("Verification failed. Try the Developer Sandbox Bypass below.");
    } catch {
      alert("SMTP connection failed. Use the Developer Sandbox Bypass below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF7] text-[#1A1A1A]">
      <GlassNav />
      <main className="flex-grow flex items-center justify-center pt-28 px-6 pb-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full max-w-md">
          <DoubleBezelCard className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1 text-accent-gold mb-3">
                <Sparkle className="h-4 w-4" weight="fill" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Secure Access</span>
              </div>
              <h1 className="text-2xl font-serif">Access your dashboard</h1>
              <p className="text-sm text-stone-500 mt-2">Passwordless magic link login.</p>
            </div>
            {isSent ? (
              <div className="text-center py-4">
                <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                  <ShieldCheck className="h-6 w-6" weight="bold" />
                </div>
                <p className="text-sm text-stone-500">Sign-in link sent to <strong>{email}</strong></p>
              </div>
            ) : (
              <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase font-bold text-stone-400 mb-2">Email</label>
                  <div className="relative">
                    <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required className="w-full bg-stone-50 border border-black/[0.06] rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-accent-gold/40" />
                  </div>
                </div>
                <PremiumButton type="submit" disabled={isSubmitting} className="w-full justify-center">{isSubmitting ? "Sending..." : "Send Magic Link"}</PremiumButton>
              </form>
            )}
            <div className="mt-6 pt-5 border-t border-stone-100 text-center">
              <button onClick={() => router.push("/dashboard")} className="text-xs text-accent-gold font-semibold hover:underline">Developer bypass → Dashboard</button>
            </div>
          </DoubleBezelCard>
          <p className="text-center text-xs text-stone-400 mt-5">
            New here? <Link href="/templates" className="text-accent-gold font-semibold hover:underline">Create your invitation</Link>
          </p>
        </motion.div>
      </main>
      <PremiumFooter />
    </div>
  );
}
