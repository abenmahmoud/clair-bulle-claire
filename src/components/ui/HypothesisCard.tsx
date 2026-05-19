"use client";

import AnalysisCard from "./AnalysisCard";
import { AnalysisHypothesis } from "@/types";
import { HelpCircle } from "lucide-react";

interface HypothesisCardProps {
  hypotheses: AnalysisHypothesis[];
}

const confidenceConfig = {
  faible: { label: "Faible", color: "#64748B", bgColor: "#F1F5F9" },
  moyenne: { label: "Moyenne", color: "#D4A017", bgColor: "#FDF8E8" },
  prudente: { label: "Prudente", color: "#3563E9", bgColor: "#EFF3FE" },
};

export default function HypothesisCard({ hypotheses }: HypothesisCardProps) {
  return (
    <AnalysisCard
      title="Hypothèses"
      color="#9B8EC4"
      bgColor="#F3F1F9"
      icon={<HelpCircle size={18} strokeWidth={2} />}
    >
      <div className="space-y-2.5">
        {hypotheses.map((h, i) => {
          const config = confidenceConfig[h.confidence];
          return (
            <div
              key={i}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8F6F0]"
            >
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase shrink-0 mt-0.5"
                style={{ color: config.color, backgroundColor: config.bgColor }}
              >
                {config.label}
              </span>
              <p className="text-sm text-[#1E293B] leading-relaxed">{h.text}</p>
            </div>
          );
        })}
      </div>
    </AnalysisCard>
  );
}
