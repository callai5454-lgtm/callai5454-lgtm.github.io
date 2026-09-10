const CACHE='callai-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(/results|ingest|role|is_approved|assign|verification/.test(u.pathname))return;
 if(e.request.mode==='navigate'||u.pathname==='/'||u.pathname.endsWith('index.html')){
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
  return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
