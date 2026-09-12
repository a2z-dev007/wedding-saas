"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Lottie } from "lottie-react";
import { 
  SpeakerHigh, 
  SpeakerSlash, 
  CalendarBlank, 
  Clock, 
  MapPin, 
  Heart, 
  ShareNetwork, 
  Check, 
  Sparkle, 
  ArrowSquareOut 
} from "@phosphor-icons/react";
import noorEnvelopeSeal from "@/public/lottie-icons/noor-envelope-seal.json";
import noorCrescentLantern from "@/public/lottie-icons/noor-crescent-lantern.json";
import "./noor-nikah.css";

interface EventItem {
  name?: string;
  title?: string;
  enabled?: boolean;
  venue?: string;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
}

interface NoorNikahProps {
  data?: any;
}

export default function NoorNikah({ data }: NoorNikahProps) {
  // Envelope opening progressive states
  const [isOpen, setIsOpen] = useState(false);
  const [isLighting, setIsLighting] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardUp, setIsCardUp] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement>(null);

  // Gallery Lightbox state
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // RSVP Form state
  const [rsvpAttending, setRsvpAttending] = useState("yes");
  const [rsvpGuests, setRsvpGuests] = useState("2");
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpDua, setRsvpDua] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Parallax Scroll Tracking
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroCardY = useTransform(heroProgress, [0, 1], ["0px", "50px"]);
  const heroCardOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.2]);

  // Couple Data normalization
  const brideName = data?.brideName || data?.couple?.brideName || "Diya";
  const groomName = data?.groomName || data?.couple?.groomName || "Shaan";

  const rawDate = data?.weddingDate || data?.date || "2027-01-24T17:00:00";
  const weddingDate = new Date(rawDate);
  const formattedDate = !isNaN(weddingDate.getTime())
    ? weddingDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Sunday, January 24, 2027";

  const shortDate = !isNaN(weddingDate.getTime())
    ? `${String(weddingDate.getDate()).padStart(2, "0")}.${String(
        weddingDate.getMonth() + 1
      ).padStart(2, "0")}.${String(weddingDate.getFullYear()).slice(2)}`
    : "24.01.27";

  const venueName = data?.venueName || data?.venue?.name || "The Grand Qasr Al-Noor";
  const venueAddress =
    data?.venueAddress ||
    data?.venue?.address ||
    "Al-Noor Palace Estate, Emirates Palace Road, Abu Dhabi, UAE";
  const venueMapUrl =
    data?.venue?.mapUrl ||
    `https://maps.google.com/?q=${encodeURIComponent(
      venueName + " " + venueAddress
    )}`;

  const rawEvents = data?.events || data?.eventsJson;
  const events: EventItem[] =
    rawEvents && rawEvents.length > 0
      ? rawEvents
      : [
          {
            name: "Manjha (Haldi)",
            date: "Jan 23, 2027",
            time: "11:00 AM",
            venue: "Courtyard Garden, Al-Noor",
            description:
              "An auspicious morning filled with golden turmeric blessings, laughter, and family warmth.",
          },
          {
            name: "Mehendi Night",
            date: "Jan 23, 2027",
            time: "06:30 PM",
            venue: "The Jasmine Terrace",
            description:
              "An enchanting evening of intricate henna artistry, sweet delicacies, and celebratory songs.",
          },
          {
            name: "Nikah Ceremony",
            date: "Jan 24, 2027",
            time: "04:30 PM",
            venue: "Grand Mosque Courtyard",
            description:
              "The sacred marriage contract solemnized with the blessings of Allah and our beloved families.",
          },
          {
            name: "Walima Reception",
            date: "Jan 24, 2027",
            time: "08:00 PM",
            venue: "Royal Crystal Ballroom",
            description:
              "Join us for a royal banquet feast, heartfelt duas, and midnight celebrations.",
          },
        ];

  const rawGallery = data?.gallery || data?.slideshowImages;
  const galleryImages: string[] =
    rawGallery && rawGallery.length > 0
      ? rawGallery
      : [
          "/templates/crimson-royale/gallery-1.png",
          "/templates/crimson-royale/gallery-2.png",
          "/templates/crimson-royale/gallery-3.png",
          "/templates/crimson-royale/gallery-4.png",
          "/templates/crimson-royale/gallery-5.png",
          "/templates/crimson-royale/gallery-6.png",
        ];

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    days: 133,
    hours: 13,
    minutes: 11,
    seconds: 51,
  });

  useEffect(() => {
    const target = weddingDate.getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  // Progressive Slow & Ultra-Smooth Envelope Unfolding Sequence
  const handleOpenInvitation = () => {
    if (isLighting || isFlapOpen || isOpening) return;
    
    // 1. Slow golden energy radiance starts & music unlocks
    setIsLighting(true);

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio autoplay restricted:", e));
    }

    // 2. Slow 3D Flap Unfolding (1.1s)
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 1100);

    // 3. Inner Royal Gilded Invitation Card slides up majestically (2.0s)
    setTimeout(() => {
      setIsCardUp(true);
    }, 2000);

    // 4. Cinematic Envelope glow & portal expansion (3.4s)
    setTimeout(() => {
      setIsOpening(true);
    }, 3400);

    // 5. Unveil palace hero portal (4.2s)
    setTimeout(() => {
      setIsOpen(true);
    }, 4200);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <div className="tmpl-noor-nikah">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={
          data?.musicUrl ||
          data?.musicTrack ||
          "/templates/crimson-royale/music.mp3"
        }
        loop
        preload="auto"
      />

      {/* 1. Ultra-Realistic 3D Luxury Folded Islamic Wedding Envelope */}
      <AnimatePresence>
        {!isOpen && (
          <div className="noor-envelope-overlay">
            {/* Soft Ambient Backdrop Glow */}
            <div className="noor-env-backdrop-glow" />

            {/* Ambient stardust particles */}
            <div className="noor-env-ambient">
              {[...Array(22)].map((_, i) => (
                <span
                  key={i}
                  className="noor-env-sparkle"
                  style={{
                    left: `${(i * 4.5) + 1}%`,
                    animationDuration: `${5.5 + (i % 5) * 2}s`,
                    animationDelay: `${(i * 0.35) % 4}s`,
                  }}
                />
              ))}
            </div>

            <div className="noor-env-container">
              {/* Top Sacred Bismillah Header */}
              <div className="noor-env-top-bar">
                <p className="noor-env-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p className="noor-env-sub">THE ROYAL WEDDING INVITATION</p>
              </div>

              {/* 3D Realistic Envelope Assembly */}
              <div
                className={`noor-envelope-scene ${
                  isLighting ? "is-lighting" : ""
                } ${isFlapOpen ? "is-flap-open" : ""} ${
                  isCardUp ? "is-card-up" : ""
                } ${isOpening ? "is-opening" : ""}`}
                onClick={handleOpenInvitation}
                role="button"
                tabIndex={0}
                aria-label="Open wedding invitation"
              >
                {/* 3D Envelope Body Case */}
                <div className="noor-env-case">
                  {/* Inside Emerald & Gold Back Lining */}
                  <div className="noor-env-interior">
                    <div className="noor-env-lining-pattern" />
                  </div>

                  {/* Top 3D Folding Flap (Rotates Upward on Open) */}
                  <div className="noor-env-flap-top">
                    {/* Front side of flap (Facing user when closed) */}
                    <div className="noor-flap-top-front">
                      <svg viewBox="0 0 400 240" preserveAspectRatio="none" className="noor-flap-top-svg">
                        <defs>
                          <linearGradient id="topFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="45%" stopColor="#FAF6EF" />
                            <stop offset="100%" stopColor="#EADBBE" />
                          </linearGradient>
                          <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E8CA7D" />
                            <stop offset="50%" stopColor="#FFF4BC" />
                            <stop offset="100%" stopColor="#B38728" />
                          </linearGradient>
                          <filter id="topFlapShadow" x="-10%" y="-10%" width="120%" height="140%">
                            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(20,12,6,0.35)" />
                          </filter>
                        </defs>
                        {/* Solid Opaque Triangle Flap */}
                        <polygon points="0,0 200,230 400,0" fill="url(#topFlapGrad)" filter="url(#topFlapShadow)" />
                        <polyline points="0,0 200,230 400,0" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="3.5" />
                        
                        {/* Elegant Islamic Moroccan Arch Filigree Carvings */}
                        <path d="M 60,15 Q 200,185 340,15" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.5" opacity="0.75" />
                        <path d="M 110,15 Q 200,145 290,15" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.2" opacity="0.6" />
                        <path d="M 170,95 Q 200,130 230,95" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.5" />
                        <circle cx="200" cy="85" r="14" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.5" />
                        <circle cx="200" cy="85" r="5" fill="#D4AF37" opacity="0.9" />
                        
                        {/* Corner Flourishes */}
                        <path d="M 15,10 Q 45,15 35,45" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.5" />
                        <path d="M 385,10 Q 355,15 365,45" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.5" />
                      </svg>
                    </div>

                    {/* Reverse side of flap (Visible when opened) */}
                    <div className="noor-flap-top-back">
                      <div className="noor-flap-back-pattern" />
                    </div>
                  </div>

                  {/* Inner Gilded Royal Invitation Card (Slides Up on Open) */}
                  <div className="noor-env-card-insert">
                    <div className="noor-env-card-inner">
                      <div className="noor-card-arch-top">
                        <span className="noor-card-bismillah-mini">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                        <div className="noor-card-divider-line" />
                      </div>
                      <div className="noor-card-content">
                        <p className="noor-card-tagline">ROYAL WEDDING INVITATION</p>
                        <h2 className="noor-card-couple-names">
                          {brideName} <span className="noor-ampersand">&</span> {groomName}
                        </h2>
                        <div className="noor-card-ornament">✦ ⚜ ✦</div>
                        <p className="noor-card-date">{formattedDate}</p>
                        <p className="noor-card-venue">{venueName}</p>
                      </div>
                      <p className="noor-card-quran-verse">"And We created you in pairs" — Surah An-Naba</p>
                    </div>
                  </div>

                  {/* Solid Opaque Front Pocket Assembly (Covers Card Completely When Closed) */}
                  <div className="noor-env-front-pocket">
                    <svg viewBox="0 0 400 320" preserveAspectRatio="none" className="noor-pocket-svg">
                      <defs>
                        <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FAF6EF" />
                          <stop offset="60%" stopColor="#F3ECE0" />
                          <stop offset="100%" stopColor="#E4D8C3" />
                        </linearGradient>
                      </defs>
                      {/* Opaque V-Fold Pocket Body */}
                      <polygon points="0,0 200,150 400,0 400,320 0,320" fill="url(#pocketGrad)" />
                      {/* Gold Hairline Borders on Pocket Folds */}
                      <polyline points="0,0 200,150 400,0" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="3" />
                      <line x1="0" y1="320" x2="200" y2="150" stroke="url(#goldTrimGrad)" strokeWidth="1.5" opacity="0.6" />
                      <line x1="400" y1="320" x2="200" y2="150" stroke="url(#goldTrimGrad)" strokeWidth="1.5" opacity="0.6" />

                      {/* Bottom Arch Filigree */}
                      <path d="M 160,240 Q 200,195 240,240" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="200" cy="255" r="7" fill="none" stroke="url(#goldTrimGrad)" strokeWidth="1.5" />
                      <circle cx="200" cy="255" r="3" fill="#D4AF37" />
                    </svg>
                  </div>

                  {/* Dynamic Radiant Light Sweep Across Envelope */}
                  <div className="noor-env-light-sweep" />
                  <div className="noor-env-gold-halo" />

                  {/* Central 24K Royal Gold Wax Seal Medallion */}
                  <div className="noor-wax-seal-anchor">
                    <div className="noor-wax-seal-body">
                      {/* Outer Golden Aura Ring */}
                      <div className="noor-seal-aura" />
                      
                      {/* 3D Beveled Wax Seal Medallion */}
                      <div className="noor-seal-lacquer">
                        <div className="noor-seal-bezel">
                          <span className="noor-seal-crown">👑</span>
                          <span className="noor-seal-monogram">
                            {brideName[0]}&{groomName[0]}
                          </span>
                          <span className="noor-seal-wreath">✦ ⚜ ✦</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Tap To Open Floating Pill */}
                    <div className="noor-tap-pill">
                      <Sparkle size={13} className="text-[#D4AF37]" weight="fill" />
                      <span className="noor-tap-pill-text">TAP TO OPEN</span>
                      <Sparkle size={13} className="text-[#D4AF37]" weight="fill" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Couple Names Footer */}
              <div className="noor-env-bottom-bar">
                <p className="noor-env-names">{brideName} & {groomName}</p>
                <p className="noor-env-hint">Touch the royal seal to unfold the invitation & music</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Ambient Music Control */}
      {isOpen && (
        <button
          className="noor-music-toggle"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? <SpeakerHigh size={22} /> : <SpeakerSlash size={22} />}
        </button>
      )}

      {/* =================================================================== */}
      {/* SECTION 1: HERO PORTAL (Mughal Palace Arch overlooking Grand Mosque) */}
      {/* =================================================================== */}
      <section ref={heroRef} className="noor-hero">
        <motion.div
          className="noor-hero-bg"
          style={{
            backgroundImage: "url('/templates/noor-e-nikah/hero-palace-mobile.jpg')",
            y: heroBgY,
          }}
        />
        <div className="noor-hero-overlay" />

        <motion.div
          className="noor-hero-content"
          style={{ y: heroCardY, opacity: heroCardOpacity }}
        >
          <p className="noor-hero-eyebrow">YOU ARE INVITED TO THE</p>
          <h1 className="noor-hero-title">Wedding Day</h1>

          <div className="noor-hero-divider">
            <span className="noor-hero-divider-line" />
            <span>◆</span>
            <span className="noor-hero-divider-line" />
          </div>

          <h2 className="noor-hero-names">
            {brideName} <span className="noor-hero-amp">&</span> {groomName}
          </h2>

          <p className="noor-hero-date">{shortDate}</p>
        </motion.div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 2: BISMILLAH INVOCATION, SPIRITUAL QUOTE & COUNTDOWN       */}
      {/* =================================================================== */}
      <section className="noor-section">
        <div className="noor-welcome-card">
          {/* Lantern Accent */}
          <div style={{ width: 80, height: 100, margin: "0 auto -10px auto" }}>
            <Lottie src={noorCrescentLantern} loop autoplay />
          </div>

          <p className="noor-bismillah-lg">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <div className="noor-quote-lines">
            <p>Two Souls</p>
            <p>One destiny</p>
            <span className="noor-quote-written">
              A Lifetime written by Allah
            </span>
          </div>

          <p className="noor-welcome-msg">
            Dear Friends and Family, join us for an evening of love, laughter,
            duas, and unforgettable memories as we begin our forever.
          </p>

          <div className="noor-countdown-wrap">
            <h3 className="noor-countdown-title">The Celebration Begins In</h3>

            <div className="noor-timer-grid">
              <div className="noor-timer-box">
                <span className="noor-timer-val">{timeLeft.days}</span>
                <span className="noor-timer-unit">Days</span>
              </div>
              <span className="noor-timer-sep">:</span>
              <div className="noor-timer-box">
                <span className="noor-timer-val">{timeLeft.hours}</span>
                <span className="noor-timer-unit">Hours</span>
              </div>
              <span className="noor-timer-sep">:</span>
              <div className="noor-timer-box">
                <span className="noor-timer-val">{timeLeft.minutes}</span>
                <span className="noor-timer-unit">Minutes</span>
              </div>
              <span className="noor-timer-sep">:</span>
              <div className="noor-timer-box">
                <span className="noor-timer-val">{timeLeft.seconds}</span>
                <span className="noor-timer-unit">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 3: CEREMONIES & NIKAH TIMELINE                             */}
      {/* =================================================================== */}
      <section className="noor-section" style={{ backgroundColor: "#F7F2E8" }}>
        <p className="noor-hero-eyebrow">CELEBRATION SCHEDULE</p>
        <h2
          className="noor-hero-title"
          style={{ fontSize: "clamp(2.4rem, 6vw, 3.6rem)" }}
        >
          Ceremonies & Events
        </h2>

        <div className="noor-events-grid">
          {events.map((evt, idx) => (
            <div key={idx} className="noor-event-card">
              <span className="noor-event-badge">EVENT {idx + 1}</span>
              <h3 className="noor-event-name">{evt.name || evt.title}</h3>
              <p className="noor-event-time">
                <CalendarBlank size={16} className="text-[#D4AF37]" />
                <span>
                  {evt.date} · {evt.time}
                </span>
              </p>
              <p className="noor-event-venue">
                <MapPin size={16} className="text-[#D4AF37]" />
                <span>{evt.venue || evt.location}</span>
              </p>
              {evt.description && (
                <p className="noor-event-desc">{evt.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 4: CURATED PHOTO GALLERY                                   */}
      {/* =================================================================== */}
      <section className="noor-section">
        <p className="noor-hero-eyebrow">OUR MOMENTS</p>
        <h2
          className="noor-hero-title"
          style={{ fontSize: "clamp(2.4rem, 6vw, 3.6rem)" }}
        >
          Cherished Memories
        </h2>

        <div className="noor-gallery-grid">
          {galleryImages.map((imgUrl, i) => (
            <div
              key={i}
              className="noor-gallery-item"
              onClick={() => setSelectedPhoto(imgUrl)}
            >
              <img src={imgUrl} alt={`Wedding moment ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[1100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              src={selectedPhoto}
              alt="Enlarged moment"
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl border border-amber-200/30"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* SECTION 5: VENUE NAVIGATION & DRESS CODE                            */}
      {/* =================================================================== */}
      <section className="noor-section" style={{ backgroundColor: "#F7F2E8" }}>
        <div className="noor-card-wrap text-center">
          <p className="noor-hero-eyebrow">LOCATION & DETAILS</p>
          <h2
            className="noor-hero-title"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}
          >
            The Wedding Venue
          </h2>

          <h3
            className="font-serif text-2xl text-stone-900 font-bold mt-3 mb-1"
            style={{ fontFamily: "var(--noor-font-serif)" }}
          >
            {venueName}
          </h3>
          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            {venueAddress}
          </p>

          {data?.showDressCode !== false && (
            <div className="border-t border-amber-200/50 pt-5 mt-4 mb-6">
              <span className="text-xs uppercase font-semibold text-amber-800 tracking-wider block mb-1">
                DRESS CODE
              </span>
              <p className="text-sm text-stone-700 italic">
                {data?.dressCodeText ||
                  "Royal Traditional & Modest / Ivory & Pastel Gold tones"}
              </p>
            </div>
          )}

          <a
            href={venueMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="noor-btn-gold"
          >
            <MapPin size={16} weight="fill" />
            <span>Open in Google Maps</span>
            <ArrowSquareOut size={16} />
          </a>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 6: RSVP & BLESSINGS INBOX                                  */}
      {/* =================================================================== */}
      <section className="noor-section">
        <div className="noor-card-wrap">
          <div className="text-center mb-6">
            <p className="noor-hero-eyebrow">KINDLY RESPOND</p>
            <h2
              className="noor-hero-title"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}
            >
              RSVP & Duas
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Please let us know if you will be joining our sacred celebration.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check size={24} weight="bold" />
              </div>
              <h3 className="font-serif text-xl text-stone-900 font-bold">
                JazakAllah Khair!
              </h3>
              <p className="text-xs text-stone-600">
                Your response and beautiful duas have been received with love.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="e.g. Tariq & Family"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                    Attending?
                  </label>
                  <select
                    value={rsvpAttending}
                    onChange={(e) => setRsvpAttending(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="yes">Joyfully Attending</option>
                    <option value="no">Regretfully Declining</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Your Duas & Blessing Message
                </label>
                <textarea
                  rows={3}
                  value={rsvpDua}
                  onChange={(e) => setRsvpDua(e.target.value)}
                  placeholder="May Allah bless this union with eternal joy..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button type="submit" className="noor-btn-gold w-full mt-2">
                <Heart size={16} weight="fill" />
                <span>Send RSVP & Duas</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-amber-200/40 bg-[#F5EFE4]">
        <p
          className="font-serif text-2xl text-stone-800"
          style={{ fontFamily: "var(--noor-font-serif)" }}
        >
          {brideName} & {groomName}
        </p>
        <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest">
          {formattedDate} · {venueName}
        </p>
        <p className="text-[10px] text-stone-400 mt-4 uppercase tracking-widest">
          Created with Unfold Wedding Invitations
        </p>
      </footer>
    </div>
  );
}
