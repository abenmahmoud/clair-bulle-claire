"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
      return (
        <main className="mx-auto max-w-[430px] px-4 pt-12 text-center">
          <h1 className="text-xl font-bold">Sentry non configuré</h1>
          <p className="mt-2 text-sm text-[#475569]">
            La variable NEXT_PUBLIC_SENTRY_DSN n&apos;est pas définie.
          </p>
        </main>
      );
    }
  }

  return (
    <main className="mx-auto max-w-[430px] px-4 pt-12 text-center">
      <h1 className="text-xl font-bold">Test Sentry</h1>
      <p className="mt-2 text-sm text-[#475569]">
        Page de validation : déclenche manuellement une erreur côté client pour
        vérifier que Sentry la capture bien.
      </p>
      <button
        type="button"
        onClick={() => {
          Sentry.captureMessage("Test Sentry depuis /sentry-test (manuel)");
          throw new Error("Erreur de test depuis /sentry-test");
        }}
        className="mt-6 rounded-2xl bg-[#3563E9] px-6 py-3 text-sm font-medium text-white"
      >
        Déclencher une erreur de test
      </button>
    </main>
  );
}
