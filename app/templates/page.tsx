"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { GlassNav } from "@/components/ui/glass-nav";
import { PremiumFooter } from "@/components/ui/premium-footer";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { PageHero } from "@/components/ui/page-hero";
import { staggerContainer, fadeUp, cardHover, viewportOnce } from "@/components/ui/motion-primitives";
import { ArrowUpRight } from "@phosphor-icons/react";

const FILTERS = ["All", "Hindu", "Muslim", "Best Sellers", "New"];

const TEMPLATES = [
  { id: "crimson-royale", name: "Crimson Royale", style: "Royal Court", tag: "Trending", religion: ["hindu"], religionLabel: "Hindu", colors: "Crimson Velvet + 24K Gold", opening: "3D Split Gate", desc: "Regal crimson velvet and 24K gold foil aesthetic with royal gate reveal, interactive scratch card, and shehnai background music.", gradient: "from-[#420f18] via-[#7c2c3b] to-[#20050a]" },
  { id: "royal-lotus", name: "Royal Lotus", style: "Royal Heritage", tag: "Best Seller", religion: ["hindu"], religionLabel: "Hindu", colors: "Ivory + 24K Gold + Maroon", opening: "3D Palace Gate", desc: "Grand Rajasthani palace with ivory canvas, 24K gold filigree, crimson accents, and floating lotus petals.", gradient: "from-[#FCF9F2] via-[#F5EFE0] to-[#EBDDC3]" },
  { id: "emerald-noir", name: "Emerald Noir", style: "Luxury Dark", tag: "Best Seller", religion: ["muslim"], religionLabel: "Muslim", colors: "Emerald + Gold", opening: "3D Door Reveal", desc: "Ornate gold details on rich forest green. Ideal for luxury evening celebrations and royal Nikah ceremonies.", gradient: "from-[#e8f0ed] to-[#c5ddd3]" },
  { id: "royal-elegance", name: "Royal Elegance", style: "Classic South Asian", tag: "Best Seller", religion: ["hindu", "muslim", "universal"], religionLabel: "Universal", colors: "Gold + Cream", opening: "Curtain Reveal", desc: "Traditional South Asian grandeur with golden arches and royal accents.", gradient: "from-[#faf7f0] to-[#f0e8d8]" },
  { id: "modern-minimal", name: "Modern Minimal", style: "Contemporary", tag: "New", religion: ["hindu", "muslim", "universal"], religionLabel: "Universal", colors: "White + Black", opening: "Fade & Slide", desc: "Ultra-clean editorial typography with massive whitespace.", gradient: "from-stone-50 to-stone-200" },
];

export default function TemplatesPage() {
  const [filter, setFilter] = useState("All");
  const filtered = TEMPLATES.filter((t) => {
    if (filter === "All") return true;
    if (filter === "Hindu") return t.religion.includes("hindu");
    if (filter === "Muslim") return t.religion.includes("muslim");
    if (filter === "Best Sellers") return t.tag === "Best Seller" || t.tag === "Trending";
    if (filter === "New") return t.tag === "New";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF7] text-[#1A1A1A]">
      <GlassNav />
      <main className="flex-grow pt-28 pb-20">
        <div className="page-container">
          <PageHero eyebrow="Catalogue" title="Select your design" subtitle="Responsive animated invitations with audio, scratch reveals, and RSVP tracking." />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)} 
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  filter === f 
                    ? "bg-primary text-white shadow-sm" 
                    : "bg-white border border-black/[0.06] text-stone-500 hover:border-accent-gold/30 hover:text-stone-700"
                }`}
              >
                {f === "Hindu" ? "🕉️ Hindu Weddings" : f === "Muslim" ? "🌙 Muslim Weddings" : f}
              </button>
            ))}
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tpl) => (
              <motion.div key={tpl.id} variants={fadeUp}>
                <motion.div initial="rest" whileHover="hover" variants={cardHover}>
                  <DoubleBezelCard className="flex flex-col h-full">
                    <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${tpl.gradient} flex items-center justify-center mb-5 relative`}>
                      <span className="font-serif text-2xl text-stone-700">{tpl.name}</span>
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="text-[9px] uppercase font-bold bg-white/90 text-stone-600 px-2.5 py-0.5 rounded-full shadow-sm">{tpl.tag}</span>
                        <span className="text-[9px] uppercase font-bold bg-white/90 text-stone-700 px-2 py-0.5 rounded-full shadow-sm">
                          {tpl.religionLabel === "Hindu" ? "🕉️ Hindu" : tpl.religionLabel === "Muslim" ? "🌙 Muslim" : "✦ Universal"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-accent-gold">{tpl.style}</span>
                    <h3 className="text-xl font-serif mt-1 mb-2">{tpl.name}</h3>
                    <p className="text-sm text-stone-500 mb-4 flex-grow">{tpl.desc}</p>
                    <div className="text-xs text-stone-400 space-y-1 border-t border-stone-100 pt-4 mb-5">
                      <div className="flex justify-between"><span>Colors</span><span className="text-stone-600">{tpl.colors}</span></div>
                      <div className="flex justify-between"><span>Opening</span><span className="text-stone-600">{tpl.opening}</span></div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/preview/${tpl.id}`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-1 border border-black/[0.06] rounded-full py-2.5 text-xs font-semibold text-stone-700 hover:border-accent-gold/30 transition-colors">
                          Preview <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </Link>
                      <Link href={`/dashboard/invitation/new?template=${tpl.id}`} className="flex-1">
                        <PremiumButton className="w-full text-xs justify-center">Select</PremiumButton>
                      </Link>
                    </div>
                  </DoubleBezelCard>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <PremiumFooter />
    </div>
  );
}
