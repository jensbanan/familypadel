/* Service worker for Familien Vestergaard Padel Championship.
   Strategi: stale-while-revalidate – appen åbner øjeblikkeligt fra cachen
   (også uden net i hallen) og opdaterer sig selv i baggrunden. */

const VERSION = 'fvpc-v1';
const ASSETS = [
  './',
  './index.html',
  './assets/app.css',
  './assets/app.js',
  './assets/fonts.css',
  './fonts/FamiljenGrotesk.woff2',
  './fonts/Karla.woff2',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(request, { ignoreSearch: true });

      const network = fetch(request)
        .then(response => {
          if (response && response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => null);

      if (cached) return cached;

      const fresh = await network;
      if (fresh) return fresh;

      // Offline og aldrig set før: send i det mindste appen selv.
      if (request.mode === 'navigate') {
        const shell = await cache.match('./index.html');
        if (shell) return shell;
      }
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    })
  );
});
