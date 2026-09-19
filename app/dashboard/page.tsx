"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GlassNav } from "@/components/ui/glass-nav";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { 
  Sparkle, 
  EnvelopeSimple, 
  Users, 
  Link as LinkIcon, 
  Pencil, 
  ShareNetwork, 
  DownloadSimple, 
  Clock, 
  CheckCircle,
  Plus
} from "@phosphor-icons/react";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [connectedEmail, setConnectedEmail] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      let localInvites: any[] = [];
      let email: string | null = null;
      if (typeof window !== "undefined") {
        try {
          email = localStorage.getItem("unfold_user_email");
          setConnectedEmail(email);
          const stored = localStorage.getItem("unfold_active_invitations");
          if (stored) {
            localInvites = JSON.parse(stored);
          }
        } catch (e) {}
      }

      try {
        // Try fetching user invitations from API
        const apiUrl = email ? `/api/invitations?email=${encodeURIComponent(email)}` : "/api/invitations";
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const apiInvites = data.invitations || [];
          // Merge API and local invites
          const merged = [...localInvites, ...apiInvites.filter((ai: any) => !localInvites.some(li => li.id === ai.id || li.slug === ai.slug))];
          setInvitations(merged.length > 0 ? merged : localInvites);
          setMessages(data.messages || []);
        } else {
          loadMockDashboardData(localInvites);
        }
      } catch (err) {
        console.warn("Failed to load dashboard from API. Falling back to saved sandbox data.");
        loadMockDashboardData(localInvites);
      } finally {
        setLoading(false);
      }
    }

    function loadMockDashboardData(localInvites: any[] = []) {
      setIsDemoMode(true);
      if (localInvites && localInvites.length > 0) {
        setInvitations(localInvites);
      } else {
        // Default initial invitation
        const mockInvitations = [
          {
            id: "demo-invitation-id",
            brideName: "Siya",
            groomName: "Kabir",
            slug: "siya-kabir",
            templateId: "royal-lotus",
            weddingDate: "2026-12-14T18:30:00.000Z",
            venueName: "The Maharaja Palace, Udaipur",
          }
        ];
        setInvitations(mockInvitations);
      }

      // Mock RSVPs / messages
      const mockMessages = [
        {
          id: "m1",
          guestName: "Vikram & Neha Sharma",
          message: "Congratulations Siya & Kabir! Wishing you a lifetime of love and royal happiness together. Can't wait to celebrate in Udaipur!",
          rsvpJson: {
            "Wedding Ceremony": { attending: true, guests: 2 },
            "Sangeet Night": { attending: true, guests: 2 }
          },
          createdAt: new Date().toISOString()
        },
        {
          id: "m2",
          guestName: "Aditya Roy",
          message: "Congrats guys! See you at the Sangeet.",
          rsvpJson: {
            "Wedding Ceremony": { attending: false, guests: 0 },
            "Sangeet Night": { attending: true, guests: 1 }
          },
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: "m3",
          guestName: "Anjali Gupta",
          message: "Warmest wishes to the beautiful couple. So happy for you!",
          rsvpJson: {
            "Wedding Ceremony": { attending: true, guests: 1 }
          },
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      setMessages(mockMessages);
    }

    loadDashboardData();
  }, []);

  const totalGuests = messages.reduce((acc, msg) => {
    let count = 0;
    Object.values(msg.rsvpJson || {}).forEach((val: any) => {
      if (val.attending) count = Math.max(count, val.guests || 1);
    });
    return acc + (count || 1);
  }, 0);

  const totalRSVPs = messages.length;

  const downloadCSV = () => {
    const headers = ["Guest Name", "RSVPs Status", "Wishes/Message", "Submitted At"];
    const rows = messages.map(msg => {
      const rsvpSummary = Object.entries(msg.rsvpJson || {})
        .map(([name, val]: any) => `${name}: ${val.attending ? `Yes (${val.guests} guest)` : "No"}`)
        .join(" | ");
      return [
        `"${msg.guestName.replace(/"/g, '""')}"`,
        `"${rsvpSummary.replace(/"/g, '""')}"`,
        `"${(msg.message || "").replace(/"/g, '""')}"`,
        msg.createdAt
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wedding_guest_rsvp_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center text-[#1A1A1A]">
        <Sparkle className="h-10 w-10 text-amber-500 animate-spin-slow mb-2" />
        <span className="text-xs uppercase tracking-widest text-stone-400">Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF7] text-[#1A1A1A]">
      <GlassNav />

      <main className="flex-grow pt-32 px-6 pb-24 max-w-6xl mx-auto w-full">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-600 mb-2">
              <Sparkle className="h-4 w-4" weight="fill" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Management Board</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-tight">
              Your Wedding Invitations
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {connectedEmail && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold px-3 py-0.5">
                  <CheckCircle size={14} weight="fill" className="text-emerald-600" />
                  <span>Account: {connectedEmail}</span>
                </span>
              )}
              {isDemoMode && !connectedEmail && (
                <span className="inline-block rounded bg-amber-500/10 text-amber-600 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Developer Sandbox Session
                </span>
              )}
            </div>
          </div>

          <Link href="/dashboard/invitation/new">
            <PremiumButton className="w-full sm:w-auto">
              <div className="flex items-center gap-1.5 font-bold">
                <Plus className="h-4 w-4" weight="bold" />
                <span>Create New Invite</span>
              </div>
            </PremiumButton>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <DoubleBezelCard className="bg-white border-stone-200/50">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Total RSVPs</span>
                <h3 className="text-3xl font-bold text-stone-950 mt-1">{totalRSVPs}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <EnvelopeSimple className="h-5 w-5" weight="light" />
              </div>
            </div>
          </DoubleBezelCard>

          {/* Card 2 */}
          <DoubleBezelCard className="bg-white border-stone-200/50">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Attending Guests</span>
                <h3 className="text-3xl font-bold text-stone-950 mt-1">{totalGuests}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-[#b89730]">
                <Users className="h-5 w-5" weight="light" />
              </div>
            </div>
          </DoubleBezelCard>

          {/* Card 3 */}
          <DoubleBezelCard className="bg-white border-stone-200/50">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Status</span>
                <h3 className="text-xl font-bold text-emerald-600 mt-2 flex items-center gap-1.5 uppercase tracking-wide text-xs">
                  <CheckCircle className="h-4.5 w-4.5" weight="fill" />
                  <span>Platform Active</span>
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                <Clock className="h-5 w-5" weight="light" />
              </div>
            </div>
          </DoubleBezelCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel - Active Invitations List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-serif text-stone-900 mb-4 lowercase">
              active digital templates
            </h2>

            {invitations.length === 0 ? (
              <DoubleBezelCard className="text-center py-12 bg-white border-stone-200/50">
                <p className="text-sm text-stone-400 font-mono mb-4">NO ACTIVE INVITATIONS YET</p>
                <Link href="/dashboard/invitation/new">
                  <PremiumButton>Create Your First Invite</PremiumButton>
                </Link>
              </DoubleBezelCard>
            ) : (
              invitations.map((invite) => (
                <DoubleBezelCard key={invite.id} className="bg-white border-stone-200/50 flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                        Theme: {invite.templateId.replace("-", " ")}
                      </span>
                      <h3 className="text-xl font-bold text-stone-950 lowercase">
                        {invite.brideName} & {invite.groomName}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 font-mono">
                        Date: {formatDate(invite.weddingDate)}
                      </p>
                    </div>

                    <a
                      href={`/${invite.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:underline"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>/{invite.slug}</span>
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                    <Link href={`/dashboard/invitation/${invite.id}/edit`} className="flex-1 min-w-[120px]">
                      <button className="w-full text-center border border-stone-250 hover:bg-stone-50 text-stone-700 font-semibold py-2.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-colors">
                        <Pencil className="h-4 w-4" />
                        <span>Edit Details</span>
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/${invite.slug}`;
                        navigator.clipboard.writeText(url);
                        setCopiedSlug(invite.slug);
                        setTimeout(() => setCopiedSlug(null), 2500);
                      }}
                      className={`flex-1 min-w-[120px] text-center border font-semibold py-2.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all ${
                        copiedSlug === invite.slug
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "border-stone-250 hover:bg-stone-50 text-stone-700"
                      }`}
                    >
                      {copiedSlug === invite.slug ? (
                        <>
                          <CheckCircle className="h-4 w-4" weight="fill" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <ShareNetwork className="h-4 w-4" />
                          <span>Copy Share Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </DoubleBezelCard>
              ))
            )}
          </div>

          {/* Right panel - RSVPs / Messages list */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif text-stone-900 lowercase">
                guest book wishes
              </h2>
              {messages.length > 0 && (
                <button
                  onClick={downloadCSV}
                  className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-600 hover:underline"
                >
                  <DownloadSimple className="h-4.5 w-4.5" />
                  <span>Download CSV</span>
                </button>
              )}
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {messages.length === 0 ? (
                <DoubleBezelCard className="text-center py-10 bg-white border-stone-200/50">
                  <p className="text-xs text-stone-400 font-mono">NO RSVPS RECEIVED YET</p>
                </DoubleBezelCard>
              ) : (
                messages.map((msg) => (
                  <DoubleBezelCard key={msg.id} className="bg-white border-stone-200/40 p-4">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                        {msg.guestName}
                      </h4>
                      <span className="text-[9px] text-stone-400 font-mono">
                        {new Date(msg.createdAt).toLocaleDateString("en-IN", { hour: "numeric", minute: "numeric" })}
                      </span>
                    </div>

                    {msg.message && (
                      <p className="text-xs text-stone-500 italic mb-3 leading-relaxed">
                        "{msg.message}"
                      </p>
                    )}

                    {/* RSVP summary pills */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(msg.rsvpJson || {}).map(([eventName, val]: any) => (
                        <span
                          key={eventName}
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                            val.attending
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-red-50 text-red-700 border-red-100"
                          }`}
                        >
                          {eventName}: {val.attending ? `Yes (${val.guests || 1})` : "No"}
                        </span>
                      ))}
                    </div>
                  </DoubleBezelCard>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
