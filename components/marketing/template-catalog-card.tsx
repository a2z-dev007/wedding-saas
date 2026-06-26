"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Eye } from "@phosphor-icons/react";
import { MiniPhoneMockup } from "@/components/marketing/mini-phone-mockup";
import { cardHover } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

export type TemplateTag = "Best Seller" | "New" | "Exclusive";

export type TemplateCatalogItem = {
  id: string;
  name: string;
  description: string;
  tag: TemplateTag;
  gradient: string;
  leftScreen: "hero" | "curtain";
  accentClass?: string;
};

const TAG_STYLES: Record<TemplateTag, string> = {
  "Best Seller": "bg-primary text-white",
  New: "bg-[#2d6a6a] text-white",
  Exclusive: "bg-accent-gold text-white",
};

export function TemplateCatalogCard({ template }: { template: TemplateCatalogItem }) {
  return (
    <Link href={`/preview/${template.id}`} className="block h-full">
      <motion.article
        initial="rest"
        whileHover="hover"
        variants={cardHover}
        className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      >
        {/* Visual area */}
        <div className="relative flex aspect-[4/3.2] items-end justify-center gap-2 bg-[#ebe8e2] px-4 pb-5 pt-8 sm:gap-3 sm:px-5">
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide",
              TAG_STYLES[template.tag]
            )}
          >
            {template.tag}
          </span>

          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] bg-white/90 text-stone-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            <Eye size={15} weight="light" />
          </span>

          <MiniPhoneMockup
            variant={template.leftScreen}
            templateName={template.name}
            accentClass={template.accentClass}
            bgGradient={template.gradient}
            className="-rotate-6 translate-y-1"
          />
          <MiniPhoneMockup
            variant="details"
            templateName={template.name}
            bgGradient="from-stone-50 to-stone-100"
            className="rotate-3 translate-y-3"
          />
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col bg-white p-5">
          <h3 className="font-serif text-xl text-[#1A1A1A]">{template.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-500 line-clamp-2">
            {template.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-accent-gold">
            View theme
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
