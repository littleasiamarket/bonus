# Deploy

This repo lives on **GitHub** and is deployed to **Cloudflare Workers**. One
repo produces **three Workers**, each serving a different folder as static
assets. The mapping is defined with wrangler *environments* in
[`wrangler.jsonc`](./wrangler.jsonc).

| Worker   | Serves      | Deploy command                  | npm script            |
|----------|-------------|---------------------------------|-----------------------|
| `public` | `./public`  | `wrangler deploy --env public`  | `npm run deploy:public` |
| `bonus`  | `./bonus`   | `wrangler deploy --env bonus`   | `npm run deploy:bonus`  |
| `halo`   | `./halo`    | `wrangler deploy --env halo`    | `npm run deploy:halo`   |

`npm run deploy:all` deploys all three in sequence.

> The `bonus` worker's content lives under `/pwa/` (the BONUS138 PWA). Its root
> `/` redirects there via `bonus/index.html`.

---

## Setup: connect each Worker to this GitHub repo

Cloudflare **Workers Builds** ties one Worker to one build config, so create a
Worker per site and point each at the same repo with a different deploy command.

For **each** of `public`, `bonus`, `halo`:

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** →
   **Import a repository** (connect GitHub → pick this repo). *(First time only:
   authorize the Cloudflare GitHub app for the repo.)*
2. In the build settings:
   - **Deploy command:** `npx wrangler deploy --env public`
     (use `--env bonus` / `--env halo` for the other two)
   - **Build command:** leave default (`npm ci` runs automatically).
   - **Root directory:** repo root (`/`).
3. Save & deploy. Every push to `main` then redeploys that Worker.

> The Worker's **name** comes from `wrangler.jsonc` (`public` / `bonus` /
> `halo`), so the deploy command's `--env` decides which Worker a build updates —
> not the dashboard Worker name. Keep them matched.

### Alternative: deploy from your machine (CLI)

```bash
npm ci
npx wrangler login          # once
npm run deploy:all          # or deploy:public / deploy:bonus / deploy:halo
```

---

## Attach a custom domain to a Worker

Domains are managed in the dashboard, not in `wrangler.jsonc`:

1. **Workers & Pages** → select the Worker (`public` / `bonus` / `halo`).
2. **Settings** → **Domains & Routes** → **Add** → **Custom Domain**.
3. Enter the hostname (the zone must already exist in this Cloudflare account).
   Cloudflare provisions the certificate and routing automatically.

Repeat per Worker with whichever hostname each should answer on.

---

## Optional: enable the install counter

The Worker (`src/index.js`) exposes `GET/POST /api/install`. It needs a KV
namespace bound as `INSTALL_COUNTER`; until then that route returns a graceful
500 and everything else is unaffected.

```bash
npx wrangler kv namespace create INSTALL_COUNTER
```

Then add the printed id to `wrangler.jsonc` — either top-level or inside the
env(s) that need it:

```jsonc
"kv_namespaces": [
  { "binding": "INSTALL_COUNTER", "id": "PASTE_REAL_NAMESPACE_ID_HERE" }
]
```
