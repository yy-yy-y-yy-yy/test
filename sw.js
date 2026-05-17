const CACHE_NAME = 'md-quiz-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './questions.md'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればそれを返し、なければネットワークから取得
        return response || fetch(event.request);
      })
  );
});