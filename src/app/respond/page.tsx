import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import { RespondClient } from "./RespondClient";

export const metadata = {
  title: "Répondre — Clair",
  description: "Trouve une formulation courte, douce ou directe selon ton contexte.",
};

function RespondSkeleton() {
  return (
    <>
      <div className="px-5 pt-6">
        <div className="h-7 w-3/5 animate-pulse rounded bg-[#E2E0D9]/60" />
        <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#E2E0D9]/40" />
      </div>
      <div className="px-5 pt-6">
        <div className="h-28 w-full animate-pulse rounded-2xl bg-[#E2E0D9]/40" />
      </div>
      <div className="px-5 pt-6">
        <div className="h-4 w-24 animate-pulse rounded bg-[#E2E0D9]/40" />
        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-9 w-24 animate-pulse rounded-full bg-[#E2E0D9]/40"
            />
          ))}
        </div>
      </div>
      <div className="px-5 pb-6 pt-6">
        <div className="h-14 w-full animate-pulse rounded-2xl bg-[#3563E9]/30" />
      </div>
    </>
  );
}

export default function RespondPage() {
  return (
    <AppShell>
      <Suspense fallback={<RespondSkeleton />}>
        <RespondClient />
      </Suspense>
    </AppShell>
  );
}
