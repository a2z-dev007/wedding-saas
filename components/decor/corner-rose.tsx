"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { DECOR } from "@/lib/decor-colors";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export function CornerRose({
  position,
  className,
}: {
  position: CornerPosition;
  className?: string;
}) {
  const posClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  }[position];

  const roseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(roseRef.current, {
        rotate: position.includes("right") ? -2 : 2,
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: position.includes("top")
          ? position.includes("left")
            ? "0% 0%"
            : "100% 0%"
          : position.includes("left")
            ? "0% 100%"
            : "100% 100%",
      });
    },
    { scope: roseRef }
  );

  const C = DECOR.champagne;
  const B = DECOR.blush;

  return (
    <div ref={roseRef} className={cn("pointer-events-none absolute opacity-20 z-[1]", posClass, className)}>
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <path d="M0 80 Q30 60 50 70 Q70 80 80 60 Q90 40 110 50 Q130 60 140 40" stroke={C} strokeWidth="1.2" fill="none" />
        <path d="M80 0 Q60 30 70 50 Q80 70 60 80 Q40 90 50 110" stroke={C} strokeWidth="1.2" fill="none" />
        <circle cx="50" cy="70" r="10" fill={B} opacity="0.4" />
        <path d="M50 60 Q54 65 50 70 Q46 65 50 60Z" fill={B} opacity="0.7" />
        <path d="M40 70 Q45 66 50 70 Q45 74 40 70Z" fill={B} opacity="0.6" />
        <path d="M60 70 Q55 66 50 70 Q55 74 60 70Z" fill={B} opacity="0.6" />
        <circle cx="50" cy="70" r="4" fill={B} opacity="0.8" />
        <circle cx="70" cy="50" r="7" fill={C} opacity="0.3" />
        <path d="M70 43 Q73 46 70 50 Q67 46 70 43Z" fill={C} opacity="0.6" />
        <circle cx="70" cy="50" r="3" fill={C} opacity="0.5" />
        <ellipse cx="30" cy="65" rx="8" ry="4" fill={C} opacity="0.25" transform="rotate(-30 30 65)" />
        <ellipse cx="65" cy="85" rx="8" ry="4" fill={C} opacity="0.25" transform="rotate(20 65 85)" />
        <ellipse cx="55" cy="45" rx="7" ry="3.5" fill={C} opacity="0.2" transform="rotate(-45 55 45)" />
        <ellipse cx="90" cy="55" rx="7" ry="3" fill={C} opacity="0.2" transform="rotate(10 90 55)" />
        <circle cx="110" cy="50" r="5" fill={B} opacity="0.3" />
        <circle cx="110" cy="50" r="2" fill={B} opacity="0.5" />
        <circle cx="15" cy="78" r="3" fill={C} opacity="0.3" />
      </svg>
    </div>
  );
}
