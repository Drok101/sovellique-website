"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    sovelliqueBind?: () => void;
  }
}

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => window.sovelliqueBind?.();
    const existing = document.querySelector<HTMLScriptElement>("script[data-sov-site]");
    if (existing) {
      run();
      return;
    }
    const script = document.createElement("script");
    script.src = "/assets/js/site.js?v=2";
    script.dataset.sovSite = "1";
    script.onload = () => run();
    document.body.appendChild(script);
  }, [pathname]);

  return null;
}
