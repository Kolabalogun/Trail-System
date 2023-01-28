import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnwgO_ELxdoANOr5J-gtuRVcL_WxvUrnw",
  authDomain: "electronic-data-system.firebaseapp.com",
  projectId: "electronic-data-system",
  storageBucket: "electronic-data-system.appspot.com",
  messagingSenderId: "778401466746",
  appId: "1:778401466746:web:755a0706973211d72c2ec3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
