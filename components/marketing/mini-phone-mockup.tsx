"use client";

import { cn } from "@/lib/utils";

type ScreenVariant = "hero" | "details" | "curtain";

type MiniPhoneMockupProps = {
  variant: ScreenVariant;
  templateName: string;
  accentClass?: string;
  bgGradient: string;
  className?: string;
};

export function MiniPhoneMockup({
  variant,
  templateName,
  accentClass = "text-accent-gold",
  bgGradient,
  className,
}: MiniPhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 w-[38%] max-w-[118px] rounded-[14px] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] p-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.18)]",
        className
      )}
    >
      <div className="absolute top-1 left-1/2 z-10 h-[5px] w-[28%] -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
      <div className={cn("relative aspect-[9/18] overflow-hidden rounded-[11px] bg-gradient-to-br", bgGradient)}>
        {variant === "hero" && (
          <div className="flex h-full flex-col items-center justify-center px-2 py-4 text-center">
            <span className={cn("text-[5px] uppercase tracking-[0.2em]", accentClass)}>The Wedding of</span>
            <p className="mt-1 font-serif text-[9px] leading-tight text-white">Priya &amp;</p>
            <p className="font-serif text-[9px] leading-tight text-white">Arjun</p>
            <div className={cn("mt-2 h-px w-8 bg-current opacity-40", accentClass)} />
            <span className="mt-2 text-[4px] text-white/70">28 · November · 2026</span>
          </div>
        )}
        {variant === "details" && (
          <div className="flex h-full flex-col bg-white px-2 py-3">
            <span className="text-[5px] font-bold uppercase tracking-wider text-stone-400">Schedule</span>
            <div className="mt-1.5 space-y-1">
              {["Sangeet", "Wedding", "Reception"].map((e) => (
                <div key={e} className="rounded-md bg-stone-50 px-1.5 py-1">
                  <p className="text-[5px] font-semibold text-stone-700">{e}</p>
                  <p className="text-[4px] text-stone-400">RSVP →</p>
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-full bg-primary py-1 text-center">
              <span className="text-[4px] font-bold text-white">RSVP Now</span>
            </div>
          </div>
        )}
        {variant === "curtain" && (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-[#6e0d1d]" />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[#5a0a17]" />
            <div className="relative z-10 px-1 text-center">
              <p className="font-serif text-[8px] text-[#e8c57a]">Welcome</p>
              <p className="mt-0.5 text-[5px] text-white/80">{templateName}</p>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
