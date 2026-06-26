"use client";

import { MapPinLine, ArrowUpRight } from "@phosphor-icons/react";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";

interface GoogleMapEmbedProps {
  venueName: string;
  venueAddress: string;
  lat?: number | null;
  lng?: number | null;
}

export function GoogleMapEmbed({ venueName, venueAddress, lat, lng }: GoogleMapEmbedProps) {
  // Construct embed URL based on lat/lng or address query
  const embedUrl = lat && lng
    ? `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(venueAddress || venueName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const directionsUrl = lat && lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress || venueName)}`;

  return (
    <DoubleBezelCard className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {/* Map iframe */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-black/5 dark:border-white/5 bg-stone-100 dark:bg-stone-800">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={embedUrl}
          title={`Google Map for ${venueName}`}
        />
      </div>

      {/* Details & Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
            <MapPinLine className="h-5 w-5" weight="light" />
          </div>
          <div>
            <h4 className="font-semibold text-stone-800 dark:text-stone-100 text-sm md:text-base">
              {venueName}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2 max-w-[35ch]">
              {venueAddress}
            </p>
          </div>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 font-semibold text-xs py-3 px-5 shadow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <span>Get Directions</span>
          <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
        </a>
      </div>
    </DoubleBezelCard>
  );
}
