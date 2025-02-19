import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAxMJ7HvUpQqT3HQn78fGX2ZZlyP8MAhrE",
    authDomain: "practicatiendautez.firebaseapp.com",
    projectId: "practicatiendautez",
    storageBucket: "practicatiendautez.firebasestorage.app",
    messagingSenderId: "1065726631845",
    appId: "1:1065726631845:web:433a0a4a6976666bc6924c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };