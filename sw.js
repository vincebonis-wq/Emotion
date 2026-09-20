// Service worker — stratégie réseau-d'abord (network-first) avec repli cache.
// Incrémenter CACHE_VERSION à chaque déploiement pour rafraîchir le cache.
const CACHE_VERSION = 'emotion-v9';
const CORE = [
  './',
  './index.html',
  './css/style.css',
  './js/firebase-config.js',
  './js/content.js',
  './js/app.js',
  './assets/ouroboros.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(CORE).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // On ne met jamais en cache Firebase / Google (temps réel + auth).
  if (/gstatic|googleapis|firebaseio|firebase/.test(url.hostname)) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && url.origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  );
});
