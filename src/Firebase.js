// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkxauINm6MiwcUdX-yiRA9c8A7VWX8OjE",
  authDomain: "role-based-access-contro-7448e.firebaseapp.com",
  projectId: "role-based-access-contro-7448e",
  storageBucket: "role-based-access-contro-7448e.firebasestorage.app",
  messagingSenderId: "506158806870",
  appId: "1:506158806870:web:b767378b84249f609f08f7",
  measurementId: "G-WZ1RGVB1Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);

export { app, db };