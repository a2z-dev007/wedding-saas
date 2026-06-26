"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DECOR } from "@/lib/decor-colors";

export function MandalaDecor({ size = 120 }: { size?: number; position?: "left" | "right" | "center" }) {
  const mandalaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(mandalaRef.current, { rotate: 360, duration: 30, repeat: -1, ease: "none" });
    },
    { scope: mandalaRef }
  );

  return (
    <div ref={mandalaRef} className="pointer-events-none mx-auto opacity-[0.12]">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={`outer-${i}`}
            cx="60"
            cy="20"
            rx="8"
            ry="18"
            fill={DECOR.champagne}
            transform={`rotate(${i * 30} 60 60)`}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={`inner-${i}`}
            cx="60"
            cy="32"
            rx="6"
            ry="12"
            fill={DECOR.blush}
            transform={`rotate(${i * 45} 60 60)`}
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          return (
            <circle
              key={`dot-${i}`}
              cx={60 + Math.cos(angle) * 50}
              cy={60 + Math.sin(angle) * 50}
              r="2"
              fill={DECOR.champagne}
            />
          );
        })}
        <circle cx="60" cy="60" r="10" fill={DECOR.wine} opacity="0.4" />
        <circle cx="60" cy="60" r="5" fill={DECOR.champagne} opacity="0.6" />
      </svg>
    </div>
  );
}
