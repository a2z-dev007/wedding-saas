# Spec & PRD: Unfold (unfoldwed.com) — Digital Wedding Invitation Platform

## 1. Objective & User Stories

### Vision & Value Proposition
Unfold is a premium, high-interaction SaaS platform targeting the Indian market and global South Asian diaspora. It enables engaged couples to purchase a single, high-end, mobile-optimized, animated wedding invitation webpage for a one-time fee (₹799–₹1299). 

The platform replaces generic, slow, wasteful paper/PDF invitations with immersive digital storytelling—utilizing dramatic opening reveals, haptic interactions, ambient soundscapes, and integrated guest RSVPs.

---

## 2. Core Product Features (Prioritized Discovery Features)

### A. Tap-to-Unfold Audio Bypass Gesture
* **Context**: Modern mobile browsers (iOS Safari, Chrome) block background music (`AudioContext`) from auto-playing without a user gesture.
* **Solution**: The live invitation launches with a full-screen dynamic cover curtain/door overlay showing a subtle pulse prompt: *"Tap to Open"*. Tapping this element registers the user gesture, initializes the audio API, and simultaneously triggers the 3D door/curtain unfolding reveal.

### B. Multi-Event Dynamic RSVP
* **Context**: Indian weddings typically span multiple days and ceremonies (Haldi, Sangeet, Wedding, Reception) with differing guest lists.
* **Solution**: The invitation customization form lets couples toggle individual events. Guests can RSVP separately for each enabled event (e.g., Sangeet: *Yes/No*, Wedding: *Yes/No*) inside a clean checkbox/radio panel, tracking guest counts per event.

### C. Zero-Friction Live Sandbox Customizer
* **Context**: Forcing sign-up/payment too early leads to high cart abandonment.
* **Solution**: A client-side sandbox customizer (`/templates?customizer=true`) that lets couples type their names, select background colors, and see templates adjust in real time *before* prompting payment or account creation.

### D. PWA Offline Venue Access
* **Context**: Wedding venues (resorts, halls, farmhouses) frequently suffer from poor cellular network coverage.
* **Solution**: A lightweight Service Worker caches the couple's invite page details, Google Map coordinates, itineraries, and contact numbers. When guests arrive at the venue, the page remains readable offline.

### E. Viral RSVP Referral Loop
* **Context**: Every guest opening the invitation is a potential future customer.
* **Solution**: After a guest successfully submits their RSVP, a elegant, non-intrusive modal appears saying: *"Loved Priya & Arjun's digital invitation? Create yours on Unfold in 5 minutes."* with a CTA button directing to `/templates`.

---

## 3. Tech Stack

| Layer | Technology | Specification / Version |
|---|---|---|
| **Core Framework** | Next.js 16 | React 19, App Router (SSR/ISR for fast invitation pages) |
| **Styling** | Tailwind CSS v4 | Native CSS nesting, modern theme config |
| **Motion/Animation** | Motion (Framer Motion) | `motion/react` for entry/exit, physics springs, magnetic hovers |
| **Database ORM** | Prisma | PostgreSQL interface |
| **Database Provider** | Supabase | Managed Serverless PostgreSQL |
| **Authentication** | Auth.js (NextAuth) | Nodemailer Magic Link (Email OTP) + Google OAuth |
| **Media Uploads** | Cloudinary | Auto-optimized photo slideshows & hero uploads |
| **Transactional Email**| Nodemailer | Transactional notifications & auth emails via custom SMTP |
| **Payment Gateway** | Razorpay SDK | Optimized for UPI, Netbanking, Cards (India market focus) |
| **Iconography** | Phosphor Icons | `@phosphor-icons/react` (Light stroke weight: `1.5`) |

---

## 4. UI/UX & Design Taste Standards (Light Premium Atelier)

