"use client";

import { use, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { GlassNav } from "@/components/ui/glass-nav";
import { PremiumFooter } from "@/components/ui/premium-footer";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { ImageUploader } from "@/components/media/ImageUploader";
import { MultiImageUploader } from "@/components/media/MultiImageUploader";
import { getTemplateMeta } from "@/lib/template-meta";
import {
  Sparkle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Plus,
  Trash,
  MusicNotes,
  Image as ImageIcon,
  CheckCircle,
  Check,
  Eye,
  SlidersHorizontal,
  Crown,
  Camera,
  Info,
} from "@phosphor-icons/react";

interface EventItem {
  name: string;
  enabled: boolean;
  venue: string;
  date: string;
  time: string;
}

interface CustomizePageProps {
  params: Promise<{ templateId: string }>;
}

const STEPS = [
  { id: 1, title: "The Couple", subtitle: "Names & Custom Link", icon: Heart },
  { id: 2, title: "Date & Venue", subtitle: "Time & Location", icon: Calendar },
  { id: 3, title: "Ceremonies", subtitle: "Event Timeline", icon: Clock },
  { id: 4, title: "Photo & Audio", subtitle: "Portrait & Music", icon: ImageIcon },
  { id: 5, title: "Review & Demo", subtitle: "Preview Live", icon: Sparkle },
];

function CustomizeFormContent({ templateId }: { templateId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("slug");

  const meta = getTemplateMeta(templateId);

  // Multi-step state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [brideName, setBrideName] = useState(templateId.includes("nikah") || templateId.includes("emerald") || templateId.includes("gul") ? "Diya" : "Ananya");
  const [groomName, setGroomName] = useState(templateId.includes("nikah") || templateId.includes("emerald") || templateId.includes("gul") ? "Shaan" : "Shubham");
  const [weddingDate, setWeddingDate] = useState("2026-12-22");
  const [weddingTime, setWeddingTime] = useState("06:30 PM onwards");
  const [venueName, setVenueName] = useState("The Ridgewood Grand Palace");
  const [venueAddress, setVenueAddress] = useState("Fatehsagar Lake Road, Udaipur, Rajasthan 313001");
  const [slug, setSlug] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [heroBgChoice, setHeroBgChoice] = useState<"default" | "custom">("default");
  const [slideshowImages, setSlideshowImages] = useState<string[]>([]);
  const [musicTrack, setMusicTrack] = useState(`/templates/${templateId}/music.mp3`);

  const [events, setEvents] = useState<EventItem[]>([
    { name: "Haldi Ceremony", enabled: true, venue: "Courtyard Garden", date: "Dec 21, 2026", time: "10:00 AM" },
    { name: "Mehendi & Sangeet", enabled: true, venue: "Royal Banquet Hall", date: "Dec 21, 2026", time: "06:00 PM" },
    { name: "Wedding Nuptials (Nikah / Pheras)", enabled: true, venue: "Grand Mandap / Lake Lawn", date: "Dec 22, 2026", time: "04:30 PM" },
    { name: "Grand Reception & Feast", enabled: true, venue: "The Grand Ballroom", date: "Dec 22, 2026", time: "08:00 PM" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Auto-fill slug when bride & groom change
  useEffect(() => {
    if (!editSlug) {
      const generated = `${brideName}-${groomName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  }, [brideName, groomName, editSlug]);

  // Load existing data if editSlug is present
  useEffect(() => {
    if (editSlug && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`unfold_invitation_${editSlug}`);
        if (stored) {
          const data = JSON.parse(stored);
          if (data.brideName) setBrideName(data.brideName);
          if (data.groomName) setGroomName(data.groomName);
          if (data.weddingDate) setWeddingDate(data.weddingDate.split("T")[0]);
          if (data.weddingTime) setWeddingTime(data.weddingTime);
          if (data.venueName) setVenueName(data.venueName);
          if (data.venueAddress) setVenueAddress(data.venueAddress);
          if (data.slug) setSlug(data.slug);
          if (data.heroImageUrl) {
            setHeroImageUrl(data.heroImageUrl);
            setHeroBgChoice("custom");
          }
          if (data.slideshowImages && Array.isArray(data.slideshowImages)) {
            setSlideshowImages(data.slideshowImages);
          } else if (data.gallery && Array.isArray(data.gallery)) {
            setSlideshowImages(data.gallery);
          }
          if (data.eventsJson || data.events) setEvents(data.eventsJson || data.events);
        }
      } catch (e) {
        console.warn("Could not load stored invitation:", e);
      }
    }
  }, [editSlug]);

  const handleAddEvent = () => {
    setEvents([
      ...events,
      { name: "Special Ceremony", enabled: true, venue: "Palace Lawns", date: "Dec 23, 2026", time: "11:00 AM" },
    ]);
  };

  const handleRemoveEvent = (index: number) => {
    setEvents(events.filter((_, idx) => idx !== index));
  };

  const handleEventChange = (index: number, field: keyof EventItem, value: any) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    setEvents(updated);
  };

  // Step Validation & Navigation
  const validateAndNext = () => {
    setValidationError(null);

    if (currentStep === 1) {
      if (!brideName.trim()) {
        setValidationError("Please enter Bride's name");
        return;
      }
      if (!groomName.trim()) {
        setValidationError("Please enter Groom's name");
        return;
      }
      if (!slug.trim()) {
        setValidationError("Please specify a custom link slug");
        return;
      }
    }

    if (currentStep === 2) {
      if (!weddingDate) {
        setValidationError("Please select your wedding date");
        return;
      }
      if (!venueName.trim()) {
        setValidationError("Please enter your wedding venue name");
        return;
      }
      if (!venueAddress.trim()) {
        setValidationError("Please enter the venue address");
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleGenerateDemo = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const normalizedSlug = (slug || `${brideName}-${groomName}`)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const invitationPayload = {
      id: `demo-${Date.now()}`,
      slug: normalizedSlug,
      templateId,
      brideName,
      groomName,
      weddingDate,
      weddingTime,
      venueName,
      venueAddress,
      heroImageUrl,
      slideshowImages,
      gallery: slideshowImages.length > 0 ? slideshowImages : (heroImageUrl ? [heroImageUrl] : []),
      galleryImages: slideshowImages.length > 0 ? slideshowImages : (heroImageUrl ? [heroImageUrl] : []),
      musicTrack,
      eventsJson: events,
      events: events,
      isPublished: false,
      createdAt: new Date().toISOString(),
    };

    // Save into localStorage for instant live preview access
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`unfold_invitation_${normalizedSlug}`, JSON.stringify(invitationPayload));
        
        const listStr = localStorage.getItem("unfold_active_invitations");
        const list = listStr ? JSON.parse(listStr) : [];
        const filtered = list.filter((i: any) => i.slug !== normalizedSlug);
        localStorage.setItem("unfold_active_invitations", JSON.stringify([invitationPayload, ...filtered]));
      } catch (err) {
        console.warn("Local storage write error:", err);
      }
    }

    // Attempt backend sync
    try {
      await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitationPayload),
      });
    } catch (err) {
      console.warn("Backend sync fallback (using client data):", err);
    }

    // Redirect to the personalized live preview route
    router.push(`/preview/${normalizedSlug}`);
  };

  const getNextButtonLabel = () => {
    switch (currentStep) {
      case 1:
        return "Next: Date & Venue →";
      case 2:
        return "Next: Ceremonies Itinerary →";
      case 3:
        return "Next: Photo & Audio →";
      case 4:
        return "Next: Review & Preview →";
      case 5:
        return "✨ Generate Free Live Demo";
      default:
        return "Next Step →";
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Breadcrumb */}
      <Link
        href={`/preview/${templateId}`}
        className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Template Overview</span>
      </Link>

      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-amber-400/20 text-amber-900 border border-amber-400/40 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Sparkle className="h-3 w-3 text-amber-600" weight="fill" />
            100% Free Live Demo
          </span>
          <span className="text-xs text-stone-500">No payment or credit card required</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
          Personalize {meta.name}
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Complete the steps below to craft your animated wedding invitation.
        </p>
      </div>

      {/* ── Multi-Step Progress Tracker Bar ── */}
      <div className="mb-8 bg-white border border-stone-200/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
              {currentStep}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Step {currentStep} of 5 · {STEPS[currentStep - 1].title}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-stone-400 font-mono">
            {Math.round((currentStep / 5) * 100)}% Complete
          </span>
        </div>

        {/* Progress Fill Line */}
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-full"
            initial={false}
            animate={{ width: `${(currentStep / 5) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </div>

        {/* Step Icons & Pills */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {STEPS.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const StepIcon = step.icon;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (step.id < currentStep) setCurrentStep(step.id);
                }}
                disabled={step.id > currentStep}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                  isCurrent
                    ? "bg-amber-500/10 border-2 border-amber-500 text-stone-900 shadow-sm"
                    : isDone
                    ? "bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
                    : "opacity-40 border border-transparent text-stone-400 cursor-not-allowed"
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs mb-1 font-bold ${
                    isCurrent
                      ? "bg-amber-500 text-white shadow-sm"
                      : isDone
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" weight="bold" /> : step.id}
                </div>
                <span className="text-[10px] sm:text-xs font-bold leading-tight line-clamp-1">
                  {step.title}
                </span>
                <span className="hidden sm:block text-[9px] text-stone-400 line-clamp-1 mt-0.5">
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Error Toast */}
      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
          <span>{validationError}</span>
        </motion.div>
      )}

      {/* ── Dynamic Step Content Cards ── */}
      <AnimatePresence mode="wait">
        {/* STEP 1: The Couple */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DoubleBezelCard className="bg-white border-stone-200/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-150">
                <div className="h-10 w-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <Heart className="h-5 w-5" weight="fill" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-stone-900 font-bold">The Couple</h2>
                  <p className="text-xs text-stone-500">Enter bride & groom names to customize the monogram & text.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Bride's First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    placeholder="e.g. Diya"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Groom's First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    placeholder="e.g. Shaan"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Your Custom Invitation Web Link *
                </label>
                <div className="flex rounded-xl overflow-hidden border border-stone-200 bg-stone-50/50 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20">
                  <span className="bg-stone-100 px-3.5 py-3 text-xs text-stone-500 select-none flex items-center font-mono border-r border-stone-200">
                    unfoldwed.com/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="diya-shaan"
                    className="w-full px-3 py-3 text-sm focus:outline-none bg-transparent font-mono text-stone-800"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1.5">
                  This will be your shareable URL slug for WhatsApp and guest invitations.
                </p>
              </div>
            </DoubleBezelCard>
          </motion.div>
        )}

        {/* STEP 2: Date & Venue */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DoubleBezelCard className="bg-white border-stone-200/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-150">
                <div className="h-10 w-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Calendar className="h-5 w-5" weight="fill" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-stone-900 font-bold">Date & Venue</h2>
                  <p className="text-xs text-stone-500">Set the main wedding celebration day and venue destination.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Wedding Day *
                  </label>
                  <input
                    type="date"
                    required
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Auspicious Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={weddingTime}
                    onChange={(e) => setWeddingTime(e.target.value)}
                    placeholder="e.g. 06:30 PM onwards"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. The Ridgewood Grand Palace"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Venue Address & Map Location *
                </label>
                <input
                  type="text"
                  required
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  placeholder="e.g. Fatehsagar Lake Road, Udaipur, Rajasthan"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50 text-stone-900"
                />
              </div>
            </DoubleBezelCard>
          </motion.div>
        )}

        {/* STEP 3: Ceremonies Itinerary */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DoubleBezelCard className="bg-white border-stone-200/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-150">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Clock className="h-5 w-5" weight="fill" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-stone-900 font-bold">Ceremonies Itinerary</h2>
                    <p className="text-xs text-stone-500">Add or edit all wedding functions, times, and halls.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Ceremony</span>
                </button>
              </div>

              <div className="space-y-4">
                {events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 relative space-y-3 transition-all hover:border-amber-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2.5 py-0.5 rounded-full">
                        Ceremony #{idx + 1}
                      </span>
                      {events.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEvent(idx)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          title="Remove ceremony"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Ceremony Name</label>
                        <input
                          type="text"
                          value={evt.name}
                          onChange={(e) => handleEventChange(idx, "name", e.target.value)}
                          placeholder="e.g. Sangeet Celebration"
                          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-500 text-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Date</label>
                        <input
                          type="text"
                          value={evt.date}
                          onChange={(e) => handleEventChange(idx, "date", e.target.value)}
                          placeholder="e.g. Dec 21, 2026"
                          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-500 text-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Time</label>
                        <input
                          type="text"
                          value={evt.time}
                          onChange={(e) => handleEventChange(idx, "time", e.target.value)}
                          placeholder="e.g. 07:00 PM"
                          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-500 text-stone-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Venue / Lawn</label>
                        <input
                          type="text"
                          value={evt.venue}
                          onChange={(e) => handleEventChange(idx, "venue", e.target.value)}
                          placeholder="e.g. Royal Palace Lawn"
                          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-500 text-stone-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DoubleBezelCard>
          </motion.div>
        )}

        {/* STEP 4: Photo & Audio */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DoubleBezelCard className="bg-white border-stone-200/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-150">
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <ImageIcon className="h-5 w-5" weight="fill" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-stone-900 font-bold">Couple Portrait & Music</h2>
                  <p className="text-xs text-stone-500">Upload your couple photo and set the background audio track.</p>
                </div>
              </div>

              {/* Opening Hero Background Choice & Photo */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    1. Opening Hero Portal Background
                  </label>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-xs">
                    <Sparkle size={12} weight="fill" className="text-emerald-500" />
                    <span>100% Optional</span>
                  </span>
                </div>
                <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                  Choose whether you want to use the template&apos;s default handcrafted royal palace artwork or upload your own romantic couple portrait.
                </p>

                {/* Choice Selector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Option A: Template Default */}
                  <div
                    onClick={() => {
                      setHeroBgChoice("default");
                      setHeroImageUrl("");
                    }}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                      heroBgChoice === "default" && !heroImageUrl
                        ? "border-amber-600 bg-amber-50/50 shadow-sm ring-2 ring-amber-500/20"
                        : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        heroBgChoice === "default" && !heroImageUrl
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-stone-100 text-stone-500"
                      }`}>
                        <Crown size={22} weight="fill" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-xs font-bold text-stone-900 truncate">Template Signature Artwork</h3>
                          {heroBgChoice === "default" && !heroImageUrl && (
                            <CheckCircle size={17} weight="fill" className="text-amber-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                          Use the template&apos;s handcrafted royal palace gateway. No photo upload needed.
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-400 font-medium">
                      <span>Instant &amp; Ready</span>
                      <span className="text-amber-700 font-semibold uppercase tracking-wider">Default &amp; Recommended</span>
                    </div>
                  </div>

                  {/* Option B: Upload Own Portrait */}
                  <div
                    onClick={() => setHeroBgChoice("custom")}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                      heroBgChoice === "custom" || heroImageUrl
                        ? "border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-600/20"
                        : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        heroBgChoice === "custom" || heroImageUrl
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-stone-100 text-stone-500"
                      }`}>
                        <Camera size={22} weight="fill" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-xs font-bold text-stone-900 truncate">Upload Our Own Photo</h3>
                          {(heroBgChoice === "custom" || heroImageUrl) && (
                            <CheckCircle size={17} weight="fill" className="text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                          Personalize the opening portal with your own portrait photo.
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-400 font-medium">
                      <span>Customized Portal</span>
                      <span className="text-emerald-700 font-semibold uppercase tracking-wider">1080 × 1920 px (9:16)</span>
                    </div>
                  </div>
                </div>

                {/* Custom Photo Uploader Container with Dimension Specs */}
                {(heroBgChoice === "custom" || heroImageUrl) && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/90 border border-stone-200/90 space-y-4 animate-in fade-in duration-200">
                    {/* Size & Clearance Specification Callout */}
                    <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs flex items-start gap-3">
                      <Info size={20} weight="fill" className="text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 text-[11px] leading-relaxed">
                        <p className="font-bold text-amber-950 text-xs">
                          Recommended Photo Size: <span className="underline decoration-amber-500 underline-offset-2">1080 × 1920 px (9:16 Portrait)</span> or <span className="underline decoration-amber-500 underline-offset-2">1200 × 1600 px (3:4)</span>
                        </p>
                        <p className="text-amber-800">
                          • <strong>File Requirements:</strong> PNG, JPG, or WebP up to 8MB.<br />
                          • <strong>Facial Clearance Guarantee:</strong> For optimal mobile presentation, keep faces centered or in the upper-middle area so bottom text cards do not cover them.
                        </p>
                      </div>
                    </div>

                    <ImageUploader
                      initialUrl={heroImageUrl}
                      onUploadSuccess={(url: string) => {
                        setHeroImageUrl(url);
                        setHeroBgChoice("custom");
                      }}
                      onImageUploaded={(url: string) => {
                        setHeroImageUrl(url);
                        if (!url) setHeroBgChoice("default");
                      }}
                      label="Select or Drag Couple Portrait"
                    />

                    {heroImageUrl && (
                      <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                        <span className="text-stone-500">Currently using custom couple portrait</span>
                        <button
                          type="button"
                          onClick={() => {
                            setHeroImageUrl("");
                            setHeroBgChoice("default");
                          }}
                          className="text-amber-700 hover:text-amber-900 font-semibold hover:underline"
                        >
                          Revert to Default Artwork
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Multiple Gallery Photos */}
              <div className="pt-4 border-t border-stone-150">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  2. Cherished Memories & Gallery Photos (Multi-Upload)
                </label>
                <p className="text-xs text-stone-500 mb-3">
                  Upload 1 to 6 photos. The gallery bento grid will automatically adapt to show only your uploaded photos.
                </p>
                <MultiImageUploader
                  images={slideshowImages}
                  onChange={setSlideshowImages}
                  maxImages={6}
                  label="Add Gallery Photos"
                />
              </div>

              <div className="pt-4 border-t border-stone-150">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 flex items-center gap-1.5">
                  <MusicNotes className="h-4 w-4 text-amber-600" />
                  <span>Background Music Loop</span>
                </label>
                <input
                  type="text"
                  value={musicTrack}
                  onChange={(e) => setMusicTrack(e.target.value)}
                  placeholder={`/templates/${templateId}/music.mp3`}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 bg-stone-50/50 text-stone-800 font-mono text-xs"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Default: Theme soundtrack included with template.
                </p>
              </div>
            </DoubleBezelCard>
          </motion.div>
        )}

        {/* STEP 5: Review & Generate Demo */}
        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DoubleBezelCard className="bg-white border-stone-200/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-150">
                <div className="h-10 w-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Sparkle className="h-5 w-5 text-amber-600" weight="fill" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-stone-900 font-bold">Review Your Invitation</h2>
                  <p className="text-xs text-stone-500">Everything is ready! Click below to see your live interactive preview.</p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">Couple</span>
                  <span className="font-serif text-lg font-bold text-stone-900 block">{brideName} & {groomName}</span>
                  <span className="text-xs font-mono text-amber-700">unfoldwed.com/{slug}</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">Date & Time</span>
                  <span className="font-serif text-lg font-bold text-stone-900 block">{weddingDate}</span>
                  <span className="text-xs text-stone-600">{weddingTime}</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">Venue</span>
                  <span className="font-serif text-base font-bold text-stone-900 block">{venueName}</span>
                  <span className="text-xs text-stone-600">{venueAddress}</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">Ceremonies ({events.length})</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {events.map((evt, idx) => (
                      <span key={idx} className="text-xs bg-white border border-stone-200 px-2.5 py-1 rounded-lg text-stone-700 font-medium">
                        {evt.name} · {evt.time}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 sm:col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-0.5">Photos Attached</span>
                    <span className="text-xs text-stone-700 font-medium">
                      {heroImageUrl ? "✓ Main Hero Portrait" : "Template Royal Artwork"} · {slideshowImages.length} Gallery Photo{slideshowImages.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {heroImageUrl && (
                    <img src={heroImageUrl} alt="Hero portrait preview" className="h-10 w-10 rounded-lg object-cover border border-stone-300" />
                  )}
                </div>
              </div>

              {/* Try-Before-You-Buy Assurance */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0" weight="fill" />
                <div className="text-xs text-emerald-900">
                  <span className="font-bold block">Free Instant Live Demo Preview</span>
                  <span>You will be able to test all animations, music, and the scratch reveal card. If you like it, unlock your permanent live website for ₹1,499.</span>
                </div>
              </div>
            </DoubleBezelCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Highlighted Next / Previous Wizard Action Bar ── */}
      <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Button */}
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Highlighted Next / Finish Button */}
        {currentStep < 5 ? (
          <button
            type="button"
            onClick={validateAndNext}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#082F27] hover:bg-[#0D4439] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 border border-amber-400/40"
          >
            <span>{getNextButtonLabel()}</span>
            <ArrowRight className="h-4 w-4 text-amber-300" weight="bold" />
          </button>
        ) : (
          <PremiumButton
            onClick={handleGenerateDemo}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all !bg-gradient-to-r !from-amber-600 !via-amber-500 !to-amber-600 !text-stone-950"
          >
            <Sparkle className="h-5 w-5 text-stone-950" weight="fill" />
            <span>{isSubmitting ? "Generating Demo..." : "✨ Generate Free Live Demo"}</span>
          </PremiumButton>
        )}
      </div>
    </div>
  );
}

export default function CustomizeTemplatePage({ params }: CustomizePageProps) {
  const { templateId } = use(params);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1A1A1A] flex flex-col">
      <GlassNav />
      <main className="flex-grow pt-28 pb-20">
        <Suspense fallback={<div className="text-center py-20">Loading customizer...</div>}>
          <CustomizeFormContent templateId={templateId} />
        </Suspense>
      </main>
      <PremiumFooter />
    </div>
  );
}
