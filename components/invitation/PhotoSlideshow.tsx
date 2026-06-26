"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface PhotoSlideshowProps {
  images: string[];
}

export function PhotoSlideshow({ images }: PhotoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-64 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-sm text-stone-400 font-mono">
        NO PHOTOS UPLOADED
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-[4/3] max-w-xl mx-auto overflow-hidden rounded-[2rem] bg-black/5 p-1.5 border border-black/5 dark:bg-white/5 dark:border-white/10 shadow-lg">
      <div className="relative w-full h-full rounded-[calc(2rem-0.375rem)] overflow-hidden bg-stone-900">
        
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Wedding gallery photo ${currentIndex + 1}`}
            className="w-full h-full object-cover select-none"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Overlay Darkening */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

        {/* Navigation arrows (Only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all active:scale-95"
              aria-label="Previous photo"
            >
              <CaretLeft className="h-5 w-5" weight="bold" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all active:scale-95"
              aria-label="Next photo"
            >
              <CaretRight className="h-5 w-5" weight="bold" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
