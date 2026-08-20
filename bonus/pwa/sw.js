const CACHE_NAME = "bonus138-shortcut-v1";
const FALLBACK_PAGE = "./index.html";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
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
  if (new URL(request.url).origin !== self.location.origin) return;

  // Page loads: network first so edits go live, but fall back to the cached
  // shell so launching the installed app never lands on a browser error page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(request)
          .then((cached) => cached || caches.match(FALLBACK_PAGE))
          .then((cached) => cached || caches.match("./"))
      )
    );
    return;
  }

  // Icons, manifest, etc: cache first.
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
