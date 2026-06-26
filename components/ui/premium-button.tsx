"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import React from "react";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "royal" | "outline" | "light";
}

export const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ children, className = "", variant = "primary", ...props }, ref) => {
    const isLight = variant === "light";
    const isOutline = variant === "outline";
    const isRoyal = variant === "royal";

    const base =
      "group relative flex items-center justify-between gap-4 rounded-full py-3 pl-6 pr-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98]";

    const variants = {
      light: "bg-white text-primary hover:bg-stone-50 border border-black/[0.06]",
      outline:
        "bg-white/80 text-primary border-2 border-primary/20 hover:border-primary/35 hover:bg-primary/[0.03] shadow-sm",
      primary:
        "btn-gradient-primary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 hover:brightness-[1.03]",
      royal:
        "btn-gradient-royal text-white shadow-md shadow-accent-gold/25 hover:shadow-lg hover:shadow-accent-gold/30 hover:brightness-[1.04]",
    };

    const iconBg = isLight || isOutline ? "bg-primary/5" : "bg-white/15 backdrop-blur-sm";
    const iconColor = isLight || isOutline ? "text-primary" : "text-white";

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {(isRoyal || variant === "primary") && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
            }}
            aria-hidden
          />
        )}
        <span className="relative z-[1]">{children}</span>
        <motion.div
          className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}
          whileHover={{ scale: 1.08, rotate: 45 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          <ArrowUpRight
            weight="light"
            className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] ${iconColor}`}
          />
        </motion.div>
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";
