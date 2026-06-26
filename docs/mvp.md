# Unfold (unfoldwed.com) — Full Business Blueprint

> A SaaS platform where couples create beautiful, animated, shareable wedding invitation webpages — no paper, no printing, instant sharing via WhatsApp/email.

---

## Table of Contents

1. [Business Overview](#1-business-overview)
2. [Product Description](#2-product-description)
3. [Core Features](#3-core-features)
4. [Templates Catalog](#4-templates-catalog)
5. [User Flow](#5-user-flow)
6. [Pricing Model](#6-pricing-model)
7. [Tech Stack](#7-tech-stack)
8. [Database Schema](#8-database-schema)
9. [Pages & Routes](#9-pages--routes)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Payment Integration](#11-payment-integration)
12. [Email & Notifications](#12-email--notifications)
13. [SEO Strategy](#13-seo-strategy)
14. [Marketing & Growth](#14-marketing--growth)
15. [Legal Pages](#15-legal-pages)
16. [Folder Structure](#16-folder-structure)
17. [Environment Variables](#17-environment-variables)
18. [Deployment](#18-deployment)
19. [Monetization Roadmap](#19-monetization-roadmap)

---

## 1. Business Overview

**Business Type:** SaaS / Digital Product  
**Niche:** Wedding Tech — Digital Invitation Webpages  
**Target Market:** Engaged couples in India (primary) and South Asia / global diaspora (secondary)  
**Revenue Model:** One-time payment per invitation (no subscription)  
**Value Proposition:** Replace expensive, slow, wasteful paper invitations with instant, animated, interactive digital webpages shareable via WhatsApp/email  

**Key Differentiators:**
- Premium animated templates (3D door reveals, scratch cards, curtain animations)
- Background music with mute toggle
- Guest messaging inbox
- Google Maps venue embed
- Live countdown timer
- Multi-language support 
- Instant delivery — no printing delays

---

## 2. Product Description

The platform lets a couple:
1. Choose a premium animated template
2. Pay a one-time fee
3. Fill in a form (names, date, venue, photos, optional sections)
4. Receive a unique shareable URL (`unfoldwed.com/unique-slug`)
5. Share that link via WhatsApp, email, or social media
6. Edit details anytime until the wedding date via dashboard

Guests open the link and see a fully animated, mobile-optimized wedding invitation webpage. They can leave messages, confirm attendance, and get directions — all within the invitation.

---

## 3. Core Features

### Invitation Features (Guest-facing)
| Feature | Description |
|---|---|
| 3D Door / Curtain Opening Animation | The invitation "opens" with a dramatic 3D animation when the guest taps/clicks |
| Scratch-to-Reveal Date | Interactive canvas scratch card that reveals the wedding date |
| Live Countdown Timer | Animated days/hours/minutes/seconds countdown |
| Background Music | Auto-plays romantic instrumental; elegant mute/unmute toggle |
| Photo Slideshow / Gallery | Couple's photos shown in a beautiful carousel/slideshow |
| Google Maps Embed | Venue location with directions link |
| Guest Messaging Inbox | Guests can send messages, wishes, and RSVP (with guest count) |
| Dress Code Section | Optional section showing dress code details |
| Pre-Wedding Events | Optional itinerary of mehendi, sangeet, etc. |
| Transportation Info | Optional section with travel/accommodation info |
| Multi-Language Toggle | Toggle between 2+ languages (e.g. English + Hindi/Arabic/Urdu) |
| Mobile-Optimized | Fully responsive, beautiful on phone screens |

### Platform Features (Couple-facing)
| Feature | Description |
|---|---|
| Dashboard | Manage all invitations, view messages, edit details |
| Form-based Customization | Simple form to enter all wedding details |
| Toggle Sections On/Off | Show/hide dress code, events, transport, etc. |
| Photo Upload | Upload hero background image and slideshow photos |
| Real-time Edit | Changes reflect instantly on live invitation URL |
| Unique Shareable Link | Each invitation gets its own permanent URL |
| Unlimited Guest Views | No cap on how many guests can open the link |
| Unlimited Edits | Edit until wedding date passes |

---

## 4. Templates Catalog

Each template is a standalone animated webpage with its own color palette, typography, and animation style.

| Template Name | Style | Colors | Opening Animation |
|---|---|---|---|
| Emerald Noir | Luxury dark | Deep green + gold | 3D door reveal with ornate accents |
| Crimson Royale | Regal dark | Dark charcoal + gold + deep red | Luxury card reveal |
| Royal Elegance | Classic | Gold + cream | Curtain open |
| Garden Romance | Floral outdoor | Soft greens + blush + natural tones | Flower bloom reveal |
| Modern Minimal | Contemporary | White + muted tones + black | Fade/slide reveal |
| Mughal Emerald | Heritage Indian | Rich emerald + gold Mughal motifs | Ornate arch open |
| Rose Gold Blush | Romantic soft | Rose gold + blush pink | Petal reveal |
| Midnight Royal | Evening formal | Deep navy + gold | Star/sparkle reveal |

**Template page** (`/templates`): Grid of all templates, each with a "Preview" button (opens a demo link) and "Select" button (proceeds to checkout).



---

## 5. User Flow

```
Landing Page (/)
    │
    ▼
Browse Templates (/templates)
    │
    ▼
Select Template → Click "Create Invitation"
    │
    ▼
Sign Up / Log In (/signup or /login)
    │
    ▼
Checkout — One-Time Payment (/checkout?template=emerald-noir)
    │
    ▼
Payment Success → Redirect to Invitation Form
    │
    ▼
Fill Invitation Form (/dashboard/invitation/new)
  - Bride & Groom names
  - Wedding date & time
  - Venue name & address (Google Maps search)
  - Upload hero photo
  - Upload slideshow photos (up to 10)
  - Choose background music track
  - Toggle optional sections on/off
  - Add dress code (optional)
  - Add pre-wedding events (optional)
  - Add transport/accommodation info (optional)
  - Choose languages
    │
    ▼
Invitation Generated → Unique URL assigned
(e.g. unfoldwed.com/priya-arjun-2026)
    │
    ▼
Dashboard (/dashboard)
  - View/share link
  - Edit details
  - View guest messages & RSVPs
  - Download guest list
```

---

## 6. Pricing Model

**Model:** One-time payment per invitation. No subscriptions.

**Suggested Pricing (India market):**

| Plan | Price (INR) | Inclusions |
|---|---|---|
| Base |  ₹799 | 1 invitation, 1 template, all features, unlimited views, unlimited edits until wedding date |
| Premium Add-on (optional) | ₹199 | Custom domain slug (e.g. `unfoldwed.com/your-custom-name`) |

### Classic Plan
#### Unfold Classic
Perfect for elegant animated wedding invitations
₹799
One-time payment

Access to Unfold Classic Invitations
6 Premium Animated Templates
1 Invitation Webpage
Unlimited Edits Until Wedding Date
Buy More Invitations Anytime (Add-On)
Guest Messaging & Inbox
Music, Photos & Custom Uploads
Google Maps & Multi-Language Support
Analytics & Page View Tracking
Automatic Privacy Protection After Wedding
Start with Classic
Premium Cinematic Experience

---
### Royal Plan
#### Unfold Royal
Immersive cinematic invitations with luxury motion experiences

₹1299
One-time payment

Everything in Classic, plus:
Access to ALL Classic + Royal Invitations
10 Premium Animated Templates
Cinematic Royal Invitation Experience
Luxury Video-Based Opening Experience
3D Door & Curtain Reveal Animations
Cinematic Hero Backgrounds
Premium Motion Storytelling
Exclusive Royal Template Collection
Unlock Royal Experience

**Notes:**
- No hidden fees
- No per-guest charges
- Invitation expires/archives after wedding date (but remains viewable)
- Payment via Razorpay (UPI, cards, net banking, wallets)

---

## 7. Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router) — for SSR/SSG + SEO
- **Styling:** Tailwind CSS + Framer Motion (animations)
- **Language:** TypeScript
- **State:** Zustand or React Context
- **Forms Library:** react-hook-form + zod 

### Invitation Rendering
- Each template is a standalone React component
- Animations: CSS3 + Framer Motion + Canvas API (scratch card)
- Music: HTML5 Audio API
- Maps: Google Maps Embed API (iframe)
- Countdown: Custom React hook with `setInterval`

### Backend
- **API:** Next.js API Routes
- **Auth:** NextAuth.js (email/password + Google OAuth)
- **Database:**  Supabase 
- **File Storage:** Cloudinary (later AWS S3 (for uploaded photos))
- **Email:** nodemailer (transactional emails)

### Payment
- **Gateway:** Razorpay (India-first: UPI, cards, net banking, wallets)

### Hosting
- **Frontend + API:** Vercel
- **Database:** Supabase (PostgreSQL)
- **Media:** Cloudinary 

### Analytics & Marketing
- Google Tag Manager
- Google Analytics 4
- Facebook Pixel
- Meta Ads

---

## 8. Database Schema

```sql
-- Users (couples)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders / Payments
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  template_id TEXT NOT NULL,          -- e.g. 'emerald-noir'
  amount_paise INT NOT NULL,          -- amount in paise (INR × 100)
  currency TEXT DEFAULT 'INR',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  status TEXT DEFAULT 'pending',      -- pending | paid | failed | refunded
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invitations
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  template_id TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,          -- URL slug, e.g. 'priya-arjun-2026'
  
  -- Core details
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_time TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  venue_lat DECIMAL,
  venue_lng DECIMAL,
  
  -- Media
  hero_image_url TEXT,
  slideshow_images JSONB DEFAULT '[]',  -- array of image URLs
  music_track TEXT DEFAULT 'track1',    -- chosen music file key
  
  -- Optional sections (toggles)
  show_dress_code BOOLEAN DEFAULT false,
  dress_code_text TEXT,
  show_prewedding_events BOOLEAN DEFAULT false,
  prewedding_events JSONB DEFAULT '[]', -- [{name, date, time, venue}]
  show_transport BOOLEAN DEFAULT false,
  transport_text TEXT,
  
  -- Language
  languages JSONB DEFAULT '["en"]',     -- e.g. ["en", "hi"]
  translations JSONB DEFAULT '{}',      -- custom translations object
  
  -- Settings
  is_published BOOLEAN DEFAULT true,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guest Messages / RSVPs
CREATE TABLE guest_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id),
  guest_name TEXT NOT NULL,
  message TEXT,
  attending TEXT DEFAULT 'yes',        -- yes | no | maybe
  guest_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. Pages & Routes

### Public Pages
| Route | Page |
|---|---|
| `/` | Landing page — hero, features, templates preview, how it works, testimonials, FAQ |
| `/templates` | Template gallery with preview + select buttons |
| `/[slug]` | Live invitation page (public, shareable at root) |
| `/preview/[template-id]` | Demo preview of a template (with dummy data) |
| `/about` | About the platform |
| `/contact` | Contact form |
| `/terms` | Terms of Service |
| `/privacy-policy` | Privacy Policy |
| `/refund-policy` | Refund Policy |

### Auth Pages
| Route | Page |
|---|---|
| `/signup` | Create account |
| `/login` | Log in |
| `/forgot-password` | Password reset |

### Dashboard Pages (authenticated)
| Route | Page |
|---|---|
| `/dashboard` | Overview — list of invitations, quick stats |
| `/dashboard/invitation/new` | Create new invitation form |
| `/dashboard/invitation/[id]/edit` | Edit existing invitation |
| `/dashboard/invitation/[id]/messages` | View guest messages & RSVPs |
| `/dashboard/invitation/[id]/share` | Share options (WhatsApp link, copy link, QR code) |
| `/dashboard/account` | Account settings |

### API Routes
| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers |
| `/api/orders/create` | POST | Create Razorpay order |
| `/api/orders/verify` | POST | Verify payment signature |
| `/api/invitations` | POST | Create invitation after payment |
| `/api/invitations/[id]` | GET/PUT | Get or update invitation |
| `/api/invitations/[slug]/public` | GET | Public invitation data (for `/[slug]`) |
| `/api/messages` | POST | Submit guest message/RSVP |
| `/api/messages/[invitationId]` | GET | Get messages for dashboard |
| `/api/upload` | POST | Upload image to cloud storage |
| `/api/slug/check` | POST | Check if a custom slug is available |

---

## 10. Admin Dashboard

Build a simple admin panel at `/admin` (protected by admin role):

- **Orders:** View all orders, payment status, amounts
- **Users:** View registered users, their invitations
- **Invitations:** View/search all active invitations
- **Messages:** Browse guest messages across all invitations
- **Analytics:** Total revenue, invitations created, conversion rate
- **Refunds:** Mark orders as refunded, flag for Razorpay refund

---

## 11. Payment Integration (Razorpay)

### Flow
1. User clicks "Create Invitation" on template page
2. Frontend calls `/api/orders/create` → creates Razorpay order, returns `order_id`
3. Frontend opens Razorpay checkout popup
4. On success, Razorpay returns `payment_id`, `order_id`, `signature`
5. Frontend calls `/api/orders/verify` with those three values
6. Backend verifies HMAC signature using Razorpay secret
7. On success, mark order as `paid`, unlock invitation creation form

### Razorpay Setup
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
```

### Webhook (optional but recommended)
Set up Razorpay webhook at `/api/webhooks/razorpay` to handle:
- `payment.captured` → mark order paid
- `payment.failed` → mark order failed
- `refund.created` → mark order refunded

---

## 12. Email & Notifications

### Transactional Emails (via Nodemailer)

| Trigger | Email |
|---|---|
| Signup | Welcome email with login link |
| Payment success | "Your invitation is ready!" with dashboard link |
| New guest message | "You received a new message/RSVP from [Guest Name]" |
| Edit confirmed | "Your invitation has been updated" |
| 7 days before wedding | Reminder to check guest messages |

### WhatsApp Sharing
Generate pre-filled WhatsApp share URL:
```
https://wa.me/?text=You're invited to our wedding! 🎉 Open your invitation here: https://unfoldwed.com/priya-arjun-2026
```
Show a "Share on WhatsApp" button prominently in the dashboard.

---

## 13. SEO Strategy

### Target Keywords
- `digital wedding invitation`
- `online wedding card`
- `wedding invitation webpage`
- `create wedding invitation online`
- `digital wedding card India`
- `animated wedding invitation`
- `WhatsApp wedding invitation`

### On-Page SEO
- Each public page has unique `<title>`, `<meta description>`, Open Graph tags
- `/i/[slug]` pages have couple-specific OG tags: "Priya & Arjun's Wedding Invitation"
- `/preview/[template-id]` pages target template-specific keywords
- Structured data (JSON-LD) for FAQs on landing page
- Fast loading — Next.js ISR for public invitation pages

### Content Pages (Blog — optional Phase 2)
- "Why digital wedding invitations are better than paper"
- "Best wedding invitation templates 2026"
- "How to share wedding invitations on WhatsApp"

---

## 14. Marketing & Growth

### Primary Channels
1. **Meta Ads (Instagram + Facebook):** Target engaged women aged 22–35 in India. Show template previews as video/reel ads.
2. **Google Ads:** Search ads on keywords like "digital wedding invitation India"
3. **Instagram Organic:** Post template demos as Reels. Before/after paper vs digital.
4. **WhatsApp Groups:** Encourage couples to share their invitation — each invitation is a viral loop.

### Viral Loop
Every invitation shared by a couple is seen by hundreds of guests → natural product discovery. Add a subtle "Made with Unfold" footer link on free invitations (remove on paid, or make it optional).

### Referral Program (Phase 2)
Give couples a referral code. For each new paying customer they refer, they get a discount or store credit.

---

## 15. Legal Pages

### Terms of Service (`/terms`)
Cover:
- User eligibility (18+)
- One-time license to use the platform
- Content ownership (couple owns their data; platform owns template designs)
- No resale/redistribution of templates
- Platform may archive invitations after wedding date

### Privacy Policy (`/privacy-policy`)
Cover:
- Data collected (email, wedding details, photos)
- How data is stored and used
- Third-party services (Razorpay, Google Maps, analytics)
- User rights (deletion requests)
- GDPR + India IT Act compliance

### Refund Policy (`/refund-policy`)
Cover:
- No refunds after invitation has been created/published
- Refunds considered within 24 hours of payment if invitation not yet created
- Contact email for disputes

---

## 16. Folder Structure

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Landing page
│   │   ├── templates/page.tsx
│   │   ├── [slug]/page.tsx             # Live invitation (root vanity path)
│   │   ├── preview/[templateId]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   └── refund-policy/page.tsx
│   ├── (auth)/
│   │   ├── signup/page.tsx
│   │   ├── login/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── invitation/
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── edit/page.tsx
│   │   │       ├── messages/page.tsx
│   │   │       └── share/page.tsx
│   │   └── account/page.tsx
│   ├── admin/
│   │   └── page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── orders/
│       ├── invitations/
│       ├── messages/
│       ├── upload/route.ts
│       └── webhooks/razorpay/route.ts
├── components/
│   ├── templates/
│   │   ├── EmeraldNoir.tsx
│   │   ├── CrimsonRoyale.tsx
│   │   ├── RoyalElegance.tsx
│   │   ├── GardenRomance.tsx
│   │   ├── ModernMinimal.tsx
│   │   ├── MughalEmerald.tsx
│   │   ├── RoseGoldBlush.tsx
│   │   └── MidnightRoyal.tsx
│   ├── invitation/
│   │   ├── DoorAnimation.tsx           # 3D door opening component
│   │   ├── ScratchCard.tsx             # Canvas scratch card
│   │   ├── CountdownTimer.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── PhotoSlideshow.tsx
│   │   ├── GoogleMapEmbed.tsx
│   │   ├── GuestMessageForm.tsx
│   │   └── LanguageToggle.tsx
│   ├── dashboard/
│   ├── landing/
│   └── ui/                             # Shared UI components
├── lib/
│   ├── prisma.ts
│   ├── razorpay.ts
│   ├── storage.ts                      # Cloud storage helpers
│   ├── email.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── music/                          # Background music tracks (MP3)
│   ├── templates/                      # Template preview images
│   └── fonts/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 17. Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=https://unfoldwed.com
NEXT_PUBLIC_APP_NAME=Unfold

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://unfoldwed.com

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxxx
RAZORPAY_KEY_SECRET=xxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxx

# Cloud Storage (Google Cloud)
GCS_BUCKET_NAME=your-bucket
GCS_PROJECT_ID=your-project
GCS_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Email (Nodemailer SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=pass
EMAIL_FROM=noreply@unfoldwed.com

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...

# Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=1234567890
```

---

## 18. Deployment

### Vercel (recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all environment variables in the Vercel dashboard.

### Database (Supabase — easiest)
1. Create project at supabase.com
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma migrate deploy`

### Custom Domain
1. Buy domain (e.g. Namecheap/GoDaddy)
2. Add to Vercel → automatic SSL
3. Set `NEXT_PUBLIC_APP_URL` to your domain

### Media Storage (Google Cloud Storage)
1. Create GCS bucket, set public read access
2. Create service account with Storage Admin role
3. Download JSON key → paste into `GCS_SERVICE_ACCOUNT_KEY`

---

## 19. Monetization Roadmap

### Phase 1 — Launch (Month 1–3)
- Single base plan: ₹599 per invitation
- 8 templates
- All core features
- India market focus

### Phase 2 — Upsells (Month 4–6)
- **Custom slug upgrade:** ₹199 extra for vanity URL
- **QR Code card:** ₹299 for printable QR code card (PDF) to place on physical items
- **Priority support:** ₹199 extra for 24hr human support
- **Guest list export:** ₹149 for CSV download of RSVPs

### Phase 3 — Scale (Month 7–12)
- **Affiliate program:** Wedding photographers, planners, decorators refer couples → 20% commission
- **B2B / Wedding Planner Accounts:** Bulk pricing for planners who manage many weddings
- **International expansion:** Add templates for South Asian diaspora (UK, USA, Canada, UAE)
- **Video invitations:** Premium add-on with short video invitation clip

### Revenue Targets
| Month | Invitations Sold | Avg Price | Revenue |
|---|---|---|---|
| 1 | 50 | ₹599 | ₹29,950 |
| 3 | 200 | ₹650 | ₹1,30,000 |
| 6 | 600 | ₹700 | ₹4,20,000 |
| 12 | 1,500 | ₹750 | ₹11,25,000 |

---

## Quick Start Checklist

- [ ] Register domain name
- [ ] Set up Supabase database
- [ ] Create Razorpay account (complete KYC)
- [ ] Create Google Cloud Storage bucket
- [ ] Set up Resend account for transactional email
- [ ] Register Google Tag Manager + GA4
- [ ] Build and deploy landing page
- [ ] Build 2–3 templates first (Emerald Noir, Royal Elegance, Modern Minimal)
- [ ] Integrate Razorpay checkout
- [ ] Build invitation form + dashboard
- [ ] Build public invitation renderer (`/i/[slug]`)
- [ ] Launch on Instagram with template demo reels
- [ ] Run first Meta Ads campaign targeting engaged women in India

---



