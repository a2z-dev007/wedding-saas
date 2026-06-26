export function AmbientBackground() {
  return (
    <>
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] glow-orb-primary rounded-full" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] glow-orb-gold rounded-full" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] glow-orb-soft rounded-full" />
    </>
  );
}

export function GoldCornerFrame() {
  return (
    <div className="absolute inset-x-4 md:inset-x-8 inset-y-20 border border-black/[0.03] pointer-events-none rounded-[2.5rem] hidden md:block">
      <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-accent-gold/30 rounded-tl-xl" />
      <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-accent-gold/30 rounded-tr-xl" />
      <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-accent-gold/30 rounded-bl-xl" />
      <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-accent-gold/30 rounded-br-xl" />
    </div>
  );
}
