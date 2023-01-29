import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_vPg98h8xjfgRe85WOrzD9-1_VS6j2KQ",
  authDomain: "trail-system-99544.firebaseapp.com",
  projectId: "trail-system-99544",
  storageBucket: "trail-system-99544.appspot.com",
  messagingSenderId: "922425853289",
  appId: "1:922425853289:web:2b47d9a0b8371d1843e9f8",
  measurementId: "G-3CNSC3F4R4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
