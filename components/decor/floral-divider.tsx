"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DECOR } from "@/lib/decor-colors";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FloralDivider({ variant = "default" }: { variant?: "default" | "gold" | "wine" }) {
  const color =
    variant === "gold" ? DECOR.champagne : variant === "wine" ? DECOR.wine : DECOR.blush;

  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const paths = dividerRef.current?.querySelectorAll("path");
      if (paths) {
        gsap.fromTo(
          paths,
          { strokeDasharray: "100", strokeDashoffset: "100" },
          {
            strokeDashoffset: 0,
            duration: 2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: dividerRef.current, start: "top 90%" },
          }
        );
      }
      const elements = dividerRef.current?.querySelectorAll("circle, ellipse");
      if (elements) {
        gsap.fromTo(
          elements,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: (_i, target) => parseFloat(target.getAttribute("opacity") || "1"),
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: dividerRef.current, start: "top 85%" },
          }
        );
      }
    },
    { scope: dividerRef }
  );

  return (
    <div ref={dividerRef} className="flex items-center justify-center py-4">
      <svg width="320" height="40" viewBox="0 0 320 40" fill="none" className="opacity-50">
        <path d="M20 20 Q60 10 80 20 Q100 30 120 20" stroke={color} strokeWidth="1" fill="none" />
        <path d="M40 15 Q45 8 50 12" stroke={color} strokeWidth="0.8" fill="none" />
        <ellipse cx="48" cy="10" rx="4" ry="6" fill={color} opacity="0.3" transform="rotate(-20 48 10)" />
        <ellipse cx="42" cy="12" rx="3" ry="5" fill={color} opacity="0.25" transform="rotate(15 42 12)" />
        <path d="M85 25 Q90 32 95 28" stroke={color} strokeWidth="0.8" fill="none" />
        <ellipse cx="93" cy="30" rx="4" ry="5.5" fill={color} opacity="0.3" transform="rotate(25 93 30)" />
        <circle cx="160" cy="20" r="8" fill={color} opacity="0.15" />
        <path d="M160 12 Q164 16 160 20 Q156 16 160 12Z" fill={color} opacity="0.5" />
        <path d="M152 20 Q156 16 160 20 Q156 24 152 20Z" fill={color} opacity="0.4" />
        <path d="M168 20 Q164 16 160 20 Q164 24 168 20Z" fill={color} opacity="0.4" />
        <path d="M160 28 Q164 24 160 20 Q156 24 160 28Z" fill={color} opacity="0.35" />
        <circle cx="160" cy="20" r="3" fill={color} opacity="0.6" />
        <ellipse cx="145" cy="22" rx="6" ry="3" fill={color} opacity="0.2" transform="rotate(-15 145 22)" />
        <ellipse cx="175" cy="18" rx="6" ry="3" fill={color} opacity="0.2" transform="rotate(15 175 18)" />
        <path d="M200 20 Q220 10 240 20 Q260 30 280 20 Q290 15 300 20" stroke={color} strokeWidth="1" fill="none" />
        <path d="M225 15 Q230 8 235 12" stroke={color} strokeWidth="0.8" fill="none" />
        <ellipse cx="233" cy="10" rx="4" ry="6" fill={color} opacity="0.3" transform="rotate(-20 233 10)" />
        <path d="M265 25 Q270 32 275 28" stroke={color} strokeWidth="0.8" fill="none" />
        <ellipse cx="273" cy="30" rx="4" ry="5.5" fill={color} opacity="0.3" transform="rotate(25 273 30)" />
        <circle cx="130" cy="20" r="1.5" fill={color} opacity="0.4" />
        <circle cx="190" cy="20" r="1.5" fill={color} opacity="0.4" />
      </svg>
    </div>
  );
}
