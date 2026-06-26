"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import EmeraldNoir from "@/components/templates/EmeraldNoir";
import RoyalElegance from "@/components/templates/RoyalElegance";
import ModernMinimal from "@/components/templates/ModernMinimal";
import { DoorAnimation } from "@/components/invitation/DoorAnimation";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { LanguageToggle } from "@/components/invitation/LanguageToggle";
import { Sparkle, Warning } from "@phosphor-icons/react";

interface LiveInvitationPageProps {
  params: Promise<{ slug: string }>;
}

export default function LiveInvitationPage({ params }: LiveInvitationPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState<any | null>(null);
  const [hasOpenedDoors, setHasOpenedDoors] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [isDemoFallback, setIsDemoFallback] = useState(false);

  useEffect(() => {
    async function fetchInvitation() {
      try {
        const res = await fetch(`/api/invitations/public?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setInvitation(data);
        } else {
          // If invitation is not found or API fails, trigger dynamic fallback for previewing
          console.warn("Invitation API returned non-OK. Falling back to Demo mode.");
          triggerDemoFallback();
        }
      } catch (err) {
        console.error("Failed to fetch invitation details:", err);
        triggerDemoFallback();
      } finally {
        setLoading(false);
      }
    }

    function triggerDemoFallback() {
      // Mock data for live demo slugs (e.g. unfoldwed.com/priya-arjun)
      setIsDemoFallback(true);
      setInvitation({
        id: "demo-invitation-id",
        templateId: slug === "classic-demo" ? "royal-elegance" : slug === "minimal-demo" ? "modern-minimal" : "emerald-noir",
        brideName: "Priya",
        groomName: "Arjun",
        weddingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
        weddingTime: "6:00 PM onwards",
        venueName: "The Leela Palace Hotel",
        venueAddress: "Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110021",
        venueLat: 28.5839,
        venueLng: 77.1953,
        heroImageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
        slideshowImages: [
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507504038482-7621c27dec3f?q=80&w=500&auto=format&fit=crop",
        ],
        showDressCode: true,
        dressCodeText: "Royal Traditional Indian. Pastel tones are preferred.",
        showTransport: true,
        transportText: "Shuttle transports are arranged from IGI Airport T3. Valet parking is available at the venue entrance.",
        eventsJson: [
          { name: "Sangeet Night", enabled: true, venue: "Grand Ballroom, The Leela Palace", date: "Friday, 27 November", time: "8:00 PM" },
          { name: "Wedding Ceremony", enabled: true, venue: "Royal Lawns, The Leela Palace", date: "Saturday, 28 November", time: "6:00 PM" },
        ],
        languages: ["en", "hi"],
        musicTrack: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      });
    }

    fetchInvitation();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white">
        <Sparkle className="h-10 w-10 text-amber-400 animate-spin-slow mb-4" />
        <span className="text-xs uppercase tracking-widest text-white/60">Preparing Invitation...</span>
      </div>
    );
  }

  if (!invitation) {
    return notFound();
  }

  // Render template dynamically
  const templatesMap: Record<string, any> = {
    "emerald-noir": EmeraldNoir,
    "royal-elegance": RoyalElegance,
    "modern-minimal": ModernMinimal,
  };

  const SelectedTemplate = templatesMap[invitation.templateId] || EmeraldNoir;

  const handleOpenDoors = () => {
    setHasOpenedDoors(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Demo Warning Banner (if in fallback mock mode) */}
      {isDemoFallback && (
        <div className="fixed top-0 inset-x-0 z-[100] bg-amber-500 text-stone-950 text-[10px] font-bold py-1 px-4 flex items-center justify-center gap-2 select-none">
          <Warning className="h-3 w-3 shrink-0" weight="fill" />
          <span>Demo Fallback Mode: Database connection not configured in .env</span>
        </div>
      )}

      {/* 3D Curtain open screen overlay */}
      <DoorAnimation
        onOpen={handleOpenDoors}
        brideName={invitation.brideName}
        groomName={invitation.groomName}
        theme={invitation.templateId === "emerald-noir" ? "emerald" : invitation.templateId === "royal-elegance" ? "royal" : "minimal"}
      />

      {/* Main template container */}
      {hasOpenedDoors && (
        <>
          <SelectedTemplate data={invitation} />
          
          {/* Background Audio */}
          <MusicPlayer
            trackUrl={invitation.musicTrack || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
            autoPlay={true}
          />
          
          {/* Language Toggle */}
          <LanguageToggle
            languages={invitation.languages || ["en"]}
            activeLanguage={activeLanguage}
            onChangeLanguage={setActiveLanguage}
          />
        </>
      )}
    </div>
  );
}
