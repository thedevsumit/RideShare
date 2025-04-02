
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAXetnr9QgPFw4EkO2rbz8XwOmZUHhQmXo",
  authDomain: "rideshare-a1c91.firebaseapp.com",
  projectId: "rideshare-a1c91",
  storageBucket: "rideshare-a1c91.firebasestorage.app",
  messagingSenderId: "602643627718",
  appId: "1:602643627718:web:34ccd8c9ea3ca168b261c7",
  measurementId: "G-NHQDT34PPV"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;

