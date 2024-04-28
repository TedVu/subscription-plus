// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBcalO2Ij8vqCh1rpi09PIzwikHWT2_QF8",
  authDomain: "subscription-plus.firebaseapp.com",
  projectId: "subscription-plus",
  storageBucket: "subscription-plus.appspot.com",
  messagingSenderId: "953591136348",
  appId: "1:953591136348:web:8d5e5039904aaa63616699",
  measurementId: "G-FSTQ57T420",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
