import { NextRequest, NextResponse } from "next/server";

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: "view" | "vital" | "log" | "Click" | "trace" | "exception";
  name: string;
  value?: number;
  unit?: string;
  route: string;
  details?: string;
}

interface TelemetryStore {
  pageViews: number;
  sessions: Set<string>;
  routes: Record<string, number>;
  vitals: {
    ttfb: number[];
    fcp: number[];
    lcp: number[];
    cls: number[];
  };
  events: TelemetryEvent[];
  timeseries: { time: string; views: number; latencyMs: number }[];
  errors: number;
}

const FARO_COLLECTOR_URL =
  process.env.NEXT_PUBLIC_FARO_URL ||
  "https://faro-collector-prod-us-east-3.grafana.net/collect/b5de26b3e022a42d2e86ff4f36f60f66";

const globalForTelemetry = globalThis as unknown as {
  __faroStore?: TelemetryStore;
};

if (!globalForTelemetry.__faroStore) {
  globalForTelemetry.__faroStore = {
    pageViews: 0,
    sessions: new Set<string>(),
    routes: { "/": 0, "/portfolio": 0, "/blog": 0 },
    vitals: {
      ttfb: [],
      fcp: [],
      lcp: [],
      cls: [],
    },
    events: [],
    timeseries: [],
    errors: 0,
  };
}

const store = globalForTelemetry.__faroStore;

function avg(arr: number[]): number | null {
  if (!arr.length) return null;
  const sum = arr.reduce((a, b) => a + b, 0);
  return Number((sum / arr.length).toFixed(2));
}

function parseLogfmt(line: string): Record<string, string> {
  const result: Record<string, string> = {};
  const regex = /(\w+)=(?:"([^"]*)"|([^\s]*))/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    result[match[1]] = match[2] !== undefined ? match[2] : match[3];
  }
  return result;
}

