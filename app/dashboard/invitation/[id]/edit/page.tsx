"use client";

import { use, useEffect, useState } from "react";
import { GlassNav } from "@/components/ui/glass-nav";
import { InvitationEditor } from "@/components/dashboard/InvitationEditor";
import { Sparkle } from "@phosphor-icons/react";

interface EditInvitationPageProps {
  params: Promise<{ id: string }>;
}

export default function EditInvitationPage({ params }: EditInvitationPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any | null>(null);

  useEffect(() => {
    async function loadInvitation() {
      let localItem: any = null;
      if (typeof window !== "undefined") {
        try {
          // Check specific invitation key
          const storedSingle = localStorage.getItem(`unfold_invitation_${id}`);
          if (storedSingle) {
            localItem = JSON.parse(storedSingle);
          } else {
            // Check active list
            const storedList = localStorage.getItem("unfold_active_invitations");
            if (storedList) {
              const list = JSON.parse(storedList);
              localItem = list.find((item: any) => item.id === id || item.slug === id);
            }
          }
        } catch (e) {
          console.warn("Could not read from localStorage:", e);
        }
      }

      try {
        const response = await fetch(`/api/invitations/${id}`);
        if (response.ok) {
          const data = await response.json();
          setInitialData(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Failed to fetch invitation edit data from API. Falling back to saved sandbox details.");
      }

      if (localItem) {
        setInitialData(localItem);
        setLoading(false);
        return;
      }

      // Default fallback
      setInitialData({
        id: id || "demo-invitation-id",
        templateId: "royal-lotus",
        brideName: "Siya",
        groomName: "Kabir",
        slug: id === "demo-invitation-id" ? "siya-kabir" : id,
        weddingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        weddingTime: "6:30 PM onwards",
        venueName: "The Maharaja Palace, Udaipur",
        venueAddress: "The Maharaja Palace, Lake Pichola Road, Udaipur, Rajasthan",
        heroImageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
        slideshowImages: [
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop",
        ],
        showDressCode: true,
        dressCodeText: "Royal Traditional Indian. Pastel lehengas, silk sarees, sherwanis, or bandhgalas.",
        showTransport: true,
        transportText: "Valet parking is available at the main palace porch. Dedicated shuttle services are arranged.",
        eventsJson: [
          { name: "Mehendi", enabled: true, venue: "Lotus Courtyard", date: "12 DECEMBER · 4:00 PM", time: "4:00 PM" },
          { name: "Haldi", enabled: true, venue: "Poolside Courtyard", date: "13 DECEMBER · 10:00 AM", time: "10:00 AM" },
          { name: "Sangeet", enabled: true, venue: "Royal Ballroom", date: "13 DECEMBER · 7:30 PM", time: "7:30 PM" },
          { name: "Shaadi", enabled: true, venue: "Lake Mandap", date: "14 DECEMBER · 6:30 PM", time: "6:30 PM" },
          { name: "Reception", enabled: true, venue: "Palace Lawns", date: "14 DECEMBER · 9:00 PM", time: "9:00 PM" },
          { name: "Vidaai", enabled: true, venue: "Main Courtyard", date: "15 DECEMBER · 9:00 AM", time: "9:00 AM" },
        ],
        musicTrack: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      });
      setLoading(false);
    }

    loadInvitation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-900">
        <Sparkle className="h-10 w-10 text-amber-500 animate-spin-slow mb-2" />
        <span className="text-xs uppercase tracking-widest text-stone-400">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      <GlassNav />

      <main className="flex-grow pt-32 px-6 pb-24">
        <InvitationEditor initialData={initialData} invitationId={id} />
      </main>
    </div>
  );
}
