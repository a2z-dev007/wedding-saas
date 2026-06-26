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

interface RoyalEleganceProps {
  data: InvitationData;
}

export default function RoyalElegance({ data }: RoyalEleganceProps) {
  const weddingDateObj = new Date(data.weddingDate);
  const dayStr = weddingDateObj.toLocaleDateString("en-IN", { weekday: "long" });
  const dateStr = weddingDateObj.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
  const yearStr = weddingDateObj.getFullYear().toString();

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#2c2b29] overflow-x-hidden relative font-sans">
      {/* Background Decorative patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.03)_0%,transparent_80%)] pointer-events-none" />

      {/* Editorial Luxury Header/Hero */}
      <section className="relative min-h-[90dvh] flex flex-col justify-center items-center px-6 py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Ornate Gold Top Header Element */}
          <div className="flex justify-center items-center gap-2 mb-8 opacity-75">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#b89730]" />
            <Sparkle className="h-4 w-4 text-[#b89730]" weight="light" />
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#b89730]" />
          </div>

          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold text-[#b89730] mb-6">
            The Wedding Celebration
          </span>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight mb-8 text-[#1b1a18]">
            {data.brideName} <br />
            <span className="font-sans italic text-2xl md:text-3xl block my-2 text-[#b89730] font-light">and</span>
            {data.groomName}
          </h1>

          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#b89730] to-transparent my-6" />

          <p className="text-sm md:text-base font-serif italic text-stone-600 tracking-wider">
            With joyful hearts, we request your presence at our wedding ceremony <br />
            <span className="font-sans font-bold not-italic tracking-widest text-[#1b1a18] uppercase text-sm block mt-2">
              {formatDate(data.weddingDate)}
            </span>
          </p>

          {/* Hero Banner image with concentric double-bezel border */}
          {data.heroImageUrl && (
            <div className="mt-12 rounded-[2rem] bg-black/5 p-1.5 border border-black/5 shadow-xl max-w-md w-full aspect-[4/5] overflow-hidden">
              <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden w-full h-full">
                <img
                  src={data.heroImageUrl}
                  alt={`${data.brideName} and ${data.groomName}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Countdown & Save the Date Scratch */}
      <section className="py-24 px-6 border-t border-b border-black/5 bg-[#faf6ed]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b89730]">Countdown</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#1b1a18] mt-2 mb-6">
              Moments to the Celebration
            </h2>
            <CountdownTimer targetDate={data.weddingDate} />
          </div>

          <div className="w-full">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b89730]">Interactive Invitation</span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight text-[#1b1a18] mt-2 mb-6">
              Reveal the Date
            </h2>
            <ScratchCard
              revealDate={dateStr}
              revealDay={dayStr}
              revealYear={yearStr}
              overlayColor="#b89730"
            />
          </div>
        </div>
      </section>

      {/* Schedule of Events (Timeline) */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b89730]">Events Schedule</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#1b1a18] mt-2">
            The Ceremony Schedule
          </h2>
        </div>

        <div className="space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-4 before:bottom-4 before:w-[1px] before:bg-gradient-to-b before:from-[#b89730]/0 before:via-[#b89730]/30 before:to-[#b89730]/0">
          {data.eventsJson && data.eventsJson.length > 0 ? (
            data.eventsJson.map((event, idx) => {
              if (!event.enabled) return null;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={event.name}
                  className={`flex flex-col md:flex-row items-stretch gap-6 relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-[7px] w-[15px] h-[15px] rounded-full bg-[#b89730] border-4 border-[#fcfaf6] z-10 top-6" />

                  <div className="w-full md:w-1/2" />

                  <div className="w-full md:w-1/2 pl-10 md:pl-0">
                    <DoubleBezelCard className="border-[#b89730]/20 bg-white">
                      <div className="flex items-center gap-2 text-[#b89730] text-xs font-semibold uppercase tracking-wider mb-2">
                        <Sparkle className="h-3.5 w-3.5" weight="light" />
                        <span>Event Ceremony</span>
                      </div>
                      
                      <h3 className="font-serif text-xl md:text-2xl text-[#1b1a18] font-bold mb-3">
                        {event.name}
                      </h3>

                      <div className="space-y-2 text-xs md:text-sm text-stone-600">
                        {event.date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 opacity-75 text-[#b89730]" />
                            <span>{event.date}</span>
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 opacity-75 text-[#b89730]" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.venue && (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 opacity-75 text-[#b89730] shrink-0 mt-0.5" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                      </div>
                    </DoubleBezelCard>
                  </div>
                </div>
              );
            })
          ) : (
            // Default event
            <div className="flex flex-col md:flex-row items-stretch gap-6 relative">
              <div className="absolute left-4 md:left-1/2 -translate-x-[7px] w-[15px] h-[15px] rounded-full bg-[#b89730] border-4 border-[#fcfaf6] z-10 top-6" />
              <div className="w-full md:w-1/2" />
              <div className="w-full md:w-1/2 pl-10 md:pl-0">
                <DoubleBezelCard className="border-[#b89730]/20 bg-white">
                  <h3 className="font-serif text-xl text-[#1b1a18] font-bold mb-2">Nuptial Ceremony</h3>
                  <p className="text-xs text-stone-600">{dateStr}, {yearStr} at {data.weddingTime}</p>
                  <p className="text-xs text-stone-600 mt-2">{data.venueName}</p>
                </DoubleBezelCard>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Slideshow */}
      {data.slideshowImages && data.slideshowImages.length > 0 && (
        <section className="py-24 px-6 border-t border-b border-black/5 bg-[#faf6ed]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b89730] mb-2 block">Our Gallery</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#1b1a18] mb-12">
              Our Journey in Photos
            </h2>
            <PhotoSlideshow images={data.slideshowImages} />
          </div>
        </section>
      )}

      {/* Map Embed */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b89730] mb-2 block">Location directions</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#1b1a18] mb-12">
          Venue Coordinates
        </h2>
        <GoogleMapEmbed
          venueName={data.venueName}
          venueAddress={data.venueAddress}
          lat={data.venueLat}
          lng={data.venueLng}
        />
      </section>

      {/* Dress code & Lodging toggles */}
      {(data.showDressCode || data.showTransport) && (
        <section className="py-24 px-6 bg-[#faf6ed] border-t border-b border-black/5">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.showDressCode && (
              <DoubleBezelCard className="border-[#b89730]/20 bg-white">
                <h3 className="font-serif text-xl text-[#1b1a18] font-bold mb-3 flex items-center gap-2">
                  <Sparkle className="h-4 w-4 text-[#b89730]" />
                  <span>Dress Code</span>
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                  {data.dressCodeText || "Semi-formal, traditional Indian wear is preferred."}
                </p>
              </DoubleBezelCard>
            )}

            {data.showTransport && (
              <DoubleBezelCard className="border-[#b89730]/20 bg-white">
                <h3 className="font-serif text-xl text-[#1b1a18] font-bold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#b89730]" />
                  <span>Travel Details</span>
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                  {data.transportText || "Accommodations can be arranged upon request. Please contact the coordinator."}
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
      <footer className="py-16 text-center border-t border-black/5 bg-[#faf8f4]">
        <div className="flex justify-center items-center gap-2 opacity-60 mb-6">
          <div className="h-[1px] w-8 bg-[#b89730]" />
          <Sparkle className="h-3 w-3 text-[#b89730]" weight="fill" />
          <div className="h-[1px] w-8 bg-[#b89730]" />
        </div>
        <p className="font-serif italic text-stone-600 text-sm">
          We look forward to welcoming you!
        </p>
        <span className="block text-[9px] uppercase tracking-widest text-stone-400 mt-6 font-sans">
          unfoldwed.com Invitation
        </span>
      </footer>
    </div>
  );
}
