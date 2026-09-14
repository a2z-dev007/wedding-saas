<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MANDATORY DESIGN RULE: MOBILE-FIRST APPROACH

All invitation templates, UI pages, and components in this project MUST strictly follow the **Mobile-First Approach**:

1. **Mobile-First Design Foundation**:
   - Always design, build, and test for mobile portrait viewports (360px – 430px width, e.g. iPhone, Pixel, Samsung Galaxy) as the primary experience before scaling up to desktop/tablet screens.
   - Base CSS rules must target mobile viewports first, using `@media (min-width: 768px)` or `@media (min-width: 1024px)` for desktop enhancements.

2. **Visual Focal Points & Facial Clearance Guarantee**:
   - In hero sections, portrait cards, and visual backgrounds featuring couples, characters, or focal artwork, **the faces, heads, crowns, jewelry, and expressions must NEVER be covered, blocked, or occluded** by floating text cards, banners, or badges.
   - Employ intelligent adaptive layouts on mobile:
     - **Top**: Compact, elegant arch header or semi-transparent sacred invocation (e.g. Bismillah).
     - **Middle**: 100% unobstructed, crystal-clear view of the couple and artwork.
     - **Bottom**: Sleek, frosted glass floating pedestal card or lower banner for couple names, date badge, and venue.

3. **Touch Targets & Thumb Zone Ergonomics**:
   - All interactive controls (wax seals, audio toggles, buttons, RSVP CTAs, gallery navigation) must have a minimum touch target of 44×44px.
   - Floating buttons (e.g. audio toggle) must be placed safely outside text and scroll indicators with adequate padding from bottom home indicators (`safe-area-inset-bottom`).

4. **Typography & Fluid Layouts**:
   - Use fluid typography with `clamp()` and responsive line-heights to prevent text overflow or clumsy line wraps on narrow screens (down to 320px).
   - Enforce zero unwanted horizontal scroll (`overflow-x: hidden`).

