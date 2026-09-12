"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import RoyalLotus from "@/components/templates/RoyalLotus";
import CrimsonRoyale from "@/components/templates/CrimsonRoyale";
import NoorNikah from "@/components/templates/NoorNikah";
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
      let localItem: any = null;
      if (typeof window !== "undefined") {
        try {
          const storedSingle = localStorage.getItem(`unfold_invitation_${slug}`);
          if (storedSingle) {
            localItem = JSON.parse(storedSingle);
          } else {
            const storedList = localStorage.getItem("unfold_active_invitations");
            if (storedList) {
              const list = JSON.parse(storedList);
              localItem = list.find((item: any) => item.slug === slug || item.id === slug);
            }
          }
        } catch (e) {
          console.warn("Could not check localStorage for invitation slug:", e);
        }
      }

      try {
        const res = await fetch(`/api/invitations/public?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setInvitation(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Invitation API offline. Checking local sandbox store.");
      }

      if (localItem) {
        setInvitation(localItem);
        setLoading(false);
        return;
      }

      // Fallback template for demo
      setIsDemoFallback(true);
      setLoading(false);
      setInvitation({
        id: "demo-id",
        slug: slug,
        templateId: slug.includes("crimson") ? "crimson-royale" : "crimson-royale",
        brideName: "Ananya",
        groomName: "Shubham",
        weddingDate: "2026-12-22",
        weddingTime: "05:00 PM onwards",
        venueName: "The Ridgewood Estate",
        venueAddress: "Fatehsagar Lake Road, Udaipur, Rajasthan 313001",
        events: [
          { title: "Haldi Ceremony", date: "Dec 21, 2026", time: "10:00 AM", location: "Courtyard Garden", description: "An auspicious morning filled with golden turmeric, laughter, and blessings." },
          { title: "Mehendi & Sangeet", date: "Dec 21, 2026", time: "06:00 PM", location: "Royal Banquet Hall", description: "An enchanting evening of henna artistry, rhythmic folk melodies, and spirited dance." },
          { title: "Wedding Ceremony (Pheras)", date: "Dec 22, 2026", time: "04:30 PM", location: "Lakeside Mandap", description: "The sacred nuptial vows as we unite in the presence of the holy fire under starry skies." },
          { title: "Grand Reception", date: "Dec 22, 2026", time: "08:00 PM", location: "The Ridgewood Grand Ballroom", description: "Join us for a royal dinner feast, champagne toasts, and midnight celebrations." },
        ],
        gallery: [
          "/templates/crimson-royale/gallery-1.webp",
          "/templates/crimson-royale/gallery-2.webp",
          "/templates/crimson-royale/gallery-3.webp",
          "/templates/crimson-royale/gallery-4.webp",
          "/templates/crimson-royale/gallery-5.webp",
          "/templates/crimson-royale/gallery-6.webp",
        ],
        musicUrl: "/templates/crimson-royale/music.mp3",
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
    "noor-e-nikah": NoorNikah,
    "crimson-royale": CrimsonRoyale,
    "royal-lotus": RoyalLotus,
    "emerald-noir": EmeraldNoir,
    "royal-elegance": RoyalElegance,
    "modern-minimal": ModernMinimal,
  };

  const SelectedTemplate = templatesMap[invitation.templateId] || NoorNikah;

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

      {invitation.templateId === "royal-lotus" || invitation.templateId === "crimson-royale" || invitation.templateId === "noor-e-nikah" ? (
        <SelectedTemplate data={invitation} />
      ) : (
        <>
          {/* 3D Curtain open screen overlay */}
          <DoorAnimation
            onOpen={handleOpenDoors}
            brideName={invitation.brideName}
            groomName={invitation.groomName}
            theme={
              invitation.templateId === "emerald-noir"
                ? "emerald"
                : invitation.templateId === "royal-elegance"
                ? "royal"
                : "minimal"
            }
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
        </>
      )}
    </div>
  );
}
