const CACHE_NAME = "certificate-downloader-v1";

self.addEventListener("install", (event) => {

    console.log("Service Worker 安裝完成");

    self.skipWaiting();

});

self.addEventListener("activate", (event) => {

    console.log("Service Worker 啟用");

    event.waitUntil(clients.claim());

});
