/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react"
import { getDb } from "../../lib/firebaseClient"
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore"
import { AuthContext } from "../AuthContext/AuthContext"

export const FavoritesContext =
  createContext()

function FavoritesProvider({
  children
}) {

  const [favorites,setFavorites] = useState(()=> JSON.parse(localStorage.getItem('favorites')) || [])

  const { user } = useContext(AuthContext)

  // Load favorites: if user -> subscribe to Firestore -> realtime update, else from localStorage
  useEffect(()=>{
    let unsub = null
    let mounted = true
    ;(async ()=>{
      if(!user) return
      const db = await getDb()
      if(!mounted) return
      const ref = doc(db, 'users', user.uid)
      unsub = onSnapshot(ref, (snap)=>{
        if(snap.exists()){
          const data = snap.data()
          setFavorites(data.favorites || [])
        } else {
          setFavorites([])
        }
      }, (err)=>{
        console.error('fav snap', err)
      })
    })()
    return ()=>{ mounted=false; if(unsub) unsub() }
  },[user])
  // Note: persistence is handled by add/remove methods to avoid write loops

  // ❤️ Add favorite
  const addToFavorites = async (recipe) => {
    const exists = favorites.find(item => item.idMeal === recipe.idMeal)
    if(!exists){
      const newFav = [recipe, ...favorites]
      setFavorites(newFav)
      if(user){
        try{
          const db = await getDb()
          const ref = doc(db, 'users', user.uid)
          try{
            await updateDoc(ref, { favorites: newFav })
          }catch(err){
            console.error('update favorites', err)
            await setDoc(ref, { favorites: newFav }, { merge:true })
          }
        }catch(err){ console.error('favorites write', err) }
      } else {
        localStorage.setItem('favorites', JSON.stringify(newFav))
      }
    }
  }

  // ❌ Remove favorite
  const removeFromFavorites = async (id) => {
    const newFav = favorites.filter(item => item.idMeal !== id)
    setFavorites(newFav)
    if(user){
      try{
        const db = await getDb()
        const ref = doc(db, 'users', user.uid)
        try{
          await updateDoc(ref, { favorites: newFav })
        }catch(err){
          console.error('update favorites', err)
          await setDoc(ref, { favorites: newFav }, { merge:true })
        }
      }catch(err){ console.error('favorites write', err) }
    } else {
      localStorage.setItem('favorites', JSON.stringify(newFav))
    }
  }

  const isFavorite = (id) => {
    return favorites.some(f => f.idMeal === id)
  }

  return (

    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>

  )

}

export default FavoritesProvider