const CACHE_NAME = "certificate-cache";

const STATIC_FILES = [

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



/* =========================
   Install
========================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => cache.addAll(STATIC_FILES))

    );

    self.skipWaiting();

});



/* =========================
   Activate
========================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys

                .filter(key => key !== CACHE_NAME)

                .map(key => caches.delete(key))

            )

        )

    );

    self.clients.claim();

});



/* =========================
   Fetch
========================= */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);



    /* ---------- Google Apps Script ---------- */

    if (

        url.hostname.includes("script.google.com") ||

        url.hostname.includes("script.googleusercontent.com")

    ){

        return;

    }



    /* ---------- PDF ---------- */

    if (

        url.pathname.toLowerCase().endsWith(".pdf")

    ){

        return;

    }



    /* ---------- HTML ---------- */

    if (

        event.request.mode === "navigate"

    ){

        event.respondWith(networkFirst(event.request));

        return;

    }



    /* ---------- CSS / JS ---------- */

    if (

        url.pathname.endsWith(".css") ||

        url.pathname.endsWith(".js")

    ){

        event.respondWith(staleWhileRevalidate(event.request));

        return;

    }



    /* ---------- Manifest ---------- */

    if (

        url.pathname.endsWith(".json")

    ){

        event.respondWith(networkFirst(event.request));

        return;

    }



    /* ---------- Images ---------- */

    if (

        event.request.destination === "image"

    ){

        event.respondWith(cacheFirst(event.request));

        return;

    }



    /* ---------- Default ---------- */

    event.respondWith(cacheFirst(event.request));

});



/* =========================
   Strategies
========================= */



async function networkFirst(request){

    const cache = await caches.open(CACHE_NAME);

    try{

        const response = await fetch(request);

        cache.put(request,response.clone());

        return response;

    }catch{

        return await cache.match(request);

    }

}



async function cacheFirst(request){

    const cache = await caches.open(CACHE_NAME);

    const cached = await cache.match(request);

    if(cached){

        return cached;

    }

    const response = await fetch(request);

    cache.put(request,response.clone());

    return response;

}



async function staleWhileRevalidate(request){

    const cache = await caches.open(CACHE_NAME);

    const cached = await cache.match(request);

    const networkFetch = fetch(request)

        .then(response=>{

            cache.put(request,response.clone());

            return response;

        })

        .catch(()=>null);

    return cached || networkFetch;

}
