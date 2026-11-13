// Loaded into the generated service worker (see workbox.importScripts in
// vite.config.ts). Shows the reminders sent by .github/workflows/reminders.yml.
self.addEventListener('push', (event) => {
  const { title, body, tag } = event.data ? event.data.json() : { title: "Sayyida's Lift Club" };
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      silent: true,
      icon: 'icons/icon-192.png',
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((windows) => {
      const open = windows.find((w) => 'focus' in w);
      return open ? open.focus() : self.clients.openWindow(self.registration.scope);
    }),
  );
});
