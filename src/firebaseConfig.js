
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCkP045vMH0H8uT-trhZjaZjC8LVU04teI",
  authDomain: "rideshare-5658c.firebaseapp.com",
  projectId: "rideshare-5658c",
  storageBucket: "rideshare-5658c.firebasestorage.app",
  messagingSenderId: "519024819718",
  appId: "1:519024819718:web:fafdec5820f1ce0615cd87",
  measurementId: "G-JCX647326G"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;

