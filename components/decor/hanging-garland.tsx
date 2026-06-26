"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DECOR } from "@/lib/decor-colors";

export function HangingGarland({ variant = "default" }: { variant?: "default" | "marigold" | "rose" }) {
  const colors = {
    default: { flower: DECOR.champagne, leaf: DECOR.sageMuted, string: DECOR.champagneMuted },
    marigold: { flower: DECOR.marigold, leaf: DECOR.sageMuted, string: "rgba(232, 168, 56, 0.4)" },
    rose: { flower: DECOR.blush, leaf: DECOR.champagne, string: "rgba(237, 213, 200, 0.4)" },
  }[variant];

  const garlandRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.to(garlandRef.current, {
        rotate: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 0%",
      });
    },
    { scope: garlandRef }
  );

  return (
    <div className="pointer-events-none flex w-full justify-center overflow-hidden">
      <svg
        ref={garlandRef}
        width="100%"
        height="60"
        viewBox="0 0 800 60"
        preserveAspectRatio="xMidYMin meet"
        fill="none"
        className="max-w-4xl opacity-40"
      >
        <path
          d="M0 5 Q100 50 200 15 Q300 50 400 15 Q500 50 600 15 Q700 50 800 5"
          stroke={colors.string}
          strokeWidth="1.5"
          fill="none"
        />
        {[100, 300, 500, 700].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="48" r="7" fill={colors.flower} opacity="0.7" />
            <circle cx={cx - 6} cy="44" r="5" fill={colors.flower} opacity="0.5" />
            <circle cx={cx + 6} cy="44" r="5" fill={colors.flower} opacity="0.5" />
            <circle cx={cx} cy="41" r="4" fill={colors.flower} opacity="0.6" />
            <ellipse cx={cx - 12} cy="42" rx="6" ry="3" fill={colors.leaf} opacity="0.3" transform={`rotate(-30 ${cx - 12} 42)`} />
            <ellipse cx={cx + 12} cy="42" rx="6" ry="3" fill={colors.leaf} opacity="0.3" transform={`rotate(30 ${cx + 12} 42)`} />
          </g>
        ))}
        {[0, 200, 400, 600, 800].map((cx) => (
          <g key={`bud-${cx}`}>
            <circle cx={cx} cy="14" r="4" fill={colors.flower} opacity="0.4" />
            <circle cx={cx} cy="10" r="2.5" fill={colors.flower} opacity="0.6" />
          </g>
        ))}
      </svg>
    </div>
  );
}
