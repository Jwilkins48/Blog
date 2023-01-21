import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3LkcVvK_mg9Y94932pQzJitA0o5mvmlo",
  authDomain: "my-blog-3f23e.firebaseapp.com",
  projectId: "my-blog-3f23e",
  storageBucket: "my-blog-3f23e.appspot.com",
  messagingSenderId: "939412681641",
  appId: "1:939412681641:web:1e2527136a8792e9054ab8",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
