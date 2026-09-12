# Template Reverse Engineering & Architecture Specification Index

> **Reference Source:** [https://saveourdate.in/#templates](https://saveourdate.in/#templates)  
> **Target System:** Unfold ([unfoldwed.com](https://unfoldwed.com)) Data-Driven Template Engine  
> **Status:** Specification Complete (Analysis & Architecture Phase)

---

## 1. Complete Template Registry

| # | Template Name | Template ID | Category | Religious / Cultural Style | Opening Mechanism | Animation Intensity | Specification File |
|---|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Royal Lotus** | `TPL-HIN-01` | Hinduism | Royal Heritage / Rajasthani Darbar | Carved Royal Palace Gate | High | [`royal-lotus.md`](./royal-lotus.md) |
| 2 | **Crimson Royale** | `TPL-HIN-02` | Hinduism | North Indian Royal / Mughal Grandeur | Royal Crimson Velvet Envelope | High | [`crimson-royale.md`](./crimson-royale.md) |
| 3 | **Whispering Leaves** | `TPL-NON-01` | Non-Religious | Modern Botanical / Fine Art Minimalist | Textured Linen Card | Medium | [`whispering-leaves.md`](./whispering-leaves.md) |
| 4 | **Grand Celebration** | `TPL-HIN-03` | Hinduism | Festive Sangeet / Modern Fusion Bollywood Grandeur | Grand Royal Silk Drapes Parting | High | [`grand-celebration.md`](./grand-celebration.md) |
| 5 | **Royal Blush** | `TPL-NON-02` | Non-Religious | Pastel Romance / Rose Gold Luxury | Rose Gold Shimmer Envelope | Medium-High | [`royal-blush.md`](./royal-blush.md) |
| 6 | **Emerald Royale** | `TPL-HIN-04` | Hinduism | Peacock Darbar / Imperial Emerald Heritage | Carved Emerald & Gold Peacock Darbar Doorway | High | [`emerald-royale.md`](./emerald-royale.md) |
| 7 | **Midnight Luxe** | `TPL-NON-03` | Non-Religious | Celestial Black Tie / High Fashion Editorial | Celestial Star Map Constellation Flare & Dark Obsidian Gate Parting | High | [`midnight-luxe.md`](./midnight-luxe.md) |
| 8 | **Azure Dreams** | `TPL-NON-04` | Non-Religious | Coastal Mediterranean / Santorini Destination | Santorini Arched Blue Shutters Opening | Medium-High | [`azure-dreams.md`](./azure-dreams.md) |
| 9 | **Khatim** | `TPL-ISL-01` | Islamic | Classic Arabesque / Traditional Nikah | Geometric 8-Pointed Khatim Star Gate Expanding | High | [`khatim.md`](./khatim.md) |
| 10 | **Emerald Qasr** | `TPL-ISL-02` | Islamic | Ottoman & Mughal Palace Nikah | Grand Arched Qasr Palace Gates | High | [`emerald-qasr.md`](./emerald-qasr.md) |
| 11 | **Zaytoon** | `TPL-ISL-03` | Islamic | Mediterranean Olive Grove / Modern Nikah | Linen Parchment Scroll | Medium | [`zaytoon.md`](./zaytoon.md) |
| 12 | **Noor-e-Nikah** | `TPL-ISL-04` | Islamic | Spiritual Radiance / Pastel Rose & Pearl | Radiant Noor Light Glow & Dual Translucent Silk Nikah Curtains Parting | High | [`noor-e-nikah.md`](./noor-e-nikah.md) |
| 13 | **Reshm-e-Noor** | `TPL-ISL-05` | Islamic | Royal Silk Brocade / Velvet & Zari Heritage | Handcrafted Zari Silk Brocade Tapestry Pull | High | [`reshm-e-noor.md`](./reshm-e-noor.md) |
| 14 | **South Mandapam** | `TPL-SOU-01` | South Indian | Vedic Kalyanam / Traditional Dravidian Temple Mandapam | Brass-Clad Temple Sanctum Door Opening | High | [`south-mandapam.md`](./south-mandapam.md) |
| 15 | **Anand Karaj** | `TPL-SIK-01` | Sikhism | Sacred Gurdwara Heritage / Palki Sahib Grandeur | Royal Saffron & Navy Velvet Drapes Parting | High | [`anand-karaj.md`](./anand-karaj.md) |
| 16 | **Scarlet Stamp** | `TPL-NON-05` | Non-Religious | Vintage Airmail Postage / Editorial Retro Romance | Scarlet Wax Stamp Break | Medium-High | [`scarlet-stamp.md`](./scarlet-stamp.md) |
| 17 | **Golden Noir** | `TPL-NON-06` | Non-Religious | Gatsby Art Deco / 1920s Glamour | Art Deco Geometric 24K Gold Fan Sunburst Expansion | High | [`golden-noir.md`](./golden-noir.md) |
| 18 | **Gilded Veil** | `TPL-NON-07` | Non-Religious | High Fashion Organza / Haute Couture Minimalism | Translucent Gilded Shimmer Veil Lifting Upward | Medium-High | [`gilded-veil.md`](./gilded-veil.md) |
| 19 | **Azure Royale** | `TPL-HIN-05` | Hinduism | Jodhpur Blue Palace / Peacock Darbar Heritage | Dual Jodhpur Royal Blue Palace Archway Swing Opening | High | [`azure-royale.md`](./azure-royale.md) |

---

## 2. Core Architectural Principles

### 1. Unified Data-Driven Template Engine
We do **not** build 19 disconnected websites. Instead, the platform operates on a single unified engine:

```
                     ┌───────────────────────┐
                     │     Wedding Data      │
                     │  (Bride, Groom, Date, │
                     │  Events, Photos, RSVP)│
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │    Template Engine    │
                     └───────────┬───────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
┌───────────────────┐                           ┌───────────────────┐
│  Template Config  │                           │   Theme Config    │
│ (Layout, Opening, │                           │ (Colors, Fonts,   │
│  Decorations, SVG)│                           │  Borders, Shadows)│
└────────┬──────────┘                           └────────┬──────────┘
         │                                               │
         └───────────────────────┬───────────────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Section System &      │
                     │ Shared Animation Core │
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Final Rendered Invite │
                     │ (SSR / ISR on [slug]) │
                     └───────────────────────┘
```

---

## 3. Shared Components vs. Template-Specific Components

### Shared Platform Components (`components/invitation/`)
These components are 100% reusable across all 19 templates, consuming normalized props and applying template-specific CSS variables:

1. **`CountdownTimer`**: Live ticking counter with dynamic digit roll and celebratory completion banner.
2. **`GuestMessageForm`**: Universal multi-event RSVP and guest blessings submission engine with Zod validation.
3. **`GoogleMapEmbed`**: Interactive Google Maps container with 1-tap navigation to venue coordinates.
4. **`MusicPlayer`**: Floating ambient audio controller with autoplay bypass unlock on gesture.
5. **`PhotoSlideshow`**: Progressive image loader with swipe gestures and full-screen lightbox modal.
6. **`ScratchCard`**: Interactive canvas scratcher for secret muhurat/venue reveals.
7. **`LanguageToggle`**: Multi-lingual switcher (English, Hindi, Tamil, Telugu, Gujarati, Urdu).

### Template-Specific Components (`components/templates/<slug>/`)
Each template provides custom visual wrappers:
1. **Opening Screen Reveal Component**: (e.g. `RoyalGateOpening`, `VelvetEnvelopeOpening`, `OrganzaVeilOpening`, `KhatimStarOpening`).
2. **Hero Monogram & Header**: Bespoke cultural frames, calligraphy SVGs, and typography lockups.
3. **Decorative Floating Layer**: Culture-specific particles (marigolds, lotus petals, eucalyptus leaves, constellation stars, temple bells).

---

## 4. Shared Animation Primitives System (`lib/animations/`)

All template motions are built from composable Framer Motion (`motion/react`) and GSAP primitives:

```
lib/animations/
├── primitives/
│   ├── FadeIn.tsx           # Opacity transition with custom easing
│   ├── SlideUp.tsx          # Viewport-triggered vertical entrance
│   ├── ScaleIn.tsx          # Spring-based scale entrance
│   ├── StaggerContainer.tsx # Orchestrates children with stagger timing
│   ├── ParallaxLayer.tsx    # Scroll-linked multi-speed translation
│   └── TextReveal.tsx       # Character and word-level masked reveals
└── openings/
    ├── GateSplit.tsx        # 3D dual panel horizontal parting
    ├── EnvelopeUnfold.tsx   # 3D flap unroll with wax seal pop
    ├── CurtainRise.tsx      # Vertical drape rise with light flare
    └── VeilLift.tsx         # Sheer fabric wind-lift physics
```

---

## 5. Normalized Wedding Data Model

```typescript
export interface WeddingData {
  id: string;
  slug: string;
  templateId: string;
  
  // Core Couple Information
  brideName: string;
  groomName: string;
  weddingDate: string; // ISO date string
  weddingTime: string;
  
  // Venue
  venueName: string;
  venueAddress: string;
  venueLat?: number;
  venueLng?: number;
  
  // Media Assets
  heroImageUrl?: string;
  slideshowImages: string[];
  musicTrack: string;
  
  // Multi-Day Ceremonies
  events: Array<{
    name: string; // "Mehendi", "Sangeet", "Wedding", "Reception", "Walima"
    date: string;
    time: string;
    venue: string;
    address?: string;
    dressCode?: string;
    description?: string;
  }>;
  
  // Story & Personalization
  story?: {
    headline: string;
    narrative: string;
    milestones?: Array<{ year: string; title: string; story: string }>;
  };
  
  // Options
  showDressCode: boolean;
  showTransport: boolean;
  languages: string[];
}
```

---

## 6. Directory Structure for Specifications

```
design/
├── README.md                 # Master Architecture & Template Index (this file)
├── royal-lotus.md            # Royal Rajasthani Palace Gate Template
├── crimson-royale.md         # Crimson Velvet Envelope Template
├── whispering-leaves.md      # Botanical Sage Minimalist Template
├── grand-celebration.md      # Festive Marigold Sangeet Curtain Template
├── royal-blush.md            # Pastel Rose Gold Ribbon Template
├── emerald-royale.md         # Peacock Darbar Emerald Gate Template
├── midnight-luxe.md          # Celestial Black Tie Obsidian Template
├── azure-dreams.md           # Santorini Coastal Blue Shutter Template
├── khatim.md                 # Islamic Arabesque 8-Point Star Gate Template
├── emerald-qasr.md           # Mughal & Ottoman Palace Qasr Template
├── zaytoon.md                # Mediterranean Olive Grove Scroll Template
├── noor-e-nikah.md           # Luminous Divine Light Nikah Template
├── reshm-e-noor.md           # Royal Silk Brocade Tapestry Template
├── south-mandapam.md         # Traditional Dravidian Temple Mandapam Template
├── anand-karaj.md            # Sacred Sikh Gurdwara Velvet Drapes Template
├── scarlet-stamp.md          # Vintage Airmail Wax Stamp Template
├── golden-noir.md            # Art Deco Gatsby 24K Gold Fan Template
├── gilded-veil.md            # Haute Couture Translucent Veil Template
└── azure-royale.md           # Jodhpur Blue Palace Archway Template
```
