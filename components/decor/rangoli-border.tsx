"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DECOR } from "@/lib/decor-colors";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function RangoliBorder() {
  const borderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const groups = borderRef.current?.querySelectorAll("g");
      if (groups) {
        gsap.fromTo(
          groups,
          { scale: 0, opacity: 0, y: 10 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: borderRef.current, start: "top 95%" },
          }
        );
      }
      const lines = borderRef.current?.querySelectorAll("line");
      if (lines) {
        gsap.fromTo(
          lines,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.4,
            duration: 1.5,
            ease: "power3.inOut",
            transformOrigin: "center center",
            scrollTrigger: { trigger: borderRef.current, start: "top 95%" },
          }
        );
      }
    },
    { scope: borderRef }
  );

  return (
    <div ref={borderRef} className="pointer-events-none flex w-full justify-center py-2">
      <svg width="100%" height="24" viewBox="0 0 600 24" preserveAspectRatio="xMidYMid meet" fill="none" className="max-w-3xl opacity-25">
        {Array.from({ length: 15 }).map((_, i) => {
          const x = i * 40 + 20;
          return (
            <g key={i}>
              <path d={`M${x} 12 Q${x + 5} 4 ${x + 10} 12 Q${x + 5} 20 ${x} 12Z`} fill={DECOR.champagne} opacity="0.6" />
              <circle cx={x + 5} cy="12" r="2" fill={DECOR.wine} opacity="0.5" />
              <circle cx={x - 8} cy="12" r="1.5" fill={DECOR.blush} opacity="0.7" />
              <circle cx={x + 18} cy="12" r="1.5" fill={DECOR.blush} opacity="0.7" />
            </g>
          );
        })}
        <line x1="0" y1="2" x2="600" y2="2" stroke={DECOR.champagne} strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4" />
        <line x1="0" y1="22" x2="600" y2="22" stroke={DECOR.champagne} strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4" />
      </svg>
    </div>
  );
}
