"use client";

import { GlassNav } from "@/components/ui/glass-nav";
import { InvitationEditor } from "@/components/dashboard/InvitationEditor";

export default function NewInvitationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      <GlassNav />

      <main className="flex-grow pt-32 px-6 pb-24">
        <InvitationEditor />
      </main>
    </div>
  );
}
