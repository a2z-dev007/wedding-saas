export type TemplateId = "emerald-noir" | "royal-elegance" | "modern-minimal";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  style: string;
  description: string;
  tag?: string;
  gradient: string;
}

export const TEMPLATE_META: Record<TemplateId, TemplateMeta> = {
  "emerald-noir": {
    id: "emerald-noir",
    name: "Emerald Noir",
    style: "Luxury Dark",
    tag: "Best Seller",
    description:
      "Ornate gold details on a rich velvet forest green canvas. Dramatic 3D door reveal, ambient shehnai music, and bilingual storytelling — ideal for high-end evening celebrations.",
    gradient: "from-[#e8f0ed] to-[#c5ddd3]",
  },
  "royal-elegance": {
    id: "royal-elegance",
    name: "Royal Elegance",
    style: "Classic Indian",
    tag: "Best Seller",
    description:
      "Traditional South Asian grandeur featuring soft bone backdrops, golden arches, and royal accents. A curtain reveal that feels like opening a physical invitation.",
    gradient: "from-[#faf7f0] to-[#f0e8d8]",
  },
  "modern-minimal": {
    id: "modern-minimal",
    name: "Modern Minimal",
    style: "Contemporary Chic",
    tag: "New",
    description:
      "Ultra-clean editorial typography, massive whitespace, and elegant framing. Perfect for destination weddings and couples who love contemporary design.",
    gradient: "from-stone-50 to-stone-200",
  },
};

export const INCLUDED_FEATURES = [
  "Animated envelope or door reveal",
  "Custom names, dates & venues",
  "Background music with mute control",
  "Live countdown timer",
  "Scratch-to-reveal wedding date",
  "Photo slideshow gallery",
  "Google Maps navigation",
  "Multi-event RSVP (Sangeet, Wedding, Reception)",
  "Guest message inbox",
  "Multi-language support (Hindi, English & more)",
  "Unlimited edits until wedding day",
  "WhatsApp one-tap sharing",
];

export const DEMO_STEPS = [
  { num: "1", title: "Choose your plan", desc: "Pick Classic or Royal based on the motion experience you want." },
  { num: "2", title: "Personalize details", desc: "Add names, dates, venues, music, photos, and event schedule." },
  { num: "3", title: "Share instantly", desc: "Send your live link via WhatsApp. Track RSVPs in your dashboard." },
];

export function getTemplateMeta(templateId: string): TemplateMeta {
  return TEMPLATE_META[templateId as TemplateId] ?? TEMPLATE_META["emerald-noir"];
}

export function getMockInvitationData(brideName = "Priya", groomName = "Arjun") {
  return {
    id: "preview-id",
    brideName,
    groomName,
    weddingDate: "2026-11-28",
    weddingTime: "7:00 PM onwards",
    venueName: "The Leela Palace Hotel",
    venueAddress: "Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110021",
    venueLat: 28.5839,
    venueLng: 77.1953,
    heroImageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
    slideshowImages: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507504038482-7621c27dec3f?q=80&w=500&auto=format&fit=crop",
    ],
    showDressCode: true,
    dressCodeText:
      "Royal Traditional Indian \nWomen: Lehengas / Sarees in pastel tones \nMen: Sherwanis / Bandhgalas",
    showTransport: true,
    transportText:
      "Shuttle services will be available from Delhi Airport. Valet parking is fully operational at the hotel venue.",
    eventsJson: [
      { name: "Sangeet Night", enabled: true, venue: "Grand Ballroom, The Leela Palace", date: "Friday, 27 November", time: "8:00 PM" },
      { name: "Wedding Ceremony", enabled: true, venue: "Royal Lawns, The Leela Palace", date: "Saturday, 28 November", time: "6:00 PM" },
      { name: "Reception Party", enabled: true, venue: "Grand Ballroom, The Leela Palace", date: "Sunday, 29 November", time: "8:00 PM" },
    ],
  };
}

export const TEMPLATE_COMPONENTS = {
  "emerald-noir": () => import("@/components/templates/EmeraldNoir"),
  "royal-elegance": () => import("@/components/templates/RoyalElegance"),
  "modern-minimal": () => import("@/components/templates/ModernMinimal"),
} as const;
