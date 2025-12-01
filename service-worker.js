const CACHE_NAME = 'motion-alert-cache-v1';
const urlsToCache = [
  'index.html',
  'settings.html',
  'verify.html',
  'style.css',
  'manifest.json',
  'app.js',
  'assets/icon-192x192.png',
  'assets/icon-512x512.png',
  'assets/alert.mp3',
  'assets/alert2.mp3',
  'assets/alert3.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
