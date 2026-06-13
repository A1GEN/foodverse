import {
  Link
} from "react-router-dom"

import {
  useContext,
  useState
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
import { Heart, Clock, ShoppingCart, Share2, Link as LinkIcon } from "lucide-react"
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'

function RecipeCard({
  recipe
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [showShareMenu, setShowShareMenu] = useState(false)

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

  const handleAddToCart = () => {
    dispatch(addToCart(recipe))
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = recipe.strMeal
    
    let shareUrl
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setShowShareMenu(false)
        return
      default:
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

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
              })} <span style={{marginLeft:8,fontSize:'14px'}}>{getRating(recipe.idMeal)}</span>
            </div>
            <div className={styles.badge}><Clock size={14} /> {prepTime(recipe.idMeal)}m</div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to={`/recipe/${recipe.idMeal}`}>
            <button className={`${styles.viewButton} btn btn-primary`}>{t('viewRecipe')}</button>
          </Link>

          <div className={styles.icons}>
            {isFavorite(recipe.idMeal) ? (
              <button className={`${styles.favoriteButton} btn btn-ghost`} onClick={() => removeFromFavorites(recipe.idMeal)}><Heart size={18} fill="#ff6b35" color="#ff6b35" /> {t('saved', 'Сохранено')}</button>
            ) : (
              <button className={`${styles.favoriteButton} btn btn-ghost`} onClick={() => addToFavorites(recipe)}><Heart size={18} /> {t('save', 'Сохранить')}</button>
            )}
            <button className={`${styles.likeButton} btn btn-ghost`} onClick={() => toggleLike(recipe.idMeal)}>{likes[recipe.idMeal] || 0} <Heart size={16} /></button>
            <button className={`${styles.cartButton} btn btn-ghost`} onClick={handleAddToCart} aria-label="Add to cart"><ShoppingCart size={18} /></button>
            <div className={styles.shareWrapper}>
              <button 
                className={`${styles.shareButton} btn btn-ghost`} 
                onClick={() => setShowShareMenu(!showShareMenu)}
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
              {showShareMenu && (
                <div className={styles.shareMenu}>
                  <button onClick={() => handleShare('facebook')} className={styles.shareOption}>
                    📘 Facebook
                  </button>
                  <button onClick={() => handleShare('twitter')} className={styles.shareOption}>
                    🐦 Twitter
                  </button>
                  <button onClick={() => handleShare('copy')} className={styles.shareOption}>
                    <LinkIcon size={16} />
                    Копировать
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </Motion.div>

  )

}

export default RecipeCard