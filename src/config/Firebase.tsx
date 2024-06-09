import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsOqwu1cyyipvFZWwaTX9tb675wXwqpv8",
  authDomain: "photo-app-e1dde.firebaseapp.com",
  projectId: "photo-app-e1dde",
  storageBucket: "photo-app-e1dde.appspot.com",
  messagingSenderId: "285011965082",
  appId: "1:285011965082:web:28b5d604d89a6c3a0b1b23"
  
};

export const app = initializeApp(firebaseConfig);  

export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
