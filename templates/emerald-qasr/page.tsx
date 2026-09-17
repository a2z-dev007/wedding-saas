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

interface EmeraldQasrProps {
  data?: any;
}

export default function EmeraldQasr({ data }: EmeraldQasrProps) {
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
            colors: ["#D4AF37", "#F5E5A3", "#10B981", "#FFFDF8"],
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
  const brideName = data?.brideName || data?.couple?.brideName || resolvedData.couple?.brideName || "Zoya";
  const groomName = data?.groomName || data?.couple?.groomName || resolvedData.couple?.groomName || "Farhan";
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
  const islamicDate = data?.islamicDate || resolvedData.islamicDate || "07 Sha'ban 1448 AH";

  const events: EventItem[] = (data?.events || resolvedData.events).filter((e: any) => e.enabled !== false);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 148, hours: 16, minutes: 22, seconds: 40 });
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

    // Synchronous audio start
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch((e) => console.log("Audio play:", e));
    }

    // Play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => {
          // Content will smoothly write in when the video finishes opening completely
        })
        .catch((err) => {
          console.log("Video play prevented:", err);
          setVideoOpened(true);
        });
    } else {
      setVideoOpened(true);
    }
  };

  // On video ended (envelope completely open & paper settled), smoothly write in content
  const handleVideoEnded = () => {
    setVideoOpened(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Replay Video
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

  // Music toggle
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

  // RSVP Submission
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#10B981", "#F59E0B", "#FDFBF7"],
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
    <div className="emerald-qasr-root">
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
      {isFlashing && <div className="eq-unlock-flash-overlay" aria-hidden="true" />}

      {/* Ambient Floating Gold Dust Particles */}
      <div className="eq-floating-particles" aria-hidden="true">
        <span className="eq-particle p1"></span>
        <span className="eq-particle p2"></span>
        <span className="eq-particle p3"></span>
        <span className="eq-particle p4"></span>
        <span className="eq-particle p5"></span>
        <span className="eq-particle p6"></span>
      </div>

      {/* Floating Music Button with Dynamic Soundwave */}
      <motion.button
        className="eq-music-toggle"
        onClick={toggleMusic}
        aria-label={isPlayingMusic ? "Mute soundtrack" : "Play soundtrack"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {isPlayingMusic ? (
          <>
            <SpeakerHigh size={18} weight="fill" />
            <span className="eq-soundwave-bars">
              <span className="eq-bar bar-1"></span>
              <span className="eq-bar bar-2"></span>
              <span className="eq-bar bar-3"></span>
            </span>
          </>
        ) : (
          <SpeakerSlash size={18} weight="fill" />
        )}
      </motion.button>

      {/* Main Container */}
      <div className="eq-viewport-shell">
        {/* Sacred Header with Gentle Float */}
        <motion.header
          className="eq-header-arch eq-floating-element"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="eq-arch-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="eq-arch-tag">THE ROYAL ISLAMIC NIKAH INVITATION</div>
        </motion.header>

        {/* ── Centerpiece Interactive Video Card ── */}
        <section className="eq-video-hero-wrapper">
          <div
            className={`eq-video-card ${videoOpened ? "eq-card-revealed" : ""}`}
            onClick={!isPlayingVideo ? handleOpenInvitation : undefined}
          >
            {/* The Video Element */}
            <video
              ref={videoRef}
              src={resolvedData.videoOpening.videoUrl}
              playsInline
              webkit-playsinline="true"
              muted={false}
              preload="auto"
              className="eq-main-video"
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

            {/* Seamless Stamped Initials on Envelope Wax Seal (moves smoothly with flap lift) */}
            <div className={`eq-seal-monogram-anchor ${isPlayingVideo ? "eq-seal-lifting" : ""}`}>
              <div className="eq-wax-initials-ring">
                <span className="eq-wax-initials">
                  {brideName[0]}&{groomName[0]}
                </span>
              </div>
            </div>

            {/* Tap to Open Prompt Ribbon */}
            {!isPlayingVideo && (
              <div className="eq-tap-prompt-ribbon">
                <Sparkle size={11} className="text-[#D4AF37]" weight="fill" />
                <span>TAP TO OPEN ENVELOPE</span>
                <Sparkle size={11} className="text-[#D4AF37]" weight="fill" />
              </div>
            )}

            {/* Seamless Paper Print Overlay directly filling the Ivory Card — Clean & Legible */}
            <AnimatePresence>
              {videoOpened && (
                <>
                  {/* Parchment Text (Strictly within Inner Gold Borders) */}
                  <motion.div
                    className="eq-blank-card-overlay"
                    variants={inkContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="eq-paper-print-content">
                      {/* Top Sacred Header */}
                      <motion.div className="eq-print-header-group" variants={inkItemVariants}>
                        <div className="eq-print-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                        <p className="eq-print-honor">TOGETHER WITH THEIR FAMILIES</p>
                      </motion.div>

                      {/* Grand Couple Presentation (Clean, Proportional & Regal) */}
                      <motion.div className="eq-print-couple-group" variants={inkItemVariants}>
                        <h1 className="eq-print-couple-names">
                          <span className="eq-couple-bride">{brideName}</span>
                          <span className="eq-print-amp">&</span>
                          <span className="eq-couple-groom">{groomName}</span>
                        </h1>
                        <p className="eq-print-subtext">
                          Request the honour of your esteemed presence & blessings at their Nikah celebration
                        </p>
                      </motion.div>

                      {/* Auspicious Ceremony Timings & Venue Details */}
                      <motion.div className="eq-print-details-group" variants={inkItemVariants}>
                        <div className="eq-print-date-badge">
                          <CalendarBlank size={12} className="text-[#8A661C]" weight="fill" />
                          <span>{formattedDate}</span>
                        </div>

                        <div className="eq-print-venue-badge">
                          <MapPin size={11} className="text-[#8A661C]" weight="fill" />
                          <span>{venueName}, {resolvedData.venue?.city || "Abu Dhabi"}</span>
                        </div>

                        <div className="eq-print-time-text">
                          <Clock size={10} className="text-[#8A661C]" weight="fill" />
                          <span>Nikah: 4:30 PM &nbsp;•&nbsp; Walima: 7:30 PM</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Envelope Bottom Action Controls (Positioned cleanly below card on velvet envelope) */}
                  <motion.div
                    className="eq-envelope-actions-bar"
                    variants={inkItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      className="eq-print-btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRsvpOpen(true);
                      }}
                    >
                      <EnvelopeSimpleOpen size={13} weight="bold" />
                      <span>RSVP</span>
                    </button>

                    <button
                      className="eq-print-btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSection("eq-events-section");
                      }}
                    >
                      <Clock size={13} weight="bold" />
                      <span>Itinerary</span>
                    </button>

                    <button
                      className="eq-print-btn-replay"
                      onClick={handleReplay}
                      title="Replay Envelope Opening"
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
              className="eq-scroll-cue"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => scrollToSection("eq-quran-section")}
            >
              <span>Scroll for ceremonies & venue</span>
              <div className="eq-scroll-chevron">↓</div>
            </motion.div>
          )}
        </section>

        {/* ── Unlocked Royal Invitation Sections (Accessible after Envelope Reveal & Flash) ── */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              className="eq-unlocked-flow"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* ── Quranic Verse Section (Surah Ar-Rum) ── */}
              <motion.section
                id="eq-quran-section"
                className="eq-section eq-quran-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="eq-quran-glow-backdrop"></div>
                <p className="eq-arabic-verse">{resolvedData.verse.arabic}</p>
                <p className="eq-verse-translation">&ldquo;{resolvedData.verse.translation}&rdquo;</p>
                <p className="eq-verse-ref">{resolvedData.verse.reference}</p>
              </motion.section>

              {/* ── Live Countdown Section ── */}
              <motion.section
                className="eq-section eq-countdown-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="eq-section-subtitle">COUNTING DOWN THE BLESSED OCCASION</span>
                <h2 className="eq-section-title">Until The Sacred Nikah</h2>
                <div className="eq-countdown-grid">
                  {[
                    { val: timeLeft.days, lbl: "Days" },
                    { val: timeLeft.hours, lbl: "Hours" },
                    { val: timeLeft.minutes, lbl: "Mins" },
                    { val: timeLeft.seconds, lbl: "Secs" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="eq-countdown-cell"
                      initial={{ opacity: 0, scale: 0.85, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -3, scale: 1.04 }}
                    >
                      <span className="eq-time-val">{item.val}</span>
                      <span className="eq-time-lbl">{item.lbl}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="eq-islamic-date-text">Islamic Hijri Date: {islamicDate}</p>
              </motion.section>

              {/* ── Wedding Ceremonies Timeline ── */}
              <motion.section
                id="eq-events-section"
                className="eq-section eq-events-wrapper"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="eq-section-subtitle">CELEBRATIONS & PROGRAM</span>
                <h2 className="eq-section-title">Event Itinerary</h2>

                <div className="eq-events-list">
                  {events.map((evt, idx) => (
                    <motion.div
                      key={idx}
                      className="eq-event-card"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: idx * 0.12 }}
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    >
                      <div className="eq-event-card-header">
                        <span className="eq-event-num">0{idx + 1}</span>
                        <h3 className="eq-event-name">{evt.name}</h3>
                      </div>

                      <div className="eq-event-details">
                        <div className="eq-event-row">
                          <CalendarBlank size={16} className="text-[#D4AF37]" weight="fill" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="eq-event-row">
                          <Clock size={16} className="text-[#D4AF37]" weight="fill" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="eq-event-row">
                          <MapPin size={16} className="text-[#D4AF37]" weight="fill" />
                          <span>{evt.venue} — {evt.location}</span>
                        </div>
                      </div>

                      {evt.dressCode && (
                        <div className="eq-dress-pill">
                          <Sparkle size={12} className="text-[#D4AF37]" weight="fill" />
                          <span>Dress Code: {evt.dressCode}</span>
                        </div>
                      )}

                      {evt.description && (
                        <p className="eq-event-desc">{evt.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* ── Venue & Navigation Card ── */}
              <motion.section
                className="eq-section eq-venue-box"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="eq-section-subtitle">ROYAL DESTINATION</span>
                <h2 className="eq-section-title">{venueName}</h2>
                <p className="eq-venue-addr">{venueAddress}</p>

                <motion.a
                  href={venueMapUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eq-map-cta-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin size={18} weight="bold" />
                  <span>Open in Google Maps</span>
                  <ArrowSquareOut size={16} weight="bold" />
                </motion.a>
              </motion.section>

              {/* ── RSVP CTA Card ── */}
              <motion.section
                className="eq-section eq-rsvp-banner"
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="eq-rsvp-inner">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart size={36} className="text-[#D4AF37] mb-2" weight="fill" />
                  </motion.div>
                  <h2 className="eq-rsvp-title">Your Presence is Our Honour</h2>
                  <p className="eq-rsvp-sub">
                    Kindly grace us with your esteemed presence and dua by confirming your attendance.
                  </p>
                  <motion.button
                    className="eq-rsvp-open-btn"
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
                className="eq-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0 }}
              >
                <div className="eq-footer-monogram">
                  {brideName[0]}&{groomName[0]}
                </div>
                <h3 className="eq-footer-names">{brideName} & {groomName}</h3>
                <p className="eq-footer-quote">
                  United in Love · Bound by Faith · Insha&apos;Allah Forever
                </p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RSVP Interactive Modal ── */}
      <AnimatePresence>
        {isRsvpOpen && (
          <div className="eq-modal-overlay">
            <motion.div
              className="eq-modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button
                className="eq-modal-close"
                onClick={() => setIsRsvpOpen(false)}
              >
                <X size={18} />
              </button>

              <div className="eq-modal-header">
                <div className="eq-modal-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <h3 className="eq-modal-title">Confirm Attendance</h3>
                <p className="eq-modal-sub">For {brideName} & {groomName}&apos;s Nikah</p>
              </div>

              {isSubmitted ? (
                <div className="eq-success-msg">
                  <CheckCircle size={48} className="text-[#D4AF37] mb-3" weight="fill" />
                  <h4 className="text-lg font-serif text-[#D4AF37]">JazakAllah Khair!</h4>
                  <p className="text-xs text-[#E8D5B5] mt-1">
                    Your RSVP and blessed dua have been received with love.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="eq-rsvp-form">
                  <div className="eq-form-group">
                    <label className="eq-label">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq & Family"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="eq-input"
                    />
                  </div>

                  <div className="eq-form-group">
                    <label className="eq-label">Will you be attending?</label>
                    <div className="eq-radio-group">
                      <button
                        type="button"
                        className={`eq-radio-btn ${rsvpAttending === "yes" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("yes")}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        className={`eq-radio-btn ${rsvpAttending === "no" ? "active" : ""}`}
                        onClick={() => setRsvpAttending("no")}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpAttending === "yes" && (
                    <div className="eq-form-group">
                      <label className="eq-label">Number of Guests Attending</label>
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(e.target.value)}
                        className="eq-select"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5+">5+ Persons (Family)</option>
                      </select>
                    </div>
                  )}

                  <div className="eq-form-group">
                    <label className="eq-label">Your Dua / Blessing for the Couple</label>
                    <textarea
                      rows={3}
                      placeholder="May Allah bless your union with endless happiness..."
                      value={rsvpDua}
                      onChange={(e) => setRsvpDua(e.target.value)}
                      className="eq-textarea"
                    />
                  </div>

                  <button type="submit" className="eq-submit-btn">
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
