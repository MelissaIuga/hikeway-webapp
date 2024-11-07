import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // for authentication


// the web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-NHLk0M5D6u2LRArVoXvso6714glzW5I",
  authDomain: "hikeway-webapp.firebaseapp.com",
  projectId: "hikeway-webapp",
  storageBucket: "hikeway-webapp.appspot.com",
  messagingSenderId: "219787022265",
  appId: "1:219787022265:web:62e5ee6954f9aae977f068"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);