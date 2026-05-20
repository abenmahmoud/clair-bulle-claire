import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import { HistoryClient } from "./HistoryClient";

export const metadata = {
  title: "Historique — Clair",
  description: "Retrouve tes analyses locales ou synchronisées sur ton compte.",
};

function HistorySkeleton() {
  return (
    <div className="px-5 pt-6">
      <div className="h-7 w-36 animate-pulse rounded bg-[#E2E0D9]/60" />
      <div className="mt-2 h-4 w-64 animate-pulse rounded bg-[#E2E0D9]/40" />
      <div className="mt-6 h-10 w-64 animate-pulse rounded-full bg-[#E2E0D9]/40" />
      <div className="mt-5 space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 w-full animate-pulse rounded-2xl bg-[#E2E0D9]/40"
          />
        ))}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <AppShell>
      <Suspense fallback={<HistorySkeleton />}>
        <HistoryClient />
      </Suspense>
    </AppShell>
  );
}
