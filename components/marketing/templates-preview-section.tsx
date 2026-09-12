"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { DecorSection, HeaderDecor } from "@/components/decor/section-decor";
import { SectionHeader } from "@/components/ui/section-header";
import { PremiumButton } from "@/components/ui/premium-button";
import { TemplateCatalogCard, type TemplateCatalogItem } from "@/components/marketing/template-catalog-card";
import { WhatsappShareDemo } from "@/components/marketing/whatsapp-share-demo";
import { staggerContainer, fadeUp, viewportOnce } from "@/components/ui/motion-primitives";
import { TEMPLATE_META } from "@/lib/template-meta";

const FILTERS = ["All", "Best Sellers", "New"] as const;

const CATALOG: TemplateCatalogItem[] = [
  {
    id: TEMPLATE_META["crimson-royale"].id,
    name: TEMPLATE_META["crimson-royale"].name,
    description: TEMPLATE_META["crimson-royale"].description,
    tag: "Exclusive",
    gradient: TEMPLATE_META["crimson-royale"].gradient,
    leftScreen: "hero",
    accentClass: "text-rose-700",
  },
  {
    id: TEMPLATE_META["royal-lotus"].id,
    name: TEMPLATE_META["royal-lotus"].name,
    description: TEMPLATE_META["royal-lotus"].description,
    tag: "Best Seller",
    gradient: TEMPLATE_META["royal-lotus"].gradient,
    leftScreen: "curtain",
    accentClass: "text-amber-700",
  },
  {
    id: TEMPLATE_META["emerald-noir"].id,
    name: TEMPLATE_META["emerald-noir"].name,
    description: TEMPLATE_META["emerald-noir"].description,
    tag: "Best Seller",
    gradient: TEMPLATE_META["emerald-noir"].gradient,
    leftScreen: "hero",
    accentClass: "text-accent-gold",
  },
  {
    id: TEMPLATE_META["royal-elegance"].id,
    name: TEMPLATE_META["royal-elegance"].name,
    description: TEMPLATE_META["royal-elegance"].description,
    tag: "Best Seller",
    gradient: TEMPLATE_META["royal-elegance"].gradient,
    leftScreen: "curtain",
    accentClass: "text-accent-gold",
  },
  {
    id: TEMPLATE_META["modern-minimal"].id,
    name: TEMPLATE_META["modern-minimal"].name,
    description: TEMPLATE_META["modern-minimal"].description,
    tag: "New",
    gradient: TEMPLATE_META["modern-minimal"].gradient,
    leftScreen: "hero",
    accentClass: "text-stone-600",
  },
];

export function TemplatesPreviewSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = CATALOG.filter((t) => {
    if (filter === "All") return true;
    if (filter === "Best Sellers") return t.tag === "Best Seller";
    if (filter === "New") return t.tag === "New";
    return true;
  });

  return (
    <DecorSection preset="templates" className="section-padding bg-[#FCFBF7]">
      <div className="page-container">
        <SectionHeader
          eyebrow="Catalogue"
          title="Explore our exclusive designs"
          subtitle="Each theme is designed to move people. Discover the one that tells your story."
        />
        <HeaderDecor preset="templates" />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                filter === f
                  ? "bg-primary text-white shadow-sm"
                  : "border border-black/[0.06] bg-white text-stone-500 hover:border-accent-gold/30 hover:text-stone-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {filtered.map((tpl) => (
            <motion.div key={tpl.id} variants={fadeUp} className="h-full">
              <TemplateCatalogCard template={tpl} />
            </motion.div>
          ))}
        </motion.div>

        <WhatsappShareDemo />

        <div className="mt-14 flex justify-center">
          <Link href="/templates" className="inline-flex">
            <PremiumButton>Create my invitation · Start from ₹1,199</PremiumButton>
          </Link>
        </div>
      </div>
    </DecorSection>
  );
}
