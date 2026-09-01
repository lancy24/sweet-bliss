import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwW6umggFgqmYGfI8MPQp4IS7wJkIsSEQ",
  authDomain: "blissful-bites-2405.firebaseapp.com",
  projectId: "blissful-bites-2405",
  storageBucket: "blissful-bites-2405.firebasestorage.app",
  messagingSenderId: "709693117155",
  appId: "1:709693117155:web:d307edada4dc45aa33ebd6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();