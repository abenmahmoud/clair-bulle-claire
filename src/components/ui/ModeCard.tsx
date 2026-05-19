"use client";

import { ReactNode } from "react";

interface ModeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
  href?: string;
}

export default function ModeCard({
  icon,
  title,
  description,
  color,
  bgColor,
  onClick,
}: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-[#E2E0D9] shadow-sm transition-all duration-200 hover:scale-[0.98] active:scale-95 text-left w-full"
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-[#1E293B] leading-tight">
          {title}
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5 leading-snug">
          {description}
        </p>
      </div>
    </button>
  );
}
