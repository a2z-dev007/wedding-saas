"use client";

import { useEffect, useRef, useState } from "react";
import { SpeakerHigh, SpeakerSlash, Play, Pause } from "@phosphor-icons/react";

interface MusicPlayerProps {
  trackUrl: string; // can be local file or remote URL
  autoPlay?: boolean;
}

export function MusicPlayer({ trackUrl, autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // If autoPlay is enabled, try playing on mount
    if (autoPlay && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay blocked by browser. Awaiting user interaction.");
          });
      }
    }
  }, [autoPlay, trackUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Playback failed", error);
        });
    }
    setHasInteracted(true);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 select-none">
      {/* Hidden Audio element */}
      <audio
        ref={audioRef}
        src={trackUrl}
        loop
        preload="auto"
      />

      {/* Control Panel */}
      <div className="flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md p-1.5 border border-black/5 dark:border-white/10 shadow-lg transition-all duration-300 hover:scale-105">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#082F27] text-white hover:bg-[#0c473b] transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" weight="fill" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" weight="fill" />
          )}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-colors"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <SpeakerSlash className="h-4.5 w-4.5" weight="light" />
            ) : (
              <SpeakerHigh className="h-4.5 w-4.5" weight="light" />
            )}
          </button>
        )}

        {isPlaying && !isMuted && (
          <div className="flex items-end gap-0.5 h-3 px-2 mr-1">
            <span className="w-0.5 bg-emerald-600 rounded-full animate-[musicWave_1s_infinite_alternate]" style={{ animationDelay: "0.1s" }} />
            <span className="w-0.5 bg-emerald-600 rounded-full animate-[musicWave_1.4s_infinite_alternate]" style={{ animationDelay: "0.3s" }} />
            <span className="w-0.5 bg-emerald-600 rounded-full animate-[musicWave_0.8s_infinite_alternate]" style={{ animationDelay: "0s" }} />
            <span className="w-0.5 bg-emerald-600 rounded-full animate-[musicWave_1.2s_infinite_alternate]" style={{ animationDelay: "0.5s" }} />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes musicWave {
          0% { height: 4px; }
          100% { height: 12px; }
        }
      `}</style>
    </div>
  );
}
