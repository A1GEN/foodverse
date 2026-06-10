import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection
} from "firebase/firestore"
import { getDb } from "../lib/firebaseClient"

export const saveRecipe =
  async(userId,recipe)=>{

    const db = await getDb()
    await setDoc(doc(db, "favorites", `${userId}_${recipe.idMeal}`), { ...recipe, userId })

}

export const removeRecipe =
  async(userId,id)=>{

    const db = await getDb()
    await deleteDoc(doc(db, "favorites", `${userId}_${id}`))

}

export const getFavorites =
  async(userId)=>{

    const db = await getDb()
    const querySnapshot = await getDocs(collection(db, "favorites"))
    return querySnapshot.docs.map(d => d.data()).filter(item => item.userId === userId)

}