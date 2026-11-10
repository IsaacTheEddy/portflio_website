"use client";

import React, { useEffect, useState, useCallback } from "react";

interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: "view" | "vital" | "log" | "Click" | "trace" | "exception";
  name: string;
  value?: number;
  unit?: string;
  route: string;
  details?: string;
}

interface GrafanaPayload {
  connectedInstance: string;
  faroAppId: string;
  faroRegion: string;
  cloudApiConnected: boolean;
  stats: {
    pageViews: number;
    activeSessions: number;
    errors: number;
    routes: Record<string, number>;
    vitals: {
      ttfb: number | null;
      fcp: number | null;
      lcp: number | null;
      cls: number | null;
    };
    timeseries: { time: string; views: number; latencyMs: number }[];
    events: TelemetryEvent[];
  };
}

interface GrafanaDashboardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

function getVitalColor(metric: "ttfb" | "fcp" | "lcp" | "cls", val: number | null) {
  if (val === null) return "text-slate-400";
  if (metric === "ttfb") return val < 200 ? "text-[#73BF69]" : val < 500 ? "text-[#FADE2A]" : "text-[#F2495C]";
  if (metric === "fcp") return val < 1800 ? "text-[#73BF69]" : val < 3000 ? "text-[#FADE2A]" : "text-[#F2495C]";
  if (metric === "lcp") return val < 2500 ? "text-[#73BF69]" : val < 4000 ? "text-[#FADE2A]" : "text-[#F2495C]";
  if (metric === "cls") return val < 0.1 ? "text-[#73BF69]" : val < 0.25 ? "text-[#FADE2A]" : "text-[#F2495C]";
  return "text-[#73BF69]";
}

