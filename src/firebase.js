 import { initializeApp } from "firebase/app"

import { getAuth }
from "firebase/auth"

import { getFirestore }
from "firebase/firestore"

import { getDatabase }
from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBHs1EIW9u6n2q4sjmoTLpZXXocMdE7-lI",

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "foodverce.firebaseapp.com",

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "foodverce",

  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "foodverce.firebasestorage.app",

  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "51698783008",

  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:51698783008:web:ccea7f48cd7a000d077d45",

  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://foodverce-default-rtdb.firebaseio.com"

}

const app =
  initializeApp(firebaseConfig)

export const auth =
  getAuth(app)

export const db =
  getFirestore(app)

export const realtimeDb =
  getDatabase(app)

export const storage =
  getStorage(app)