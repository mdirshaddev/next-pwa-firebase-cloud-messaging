const fs = require('fs');

fs.writeFileSync(
  './public/firebase-messaging-sw.js',
  `// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
  projectId: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
  messagingSenderId: '${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
  appId: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}'
};

firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  // Retrieve firebase messaging
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(payload => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon || payload.notification.image
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  self.addEventListener('notificationclick', event => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
}
`
);
