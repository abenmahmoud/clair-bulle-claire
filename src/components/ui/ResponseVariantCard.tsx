"use client";

import CopyButton from "./CopyButton";
import { ResponseVariant } from "@/types";

interface ResponseVariantCardProps {
  variant: ResponseVariant;
  text: string;
}

const variantConfig: Record<
  ResponseVariant,
  { label: string; color: string; bgColor: string }
> = {
  short: { label: "Courte", color: "#5B9279", bgColor: "#E8F5EE" },
  direct: { label: "Directe", color: "#3563E9", bgColor: "#EFF3FE" },
  soft: { label: "Douce", color: "#E07A5F", bgColor: "#FDF1EE" },
  professional: { label: "Professionnelle", color: "#64748B", bgColor: "#F1F5F9" },
  boundary: { label: "Avec limite", color: "#C2413A", bgColor: "#FDF0EF" },
  child: { label: "Pour enfant", color: "#9B8EC4", bgColor: "#F3F1F9" },
};

export default function ResponseVariantCard({
  variant,
  text,
}: ResponseVariantCardProps) {
  const config = variantConfig[variant];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E0D9] shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{ color: config.color, backgroundColor: config.bgColor }}
        >
          {config.label}
        </span>
        <CopyButton text={text} />
      </div>
      <p className="text-sm text-[#1E293B] leading-relaxed">{text}</p>
    </div>
  );
}
