# YouTube shortcut PWA — setup

Static files live in `public/pwa/shortcut/`. The install counter is backed by the
Worker in `src/index.js` and a Cloudflare KV namespace.

| File | Role |
|---|---|
| `index.html` | Install page. Waits for the user to tap **Install**; never auto-redirects. |
| `stats.html` | Dashboard reading the install counts. |
| `manifest.json` | PWA manifest — makes the app installable. |
| `sw.js` | Service worker. Required for Chrome's install prompt. |
| `icons/*.png` | 192/512 icons plus a full-bleed maskable variant. |
| `../../../src/index.js` | Worker serving `GET`/`POST /api/install`. |

## One-time Cloudflare setup

The counter needs somewhere to persist. A Worker cannot write back into the
GitHub repo, so counts live in KV.

**1. Create the KV namespace**

```sh
npx wrangler kv namespace create INSTALL_COUNTER
```

**2. Paste the returned id into `wrangler.jsonc`**

Replace `REPLACE_WITH_YOUR_KV_NAMESPACE_ID` with the `id` from step 1. Until you
do, `/api/install` returns a 500 with `"INSTALL_COUNTER KV namespace is not bound"`
and `stats.html` shows that message instead of numbers.

If you deploy through the Cloudflare dashboard's GitHub integration rather than
`wrangler deploy`, also confirm the binding under
**Workers & Pages → bonus → Settings → Bindings** — the dashboard binding must
use the same name, `INSTALL_COUNTER`.

**3. Deploy**

```sh
npm run deploy      # or push to GitHub if Workers Builds is connected
```

## How counting works

`index.html` reports an install only on genuine success — the `accepted` outcome
of the install prompt, or the `appinstalled` event. Both fire in some browsers, so
an in-page flag plus a `localStorage` key keep it to one count per device.

The browser sends `{"platform":"desktop"|"mobile"}`. The Worker does not trust
that value: anything unrecognised falls back to server-side `User-Agent`
sniffing.

## Local development

```sh
npx wrangler dev
```

Serves `public/` and the API together on `localhost:8787`, using local KV
storage — the placeholder namespace id is fine for local runs.

Note that `beforeinstallprompt` needs a secure context. `localhost` counts as
one, so the Install button works locally; over plain HTTP on a LAN IP it will
not fire and the page falls back to manual instructions.

## Known limitation

KV has no atomic increment, so the counter does a read-modify-write. Two installs
landing in the same instant can lose one count. At install-page volume this is
not worth engineering around; if you ever need exact counts, move the counter to
a Durable Object or D1 (`UPDATE … SET n = n + 1`).
