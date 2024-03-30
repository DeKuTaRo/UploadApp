import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDASa5lEk7YJ_naHCw2lRbht6_xWDm4HJk",
  authDomain: "personalweb-2e106.firebaseapp.com",
  projectId: "personalweb-2e106",
  storageBucket: "personalweb-2e106.appspot.com",
  messagingSenderId: "964415389455",
  appId: "1:964415389455:web:c7e47cb0948bfef71b087a",
  measurementId: "G-Y2CVRS8Y2F",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;
