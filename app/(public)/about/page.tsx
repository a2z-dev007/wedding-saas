"use client";

import { motion } from "motion/react";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PageHero } from "@/components/ui/page-hero";
import { PremiumButton } from "@/components/ui/premium-button";
import { staggerContainer, fadeUp, viewportOnce } from "@/components/ui/motion-primitives";
import { Sparkle } from "@phosphor-icons/react";

const VALUES = [
  { icon: Sparkle, title: "Sustainable & Instant", desc: "No printing delays or shipping fees. Share with hundreds of guests via WhatsApp instantly." },
  { icon: Sparkle, title: "High-Interaction Tech", desc: "3D doors, scratch reveals, responsive maps — we craft haptic moments." },
  { icon: Sparkle, title: "Built for India", desc: "Multi-event RSVPs, UPI payments, Hindi/English support, WhatsApp-first sharing." },
  { icon: Sparkle, title: "Couple-First Support", desc: "Unlimited edits until your wedding day. Your invitation evolves as your plans do." },
];

export default function AboutPage() {
  return (
    <div className="py-24">
      <div className="page-container max-w-4xl">
        <PageHero eyebrow="Our Story" title="Modern craft, heritage roots" subtitle="Your wedding invitation should be as magical as the event itself." />

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="mb-12">
          <DoubleBezelCard>
            <h2 className="text-xl font-serif text-primary mb-4">Reimagining Wedding Invites</h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-4">
              At Unfold, we believe your wedding invitation should be as magical as the event itself. Paper cards are slow, expensive, and wasteful. PDF alternatives are static and lack emotion.
            </p>
            <p className="text-sm text-stone-500 leading-relaxed">
              We built Unfold to bridge this gap — premium web design meets cultural South Asian motifs for cinematic invitations on every guest&apos;s phone.
            </p>
          </DoubleBezelCard>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <motion.div key={v.title} variants={fadeUp}>
              <DoubleBezelCard className="h-full">
                <div className="h-10 w-10 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-3">
                  <v.icon className="h-5 w-5 text-accent-gold" weight="light" />
                </div>
                <h3 className="font-serif text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </DoubleBezelCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
