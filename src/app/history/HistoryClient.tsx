"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cloud, Smartphone, Star, Trash2 } from "lucide-react";
import { SyncHistoryBanner } from "@/components/SyncHistoryBanner";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import {
  clearLocalAnalyses,
  getLocalAnalyses,
  type CloudAnalysis,
  type LocalAnalysis,
} from "@/lib/sync-history";
import { deleteAnalysis, toggleFavorite } from "@/lib/storage";

type Tab = "local" | "cloud";
type Filter = "all" | "favorites";

export function HistoryClient() {
  const [tab, setTab] = useState<Tab>("local");
  const [filter, setFilter] = useState<Filter>("all");
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [localItems, setLocalItems] = useState<LocalAnalysis[]>([]);
  const [cloudItems, setCloudItems] = useState<CloudAnalysis[]>([]);
  const [loadingCloud, setLoadingCloud] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setLocalItems(getLocalAnalyses());
      setHydrated(true);
    });

    if (!hasSupabaseConfig()) return;

    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email });
      }
    });
  }, []);

  useEffect(() => {
    if (tab !== "cloud" || !user) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setLoadingCloud(true);
    });

    const supabase = createClient();
    void supabase
      .from("analyses")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (cancelled) return;
        setCloudItems((data as CloudAnalysis[]) || []);
        setLoadingCloud(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab, user]);

  const filteredLocal = localItems.filter((item) =>
    filter === "favorites" ? item.favorite : true
  );
  const filteredCloud = cloudItems.filter((item) =>
    filter === "favorites" ? item.favorite : true
  );

  const handleDeleteLocal = (id: string) => {
    deleteAnalysis(id);
    setLocalItems(getLocalAnalyses());
  };

  const handleFavoriteLocal = (id: string) => {
    toggleFavorite(id);
    setLocalItems(getLocalAnalyses());
  };

  const handleClearLocal = () => {
    if (!confirm("Effacer l'historique local de cet appareil ?")) return;
    clearLocalAnalyses();
    setLocalItems([]);
  };

  return (
    <main className="px-0 pb-8 pt-6">
      <div className="px-5">
        <h1 className="mb-1 text-xl font-bold text-[#1E293B]">Historique</h1>
        <p className="text-sm text-[#475569]">
          Retrouve tes analyses sur cet appareil ou sur ton compte.
        </p>
      </div>

      {user && <SyncHistoryBanner />}

      <div className="mt-4 px-5">
        {user ? (
          <div className="inline-flex rounded-full bg-[#F1F5F9] p-1">
            <button
              type="button"
              onClick={() => setTab("local")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === "local" ? "bg-white text-[#1E293B] shadow-sm" : "text-[#475569]"
              }`}
            >
              <Smartphone size={14} aria-hidden="true" />
              <span>Cet appareil ({localItems.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("cloud")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === "cloud" ? "bg-white text-[#1E293B] shadow-sm" : "text-[#475569]"
              }`}
            >
              <Cloud size={14} aria-hidden="true" />
              <span>Mon compte</span>
            </button>
          </div>
        ) : (
          <p className="rounded-2xl border border-[#E2E0D9] bg-white p-4 text-sm text-[#475569]">
            Mode invité : les données restent sur cet appareil.
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2 px-5">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            filter === "all"
              ? "bg-[#3563E9] text-white"
              : "border border-[#E2E0D9] bg-white text-[#475569]"
          }`}
        >
          Tout
        </button>
        <button
          type="button"
          onClick={() => setFilter("favorites")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            filter === "favorites"
              ? "bg-[#3563E9] text-white"
              : "border border-[#E2E0D9] bg-white text-[#475569]"
          }`}
        >
          Favoris
        </button>
      </div>

      <div className="px-5 pt-4">
        {tab === "local" ? (
          <LocalAnalysesList
            hydrated={hydrated}
            items={filteredLocal}
            onDelete={handleDeleteLocal}
            onFavorite={handleFavoriteLocal}
          />
        ) : loadingCloud ? (
          <p className="text-[#475569]">Chargement…</p>
        ) : (
          <CloudAnalysesList items={filteredCloud} />
        )}
      </div>

      {tab === "local" && localItems.length > 0 && (
        <div className="px-5 pt-4">
          <button
            type="button"
            onClick={handleClearLocal}
            className="text-sm font-medium text-[#C2413A] underline"
          >
            Effacer l&apos;historique local
          </button>
        </div>
      )}

      {!user && (
        <div className="mx-5 mt-6 rounded-2xl border border-[#3563E9]/20 bg-[#EFF3FE] p-4">
          <p className="text-sm text-[#1E293B]">
            <strong>Tu veux retrouver tes analyses sur tous tes appareils ?</strong>
          </p>
          <p className="mt-1 text-sm text-[#475569]">
            Crée un compte gratuit : juste un email, pas de mot de passe.
          </p>
          <Link
            href="/login"
            className="mt-3 inline-block rounded-full bg-[#3563E9] px-4 py-2 text-sm font-medium text-white"
          >
            Se connecter
          </Link>
        </div>
      )}
    </main>
  );
}

function LocalAnalysesList({
  hydrated,
  items,
  onDelete,
  onFavorite,
}: {
  hydrated: boolean;
  items: LocalAnalysis[];
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
}) {
  if (!hydrated) {
    return <p className="text-[#475569]">Chargement…</p>;
  }

  if (items.length === 0) {
    return <p className="text-[#475569]">Aucune analyse sur cet appareil pour l&apos;instant.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-2xl border border-[#E2E0D9] bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-medium text-[#1E293B]">
                {item.original_text}
              </p>
              <p className="mt-1 text-xs text-[#64748B]">
                {new Date(item.created_at).toLocaleString("fr-FR")} · {item.context}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-[#475569]">
                {item.result_json.clearTranslation}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => onFavorite(item.id)}
                aria-label={item.favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[#F8F6F0]"
              >
                <Star
                  size={16}
                  className={item.favorite ? "fill-[#D4A017] text-[#D4A017]" : "text-[#64748B]"}
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                aria-label="Supprimer l'analyse locale"
                className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[#FDF0EF]"
              >
                <Trash2 size={16} className="text-[#64748B]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CloudAnalysesList({ items }: { items: CloudAnalysis[] }) {
  if (items.length === 0) {
    return <p className="text-[#475569]">Aucune analyse synchronisée sur ton compte.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-2xl border border-[#E2E0D9] bg-white p-4">
          <p className="line-clamp-2 font-medium text-[#1E293B]">
            {item.original_text}
          </p>
          <p className="mt-1 text-xs text-[#64748B]">
            {new Date(item.created_at).toLocaleString("fr-FR")} · {item.context}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-[#475569]">
            {item.result_json.clearTranslation}
          </p>
        </li>
      ))}
    </ul>
  );
}
