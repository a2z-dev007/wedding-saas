"use client";

import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { DecorSection, HeaderDecor } from "@/components/decor/section-decor";
import { staggerContainer, fadeUp, viewportOnce } from "@/components/ui/motion-primitives";
import {
  EnvelopeOpen,
  Sparkle,
  ChatCircleText,
  Globe,
  MusicNotes,
  MapPin,
  DownloadSimple,
  Sliders,
} from "@phosphor-icons/react";

const FEATURES = [
  { badge: "Free", title: "Animated envelope reveal", desc: "Wax seal and your initials — a first impression no one forgets.", icon: EnvelopeOpen },
  { badge: null, title: "Personalized templates", desc: "Your palette, story, and style with unlimited edits until wedding day.", icon: Sparkle },
  { badge: "Free", title: "Smart RSVP tracking", desc: "Menu, allergies, transport, companions — multi-event RSVPs tracked live.", icon: ChatCircleText },
  { badge: "Free", title: "Export to Excel", desc: "Download every guest response with one click for your caterer.", icon: DownloadSimple },
  { badge: null, title: "Multi-language", desc: "Hindi, English, Tamil, Urdu, and more — guests pick their language.", icon: Globe },
  { badge: null, title: "Background music", desc: "Shehnai, sitar, flute — curated copyright-free instrumentals.", icon: MusicNotes },
  { badge: null, title: "Venue map", desc: "One tap opens Google Maps with your venue location.", icon: MapPin },
  { badge: null, title: "Full customization", desc: "Dress codes, schedules, slideshows, countdown, scratch reveals.", icon: Sliders },
];

export function FeaturesSection() {
  return (
    <DecorSection preset="gold" className="section-padding bg-white border-y border-black/[0.04]">
      <div className="page-container">
        <SectionHeader
          eyebrow="Every detail"
          title="So much more than an invitation"
          subtitle="Every feature designed to make your wedding announcement unforgettable."
        />
        <HeaderDecor preset="gold" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              variants={fadeUp}
              className="rounded-xl border border-black/[0.05] bg-[#FCFBF7] p-5 hover:border-accent-gold/20 hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 rounded-xl bg-white border border-black/[0.04] flex items-center justify-center text-accent-gold mb-4">
                <feat.icon className="h-5 w-5" weight="light" />
              </div>
              {feat.badge && (
                <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{feat.badge}</span>
              )}
              <h3 className="font-serif text-base text-[#1A1A1A] mt-2 mb-1.5">{feat.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DecorSection>
  );
}