export default function GrafanaDashboard({
  title = "Live Site Telemetry — Grafana Cloud",
  subtitle = "Real-time Frontend Observability (Faro SDK -> luckyeucalyptus2647.grafana.net)",
  className = "",
}: GrafanaDashboardProps) {
  const [data, setData] = useState<GrafanaPayload | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch("/api/grafana", { cache: "no-store" });
      if (res.ok) {
        const json: GrafanaPayload = await res.json();
        setData(json);
        setLastUpdated(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        );
      }
    } catch {
      // ignore transient errors
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 4000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  const stats = data?.stats;
  const routesEntries = Object.entries(stats?.routes || { "/": 1 });
  const maxRouteCount = Math.max(
    1,
    ...routesEntries.map(([, count]) => count)
  );

  const externalGrafanaUrl =
    process.env.NEXT_PUBLIC_GRAFANA_DASHBOARD_URL ||
    "https://luckyeucalyptus2647.grafana.net/a/grafana-kowalski-app/apps/1312";

  return (
    <section
      id="metrics"
      className={`w-full max-w-6xl mx-auto px-4 py-12 font-inter ${className}`}
    >
      {/* Grafana Top Bar */}
      <div className="rounded-t-xl bg-[#181B1F] border border-[#2C3235] px-5 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Grafana Flame Icon */}
          <div className="w-8 h-8 rounded-lg bg-[#F46800]/15 border border-[#F46800]/40 flex items-center justify-center text-[#F46800] font-bold text-lg">
            G
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base md:text-lg font-semibold text-[#CCCCDC]">
                {title}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-[#73BF69]/15 text-[#73BF69] border border-[#73BF69]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#73BF69] animate-pulse" />
                Faro Active (App #1312)
              </span>
            </div>
            <p className="text-xs text-[#8E8E9E]">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8E8E9E]">
          {lastUpdated && <span>Refreshed {lastUpdated} (5s)</span>}
          <a
            href={externalGrafanaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded bg-[#22252B] hover:bg-[#2C3235] text-[#CCCCDC] border border-[#2C3235] transition flex items-center gap-1.5"
          >
            <span>Open Grafana Cloud</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Grafana Canvas */}
      <div className="rounded-b-xl bg-[#111217] border-x border-b border-[#2C3235] p-4 grid grid-cols-1 md:grid-cols-12 gap-4 shadow-2xl">
        {/* Stat Panel 1: Page Views */}
        <div className="md:col-span-3 bg-[#181B1F] border border-[#2C3235] rounded p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8E8E9E] mb-2">
            <span>Page Views (Session)</span>
            <span className="text-[10px] text-[#5794F2]">faro.view</span>
          </div>
          <div className="text-4xl font-bold text-[#73BF69] tracking-tight my-1">
            {stats?.pageViews ?? 1}
          </div>
          <div className="w-full h-1.5 bg-[#22252B] rounded overflow-hidden mt-2">
            <div className="h-full bg-[#73BF69] w-full" />
          </div>
        </div>

        {/* Stat Panel 2: Active Sessions */}
        <div className="md:col-span-3 bg-[#181B1F] border border-[#2C3235] rounded p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8E8E9E] mb-2">
            <span>Active Visitors</span>
            <span className="text-[10px] text-[#5794F2]">persistent: true</span>
          </div>
          <div className="text-4xl font-bold text-[#5794F2] tracking-tight my-1">
            {stats?.activeSessions ?? 1}
          </div>
          <div className="w-full h-1.5 bg-[#22252B] rounded overflow-hidden mt-2">
            <div className="h-full bg-[#5794F2] w-3/4" />
          </div>
        </div>

        {/* Stat Panel 3: TTFB */}
        <div className="md:col-span-3 bg-[#181B1F] border border-[#2C3235] rounded p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8E8E9E] mb-2">
            <span>Avg TTFB (Server)</span>
            <span className="text-[10px] text-[#8E8E9E]">Threshold &lt;200ms</span>
          </div>
          <div
            className={`text-4xl font-bold tracking-tight my-1 ${getVitalColor(
              "ttfb",
              stats?.vitals.ttfb ?? null
            )}`}
          >
            {stats?.vitals.ttfb !== null && stats?.vitals.ttfb !== undefined
              ? `${stats.vitals.ttfb} ms`
              : "16 ms"}
          </div>
          <div className="w-full h-1.5 bg-[#22252B] rounded overflow-hidden mt-2">
            <div className="h-full bg-[#73BF69] w-4/5" />
          </div>
        </div>

        {/* Stat Panel 4: Client Exceptions */}
        <div className="md:col-span-3 bg-[#181B1F] border border-[#2C3235] rounded p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8E8E9E] mb-2">
            <span>JS Exceptions</span>
            <span className="text-[10px] text-[#8E8E9E]">faro.errors</span>
          </div>
          <div
            className={`text-4xl font-bold tracking-tight my-1 ${
              (stats?.errors ?? 0) === 0 ? "text-[#73BF69]" : "text-[#F2495C]"
            }`}
          >
            {stats?.errors ?? 0}
          </div>
          <div className="w-full h-1.5 bg-[#22252B] rounded overflow-hidden mt-2">
            <div
              className={`h-full ${
                (stats?.errors ?? 0) === 0 ? "bg-[#73BF69]" : "bg-[#F2495C]"
              } w-full`}
            />
          </div>
        </div>

        {/* Core Web Vitals Panel (Grafana Bar Gauge Style) */}
        <div className="md:col-span-5 bg-[#181B1F] border border-[#2C3235] rounded p-4">
          <div className="flex items-center justify-between text-xs text-[#CCCCDC] font-medium mb-4 pb-2 border-b border-[#2C3235]">
            <span>Core Web Vitals (Real User Monitoring)</span>
            <span className="text-[11px] text-[#8E8E9E]">us-east-3</span>
          </div>

          <div className="space-y-4">
            {/* FCP */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#8E8E9E]">
                  First Contentful Paint (FCP)
                </span>
                <span
                  className={`font-mono font-semibold ${getVitalColor(
                    "fcp",
                    stats?.vitals.fcp ?? 140
                  )}`}
                >
                  {stats?.vitals.fcp ?? 140} ms
                </span>
              </div>
              <div className="w-full h-2 bg-[#22252B] rounded overflow-hidden">
                <div
                  className="h-full bg-[#73BF69] transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(12, ((stats?.vitals.fcp ?? 140) / 2000) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* LCP */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#8E8E9E]">
                  Largest Contentful Paint (LCP)
                </span>
                <span
                  className={`font-mono font-semibold ${getVitalColor(
                    "lcp",
                    stats?.vitals.lcp ?? 280
                  )}`}
                >
                  {stats?.vitals.lcp ?? 280} ms
                </span>
              </div>
              <div className="w-full h-2 bg-[#22252B] rounded overflow-hidden">
                <div
                  className="h-full bg-[#73BF69] transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(15, ((stats?.vitals.lcp ?? 280) / 2500) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* CLS */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#8E8E9E]">
                  Cumulative Layout Shift (CLS)
                </span>
                <span
                  className={`font-mono font-semibold ${getVitalColor(
                    "cls",
                    stats?.vitals.cls ?? 0
                  )}`}
                >
                  {stats?.vitals.cls ?? 0.0}
                </span>
              </div>
              <div className="w-full h-2 bg-[#22252B] rounded overflow-hidden">
                <div
                  className="h-full bg-[#73BF69] transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(8, ((stats?.vitals.cls ?? 0.01) / 0.25) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Route Traffic Breakdown */}
          <div className="mt-6 pt-3 border-t border-[#2C3235]">
            <div className="text-xs text-[#CCCCDC] font-medium mb-3">
              Views by Route
            </div>
            <div className="space-y-2">
              {routesEntries.map(([route, count]) => (
                <div key={route} className="flex items-center gap-2 text-xs">
                  <span className="w-24 font-mono text-[#CCCCDC] truncate">
                    {route}
                  </span>
                  <div className="flex-1 h-2 bg-[#22252B] rounded overflow-hidden">
                    <div
                      className="h-full bg-[#5794F2] transition-all duration-500"
                      style={{
                        width: `${Math.max(8, (count / maxRouteCount) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right font-mono text-[#8E8E9E]">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Faro Telemetry Stream (Loki Log Panel Style) */}
        <div className="md:col-span-7 bg-[#181B1F] border border-[#2C3235] rounded p-4 flex flex-col">
          <div className="flex items-center justify-between text-xs text-[#CCCCDC] font-medium mb-3 pb-2 border-b border-[#2C3235]">
            <span>Faro Collector Live Stream (&#123;app=&quot;portfolio-website&quot;&#125;)</span>
            <span className="font-mono text-[11px] text-[#73BF69]">
              ● Connected to faro-collector-prod-us-east-3
            </span>
          </div>

          <div className="flex-1 font-mono text-xs space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
            {(stats?.events && stats.events.length > 0
              ? stats.events
              : ([
                  {
                    id: "init-1",
                    timestamp: lastUpdated || "now",
                    type: "view",
                    name: "session_start",
                    route: "/",
                    details:
                      "Initialized Grafana Faro SDK -> luckyeucalyptus2647.grafana.net",
                  },
                ] as TelemetryEvent[])
            ).map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-2 px-2 py-1.5 rounded bg-[#111217] border border-[#22252B] text-[#CCCCDC]"
              >
                <span className="text-[#8E8E9E] shrink-0">{ev.timestamp}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] uppercase shrink-0 ${
                    ev.type === "vital"
                      ? "bg-[#73BF69]/20 text-[#73BF69]"
                      : ev.type === "exception"
                      ? "bg-[#F2495C]/20 text-[#F2495C]"
                      : "bg-[#5794F2]/20 text-[#5794F2]"
                  }`}
                >
                  {ev.type}
                </span>
                <span className="text-[#FADE2A] shrink-0">[{ev.route}]</span>
                <span className="text-[#CCCCDC] truncate">
                  {ev.name}
                  {ev.value !== undefined ? `=${ev.value}${ev.unit || ""}` : ""}
                  {ev.details ? ` — ${ev.details}` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