async function fetchCumulativeGrafanaCloudStats() {
  const token = process.env.GRAFANA_SERVICE_TOKEN;
  const grafanaUrl =
    process.env.GRAFANA_INSTANCE_URL ||
    "https://luckyeucalyptus2647.grafana.net";

  if (!token) return null;

  try {
    const endNs = BigInt(Date.now()) * BigInt(1_000_000);
    const startNs =
      BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000);

    const query = encodeURIComponent('{service_name="portfolio-website"}');
    const url = `${grafanaUrl}/api/datasources/proxy/uid/grafanacloud-logs/loki/api/v1/query_range?query=${query}&start=${startNs.toString()}&end=${endNs.toString()}&limit=1000&direction=BACKWARD`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    const streams: Array<{
      stream: Record<string, string>;
      values: [string, string][];
    }> = json?.data?.result || [];

    let cloudPageViews = 0;
    const cloudSessions = new Set<string>();
    const cloudRoutes: Record<string, number> = {
      "/": 0,
      "/portfolio": 0,
      "/blog": 0,
    };
    const cloudVitals = {
      ttfb: [] as number[],
      fcp: [] as number[],
      lcp: [] as number[],
      cls: [] as number[],
    };
    let cloudErrors = 0;
    const cloudEvents: TelemetryEvent[] = [];

    for (const stream of streams) {
      const kind = stream.stream?.kind || "event";

      for (const [tsNs, line] of stream.values) {
        const kv = parseLogfmt(line);
        const sessionId = kv.session_id || kv.sessionId;
        if (sessionId) cloudSessions.add(sessionId);

        const tsMs = Number(BigInt(tsNs) / BigInt(1_000_000));
        const timeStr = new Date(tsMs).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        let route =
          kv.view_name ||
          kv.event_data_route ||
          kv.event_data_toView ||
          "/";
        if (kv.page_url) {
          try {
            route = new URL(kv.page_url).pathname || "/";
          } catch {
            // keep default route
          }
        }

        if (kind === "event") {
          const eventName = kv.event_name || "event";
          if (
            eventName === "view_changed" ||
            eventName === "page_view" ||
            eventName === "session_start"
          ) {
            cloudPageViews += 1;
            cloudRoutes[route] = (cloudRoutes[route] || 0) + 1;
          }

          if (cloudEvents.length < 25) {
            cloudEvents.push({
              id: `cloud-${tsNs}`,
              timestamp: timeStr,
              type: "view",
              name: eventName,
              route,
              details: `Synced from Grafana Cloud (${kv.browser_name || "Browser"})`,
            });
          }
        } else if (kind === "measurement") {
          const ttfb = parseFloat(kv.ttfb);
          const fcp = parseFloat(kv.fcp);
          const lcp = parseFloat(kv.lcp);
          const cls = parseFloat(kv.cls);

          if (!isNaN(ttfb) && ttfb > 0) cloudVitals.ttfb.push(ttfb);
          if (!isNaN(fcp) && fcp > 0) cloudVitals.fcp.push(fcp);
          if (!isNaN(lcp) && lcp > 0) cloudVitals.lcp.push(lcp);
          if (!isNaN(cls) && cls >= 0) cloudVitals.cls.push(cls);

          if (cloudEvents.length < 25) {
            const metricLabel = !isNaN(lcp)
              ? `LCP=${Math.round(lcp)}ms`
              : !isNaN(fcp)
              ? `FCP=${Math.round(fcp)}ms`
              : !isNaN(ttfb)
              ? `TTFB=${Math.round(ttfb)}ms`
              : !isNaN(cls)
              ? `CLS=${cls}`
              : "web_vital";

            cloudEvents.push({
              id: `cloud-${tsNs}`,
              timestamp: timeStr,
              type: "vital",
              name: metricLabel,
              route,
              details: "Stored in Grafana Cloud Loki",
            });
          }
        } else if (kind === "exception") {
          cloudErrors += 1;
          if (cloudEvents.length < 25) {
            cloudEvents.push({
              id: `cloud-${tsNs}`,
              timestamp: timeStr,
              type: "exception",
              name: kv.type || "Error",
              route,
              details: kv.value || "Captured exception",
            });
          }
        }
      }
    }

    return {
      pageViews: cloudPageViews,
      sessionsCount: cloudSessions.size,
      routes: cloudRoutes,
      vitals: cloudVitals,
      errors: cloudErrors,
      events: cloudEvents,
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);
    const nowLabel = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // 1. Handle standard Grafana Faro SDK TransportBody payload & forward to Grafana Cloud
    if (body.meta) {
      const sessionId =
        req.headers.get("x-faro-session-id") ||
        body.meta?.session?.id ||
        "faro-session";
      store.sessions.add(sessionId);

      let currentRoute = body.meta?.view?.name || "/";
      if (body.meta?.page?.url) {
        try {
          currentRoute = new URL(body.meta.page.url).pathname || "/";
        } catch {
          // keep view name
        }
      }

      if (Array.isArray(body.events)) {
        for (const ev of body.events) {
          const evRoute =
            ev.attributes?.route || ev.attributes?.toView || currentRoute;
          if (ev.name === "page_view" || ev.name === "view_changed") {
            store.pageViews += 1;
            store.routes[evRoute] = (store.routes[evRoute] || 0) + 1;
          }
          store.events.unshift({
            id: `${Date.now()}-${Math.random()}`,
            timestamp: nowLabel,
            type: "view",
            name: ev.name || "event",
            route: evRoute,
            details: "Forwarded to Grafana Cloud (us-east-3)",
          });
        }
      }

      if (Array.isArray(body.measurements)) {
        for (const m of body.measurements) {
          const vals = m.values || {};
          if (typeof vals.ttfb === "number" && vals.ttfb > 0)
            store.vitals.ttfb.push(Math.round(vals.ttfb));
          if (typeof vals.fcp === "number" && vals.fcp > 0)
            store.vitals.fcp.push(Math.round(vals.fcp));
          if (typeof vals.lcp === "number" && vals.lcp > 0)
            store.vitals.lcp.push(Math.round(vals.lcp));
          if (typeof vals.cls === "number" && vals.cls >= 0)
            store.vitals.cls.push(Number(vals.cls.toFixed(4)));

          const metricKey = Object.keys(vals).find((k) => k !== "delta") || "vital";
          store.events.unshift({
            id: `${Date.now()}-${Math.random()}`,
            timestamp: nowLabel,
            type: "vital",
            name: metricKey.toUpperCase(),
            value:
              typeof vals[metricKey] === "number"
                ? Number(vals[metricKey].toFixed(2))
                : undefined,
            unit: metricKey === "cls" ? "" : "ms",
            route: currentRoute,
            details: "Web Vital sent to Grafana Cloud",
          });
        }
      }

      if (Array.isArray(body.exceptions)) {
        store.errors += body.exceptions.length;
      }

      if (store.events.length > 25) {
        store.events = store.events.slice(0, 25);
      }

      // Forward the exact Faro payload server-to-server to Grafana Cloud collector
      const forwardHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": req.headers.get("user-agent") || "Mozilla/5.0",
      };
      if (sessionId) forwardHeaders["x-faro-session-id"] = sessionId;

      await fetch(FARO_COLLECTOR_URL, {
        method: "POST",
        headers: forwardHeaders,
        body: rawBody,
      }).catch(() => {});

      return new NextResponse(null, { status: 202 });
    }

    return new NextResponse(null, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  const cloud = await fetchCumulativeGrafanaCloudStats();

  const mergedRoutes: Record<string, number> = { ...store.routes };
  if (cloud) {
    for (const [route, count] of Object.entries(cloud.routes)) {
      mergedRoutes[route] = Math.max(mergedRoutes[route] || 0, count);
    }
  }

  const ttfbList = [...(cloud?.vitals.ttfb || []), ...store.vitals.ttfb];
  const fcpList = [...(cloud?.vitals.fcp || []), ...store.vitals.fcp];
  const lcpList = [...(cloud?.vitals.lcp || []), ...store.vitals.lcp];
  const clsList = [...(cloud?.vitals.cls || []), ...store.vitals.cls];

  const combinedEvents =
    cloud && cloud.events.length > 0
      ? [...store.events.slice(0, 5), ...cloud.events].slice(0, 25)
      : store.events;

  return NextResponse.json({
    connectedInstance: "luckyeucalyptus2647.grafana.net",
    faroAppId: "1312",
    faroRegion: "prod-us-east-3",
    cloudApiConnected: Boolean(cloud),
    stats: {
      pageViews: Math.max((cloud?.pageViews || 0) + store.pageViews, 1),
      activeSessions: Math.max(
        (cloud?.sessionsCount || 0) + store.sessions.size,
        1
      ),
      errors: (cloud?.errors || 0) + store.errors,
      routes: mergedRoutes,
      vitals: {
        ttfb: avg(ttfbList),
        fcp: avg(fcpList),
        lcp: avg(lcpList),
        cls: avg(clsList),
      },
      timeseries: store.timeseries,
      events: combinedEvents,
    },
  });
}
