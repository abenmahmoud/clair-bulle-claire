import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import { ParametresClient } from "./ParametresClient";

export const metadata = {
  title: "Paramètres — Clair",
};

export default function ParametresPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="px-5 pt-6 text-[#475569]">Chargement…</div>}>
        <ParametresClient />
      </Suspense>
    </AppShell>
  );
}
