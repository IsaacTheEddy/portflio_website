"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  faro,
  getWebInstrumentations,
  initializeFaro,
  ReactIntegration,
} from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

const DEFAULT_FARO_URL =
  "https://faro-collector-prod-us-east-3.grafana.net/collect/b5de26b3e022a42d2e86ff4f36f60f66";

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  let sid = sessionStorage.getItem("faro_local_sid");
  if (!sid) {
    sid = `sess_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem("faro_local_sid", sid);
  }
  return sid;
}

export default function FaroTelemetry() {
  const pathname = usePathname();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || initializedRef.current) return;
    initializedRef.current = true;

    const url = process.env.NEXT_PUBLIC_FARO_URL || DEFAULT_FARO_URL;

    if (!faro.config) {
      initializeFaro({
        url,
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
          new ReactIntegration(),
        ],
      });
    }

    const sessionId = getSessionId();
    const currentRoute = window.location.pathname || "/";

    // Capture Navigation & Paint Web Vitals and mirror to local Grafana dashboard API
    const sendVitals = () => {
      const navEntries = performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];
      const paintEntries = performance.getEntriesByType("paint");

      const nav = navEntries[0];
      const fcpEntry = paintEntries.find(
        (e) => e.name === "first-contentful-paint"
      );

      const ttfb = nav ? Math.max(1, Math.round(nav.responseStart - nav.requestStart)) : 18;
      const fcp = fcpEntry ? Math.round(fcpEntry.startTime) : 140;

      fetch("/api/grafana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "vitals",
          sessionId,
          route: currentRoute,
          metricName: "FCP & TTFB",
          metricValue: fcp,
          unit: "ms",
          metrics: { ttfb, fcp },
        }),
      }).catch(() => {});
    };

    if (document.readyState === "complete") {
      sendVitals();
    } else {
      window.addEventListener("load", sendVitals, { once: true });
    }

    // Observe Largest Contentful Paint (LCP) & Cumulative Layout Shift (CLS)
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const lcp = Math.round(lastEntry.startTime);
            fetch("/api/grafana", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "vitals",
                sessionId,
                route: window.location.pathname || "/",
                metricName: "LCP",
                metricValue: lcp,
                unit: "ms",
                metrics: { lcp },
              }),
            }).catch(() => {});
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}

      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries() as unknown as Array<{
            hadRecentInput: boolean;
            value: number;
          }>) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          fetch("/api/grafana", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "vitals",
              sessionId,
              route: window.location.pathname || "/",
              metricName: "CLS",
              metricValue: Number(clsValue.toFixed(4)),
              unit: "score",
              metrics: { cls: Number(clsValue.toFixed(4)) },
            }),
          }).catch(() => {});
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
      } catch {}
    }
  }, []);

  // Track Next.js App Router route changes in Grafana Faro & mirror to local API
  useEffect(() => {
    if (!pathname) return;

    if (faro.api) {
      faro.api.setView({ name: pathname });
      faro.api.pushEvent("page_view", { route: pathname });
    }

    fetch("/api/grafana", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "view",
        sessionId: getSessionId(),
        route: pathname,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
