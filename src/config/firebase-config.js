// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "train-apps.firebaseapp.com",
  projectId: "train-apps",
  storageBucket: "train-apps.appspot.com",
  messagingSenderId: "125231059167",
  appId: "1:125231059167:web:1c895d18fafb2b5a0f596a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
