"use client";

import { motion } from "motion/react";
import { Sparkle, Calendar, Clock, MapPin } from "@phosphor-icons/react";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { ScratchCard } from "@/components/invitation/ScratchCard";
import { PhotoSlideshow } from "@/components/invitation/PhotoSlideshow";
import { GoogleMapEmbed } from "@/components/invitation/GoogleMapEmbed";
import { GuestMessageForm } from "@/components/invitation/GuestMessageForm";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { formatDate } from "@/lib/utils";

interface InvitationData {
  id: string;
  brideName: string;
  groomName: string;
  weddingDate: Date | string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  venueLat?: number | null;
  venueLng?: number | null;
  heroImageUrl?: string | null;
  slideshowImages: string[];
  showDressCode: boolean;
  dressCodeText?: string | null;
  showTransport: boolean;
  transportText?: string | null;
  eventsJson: any[];
}

interface ModernMinimalProps {
  data: InvitationData;
}

export default function ModernMinimal({ data }: ModernMinimalProps) {
  const weddingDateObj = new Date(data.weddingDate);
  const dayStr = weddingDateObj.toLocaleDateString("en-IN", { weekday: "long" });
  const dateStr = weddingDateObj.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
  const yearStr = weddingDateObj.getFullYear().toString();

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] overflow-x-hidden relative font-sans">
      
      {/* Hero section */}
      <section className="relative min-h-[90dvh] flex flex-col justify-center items-center px-6 py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="rounded-full px-3.5 py-1 text-[9px] uppercase tracking-[0.25em] font-bold bg-black/5 text-black mb-8">
            The Wedding of
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter mb-8 lowercase">
            {data.brideName} <br />
            <span className="font-light italic text-xl md:text-2xl block my-1 font-serif text-stone-500">and</span>
            {data.groomName}
          </h1>

          <div className="h-[2px] w-12 bg-black my-6" />

          <p className="text-xs md:text-sm tracking-[0.1em] text-stone-500 uppercase max-w-[50ch] leading-relaxed">
            Please join us as we celebrate our marriage on <br />
            <span className="font-black text-black tracking-[0.15em] block mt-2 text-sm">
              {formatDate(data.weddingDate)}
            </span>
          </p>

          {/* Hero Image in a crisp Minimal Frame */}
          {data.heroImageUrl && (
            <div className="mt-12 rounded-3xl bg-black/5 p-1 border border-black/5 shadow-xl max-w-md w-full aspect-[4/5] overflow-hidden">
              <div className="rounded-[calc(1.5rem)] overflow-hidden w-full h-full">
                <img
                  src={data.heroImageUrl}
                  alt={`${data.brideName} and ${data.groomName}`}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Countdown & Scratch Reveal */}
      <section className="py-24 px-6 border-t border-b border-black/5 bg-[#f4f4f4]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-400">Countdown</span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black mt-2 mb-6 lowercase">
              counting down...
            </h2>
            <CountdownTimer targetDate={data.weddingDate} />
          </div>

          <div className="w-full">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-400">Date Reveal</span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black mt-2 mb-6 lowercase">
              scratch the card
            </h2>
            <ScratchCard
              revealDate={dateStr}
              revealDay={dayStr}
              revealYear={yearStr}
              overlayColor="#333333"
            />
          </div>
        </div>
      </section>

      {/* Schedule of Events */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-400">Itinerary</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black mt-2 lowercase">
            schedule of events
          </h2>
        </div>

        <div className="space-y-6">
          {data.eventsJson && data.eventsJson.length > 0 ? (
            data.eventsJson.map((event) => {
              if (!event.enabled) return null;
              
              return (
                <div key={event.name}>
                  <DoubleBezelCard className="border-black/5 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Ceremony</span>
                        <h3 className="text-lg md:text-xl font-bold text-black lowercase mb-2">
                          {event.name}
                        </h3>
                      </div>
                      <div className="text-xs md:text-sm text-stone-600 space-y-1 sm:text-right">
                        {event.date && <p className="font-semibold">{event.date}</p>}
                        {event.time && <p>{event.time}</p>}
                        {event.venue && <p className="text-stone-400 mt-1">{event.venue}</p>}
                      </div>
                    </div>
                  </DoubleBezelCard>
                </div>
              );
            })
          ) : (
            <div>
              <DoubleBezelCard className="border-black/5 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-black lowercase">wedding ceremony</h3>
                  <div className="text-xs md:text-sm text-stone-600 sm:text-right">
                    <p className="font-semibold">{dateStr}, {yearStr}</p>
                    <p>{data.weddingTime}</p>
                    <p className="text-stone-400 mt-1">{data.venueName}</p>
                  </div>
                </div>
              </DoubleBezelCard>
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Slideshow */}
      {data.slideshowImages && data.slideshowImages.length > 0 && (
        <section className="py-24 px-6 border-t border-b border-black/5 bg-[#f4f4f4]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#888] mb-2 block">Gallery</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black mb-12 lowercase">
              captured moments
            </h2>
            <PhotoSlideshow images={data.slideshowImages} />
          </div>
        </section>
      )}

      {/* Map Embed */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#888] mb-2 block">Directions</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black mb-12 lowercase">
          venue location
        </h2>
        <GoogleMapEmbed
          venueName={data.venueName}
          venueAddress={data.venueAddress}
          lat={data.venueLat}
          lng={data.venueLng}
        />
      </section>

      {/* Dress code & Lodging */}
      {(data.showDressCode || data.showTransport) && (
        <section className="py-24 px-6 bg-[#f4f4f4] border-t border-b border-black/5">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.showDressCode && (
              <DoubleBezelCard className="border-black/5 bg-white">
                <h3 className="text-lg font-bold text-black mb-2 lowercase">
                  dress code
                </h3>
                <p className="text-xs md:text-sm text-stone-500 leading-relaxed">
                  {data.dressCodeText || "Casual/formal dress code applies."}
                </p>
              </DoubleBezelCard>
            )}

            {data.showTransport && (
              <DoubleBezelCard className="border-black/5 bg-white">
                <h3 className="text-lg font-bold text-black mb-2 lowercase">
                  travel & lodging
                </h3>
                <p className="text-xs md:text-sm text-stone-500 leading-relaxed">
                  {data.transportText || "Accommodations details can be shared."}
                </p>
              </DoubleBezelCard>
            )}
          </div>
        </section>
      )}

      {/* RSVP Form */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <GuestMessageForm
          invitationId={data.id}
          events={data.eventsJson || [{ name: "Wedding Celebration", enabled: true }]}
        />
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-black/5 bg-[#fcfcfc]">
        <p className="text-xs tracking-widest text-stone-400 uppercase">
          see you soon
        </p>
        <span className="block text-[9px] uppercase tracking-widest text-stone-300 mt-6">
          unfoldwed.com Invitation
        </span>
      </footer>
    </div>
  );
}
