import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import { ResultClient } from "./ResultClient";

export const metadata = {
  title: "Résultat — Clair",
  description: "Résultat de clarification avec hypothèses prudentes et réponses utiles.",
};

function ResultSkeleton() {
  return (
    <>
      <div className="px-5 pt-4">
        <div className="h-5 w-20 animate-pulse rounded bg-[#E2E0D9]/60" />
      </div>
      <div className="px-5 pt-3">
        <div className="h-6 w-3/4 animate-pulse rounded bg-[#E2E0D9]/60" />
      </div>
      {[1, 2, 3].map((item) => (
        <div key={item} className="px-5 pt-4">
          <div className="rounded-2xl border border-[#E2E0D9] bg-white p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#E2E0D9]/60" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-[#E2E0D9]/40" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[#E2E0D9]/40" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-[#E2E0D9]/40" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function ResultPage() {
  return (
    <AppShell>
      <Suspense fallback={<ResultSkeleton />}>
        <ResultClient />
      </Suspense>
    </AppShell>
  );
}
