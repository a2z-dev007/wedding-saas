"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EnvelopeSimple, MusicNotes } from "@phosphor-icons/react";

interface DoorAnimationProps {
  onOpen: () => void;
  brideName: string;
  groomName: string;
  theme?: string;
}

export function DoorAnimation({ onOpen, brideName, groomName, theme = "emerald" }: DoorAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Give time for doors to animate open before unmounting
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  // Theme-specific styles
  const themeStyles = {
    emerald: {
      bg: "bg-[#082F27]",
      border: "border-[#d4af37]/30",
      accent: "text-[#d4af37]",
      doorBg: "bg-gradient-to-b from-[#06241e] to-[#0d473b]",
      pattern: "radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
    },
    royal: {
      bg: "bg-[#0f172a]",
      border: "border-amber-400/30",
      accent: "text-amber-400",
      doorBg: "bg-gradient-to-b from-[#020617] to-[#1e293b]",
      pattern: "radial-gradient(circle at center, rgba(251,191,36,0.08) 0%, transparent 70%)",
    },
    lotus: {
      bg: "bg-[#FCF9F2]",
      border: "border-[#D4AF37]/50",
      accent: "text-[#D4AF37]",
      doorBg: "bg-gradient-to-b from-[#2B0A10] via-[#4A0E17] to-[#1C0508]",
      pattern: "radial-gradient(circle at center, rgba(212,175,55,0.12) 0%, transparent 70%)",
    },
    minimal: {
      bg: "bg-[#faf9f6]",
      border: "border-black/10",
      accent: "text-black",
      doorBg: "bg-gradient-to-b from-[#faf9f6] to-[#f5f5f4]",
      pattern: "radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, transparent 70%)",
    },
  }[theme as "emerald" | "royal" | "lotus" | "minimal"] || {
    bg: "bg-[#082F27]",
    border: "border-[#d4af37]/30",
    accent: "text-[#d4af37]",
    doorBg: "bg-gradient-to-b from-[#06241e] to-[#0d473b]",
    pattern: "radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Left Door */}
          <motion.div
            className={`absolute left-0 top-0 bottom-0 w-1/2 ${themeStyles.doorBg} border-r ${themeStyles.border} shadow-2xl flex items-center justify-end origin-left`}
            initial={{ rotateY: 0 }}
            animate={isOpen ? { rotateY: -95 } : { rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ 
              perspective: 1200,
              backgroundImage: themeStyles.pattern
            }}
          >
            {/* Ornate patterns on the right edge of left door */}
            <div className="h-full w-4 border-r-2 border-double border-[#d4af37]/20 mr-1 flex flex-col justify-between py-12 opacity-40">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            </div>
          </motion.div>

          {/* Right Door */}
          <motion.div
            className={`absolute right-0 top-0 bottom-0 w-1/2 ${themeStyles.doorBg} border-l ${themeStyles.border} shadow-2xl flex items-center justify-start origin-right`}
            initial={{ rotateY: 0 }}
            animate={isOpen ? { rotateY: 95 } : { rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ 
              perspective: 1200,
              backgroundImage: themeStyles.pattern
            }}
          >
            {/* Ornate patterns on the left edge of right door */}
            <div className="h-full w-4 border-l-2 border-double border-[#d4af37]/20 ml-1 flex flex-col justify-between py-12 opacity-40">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            </div>
          </motion.div>

          {/* Center Seal / Lock Ornament */}
          <div className="relative z-10 flex flex-col items-center justify-center p-4">
            <motion.div
              className={`flex flex-col items-center justify-center rounded-full p-8 bg-black/40 backdrop-blur-md border ${themeStyles.border} shadow-2xl max-w-xs text-center cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/60">
                Wedding Invitation
              </div>
              
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-2 tracking-wide font-light leading-snug">
                {brideName} <br />
                <span className={`text-xs block my-1 font-sans italic opacity-75 ${themeStyles.accent}`}>and</span>
                {groomName}
              </h2>

              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-4" />

              {/* Pulsing opening button */}
              <motion.button
                className="relative flex items-center justify-center gap-2 rounded-full bg-white text-black font-semibold text-xs py-3 px-6 shadow-xl overflow-hidden group"
                animate={{ boxShadow: ["0 0 0 0px rgba(255,255,255,0.4)", "0 0 0 12px rgba(255,255,255,0)"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <EnvelopeSimple weight="light" className="h-4 w-4" />
                <span>TAP TO UNFOLD</span>
              </motion.button>
              
              <div className="mt-4 flex items-center gap-1.5 justify-center text-[9px] text-white/50">
                <MusicNotes className="h-3 w-3 animate-pulse" />
                <span>Includes Audio Experience</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
