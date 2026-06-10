let app = null
let auth = null
let db = null
let storage = null
let realtimeDb = null

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
}

// Fallbacks for environments without .env — helps avoid auth/invalid-api-key
const finalConfig = {
  apiKey: firebaseConfig.apiKey || "AIzaSyBHs1EIW9u6n2q4sjmoTLpZXXocMdE7-lI",
  authDomain: firebaseConfig.authDomain || "foodverce.firebaseapp.com",
  projectId: firebaseConfig.projectId || "foodverce",
  storageBucket: firebaseConfig.storageBucket || "foodverce.firebasestorage.app",
  messagingSenderId: firebaseConfig.messagingSenderId || "51698783008",
  appId: firebaseConfig.appId || "1:51698783008:web:ccea7f48cd7a000d077d45",
  databaseURL: firebaseConfig.databaseURL || "https://foodverce-default-rtdb.firebaseio.com"
}

export async function initFirebase() {
  if (app) return app
  const firebaseApp = await import('firebase/app')
  const { initializeApp } = firebaseApp
  // diagnostics: log whether apiKey is present
  try { console.log('Firebase apiKey present:', !!finalConfig.apiKey) } catch (e) {}
  app = initializeApp(finalConfig)
  return app
}

export async function getAuth() {
  if (auth) return auth
  await initFirebase()
  const mod = await import('firebase/auth')
  auth = mod.getAuth(app)
  return auth
}

export async function getDb() {
  if (db) return db
  await initFirebase()
  const mod = await import('firebase/firestore')
  db = mod.getFirestore(app)
  return db
}

export async function getStorage() {
  if (storage) return storage
  await initFirebase()
  const mod = await import('firebase/storage')
  storage = mod.getStorage(app)
  return storage
}

export async function getRealtimeDb() {
  if (realtimeDb) return realtimeDb
  await initFirebase()
  const mod = await import('firebase/database')
  realtimeDb = mod.getDatabase(app)
  return realtimeDb
}

export async function getApp() { await initFirebase(); return app }
