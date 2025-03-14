// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj5TM-kadpMwieiXnUq9a_8iwcKAEwhQs",
  authDomain: "smartbid-78f43.firebaseapp.com",
  projectId: "smartbid-78f43",
  storageBucket: "smartbid-78f43.firebasestorage.app",
  messagingSenderId: "168049649100",
  appId: "1:168049649100:web:0e6080708d26f8efad6969",
  measurementId: "G-3TPKEKNKC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
