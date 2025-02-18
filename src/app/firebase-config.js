// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAwR7XSq88pwfWnD4yH7p2a0H2asDSZmo",
  authDomain: "manga-re.firebaseapp.com",
  projectId: "manga-re",
  storageBucket: "manga-re.firebasestorage.app",
  messagingSenderId: "222825771010",
  appId: "1:222825771010:web:811579dab6a51e8099771b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa autenticación y base de datos
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
