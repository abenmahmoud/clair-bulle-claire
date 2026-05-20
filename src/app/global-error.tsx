"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1E293B" }}>
          Quelque chose s&apos;est mal passé
        </h1>
        <p
          style={{
            marginTop: "1rem",
            color: "#475569",
            maxWidth: "32rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Une erreur inattendue est survenue. L&apos;équipe a été notifiée. Tu peux
          essayer de recharger la page.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "1.5rem",
            display: "inline-block",
            background: "#3563E9",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            textDecoration: "none",
          }}
        >
          Retour à l&apos;accueil
        </Link>
      </body>
    </html>
  );
}
