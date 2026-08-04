const CACHE_NAME = "certificate-v1";

const STATIC_ASSETS = [

    "/",
    "/index.html",

    "/manifest.json",

    "/css/style.css",
    "/css/mobile.css",
    "/css/dark.css",

    "/js/api.js",
    "/js/download.js",
    "/js/search.js",
    "/js/ui.js",
    "/js/app.js",

    "/images/bg.jpg",

    "/icons/favicon.ico",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/icons/apple-touch-icon.png"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(STATIC_ASSETS))

    );

    self.skipWaiting();

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            )

        )

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    const url = new URL(event.request.url);

    // 不快取 Google Apps Script API
    if (url.hostname.includes("script.google.com")) {

        return;

    }

    // 不快取 PDF
    if (url.pathname.toLowerCase().endsWith(".pdf")) {

        return;

    }

    event.respondWith(

        caches.match(event.request)

        .then(cacheResponse => {

            return cacheResponse || fetch(event.request);

        })

    );

});
