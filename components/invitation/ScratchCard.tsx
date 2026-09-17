"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { Sparkle, CalendarBlank, Heart } from "@phosphor-icons/react";

export type ScratchTheme = "gold" | "rose" | "emerald" | "sapphire" | "crimson" | "amber";

interface ScratchCardProps {
  revealDate: string;
  revealDay: string;
  revealYear: string;
  islamicDate?: string;
  coupleNames?: string;
  theme?: ScratchTheme;
  overlayColor?: string;
  brushSize?: number;
  onRevealComplete?: () => void;
}

const themeGradients: Record<ScratchTheme, string[]> = {
  gold: ["#8B6810", "#D4AF37", "#FFF3BF", "#D4AF37", "#6E4E05"],
  rose: ["#882C49", "#D4849A", "#FFEBF2", "#D4849A", "#5C172E"],
  emerald: ["#044332", "#059669", "#B7F4D8", "#059669", "#01261B"],
  sapphire: ["#02507D", "#0284C7", "#CBEBFE", "#0284C7", "#06324D"],
  crimson: ["#5B051B", "#9F1239", "#FFE4E8", "#9F1239", "#3B020F"],
  amber: ["#783204", "#D97706", "#FEF3C7", "#D97706", "#572102"],
};

const themeAccents: Record<ScratchTheme, { border: string; accentText: string; dateText: string; badgeBg: string; bg: string; badgeBorder: string }> = {
  gold: { 
    border: "rgba(212, 175, 55, 0.55)", 
    accentText: "#855A08", 
    dateText: "#180E02", 
    badgeBg: "rgba(254, 243, 199, 0.8)", 
    bg: "#FFFCF6", 
    badgeBorder: "rgba(212, 175, 55, 0.4)" 
  },
  rose: { 
    border: "rgba(212, 132, 154, 0.55)", 
    accentText: "#8E2B4A", 
    dateText: "#240611", 
    badgeBg: "rgba(255, 235, 242, 0.8)", 
    bg: "#FFF9FA", 
    badgeBorder: "rgba(212, 132, 154, 0.4)" 
  },
  emerald: { 
    border: "rgba(5, 150, 105, 0.55)", 
    accentText: "#065F46", 
    dateText: "#022116", 
    badgeBg: "rgba(209, 250, 229, 0.8)", 
    bg: "#F7FAF8", 
    badgeBorder: "rgba(5, 150, 105, 0.4)" 
  },
  sapphire: { 
    border: "rgba(2, 132, 199, 0.55)", 
    accentText: "#0369A1", 
    dateText: "#041B2D", 
    badgeBg: "rgba(224, 242, 254, 0.8)", 
    bg: "#F7FAFC", 
    badgeBorder: "rgba(2, 132, 199, 0.4)" 
  },
  crimson: { 
    border: "rgba(159, 18, 57, 0.55)", 
    accentText: "#881337", 
    dateText: "#26020A", 
    badgeBg: "rgba(255, 228, 232, 0.8)", 
    bg: "#FFF8F9", 
    badgeBorder: "rgba(159, 18, 57, 0.4)" 
  },
  amber: { 
    border: "rgba(217, 119, 6, 0.55)", 
    accentText: "#92400E", 
    dateText: "#291102", 
    badgeBg: "rgba(254, 243, 199, 0.8)", 
    bg: "#FFFCF5", 
    badgeBorder: "rgba(217, 119, 6, 0.4)" 
  },
};

