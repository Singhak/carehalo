// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
// Be sure to replace the config values below with your app's config
// IMPORTANT: Do not use environment variables here, as this file is not processed by the Angular CLI.
firebase.initializeApp({
  apiKey: 'AIzaSyCLDTt0Aw6x8QBpvAIOR9FE-5C5EwC668Q',
  authDomain: 'medihunt-3a421.firebaseapp.com',
  projectId: 'medihunt-3a421',
  storageBucket: 'medihunt-3a421.firebasestorage.app',
  messagingSenderId: '1020036677128',
  appId: '1:1020036677128:web:656e6c46025fb9a22bdbbd',
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
