"use client";

import { ContextType } from "@/types";
import { CONTEXT_TYPES } from "@/lib/constants";

interface ContextPickerProps {
  selected: ContextType;
  onChange: (context: ContextType) => void;
}

export default function ContextPicker({ selected, onChange }: ContextPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CONTEXT_TYPES.map((ctx) => (
        <button
          key={ctx.value}
          onClick={() => onChange(ctx.value)}
          className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === ctx.value
              ? "bg-[#3563E9] text-white shadow-sm"
              : "bg-white text-[#64748B] border border-[#E2E0D9] hover:border-[#3563E9] hover:text-[#3563E9]"
          }`}
        >
          {ctx.label}
        </button>
      ))}
    </div>
  );
}
