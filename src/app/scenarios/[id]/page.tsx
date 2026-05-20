import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getScenarioById, SCENARIOS } from "@/data/scenarios";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SCENARIOS.map((scenario) => ({ id: scenario.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const scenario = getScenarioById(id);
  if (!scenario) return { title: "Scénario introuvable" };

  return {
    title: `${scenario.title} — Clair`,
    description: scenario.result.clearTranslation.slice(0, 160),
  };
}

export default async function ScenarioDetailPage({ params }: PageProps) {
  const { id } = await params;
  const scenario = getScenarioById(id);
  if (!scenario) notFound();

  const { result } = scenario;

  return (
    <main className="mx-auto min-h-screen max-w-[430px] px-4 pb-24">
      <Link
        href="/scenarios"
        className="mt-6 inline-flex items-center gap-1 text-sm text-[#3563E9]"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Tous les scénarios
      </Link>

      <header className="mt-4">
        <span className="inline-block rounded-full bg-[#F1F5F9] px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-[#64748B]">
          {scenario.category}
        </span>
        <h1 className="mt-2 text-xl font-bold text-[#1E293B]">
          {scenario.title}
        </h1>
      </header>

      <section className="mt-4 rounded-2xl border border-[#E2E0D9] bg-white p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          La situation
        </h2>
        <p className="mt-2 text-sm text-[#1E293B]">{scenario.inputText}</p>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E2E0D9] bg-white p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          Traduction claire
        </h2>
        <p className="mt-2 text-sm text-[#1E293B]">{result.clearTranslation}</p>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E2E0D9] bg-white p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          Sens littéral
        </h2>
        <p className="mt-2 text-sm text-[#475569]">{result.literalMeaning}</p>
        <h2 className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          Sens social possible
        </h2>
        <p className="mt-2 text-sm text-[#475569]">
          {result.possibleSocialMeaning}
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-[#5B9279]/30 bg-[#F0F7F1] p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#2E7D5A]">
          Ce qu&apos;on peut dire avec certitude
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#1E293B]">
          {result.certain.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E6A93C]/30 bg-[#FFF8E8] p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7C5F1F]">
          Ce qu&apos;on ne sait pas
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#1E293B]">
          {result.uncertain.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-[#7B5EA7]/30 bg-[#F5F0FB] p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#5A3F8F]">
          Hypothèses avec niveau de confiance
        </h2>
        <ul className="mt-2 space-y-2 text-sm text-[#1E293B]">
          {result.hypotheses.map((item) => (
            <li key={item.text}>
              <span className="font-medium capitalize">{item.confidence}</span>{" "}
              — {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-[#3563E9]/30 bg-[#EDF4FF] p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1E40AF]">
          Pour clarifier
        </h2>
        <p className="mt-2 text-sm text-[#1E293B]">
          {result.clarifyingQuestion}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="px-1 text-sm font-semibold uppercase tracking-wider text-[#64748B]">
          Suggestions de réponse
        </h2>
        <div className="mt-3 space-y-3">
          <ResponseCard label="Court" content={result.shortAnswer} />
          <ResponseCard label="Direct" content={result.directAnswer} />
          <ResponseCard label="Doux" content={result.softAnswer} />
          <ResponseCard label="Professionnel" content={result.professionalAnswer} />
          <ResponseCard
            label="Fermeté bienveillante"
            content={result.boundaryAnswer}
          />
        </div>
      </section>

      {result.voiceShortVersion ? (
        <section className="mt-4 rounded-2xl border border-[#94A3B8]/30 bg-[#F8FAFC] p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
            Version vocale très courte
          </h2>
          <p className="mt-2 text-sm italic text-[#1E293B]">
            « {result.voiceShortVersion} »
          </p>
        </section>
      ) : null}

      <p className="mt-8 text-center text-xs text-[#94A3B8]">
        Scénario{" "}
        {scenario.reviewedBy === "valide-comite"
          ? "validé par le comité"
          : scenario.reviewedBy === "relu-interne"
            ? "relu en interne"
            : "brouillon"}
        .
      </p>
    </main>
  );
}

function ResponseCard({ label, content }: { label: string; content: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E0D9] bg-white p-3">
      <div className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
        {label}
      </div>
      <p className="mt-1 text-sm text-[#1E293B]">{content}</p>
    </div>
  );
}
