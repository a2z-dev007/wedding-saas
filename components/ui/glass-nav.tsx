"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { PremiumButton } from "./premium-button";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/templates", label: "Templates" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function GlassNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-4 md:top-5 left-1/2 z-50 w-[94%] max-w-5xl -translate-x-1/2 rounded-full border border-black/[0.06] px-4 md:px-5 py-2.5 backdrop-blur-md transition-shadow duration-300 flex items-center justify-between bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)]" : ""
        }`}
      >
        <Link href="/" className="text-xl font-serif text-primary lowercase tracking-tight">
          unfold
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-stone-600 hover:text-accent-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/dashboard" className="text-xs font-medium text-stone-600 hover:text-accent-gold transition-colors">
                Dashboard
              </Link>
              <button onClick={() => signOut()} className="text-xs font-medium text-stone-600 hover:text-accent-gold transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-xs font-medium text-stone-600 hover:text-accent-gold transition-colors">
              Login
            </Link>
          )}
        </div>

        <div className="hidden lg:block">
          <Link href="/templates">
            <PremiumButton className="text-xs py-1.5 pl-5">Get Started</PremiumButton>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-1.5 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-20 left-4 right-4 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-2xl flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium py-3 border-b border-black/[0.04] text-stone-700 hover:text-accent-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-base font-medium py-3 border-b border-black/[0.04]">
                    Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setIsOpen(false); }} className="text-left text-base font-medium py-3">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-base font-medium py-3">
                  Login
                </Link>
              )}
              <Link href="/templates" onClick={() => setIsOpen(false)} className="mt-4">
                <PremiumButton className="w-full justify-center">Get Started</PremiumButton>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
