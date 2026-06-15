import { Link } from "react-router-dom"
import { motion as Motion } from "framer-motion"
import styles from "./ProductCard.module.css"
import { Heart, Clock, ShoppingCart, Flame } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/favoritesSlice'
import { addToCart } from '../../redux/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const { items: favorites } = useSelector(state => state.favorites)

  const isFavorite = () => {
    return favorites.some(item => (item.idMeal || item.id) === product.id)
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product))
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <Motion.div
      className={styles.card}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div className={styles.titleWrap}>
            <h2>{product.name}</h2>
            <p className={styles.sub}>{product.country}</p>
          </div>

          <div className={styles.badges}>
            <div className={styles.badge}><Clock size={14} /> {product.cooking_time}м</div>
            <div className={styles.badge}><Flame size={14} /> {product.calories} ккал</div>
          </div>
        </div>

        {product.price && (
          <p className={styles.price}>{product.price} сом</p>
        )}

        <div className={styles.actions}>
          <button 
            className={`${styles.favoriteButton} ${isFavorite() ? styles.active : ''}`} 
            onClick={handleToggleFavorite}
          >
            <Heart size={18} fill={isFavorite() ? 'currentColor' : 'none'} />
          </button>
          <button className={styles.cartButton} onClick={handleAddToCart}>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Motion.div>
  )
}

export default ProductCard
