"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";

type FloralProps = {
  className?: string;
  opacity?: number;
  style?: CSSProperties;
};

export function RoseCluster({ className = "", opacity = 0.35, style }: FloralProps) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, ...style }}
      aria-hidden
    >
      <circle cx="60" cy="52" r="14" fill="#E8D5C4" />
      <circle cx="48" cy="44" r="11" fill="#F0E0D0" />
      <circle cx="72" cy="44" r="11" fill="#F0E0D0" />
      <circle cx="52" cy="58" r="10" fill="#EDD5C0" />
      <circle cx="68" cy="58" r="10" fill="#EDD5C0" />
      <circle cx="60" cy="48" r="6" fill="#B89730" opacity="0.5" />
      <path d="M60 66 Q58 95 55 120" stroke="#6B8F71" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 85 Q40 80 32 72" stroke="#6B8F71" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M65 90 Q82 88 90 78" stroke="#6B8F71" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="32" cy="70" rx="10" ry="6" fill="#A8C5A0" opacity="0.6" transform="rotate(-30 32 70)" />
      <ellipse cx="90" cy="76" rx="10" ry="6" fill="#A8C5A0" opacity="0.6" transform="rotate(25 90 76)" />
    </svg>
  );
}

export function LeafSprig({ className = "", opacity = 0.4, style }: FloralProps) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      className={`pointer-events-none select-none animate-leaf-sway ${className}`}
      style={{ opacity, ...style }}
      aria-hidden
    >
      <path d="M40 95 Q38 60 40 20" stroke="#7A9E6E" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 70 Q20 65 12 50 Q28 58 40 62" fill="#B5D4A8" opacity="0.7" />
      <path d="M40 50 Q62 42 70 28 Q52 40 40 44" fill="#A8C99A" opacity="0.7" />
      <path d="M40 35 Q18 28 10 15 Q26 24 40 30" fill="#C5DEB8" opacity="0.6" />
      <path d="M40 82 Q58 78 68 68 Q50 74 40 76" fill="#A8C99A" opacity="0.5" />
    </svg>
  );
}

export function PetalDrop({ className = "", opacity = 0.5, style }: FloralProps) {
  return (
    <svg
      viewBox="0 0 24 32"
      fill="none"
      className={`pointer-events-none select-none animate-petal-float ${className}`}
      style={{ opacity, ...style }}
      aria-hidden
    >
      <ellipse cx="12" cy="16" rx="8" ry="14" fill="#E8C4C4" transform="rotate(-15 12 16)" />
      <ellipse cx="12" cy="16" rx="6" ry="10" fill="#F5DCDC" transform="rotate(10 12 16)" />
    </svg>
  );
}

export function GoldFlourish({ className = "", opacity = 0.25 }: FloralProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <path d="M10 50 Q30 20 50 50 Q70 80 90 50" stroke="#B89730" strokeWidth="1" fill="none" />
      <path d="M10 50 Q30 80 50 50 Q70 20 90 50" stroke="#B89730" strokeWidth="0.5" fill="none" opacity="0.5" />
      <circle cx="50" cy="50" r="3" fill="#B89730" opacity="0.6" />
    </svg>
  );
}

type SectionFloralProps = {
  variant?: "corners" | "scattered" | "minimal";
  className?: string;
};

export function SectionFloral({ variant = "corners", className = "" }: SectionFloralProps) {
  if (variant === "minimal") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
        <PetalDrop className="absolute top-[8%] right-[6%] w-5 h-7" opacity={0.35} />
        <LeafSprig className="absolute bottom-[10%] left-[4%] w-12 h-16" opacity={0.25} />
      </div>
    );
  }

  if (variant === "scattered") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
        <RoseCluster className="absolute -top-4 -left-6 w-20 h-24 animate-petal-float" opacity={0.2} />
        <LeafSprig className="absolute top-[20%] -right-4 w-14 h-18" opacity={0.22} />
        <PetalDrop className="absolute bottom-[25%] left-[8%] w-6 h-8" opacity={0.3} />
        <PetalDrop className="absolute top-[40%] right-[12%] w-4 h-6" opacity={0.25} style={{ animationDelay: "1s" } as CSSProperties} />
        <GoldFlourish className="absolute bottom-[15%] right-[20%] w-16 h-16" />
        <LeafSprig className="absolute bottom-0 left-[30%] w-10 h-14 rotate-45" opacity={0.2} />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <RoseCluster className="absolute -top-8 -left-10 w-28 h-32" opacity={0.18} />
      <RoseCluster className="absolute -top-6 -right-8 w-24 h-28 scale-x-[-1]" opacity={0.15} />
      <LeafSprig className="absolute bottom-4 -left-6 w-16 h-20 -rotate-12" opacity={0.22} />
      <LeafSprig className="absolute bottom-6 -right-4 w-14 h-18 rotate-12 scale-x-[-1]" opacity={0.2} />
      <PetalDrop className="absolute top-[30%] left-[5%] w-5 h-7" opacity={0.28} />
      <PetalDrop className="absolute top-[20%] right-[8%] w-4 h-6" opacity={0.22} />
    </div>
  );
}

export function HeroFloralDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <RoseCluster className="absolute top-24 left-[3%] w-24 h-28 hidden lg:block animate-petal-float" opacity={0.22} />
      <RoseCluster className="absolute top-32 right-[4%] w-20 h-24 hidden lg:block scale-x-[-1] animate-petal-float" opacity={0.18} style={{ animationDelay: "1.5s" } as CSSProperties} />
      <LeafSprig className="absolute top-[45%] left-[1%] w-16 h-20 hidden md:block" opacity={0.2} />
      <LeafSprig className="absolute top-[50%] right-[2%] w-14 h-18 hidden md:block scale-x-[-1]" opacity={0.18} />
      <PetalDrop className="absolute top-[38%] left-[12%] w-5 h-7 hidden sm:block" opacity={0.3} />
      <PetalDrop className="absolute top-[42%] right-[10%] w-4 h-6 hidden sm:block" opacity={0.25} />
      <PetalDrop className="absolute bottom-[28%] left-[18%] w-3 h-5" opacity={0.2} />
      <PetalDrop className="absolute bottom-[32%] right-[15%] w-4 h-6" opacity={0.22} />
      <GoldFlourish className="absolute top-[28%] left-[20%] w-20 h-20 hidden xl:block" opacity={0.15} />
      <GoldFlourish className="absolute top-[30%] right-[18%] w-16 h-16 hidden xl:block scale-x-[-1]" opacity={0.12} />
    </div>
  );
}
