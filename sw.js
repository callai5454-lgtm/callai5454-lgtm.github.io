const CACHE='callai-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(u.pathname.startsWith('/results')||u.pathname.startsWith('/ingest')||u.pathname.startsWith('/role')||u.pathname.startsWith('/is_approved')||u.pathname.startsWith('/assign')||u.pathname.includes('verification'))return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
