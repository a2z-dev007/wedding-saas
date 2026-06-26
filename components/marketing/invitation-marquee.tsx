"use client";

const INVITATION_CARDS = [
  { label: "Royal Bloom", gradient: "from-[#faf6ed] via-[#f5ebe0] to-[#e8d5c4]", accent: "#B89730", pattern: "floral" },
  { label: "Emerald Garden", gradient: "from-[#e8f0ed] via-[#d4e8de] to-[#b8d4c8]", accent: "#082F27", pattern: "botanical" },
  { label: "Desert Rose", gradient: "from-[#fdf8f4] via-[#f8ece4] to-[#edd5c8]", accent: "#C4796A", pattern: "minimal" },
  { label: "Coastal Dream", gradient: "from-[#eef4f8] via-[#d8e8f0] to-[#b8d4e8]", accent: "#4A7C8C", pattern: "watercolor" },
  { label: "Mughal Gold", gradient: "from-[#faf7f0] via-[#f0e6d0] to-[#e0cc98]", accent: "#8B6914", pattern: "ornate" },
  { label: "Minimal Chic", gradient: "from-[#fafafa] via-[#f0f0f0] to-[#e8e8e8]", accent: "#1A1A1A", pattern: "minimal" },
  { label: "Tropical Bliss", gradient: "from-[#f0f8f0] via-[#d8eed8] to-[#b8e0b8]", accent: "#4A8C4A", pattern: "botanical" },
  { label: "Sunset Palace", gradient: "from-[#fdf5ef] via-[#f8e0d0] to-[#e8c0a8]", accent: "#C45A3C", pattern: "floral" },
];

function CardPattern({ pattern, accent }: { pattern: string; accent: string }) {
  if (pattern === "floral") {
    return (
      <>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full opacity-20" style={{ backgroundColor: accent }} />
        <div className="absolute top-3 left-[38%] w-3 h-3 rounded-full opacity-15" style={{ backgroundColor: accent }} />
        <div className="absolute top-3 right-[38%] w-3 h-3 rounded-full opacity-15" style={{ backgroundColor: accent }} />
      </>
    );
  }
  if (pattern === "botanical") {
    return (
      <svg className="absolute bottom-2 left-2 w-8 h-10 opacity-30" viewBox="0 0 32 40" fill="none">
        <path d="M16 38 Q14 20 16 4" stroke={accent} strokeWidth="1.5" />
        <path d="M16 24 Q6 20 2 12 Q10 18 16 20" fill={accent} opacity="0.4" />
        <path d="M16 16 Q26 12 30 6 Q22 14 16 16" fill={accent} opacity="0.4" />
      </svg>
    );
  }
  if (pattern === "watercolor") {
    return (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-current to-transparent" style={{ color: accent }} />
      </div>
    );
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-2xl opacity-20" style={{ color: accent }}>
      &amp;
    </div>
  );
}

function InvitationCard({ card, tall = false }: { card: typeof INVITATION_CARDS[0]; tall?: boolean }) {
  return (
    <div
      className={`shrink-0 rounded-xl border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden relative ${
        tall ? "w-[130px] h-[220px] sm:w-[150px] sm:h-[260px]" : "w-[120px] h-[190px] sm:w-[140px] sm:h-[220px]"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient}`} />
      <CardPattern pattern={card.pattern} accent={card.accent} />
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/40 to-transparent" />
      <div className="absolute inset-x-3 bottom-3">
        <div className="h-px bg-black/5 mb-2" />
        <span className="text-[8px] uppercase tracking-wider font-bold block truncate" style={{ color: card.accent }}>
          {card.label}
        </span>
        <span className="text-[7px] text-stone-400 mt-0.5 block">Digital Invite</span>
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-2">
        <span className="font-serif text-sm block opacity-60" style={{ color: card.accent }}>A &amp; R</span>
        <span className="text-[6px] uppercase tracking-[0.2em] text-stone-400 mt-1 block">Wedding</span>
      </div>
    </div>
  );
}

type MarqueeRowProps = {
  direction: "left" | "right";
  offset?: boolean;
  className?: string;
};

export function InvitationMarqueeRow({ direction, offset = false, className = "" }: MarqueeRowProps) {
  const cards = offset ? [...INVITATION_CARDS.slice(4), ...INVITATION_CARDS.slice(0, 4)] : INVITATION_CARDS;
  const doubled = [...cards, ...cards];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className={`overflow-hidden hero-marquee-mask ${className}`}>
      <div className={`flex gap-4 sm:gap-5 w-max ${animClass}`}>
        {doubled.map((card, i) => (
          <InvitationCard key={`${card.label}-${i}`} card={card} tall={offset} />
        ))}
      </div>
    </div>
  );
}

export function HeroMarqueeBackdrop() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-5 sm:gap-6 pointer-events-none select-none">
      <InvitationMarqueeRow direction="left" className="opacity-90" />
      <InvitationMarqueeRow direction="right" offset className="opacity-85" />
      <div className="absolute inset-0 hero-vignette z-[1]" />
    </div>
  );
}
