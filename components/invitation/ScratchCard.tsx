"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkle } from "@phosphor-icons/react";

interface ScratchCardProps {
  revealDate: string;
  revealDay: string;
  revealYear: string;
  overlayColor?: string; // Hex color or gradient instructions
  brushSize?: number;
  onRevealComplete?: () => void;
}

export function ScratchCard({
  revealDate,
  revealDay,
  revealYear,
  overlayColor = "#d4af37", // Gold foil
  brushSize = 30,
  onRevealComplete,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawOverlay(ctx, canvas.width, canvas.height);
      }
    };

    const drawOverlay = (c: CanvasRenderingContext2D, w: number, h: number) => {
      // Background gradient/pattern
      const grad = c.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#b89730");
      grad.addColorStop(0.3, "#d4af37");
      grad.addColorStop(0.5, "#f3e5ab");
      grad.addColorStop(0.7, "#d4af37");
      grad.addColorStop(1, "#aa7c11");

      c.fillStyle = grad;
      c.fillRect(0, 0, w, h);

      // Add elegant texture/text on the scratch surface
      c.fillStyle = "rgba(0, 0, 0, 0.4)";
      c.font = "italic tracking-wider 11px sans-serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("SWIPE TO REVEAL DATE", w / 2, h / 2);

      // Add a border
      c.strokeStyle = "rgba(255, 255, 255, 0.25)";
      c.lineWidth = 4;
      c.strokeRect(6, 6, w - 12, h - 12);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Prevent scrolling on mobile when scratching
    if (e.cancelable) {
      e.preventDefault();
    }

    const { x, y } = getCoordinates(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    // Draw initial dot
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const totalPixels = pixels.length / 4;
    let clearPixels = 0;

    // Sample every 10 pixels to make it faster
    for (let i = 3; i < pixels.length; i += 40) {
      if (pixels[i] === 0) {
        clearPixels++;
      }
    }

    const percent = Math.round((clearPixels / (totalPixels / 10)) * 100);
    setScratchPercent(percent);

    if (percent > 45 && !isRevealed) {
      setIsRevealed(true);
      // Auto-clear the rest of the canvas
      ctx.clearRect(0, 0, width, height);
      if (onRevealComplete) {
        onRevealComplete();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[2/1] max-w-sm mx-auto overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-stone-50 dark:bg-stone-900 select-none touch-none"
    >
      {/* Revealed Date Content (Underneath) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.2 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="flex flex-col items-center"
        >
          <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center mb-2">
            <Sparkle className="h-4 w-4 text-amber-600 animate-pulse" weight="fill" />
          </div>
          <span className="text-[10px] tracking-[0.2em] font-medium text-amber-600/80 uppercase">
            Save the Date
          </span>
          <h4 className="font-serif text-2xl md:text-3xl text-stone-800 dark:text-stone-100 font-bold mt-1 tracking-wide leading-tight">
            {revealDate}
          </h4>
          <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest font-semibold">
            {revealDay} | {revealYear}
          </p>
        </motion.div>
      </div>

      {/* Canvas Overlay to Scratch */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleStart}
        onMouseMove={draw}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={draw}
        onTouchEnd={handleEnd}
        className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 z-10 ${
          isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
}
