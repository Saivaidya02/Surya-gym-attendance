importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCqvx_WIP4Rgs4YvaAzLRc5WDZOMCmPWNI",
  authDomain: "surya-gym-attendance-267b8.firebaseapp.com",
  projectId: "surya-gym-attendance-267b8",
  storageBucket: "surya-gym-attendance-267b8.firebasestorage.app",
  messagingSenderId: "966870024989",
  appId: "1:966870024989:web:0ba8546b99aea0a756d7f4"
});

const messaging = firebase.messaging();

// Background message handler (when app is closed/minimized)
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  if (!title) return;
  self.registration.showNotification(title, {
    body: body || '',
    icon: '/logo.svg',
    badge: '/logo.svg',
    vibrate: [200, 100, 200],
    tag: payload.data?.tag || 'surya-gym',
    renotify: true,
    data: { url: '/' }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) { list[0].focus(); }
      else clients.openWindow('/');
    })
  );
});
