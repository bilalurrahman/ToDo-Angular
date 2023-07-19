importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');


firebase.initializeApp({ 
    apiKey: "AIzaSyAFtKapM8Y4_vVKyrE4kjjUMr0v9_bvbEE",
    authDomain: "todo-app-d2be8-45998.firebaseapp.com",
    projectId: "todo-app-d2be8",
    storageBucket: "todo-app-d2be8.appspot.com",
    messagingSenderId: "755944101959",
    appId: "1:755944101959:web:e700023ef20a42450ab962",
    measurementId: "G-PZ3CML0FN4"
});const messaging = firebase.messaging();