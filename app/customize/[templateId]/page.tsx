"use client";

import { use, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GlassNav } from "@/components/ui/glass-nav";
import { PremiumFooter } from "@/components/ui/premium-footer";
import { InvitationCustomizerWizard } from "@/components/customizer/InvitationCustomizerWizard";
import { Sparkle } from "@phosphor-icons/react";

interface CustomizePageProps {
  params: Promise<{ templateId: string }>;
}

function CustomizeTemplateContent({ templateId }: { templateId: string }) {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("slug");
  const editId = searchParams.get("id");

  const [initialData, setInitialData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(editSlug || editId));

  useEffect(() => {
    async function loadExistingData() {
      if (!editSlug && !editId) {
        setLoading(false);
        return;
      }

      // 1. Try localStorage first for instant load
      if (typeof window !== "undefined") {
        try {
          if (editSlug) {
            const stored = localStorage.getItem(`unfold_invitation_${editSlug}`);
            if (stored) {
              setInitialData(JSON.parse(stored));
              setLoading(false);
              return;
            }
          }
          if (editId) {
            const storedId = localStorage.getItem(`unfold_invitation_${editId}`);
            if (storedId) {
              setInitialData(JSON.parse(storedId));
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn("Could not read local cache:", e);
        }
      }

      // 2. Fetch from database API
      try {
        if (editId) {
          const res = await fetch(`/api/invitations/${editId}`);
          if (res.ok) {
            const data = await res.json();
            setInitialData(data);
            setLoading(false);
            return;
          }
        }
        if (editSlug) {
          const res = await fetch(`/api/invitations/public?slug=${encodeURIComponent(editSlug)}`);
          if (res.ok) {
            const data = await res.json();
            setInitialData(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch invitation from API:", err);
      } finally {
        setLoading(false);
      }
    }

    loadExistingData();
  }, [editSlug, editId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-stone-900">
        <Sparkle className="h-8 w-8 text-amber-500 animate-spin-slow mb-2" />
        <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
          Loading Customizer...
        </span>
      </div>
    );
  }

  return (
    <InvitationCustomizerWizard
      templateId={initialData?.templateId || templateId}
      invitationId={editId || initialData?.id}
      initialData={initialData}
      isEditMode={Boolean(editSlug || editId)}
    />
  );
}

export default function CustomizeTemplatePage({ params }: CustomizePageProps) {
  const { templateId } = use(params);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1A1A1A] flex flex-col">
      <GlassNav />
      <main className="flex-grow pt-28 pb-20">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-stone-900">
              <Sparkle className="h-8 w-8 text-amber-500 animate-spin-slow mb-2" />
              <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
                Loading Customizer...
              </span>
            </div>
          }
        >
          <CustomizeTemplateContent templateId={templateId} />
        </Suspense>
      </main>
      <PremiumFooter />
    </div>
  );
}