export function ScratchCard({
  revealDate,
  revealDay,
  revealYear,
  islamicDate,
  coupleNames,
  theme = "gold",
  overlayColor,
  brushSize = 34,
  onRevealComplete,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const hasRevealedRef = useRef(false);

  const activeTheme = themeAccents[theme] || themeAccents.gold;
  const gradientStops = themeGradients[theme] || themeGradients.gold;

  const drawOverlay = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // High-resolution luxury metallic foil surface
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, gradientStops[0]);
    grad.addColorStop(0.25, gradientStops[1]);
    grad.addColorStop(0.5, gradientStops[2]);
    grad.addColorStop(0.75, gradientStops[3]);
    grad.addColorStop(1, gradientStops[4]);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Diagonal metallic sheen
    const glossGrad = ctx.createLinearGradient(0, 0, w, 0);
    glossGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    glossGrad.addColorStop(0.46, "rgba(255, 255, 255, 0.2)");
    glossGrad.addColorStop(0.50, "rgba(255, 255, 255, 0.5)");
    glossGrad.addColorStop(0.54, "rgba(255, 255, 255, 0.2)");
    glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = glossGrad;
    ctx.fillRect(0, 0, w, h);

    // Elegant dual border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(9, 9, w - 18, h - 18);

    // Corner decorative diamond inlays
    const drawDiamond = (x: number, y: number, size: number) => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fill();
    };

    drawDiamond(16, 16, 3.5);
    drawDiamond(w - 16, 16, 3.5);
    drawDiamond(16, h - 16, 3.5);
    drawDiamond(w - 16, h - 16, 3.5);

    // Top Crest
    ctx.fillStyle = "rgba(20, 10, 5, 0.65)";
    ctx.font = "bold 10px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "2.5px";
    ctx.fillText("✦ ⚜ ✦", w / 2, h / 2 - 20);

    // Foil Call-to-action
    ctx.fillStyle = "rgba(20, 10, 5, 0.85)";
    ctx.font = "bold 12px sans-serif";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("SWIPE TO REVEAL DATE", w / 2, h / 2);

    // Hint
    ctx.fillStyle = "rgba(30, 15, 8, 0.6)";
    ctx.font = "italic 9px serif";
    ctx.letterSpacing = "0.6px";
    ctx.fillText("Touch & scratch to uncover our blessed date", w / 2, h / 2 + 20);
  }, [gradientStops]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        drawOverlay(ctx, rect.width, rect.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [drawOverlay]);

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

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || hasRevealedRef.current) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const totalPixels = pixels.length / 4;
    let clearPixels = 0;

    for (let i = 3; i < pixels.length; i += 40) {
      if (pixels[i] === 0) {
        clearPixels++;
      }
    }

    const percent = Math.round((clearPixels / (totalPixels / 10)) * 100);
    setScratchPercent(percent);

    if (percent > 30 && !hasRevealedRef.current) {
      hasRevealedRef.current = true;
      setIsRevealed(true);
      ctx.clearRect(0, 0, width, height);
      if (onRevealComplete) {
        onRevealComplete();
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    const { x, y } = getCoordinates(e);
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, brushSize * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkScratchPercentage();
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, brushSize * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[340px] min-h-[160px] mx-auto overflow-hidden rounded-2xl border select-none touch-none shadow-[0_14px_40px_rgba(0,0,0,0.5)]"
      style={{
        borderColor: activeTheme.border,
        backgroundColor: activeTheme.bg,
      }}
    >
      {/* ── Revealed Luxury Parchment Card (Underneath) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4 sm:p-5 text-center z-0 box-border">
        {/* Top Header Tag */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <Sparkle size={12} weight="fill" style={{ color: activeTheme.accentText }} />
          <span
            className="text-[9.5px] sm:text-[10px] tracking-[0.24em] font-serif uppercase font-bold"
            style={{ color: activeTheme.accentText }}
          >
            SAVE OUR SACRED DATE
          </span>
          <Sparkle size={12} weight="fill" style={{ color: activeTheme.accentText }} />
        </div>

        {/* Center Grand Date Display */}
        <div className="flex flex-col items-center justify-center my-0.5">
          <h4
            className="font-serif text-[28px] sm:text-[32px] font-black tracking-tight leading-tight m-0"
            style={{
              color: activeTheme.dateText,
              textShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            {revealDate}
          </h4>

          {/* Day & Year Details */}
          <div className="flex items-center justify-center gap-2 mt-1">
            <span
              className="text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase"
              style={{ color: activeTheme.accentText }}
            >
              {revealDay}
            </span>
            <span style={{ color: activeTheme.border, fontSize: "12px" }}>•</span>
            <span
              className="text-[11px] sm:text-[12px] font-bold tracking-[0.16em]"
              style={{ color: activeTheme.accentText }}
            >
              {revealYear}
            </span>
          </div>
        </div>

        {/* Bottom Islamic Date Pill */}
        {islamicDate && (
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm"
            style={{
              borderColor: activeTheme.badgeBorder,
              backgroundColor: activeTheme.badgeBg,
            }}
          >
            <CalendarBlank size={11} weight="fill" style={{ color: activeTheme.accentText }} />
            <span
              className="text-[9.5px] sm:text-[10px] font-serif tracking-[0.06em] font-bold"
              style={{ color: activeTheme.accentText }}
            >
              {islamicDate}
            </span>
          </div>
        )}
      </div>

      {/* ── Canvas Foil Overlay (Scratched by User) ── */}
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
