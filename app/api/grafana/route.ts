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
    inp: number[];
  };
  events: TelemetryEvent[];
  timeseries: { time: string; views: number; latencyMs: number }[];
  errors: number;
}

// Persist across hot-reloads in dev
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
      inp: [],
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

async function fetchGrafanaCloudMetrics() {
  const token = process.env.GRAFANA_SERVICE_TOKEN;
  const grafanaUrl =
    process.env.GRAFANA_INSTANCE_URL ||
    "https://luckyeucalyptus2647.grafana.net";

  if (!token) return null;

  try {
    const dsRes = await fetch(`${grafanaUrl}/api/datasources`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    if (!dsRes.ok) return null;
    const datasources: Array<{ uid: string; type: string; name: string }> =
      await dsRes.json();
    const lokiDs = datasources.find((d) => d.type === "loki");
    if (!lokiDs) return null;

    const nowMs = Date.now();
    const fromMs = nowMs - 6 * 60 * 60 * 1000; // last 6 hours

    const queryRes = await fetch(`${grafanaUrl}/api/ds/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queries: [
          {
            refId: "A",
            datasource: { type: "loki", uid: lokiDs.uid },
            expr: 'count_over_time({app="portfolio-website"}[6h])',
            queryType: "instant",
          },
        ],
        from: String(fromMs),
        to: String(nowMs),
      }),
      next: { revalidate: 30 },
    });

    if (!queryRes.ok) return null;
    return await queryRes.json();
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = body.sessionId || "local-session";
    const route = body.route || "/";
    const nowLabel = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    store.sessions.add(sessionId);

    if (body.type === "view") {
      store.pageViews += 1;
      store.routes[route] = (store.routes[route] || 0) + 1;
      store.events.unshift({
        id: `${Date.now()}-${Math.random()}`,
        timestamp: nowLabel,
        type: "view",
        name: "page_view",
        route,
        details: `Navigated to ${route}`,
      });
    }

    if (body.type === "vitals" && body.metrics) {
      const m = body.metrics;
      if (typeof m.ttfb === "number" && m.ttfb > 0) {
        store.vitals.ttfb.push(m.ttfb);
        store.timeseries.push({
          time: nowLabel,
          views: store.pageViews,
          latencyMs: Math.round(m.ttfb),
        });
        if (store.timeseries.length > 20) store.timeseries.shift();
      }
      if (typeof m.fcp === "number" && m.fcp > 0) store.vitals.fcp.push(m.fcp);
      if (typeof m.lcp === "number" && m.lcp > 0) store.vitals.lcp.push(m.lcp);
      if (typeof m.cls === "number" && m.cls >= 0) store.vitals.cls.push(m.cls);
      if (typeof m.inp === "number" && m.inp > 0) store.vitals.inp.push(m.inp);

      store.events.unshift({
        id: `${Date.now()}-${Math.random()}`,
        timestamp: nowLabel,
        type: "vital",
        name: body.metricName || "web_vitals",
        value: body.metricValue,
        unit: body.unit || "ms",
        route,
        details: `Forwarded to Grafana Faro (appId: 1312)`,
      });
    }

    if (body.type === "faro_batch") {
      store.events.unshift({
        id: `${Date.now()}-${Math.random()}`,
        timestamp: nowLabel,
        type: "trace",
        name: body.name || "faro_telemetry",
        route,
        details: body.details || "Sent to faro-collector-prod-us-east-3",
      });
    }

    if (body.type === "exception") {
      store.errors += 1;
      store.events.unshift({
        id: `${Date.now()}-${Math.random()}`,
        timestamp: nowLabel,
        type: "exception",
        name: "runtime_error",
        route,
        details: body.details || "Captured exception",
      });
    }

    if (store.events.length > 25) {
      store.events = store.events.slice(0, 25);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  const cloudData = await fetchGrafanaCloudMetrics();

  return NextResponse.json({
    connectedInstance: "luckyeucalyptus2647.grafana.net",
    faroAppId: "1312",
    faroRegion: "prod-us-east-3",
    cloudApiConnected: Boolean(cloudData),
    stats: {
      pageViews: Math.max(store.pageViews, 1),
      activeSessions: Math.max(store.sessions.size, 1),
      errors: store.errors,
      routes: store.routes,
      vitals: {
        ttfb: avg(store.vitals.ttfb),
        fcp: avg(store.vitals.fcp),
        lcp: avg(store.vitals.lcp),
        cls: avg(store.vitals.cls),
      },
      timeseries: store.timeseries,
      events: store.events,
    },
  });
}

