"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8F6F0] hover:bg-[#E2E0D9] transition-colors shrink-0"
      aria-label="Copier"
    >
      {copied ? (
        <Check size={16} className="text-[#5B9279]" strokeWidth={2.5} />
      ) : (
        <Copy size={16} className="text-[#64748B]" strokeWidth={1.5} />
      )}
    </button>
  );
}
