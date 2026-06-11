import { useContext } from "react"
import styles from "./Favorites.module.css"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FavoritesContext } from "../../context/FavoritesContext/FavoritesContext"
import { Heart } from "lucide-react"

function Favorites(){
  const { favorites } = useContext(FavoritesContext)

  return (
    <div className={styles.favorites}>
      <h1><Heart size={24} className={styles.titleIcon} /> Saved Recipes</h1>

      {favorites && favorites.length > 0 ? (
        <div className={styles.grid}>
          {favorites.map(r => <RecipeCard key={r.idMeal || r.id} recipe={r} />)}
        </div>
      ) : (
        <p className={styles.empty}>No saved recipes yet</p>
      )}
    </div>
  )
}

export default Favorites