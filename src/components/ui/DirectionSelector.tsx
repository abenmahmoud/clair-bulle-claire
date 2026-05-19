"use client";

import { TranslationDirection } from "@/types";
import { TRANSLATION_DIRECTIONS } from "@/lib/constants";

interface DirectionSelectorProps {
  selected: TranslationDirection;
  onChange: (direction: TranslationDirection) => void;
}

export default function DirectionSelector({
  selected,
  onChange,
}: DirectionSelectorProps) {
  return (
    <div className="space-y-2">
      {TRANSLATION_DIRECTIONS.map((dir) => (
        <button
          key={dir.value}
          onClick={() => onChange(dir.value)}
          className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
            selected === dir.value
              ? "border-[#3563E9] bg-[#EFF3FE]"
              : "border-[#E2E0D9] bg-white hover:border-[#3563E9]/50"
          }`}
        >
          <div className="mt-0.5">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === dir.value
                  ? "border-[#3563E9]"
                  : "border-[#E2E0D9]"
              }`}
            >
              {selected === dir.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#3563E9]" />
              )}
            </div>
          </div>
          <div>
            <p
              className={`text-sm font-semibold ${
                selected === dir.value ? "text-[#3563E9]" : "text-[#1E293B]"
              }`}
            >
              {dir.label}
            </p>
            <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
              {dir.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
