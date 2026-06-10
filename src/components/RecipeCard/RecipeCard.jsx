import {
  Link
} from "react-router-dom"

import {
  useContext
} from "react"

import {
  motion as Motion
} from "framer-motion"

import styles
from "./RecipeCard.module.css"

import {
  FavoritesContext
} from "../../context/FavoritesContext/FavoritesContext"

import {
  LikesContext
} from "../../context/LikesContext/LikesContext"
import { useTranslation } from "react-i18next"

function RecipeCard({
  recipe
}) {
  const { t } = useTranslation()

  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite
  } = useContext(
    FavoritesContext
  )

  const {
    likes,
    toggleLike
  } = useContext(
    LikesContext
  )

  const getRating = (id) => {
    const n = parseInt(id,10) || 7
    const r = 3 + (n % 21) / 10
    return r.toFixed(1)
  }

  const prepTime = (id)=> {
    const n = parseInt(id,10) || 30
    return 20 + (n % 40)
  }

  return (

    <Motion.div

      className={styles.card}

      whileHover={{
        scale:1.03
      }}

      whileTap={{
        scale:0.98
      }}

      initial={{
        opacity:0,
        y:30
      }}

      whileInView={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.5
      }}

    >

      <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy" />

      <div className={styles.content}>

        <div className={styles.topRow}>
          <div className={styles.titleWrap}>
              <h2>{recipe.strMeal}</h2>
              <p className={styles.sub}>{recipe.strCategory || recipe.strArea}</p>
            </div>

          <div className={styles.badges}>
            <div className={styles.badge}>
              {Array.from({length:5}).map((_,i)=>{
                const val = Math.round(getRating(recipe.idMeal))
                return <span key={i} style={{color: i<val? '#f97316':'rgba(255,255,255,0.25)'}}>{i<val? '★':'☆'}</span>
              })} <span style={{marginLeft:8}}>{getRating(recipe.idMeal)}</span>
            </div>
            <div className={styles.badge}>⏱️ {prepTime(recipe.idMeal)}m</div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to={`/recipe/${recipe.idMeal}`}>
            <button className={`${styles.viewButton} btn btn-primary`}>{t('viewRecipe')}</button>
          </Link>

          <div className={styles.icons}>
            {isFavorite(recipe.idMeal) ? (
              <button className={`${styles.favoriteButton} btn btn-ghost`} onClick={() => removeFromFavorites(recipe.idMeal)}>💖 {t('saved')}</button>
            ) : (
              <button className={`${styles.favoriteButton} btn btn-ghost`} onClick={() => addToFavorites(recipe)}>🤍 {t('save')}</button>
            )}
            <button className={`${styles.likeButton} btn btn-ghost`} onClick={() => toggleLike(recipe.idMeal)}>{likes[recipe.idMeal] || 0} ❤️</button>
          </div>
        </div>

      </div>

    </Motion.div>

  )

}

export default RecipeCard