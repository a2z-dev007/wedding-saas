"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string | Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => {
    // Zero-pad
    const paddedValue = value.toString().padStart(2, "0");
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 p-1 border border-black/5 dark:border-white/5 w-16 md:w-20 aspect-square flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.03] dark:to-white/[0.02]" />
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100 z-10">
            {paddedValue}
          </span>
        </div>
        <span className="text-[10px] md:text-xs font-semibold tracking-wider text-stone-500 uppercase mt-2">
          {label}
        </span>
      </div>
    );
  };

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <span className="font-serif text-lg italic text-[#d4af37]">
          The Wedding Celebration is Live! 🎉
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-3 md:gap-4 select-none my-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-stone-300 dark:text-stone-700 text-2xl self-start mt-4 font-light">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-stone-300 dark:text-stone-700 text-2xl self-start mt-4 font-light">:</div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className="text-stone-300 dark:text-stone-700 text-2xl self-start mt-4 font-light">:</div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
