"use client";

import { useEffect } from "react";

/**
 * Înregistrează service worker-ul (PWA) în producție.
 * În dezvoltare este dezactivat pentru a evita cache-ul de stare veche.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Înregistrarea service worker-ului a eșuat:", error);
      });
    }
  }, []);

  return null;
}
