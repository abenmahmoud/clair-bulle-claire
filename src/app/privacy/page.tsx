"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Shield, Eye, Lock, Trash2, Bell, Server } from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const sections = [
  {
    icon: Eye,
    title: "Ce que nous voyons",
    content:
      "Clair fonctionne entièrement dans votre navigateur. Nous ne collectons aucune donnée personnelle. Les analyses que vous effectuez restent stockées localement sur votre appareil, sauf si vous activez le mode 'Ne pas sauvegarder'.",
    color: "#3563E9",
    bgColor: "#EFF3FE",
  },
  {
    icon: Lock,
    title: "Stockage local",
    content:
      "Votre historique est stocké dans le localStorage de votre navigateur. Ces données ne quittent jamais votre appareil et ne sont jamais transmises à nos serveurs. Clair est une application statique sans backend.",
    color: "#5B9279",
    bgColor: "#E8F5EE",
  },
  {
    icon: Trash2,
    title: "Suppression des données",
    content:
      "Vous pouvez à tout moment effacer votre historique depuis la page Historique. La suppression est immédiate et irréversible. Vous pouvez également activer le mode 'Ne pas sauvegarder' pour empêcher toute sauvegarde future.",
    color: "#C2413A",
    bgColor: "#FDF0EF",
  },
  {
    icon: Bell,
    title: "Notifications",
    content:
      "Clair n'envoie aucune notification push et ne demande aucune permission de notification. Nous ne vous enverrons jamais de message marketing.",
    color: "#E07A5F",
    bgColor: "#FDF1EE",
  },
  {
    icon: Server,
    title: "Hébergement et cookies",
    content:
      "L'application est hébergée sur des serveurs sécurisés. Nous n'utilisons aucun cookie de traçage. Seuls les cookies techniques nécessaires au fonctionnement de l'application peuvent être utilisés.",
    color: "#9B8EC4",
    bgColor: "#F3F1F9",
  },
  {
    icon: Shield,
    title: "Protection des enfants",
    content:
      "Le mode Bulle Claire est conçu pour aider les enfants à exprimer leurs émotions. Aucune donnée saisie dans ce mode n'est sauvegardée. Nous encourageons toujours les enfants à parler à un adulte de confiance.",
    color: "#D4A017",
    bgColor: "#FDF8E8",
  },
];

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <AppShell>
      <main className="px-5 pt-6 pb-8">
        {/* Back */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors mb-4"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
          Retour
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1E293B] mb-1">
            Confidentialité
          </h1>
          <p className="text-sm text-[#64748B]">
            Comment nous protégeons vos données.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#E8F5EE] border border-[#5B9279]/20 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Shield size={20} className="text-[#5B9279]" strokeWidth={1.5} />
            </div>
            <h2 className="text-base font-semibold text-[#5B9279]">
              Vos données vous appartiennent
            </h2>
          </div>
          <p className="text-sm text-[#5B9279]/80 leading-relaxed">
            Clair est conçu pour respecter votre vie privée. Aucune donnée
            n&apos;est envoyée sur nos serveurs. Tout reste sur votre appareil.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E2E0D9] p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: section.bgColor }}
                  >
                    <div style={{ color: section.color }}>
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-[#1E293B]">
                    {section.title}
                  </h3>
                </div>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Last Update */}
        <div className="text-center mt-8 pb-4">
          <p className="text-xs text-[#64748B]">
            Dernière mise à jour : mai 2026
          </p>
        </div>
      </main>
    </AppShell>
  );
}
