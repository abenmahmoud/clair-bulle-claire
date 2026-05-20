"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, LogOut, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { STORAGE_KEYS } from "@/lib/constants";
import { getPrivacySetting, setPrivacySetting } from "@/lib/storage";

type DeleteStatus = "idle" | "deleting" | "done";

export function ParametresClient() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<DeleteStatus>("idle");
  const [privacy, setPrivacy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setPrivacy(getPrivacySetting());
    });

    if (!hasSupabaseConfig()) return;

    const supabase = createClient();
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;

      setUser({ id: data.user.id, email: data.user.email });
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      setRole(profile?.role || null);
    });
  }, []);

  const handleClearLocal = () => {
    window.localStorage.removeItem(STORAGE_KEYS.history);
    window.localStorage.removeItem("clair_sync_banner_dismissed");
    setMessage("Historique local effacé sur cet appareil.");
  };

  const handlePrivacyToggle = () => {
    const nextValue = !privacy;
    setPrivacy(nextValue);
    setPrivacySetting(nextValue);
  };

  const handleClearCloud = async () => {
    if (!user) return;
    if (!window.confirm("Effacer toutes tes analyses sur ton compte ? Action irréversible.")) {
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from("analyses").delete().eq("user_id", user.id);
    setMessage(
      error
        ? "Impossible d'effacer les analyses cloud pour le moment."
        : "Analyses cloud effacées."
    );
  };

  const handleDeleteAccountData = async () => {
    if (!user) return;
    setDeleteStatus("deleting");

    const supabase = createClient();
    await supabase.from("analyses").delete().eq("user_id", user.id);
    await supabase.from("profiles").update({ display_name: null, role: null }).eq("id", user.id);
    await supabase.auth.signOut();

    setDeleteStatus("done");
    setMessage("Données de compte supprimées. Redirection vers l'accueil…");
    window.setTimeout(() => router.push("/"), 2000);
  };

  const handleLogout = async () => {
    if (!hasSupabaseConfig()) return;

    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <main className="px-5 pb-8">
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
        <h1 className="text-[24px] font-bold text-[#1E293B]">Paramètres</h1>
      </div>

      {message && (
        <div className="mt-4 rounded-2xl border border-[#3563E9]/20 bg-[#EFF3FE] p-3 text-sm text-[#1E293B]">
          {message}
        </div>
      )}

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
          Mon compte
        </h2>
        {user ? (
          <div className="mt-2 rounded-2xl border border-[#E2E0D9] bg-white p-4">
            <p className="text-sm text-[#475569]">Connecté avec</p>
            <p className="font-medium text-[#1E293B]">{user.email}</p>
            {role && (
              <p className="mt-2 text-sm text-[#475569]">
                Rôle : {role.replace("_", " ")}
              </p>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#475569] underline"
            >
              <LogOut size={14} aria-hidden="true" />
              <span>Se déconnecter</span>
            </button>
          </div>
        ) : (
          <div className="mt-2 rounded-2xl border border-[#3563E9]/20 bg-[#EFF3FE] p-4">
            <p className="text-sm text-[#475569]">
              Aucun compte connecté. Clair reste utilisable sans compte, avec un historique
              stocké uniquement sur cet appareil.
            </p>
            <Link
              href="/login"
              className="mt-3 inline-block rounded-full bg-[#3563E9] px-4 py-2 text-sm font-medium text-white"
            >
              Se connecter
            </Link>
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
          Données locales (cet appareil)
        </h2>
        <div className="mt-2 flex items-center justify-between rounded-2xl border border-[#E2E0D9] bg-white p-4">
          <div>
            <p className="text-sm font-medium text-[#1E293B]">
              Ne pas sauvegarder l&apos;historique
            </p>
            <p className="mt-1 text-xs text-[#64748B]">
              Les nouvelles analyses resteront hors historique local.
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrivacyToggle}
            aria-pressed={privacy}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              privacy ? "bg-[#3563E9]" : "bg-[#E2E0D9]"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                privacy ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <button
          type="button"
          onClick={handleClearLocal}
          className="mt-2 inline-flex items-center gap-1.5 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm text-[#1E293B] hover:bg-[#F8F6F0]"
        >
          <Trash2 size={16} aria-hidden="true" />
          <span>Effacer l&apos;historique de cet appareil</span>
        </button>
        <p className="mt-2 text-xs text-[#64748B]">
          Supprime toutes les analyses stockées dans le navigateur de cet appareil.
        </p>
      </section>

      {user && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
            Données sur mon compte (cloud)
          </h2>
          <button
            type="button"
            onClick={handleClearCloud}
            className="mt-2 inline-flex items-center gap-1.5 rounded-2xl border border-[#E2E0D9] bg-white px-4 py-3 text-sm text-[#1E293B] hover:bg-[#F8F6F0]"
          >
            <Trash2 size={16} aria-hidden="true" />
            <span>Effacer toutes mes analyses cloud</span>
          </button>
          <p className="mt-2 text-xs text-[#64748B]">
            Supprime toutes les analyses synchronisées sur ton compte Supabase. Le
            compte reste actif.
          </p>
        </section>
      )}

      {user && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C2413A]">
            Zone sensible
          </h2>
          {!confirmDeleteAccount ? (
            <button
              type="button"
              onClick={() => setConfirmDeleteAccount(true)}
              className="mt-2 inline-flex items-center gap-1.5 rounded-2xl border border-[#C2413A]/30 bg-[#FDF0EF] px-4 py-3 text-sm text-[#C2413A] hover:bg-[#FCE2E0]"
            >
              <AlertTriangle size={16} aria-hidden="true" />
              <span>Supprimer mes données de compte</span>
            </button>
          ) : (
            <div className="mt-2 rounded-2xl border border-[#C2413A]/30 bg-[#FDF0EF] p-4">
              <p className="font-semibold text-[#C2413A]">
                Cette action est irréversible.
              </p>
              <p className="mt-2 text-sm text-[#1E293B]">
                Toutes tes analyses cloud seront supprimées, ton profil sera
                réinitialisé, puis tu seras déconnecté. Les données stockées sur cet
                appareil restent intactes sauf si tu les effaces aussi.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleDeleteAccountData}
                  disabled={deleteStatus !== "idle"}
                  className="rounded-full bg-[#C2413A] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {deleteStatus === "deleting"
                    ? "Suppression…"
                    : deleteStatus === "done"
                      ? "Supprimé"
                      : "Confirmer la suppression"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDeleteAccount(false)}
                  className="rounded-full border border-[#E2E0D9] bg-white px-4 py-2 text-sm text-[#1E293B]"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
          <p className="mt-2 text-xs text-[#64748B]">
            Conformément au RGPD, tu peux à tout moment supprimer tes analyses et
            réinitialiser les données associées à ton compte Clair.
          </p>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
          Informations
        </h2>
        <ul className="mt-2 space-y-2 text-sm">
          <li>
            <Link href="/confidentialite" className="text-[#3563E9] underline">
              Politique de confidentialité
            </Link>
          </li>
          <li>
            <Link href="/ethique" className="text-[#3563E9] underline">
              Charte éthique
            </Link>
          </li>
          <li>
            <Link href="/legal" className="text-[#3563E9] underline">
              Mentions légales
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
