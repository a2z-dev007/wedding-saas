"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DECOR } from "@/lib/decor-colors";

export function GoldenParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; left: string; top: string; size: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
      }))
    );
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      containerRef.current.querySelectorAll(".sparkle").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0, x: Math.random() * 20 - 10, y: Math.random() * 20 - 10 },
          {
            opacity: Math.random() * 0.5 + 0.3,
            scale: 1,
            duration: Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 5,
          }
        );
      });
    },
    { scope: containerRef, dependencies: [particles] }
  );

  if (particles.length === 0) return null;

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="sparkle absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: DECOR.champagne }}
        />
      ))}
    </div>
  );
}
