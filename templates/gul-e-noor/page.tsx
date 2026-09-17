"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import confetti from "canvas-confetti";
import { ScratchCard } from "@/components/invitation/ScratchCard";
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

interface GulENoorProps {
  data?: any;
}

export default function GulENoor({ data }: GulENoorProps) {
  const resolvedData = { ...defaultData, ...data };

  // Video & Playback State
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoOpened, setVideoOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
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

  // Flash celebration & unlock lower sections once card writing completes
  useEffect(() => {
    if (videoOpened && !isUnlocked) {
      const timer = setTimeout(() => {
        setIsFlashing(true);
        setIsUnlocked(true);
        try {
          confetti({
            particleCount: 65,
            spread: 75,
            origin: { y: 0.55 },
            colors: ["#D4849A", "#FADEB8", "#E5A9B8", "#FFFDF8"],
          });
        } catch (_) {}
        setTimeout(() => setIsFlashing(false), 900);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [videoOpened, isUnlocked]);

  // RSVP Form State
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpAttending, setRsvpAttending] = useState("yes");
  const [rsvpGuests, setRsvpGuests] = useState("2");
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpDua, setRsvpDua] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Extract Props / Data
  const brideName = data?.brideName || data?.couple?.brideName || resolvedData.couple?.brideName || "Areesha";
  const groomName = data?.groomName || data?.couple?.groomName || resolvedData.couple?.groomName || "Hamza";
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

  const revealMonthDay = !isNaN(weddingDate.getTime())
    ? weddingDate.toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" })
    : "March 15";
  const revealDayName = !isNaN(weddingDate.getTime())
    ? weddingDate.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" })
    : "Saturday";
  const revealYearStr = !isNaN(weddingDate.getTime())
    ? weddingDate.getFullYear().toString()
    : "2026";

  const venueName = data?.venueName || data?.venue?.name || resolvedData.venue?.name;
  const venueAddress = data?.venueAddress || data?.venue?.address || resolvedData.venue?.address;
  const venueMapUrl = data?.venueMapUrl || data?.venue?.mapUrl || resolvedData.venue?.mapUrl;
  const islamicDate = data?.islamicDate || resolvedData.islamicDate || "12 Ramadan 1448 AH";

  const events: EventItem[] = (data?.events || resolvedData.events).filter((e: any) => e.enabled !== false);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 184, hours: 12, minutes: 45, seconds: 15 });
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
          // Content will write in when envelope finishes opening completely
        })
        .catch((err) => {
          console.log("Video play error:", err);
          setVideoOpened(true);
        });
    } else {
      setVideoOpened(true);
    }
  };

  const handleVideoEnded = () => {
    setVideoOpened(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoOpened(false);
    setIsPlayingVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Ink handwriting animation variants
  const inkContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.12,
      },
    },
  };

  const inkItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: "easeOut",
      },
    },
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
        colors: ["#D4849A", "#F5D0DB", "#D4AF37", "#FFFFFF"],
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
    <div className="gul-e-noor-root">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src={resolvedData.audioTrack || "/audio/wedding-ambience.mp3"}
        loop
        preload="auto"
        onPlay={() => setIsPlayingMusic(true)}
        onPause={() => setIsPlayingMusic(false)}
      />

      {/* Royal Unlock Golden Flash Burst Overlay */}
      {isFlashing && <div className="gn-unlock-flash-overlay" aria-hidden="true" />}

      {/* Ambient Floating Rose-Gold Petal & Sparkle Particles */}
      <div className="gn-floating-particles" aria-hidden="true">
        <span className="gn-particle p1"></span>
        <span className="gn-particle p2"></span>
        <span className="gn-particle p3"></span>
        <span className="gn-particle p4"></span>
        <span className="gn-particle p5"></span>
        <span className="gn-particle p6"></span>
      </div>

      {/* Floating Music Toggle with Soundwave */}
      <motion.button
        className="gn-music-toggle"
        onClick={toggleMusic}
        aria-label={isPlayingMusic ? "Mute music" : "Play music"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {isPlayingMusic ? (
          <>
            <SpeakerHigh size={18} weight="fill" />
            <span className="gn-soundwave-bars">
              <span className="gn-bar bar-1"></span>
              <span className="gn-bar bar-2"></span>
              <span className="gn-bar bar-3"></span>
            </span>
          </>
        ) : (
          <SpeakerSlash size={18} weight="fill" />
        )}
      </motion.button>

      <div className="gn-viewport-shell">
        {/* Top Sacred Arch Inscription with Gentle Float */}
        <motion.header
          className="gn-header-arch gn-floating-element"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="gn-arch-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="gn-arch-tag">SACRED NIKAH INVITATION · GUL-E-NOOR</div>
        </motion.header>

        {/* ── Centerpiece Interactive Video Card ── */}
        <section className="gn-video-hero-wrapper">
          <div
            className={`gn-video-card ${videoOpened ? "gn-card-revealed" : ""}`}
            onClick={!isPlayingVideo ? handleOpenInvitation : undefined}
          >
            {/* The Opening Envelope Video */}
            <video
              ref={videoRef}
              src={resolvedData.videoOpening.videoUrl}
              playsInline
              webkit-playsinline="true"
              muted={false}
              preload="auto"
              className="gn-main-video"
              onEnded={handleVideoEnded}
              onTimeUpdate={() => {
                if (
                  videoRef.current &&
                  videoRef.current.duration > 0 &&
                  videoRef.current.currentTime >= videoRef.current.duration - 0.15 &&
                  !videoOpened
                ) {
                  setVideoOpened(true);
                }
              }}
            />

            {/* Seamless Stamped Initials on Envelope Wax Seal */}
            <div className={`gn-seal-monogram-anchor ${isPlayingVideo ? "gn-seal-lifting" : ""}`}>
              <div className="gn-wax-initials-ring">
                <span className="gn-wax-initials">
                  {brideName[0]}&{groomName[0]}
                </span>
              </div>
            </div>

            {/* Tap prompt ribbon */}
            {!isPlayingVideo && (
              <div className="gn-tap-prompt-ribbon">
                <Sparkle size={11} className="text-[#D4849A]" weight="fill" />
                <span>TAP TO OPEN INVITATION</span>
                <Sparkle size={11} className="text-[#D4849A]" weight="fill" />
              </div>
            )}

            {/* Seamless Paper Print Overlay directly filling the Ivory Card — Clean & Legible */}
            <AnimatePresence>
              {videoOpened && (
                <>
                  {/* Parchment Text (Strictly within Inner Gold Borders) */}
                  <motion.div
                    className="gn-blank-card-overlay"
                    variants={inkContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="gn-paper-print-content">
                      {/* Top Sacred Header */}
                      <motion.div className="gn-print-header-group" variants={inkItemVariants}>
                        <div className="gn-print-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                        <p className="gn-print-honor">TOGETHER WITH THEIR FAMILIES</p>
                      </motion.div>

                      {/* Grand Couple Presentation (Clean, Proportional & Regal) */}
                      <motion.div className="gn-print-couple-group" variants={inkItemVariants}>
                        <h1 className="gn-print-couple-names">
                          <span className="gn-couple-bride">{brideName}</span>
                          <span className="gn-print-amp">&</span>
                          <span className="gn-couple-groom">{groomName}</span>
                        </h1>
                        <p className="gn-print-subtext">
                          Invite you to celebrate their union and Nikah
                        </p>
                      </motion.div>

                      {/* Auspicious Ceremony Timings & Venue Details */}
                      <motion.div className="gn-print-details-group" variants={inkItemVariants}>
                        <div className="gn-print-date-badge">
                          <CalendarBlank size={12} className="text-[#A34360]" weight="fill" />
                          <span>{formattedDate}</span>
                        </div>

                        <div className="gn-print-venue-badge">
                          <MapPin size={11} className="text-[#A34360]" weight="fill" />
                          <span>{venueName}, {resolvedData.venue?.city || "Dubai"}</span>
                        </div>

                        <div className="gn-print-time-text">
                          <Clock size={10} className="text-[#A34360]" weight="fill" />
                          <span>Nikah: 4:00 PM &nbsp;•&nbsp; Reception: 7:00 PM</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Envelope Bottom Action Controls */}
                  <motion.div
                    className="gn-envelope-actions-bar"
                    variants={inkItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      className="gn-print-btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRsvpOpen(true);
                      }}
                    >
                      <EnvelopeSimpleOpen size={13} weight="bold" />
                      <span>RSVP</span>
                    </button>

                    <button
                      className="gn-print-btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSection("gn-events-section");
                      }}
                    >
                      <Clock size={13} weight="bold" />
                      <span>Itinerary</span>
                    </button>

                    <button
                      className="gn-print-btn-replay"
                      onClick={handleReplay}
                      title="Replay Video Opening"
                    >
                      <ArrowsClockwise size={13} weight="bold" />
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll Down Indicator */}
          {isUnlocked && (
            <motion.div
              className="gn-scroll-cue"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => scrollToSection("gn-quran-section")}
            >
              <span>Scroll for itinerary & details</span>
              <div className="gn-scroll-chevron">↓</div>
            </motion.div>
          )}
        </section>

        {/* ── Unlocked Royal Invitation Sections (Accessible after Envelope Reveal & Flash) ── */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              className="gn-unlocked-flow"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* ── Quranic Verse Section ── */}
              <motion.section
                id="gn-quran-section"
                className="gn-section gn-quran-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="gn-quran-glow-backdrop"></div>
                <p className="gn-arabic-verse">{resolvedData.verse.arabic}</p>
                <p className="gn-verse-translation">&ldquo;{resolvedData.verse.translation}&rdquo;</p>
                <p className="gn-verse-ref">{resolvedData.verse.reference}</p>
              </motion.section>

              {/* ── Live Countdown Box ── */}
              <motion.section
                className="gn-section gn-countdown-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="gn-section-subtitle">WITH FAITH & LOVE</span>
                <h2 className="gn-section-title">Counting The Days</h2>
                <div className="gn-countdown-grid">
                  {[
                    { val: timeLeft.days, lbl: "Days" },
                    { val: timeLeft.hours, lbl: "Hours" },
                    { val: timeLeft.minutes, lbl: "Mins" },
                    { val: timeLeft.seconds, lbl: "Secs" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="gn-countdown-cell"
                      initial={{ opacity: 0, scale: 0.85, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -3, scale: 1.04 }}
                    >
                      <span className="gn-time-val">{item.val}</span>
                      <span className="gn-time-lbl">{item.lbl}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="gn-hijri-date">Islamic Date: {islamicDate}</p>

                {/* ── Interactive Scratch to Reveal Date ── */}
                <div className="gn-scratch-section">
                  <div className="gn-scratch-header">
                    <span className="gn-scratch-subtitle">INTERACTIVE INVITATION</span>
                    <h3 className="gn-scratch-title">Scratch Rose Gold Foil to Reveal Date</h3>
                    <p className="gn-scratch-desc">Swipe across the foil to uncover our sacred wedding date</p>
                  </div>
                  <div className="gn-scratch-card-wrapper">
                    <ScratchCard
                      revealDate={revealMonthDay}
                      revealDay={revealDayName}
                      revealYear={revealYearStr}
                      islamicDate={islamicDate}
                      theme="rose"
                      onRevealComplete={() => {
                        try {
                          confetti({
                            particleCount: 70,
                            spread: 75,
                            origin: { y: 0.7 },
                            colors: ["#D4849A", "#FADEB8", "#E5A9B8", "#FFFDF8"],
                          });
                        } catch (_) {}
                      }}
                    />
                  </div>
                </div>
              </motion.section>

              {/* ── Event Timeline ── */}
              <motion.section
                id="gn-events-section"
                className="gn-section gn-events-wrapper"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="gn-section-subtitle">PROGRAM OF CELEBRATION</span>
                <h2 className="gn-section-title">Wedding Itinerary</h2>

                <div className="gn-events-list">
                  {events.map((evt, idx) => (
                    <motion.div
                      key={idx}
                      className="gn-event-card"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: idx * 0.12 }}
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    >
                      <div className="gn-event-card-header">
                        <span className="gn-event-num">0{idx + 1}</span>
                        <h3 className="gn-event-name">{evt.name}</h3>
                      </div>

                      <div className="gn-event-details">
                        <div className="gn-event-row">
                          <CalendarBlank size={16} className="text-[#D4849A]" weight="fill" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="gn-event-row">
                          <Clock size={16} className="text-[#D4849A]" weight="fill" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="gn-event-row">
                          <MapPin size={16} className="text-[#D4849A]" weight="fill" />
                          <span>{evt.venue} — {evt.location}</span>
                        </div>
                      </div>

                      {evt.dressCode && (
                        <div className="gn-dress-pill">
                          <Sparkle size={12} className="text-[#D4849A]" weight="fill" />
                          <span>Dress Code: {evt.dressCode}</span>
                        </div>
                      )}

                      {evt.description && (
                        <p className="gn-event-desc">{evt.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* ── Venue Destination ── */}
              <motion.section
                className="gn-section gn-venue-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="gn-section-subtitle">THE WEDDING DESTINATION</span>
                <h2 className="gn-section-title">{venueName}</h2>
                <p className="gn-venue-addr">{venueAddress}</p>

                <motion.a
                  href={venueMapUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gn-map-cta-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin size={18} weight="bold" />
                  <span>Get Directions on Map</span>
                  <ArrowSquareOut size={16} weight="bold" />
                </motion.a>
              </motion.section>

              {/* ── RSVP CTA Banner ── */}
              <motion.section
                className="gn-section gn-rsvp-banner"
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="gn-rsvp-inner">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart size={36} className="text-[#D4849A] mb-2" weight="fill" />
                  </motion.div>
                  <h2 className="gn-rsvp-title">Your Presence is Our Honour</h2>
                  <p className="gn-rsvp-sub">
                    Please bless our new beginnings with your dua and confirmed presence.
                  </p>
                  <motion.button
                    className="gn-rsvp-open-btn"
                    onClick={() => setIsRsvpOpen(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Confirm Your Attendance</span>
                    <Sparkle size={16} weight="fill" />
                  </motion.button>
                </div>
              </motion.section>

              {/* ── Footer ── */}
              <motion.footer
                className="gn-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0 }}
              >
                <div className="gn-footer-monogram">
                  {brideName[0]}&{groomName[0]}
                </div>
                <h3 className="gn-footer-names">{brideName} & {groomName}</h3>
                <p className="gn-footer-quote">
                  United in Love · Blessed by Allah · Forever Together
                </p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RSVP Modal ── */}
      <AnimatePresence>
        {isRsvpOpen && (
          <div className="gn-modal-overlay">
            <motion.div
              className="gn-modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button
                className="gn-modal-close"
                onClick={() => setIsRsvpOpen(false)}
              >
                <X size={18} />
              </button>

              <div className="gn-modal-header">
                <div className="gn-modal-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <h3 className="gn-modal-title">RSVP Confirmation</h3>
                <p className="gn-modal-sub">For {brideName} & {groomName}&apos;s Nikah</p>
              </div>

              {isSubmitted ? (
                <div className="gn-success-msg">
                  <CheckCircle size={48} className="text-[#D4849A] mb-3" weight="fill" />
                  <h4 className="text-lg font-serif text-[#D4849A]">JazakAllah Khair!</h4>
                  <p className="text-xs text-[#7D4F5A] mt-1">
                    Your RSVP has been joyfully received.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="gn-rsvp-form">
                  <div className="gn-form-group">
                    <label className="gn-label">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima & Family"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="gn-input"
                    />
                  </div>

                  <div className="gn-form-group">
                    <label className="gn-label">Will you be attending?</label>
                    <div className="gn-radio-group">
                      <button
                        type="button"
                        className={`gn-radio-btn ${rsvpAttending === "yes" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("yes")}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        className={`gn-radio-btn ${rsvpAttending === "no" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("no")}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpAttending === "yes" && (
                    <div className="gn-form-group">
                      <label className="gn-label">Number of Guests Attending</label>
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(e.target.value)}
                        className="gn-select"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5+">5+ Persons (Family)</option>
                      </select>
                    </div>
                  )}

                  <div className="gn-form-group">
                    <label className="gn-label">Your Blessings / Dua for the Couple</label>
                    <textarea
                      rows={3}
                      placeholder="May Allah bless your marriage with endless joy and peace..."
                      value={rsvpDua}
                      onChange={(e) => setRsvpDua(e.target.value)}
                      className="gn-textarea"
                    />
                  </div>

                  <button type="submit" className="gn-submit-btn">
                    <span>Send RSVP</span>
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
