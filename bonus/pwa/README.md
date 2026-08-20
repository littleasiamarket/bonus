# BONUS138 — PWA

PWA (Progressive Web App) untuk **BONUS138**: halaman pemasang bergaya Google
Play Store yang bisa ditambahkan ke layar utama. Saat dibuka dari ikonnya,
aplikasi berjalan *standalone* dan langsung mengarahkan ke situs BONUS138.

- **Tujuan folder:** membuat PWA untuk BONUS138 (lihat `config.json`).
- **Target buka (login):** `https://cutt.ly/7tz4uCGn`
- **Bahasa:** Indonesia

## Isi

| File | Fungsi |
|------|--------|
| `index.html` | Halaman installer (UI + logika tombol `Instal Cepat`). |
| `manifest.webmanifest` | Web App Manifest: nama, ikon, warna, `start_url`. |
| `sw.js` | Service worker: cache shell + fallback offline. |
| `icons/` | `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` (brand BONUS138). |
| `config.json` | Metadata & tujuan folder. |

## Cara pakai / deploy

Repo ini deploy ke Cloudflare Workers. Folder `bonus/` (termasuk `bonus/pwa`)
disajikan oleh worker **bonus** — lihat `DEPLOY.md` & `wrangler.jsonc` di root
repo. Setelah tayang, PWA ini berada di `/pwa/`.

Buka halaman di ponsel (Chrome/Android atau Safari/iOS) lalu ketuk
**Instal Cepat** → *Tambahkan ke Layar Utama*.

## Mengganti target / ikon

- **Target buka:** ubah `window.__INSTALL_TARGET_URL__` di `index.html` dan
  `target_url` di `config.json`.
- **Ikon:** ganti file di `icons/` (pertahankan nama & ukuran) atau perbarui
  daftar `icons` di `manifest.webmanifest` — halaman otomatis memakai ikon dari
  manifest untuk header dan screenshot.
