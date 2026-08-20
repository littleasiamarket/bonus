const CACHE_NAME = "yt-shortcut-v4";
// Cloudflare's asset handling 307-redirects "index.html" to the directory URL,
// so cache the directory form only -- never store a redirect as the shell page.
const FALLBACK_PAGE = "./";
const SHELL_FILES = [
  "./",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Cache each file on its own: one missing file must not fail the whole
      // install (cache.addAll() rejects the entire batch on a single 404).
      Promise.allSettled(SHELL_FILES.map((file) => cache.add(file)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never serve counter data from cache -- the stats page must read live values.
  if (url.pathname === "/api/install") return;

  // Page loads: network first so edits go live, but fall back to the cached
  // shell so launching the installed app never lands on a browser error page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(request).then((cached) => cached || caches.match(FALLBACK_PAGE))
      )
    );
    return;
  }

  // Icons, manifest, etc: cache first.
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
