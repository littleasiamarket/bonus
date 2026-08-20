/**
 * Worker entry point for the `bonus` assets project.
 *
 * Everything in ./public is served by the static-asset pipeline before this
 * script runs. This Worker only exists to back the PWA install counter:
 *
 *   GET  /api/install  -> current counts as JSON
 *   POST /api/install  -> increment one bucket ("desktop" or "mobile")
 *
 * Any other request is handed straight back to the asset pipeline, so adding
 * this script does not change how the existing files are served.
 *
 * Requires a KV namespace bound as INSTALL_COUNTER (see wrangler.jsonc).
 */

const ROUTE = "/api/install";
const KEY = "installs";
const MOBILE_UA = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle|Opera Mini|IEMobile|Windows Phone/i;

function blankCounts() {
  return { desktop: 0, mobile: 0, total: 0, first_at: null, last_at: null };
}

/** Coerce whatever is in KV into a known-good shape. */
function normaliseCounts(raw) {
  const data = raw && typeof raw === "object" ? raw : {};
  const out = blankCounts();

  for (const bucket of ["desktop", "mobile"]) {
    const n = Number(data[bucket]);
    if (Number.isFinite(n) && n > 0) out[bucket] = Math.floor(n);
  }
  out.total = out.desktop + out.mobile;

  for (const stamp of ["first_at", "last_at"]) {
    if (typeof data[stamp] === "string" && data[stamp]) out[stamp] = data[stamp];
  }
  return out;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

function missingBinding() {
  return json(
    { error: "INSTALL_COUNTER KV namespace is not bound", ...blankCounts() },
    500
  );
}

async function readCounts(env) {
  return normaliseCounts(await env.INSTALL_COUNTER.get(KEY, "json"));
}

async function recordInstall(request, env) {
  // The page tells us which bucket to credit. sendBeacon delivers the JSON as
  // a blob body, which request.json() still parses.
  let platform = "";
  try {
    const body = await request.json();
    if (body && typeof body.platform === "string") platform = body.platform;
  } catch {
    // No body or malformed JSON -- fall through to sniffing the User-Agent.
  }

  // Never trust an unrecognised value from the client.
  if (platform !== "desktop" && platform !== "mobile") {
    platform = MOBILE_UA.test(request.headers.get("user-agent") || "")
      ? "mobile"
      : "desktop";
  }

  const counts = await readCounts(env);
  const now = new Date().toISOString();

  counts[platform] += 1;
  counts.total = counts.desktop + counts.mobile;
  counts.last_at = now;
  if (!counts.first_at) counts.first_at = now;

  await env.INSTALL_COUNTER.put(KEY, JSON.stringify(counts));
  return counts;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === ROUTE) {
      if (!env.INSTALL_COUNTER) return missingBinding();

      if (request.method === "GET" || request.method === "HEAD") {
        return json(await readCounts(env));
      }
      if (request.method === "POST") {
        return json(await recordInstall(request, env));
      }
      return json({ error: "method not allowed" }, 405);
    }

    // Not the API route: let the static-asset pipeline answer as it always has.
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404 });
  },
};
