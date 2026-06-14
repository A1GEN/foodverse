import { getDb, getAuth } from '../lib/firebaseClient'
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { deleteUser as deleteFirebaseUser } from 'firebase/auth'

export const getAllUsers = async () => {
  try {
    const db = await getDb()
    const usersRef = collection(db, 'users')
    const snapshot = await getDocs(usersRef)
    const users = []
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() })
    })
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const getUserById = async (userId) => {
  try {
    const db = await getDb()
    const userRef = doc(db, 'users', userId)
    const snapshot = await getDoc(userRef)
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() }
    }
    return null
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export const updateUser = async (userId, userData) => {
  try {
    const db = await getDb()
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, userData)
    return { id: userId, ...userData }
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const db = await getDb()
    const auth = await getAuth()
    
    // Delete from Firestore
    await deleteDoc(doc(db, 'users', userId))
    
    // Try to delete from Firebase Auth (requires admin SDK, so might fail)
    try {
      await deleteFirebaseUser(auth.currentUser)
    } catch (authError) {
      console.warn('Could not delete from Firebase Auth (requires admin SDK):', authError)
    }
    
    return true
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
