"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallHint() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari
      ("standalone" in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone));

    if (standalone) {
      setInstalled(true);
      return;
    }

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || dismissed) return null;

  // Chromium install prompt available
  if (deferred) {
    return (
      <div className="mb-8 p-5 rounded-2xl border border-cream-200 bg-cream-100/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-display text-lg text-warm-brown">Install Cook with Bree</p>
          <p className="text-sm text-warm-muted mt-1">
            Add the cookbook app to your home screen for quick access.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={async () => {
              await deferred.prompt();
              await deferred.userChoice;
              setDeferred(null);
            }}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
          >
            Install
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="px-4 py-2.5 text-sm font-medium text-warm-muted hover:text-terracotta-600"
          >
            Not now
          </button>
        </div>
      </div>
    );
  }

  // iOS / unsupported browsers — show manual tip
  const isIos =
    typeof navigator !== "undefined" &&
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !/crios/i.test(navigator.userAgent);

  if (!isIos) return null;

  return (
    <div className="mb-8 p-5 rounded-2xl border border-cream-200 bg-cream-100/80">
      <p className="font-display text-lg text-warm-brown">Add to your iPhone</p>
      <p className="text-sm text-warm-muted mt-1 leading-relaxed">
        In Safari, tap the Share button, then <span className="font-medium text-warm-brown">Add to Home Screen</span>.
        Cook with Bree will open like an app.
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="mt-3 text-sm font-medium text-warm-muted hover:text-terracotta-600"
      >
        Dismiss
      </button>
    </div>
  );
}
