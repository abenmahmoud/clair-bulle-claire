"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash2, Clock, ChevronDown, ChevronUp, Shield } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";
import {
  getHistory,
  deleteAnalysis,
  clearHistory,
  toggleFavorite,
  getPrivacySetting,
  setPrivacySetting,
} from "@/lib/storage";
import { HistoryItem } from "@/types";

export default function HistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(getHistory());
  const [privacy, setPrivacy] = useState(getPrivacySetting());
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredHistory = history.filter((item) => {
    if (filter === "favorites") return item.favorite;
    return true;
  });

  const handleDelete = (id: string) => {
    deleteAnalysis(id);
    setHistory(getHistory());
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
    setShowClearConfirm(false);
  };

  const handlePrivacyToggle = () => {
    const newValue = !privacy;
    setPrivacy(newValue);
    setPrivacySetting(newValue);
  };

  return (
    <AppShell>
      <main className="px-5 pt-6 pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1E293B] mb-1">Historique</h1>
          <p className="text-sm text-[#64748B]">
            Retrouve tes analyses précédentes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-[#3563E9] text-white"
                : "bg-white text-[#64748B] border border-[#E2E0D9]"
            }`}
          >
            Tout
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "favorites"
                ? "bg-[#3563E9] text-white"
                : "bg-white text-[#64748B] border border-[#E2E0D9]"
            }`}
          >
            Favoris
          </button>
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#F1F0EB] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-[#64748B]" strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[#64748B] mb-4">
              {filter === "favorites"
                ? "Aucun favori pour le moment."
                : "Aucune analyse sauvegardée."}
            </p>
            <button
              onClick={() => router.push("/clarify")}
              className="px-6 py-2.5 bg-[#3563E9] text-white text-sm font-medium rounded-2xl hover:bg-[#2547B3] transition-colors"
            >
              Faire une analyse
            </button>
          </div>
        )}

        {/* History List */}
        <div className="space-y-3 mb-8">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E2E0D9] shadow-sm overflow-hidden"
            >
              {/* Item Header */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-medium text-[#1E293B] truncate">
                    &ldquo;{item.original.length > 50 ? item.original.substring(0, 50) + "..." : item.original}&rdquo;
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {new Date(item.savedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    · {item.context}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(item.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8F6F0] transition-colors"
                  >
                    <Star
                      size={16}
                      strokeWidth={1.5}
                      className={
                        item.favorite
                          ? "text-[#D4A017] fill-[#D4A017]"
                          : "text-[#64748B]"
                      }
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FDF0EF] transition-colors"
                  >
                    <Trash2
                      size={16}
                      strokeWidth={1.5}
                      className="text-[#64748B] hover:text-[#C2413A]"
                    />
                  </button>
                  {expandedId === item.id ? (
                    <ChevronUp size={16} className="text-[#64748B]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#64748B]" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === item.id && (
                <div className="px-4 pb-4 border-t border-[#EEEDEA] pt-3">
                  <p className="text-xs font-medium text-[#3563E9] mb-1">
                    Traduction claire
                  </p>
                  <p className="text-sm text-[#1E293B] leading-relaxed mb-3">
                    {item.result.clearTranslation}
                  </p>
                  <p className="text-xs font-medium text-[#9B8EC4] mb-1">
                    Question à poser
                  </p>
                  <p className="text-sm text-[#1E293B] leading-relaxed italic">
                    &ldquo;{item.result.clarifyingQuestion}&rdquo;
                  </p>
                  <button
                    onClick={() =>
                      router.push(
                        `/clarify/result?text=${encodeURIComponent(
                          item.original
                        )}&direction=${item.direction}&context=${item.context}`
                      )
                    }
                    className="mt-3 text-xs font-medium text-[#3563E9] hover:text-[#2547B3] transition-colors"
                  >
                    Voir l&apos;analyse complète →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Privacy Panel */}
        <div className="bg-white rounded-2xl border border-[#E2E0D9] shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#E8F5EE] flex items-center justify-center">
              <Shield
                size={16}
                className="text-[#5B9279]"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-sm font-semibold text-[#1E293B]">
              Confidentialité
            </h2>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#64748B]">
              Ne pas sauvegarder l&apos;historique
            </span>
            <button
              onClick={handlePrivacyToggle}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                privacy ? "bg-[#3563E9]" : "bg-[#E2E0D9]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-transform ${
                  privacy ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="border-t border-[#EEEDEA] pt-3 mt-3">
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-sm text-[#C2413A] hover:text-[#C2413A]/80 transition-colors font-medium"
              >
                Effacer tout l&apos;historique
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#64748B]">
                  Es-tu sûr ? Cette action est irréversible.
                </span>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 bg-[#C2413A] text-white text-xs font-medium rounded-lg hover:bg-[#C2413A]/80 transition-colors"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 py-1.5 bg-[#F1F0EB] text-[#64748B] text-xs font-medium rounded-lg hover:bg-[#E2E0D9] transition-colors"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Guest Message */}
        <div className="text-center py-4">
          <p className="text-xs text-[#64748B]">
            Mode invité — les données restent sur cet appareil.
          </p>
        </div>
      </main>

      <BottomNav />
    </AppShell>
  );
}
