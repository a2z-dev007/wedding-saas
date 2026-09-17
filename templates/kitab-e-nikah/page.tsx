"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "motion/react";
import confetti from "canvas-confetti";
import {
  SpeakerHigh,
  SpeakerSlash,
  CalendarBlank,
  Clock,
  MapPin,
  Sparkle,
  ArrowSquareOut,
  Heart,
  CheckCircle,
  X,
  ArrowsClockwise,
  EnvelopeSimpleOpen,
  BookOpen,
} from "@phosphor-icons/react";
import defaultData from "./data.json";
import "./style.css";

interface EventItem {
  name?: string;
  date?: string;
  time?: string;
  venue?: string;
  location?: string;
  dressCode?: string;
  description?: string;
  enabled?: boolean;
}

interface KitabENikahProps {
  data?: any;
}

export default function KitabENikah({ data }: KitabENikahProps) {
  const resolvedData = { ...defaultData, ...data };

  // Video & Playback State
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoOpened, setVideoOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  // References
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Hydration Mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 600], [0, 70]);
  const yParticles = useTransform(scrollY, [0, 800], [0, -100]);

  // Immediate Flash celebration & transition into permanent royal hero as soon as palace gates open
  const triggerGateOpeningReveal = () => {
    if (isHeroRevealed) return;
    setIsFlashing(true);
    setIsHeroRevealed(true);
    setIsUnlocked(true);
    setVideoOpened(true);
    try {
      confetti({
        particleCount: 95,
        spread: 90,
        origin: { y: 0.45 },
        colors: ["#E5B869", "#FEF0C7", "#991B1B", "#FFFDF8", "#D4AF37"],
      });
    } catch (_) {}
    setTimeout(() => setIsFlashing(false), 750);
  };

  // RSVP Form State
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpAttending, setRsvpAttending] = useState("yes");
  const [rsvpGuests, setRsvpGuests] = useState("2");
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpDua, setRsvpDua] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Extract Props / Data
  const brideName = data?.brideName || data?.couple?.brideName || resolvedData.couple?.brideName || "Maryam";
  const groomName = data?.groomName || data?.couple?.groomName || resolvedData.couple?.groomName || "Ibrahim";
  const weddingDateStr = data?.weddingDate || data?.date || resolvedData.weddingDate;
  const weddingDate = new Date(weddingDateStr);
  const formattedDate = !isNaN(weddingDate.getTime())
    ? weddingDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : resolvedData.dateFormatted;

  const venueName = data?.venueName || data?.venue?.name || resolvedData.venue?.name;
  const venueAddress = data?.venueAddress || data?.venue?.address || resolvedData.venue?.address;
  const venueMapUrl = data?.venueMapUrl || data?.venue?.mapUrl || resolvedData.venue?.mapUrl;
  const islamicDate = data?.islamicDate || resolvedData.islamicDate || "03 Dhu al-Qi'dah 1448 AH";

  const events: EventItem[] = (data?.events || resolvedData.events).filter((e: any) => e.enabled !== false);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 233, hours: 16, minutes: 10, seconds: 45 });
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

  // Handle Tap to Open Video
  const handleOpenInvitation = () => {
    if (isPlayingVideo && !videoOpened) return;

    setIsPlayingVideo(true);

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch((e) => console.log("Audio play:", e));
    }

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => {
          // Gates open smoothly
        })
        .catch((err) => {
          console.log("Video play error:", err);
          triggerGateOpeningReveal();
        });
    } else {
      triggerGateOpeningReveal();
    }
  };

  const handleVideoEnded = () => {
    triggerGateOpeningReveal();
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeroRevealed(false);
    setVideoOpened(false);
    setIsPlayingVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch((err) => {
          console.log("Audio play error:", err);
        });
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E5B869", "#782233", "#FBF5E6", "#FFFFFF"],
      });
    } catch (_) {}
    setTimeout(() => {
      setIsRsvpOpen(false);
      setIsSubmitted(false);
    }, 2800);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="kitab-e-nikah-root">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src={resolvedData.audioTrack || "/audio/wedding-ambience.mp3"}
        loop
        preload="auto"
        onPlay={() => setIsPlayingMusic(true)}
        onPause={() => setIsPlayingMusic(false)}
      />

      {/* Royal Unlock Golden Amber Flash Burst Overlay */}
      {isFlashing && <div className="kn-unlock-flash-overlay" aria-hidden="true" />}

      {/* Ambient Floating Velvet Amber & Gold Particles with Parallax */}
      <motion.div className="kn-floating-particles" style={{ y: yParticles }} aria-hidden="true">
        <span className="kn-particle p1"></span>
        <span className="kn-particle p2"></span>
        <span className="kn-particle p3"></span>
        <span className="kn-particle p4"></span>
        <span className="kn-particle p5"></span>
        <span className="kn-particle p6"></span>
      </motion.div>

      {/* Floating Music Toggle with Dynamic Soundwave */}
      <motion.button
        className="kn-music-toggle"
        onClick={toggleMusic}
        aria-label={isPlayingMusic ? "Mute music" : "Play music"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {isPlayingMusic ? (
          <>
            <SpeakerHigh size={18} weight="fill" />
            <span className="kn-soundwave-bars">
              <span className="kn-bar bar-1"></span>
              <span className="kn-bar bar-2"></span>
              <span className="kn-bar bar-3"></span>
            </span>
          </>
        ) : (
          <SpeakerSlash size={18} weight="fill" />
        )}
      </motion.button>

      <div className="kn-viewport-shell">
        {/* Top Sacred Header with Gentle Float */}
        <motion.header
          className="kn-header-arch kn-floating-element"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="kn-arch-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="kn-arch-tag">KITAB-E-NIKAH · THE ROYAL PALACE</div>
        </motion.header>

        {/* ── Palace Hero Section Container (Video Gate -> Immediate Flash into Permanent Parallax Hero) ── */}
        <section className="kn-hero-section-container">
          <AnimatePresence mode="wait">
            {!isHeroRevealed ? (
              <motion.div
                key="video-gate"
                className="kn-video-hero-wrapper"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`kn-video-card ${videoOpened ? "kn-card-revealed" : ""}`}
                  onClick={!isPlayingVideo ? handleOpenInvitation : undefined}
                >
                  {/* The Opening Palace Gate Video */}
                  <video
                    ref={videoRef}
                    src={resolvedData.videoOpening.videoUrl}
                    playsInline
                    webkit-playsinline="true"
                    muted={false}
                    preload="auto"
                    className="kn-main-video"
                    onEnded={handleVideoEnded}
                    onTimeUpdate={() => {
                      if (
                        videoRef.current &&
                        videoRef.current.duration > 0 &&
                        videoRef.current.currentTime >= videoRef.current.duration - 0.25 &&
                        !isHeroRevealed
                      ) {
                        triggerGateOpeningReveal();
                      }
                    }}
                  />

                  {/* Tap Prompt Ribbon on Gate Doors */}
                  {!isPlayingVideo && (
                    <div className="kn-tap-prompt-ribbon">
                      <Sparkle size={11} className="text-[#E5B869]" weight="fill" />
                      <span>TAP TO OPEN PALACE GATES</span>
                      <Sparkle size={11} className="text-[#E5B869]" weight="fill" />
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* ── Permanent Palace Royal Hero Section with Parallax Background & Depth ── */
              <motion.div
                key="permanent-hero"
                className="kn-permanent-hero-card"
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Parallax Palace Background Image Layer */}
                <motion.div
                  className="kn-hero-bg-layer"
                  style={{ y: yHeroBg }}
                  aria-hidden="true"
                >
                  <img
                    src="/templates/kitab-e-nikah/palace-hall.jpg"
                    alt="Royal Palace Hallway"
                    className="kn-hero-bg-img"
                  />
                  <div className="kn-hero-bg-overlay" />
                  <div className="kn-hero-light-beam" />
                </motion.div>

                {/* Frosted Archway Frame Content */}
                <div className="kn-hero-inner-frame">
                  {/* Decorative Ottoman Arch Crest */}
                  <motion.div
                    className="kn-hero-arch-crest"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                  >
                    <div className="kn-hero-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                    <span className="kn-hero-honor-tag">IN THE NAME OF ALLAH · THE MOST MERCIFUL</span>
                  </motion.div>

                  {/* Grand Couple Presentation */}
                  <motion.div
                    className="kn-hero-couple-block"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <p className="kn-hero-family-intro">TOGETHER WITH THEIR FAMILIES</p>
                    <h1 className="kn-hero-names">
                      <span className="kn-hero-bride">{brideName}</span>
                      <span className="kn-hero-amp">&</span>
                      <span className="kn-hero-groom">{groomName}</span>
                    </h1>
                    <p className="kn-hero-subquote">
                      Request the honour of your presence & prayers as they unite in the holy bond of Nikah
                    </p>
                  </motion.div>

                  {/* Badges: Date, Time, Venue */}
                  <motion.div
                    className="kn-hero-meta-badges"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                  >
                    <div className="kn-hero-meta-badge">
                      <CalendarBlank size={14} className="text-[#E5B869]" weight="fill" />
                      <span>{formattedDate}</span>
                    </div>

                    <div className="kn-hero-meta-badge">
                      <Clock size={14} className="text-[#E5B869]" weight="fill" />
                      <span>Nikah: 4:30 PM &nbsp;•&nbsp; Banquet: 7:30 PM</span>
                    </div>

                    <div className="kn-hero-meta-badge kn-hero-venue-badge">
                      <MapPin size={14} className="text-[#E5B869]" weight="fill" />
                      <span>{venueName}, {resolvedData.venue?.city || "Istanbul"}</span>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="kn-hero-actions-row"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                  >
                    <button
                      className="kn-hero-btn-primary"
                      onClick={() => setIsRsvpOpen(true)}
                    >
                      <EnvelopeSimpleOpen size={15} weight="bold" />
                      <span>Confirm RSVP</span>
                    </button>

                    <button
                      className="kn-hero-btn-secondary"
                      onClick={() => scrollToSection("kn-events-section")}
                    >
                      <Clock size={15} weight="bold" />
                      <span>Itinerary</span>
                    </button>

                    <button
                      className="kn-hero-btn-replay"
                      onClick={handleReplay}
                      title="Replay Palace Gates Opening"
                    >
                      <ArrowsClockwise size={15} weight="bold" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll Down Indicator */}
          {isUnlocked && (
            <motion.div
              className="kn-scroll-cue"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => scrollToSection("kn-quran-section")}
            >
              <span>Scroll for ceremonies & venue</span>
              <div className="kn-scroll-chevron">↓</div>
            </motion.div>
          )}
        </section>

        {/* ── Unlocked Royal Invitation Sections (Accessible after Envelope Reveal & Flash) ── */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              className="kn-unlocked-flow"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* ── Quranic Verse Section ── */}
              <motion.section
                id="kn-quran-section"
                className="kn-section kn-quran-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="kn-quran-glow-backdrop"></div>
                <p className="kn-arabic-verse">{resolvedData.verse.arabic}</p>
                <p className="kn-verse-translation">&ldquo;{resolvedData.verse.translation}&rdquo;</p>
                <p className="kn-verse-ref">{resolvedData.verse.reference}</p>
              </motion.section>

              {/* ── Live Countdown Box ── */}
              <motion.section
                className="kn-section kn-countdown-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="kn-section-subtitle">COUNTING THE BLESSED DAYS</span>
                <h2 className="kn-section-title">Until The Sacred Nikah</h2>
                <div className="kn-countdown-grid">
                  {[
                    { val: timeLeft.days, lbl: "Days" },
                    { val: timeLeft.hours, lbl: "Hours" },
                    { val: timeLeft.minutes, lbl: "Mins" },
                    { val: timeLeft.seconds, lbl: "Secs" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="kn-countdown-cell"
                      initial={{ opacity: 0, scale: 0.85, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -3, scale: 1.04 }}
                    >
                      <span className="kn-time-val">{item.val}</span>
                      <span className="kn-time-lbl">{item.lbl}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="kn-hijri-date">Islamic Date: {islamicDate}</p>
              </motion.section>

              {/* ── Wedding Ceremonies Timeline ── */}
              <motion.section
                id="kn-events-section"
                className="kn-section kn-events-wrapper"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="kn-section-subtitle">CEREMONY & RECEPTION</span>
                <h2 className="kn-section-title">Nikah Itinerary</h2>

                <div className="kn-events-list">
                  {events.map((evt, idx) => (
                    <motion.div
                      key={idx}
                      className="kn-event-card"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: idx * 0.12 }}
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    >
                      <div className="kn-event-card-header">
                        <span className="kn-event-num">0{idx + 1}</span>
                        <h3 className="kn-event-name">{evt.name}</h3>
                      </div>

                      <div className="kn-event-details">
                        <div className="kn-event-row">
                          <CalendarBlank size={16} className="text-[#E5B869]" weight="fill" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="kn-event-row">
                          <Clock size={16} className="text-[#E5B869]" weight="fill" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="kn-event-row">
                          <MapPin size={16} className="text-[#E5B869]" weight="fill" />
                          <span>{evt.venue} — {evt.location}</span>
                        </div>
                      </div>

                      {evt.dressCode && (
                        <div className="kn-dress-pill">
                          <Sparkle size={12} className="text-[#E5B869]" weight="fill" />
                          <span>Dress Code: {evt.dressCode}</span>
                        </div>
                      )}

                      {evt.description && (
                        <p className="kn-event-desc">{evt.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* ── Venue Destination ── */}
              <motion.section
                className="kn-section kn-venue-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="kn-section-subtitle">THE SACRED DESTINATION</span>
                <h2 className="kn-section-title">{venueName}</h2>
                <p className="kn-venue-addr">{venueAddress}</p>

                <motion.a
                  href={venueMapUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kn-map-cta-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin size={18} weight="bold" />
                  <span>View Location on Map</span>
                  <ArrowSquareOut size={16} weight="bold" />
                </motion.a>
              </motion.section>

              {/* ── RSVP CTA Card ── */}
              <motion.section
                className="kn-section kn-rsvp-banner"
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="kn-rsvp-inner">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart size={36} className="text-[#E5B869] mb-2" weight="fill" />
                  </motion.div>
                  <h2 className="kn-rsvp-title">Your Presence is Our Honour</h2>
                  <p className="kn-rsvp-sub">
                    Please honor us with your confirmed attendance and blessed prayers.
                  </p>
                  <motion.button
                    className="kn-rsvp-open-btn"
                    onClick={() => setIsRsvpOpen(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Confirm Your RSVP</span>
                    <Sparkle size={16} weight="fill" />
                  </motion.button>
                </div>
              </motion.section>

              {/* ── Footer ── */}
              <motion.footer
                className="kn-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0 }}
              >
                <div className="kn-footer-monogram">
                  {brideName[0]}&{groomName[0]}
                </div>
                <h3 className="kn-footer-names">{brideName} & {groomName}</h3>
                <p className="kn-footer-quote">
                  United in Sacred Covenant · Bound by Divine Mercy · Insha&apos;Allah Forever
                </p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RSVP Modal ── */}
      <AnimatePresence>
        {isRsvpOpen && (
          <div className="kn-modal-overlay">
            <motion.div
              className="kn-modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button
                className="kn-modal-close"
                onClick={() => setIsRsvpOpen(false)}
              >
                <X size={18} />
              </button>

              <div className="kn-modal-header">
                <div className="kn-modal-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <h3 className="kn-modal-title">Confirm Attendance</h3>
                <p className="kn-modal-sub">For {brideName} & {groomName}&apos;s Nikah</p>
              </div>

              {isSubmitted ? (
                <div className="kn-success-msg">
                  <CheckCircle size={48} className="text-[#E5B869] mb-3" weight="fill" />
                  <h4 className="text-lg font-serif text-[#E5B869]">JazakAllah Khair!</h4>
                  <p className="text-xs text-[#F5E6CC] mt-1">
                    Your attendance confirmation has been received with warm gratitude.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="kn-rsvp-form">
                  <div className="kn-form-group">
                    <label className="kn-label">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibrahim & Family"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="kn-input"
                    />
                  </div>

                  <div className="kn-form-group">
                    <label className="kn-label">Will you be attending?</label>
                    <div className="kn-radio-group">
                      <button
                        type="button"
                        className={`kn-radio-btn ${rsvpAttending === "yes" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("yes")}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        className={`kn-radio-btn ${rsvpAttending === "no" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("no")}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpAttending === "yes" && (
                    <div className="kn-form-group">
                      <label className="kn-label">Number of Guests Attending</label>
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(e.target.value)}
                        className="kn-select"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5+">5+ Persons (Family)</option>
                      </select>
                    </div>
                  )}

                  <div className="kn-form-group">
                    <label className="kn-label">Your Blessings / Dua for the Couple</label>
                    <textarea
                      rows={3}
                      placeholder="May Allah bless this union with love, mercy, and harmony..."
                      value={rsvpDua}
                      onChange={(e) => setRsvpDua(e.target.value)}
                      className="kn-textarea"
                    />
                  </div>

                  <button type="submit" className="kn-submit-btn">
                    <span>Submit RSVP</span>
                    <Sparkle size={15} weight="fill" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
