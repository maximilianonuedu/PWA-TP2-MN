const VERSION = 'version3';

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

if (workbox){
    console.log('Carga exitosa de Workbox');

    self.addEventListener("message", (event)=>{
        if(event.data && event.data.type === "SKIP_WAITING"){
            self.skipWaiting();
        }
    });

    workbox.routing.registerRoute(
        new RegExp('/*'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: VERSION
        })
    )
} else {
    console.log('Ya sacaste la cerveza del freezer?');
}