import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDswLgRoRn6D67OWB4eX_kVbCzDVFK24Q",
  authDomain: "orni-sore.firebaseapp.com",
  projectId: "orni-sore",
  storageBucket: "orni-sore.firebasestorage.app",
  messagingSenderId: "811954850970",
  appId: "1:811954850970:web:68e213bc363a7276066323",
  measurementId: "G-778KDRT288"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
