const CACHE='learning-hub-2026-08-8';
const ASSETS=['./','index.html','video-player.html','curriculum.js','report.js','google-drive-config.js','google-drive-sync.js','jspdf.umd.min.js','jspdf-LICENSE.txt','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys()
  .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  .then(()=>self.clients.claim())
  .then(()=>self.clients.matchAll({type:'window'}))
  .then(clients=>Promise.all(clients.map(client=>client.navigate(client.url).catch(()=>null))))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==self.location.origin) return;
  if(e.request.destination==='video'||url.pathname.endsWith('.mp4')) {
    e.respondWith(fetch(e.request));
    return;
  }
  const refreshFirst=e.request.mode==='navigate'||['/index.html','/video-player.html','/curriculum.js','/report.js','/google-drive-config.js','/google-drive-sync.js','/sw.js'].some(path=>url.pathname.endsWith(path));
  if(refreshFirst){
    e.respondWith(fetch(e.request).then(r=>{
      if(r.ok){const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy));} return r;
    }).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>{
    const fresh=fetch(e.request).then(r=>{
      if(r.ok){const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy));}
      return r;
    }).catch(()=>cached);
    return cached||fresh;
  }));
});
