import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import { ClarifyForm } from "./ClarifyForm";

export const metadata = {
  title: "Clarifier — Clair",
  description:
    "Clarifie une phrase qui semble floue, avec une analyse prudente et utilisable.",
};

function ClarifySkeleton() {
  return (
    <>
      <div className="px-5 pt-4">
        <div className="h-5 w-20 rounded bg-[#E2E0D9]/60 animate-pulse" />
      </div>
      <div className="px-5 pt-4">
        <div className="h-7 w-3/5 rounded bg-[#E2E0D9]/60 animate-pulse" />
        <div className="mt-2 h-4 w-4/5 rounded bg-[#E2E0D9]/40 animate-pulse" />
      </div>
      <div className="px-5 pt-4">
        <div className="h-32 w-full rounded-2xl bg-[#E2E0D9]/40 animate-pulse" />
      </div>
      <div className="mt-4 px-5">
        <div className="h-4 w-32 rounded bg-[#E2E0D9]/40 animate-pulse" />
        <div className="mt-2 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-7 w-24 rounded-full bg-[#E2E0D9]/40 animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="mt-4 px-5">
        <div className="h-24 w-full rounded-2xl bg-[#E2E0D9]/40 animate-pulse" />
      </div>
      <div className="px-5 pb-6 pt-6">
        <div className="h-14 w-full rounded-2xl bg-[#3563E9]/30 animate-pulse" />
      </div>
    </>
  );
}

export default function ClarifyPage() {
  return (
    <AppShell>
      <Suspense fallback={<ClarifySkeleton />}>
        <ClarifyForm />
      </Suspense>
    </AppShell>
  );
}
