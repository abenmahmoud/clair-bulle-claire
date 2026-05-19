"use client";

import { ReactNode } from "react";

interface AnalysisCardProps {
  title: string;
  children: ReactNode;
  color?: string;
  bgColor?: string;
  icon?: ReactNode;
}

export default function AnalysisCard({
  title,
  children,
  color = "#3563E9",
  bgColor = "#EFF3FE",
  icon,
}: AnalysisCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E0D9] shadow-sm overflow-hidden">
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{ backgroundColor: bgColor }}
      >
        {icon && <div style={{ color }}>{icon}</div>}
        <h3 className="text-sm font-semibold" style={{ color }}>
          {title}
        </h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
