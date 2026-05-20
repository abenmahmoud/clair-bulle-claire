import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    debug: false,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
    // Replay desactive par defaut pour eviter l'enregistrement de sessions utilisateur.
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
