"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GlassNav } from "@/components/ui/glass-nav";
import { PremiumFooter } from "@/components/ui/premium-footer";
import { InvitationCustomizerWizard } from "@/components/customizer/InvitationCustomizerWizard";
import { Sparkle } from "@phosphor-icons/react";

function NewInvitationContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "noor-e-nikah";

  return <InvitationCustomizerWizard templateId={templateId} isEditMode={false} />;
}

export default function NewInvitationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF7] text-[#1A1A1A]">
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
          <NewInvitationContent />
        </Suspense>
      </main>
      <PremiumFooter />
    </div>
  );
}
