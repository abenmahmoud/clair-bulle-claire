import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, FileText, Heart, Home, School, Users } from "lucide-react";
import { SCENARIOS } from "@/data/scenarios";
import type { ScenarioCategory } from "@/types/scenarios";

export const metadata: Metadata = {
  title: "Scénarios — Clair",
  description:
    "Bibliothèque de scénarios sociaux courants avec analyses prudentes et plusieurs pistes de réponse.",
};

const CATEGORY_META: Record<
  ScenarioCategory,
  { label: string; icon: ComponentType<{ size?: number }>; color: string }
> = {
  travail: { label: "Travail", icon: Briefcase, color: "#3563E9" },
  famille: { label: "Famille", icon: Home, color: "#5B9279" },
  couple: { label: "Couple", icon: Heart, color: "#C44569" },
  amitie: { label: "Amitié", icon: Users, color: "#E6A93C" },
  ecole: { label: "École", icon: School, color: "#7B5EA7" },
  administration: { label: "Administration", icon: FileText, color: "#5C7894" },
};

export default function ScenariosPage() {
  const byCategory = (Object.keys(CATEGORY_META) as ScenarioCategory[]).map(
    (category) => ({
      category,
      meta: CATEGORY_META[category],
      items: SCENARIOS.filter((scenario) => scenario.category === category),
    })
  );

  return (
    <main className="mx-auto min-h-screen max-w-[430px] px-4 pb-24">
      <header className="pb-4 pt-6">
        <h1 className="text-2xl font-bold text-[#1E293B]">Scénarios</h1>
        <p className="mt-1 text-sm text-[#475569]">
          Des exemples concrets de situations sociales, avec des pistes pour
          comprendre et répondre, sans jugement absolu.
        </p>
        <p className="mt-2 text-xs text-[#94A3B8]">
          Ces scénarios sont des brouillons. Ils seront affinés par un comité
          éthique avant validation définitive.
        </p>
      </header>

      {byCategory.map(({ category, meta, items }) =>
        items.length > 0 ? (
          <section key={category} className="mt-6">
            <div className="mb-3 flex items-center gap-2 px-1">
              <meta.icon size={16} aria-hidden="true" />
              <h2
                className="text-sm font-semibold uppercase tracking-wider text-[#64748B]"
                style={{ color: meta.color }}
              >
                {meta.label} ({items.length})
              </h2>
            </div>
            <div className="space-y-3">
              {items.map((scenario) => (
                <Link
                  key={scenario.id}
                  href={`/scenarios/${scenario.id}`}
                  className="block rounded-2xl border border-[#E2E0D9] bg-white p-4 transition active:scale-[0.98]"
                >
                  <h3 className="font-semibold text-[#1E293B]">
                    {scenario.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-[#475569]">
                    {scenario.inputText}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null
      )}
    </main>
  );
}
