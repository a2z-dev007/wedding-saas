# Crimson Royale — Complete Reverse Engineering & Implementation Specification

## 1. Template Overview

* **Template Name**: Crimson Royale
* **Slug / ID**: `crimson-royale` (Internal reference: `ivory-welcome`)
* **Category**: Royal Heritage / Luxury Indian & Classic Wedding Invitation
* **Reference Live URL**: `https://saveourdate.in/templates/crimson-royale/live`
* **Default Audio Track**: `/templates/crimson-royale/music.mp3`

---

## 2. Design Philosophy & Visual Identity

Crimson Royale is designed as a **regal royal court invitation**. It combines the timeless majesty of deep crimson velvet, opulent warm gold foils, delicate ivory parchment, and intricate royal crests.

### Core Visual Pillars:
1. **Initial Hero Background Selector**: Guests/users can select from 4 distinct royal backgrounds ("Default", "Lantern", "Love", "Hinduism") or switch between them dynamically.
2. **The Royal Dual Split-Door Gate Opening**: Dual-panel sliding door gate with gold border framing and bottom arch motifs. Features a glowing center wax seal button (`♥ TAP TO OPEN`). Tapping the seal triggers a 3D door-opening slide animation revealing the main invitation card and automatically starting the background music.
3. **Interactive "Save The Date" Scratch Card**: A custom interactive gold foil scratch canvas allowing guests to dynamically scratch and reveal the auspicious wedding date and muhurat timings.
4. **Editorial Typography**: Pairing classical serif headline typography (`Cormorant Garamond`), sweeping calligraphic script accents (`Alex Brush`), and clean modern body text (`Jost`).
5. **Multi-Layer Ambient Depth**: Ambient floating golden stardust particles over dark crimson gradient backdrops.

---

## 3. Color System & Theme Tokens

```css
/* Crimson Royale Theme Tokens */
.tmpl-crimson-royale {
  --crimson-dark: #120205;
  --crimson-deep: #29060c;
  --crimson-rich: #420f18;
  --maroon: #7c2c3b;
  --maroon-deep: #591f2b;
  --rose-subtle: #c98a8f;
  --gold: #d4af37;
  --gold-rich: #c9a15a;
  --gold-soft: #f1dfb8;
  --gold-deep: #9d7838;
  --ink: #3d232a;
  --ink-soft: #6b4a4f;
  --white-soft: #fffdfb;
  --card-bg: rgba(255, 252, 247, 0.96);
  --card-border: rgba(201, 161, 90, 0.45);
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-script: "Alex Brush", cursive;
  --font-body: "Jost", system-ui, sans-serif;
  --container-w: min(1040px, 92vw);
}
```

---

## 4. Responsive Art-Direction & Background Matrix

All 4 backgrounds are equipped with art-directed assets for mobile, tablet, and desktop viewports:

| Theme Variant | Desktop Source | Tablet Source | Mobile Source | Media Type |
| :--- | :--- | :--- | :--- | :--- |
| **Default** (Velvet Curtains) | `bg-default.webp` | `bg-default.webp` | `bg-default.webp` | Image (`<picture>`) |
| **Lantern** (Royal Lattice) | `bg-lantern.webp` | `bg-lantern-tablet.webp` | `bg-lantern-mobile.webp` | Image (`<picture>`) |
| **Love** (Stardust Video) | `bg-love.mp4` | `bg-love-tablet.mp4` | `bg-love-mobile.mp4` | Video (`<video>` sources) |
| **Hinduism** (Ganesha & Diyas)| `bg-hinduism.webp`| `bg-hinduism-tablet.webp`| `bg-hinduism-mobile.webp` | Image (`<picture>`) |

---

## 5. Complete Asset Inventory

| Asset Filename | Type | Purpose | Size | Status |
| :--- | :--- | :--- | :--- | :--- |
| `music.mp3` | Audio | Background royal symphony | 3.52 MB | Downloaded & Integrated |
| `bg-default.webp` | Image | Background 1: Default Stage Curtains | 671 KB | Downloaded & Integrated |
| `bg-lantern.webp` | Image | Background 2: Lantern (Desktop) | 141 KB | Downloaded & Integrated |
| `bg-lantern-tablet.webp` | Image | Background 2: Lantern (Tablet) | 182 KB | Downloaded & Integrated |
| `bg-lantern-mobile.webp` | Image | Background 2: Lantern (Mobile) | 144 KB | Downloaded & Integrated |
| `bg-love.mp4` | Video | Background 3: Love Stardust (Desktop) | 8.21 MB | Downloaded & Integrated |
| `bg-love-tablet.mp4` | Video | Background 3: Love Stardust (Tablet) | 8.21 MB | Downloaded & Integrated |
| `bg-love-mobile.mp4` | Video | Background 3: Love Stardust (Mobile) | 8.21 MB | Downloaded & Integrated |
| `bg-hinduism.webp` | Image | Background 4: Hinduism Ganesha (Desktop) | 513 KB | Downloaded & Integrated |
| `bg-hinduism-tablet.webp` | Image | Background 4: Hinduism Ganesha (Tablet) | 592 KB | Downloaded & Integrated |
| `bg-hinduism-mobile.webp` | Image | Background 4: Hinduism Ganesha (Mobile) | 685 KB | Downloaded & Integrated |
| `gallery-1.webp` to `6.webp` | Images | Moments Gallery Photos | ~2.2 MB | Downloaded & Integrated |

---

## 6. Section-by-Section Choreography

1. **Scene 01: Royal Split Gate**
   - Dual split doors with gold filigree and bottom arch motifs.
   - Pulsating center ruby wax seal (`♥ TAP TO OPEN`).
   - Trigger: Click/Tap -> Doors split horizontally (`translateX(-100%)` / `translateX(100%)`), audio starts, scroll unlocked.

2. **Scene 02: The Hero Invitation**
   - Radial ambient spotlight glow behind card.
   - Serif names with calligraphy ampersand (`&`) in rich gold.
   - Auspicious wedding date and family blessing subtitle.

3. **Scene 03: A Little Note From Us**
   - Regal parchment frame with double-line gold trim.
   - Heartfelt narrative and welcome greeting.

4. **Scene 04: Interactive Scratch Card**
   - Custom gold foil HTML5 canvas with touch and mouse scratch detection.
   - Auspicious Muhurat date revealed dynamically upon scratch.

5. **Scene 05: Live Countdown Clock**
   - 4 arched cards (Days, Hours, Mins, Secs) with glowing numerals and live ticking intervals.

6. **Scene 06: Moments of Love (Gallery)**
   - Editorial staggered grid with gold borders.
   - Hover zoom and full-screen lightbox viewer with previous/next controls.

7. **Scene 07: Ceremony & Events Timeline**
   - Gold node marker line with scheduled events (Haldi, Mehendi, Sangeet, Wedding Ceremony, Reception).

8. **Scene 08: The Destination (Venue)**
   - Royal estate card with location address and metallic shimmer "GET DIRECTIONS" button.

9. **Scene 09: RSVP & Heartfelt Wishes**
   - Clean luxury form fields with attendance selection and instant confirmation state.

10. **Scene 10: Royal Closing**
    - Pulsating heart seal and calligraphic couple signatures.

---

## 7. Performance & Accessibility

- **GPU Acceleration**: All door slides, modal transitions, and particle animations use `transform` and `opacity`.
- **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)` by disabling large transforms.
- **Responsive Layout**: Validated across `320px`, `375px`, `390px`, `414px`, `768px`, `1024px`, and `1440px+`.
