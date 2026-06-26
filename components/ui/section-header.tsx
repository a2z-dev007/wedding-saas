"use client";

import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "./motion-primitives";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={`max-w-2xl mb-12 md:mb-14 ${alignClass} ${className}`}
    >
      {eyebrow && (
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-gold block mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-[#1A1A1A] leading-[1.12]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-stone-500 mt-3 leading-relaxed max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
