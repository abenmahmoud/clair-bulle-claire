"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/config";

type Status = "idle" | "sending" | "sent" | "error";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/history";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setStatus("sending");
    setErrorMessage("");

    if (!hasSupabaseConfig()) {
      setStatus("error");
      setErrorMessage(
        "La connexion sera disponible dès que Supabase sera configuré pour ce déploiement."
      );
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          redirectTo
        )}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("sent");
    }
  };

  return (
    <main className="px-5">
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[14px] text-[#475569]"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Retour</span>
        </Link>
      </div>

      <div className="pt-4">
        <h1 className="text-[24px] font-bold text-[#1E293B]">
          Connecte-toi à Clair
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">
          Un compte te permet de retrouver tes analyses sur tous tes appareils.
          Pas obligatoire pour utiliser Clair.
        </p>
      </div>

      {status === "sent" ? (
        <div className="mt-6 rounded-2xl border border-[#5B9279]/30 bg-[#E5F5E5] p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 flex-shrink-0 text-[#2E7D5A]"
              size={24}
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-[#1E293B]">Email envoyé</h2>
              <p className="mt-2 text-sm text-[#475569]">
                On vient d&apos;envoyer un lien de connexion à{" "}
                <strong>{email}</strong>. Clique dessus dans les 60 prochaines
                minutes pour te connecter.
              </p>
              <p className="mt-3 text-xs text-[#64748B]">
                Pense à vérifier ton dossier spam. Si rien n&apos;arrive, vérifie
                l&apos;orthographe de ton email et réessaie.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium text-[#1E293B]">
            Ton adresse email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ton.email@exemple.fr"
            required
            disabled={status === "sending"}
            className="mt-2 w-full rounded-2xl border border-[#E2E0D9] bg-white p-4 text-[16px] text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#3563E9] focus:outline-none focus:ring-2 focus:ring-[#3563E9]/20 disabled:opacity-50"
          />

          {status === "error" && (
            <p className="mt-2 text-sm text-[#C2413A]">
              {errorMessage || "Une erreur est survenue. Réessaie."}
            </p>
          )}

          <button
            type="submit"
            disabled={!email.trim() || !email.includes("@") || status === "sending"}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3563E9] py-3.5 text-[16px] font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-50"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                <span>Envoi en cours…</span>
              </>
            ) : (
              <>
                <Mail size={20} aria-hidden="true" />
                <span>Recevoir le lien de connexion</span>
              </>
            )}
          </button>
        </form>
      )}

      <p className="mt-6 text-xs leading-relaxed text-[#475569]">
        Tes analyses seront stockées sur des serveurs Supabase en Europe
        (Allemagne). Pas de revente, pas de partage, pas de publicité. Tu peux
        tout effacer à tout moment depuis les{" "}
        <Link href="/parametres" className="text-[#3563E9] underline">
          paramètres
        </Link>
        .
      </p>
    </main>
  );
}
