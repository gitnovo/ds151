// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCceQ9Pxbx3LZCYwdeiFGx0kD-D3WAYd7M",
  authDomain: "fir-chat-8d9aa.firebaseapp.com",
  projectId: "fir-chat-8d9aa",
  storageBucket: "fir-chat-8d9aa.appspot.com",
  messagingSenderId: "1060727745724",
  appId: "1:1060727745724:web:df82a6838e24f3c2bef4b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');