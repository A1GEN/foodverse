/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react"
import { getAuth, getDb } from "../../lib/firebaseClient"
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth"
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore"

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubSnapshot = null
    let unsubscribeAuth = null
    let mounted = true

    const init = async () => {
      const authRef = await getAuth()
      const dbRef = await getDb()

      unsubscribeAuth = onAuthStateChanged(authRef, async (u) => {
        if (!mounted) return
        setUser(u)
        if (u) {
          const userRef = doc(dbRef, "users", u.uid)

          // migrate local favorites -> firestore if present
          try {
            const localFavs = JSON.parse(localStorage.getItem('favorites') || '[]') || []
            if (localFavs.length) {
              const snap = await getDoc(userRef)
              const remote = snap.exists() ? (snap.data().favorites || []) : []
              const map = {}
              remote.concat(localFavs).forEach(it => { if (it && it.idMeal) map[it.idMeal] = it })
              const merged = Object.values(map)
              await setDoc(userRef, { favorites: merged }, { merge: true })
              localStorage.removeItem('favorites')
            }
          } catch (e) { console.error('migration', e) }

          unsubSnapshot = onSnapshot(userRef, (snap) => {
            if (snap.exists()) setUserData(snap.data())
            else {
              const profile = {
                uid: u.uid,
                displayName: u.displayName || "",
                email: u.email,
                avatar: `https://i.pravatar.cc/150?u=${u.uid}`,
                favorites: []
              }
              setDoc(userRef, profile)
              setUserData(profile)
            }
          })

        } else {
          setUserData(null)
          if (unsubSnapshot) { unsubSnapshot(); unsubSnapshot = null }
        }
        setLoading(false)
      })
    }

    init()

    return () => {
      mounted = false
      if (unsubscribeAuth) unsubscribeAuth()
      if (unsubSnapshot) unsubSnapshot()
    }
  }, [])

  const logout = async () => {
    const a = await getAuth()
    await signOut(a)
  }

  const refreshUserData = async () => {
    if (!user) return
    const dbRef = await getDb()
    const userRef = doc(dbRef, "users", user.uid)
    const snap = await getDoc(userRef)
    if (snap.exists()) setUserData(snap.data())
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout, refreshUserData, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
