import React from "react";

interface DoubleBezelCardProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function DoubleBezelCard({ children, className = "", fullHeight = false }: DoubleBezelCardProps) {
  return (
    <div className={`double-bezel-outer ${fullHeight ? "h-full" : ""}`}>
      <div className={`double-bezel-inner p-6 ${fullHeight ? "h-full" : ""} ${className}`}>
        {children}
      </div>
    </div>
  );
}
