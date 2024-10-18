// const CACHE_NAME = "pwa-cache-v2";
// const urlsToCache = [
//   "/", // Home page
//   "/index.html", // Main HTML
//   "/src/main.jsx", // Your app's entry point
//   "/src/components/resources/favicon-16x16.png", // Favicon
//   "/logo192.png", // Icons for the app
//   "/logo256.png",
//   "/logo384.png",
//   "/logo512.png",
//   "/styles/main.css", // Your CSS file
//   "/manifest.json", // Manifest
//   // Add all other essential resources like JS, images, fonts
// ];

// // Utility function to generate cache name based on user ID or session token
// function getUserCacheName(userId) {
//   return `pwa-cache-${userId}`;
// }

// // Listen to messages sent from the main thread to update user session details
// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SET_USER") {
//     self.userId = event.data.userId;
//   }
// });

// // Install event - Cache all the files listed above
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(getUserCacheName(self.userId || "default")).then((cache) => {
//       console.log("Opened cache for user:", self.userId || "default");
//       return cache.addAll(urlsToCache); // Cache all necessary resources
//     })
//   );
// });

// // Fetch event - Serve files from cache, fallback to network if needed
// self.addEventListener("fetch", (event) => {
//   const userCacheName = getUserCacheName(self.userId || "default");
//   event.respondWith(
//     caches.match(event.request, { cacheName: userCacheName }).then((cachedResponse) => {
//       if (cachedResponse) {
//         return cachedResponse;  // Return cached response if available
//       }

//       // If resource is not cached, fetch it from the network
//       return fetch(event.request)
//         .then((networkResponse) => {
//           return caches.open(userCacheName).then((cache) => {
//             cache.put(event.request, networkResponse.clone());  // Cache the newly fetched resource
//             return networkResponse;
//           });
//         })
//         .catch(() => {
//           // Only show offline page if the resource can't be loaded and is not in cache
//           if (event.request.mode === 'navigate') {
//             return caches.match("/offline.html");
//           }
//         });
//     })
//   );
// });

// // Activate event - Clear old caches
// self.addEventListener("activate", (event) => {
//   const cacheWhiteList = [`pwa-cache-${self.userId || "default"}`];
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhiteList.includes(cacheName)) {
//             return caches.delete(cacheName);  // Delete old caches
//           }
//         })
//       )
//     )
//   );
// });
