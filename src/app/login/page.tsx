import { Suspense } from "react";
import AppShell from "@/components/layout/AppShell";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Se connecter — Clair",
  description:
    "Connecte-toi à Clair par email pour retrouver tes analyses sur tous tes appareils.",
};

function LoginSkeleton() {
  return (
    <div className="px-5 pt-6">
      <div className="h-7 w-2/3 animate-pulse rounded bg-[#E2E0D9]/60" />
      <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-[#E2E0D9]/40" />
      <div className="mt-6 h-12 w-full animate-pulse rounded-2xl bg-[#E2E0D9]/40" />
      <div className="mt-3 h-14 w-full animate-pulse rounded-2xl bg-[#3563E9]/30" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AppShell>
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
    </AppShell>
  );
}
