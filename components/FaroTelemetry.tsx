"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  faro,
  getWebInstrumentations,
  initializeFaro,
} from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export default function FaroTelemetry() {
  const pathname = usePathname();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || initializedRef.current) return;
    initializedRef.current = true;

    if (!faro.config) {
      initializeFaro({
        // Route through same-origin Next.js API to eliminate browser CORS & ad-blocker failures
        url: "/api/grafana",
        app: {
          name: "portfolio-website",
          version: "1.0.0",
          environment: "production",
        },
        sessionTracking: {
          persistent: true,
        },
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation(),
        ],
      });
    }
  }, []);

  useEffect(() => {
    if (!pathname || !faro.config) return;
    faro.api.setView({ name: pathname });
    faro.api.pushEvent("page_view", { route: pathname });
  }, [pathname]);

  return null;
}
