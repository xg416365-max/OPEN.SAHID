const C="wahaj-v1",SHELL=["./","index.html","manifest.json","icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.hostname==="image.tmdb.org"||u.origin===location.origin){e.respondWith(caches.open(C).then(async c=>{const m=await c.match(r);const f=fetch(r).then(n=>{if(n.ok||n.type==="opaque")c.put(r,n.clone());return n}).catch(()=>m);return m||f}))}});
