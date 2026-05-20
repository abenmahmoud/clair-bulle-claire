"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Role =
  | "parent"
  | "aesh"
  | "enseignant"
  | "cpe"
  | "pro_sante"
  | "adulte_neuroatypique"
  | "autre";

const ROLES: { value: Role; label: string; description: string }[] = [
  { value: "parent", label: "Parent", description: "Parent d'un enfant neuroatypique" },
  {
    value: "adulte_neuroatypique",
    label: "Adulte neuroatypique",
    description: "TSA, TDAH, hypersensibilité, anxiété sociale",
  },
  {
    value: "aesh",
    label: "AESH",
    description: "Accompagnant·e d'élèves en situation de handicap",
  },
  {
    value: "enseignant",
    label: "Enseignant·e",
    description: "Y compris ULIS, SEGPA, IME, ITEP",
  },
  { value: "cpe", label: "CPE", description: "Conseiller·ère principal·e d'éducation" },
  {
    value: "pro_sante",
    label: "Professionnel·le de santé",
    description: "Psychologue, orthophoniste, éducateur·trice spécialisé·e",
  },
  {
    value: "autre",
    label: "Autre",
    description: "Famille élargie, étudiant·e en formation, curieux·se",
  },
];

export function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/history";

  const [role, setRole] = useState<Role | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    if (!role) return;
    setSubmitting(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    await supabase.from("profiles").update({ role }).eq("id", user.id);

    setShowConfirm(true);
    window.setTimeout(() => router.push(next), 2500);
  };

  return (
    <main className="px-5">
      <div className="pt-6">
        <h1 className="text-[24px] font-bold text-[#1E293B]">
          Bienvenue sur Clair
        </h1>
        <p className="mt-2 text-[15px] text-[#475569]">
          Pour personnaliser ton expérience, dis-nous qui tu es. Tu pourras le
          modifier plus tard.
        </p>
      </div>

      <div className="mt-5 space-y-2">
        {ROLES.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setRole(item.value)}
            className={`w-full rounded-2xl border p-4 text-left transition-colors ${
              role === item.value
                ? "border-[#3563E9] bg-[#EFF3FE] ring-2 ring-[#3563E9]/30"
                : "border-[#E2E0D9] bg-white hover:border-[#94A3B8]"
            }`}
          >
            <div className="font-semibold text-[#1E293B]">{item.label}</div>
            <div className="mt-0.5 text-sm text-[#475569]">{item.description}</div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!role || submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3563E9] py-3.5 text-[16px] font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            <span>Enregistrement…</span>
          </>
        ) : (
          <span>Continuer</span>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-[#64748B]">
        Cette info reste privée. Elle n&apos;est jamais partagée.
      </p>

      {showConfirm && (
        <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-[#5B9279]/30 bg-[#E5F5E5] p-4 shadow-lg">
          <p className="text-sm text-[#1E293B]">
            Profil enregistré. Tes futures analyses seront synchronisées sur ce
            compte Supabase EU (Allemagne). Tu peux modifier ou supprimer ces
            données à tout moment dans les <strong>Paramètres</strong>.
          </p>
        </div>
      )}
    </main>
  );
}
