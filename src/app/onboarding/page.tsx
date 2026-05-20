import { Suspense } from "react";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./OnboardingForm";

export const metadata = {
  title: "Bienvenue — Clair",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role) redirect("/history");

  return (
    <AppShell>
      <Suspense fallback={<div className="px-5 pt-6 text-[#475569]">Chargement…</div>}>
        <OnboardingForm />
      </Suspense>
    </AppShell>
  );
}
