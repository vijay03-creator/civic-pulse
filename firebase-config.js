<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAjbhvQkIUM7KSnUvsUGJTOBjjCoJS77dw",
    authDomain: "nagar-eye.firebaseapp.com",
    projectId: "nagar-eye",
    storageBucket: "nagar-eye.firebasestorage.app",
    messagingSenderId: "1068107267640",
    appId: "1:1068107267640:web:2e37cdeb43fcb6704430cd",
    measurementId: "G-QJ0NMEL9TP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
