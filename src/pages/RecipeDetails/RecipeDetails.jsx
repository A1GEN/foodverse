import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import {
  getRecipeById
} from "../../services/recipeApi"

import styles from "./RecipeDetails.module.css"
import Comments from "../../components/Comments/Comments"
import ShoppingList from "../../components/ShoppingList/ShoppingList"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext/AuthContext"
import { getDb } from "../../lib/firebaseClient"
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore"
import { UtensilsCrossed, Globe, ChefHat, Video } from "lucide-react"

function RecipeDetails() {

  const { id } = useParams()

  const [recipe, setRecipe] =
    useState(null)
  const { user } = useContext(AuthContext)

  const [avgRating, setAvgRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {

    const fetchRecipe = async () => {

      const data =
        await getRecipeById(id)

      setRecipe(data)

    }

    fetchRecipe()

  }, [id])

  // Ratings realtime
  useEffect(()=>{
    let unsub = null
    let mounted = true
    ;(async ()=>{
      const db = await getDb()
      if(!mounted) return
      const ratingsRef = collection(db, 'recipeMeta', id, 'ratings')
      unsub = onSnapshot(ratingsRef, snap=>{
        const vals = snap.docs.map(d=>d.data().value || 0)
        const count = vals.length
        const sum = vals.reduce((s,n)=>s+n,0)
        setRatingCount(count)
        setAvgRating(count ? (sum/count).toFixed(2) : 0)
        if(user){
          const myDoc = snap.docs.find(d=>d.id === user.uid)
          if(myDoc) setUserRating(myDoc.data().value)
          else setUserRating(0)
        }
      })
    })()
    return ()=>{ mounted=false; if(unsub) unsub() }
  },[id, user])

  const submitRating = async (value) =>{
    if(!user) return alert('Please login to rate')
    try{
      const db = await getDb()
      await setDoc(doc(db, 'recipeMeta', id, 'ratings', user.uid), { value, uid: user.uid })
    }catch(e){ console.error('rate', e) }
  }

  if(!recipe) {

    return <h1>Loading...</h1>

  }

  // Ingredients
  const ingredients = []

  for(let i = 1; i <= 20; i++) {

    const ingredient =
      recipe[`strIngredient${i}`]

    const measure =
      recipe[`strMeasure${i}`]

    if(
      ingredient &&
      ingredient.trim() !== ""
    ) {

      ingredients.push(
        `${ingredient} - ${measure}`
      )

    }

  }

  return (

    <div className={styles.details}>

      <div className={styles.imageSection}>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
        />

      </div>

      <div className={styles.content}>

        <h1>{recipe.strMeal}</h1>

        <div className={styles.info}>

          <span>
            <UtensilsCrossed size={16} /> {recipe.strCategory}
          </span>

          <span>
            <Globe size={16} /> {recipe.strArea}
          </span>

        </div>

        <div className={styles.ratingBar}>
          <div>Rating: <strong>{avgRating}</strong> ({ratingCount})</div>
          <div className={styles.stars}>
            {[1,2,3,4,5].map(n=> (
              <button key={n} className={n<=userRating?styles.starActive:styles.star} onClick={()=>submitRating(n)}>{n<=userRating?'★':'☆'}</button>
            ))}
          </div>
        </div>

        <h2>Ingredients 🥘</h2>

        <ul>

          {ingredients.map(
            (item, index) => (

              <li key={index}>
                {item}
              </li>

            )
          )}

        </ul>

        <h2><ChefHat size={20} /> Instructions</h2>

        <p>
          {recipe.strInstructions}
        </p>

       {recipe.strYoutube && (

  <div className={styles.videoSection}>

    <h2><Video size={20} /> Recipe Video</h2>

    <iframe
      src={
        recipe.strYoutube.replace(
          "watch?v=",
          "embed/"
        )
      }
      title="Recipe Video"
      allowFullScreen
    ></iframe>

  </div>

)}
  <Comments recipeId={id} />
  <ShoppingList ingredients={ingredients} recipeId={id} />
      </div>

    </div>

  )

}

export default RecipeDetails