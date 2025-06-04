// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEVt1mZoQ3vdjff8hnhyT9ud56uJOSWyI",
  authDomain: "sahibinden-81237.firebaseapp.com",
  projectId: "sahibinden-81237",
  storageBucket: "sahibinden-81237.firebasestorage.app",
  messagingSenderId: "358177909473",
  appId: "1:358177909473:web:093fe3f40ccb2da047a5a0",
  measurementId: "G-EGFWPL3KLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export default app;