"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DoorAnimation } from "@/components/invitation/DoorAnimation";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { Sliders, ArrowLeft, CreditCard } from "@phosphor-icons/react";
import { getMockInvitationData } from "@/lib/template-meta";
import RoyalLotus from "@/components/templates/RoyalLotus";
import CrimsonRoyale from "@/components/templates/CrimsonRoyale";
import NoorNikah from "@/components/templates/NoorNikah";
import EmeraldNoir from "@/components/templates/EmeraldNoir";
import RoyalElegance from "@/components/templates/RoyalElegance";
import ModernMinimal from "@/components/templates/ModernMinimal";

const templatesMap: Record<string, React.ComponentType<any>> = {
  "noor-e-nikah": NoorNikah,
  "crimson-royale": CrimsonRoyale,
  "royal-lotus": RoyalLotus,
  "emerald-noir": EmeraldNoir,
  "royal-elegance": RoyalElegance,
  "modern-minimal": ModernMinimal,
};

interface InteractivePreviewProps {
  templateId: string;
}

function InteractivePreviewInner({ templateId }: InteractivePreviewProps) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  const [brideName, setBrideName] = useState(templateId === "noor-e-nikah" ? "Diya" : "Ananya");
  const [groomName, setGroomName] = useState(templateId === "noor-e-nikah" ? "Shaan" : "Shubham");
  const [isOpenPanel, setIsOpenPanel] = useState(!isEmbed);
  const [hasOpenedDoors, setHasOpenedDoors] = useState(false);

  const SelectedTemplate = templatesMap[templateId] || NoorNikah;
  const mockData = getMockInvitationData(brideName, groomName);
  const musicTrack = "/templates/crimson-royale/music.mp3";

  const theme =
    templateId === "crimson-royale"
      ? "crimson"
      : templateId === "royal-lotus"
      ? "lotus"
      : templateId === "emerald-noir"
      ? "emerald"
      : templateId === "royal-elegance"
      ? "royal"
      : "minimal";

  return (
    <div className={`relative min-h-[100dvh] bg-[#380D17] overflow-x-hidden ${isEmbed ? "overflow-y-auto" : ""}`}>
      {templateId === "royal-lotus" || templateId === "crimson-royale" || templateId === "noor-e-nikah" ? (
        <SelectedTemplate data={mockData} />
      ) : (
        <>
          <DoorAnimation
            onOpen={() => setHasOpenedDoors(true)}
            brideName={brideName}
            groomName={groomName}
            theme={theme}
          />
          {hasOpenedDoors && (
            <>
              <SelectedTemplate data={mockData} />
              <MusicPlayer trackUrl={musicTrack} autoPlay />
            </>
          )}
        </>
      )}

      {!isEmbed && (
        <>
          <div
            className={`fixed bottom-6 left-6 z-50 transition-all duration-300 max-w-sm w-[90%] md:w-80 ${
              isOpenPanel ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
            }`}
          >
            <div className="bg-black/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white shadow-2xl flex flex-col gap-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Sliders className="h-4 w-4" weight="bold" />
                  <span className="text-xs uppercase font-bold tracking-widest">Sandbox</span>
                </div>
                <button onClick={() => setIsOpenPanel(false)} className="text-[10px] text-white/50 hover:text-white uppercase font-bold">
                  Hide
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/40 font-bold mb-1">Bride</label>
                  <input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-400 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/40 font-bold mb-1">Groom</label>
                  <input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-400 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {["noor-e-nikah", "crimson-royale", "royal-lotus", "emerald-noir", "royal-elegance", "modern-minimal"].map((id) => (
                    <Link href={`/preview/${id}/interactive`} key={id}>
                      <button
                        className={`w-full py-1 text-[8px] uppercase font-bold rounded ${
                          templateId === id ? "bg-amber-400 text-black" : "bg-white/5 text-white/80"
                        }`}
                      >
                        {id.replace("-", " ")}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link href={`/preview/${templateId}`} className="flex-1">
                  <button className="w-full border border-white/20 text-white text-xs font-semibold py-2.5 rounded-full flex items-center justify-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Demo page
                  </button>
                </Link>
                <Link href={`/dashboard/invitation/new?template=${templateId}`} className="flex-1">
                  <button className="w-full bg-amber-400 text-black text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1">
                    <CreditCard className="h-3 w-3" /> Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {!isOpenPanel && (
            <button
              onClick={() => setIsOpenPanel(true)}
              className="fixed bottom-6 left-6 z-50 bg-primary border border-accent-gold/30 text-white p-3 rounded-full shadow-2xl flex items-center gap-1.5 hover:scale-105 transition-transform"
            >
              <Sliders className="h-4 w-4 text-accent-gold" weight="bold" />
              <span className="text-[10px] font-bold tracking-widest uppercase pr-1">Customize</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default function InteractivePreviewPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = use(params);

  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-900" />}>
      <InteractivePreviewInner templateId={templateId} />
    </Suspense>
  );
}
