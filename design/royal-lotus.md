# Template Specification: Royal Lotus

## 1. TEMPLATE OVERVIEW
- **Template Name:** Royal Lotus
- **Template ID:** `TPL-HIN-01`
- **Slug:** `royal-lotus`
- **Category:** Hinduism
- **Religious / Cultural Category:** Royal Heritage / Rajasthani Palace & Mughal Lotus Darbar
- **Price / Tier:** ₹1,299
- **Reference URL:** [https://saveourdate.in/templates/royal-lotus](https://saveourdate.in/templates/royal-lotus)
- **Live Demo URL:** [https://saveourdate.in/templates/royal-lotus/live](https://saveourdate.in/templates/royal-lotus/live)

### Design Language & Visual Direction
- **Visual Direction:** Rajasthani Palace Courtyard, Royal Peacock Medallion, Intricate Carved Jharokhas, Deep Velvet Crimson & 24K Antique Gold, Royal Farman Scrolls, Kamadhenu Cow & Ceremonial Elephant motifs.
- **Primary Mood:** Opulent / Aristocratic / Ethereal / Sacred Regal Celebration
- **Visual Density:** High (Ornate sandstone arches, gold leaf borders, lotus damask wallpapers, enchanted garden foliage)
- **Animation Intensity:** High (Interactive drag-down rope pull with palace illumination transition, blooming lotus audio trigger, floating lotus petals & gold dust particles, scroll-triggered Farman unfold, and parallax garden depth)
- **Color Palette Breakdown:**
  - Night Starry Sky: `#0D0D19`
  - Deep Twilight Crimson: `#6B172B` / `#5B1824`
  - Royal Velvet Maroon: `#4A0E17`
  - 24K Antique Gold: `#D4AF37` / `#C59B27`
  - Lotus Blossom Pink: `#E892A8` / `#E5A5AF`
  - Enchanted Garden Emerald: `#0A3026` / `#134438`
  - Parchment Silk Surface: `#F7F4EE`
  - Text Onyx: `#1C1510`
- **Typography Matrix:**
  - Display Headline: `Cinzel Decorative, serif` / `Playfair Display, serif`
  - Couple Names & Accents: `Great Vibes / Pinyon Script, cursive`
  - Subheadings & Eyebrows: `Cormorant Garamond, serif` (uppercase with letter-spacing `0.25em`)
  - Body Copy & Form Labels: `Montserrat / Geist Sans, sans-serif`

---

## 2. COMPLETE USER EXPERIENCE
The end-to-end guest journey for **Royal Lotus** follows this exact multi-stage narrative:

1. **Initial Night Palace Scene:** Page loads on a dark starry midnight sky over an intricately carved Rajasthani palace courtyard with unlit stone arches, cupolas (Jharokhas), and unlit diyas.
2. **Interactive Silk Rope/Tassel Pull:** A vertical multi-colored silk tassel rope with gold latkan beads hangs from the central arch with the prompt: *"PULL THE ROPE TO LIGHT OUR CELEBRATION"*. (Or *"SKIP INTRO"* in top-right).
3. **Lighting & Illumination Transition:** Dragging the rope downward triggers an illumination effect: the sky transforms into a warm twilight crimson dusk (`#6B172B`), and every palace lamp and courtyard diya lights up with warm golden radiance.
4. **Couple Card & Blooming Lotus Audio Unlock:** The illuminated arch reveals the couple names (*"Siya & Kabir"*), wedding date, venue, and an animated blooming pink lotus icon with the prompt *"TAP THE LOTUS TO JOIN US"*.
5. **Main Invitation Page Reveal:** Tapping the lotus unblocks browser audio autoplay, launches ambient background shehnai/sitar music, and smoothly reveals the main invitation page with floating lotus petals and gold dust.
6. **Hero Peacock Medallion:** Gilded oval medallion framed by blooming lotus vines with two symmetrical royal blue & gold peacocks, couple names, wedding date, and dual CTAs (*"RSVP NOW"* & *"VIEW EVENTS"*).
7. **"Our Events" — Royal Farman Scrolls:** 6 ceremonial events (Mehendi, Haldi, Sangeet, Shaadi, Reception, Vidaai) presented on vintage parchment scrolls with gold-carved scroll rods, attire notes, and Google Maps links.
8. **"Meet the Couple" — Enchanted Palace Garden:** Dark emerald night garden section framed by blooming tree branches, couple love story, and wedding hashtag `#SiyaKabir2026`.
9. **"Gallery Wall" — Memories:** Asymmetric masonry photo grid with smooth hover zoom animations.
10. **"Things to Know" — Guest Essentials:** Jharokha icon header with 4 glassmorphism cards (Dress Code, Venue, Stay Options, Wedding Hashtag) over a watermarked Mughal heritage backdrop.
11. **Interactive RSVP Form:** Parchment-styled form with Joyfully Accept / Regretfully Decline toggles, guest counters, blessings textarea, and gold submit button.
12. **Royal Heritage Footer:** Midnight starry sky with hand-painted decorated Kamadhenu Cow and Royal Elephant illustrations, blooming lotus, and couple signature.

---

## 3. INITIAL LOADING STATE & INTRO STAGE 1
- **Visual Scene:** Dark midnight palace silhouette (`#0D0D19`) with soft twinkling stars and carved sandstone arches.
- **Rope & Tassel:** Multi-colored silk cord with metallic gold latkan beads hanging from the top-center arch (`y: 0`, drag limit `160px`).
- **Prompt:** `"PULL THE ROPE TO LIGHT OUR CELEBRATION"` in gold tracking uppercase with a subtle vertical bounce cue.
- **Skip Button:** `"SKIP INTRO"` pill button in top-right corner with smooth hover opacity.

---

## 4. OPENING EXPERIENCE (STAGE 2 ILLUMINATION & LOTUS AUDIO GATE)
- **Trigger:** Dragging the rope past threshold (> 80px) or clicking the rope.
- **Illumination Animation:**
  - Sky gradient shifts from `#0D0D19` to rich sunset twilight `#6B172B` over `0.8s`.
  - Diyas and palace lamps fade in with bright golden radial halos (`box-shadow: 0 0 25px #D4AF37`, `opacity: 0 -> 1`).
- **Lotus Audio Gate:**
  - Center arch text animates in: `"THE WEDDING OF"`, `"Siya & Kabir"`, `"14 DECEMBER 2026"`, `"The Maharaja Palace"`.
  - Blooming pink lotus flower icon with breathing pulse (`scale: [1, 1.12, 1]` over `2s`).
  - Text prompt: `"TAP THE LOTUS TO JOIN US"`.
- **Audio Unlock:** Tapping the lotus initiates audio playback (`new Audio().play()`) and executes a smooth fade/scale transition into the main invitation.

---

## 5. FLOATING DECORATIVE PARTICLES
- **Active Particles:** Drifting Pink Lotus Petals & Floating Shimmering Golden Dust Particles.
- **Physics:** Sinusoidal horizontal sway (`x: [-20px, 20px]`) combined with continuous slow descent (`y: -10vh -> 110vh`) and 3D tumbling rotation (`rotateZ: 0 -> 360deg`).
- **Layering:** `pointer-events: none`, `z-index: 15`.

---

## 6. HERO SECTION (ROYAL PEACOCK MEDALLION)
- **Central Artwork:** Gilded oval medallion framed with blooming lotus vines.
- **Peacocks:** Symmetrical hand-painted royal blue & gold peacocks perched on left and right inside the frame facing inward.
- **Typography:**
  - Couple Names: Large cursive flourish script (`Great Vibes / Pinyon Script`) in `#FFFFFF` with soft golden text-shadow.
  - Tagline: `"ARE GETTING MARRIED"` in gold serif tracking `0.25em`.
  - Date & Venue: `"DEC 14 2026 — Monday"` & `"THE MAHARAJA PALACE"`.
- **Buttons:**
  - Solid Gold Button: `"RSVP NOW"` (`bg-gradient-to-r from-[#D4AF37] to-[#C59B27]`).
  - Gold Outline Button: `"VIEW EVENTS"` (`border border-[#D4AF37] text-[#D4AF37]`).

---

## 7. SECTION-BY-SECTION ANALYSIS

### Section 1: Hero Banner (Peacock Medallion)
- **Background:** Velvet crimson with floating lotus petals.
- **Content:** Peacock medallion, couple names, date, venue, dual CTAs, floating music player toggle.

### Section 2: Celebration Journey ("Our Events" — Royal Farman Scrolls)
- **Background:** Maroon lotus damask pattern with parallax depth and tropical banana plant foliage framing the margins.
- **Event Cards (6 Royal Farman Scrolls):**
  1. Mehendi (Henna cone motif, 12 Dec 4:00 PM, Lotus Courtyard, attire note, map link)
  2. Haldi (Turmeric bowl motif, 13 Dec 10:00 AM, Poolside Courtyard, attire note, map link)
  3. Sangeet (Ghungroo motif, 13 Dec 7:30 PM, Royal Ballroom, attire note, map link)
  4. Shaadi (Varmala motif, 14 Dec 6:30 PM, Lake Mandap, attire note, map link)
  5. Reception (Chandelier motif, 14 Dec 9:00 PM, Palace Lawns, attire note, map link)
  6. Vidaai (Palanquin/Doli motif, 15 Dec 9:00 AM, Main Courtyard, attire note, map link)

### Section 3: "Meet the Couple" (Enchanted Palace Garden)
- **Background:** Deep emerald green night garden (`#0A3026`) with glowing cupola bokeh lights.
- **Framing:** Hand-painted lush green tree branches with pink blossoms on left and right margins.
- **Content:** Title, romantic story of how they met in Udaipur, gold cursive hashtag `#SiyaKabir2026`, and royal peacock icon.

### Section 4: "Gallery Wall" (Memories)
- **Background:** Deep crimson lotus damask pattern with gold sparkles.
- **Layout:** Asymmetric masonry photo grid with rounded corners (`rounded-2xl`) and hover zoom (`scale-105`).

### Section 5: "Things to Know" (Guest Essentials)
- **Header:** Golden Rajasthani Jharokha palace cupola icon.
- **Background:** Watermarked Mughal heritage motifs (elephants, peacocks, paisleys, lotuses).
- **Cards:** 4 dark glassmorphism cards (Dress Code, Venue, Stay Options, Wedding Hashtag).

### Section 6: Interactive RSVP Form
- **Background:** Cream parchment card (`#F7F4EE`).
- **Fields:** Full Name, Phone, Email, Attendance toggle (`JOYFULLY ACCEPT` / `REGRETFULLY DECLINE`), Wishes textarea, and golden gradient `SEND RSVP` button.

### Section 7: Royal Heritage Footer
- **Background:** Midnight starry night sky (`#0E0B16`).
- **Illustrations:** Decorated Indian Kamadhenu Cow on bottom-left, decorated Royal Indian Elephant on bottom-right facing center.
- **Content:** Blooming pink lotus flower, `"WITH ALL OUR LOVE"`, couple names, *"You make this moment complete."*, lit Diya icon, date, and attribution.

---

## 8. IMPLEMENTATION & COMPONENT ARCHITECTURE
- **Opening Component:** \`<RoyalLotusIntro onComplete={...} />\` with 2-stage interactive drag tassel + lighting reveal + lotus audio unlock.
- **Floating Controls:** \`<RoyalMusicToggle isPlaying={...} onToggle={...} />\` with spinning lotus disc.
- **Event Cards:** \`<RoyalFarmanCard />\` with carved scroll rod headers/footers and gold border trims.
- **Garden Section:** \`<EnchantedGardenStory />\` with blooming branch overlays and emerald depth.
- **RSVP Engine:** \`<GuestMessageForm />\` styled with cream parchment theme.
- **Footer:** \`<RoyalHeritageFooter />\` with Kamadhenu Cow and Royal Elephant SVG illustrations.
