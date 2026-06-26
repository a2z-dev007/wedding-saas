"use client";

import { motion } from "motion/react";
import { DecorSection, HeaderDecor } from "@/components/decor/section-decor";
import { SectionHeader } from "@/components/ui/section-header";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from "@/components/ui/motion-primitives";
import { Star } from "@phosphor-icons/react";

const TESTIMONIALS = [
  {
    name: "Tasneem Barde",
    quote: "Such a beautiful and well-designed wedding webpage! Everything was easy to find and the scratch card revealed the date beautifully.",
  },
  {
    name: "Mohit Srivastava",
    quote: "The service you offer is just phenomenal. I've never seen a card this elegant. The shehnai background music was stunning!",
  },
  {
    name: "Sneha Kapoor",
    quote: "Royal Elegance truly elevated our wedding announcement. The guest RSVP book allowed us to coordinate details instantly.",
  },
  {
    name: "Aarav Mehta",
    quote: "We chose the Royal package and the 3D opening curtain reveal blew our guests away. Best money we spent on the wedding.",
  },
  {
    name: "Rahul Iyer",
    quote: "Saved us weeks of courier runs. Guests RSVP'd immediately for separate Sangeet and Reception slots.",
  },
];

export function TestimonialsSection() {
  return (
    <>
      <DecorSection preset="minimal" className="py-16 md:py-20 bg-accent-gold-light/40 border-y border-accent-gold/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
          className="page-container text-center"
        >
          <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] leading-tight">
            Trusted by <span className="italic text-accent-gold">500+ couples</span> across India
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-stone-400 mt-3">
            Impeccable digital invitation design
          </p>
        </motion.div>
      </DecorSection>

      <DecorSection preset="testimonials" className="section-padding bg-white">
        <div className="page-container">
          <SectionHeader eyebrow="Testimonials" title="What our couples say" />
          <HeaderDecor preset="testimonials" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <DoubleBezelCard className="h-full flex flex-col justify-between !p-5">
                  <div>
                    <div className="flex gap-0.5 text-accent-gold mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} weight="fill" />
                      ))}
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="border-t border-stone-100 pt-4 mt-5 flex justify-between items-center">
                    <span className="text-xs font-semibold text-stone-700">{t.name}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 rounded-full px-2 py-0.5 font-bold">
                      Verified
                    </span>
                  </div>
                </DoubleBezelCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </DecorSection>
    </>
  );
}