**Design North Star:** [The Digital Yes](https://www.thedigitalyes.com/) — editorial wedding atelier, light ivory canvas, cinematic scroll storytelling, and motion that feels handcrafted rather than templated.

We mandate a custom-tailored creative archetype rather than standard SaaS templates.

### 4.1 Brand Vibe & Color System

* **Primary Mode:** Light premium only on marketing surfaces. Ivory canvas (`#FCFBF7`), warm stone neutrals (`#F5F3EF`, `#E8E4DC`), deep emerald ink (`#082F27`), and antique gold accents (`#C59B27` / `#B89730`).
* **Atmosphere:** Soft radial glow orbs (emerald + gold at 15–25% opacity), fine hairline borders (`border-black/[0.04]`), and subtle paper-grain texture overlays on hero sections.
* **Dark Mode:** Reserved for invitation templates and dashboard — not the primary marketing experience.
* **Accent Usage:** Gold for italics, badges, star ratings, and hover states. Emerald for CTAs, nav active states, and trust banners.

### 4.2 Typography Hierarchy

| Role | Font | Treatment |
|------|------|-----------|
| Display headlines | Cormorant Garamond (serif) | `text-5xl md:text-7xl`, `tracking-tight`, `leading-[1.05]` |
| Italic emphasis | Cormorant Garamond italic | Gold color, `leading-[1.1]` to prevent descender clip |
| Section titles | Cormorant Garamond | `text-3xl md:text-5xl`, sentence case |
| Eyebrows | Geist sans | `text-[10px] uppercase tracking-[0.2em] font-bold text-accent-gold` |
| Body | Geist sans | `text-sm`, `max-w-[65ch]`, `text-stone-500` |
| Labels / mono | Geist Mono | Form labels, step numbers, pricing footnotes |

### 4.3 Page Architecture (Landing & Marketing)

Every public page follows this scroll narrative on `/`:

1. **Hero** — Full viewport. Rotating multilingual "I do" marquee (Hindi, English, Tamil, Urdu, Bengali, etc.). Serif headline + dual CTA. Trust strip (rating · weddings · reviews).
2. **How It Works** — Three numbered steps with scroll-linked active state. Desktop: sticky step panel + animated phone preview. Mobile: vertical accordion cards.
3. **Real Weddings Showcase** — Horizontal scroll or bento grid of couple cards. Each card: gradient preview, couple names, plan badge, tap-to-preview CTA.
4. **Features ("Every Detail")** — Alternating full-width feature rows with illustration mockups. Free badges on included features (envelope, RSVP, export).
5. **Template Catalogue Preview** — Filter tabs (All · Best Sellers · New · Exclusive). Card grid with hover lift + gold border glow.
6. **Paper vs Digital** — Comparison table with highlighted Unfold column.
7. **Social Proof** — Dark emerald trust banner + testimonial grid with star ratings.
8. **Pricing** — Two-tier cards (Classic ₹1199 / Royal ₹1499) with feature diff list.
9. **FAQ** — Accordion with spring height animation.
10. **Final CTA** — Arch SVG decoration + heart icon pulse + primary button.

**Secondary pages** (`/about`, `/contact`, `/templates`, legal) share:
- `PageHero` component (eyebrow + serif title)
- Consistent `pt-28` offset for fixed nav
- Same card, form, and button primitives

### 4.4 Component Primitives

* **Double-Bezel Card:** Concentric nested borders — outer shell `rounded-[2rem] p-1.5 border border-black/[0.04] bg-black/[0.02]`, inner `rounded-[calc(2rem-0.375rem)] bg-white`.
* **Premium Button:** Pill CTA with nested circular icon that translates diagonally on hover (button-in-button architecture).
* **Glass Nav:** Fixed top pill, `backdrop-blur-xl`, scroll-aware opacity reduction, mobile slide-down menu.
* **Section Header:** Reusable eyebrow + title + optional subtitle block.
* **Language Marquee:** Infinite horizontal scroll of "I do" phrases in world languages with fade masks on edges.
* **Ambient Background:** Positioned glow orbs + optional decorative corner gold brackets.

### 4.5 Animation System (Motion v12)

All animations use `motion/react` with these standards:

| Pattern | Spec |
|---------|------|
| Page enter | `opacity: 0 → 1`, `y: 24 → 0`, duration `0.7s`, ease `[0.32, 0.72, 0, 1]` |
| Stagger children | `staggerChildren: 0.08`, `delayChildren: 0.1` |
| Scroll reveal | `whileInView`, `viewport: { once: true, margin: "-80px" }` |
| Card hover | `y: -4`, `scale: 1.01`, spring `stiffness: 300, damping: 20` |
| Step indicator | Active step scales `1.05`, inactive `0.95`, opacity fade |
| Marquee | CSS `@keyframes marquee` 40s linear infinite |
| FAQ accordion | `height: auto` with spring, chevron rotate 180° |
| Reduced motion | Wrap all infinite animations in `@media (prefers-reduced-motion: reduce)` fallbacks |

**Performance guardrails:**
- No animation on LCP hero text (use CSS only for marquee)
- Lazy-mount below-fold sections with `whileInView`
- Max 3 simultaneous infinite animations per viewport

### 4.6 Anti-Slop Guardrails

* **Hero:** Fits initial viewport. Headline max 2 lines. Subtext max 25 words.
* **Eyebrow restraint:** Max 1 uppercase eyebrow per 3 sections.
* **Section variety:** Never repeat the same layout family twice in a row (split → grid → marquee → table).
* **Contrast:** All form inputs, placeholders, and buttons pass WCAG AA (4.5:1).
* **No stock SaaS patterns:** No purple gradients, no generic "Features" icon grid without context, no auto-playing video backgrounds.
* **WhatsApp-first copy:** CTAs and feature copy emphasize one-tap WhatsApp sharing for the Indian market.

---

## 5. Database Schema Updates (For Multi-Event RSVPs)

```sql
-- Extended database models supporting Multi-Event RSVPs
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  slug TEXT UNIQUE NOT NULL,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  
  -- Multi-event toggles & schedules
  events_json JSONB DEFAULT '[{"name":"Wedding","enabled":true,"venue":"","time":""}]', 
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE guest_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id),
  guest_name TEXT NOT NULL,
  message TEXT,
  
  -- Detailed RSVP responses per event
  -- Structured as: {"Wedding": {"attending": true, "guests": 2}, "Sangeet": {"attending": false, "guests": 0}}
  rsvp_json JSONB DEFAULT '{}', 
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Commands

```bash
# Development server
npm run dev

# Production build validation
npm run build

# Linting and automatic formatting
npm run lint
npm run format

# Run tests
npm test

# Prisma database migration (dev/prod)
npx prisma migrate dev
npx prisma migrate deploy
```

---

## 7. Project Structure

```
/
├── app/                                 # Next.js App Router (RSC by default)
│   ├── (public)/                        # Landing, templates gallery, static pages
│   │   ├── page.tsx                     # Unfold primary Landing Page
│   │   ├── templates/page.tsx           # Interactive templates grid
│   │   ├── about/page.tsx
│   │   └── terms/page.tsx
│   ├── (auth)/                          # Authentication flow
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── [slug]/                          # Guest-facing live invitations at root path (ISR optimized)
│   │   └── page.tsx                     # Dynamic invitation renderer (e.g. unfoldwed.com/priya-arjun)
│   ├── preview/[templateId]/            # Interactive template live sandbox
│   │   └── page.tsx
│   ├── dashboard/                       # Couple management dashboard (Client Components)
│   │   ├── page.tsx                     # Overview panel (invitations, RSVPs)
│   │   ├── invitation/[id]/edit/page.tsx # Multi-step customizer form
│   │   └── account/page.tsx             # Account settings
│   └── api/                             # API routes (Auth, Orders, RSVPs, Uploads)
├── components/                          # Core UI components
│   ├── templates/                       # Invitation layout templates
│   │   ├── EmeraldNoir.tsx
│   │   ├── RoyalElegance.tsx
│   │   └── MughalEmerald.tsx
│   ├── ui/                              # High-end design system primitives
│   │   ├── double-bezel-card.tsx
│   │   ├── premium-button.tsx
│   │   └── glass-nav.tsx
│   └── invitation/                      # Interactive guest components
│       ├── ScratchReveal.tsx            # Date scratch card canvas
│       └── DoorReveal.tsx               # 3D door animation controller
├── lib/                                 # Shared utilities & database clients
│   ├── prisma.ts                        # Prisma Client singleton
│   ├── razorpay.ts                      # Razorpay order & signature verification
│   └── email.ts                         # Nodemailer transporter & transaction templates
├── prisma/                              # Database schema declarations
└── tests/                               # Integration & Unit tests
```

---

## 8. Code Style & Reference Snippets

### A. High-End Button Primitive (Button-in-Button Architecture)
All main triggers must leverage this magnetic pill style with an isolated kinetic trailing icon:

```tsx
"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import React from "react";

interface DoubleBezelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PremiumButton = React.forwardRef<HTMLButtonElement, DoubleBezelButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`group relative flex items-center justify-between gap-4 rounded-full bg-[#082F27] py-2 pl-6 pr-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#0c473b] active:scale-[0.98] ${className}`}
        {...props}
      >
        <span>{children}</span>
        <motion.div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowUpRight
            weight="light"
            className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          />
        </motion.div>
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";
```

### B. Double-Bezel Card Container (Hardware Aesthetics)
Avoid flat borders; cards must feel like layered plates:

```tsx
import React from "react";

