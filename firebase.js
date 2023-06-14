import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLqrNJGOEdOD0BiisiSuhhNTbR47n6HMc",
  authDomain: "app-advance.firebaseapp.com",
  projectId: "app-advance",
  storageBucket: "app-advance.appspot.com",
  messagingSenderId: "271780359765",
  appId: "1:271780359765:web:24f0c6c814f1a8dd72aedc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const database = getFirestore(app);
