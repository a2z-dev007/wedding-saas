"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
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

interface AzureNikahProps {
  data?: any;
}

export default function AzureNikah({ data }: AzureNikahProps) {
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
            colors: ["#38BDF8", "#FDE047", "#93C5FD", "#FFFDF8"],
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
  const brideName = data?.brideName || data?.couple?.brideName || resolvedData.couple?.brideName || "Samira";
  const groomName = data?.groomName || data?.couple?.groomName || resolvedData.couple?.groomName || "Zayd";
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
  const islamicDate = data?.islamicDate || resolvedData.islamicDate || "11 Shawwal 1448 AH";

  const events: EventItem[] = (data?.events || resolvedData.events).filter((e: any) => e.enabled !== false);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 212, hours: 18, minutes: 30, seconds: 20 });
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
        colors: ["#38BDF8", "#FBBF24", "#DFB76C", "#FFFFFF"],
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
    <div className="azure-nikah-root">
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
      {isFlashing && <div className="an-unlock-flash-overlay" aria-hidden="true" />}

      {/* Ambient Floating Celestial Sapphire & Gold Particles */}
      <div className="an-floating-particles" aria-hidden="true">
        <span className="an-particle p1"></span>
        <span className="an-particle p2"></span>
        <span className="an-particle p3"></span>
        <span className="an-particle p4"></span>
        <span className="an-particle p5"></span>
        <span className="an-particle p6"></span>
      </div>

      {/* Floating Music Toggle with Dynamic Soundwave */}
      <motion.button
        className="an-music-toggle"
        onClick={toggleMusic}
        aria-label={isPlayingMusic ? "Mute music" : "Play music"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {isPlayingMusic ? (
          <>
            <SpeakerHigh size={18} weight="fill" />
            <span className="an-soundwave-bars">
              <span className="an-bar bar-1"></span>
              <span className="an-bar bar-2"></span>
              <span className="an-bar bar-3"></span>
            </span>
          </>
        ) : (
          <SpeakerSlash size={18} weight="fill" />
        )}
      </motion.button>

      <div className="an-viewport-shell">
        {/* Top Celestial Arch Inscription with Gentle Float */}
        <motion.header
          className="an-header-arch an-floating-element"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="an-arch-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="an-arch-tag">ROYAL CELESTIAL NIKAH · AZURE ROYALE</div>
        </motion.header>

        {/* ── Centerpiece Interactive Video Card ── */}
        <section className="an-video-hero-wrapper">
          <div
            className={`an-video-card ${videoOpened ? "an-card-revealed" : ""}`}
            onClick={!isPlayingVideo ? handleOpenInvitation : undefined}
          >
            {/* The Opening Sapphire Envelope Video */}
            <video
              ref={videoRef}
              src={resolvedData.videoOpening.videoUrl}
              playsInline
              webkit-playsinline="true"
              muted={false}
              preload="auto"
              className="an-main-video"
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
            <div className={`an-seal-monogram-anchor ${isPlayingVideo ? "an-seal-lifting" : ""}`}>
              <div className="an-wax-initials-ring">
                <span className="an-wax-initials">
                  {brideName[0]}&{groomName[0]}
                </span>
              </div>
            </div>

            {/* Tap Prompt Ribbon */}
            {!isPlayingVideo && (
              <div className="an-tap-prompt-ribbon">
                <Sparkle size={11} className="text-[#38BDF8]" weight="fill" />
                <span>TAP TO UNSEAL INVITATION</span>
                <Sparkle size={11} className="text-[#38BDF8]" weight="fill" />
              </div>
            )}

            {/* Seamless Paper Print Overlay */}
            <AnimatePresence>
              {videoOpened && (
                <>
                  {/* Parchment Text (Strictly within Inner Gold Borders) */}
                  <motion.div
                    className="an-blank-card-overlay"
                    variants={inkContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="an-paper-print-content">
                      {/* Top Sacred Header */}
                      <motion.div className="an-print-header-group" variants={inkItemVariants}>
                        <div className="an-print-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                        <p className="an-print-honor">TOGETHER WITH THEIR FAMILIES</p>
                      </motion.div>

                      {/* Grand Couple Presentation (Clean, Proportional & Regal) */}
                      <motion.div className="an-print-couple-group" variants={inkItemVariants}>
                        <h1 className="an-print-couple-names">
                          <span className="an-couple-bride">{brideName}</span>
                          <span className="an-print-amp">&</span>
                          <span className="an-couple-groom">{groomName}</span>
                        </h1>
                        <p className="an-print-subtext">
                          Cordially invite you to celebrate their royal Nikah union
                        </p>
                      </motion.div>

                      {/* Auspicious Ceremony Timings & Venue Details */}
                      <motion.div className="an-print-details-group" variants={inkItemVariants}>
                        <div className="an-print-date-badge">
                          <CalendarBlank size={12} className="text-[#0284C7]" weight="fill" />
                          <span>{formattedDate}</span>
                        </div>

                        <div className="an-print-venue-badge">
                          <MapPin size={11} className="text-[#0284C7]" weight="fill" />
                          <span>{venueName}, {resolvedData.venue?.city || "Doha"}</span>
                        </div>

                        <div className="an-print-time-text">
                          <Clock size={10} className="text-[#0284C7]" weight="fill" />
                          <span>Nikah: 5:00 PM &nbsp;•&nbsp; Dawat-e-Walima: 8:00 PM</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Envelope Bottom Action Controls */}
                  <motion.div
                    className="an-envelope-actions-bar"
                    variants={inkItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      className="an-print-btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRsvpOpen(true);
                      }}
                    >
                      <EnvelopeSimpleOpen size={13} weight="bold" />
                      <span>RSVP</span>
                    </button>

                    <button
                      className="an-print-btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSection("an-events-section");
                      }}
                    >
                      <Clock size={13} weight="bold" />
                      <span>Itinerary</span>
                    </button>

                    <button
                      className="an-print-btn-replay"
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
              className="an-scroll-cue"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => scrollToSection("an-quran-section")}
            >
              <span>Scroll for ceremonies & map</span>
              <div className="an-scroll-chevron">↓</div>
            </motion.div>
          )}
        </section>

        {/* ── Unlocked Royal Invitation Sections (Accessible after Envelope Reveal & Flash) ── */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              className="an-unlocked-flow"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* ── Quranic Verse Section ── */}
              <motion.section
                id="an-quran-section"
                className="an-section an-quran-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="an-quran-glow-backdrop"></div>
                <p className="an-arabic-verse">{resolvedData.verse.arabic}</p>
                <p className="an-verse-translation">&ldquo;{resolvedData.verse.translation}&rdquo;</p>
                <p className="an-verse-ref">{resolvedData.verse.reference}</p>
              </motion.section>

              {/* ── Live Countdown Box ── */}
              <motion.section
                className="an-section an-countdown-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="an-section-subtitle">CELESTIAL COUNTDOWN</span>
                <h2 className="an-section-title">Until The Grand Nikah</h2>
                <div className="an-countdown-grid">
                  {[
                    { val: timeLeft.days, lbl: "Days" },
                    { val: timeLeft.hours, lbl: "Hours" },
                    { val: timeLeft.minutes, lbl: "Mins" },
                    { val: timeLeft.seconds, lbl: "Secs" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="an-countdown-cell"
                      initial={{ opacity: 0, scale: 0.85, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -3, scale: 1.04 }}
                    >
                      <span className="an-time-val">{item.val}</span>
                      <span className="an-time-lbl">{item.lbl}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="an-hijri-date">Islamic Date: {islamicDate}</p>
              </motion.section>

              {/* ── Events Timeline ── */}
              <motion.section
                id="an-events-section"
                className="an-section an-events-wrapper"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="an-section-subtitle">PROGRAM OF EVENTS</span>
                <h2 className="an-section-title">Nikah Itinerary</h2>

                <div className="an-events-list">
                  {events.map((evt, idx) => (
                    <motion.div
                      key={idx}
                      className="an-event-card"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: idx * 0.12 }}
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    >
                      <div className="an-event-card-header">
                        <span className="an-event-num">0{idx + 1}</span>
                        <h3 className="an-event-name">{evt.name}</h3>
                      </div>

                      <div className="an-event-details">
                        <div className="an-event-row">
                          <CalendarBlank size={16} className="text-[#38BDF8]" weight="fill" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="an-event-row">
                          <Clock size={16} className="text-[#38BDF8]" weight="fill" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="an-event-row">
                          <MapPin size={16} className="text-[#38BDF8]" weight="fill" />
                          <span>{evt.venue} — {evt.location}</span>
                        </div>
                      </div>

                      {evt.dressCode && (
                        <div className="an-dress-pill">
                          <Sparkle size={12} className="text-[#38BDF8]" weight="fill" />
                          <span>Dress Code: {evt.dressCode}</span>
                        </div>
                      )}

                      {evt.description && (
                        <p className="an-event-desc">{evt.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* ── Venue Destination ── */}
              <motion.section
                className="an-section an-venue-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="an-section-subtitle">CELESTIAL VENUE</span>
                <h2 className="an-section-title">{venueName}</h2>
                <p className="an-venue-addr">{venueAddress}</p>

                <motion.a
                  href={venueMapUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="an-map-cta-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin size={18} weight="bold" />
                  <span>Navigate with Maps</span>
                  <ArrowSquareOut size={16} weight="bold" />
                </motion.a>
              </motion.section>

              {/* ── RSVP CTA Card ── */}
              <motion.section
                className="an-section an-rsvp-banner"
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="an-rsvp-inner">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart size={36} className="text-[#38BDF8] mb-2" weight="fill" />
                  </motion.div>
                  <h2 className="an-rsvp-title">Grace Us With Your Presence</h2>
                  <p className="an-rsvp-sub">
                    Please honor us with your confirmed attendance and blessed prayers.
                  </p>
                  <motion.button
                    className="an-rsvp-open-btn"
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
                className="an-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0 }}
              >
                <div className="an-footer-monogram">
                  {brideName[0]}&{groomName[0]}
                </div>
                <h3 className="an-footer-names">{brideName} & {groomName}</h3>
                <p className="an-footer-quote">
                  Under the Celestial Skies · United in Holy Nikah · Insha&apos;Allah Forever
                </p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RSVP Modal ── */}
      <AnimatePresence>
        {isRsvpOpen && (
          <div className="an-modal-overlay">
            <motion.div
              className="an-modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button
                className="an-modal-close"
                onClick={() => setIsRsvpOpen(false)}
              >
                <X size={18} />
              </button>

              <div className="an-modal-header">
                <div className="an-modal-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <h3 className="an-modal-title">Confirm Attendance</h3>
                <p className="an-modal-sub">For {brideName} & {groomName}&apos;s Nikah</p>
              </div>

              {isSubmitted ? (
                <div className="an-success-msg">
                  <CheckCircle size={48} className="text-[#38BDF8] mb-3" weight="fill" />
                  <h4 className="text-lg font-serif text-[#38BDF8]">JazakAllah Khair!</h4>
                  <p className="text-xs text-[#BAE6FD] mt-1">
                    Your attendance and warm dua have been received.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="an-rsvp-form">
                  <div className="an-form-group">
                    <label className="an-label">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zayd & Family"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="an-input"
                    />
                  </div>

                  <div className="an-form-group">
                    <label className="an-label">Will you be attending?</label>
                    <div className="an-radio-group">
                      <button
                        type="button"
                        className={`an-radio-btn ${rsvpAttending === "yes" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("yes")}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        className={`an-radio-btn ${rsvpAttending === "no" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("no")}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpAttending === "yes" && (
                    <div className="an-form-group">
                      <label className="an-label">Number of Guests Attending</label>
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(e.target.value)}
                        className="an-select"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5+">5+ Persons (Family)</option>
                      </select>
                    </div>
                  )}

                  <div className="an-form-group">
                    <label className="an-label">Your Blessings / Dua for the Couple</label>
                    <textarea
                      rows={3}
                      placeholder="May Allah bless your marriage with endless happiness..."
                      value={rsvpDua}
                      onChange={(e) => setRsvpDua(e.target.value)}
                      className="an-textarea"
                    />
                  </div>

                  <button type="submit" className="an-submit-btn">
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