interface DoubleBezelCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DoubleBezelCard({ children, className = "" }: DoubleBezelCardProps) {
  return (
    <div className={`rounded-[2rem] bg-black/5 p-1.5 border border-black/5 dark:bg-white/5 dark:border-white/5`}>
      <div className={`rounded-[calc(2rem-0.375rem)] bg-white dark:bg-[#0a0f0d] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${className}`}>
        {children}
      </div>
    </div>
  );
}
```

---

## 9. Testing Strategy

### Framework
* **Unit & Integration**: Jest + React Testing Library.
* **E2E Testing**: Playwright for verifying templates (3D opening gestures, canvas scratching, and Razorpay modal triggers).

### Test Levels & Locations
* Unit tests for helper utilities sit in `tests/unit/`.
* Mock integration tests for API handlers (RSVP collection, order creation) sit in `tests/integration/`.
* Page load performance checks (LCP < 2.5s) must be verified via Playwright tests in `tests/e2e/`.

---

## 10. Boundaries & Controls

* **Always**:
  * Verify payment signature cryptographically using SHA256 HMAC before marking an order as `paid` or generating an invitation slug.
  * Encapsulate client-only interactions (Framer Motion, Canvas API, audio controls) inside `'use client'` files.
  * Provide accessibility fallbacks for motion elements (`prefers-reduced-motion`).
* **Ask First**:
  * Modifying the schema mapping for SQL tables.
  * Adding any additional third-party dependencies not defined in the core stack.
* **Never**:
  * Expose sensitive environment variables (`RAZORPAY_KEY_SECRET`, `DATABASE_URL`) on client code pages.
  * Allow an invitation to be generated without verified order references in the database.

---

## 11. Success Criteria (Definition of Done)

* **Performance**: Landing page and public guest invitations must load in < 2.0s (LCP) with zero layout shifting (CLS < 0.1).
* **Payment Flow**: Couples are correctly redirected to the customization form only *after* Razorpay signature matches order amounts.
* **Responsive Fluidity**: Standard bento and grid layouts scale down automatically on viewports < 768px without horizontal scrolling.
* **Interactive Fidelity**: 3D door animation and canvas scratch card function smoothly on standard iOS Safari and Android Chrome without crashing memory limits.

---

## 12. Resolved Design Decisions & Open Questions

### Resolved Decisions
* **Authentication Strategy**: Passwordless Magic Links/Email OTP authentication powered by **Nodemailer** + Google OAuth.
* **Vanity Domain Slugs**: Configured at the root path level (e.g., `unfoldwed.com/priya-arjun`).
  * *Boundary*: To prevent route collision with static/functional app routes, Next.js middleware and router will exclude reserved path names (`/about`, `/templates`, `/login`, `/signup`, `/dashboard`, `/admin`, `/api/*`, etc.).

### Open Questions
> [!IMPORTANT]
> 1. **Music Delivery**: Do we provide royalty-free tracks, or can couples upload custom MP3 files (which requires strict GCS/Cloudinary bucket security rules and size limits)?
