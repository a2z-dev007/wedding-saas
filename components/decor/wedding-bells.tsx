"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DECOR } from "@/lib/decor-colors";

export function WeddingBells() {
  const bellContainerRef = useRef<HTMLDivElement>(null);
  const C = DECOR.champagne;
  const B = DECOR.blush;

  useGSAP(
    () => {
      const bells = bellContainerRef.current?.querySelectorAll(".bell-body");
      if (bells) {
        gsap.to(bells, {
          rotate: (i) => (i % 2 === 0 ? 5 : -5),
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 10%",
        });
      }
      const clappers = bellContainerRef.current?.querySelectorAll(".clapper");
      if (clappers) {
        gsap.to(clappers, {
          x: (i) => (i % 2 === 0 ? 3 : -3),
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.2,
        });
      }
    },
    { scope: bellContainerRef }
  );

  return (
    <div ref={bellContainerRef} className="pointer-events-none flex justify-center py-4 opacity-20">
      <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
        <path d="M25 8 Q32 2 40 8 Q48 2 55 8" stroke={C} strokeWidth="1.5" fill="none" />
        <path d="M30 5 Q35 0 40 5" stroke={B} strokeWidth="1" fill={B} opacity="0.3" />
        <path d="M40 5 Q45 0 50 5" stroke={B} strokeWidth="1" fill={B} opacity="0.3" />
        <g className="bell-body">
          <path d="M20 20 Q20 12 30 10 L30 8" stroke={C} strokeWidth="1" fill="none" />
          <path d="M15 45 Q15 20 30 18 Q45 20 45 45Z" fill={C} opacity="0.3" />
          <path d="M15 45 Q15 20 30 18 Q45 20 45 45" stroke={C} strokeWidth="1" fill="none" />
          <ellipse cx="30" cy="45" rx="15" ry="4" fill={C} opacity="0.4" />
          <circle className="clapper" cx="30" cy="50" r="3" fill={C} opacity="0.5" />
        </g>
        <g className="bell-body">
          <path d="M60 20 Q60 12 50 10 L50 8" stroke={C} strokeWidth="1" fill="none" />
          <path d="M35 45 Q35 20 50 18 Q65 20 65 45Z" fill={C} opacity="0.3" />
          <path d="M35 45 Q35 20 50 18 Q65 20 65 45" stroke={C} strokeWidth="1" fill="none" />
          <ellipse cx="50" cy="45" rx="15" ry="4" fill={C} opacity="0.4" />
          <circle className="clapper" cx="50" cy="50" r="3" fill={C} opacity="0.5" />
        </g>
        <path d="M38 58 Q38 55 40 56 Q42 55 42 58 Q40 62 38 58Z" fill={B} opacity="0.5" />
      </svg>
    </div>
  );
}
