"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { DecorSection, HeaderDecor } from "@/components/decor/section-decor";
import { PremiumButton } from "@/components/ui/premium-button";
import { staggerContainer, fadeUp, cardHover, viewportOnce } from "@/components/ui/motion-primitives";
import { ArrowUpRight } from "@phosphor-icons/react";

const SHOWCASE = [
  {
    couple: "Priya & Arjun",
    plan: "Royal",
    theme: "Emerald Noir",
    desc: "Udaipur palace wedding with gold envelope reveal and bilingual storytelling.",
    gradient: "from-[#e8f0ed] to-[#d4e4de]",
    accent: "text-primary",
    preview: "/preview/emerald-noir",
  },
  {
    couple: "Sneha & Rahul",
    plan: "Classic",
    theme: "Royal Elegance",
    desc: "Traditional grandeur with curtain reveal, shehnai music, and multi-event RSVP.",
    gradient: "from-[#faf7f0] to-[#f0e8d8]",
    accent: "text-stone-800",
    preview: "/preview/royal-elegance",
  },
  {
    couple: "Kavya & Mohit",
    plan: "Classic",
    theme: "Modern Minimal",
    desc: "Editorial typography for a contemporary destination wedding in Goa.",
    gradient: "from-stone-50 to-stone-100",
    accent: "text-stone-800",
    preview: "/preview/modern-minimal",
  },
  {
    couple: "Ananya & Vikram",
    plan: "Royal",
    theme: "Emerald Noir",
    desc: "Three-day celebration with Sangeet, Wedding, and Reception RSVPs tracked live.",
    gradient: "from-[#edf2f0] to-[#dce8e3]",
    accent: "text-primary",
    preview: "/preview/emerald-noir",
  },
];

export function ShowcaseSection() {
  return (
    <DecorSection preset="showcase" className="section-padding bg-[#FCFBF7]">
      <div className="page-container">
        <SectionHeader
          eyebrow="Real invitations"
          title="Real weddings, one-of-a-kind invitations"
          subtitle="Tap any card to see the full interactive invitation."
        />
        <HeaderDecor preset="showcase" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {SHOWCASE.map((item) => (
            <motion.div key={item.couple} variants={fadeUp}>
              <Link href={item.preview}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="group rounded-2xl border border-black/[0.06] bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-accent-gold/20 transition-all"
                >
                  <div className={`relative aspect-[16/9] bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <span className={`font-serif text-3xl ${item.accent}`}>
                      {item.couple}
                    </span>
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="text-[9px] uppercase font-bold bg-white/90 text-stone-600 px-2 py-0.5 rounded-full">Real wedding</span>
                      <span className="text-[9px] uppercase font-bold bg-accent-gold/90 text-white px-2 py-0.5 rounded-full">{item.plan}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-wider text-accent-gold font-bold">{item.theme}</span>
                    <p className="text-sm text-stone-500 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link href="/templates">
            <PremiumButton>Start My Invitation</PremiumButton>
          </Link>
        </div>
      </div>
    </DecorSection>
  );
}
