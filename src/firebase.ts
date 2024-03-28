// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6cTDvXsdjo7KI-qmGOR5I8JpYY0W2WnU",
  authDomain: "fn12-79a42.firebaseapp.com",
  projectId: "fn12-79a42",
  storageBucket: "fn12-79a42.appspot.com",
  messagingSenderId: "847334831174",
  appId: "1:847334831174:web:fa1adc5449f7f82e1e4647",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
