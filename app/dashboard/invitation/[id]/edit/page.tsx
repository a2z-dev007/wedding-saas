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
      if (id === "demo-invitation-id") {
        // Load mock details immediately
        setInitialData({
          brideName: "Priya",
          groomName: "Arjun",
          slug: "priya-arjun",
          weddingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          weddingTime: "7:00 PM onwards",
          venueName: "The Leela Palace, New Delhi",
          venueAddress: "Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110021",
          heroImageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
          slideshowImages: [
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop",
          ],
          showDressCode: true,
          dressCodeText: "Royal Traditional Indian. Pastel tones preferred.",
          showTransport: true,
          transportText: "Shuttle services will be available from Delhi Airport.",
          eventsJson: [
            { name: "Sangeet Night", enabled: true, venue: "Grand Ballroom, The Leela Palace", date: "Friday, 27 November", time: "8:00 PM" },
            { name: "Wedding Ceremony", enabled: true, venue: "Royal Lawns, The Leela Palace", date: "Saturday, 28 November", time: "6:00 PM" },
          ],
          musicTrack: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/invitations/${id}`);
        if (response.ok) {
          const data = await response.json();
          setInitialData(data);
        } else {
          loadMockFallback();
        }
      } catch (err) {
        console.warn("Failed to fetch invitation edit data. Falling back to mock details.");
        loadMockFallback();
      } finally {
        setLoading(false);
      }
    }

    function loadMockFallback() {
      setInitialData({
        brideName: "Priya",
        groomName: "Arjun",
        slug: "priya-arjun",
        weddingDate: new Date().toISOString(),
        weddingTime: "7:00 PM onwards",
        venueName: "Mock Wedding Palace",
        venueAddress: "Mock Address, New Delhi",
        heroImageUrl: "",
        slideshowImages: [],
        showDressCode: false,
        showTransport: false,
        eventsJson: [],
      });
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
