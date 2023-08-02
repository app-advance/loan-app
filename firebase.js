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

const firebaseConfigTest = {
  apiKey: "AIzaSyClsOR5nfArky8mxusUB95-XbpU5Klu38s",
  authDomain: "app-advance-test-434e2.firebaseapp.com",
  projectId: "app-advance-test-434e2",
  storageBucket: "app-advance-test-434e2.appspot.com",
  messagingSenderId: "45567574928",
  appId: "1:45567574928:web:32c01ea8c7ec9d71c4a915",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfigTest);

// Initialize Cloud Firestore and get a reference to the service
export const database = getFirestore(app);
