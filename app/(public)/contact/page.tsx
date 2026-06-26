"use client";

import { motion } from "motion/react";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PageHero } from "@/components/ui/page-hero";
import { PremiumButton } from "@/components/ui/premium-button";
import { fadeUp, viewportOnce } from "@/components/ui/motion-primitives";
import { EnvelopeOpen, MapPinLine, ChatCircleText } from "@phosphor-icons/react";

export default function ContactPage() {
  return (
    <div className="py-24">
      <div className="page-container max-w-4xl">
        <PageHero eyebrow="Get in Touch" title="We'd love to hear from you" subtitle="Questions about templates, pricing, or your invitation?" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="lg:col-span-5 space-y-4">
            {[
              { icon: EnvelopeOpen, label: "Email", value: "hello@unfoldwed.com" },
              { icon: ChatCircleText, label: "WhatsApp", value: "+91 98765 43210" },
              { icon: MapPinLine, label: "Office", value: "Cyber Plaza, Hitec City, Hyderabad 500081" },
            ].map((item) => (
              <DoubleBezelCard key={item.label}>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <item.icon className="h-5 w-5" weight="light" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400">{item.label}</span>
                    <p className="text-sm text-stone-700 mt-0.5">{item.value}</p>
                  </div>
                </div>
              </DoubleBezelCard>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} transition={{ delay: 0.1 }} className="lg:col-span-7">
            <DoubleBezelCard>
              <h2 className="font-serif text-lg mb-5">Send us a message</h2>
              <form className="space-y-4">
                {["Full Name", "Email Address"].map((label) => (
                  <div key={label}>
                    <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">{label}</label>
                    <input type={label.includes("Email") ? "email" : "text"} placeholder={label.includes("Email") ? "you@email.com" : "Your name"} className="w-full bg-stone-50 border border-black/[0.06] rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-gold/40" />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="How can we help?" className="w-full bg-stone-50 border border-black/[0.06] rounded-xl p-4 text-sm outline-none focus:border-accent-gold/40 resize-none" />
                </div>
                <PremiumButton type="button" className="w-full justify-center">Submit Message</PremiumButton>
              </form>
            </DoubleBezelCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
