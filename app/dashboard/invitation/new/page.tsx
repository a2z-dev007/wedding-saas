"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GlassNav } from "@/components/ui/glass-nav";
import { InvitationEditor } from "@/components/dashboard/InvitationEditor";

function NewInvitationContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "royal-lotus";

  return <InvitationEditor initialTemplateId={templateId} />;
}

export default function NewInvitationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      <GlassNav />

      <main className="flex-grow pt-32 px-6 pb-24">
        <Suspense fallback={<div className="text-center py-12">Loading editor...</div>}>
          <NewInvitationContent />
        </Suspense>
      </main>
    </div>
  );
}
