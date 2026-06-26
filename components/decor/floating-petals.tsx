"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DECOR } from "@/lib/decor-colors";

interface FloatingPetalsProps {
  count?: number;
  color?: "rose" | "gold" | "wine";
}

export function FloatingPetals({ count = 12, color = "rose" }: FloatingPetalsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [petals, setPetals] = useState<
    { id: number; left: string; size: number; delay: number; duration: number; rotation: number; swayAmount: number }[]
  >([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 14 + 8,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 6,
        rotation: Math.random() * 360,
        swayAmount: Math.random() * 60 - 30,
      }))
    );
  }, [count]);

  const petalColor =
    color === "rose" ? DECOR.blush : color === "gold" ? DECOR.champagne : `${DECOR.wine}80`;

  useGSAP(
    () => {
      if (!containerRef.current || petals.length === 0) return;
      const petalElements = containerRef.current.querySelectorAll(".petal");
      petalElements.forEach((el, i) => {
        const p = petals[i];
        gsap.set(el, { y: -50, x: Math.random() * 40 - 20, rotate: p.rotation, opacity: 0 });
        gsap.to(el, {
          y: "110vh",
          x: `+=${p.swayAmount}`,
          rotate: p.rotation + 360 + Math.random() * 360,
          opacity: 1,
          duration: p.duration,
          delay: p.delay,
          repeat: -1,
          ease: "none",
          onRepeat: function () {
            gsap.set(this.targets()[0], {
              left: `${Math.random() * 100}%`,
              x: Math.random() * 40 - 20,
              opacity: 0,
            });
          },
        });
        gsap.to(el, { opacity: 0.8, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
    },
    { scope: containerRef, dependencies: [petals] }
  );

  if (petals.length === 0) return null;

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
      {petals.map((p) => (
        <div key={p.id} className="petal absolute" style={{ left: p.left, top: "-28px" }}>
          <svg width={p.size} height={p.size * 1.4} viewBox="0 0 20 28" fill="none">
            <path
              d="M10 0C10 0 0 8 0 16C0 22 4 28 10 28C16 28 20 22 20 16C20 8 10 0 10 0Z"
              fill={petalColor}
              opacity="0.6"
            />
            <path
              d="M10 4C10 4 5 10 5 16C5 20 7 24 10 24"
              stroke={petalColor}
              strokeWidth="0.5"
              opacity="0.8"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
