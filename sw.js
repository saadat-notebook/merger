// Define a cache name
const CACHE_NAME = 'image-merger-v1';

// List the files to be cached
const urlsToCache = [
  '/',
  'merger.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png'
];

// Install event: caches the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves cached files if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});