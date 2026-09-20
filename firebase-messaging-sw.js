/* Service worker dédié aux notifications push (Firebase Cloud Messaging).
   Reçoit les messages quand l'app est fermée / en arrière-plan. */
/* global importScripts, firebase */
try {
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
  importScripts('./js/firebase-config.js'); // définit self.FIREBASE_CONFIG / self.FIREBASE_READY

  if (self.FIREBASE_READY) {
    firebase.initializeApp(self.FIREBASE_CONFIG);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      const n = (payload && payload.notification) || {};
      self.registration.showNotification(n.title || 'Travail émotionnel', {
        body: n.body || 'Un instant pour toi ? 🌱',
        icon: './assets/icon-192.png',
        badge: './assets/icon-192.png',
        tag: 'emotion-reminder',
      });
    });
  }
} catch (e) {
  // Firebase non configuré : le SW reste inactif, sans casser l'app.
}

// Ouvrir l'app au clic sur la notification.
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow('./');
  }));
});
