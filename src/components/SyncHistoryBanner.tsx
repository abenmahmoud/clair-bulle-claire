"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Upload, X } from "lucide-react";
import {
  clearLocalAnalyses,
  getLocalAnalyses,
  syncLocalToCloud,
} from "@/lib/sync-history";

const DISMISSED_KEY = "clair_sync_banner_dismissed";

export function SyncHistoryBanner() {
  const [localCount, setLocalCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "syncing" | "done">("idle");
  const [imported, setImported] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const isDismissed = window.localStorage.getItem(DISMISSED_KEY) === "1";
      if (isDismissed) {
        setDismissed(true);
        return;
      }
      setLocalCount(getLocalAnalyses().length);
    });
  }, []);

  const handleSync = async () => {
    setStatus("syncing");
    const result = await syncLocalToCloud();
    setImported(result.imported);
    setStatus("done");
    window.localStorage.setItem(DISMISSED_KEY, "1");
  };

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
  };

  const handleClearLocal = () => {
    clearLocalAnalyses();
    setLocalCount(0);
  };

  if (dismissed || localCount === 0) return null;

  if (status === "done") {
    return (
      <div className="mx-5 mt-4 rounded-2xl border border-[#5B9279]/30 bg-[#E5F5E5] p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 flex-shrink-0 text-[#2E7D5A]"
            size={20}
            aria-hidden="true"
          />
          <div className="flex-1">
            <p className="font-medium text-[#1E293B]">
              {imported} analyse{imported > 1 ? "s" : ""} importée
              {imported > 1 ? "s" : ""} sur ton compte.
            </p>
            <button
              type="button"
              onClick={handleClearLocal}
              className="mt-2 text-xs text-[#475569] underline"
            >
              Effacer aussi les anciennes données locales
            </button>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Fermer"
            className="text-[#475569]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-5 mt-4 rounded-2xl border border-[#3563E9]/20 bg-[#EFF3FE] p-4">
      <div className="flex items-start gap-3">
        <Upload
          className="mt-0.5 flex-shrink-0 text-[#3563E9]"
          size={20}
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className="font-medium text-[#1E293B]">
            Tu as {localCount} analyse{localCount > 1 ? "s" : ""} sur cet
            appareil.
          </p>
          <p className="mt-1 text-sm text-[#475569]">
            Tu veux les retrouver sur tous tes appareils ?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleSync}
              disabled={status === "syncing"}
              className="flex items-center gap-1.5 rounded-full bg-[#3563E9] px-4 py-2 text-sm font-medium text-white active:opacity-80 disabled:opacity-50"
            >
              {status === "syncing" ? (
                <>
                  <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                  <span>Import…</span>
                </>
              ) : (
                <span>Importer sur mon compte</span>
              )}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-sm text-[#475569] underline"
            >
              Plus tard
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Fermer"
          className="text-[#475569]"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
