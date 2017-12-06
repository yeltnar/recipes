var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/staticFiles/bread.png',
  '/staticFiles/home.svg',
  '/staticFiles/icon.png',
  '/staticFiles/icon2.png',
  '/staticFiles/icon3.png',
  '/staticFiles/main.js',
  '/staticFiles/recipes.css',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
