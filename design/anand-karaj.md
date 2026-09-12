# Template Specification: Anand Karaj

## 1. TEMPLATE OVERVIEW
- **Template Name:** Anand Karaj
- **Template ID:** `TPL-SIK-01`
- **Slug:** `anand-karaj`
- **Category:** Sikhism
- **Religious / Cultural Category:** Sacred Gurdwara Heritage / Palki Sahib Grandeur
- **Price / Tier:** ₹1,299
- **Reference URL:** [https://saveourdate.in/templates/anand-karaj](https://saveourdate.in/templates/anand-karaj)
- **Live Demo URL:** [https://saveourdate.in/templates/anand-karaj/live](https://saveourdate.in/templates/anand-karaj/live)

### Design Language & Visual Direction
- **Visual Direction:** Royal Navy & Saffron Gold / Golden Floral Jali / Palki Sahib Filigree & Khanda Emblem
- **Primary Mood:** Divine / Sacred / Majestic / High Spirited (Chardi Kala)
- **Visual Density:** High (Golden Gurmukhi script accents, intricate floral jali, velvet navy textures)
- **Animation Intensity:** High (Royal Navy & Saffron velvet drapes parting, shimmering golden Khanda reveal, Gurbani audio unlock)
- **Color Palette Breakdown:**
  - Primary Background: `#0A1931`
  - Secondary Tone: `#FFFFFF`
  - Accent Color: `#D4AF37`
  - Dark Accent: `#FF7700`
  - Neutral Dark / Text: `#040B17`
  - Card Glass Surface: `rgba(10, 25, 49, 0.95)`
- **Typography Matrix:**
  - Display Headline: `Cinzel Decorative, serif`
  - Subheadings: `Playfair Display, serif`
  - Body Text: `Lato / Montserrat, sans-serif`
  - Accent Calligraphy: `Alex Brush, cursive`

---

## 2. COMPLETE USER EXPERIENCE
The end-to-end guest journey for **Anand Karaj** follows this sequence:

1. **Initial Page Load:** Full-viewport branded staging layer with delicate background motif and pulsing hint.
2. **Opening Screen Presentation:** The custom **Royal Saffron & Navy Velvet Drapes Parting with Golden Khanda Emblem Shimmer** covers the entire screen, preventing accidental content leak while awaiting user gesture.
3. **User Interaction:** Guest taps or clicks the centered pulsing badge (*"Tap to Open"* / *"Unfold Invitation"*).
4. **Interactive Door/Curtain/Envelope Animation:** High-performance Framer Motion / GSAP animation parts the opening element, unlocks the web audio context, and begins ambient background music.
5. **Hero Section Entrance:** The opening layer fades out (z-index drops), revealing the hero couple monogram, couple names with stagger entrance, and wedding date.
6. **Smooth Downward Scroll:** Guest scrolls down at their own pace; floating decorative elements (Floating Golden Floral Petals, Khanda Light Shimmer & Soft Saffron Mist) subtly drift across the screen.
7. **Invocation & Welcome:** Traditional or personal blessing statement appears with soft scale-and-fade animation.
8. **Couple Story / Love Milestones:** Interactive story cards reveal photos and narrative text with staggered viewport triggers.
9. **Ceremonies & Timeline:** Dynamic multi-event schedule with dress codes, venue addresses, and Google Map CTA buttons.
10. **Auspicious Muhurat / Big Day Countdown:** Live ticking countdown timer displaying Days, Hours, Minutes, Seconds with animated digit transitions.
11. **Curated Photo Gallery:** Interactive grid or slider with image zoom lightbox and swipe support on mobile devices.
12. **Venue & Navigation:** Embedded interactive Google Map with 1-tap "Get Directions" navigation launcher.
13. **Guest RSVP & Blessings:** Multi-event attendance form with guest count counter, dietary options, and guestbook message submission.
14. **Viral Growth & Footer:** Confirmation modal and subtle referral banner encouraging guests to create their own invitation on Unfold.

---

## 3. INITIAL LOADING STATE
- **Loading Screen Visuals:** Minimalist full-screen container colored in `#0A1931` with a subtle radial gradient glow (`#D4AF37` at 15% opacity).
- **Loader Mechanism:** Centered SVG monogram with a rotating or pulsating golden ring (`scale: [0.95, 1.05]`, duration `1.8s`, easing `easeInOut`).
- **Initial State Trigger:** Mounted immediately on Next.js initial client render.
- **Layering & Z-Index:** `z-index: 100` covering all underlying DOM elements.
- **Exit Behavior:** Smooth opacity fade (`opacity: 1 -> 0`, duration `0.6s`) with `pointer-events: none` once fonts, hero images, and audio metadata are preloaded.
- **Timing Observation:** *Approximate / visually inferred: ~400ms - 800ms* depending on device network speed.

---

## 4. OPENING EXPERIENCE
- **Opening Mechanism:** Royal Saffron & Navy Velvet Drapes Parting with Golden Khanda Emblem Shimmer
- **Initial Visual State:**
  - Split panels or layered envelope flaps positioned over the viewport at `z-index: 50`.
  - Intricate decorative borders matching the **Anand Karaj** visual aesthetic (`#D4AF37` metallic filigree).
  - Centered interactive seal/button displaying a subtle breath animation (`scale: [1, 1.06, 1]` over `2.4s`).
- **User Gesture & Audio Bypass:**
  - Tapping the seal immediately calls `audio.play()` within the explicit user event context, successfully bypassing iOS Safari and Google Chrome autoplay restrictions.
- **Animation Choreography (Framer Motion / GSAP):**
  - **Phase 1 (0ms - 300ms):** Seal scales up to `1.15` and emits a burst of golden particle rays (`opacity: 1 -> 0`, `scale: 1 -> 2.5`).
  - **Phase 2 (300ms - 1200ms):** The primary left panel translates `translateX(-100%)` / right panel translates `translateX(100%)` (or vertical envelope unfold `rotateX(-180deg)`). Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple spring ease).
  - **Phase 3 (800ms - 1500ms):** Hero section beneath scales from `0.92` to `1.0` and fades in from `opacity: 0` to `1.0`.
  - **Phase 4 (1500ms):** Opening layer is unmounted or set to `display: none` to free GPU memory.

---

## 5. FLOATING / DECORATIVE ELEMENTS
- **Active Decorative Elements:** Floating Golden Floral Petals, Khanda Light Shimmer & Soft Saffron Mist
- **DOM Placement & Physics:**
  - Placed in a fixed, non-interactive overlay container (`pointer-events: none`, `z-index: 15`).
  - Rendered via 8–14 lightweight SVG/Canvas particle nodes.
- **Movement Parameters:**
  - **Velocity:** Drift speed between `15px/s` and `35px/s`.
  - **Trajectory:** Gentle sinusoidal wave motion (`Math.sin(time) * 20px`) combined with vertical descent/ascent.
  - **Rotation:** Continuous slow 3D tumbling rotation (`rotateZ: 0 -> 360deg` over `12s - 20s`).
  - **Opacity:** Variable between `0.35` and `0.75` with soft edge blurring (`filter: blur(0.5px)`).
- **Responsive Handling:** Reduced particle count on mobile screens (4–6 nodes) to conserve mobile battery and prevent frame drops.

---

## 6. HERO SECTION
- **Layout Structure:** Full-screen viewport (`min-h-[100svh]`) centered layout with vertical flex alignment.
- **Decorative Framing:** Scalloped architectural frame and hairline borders with ornate corner flourishes.
- **Content Hierarchy:**
  1. **Top Eyebrow:** Auspicious blessing / Tagline in uppercase tracking `0.25em` (`Playfair Display, serif`).
  2. **Couple Monogram / Emblem:** Centered crest featuring stylized initials.
  3. **Bride & Groom Names:** Large serif display typography (`Cinzel Decorative, serif`), colored in `#FF7700` or `#FFFFFF`, separated by an artistic ampersand (`&`) or infinity knot.
  4. **Wedding Date & Location:** Refined date badge and venue city with gold divider lines.
  5. **Scroll Indicator:** Subtle bouncing chevron or mouse icon at the bottom edge.
- **Entrance Animation Sequence:**
  - Top Eyebrow: `translateY(20px) -> 0`, `opacity: 0 -> 1` (delay `0.2s`).
  - Bride Name: `translateX(-30px) -> 0`, `opacity: 0 -> 1` (delay `0.4s`).
  - Ampersand: `scale: 0 -> 1`, `rotate: -15deg -> 0deg` (delay `0.55s`).
  - Groom Name: `translateX(30px) -> 0`, `opacity: 0 -> 1` (delay `0.7s`).
  - Date & Location: `translateY(20px) -> 0`, `opacity: 0 -> 1` (delay `0.9s`).

---

## 7. SECTION-BY-SECTION ANALYSIS

### Section 1: Hero & Blessing
- **Purpose:** Make an immediate emotional impact and present the couple's names and core date.
- **Visuals:** Double-bezel framed hero card, radial background glow, and serif typography.

### Section 2: Sacred Invocation / Sloka / Story Prelude
- **Purpose:** Establish cultural or romantic resonance with a dedicated quote or mantra.
- **Visuals:** Centered typography with gilded floral dividers top and bottom.

### Section 3: Couple Story / How We Met
- **Purpose:** Share the couple's journey, milestones, and personal connection.
- **Visuals:** Alternating photo-and-text cards or chronological timeline with curved connecting lines.

### Section 4: Celebrations & Event Schedule
- **Purpose:** Present all multi-day ceremonies (Haldi, Mehendi, Sangeet, Wedding, Reception).
- **Visuals:** Card grid with event date, time, venue address, dress code badge, and "Add to Calendar" button.

### Section 5: Auspicious Muhurat Countdown
- **Purpose:** Build excitement and provide an exact real-time counter to the main ceremony.
- **Visuals:** 4-column glassmorphic counter boxes (Days, Hours, Minutes, Seconds) with metallic gold borders.

### Section 6: Photo Gallery / Moments
- **Purpose:** Showcase engagement portraits, pre-wedding shoot, and candid memories.
- **Visuals:** Masonry grid with hover zoom effect and full-screen lightbox modal.

### Section 7: Venue Map & Travel Guide
- **Purpose:** Provide seamless physical navigation for out-of-town and local guests.
- **Visuals:** Custom-styled Google Map iframe container with physical address, parking info, and "Open in Maps" CTA.

### Section 8: RSVP & Guest Wishes Form
- **Purpose:** Collect real-time attendance confirmations and blessings.
- **Visuals:** Multi-step or accordion form with radio selectors per event, guest count slider, and text area for blessings.

### Section 9: Footer & Viral Referral
- **Purpose:** Elegant closing sign-off and subtle Unfold brand badge.
- **Visuals:** Centered couple initials, love tagline, and non-intrusive "Create your digital invitation" button.

---

## 8. SCROLL ANIMATION ANALYSIS

| Target Element | Scroll Trigger Position | Initial CSS State | Animated CSS State | Duration & Easing | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Section Headers** | `top 85%` viewport | `opacity: 0; transform: translateY(35px)` | `opacity: 1; transform: translateY(0)` | `0.7s`, `easeOutCubic` | Smooth section introduction |
| **Floral Dividers** | `top 80%` viewport | `opacity: 0; transform: scaleX(0)` | `opacity: 1; transform: scaleX(1)` | `0.9s`, `easeOutExpo` | Architectural framing |
| **Event Cards** | `top 75%` viewport | `opacity: 0; transform: translateY(40px)` | `opacity: 1; transform: translateY(0)` | `0.6s`, stagger `0.15s` | Rhythm in multi-card lists |
| **Countdown Tiles** | `top 80%` viewport | `opacity: 0; transform: scale(0.9)` | `opacity: 1; transform: scale(1)` | `0.5s`, `spring(100, 10)` | Punchy numerical reveal |
| **Gallery Images** | `top 80%` viewport | `opacity: 0; filter: blur(4px)` | `opacity: 1; filter: blur(0)` | `0.8s`, stagger `0.1s` | Cinematic photo fade-in |
| **RSVP Form Container**| `top 75%` viewport | `opacity: 0; transform: translateY(50px)` | `opacity: 1; transform: translateY(0)` | `0.8s`, `easeOutQuart` | Clear focal entry |

---

## 9. PARALLAX ANALYSIS
- **Background Layer Parallax:** Fixed radial gradient and background texture move at `0.15x` scroll speed.
- **Floating Decorative Elements:** Petals and gold particles move at `0.45x - 0.7x` scroll speed, creating true three-dimensional depth.
- **Card Overlap Parallax:** Event and story cards feature slight vertical translation offsets (`y: [-20px, 20px]`) relative to viewport scroll progress.

---

## 10. IMAGE ANIMATIONS
- **Hero Image:** Subtle Ken Burns slow zoom (`scale: 1.0 -> 1.08` over `18s` continuous loop).
- **Gallery Grid Images:** Hover state scales image to `1.05` with soft golden shadow elevation (`box-shadow: 0 16px 32px rgba(212, 175, 55, 0.25)`).
- **Lightbox Transition:** Fullscreen overlay expands from clicked thumbnail bounding rect with spring physics (`damping: 25, stiffness: 200`).

---

## 11. TYPOGRAPHY ANIMATIONS
- **Serif Headlines:** Character or word-based stagger reveal (`staggerChildren: 0.04s`) with `translateY(100%) -> 0` masked inside an `overflow: hidden` line wrapper.
- **Calligraphic Script Accents:** SVG stroke-dasharray drawing animation for ampersands and flourishes (`strokeDashoffset: 1000 -> 0`).
- **Body & Captions:** Clean opacity and line-height expansion (`opacity: 0 -> 1`, `line-height: 1.4 -> 1.6`).

---

## 12. GALLERY SYSTEM
- **Desktop Layout:** 3-column balanced masonry grid with rounded corners (`rounded-2xl`) and gold border trims.
- **Mobile Layout:** Horizontal swipeable carousel with active dot indicators or 2-column compact grid.
- **Lightbox Capabilities:** Pinch-to-zoom on mobile, keyboard arrow navigation, swipe-to-dismiss, and high-res image progressive loading.

---

## 13. COUNTDOWN
- **Layout & Units:** 4 circular or arched tiles (Days, Hours, Minutes, Seconds).
- **Digit Animation:** Flip-down card or vertical rolling counter (`translateY(-100% -> 0)`) whenever a digit changes.
- **State Handling:** Displays a celebratory live banner (*"The Celebrations Have Begun!"*) once the target timestamp passes.

---

## 14. EVENT SECTION
- **Architecture:** Responsive card grid or vertical milestone timeline.
- **Content Fields per Event:**
  - Event Name (e.g. *Sangeet & Cocktail*)
  - Auspicious Date & Time
  - Venue Name, Hall/Lawn details, and full address
  - Dress Code / Attire theme tag (e.g. *Traditional Indian Glamour*)
  - Direct *"Add to Google Calendar / iCal"* and *"Directions"* CTAs.

---

## 15. VENUE / MAP
- **Map Integration:** Embedded Google Maps container styled with custom warm stone/monochrome map skin matching `#0A1931`.
- **Action Buttons:** 1-tap navigation button launching native Google Maps / Apple Maps / Waze with pre-filled coordinates.
- **Transport & Valet Details:** Collapsible card showing parking availability, shuttle timings, and venue landmarks.

---

## 16. RSVP
- **Form Architecture:** Clean interactive form supporting single or multi-event RSVPs.
- **Fields:**
  - Guest Full Name
  - Attendance Selection per Event (*Attending* / *Regretfully Cannot Attend*)
  - Number of Accompanying Adults & Children
  - Dietary Preferences (Vegetarian, Jain, Vegan, No Restrictions)
  - Wishes & Blessings Text Area
- **Validation & Feedback:** Zod schema validation, optimistic submit state with spinning gold loader, and instant celebratory success modal.

---

## 17. AUDIO / MUSIC
- **Audio Control:** Floating circular music pill in bottom-right corner with rotating disc icon and pulsing audio wave equalizer bars.
- **Autoplay Handling:** Activated seamlessly upon the initial opening tap gesture.
- **State Control:** 1-tap pause/play toggle, muted indicator on tab blur, and smooth volume ramp down when closing.

---

## 18. NAVIGATION
- **Header Structure:** Floating glassmorphic navbar with couple monogram and quick section anchor links (Story, Events, Gallery, Venue, RSVP).
- **Scroll Spy:** Highlights the currently active section as the guest scrolls.
- **Mobile Drawer:** Full-screen slide-down menu with staggered links and touch-friendly tap targets.

---

## 19. MICRO-INTERACTIONS
- **Buttons:** Magnetic cursor pull on desktop, subtle button-in-button icon shift on hover, and haptic spring press on mobile (`scale: 0.96`).
- **Cards:** Lift on hover (`translateY(-6px)`) with glowing metallic gold border transition.
- **Form Inputs:** Active floating labels and shimmering gold outline focus rings (`ring-2 ring-[#D4AF37]`).

---

## 20. TRANSITIONS BETWEEN SECTIONS
- **Transition Separators:** Elegant SVG filigree arches, wave dividers, and gradient color bleeds.
- **Continuity:** Consistent background noise texture and continuous floating particles spanning across section boundaries.

---

## 21. RESPONSIVE BEHAVIOR
- **Desktop (1024px+):** Full multi-column grid, generous whitespace, hover states, and smooth cursor parallax.
- **Tablet (768px - 1023px):** 2-column event and gallery layouts, adapted font sizes.
- **Mobile (< 768px):** Single-column stacked layout, touch-optimized swipe carousels, enlarged `48px` minimum tap targets, and reduced particle density.

---

## 22. ACCESSIBILITY CONSIDERATIONS
- **Contrast Ratios:** Minimum `4.5:1` text contrast against background for all body and informational copy.
- **Reduced Motion:** Fully honors `prefers-reduced-motion: reduce` by substituting smooth opacity fades for heavy translations and rotations.
- **Screen Reader Support:** Semantic HTML (`<main>`, `<section>`, `<header>`, `<article>`), descriptive `aria-labels`, and accessible form labels.

---

## 23. PERFORMANCE CONSIDERATIONS
- **Asset Optimization:** WebP image formats with `next/image` responsive srcset and priority preloading on hero assets.
- **Bundle Efficiency:** Dynamic imports for heavy components (Google Map, Lightbox, Scratch Card).
- **GPU Acceleration:** Strict use of `transform` and `opacity` for all scroll and gesture animations (`will-change: transform`).

---

## 24. REUSABLE VS TEMPLATE-SPECIFIC LOGIC

### Shared Platform Components
- `<CountdownTimer />`
- `<GoogleMapEmbed />`
- `<GuestMessageForm />` (RSVP engine)
- `<MusicPlayer />`
- `<PhotoSlideshow />` & Lightbox
- `<LanguageToggle />`

### Shared Animation Primitives
- `<FadeIn />`
- `<SlideUp />`
- `<ScaleIn />`
- `<ParallaxContainer />`
- `<TextReveal />`

### Template-Specific Components
- `<AnandKarajOpening />` (Custom Royal Saffron & Navy Velvet Drapes Parting with Golden Khanda Emblem Shimmer)
- `<AnandKarajHero />`
- `<AnandKarajDecorations />`

---

## 25. TEMPLATE DATA MODEL

```typescript
export interface WeddingData {
  brideName: string;
  groomName: string;
  weddingDate: string; // ISO format
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  venueCoordinates: { lat: number; lng: number };
  heroImageUrl?: string;
  galleryImages: Array<{ url: string; caption?: string }>;
  musicTrackUrl: string;
  events: Array<{
    id: string;
    name: string;
    date: string;
    time: string;
    venue: string;
    dressCode?: string;
    description?: string;
  }>;
  story?: {
    title: string;
    narrative: string;
    milestones: Array<{ year: string; title: string; description: string }>;
  };
}
```

---

## 26. CUSTOMIZATION MAPPING

| Element | User Data | Template Config | Theme Config | Fixed System |
| :--- | :---: | :---: | :---: | :---: |
| **Bride & Groom Names** | ✅ | ❌ | ❌ | ❌ |
| **Wedding Dates & Timings** | ✅ | ❌ | ❌ | ❌ |
| **Opening Mechanism Visual** | ❌ | ✅ | ❌ | ❌ |
| **Color Tokens (Gold/Primary)**| ❌ | ❌ | ✅ | ❌ |
| **Typography Family** | ❌ | ❌ | ✅ | ❌ |
| **Event Itinerary List** | ✅ | ❌ | ❌ | ❌ |
| **Floating Particles Physics** | ❌ | ✅ | ❌ | ❌ |
| **RSVP Engine Submission API** | ❌ | ❌ | ❌ | ✅ |
| **Photo Gallery Assets** | ✅ | ❌ | ❌ | ❌ |

---

## 27. TEMPLATE CONFIGURATION PROPOSAL

```typescript
export const anand_karaj_Config = {
  templateId: "TPL-SIK-01",
  slug: "anand-karaj",
  name: "Anand Karaj",
  category: "Sikhism",
  theme: {
    colors: {
      primary: "#0A1931",
      secondary: "#FFFFFF",
      accent: "#D4AF37",
      darkAccent: "#FF7700",
      neutralDark: "#040B17",
      cardBg: "rgba(10, 25, 49, 0.95)",
    },
    typography: {
      display: "Cinzel Decorative, serif",
      subheading: "Playfair Display, serif",
      body: "Lato / Montserrat, sans-serif",
      accentScript: "Alex Brush, cursive",
    },
  },
  opening: {
    type: "curtain-reveal",
    autoPlayAudio: true,
    animationDuration: 1.2,
  },
  decorations: {
    floatingElements: "Floating Golden Floral Petals, Khanda Light Shimmer & Soft Saffron Mist",
    particleCount: { desktop: 12, mobile: 6 },
  },
  sections: [
    { type: "hero", visible: true },
    { type: "invocation", visible: true },
    { type: "story", visible: true },
    { type: "events", visible: true },
    { type: "countdown", visible: true },
    { type: "gallery", visible: true },
    { type: "venue", visible: true },
    { type: "rsvp", visible: true },
    { type: "footer", visible: true },
  ],
};
```

---

## 28. ASSET INVENTORY
- **Decorative SVGs:**
  - Arch frames: `/templates/anand-karaj/assets/arch-frame.svg`
  - Floral corner motifs: `/templates/anand-karaj/assets/corner-flourish.svg`
  - Seal / Monogram frame: `/templates/anand-karaj/assets/seal-crest.svg`
  - Divider flourishes: `/templates/anand-karaj/assets/divider.svg`
- **Audio Assets:**
  - Ambient soundtrack: `/templates/anand-karaj/audio/ambient-track.mp3`
- **Licensing & Asset Strategy:** Custom crafted clean SVG paths and royalty-free instrumental recordings to ensure full legal independence.

---

## 29. SCREENSHOT / VISUAL REFERENCE PLAN
- `01-initial-gate.png`: Initial locked viewport state with "Royal Saffron & Navy Velvet Drapes Parting with Golden Khanda Emblem Shimmer" prompt.
- `02-opening-transition.png`: Mid-point animation showing panels parting / envelope unfolding.
- `03-hero-section.png`: Full hero reveal with couple monogram, typography, and date badge.
- `04-events-timeline.png`: Multi-day ceremony cards with dress codes and timings.
- `05-countdown-muhurat.png`: Live countdown timer display.
- `06-gallery-grid.png`: Photo gallery layout with hover elevation.
- `07-rsvp-form.png`: Interactive guest attendance form.
- `08-mobile-view.png`: Mobile viewport layout and touch controls.

---

## 30. IMPLEMENTATION RECOMMENDATION
- **Recommended Opening Component:** `<AnandKarajOpening />` using Framer Motion spring orchestration.
- **Recommended Hero Component:** `<AnandKarajHero />` with staggered serif text reveals.
- **Animation Engine:** `motion/react` for layout animations and React-safe GSAP for complex 3D door rotations.
- **Shared Components:** Reusable core widgets (`CountdownTimer`, `GuestMessageForm`, `GoogleMapEmbed`, `PhotoSlideshow`, `MusicPlayer`).
- **Template Architecture:** Driven purely by normalized `WeddingData` and template configuration (`anand_karaj_Config`).
