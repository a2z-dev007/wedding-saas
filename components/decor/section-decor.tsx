"use client";

import { cn } from "@/lib/utils";
import { FloatingPetals } from "./floating-petals";
import { GoldenParticles } from "./golden-particles";
import { CornerRose } from "./corner-rose";
import { HangingGarland } from "./hanging-garland";
import { MandalaDecor } from "./mandala-decor";
import { FloralDivider } from "./floral-divider";
import { RangoliBorder } from "./rangoli-border";
import { WeddingBells } from "./wedding-bells";

export type DecorPreset =
  | "hero"
  | "standard"
  | "gold"
  | "showcase"
  | "templates"
  | "testimonials"
  | "pricing"
  | "cta"
  | "minimal";

type BackdropConfig = {
  petals?: { count: number; color: "rose" | "gold" };
  particles?: boolean;
  corners?: Array<"top-left" | "top-right" | "bottom-left" | "bottom-right">;
  garland?: "default" | "marigold" | "rose";
};

const BACKDROPS: Record<DecorPreset, BackdropConfig> = {
  hero: { particles: true, petals: { count: 12, color: "rose" } },
  standard: {
    petals: { count: 8, color: "rose" },
    corners: ["top-left", "bottom-right"],
    garland: "marigold",
  },
  gold: {
    petals: { count: 10, color: "gold" },
    corners: ["top-right", "bottom-left"],
    garland: "marigold",
  },
  showcase: {
    petals: { count: 8, color: "rose" },
    corners: ["top-left", "bottom-right"],
    garland: "rose",
  },
  templates: {
    petals: { count: 8, color: "gold" },
    corners: ["top-left", "bottom-right"],
    garland: "rose",
  },
  testimonials: {
    petals: { count: 10, color: "rose" },
    corners: ["top-right", "bottom-left"],
  },
  pricing: {
    petals: { count: 6, color: "gold" },
    corners: ["top-left", "bottom-right"],
    garland: "marigold",
  },
  cta: { petals: { count: 10, color: "gold" }, particles: true, garland: "marigold" },
  minimal: {
    petals: { count: 5, color: "rose" },
    corners: ["top-right", "bottom-left"],
  },
};

export type HeaderDecorConfig = {
  mandala?: number;
  divider?: "default" | "gold" | "wine";
  rangoli?: boolean;
  bells?: boolean;
};

const HEADER_DECOR: Partial<Record<DecorPreset, HeaderDecorConfig>> = {
  standard: { mandala: 90, divider: "wine", rangoli: true },
  gold: { mandala: 100, divider: "gold" },
  showcase: { mandala: 90, divider: "gold" },
  templates: { bells: true, divider: "gold" },
  testimonials: { bells: true, divider: "gold", mandala: 80 },
  pricing: { divider: "gold" },
  minimal: { divider: "wine" },
};

function WarmSpots() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,237,216,0.45)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(232,228,220,0.35)_0%,transparent_70%)]" />
    </div>
  );
}

/** Absolute backdrop layers — petals, corners, garland, particles */
export function SectionBackdrop({ preset }: { preset: DecorPreset }) {
  const cfg = BACKDROPS[preset];
  return (
    <>
      <WarmSpots />
      {cfg.particles && <GoldenParticles />}
      {cfg.petals && <FloatingPetals count={cfg.petals.count} color={cfg.petals.color} />}
      {cfg.corners?.map((pos) => <CornerRose key={pos} position={pos} />)}
      {cfg.garland && (
        <div className="pointer-events-none absolute top-0 inset-x-0 z-[1]">
          <HangingGarland variant={cfg.garland} />
        </div>
      )}
    </>
  );
}

/** Title-area decor — mandala, bells, divider, rangoli (after section header) */
export function HeaderDecor({ preset }: { preset: DecorPreset }) {
  const cfg = HEADER_DECOR[preset];
  if (!cfg) return null;
  return (
    <>
      {cfg.bells && <WeddingBells />}
      {cfg.mandala && <MandalaDecor size={cfg.mandala} />}
      {cfg.divider && <FloralDivider variant={cfg.divider} />}
      {cfg.rangoli && <RangoliBorder />}
    </>
  );
}

type DecorSectionProps = {
  preset: DecorPreset;
  className?: string;
  id?: string;
  children: React.ReactNode;
};

/** Wraps a homepage section with venueforevent-style backdrop */
export function DecorSection({ preset, className, id, children }: DecorSectionProps) {
  return (
    <section id={id} className={cn("relative overflow-hidden", className)}>
      <SectionBackdrop preset={preset} />
      <div className="relative z-[2]">{children}</div>
    </section>
  );
}
