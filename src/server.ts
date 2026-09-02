import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const maintenancePage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio update</title>
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #070b14;
        color: #f5f7ff;
        font-family: Inter, "Segoe UI", sans-serif;
      }
      main {
        width: min(92vw, 760px);
        padding: 3rem 2rem;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 24px;
        background: rgba(15, 23, 42, 0.75);
        box-shadow: 0 40px 80px rgba(15, 23, 42, 0.4);
      }
      p { margin: 0; letter-spacing: 0.22em; text-transform: uppercase; font-size: 0.7rem; opacity: 0.8; }
      h1 {
        margin: 1rem 0 0;
        font-size: clamp(2.3rem, 6vw, 4.9rem);
        line-height: 0.95;
        letter-spacing: -0.07em;
      }
      span {
        display: block;
        margin-top: 0.8rem;
        font-size: clamp(1.1rem, 2.5vw, 1.7rem);
        letter-spacing: -0.04em;
        opacity: 0.8;
      }
    </style>
  </head>
  <body>
    <main role="status" aria-live="polite">
      <p>Portfolio update</p>
      <h1>
        Currently refining the experience ✦
        <span>New portfolio updates are on the way.</span>
      </h1>
    </main>
  </body>
</html>`;

function isLocalHostname(hostname: string | null | undefined): boolean {
  if (!hostname) return false;
  const normalized = hostname.toLowerCase().replace(/:\d+$/, "");
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized === "[::1]" ||
    normalized.endsWith(".localhost")
  );
}

function getMaintenanceFlag(env: unknown): boolean {
  const record = (env ?? {}) as Record<string, unknown>;
  const runtimeValue =
    typeof process !== "undefined" && process.env && typeof process.env.VITE_MAINTENANCE_MODE === "string"
      ? process.env.VITE_MAINTENANCE_MODE
      : record.VITE_MAINTENANCE_MODE;

  return String(runtimeValue ?? import.meta.env.VITE_MAINTENANCE_MODE ?? "false")
    .trim()
    .toLowerCase() === "true";
}

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const isMaintenanceMode = getMaintenanceFlag(env);
      const hostname = new URL(request.url).hostname;

      if (isMaintenanceMode && !isLocalHostname(hostname)) {
        return new Response(maintenancePage, {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
