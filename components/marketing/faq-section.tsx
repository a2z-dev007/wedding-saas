"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { DecorSection, HeaderDecor } from "@/components/decor/section-decor";
import { PremiumButton } from "@/components/ui/premium-button";
import { fadeUp, viewportOnce, EASE_FLUID } from "@/components/ui/motion-primitives";
import { CaretDown, Heart } from "@phosphor-icons/react";

const FAQS = [
  { q: "How does the digital invitation work?", a: "Select a template, pay once, fill in your details, and your live URL is instantly generated. Share via WhatsApp, email, or social." },
  { q: "Can I edit after creating?", a: "Yes — log into your dashboard and update venues, schedule, photos anytime. Edits go live instantly." },
  { q: "How many guests can view it?", a: "Unlimited. No extra fees or view limits." },
  { q: "Payment methods?", a: "Credit/debit cards, Netbanking, and UPI via Razorpay." },
  { q: "Refund policy?", a: "100% money-back within 7 days if unsatisfied before generating your live link." },
];

export function FaqSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <DecorSection preset="minimal" className="section-padding bg-white">
      <div className="page-container max-w-2xl">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <HeaderDecor preset="minimal" />

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              className="rounded-xl border border-black/[0.06] bg-[#FCFBF7] overflow-hidden"
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white transition-colors"
              >
                <span className="text-sm font-medium text-[#1A1A1A] pr-4">{faq.q}</span>
                <CaretDown size={16} className={`text-accent-gold shrink-0 transition-transform ${active === i ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_FLUID }}
                  >
                    <div className="px-4 pb-4 text-sm text-stone-500 leading-relaxed border-t border-black/[0.04] pt-3 mx-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </DecorSection>
  );
}

export function CtaSection() {
  return (
    <DecorSection preset="cta" className="section-padding bg-accent-gold-light/30 border-t border-accent-gold/10">
      <div className="page-container max-w-2xl text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          <div className="h-12 w-12 rounded-full border border-accent-gold/25 bg-white flex items-center justify-center text-accent-gold mx-auto mb-6">
            <Heart size={22} weight="light" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] leading-tight mb-4">
            Ready to create your <span className="italic text-accent-gold">perfect invitation?</span>
          </h2>
          <p className="text-sm text-stone-500 mb-8 max-w-md mx-auto">
            Join hundreds of couples who chose elegance and interactivity for their special day.
          </p>
          <div className="flex justify-center">
            <Link href="/templates">
              <PremiumButton>Start Creating Your Invitation</PremiumButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </DecorSection>
  );
}
