
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from  'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAVJ2eev-voBdUA56DvfGHZIjjjxTigcCk",
  authDomain: "doc-app-5f444.firebaseapp.com",
  projectId: "doc-app-5f444",
  storageBucket: "doc-app-5f444.firebasestorage.app",
  messagingSenderId: "439082955197",
  appId: "1:439082955197:web:f25d5d0e0ca08c925ce2d4",
  measurementId: "G-NSWYE5VZ3S"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)