// Service Worker for Meta Curtis V3
const CACHE_NAME = 'metacurtis-v3-cache-v1';

// Resources to cache immediately
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/src/style.css',
  '/src/main.jsx',
  '/fonts/custom-font.woff2',
  '/fonts/custom-font-bold.woff2',
];

// Resources to cache on first use
const RUNTIME_RESOURCES = [
  '/assets/',
];

// Install event - precache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Precache critical resources
        return cache.addAll(PRECACHE_RESOURCES);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        // Control all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache if available, otherwise fetch and cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    // Images strategy: cache-first with network fallback
    if (event.request.destination === 'image') {
      event.respondWith(
        caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return fetch(event.request)
              .then(response => {
                // Cache valid responses
                if (response && response.status === 200 && response.type === 'basic') {
                  const responseToCache = response.clone();
                  caches.open(CACHE_NAME)
                    .then(cache => {
                      cache.put(event.request, responseToCache);
                    });
                }
                return response;
              });
          })
      );
      return;
    }
    
    // CSS/JS strategy: stale-while-revalidate
    if (event.request.destination === 'script' || event.request.destination === 'style') {
      event.respondWith(
        caches.open(CACHE_NAME)
          .then(cache => {
            return cache.match(event.request)
              .then(cachedResponse => {
                const fetchPromise = fetch(event.request)
                  .then(networkResponse => {
                    // Update cache with fresh response
                    if (networkResponse && networkResponse.status === 200) {
                      cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                  });
                return cachedResponse || fetchPromise;
              });
          })
      );
      return;
    }
    
    // HTML strategy: network-first with cache fallback
    if (event.request.destination === 'document') {
      event.respondWith(
        fetch(event.request)
          .then(response => {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            return caches.match(event.request)
              .then(cachedResponse => {
                return cachedResponse || caches.match('/index.html');
              });
          })
      );
      return;
    }
  }
  
  // Default strategy: network with cache fallback
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Handle offline analytics
self.addEventListener('sync', event => {
  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

// Background sync for analytics
async function syncAnalytics() {
  try {
    const analyticsQueue = await getAnalyticsQueue();
    if (analyticsQueue.length > 0) {
      // Send analytics data
      await fetch('/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analyticsQueue)
      });
      // Clear queue after successful sync
      await clearAnalyticsQueue();
    }
  } catch (error) {
    console.error('Failed to sync analytics:', error);
  }
}

// Get analytics from IndexedDB
async function getAnalyticsQueue() {
  // Simple implementation with localStorage
  const queue = localStorage.getItem('analytics-queue');
  return queue ? JSON.parse(queue) : [];
}

// Clear analytics queue
async function clearAnalyticsQueue() {
  localStorage.removeItem('analytics-queue');
}
