import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjbhvQkIUM7KSnUvsUGJTOBjjCoJS77dw",
  authDomain: "nagar-eye.firebaseapp.com",
  projectId: "nagar-eye",
  storageBucket: "nagar-eye.firebasestorage.app",
  messagingSenderId: "1068107267640",
  appId: "1:1068107267640:web:2e37cdeb43fcb6704430cd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
