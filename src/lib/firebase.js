import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrkVLdr63O1fwuw9UHQKbwEuhPTa6ORrU",
  authDomain: "todo-3135c.firebaseapp.com",
  projectId: "todo-3135c",
  storageBucket: "todo-3135c.appspot.com",
  messagingSenderId: "866258877854",
  appId: "1:866258877854:web:c19938a568f0c437c9aa8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
