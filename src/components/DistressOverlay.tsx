"use client";

import Link from "next/link";
import { Heart, Phone } from "lucide-react";

interface Props {
  onContinue: () => void;
}

export function DistressOverlay({ onContinue }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-[#E07A5F]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-[#1E293B]">
            Tu sembles traverser un moment difficile
          </h2>
        </div>

        <p className="text-sm text-[#475569]">
          Tu n&apos;es pas seul. Des personnes formées sont à l&apos;écoute,
          gratuitement et de façon anonyme.
        </p>

        <div className="space-y-2">
          <a
            href="tel:3114"
            className="flex items-center gap-3 p-3 bg-[#FFE5E5] hover:bg-[#FFD6D6] rounded-xl border border-[#E07A5F] transition-colors"
          >
            <Phone className="w-5 h-5 text-[#E07A5F] flex-shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-lg text-[#1E293B]">3114</div>
              <div className="text-xs text-[#475569]">
                Prévention du suicide — 24h/24, gratuit
              </div>
            </div>
          </a>

          <a
            href="tel:119"
            className="flex items-center gap-3 p-3 bg-[#FFE5E5] hover:bg-[#FFD6D6] rounded-xl border border-[#E07A5F] transition-colors"
          >
            <Phone className="w-5 h-5 text-[#E07A5F] flex-shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-lg text-[#1E293B]">119</div>
              <div className="text-xs text-[#475569]">
                Enfance en danger — 24h/24, gratuit
              </div>
            </div>
          </a>

          <a
            href="tel:3018"
            className="flex items-center gap-3 p-3 bg-[#FFE5E5] hover:bg-[#FFD6D6] rounded-xl border border-[#E07A5F] transition-colors"
          >
            <Phone className="w-5 h-5 text-[#E07A5F] flex-shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-lg text-[#1E293B]">3018</div>
              <div className="text-xs text-[#475569]">
                Cyberharcèlement — Lun-Ven 9h-23h
              </div>
            </div>
          </a>
        </div>

        <Link href="/urgence" className="block text-center text-sm text-[#3563E9] underline pt-2">
          Voir tous les numéros d&apos;aide
        </Link>

        <button
          type="button"
          onClick={onContinue}
          className="w-full mt-2 text-xs text-[#64748B] underline py-2"
        >
          Continuer quand même l&apos;analyse
        </button>
      </div>
    </div>
  );
}
