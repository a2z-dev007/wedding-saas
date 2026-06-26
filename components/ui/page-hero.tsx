"use client";

import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "./motion-primitives";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="text-center mb-16 md:mb-20 pt-8"
    >
      {eyebrow && (
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-gold block mb-3">
          {eyebrow}
        </span>
      )}
      <h1 className="font-serif text-4xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-stone-500 mt-4 max-w-[50ch] mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
