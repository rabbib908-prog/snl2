self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||'SNL Chats',{
    body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',
    tag:d.chat_id||'snl',renotify:true,data:{chat:d.chat_id}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();const id=e.notification.data&&e.notification.data.chat;
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    const c=cs[0];if(c){c.postMessage({open:id});return c.focus()}
    return clients.openWindow('./?chat='+id);
  }));
});
