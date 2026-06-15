import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"
import styles from "./Favorites.module.css"
import { Heart, Clock, ShoppingCart, Share2, X, Plus, Minus } from "lucide-react"
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/favoritesSlice'
import { addToCart } from '../../redux/cartSlice'

function Favorites(){
  const { items: favorites } = useSelector(state => state.favorites)
  const dispatch = useDispatch()
  
  // State for quantities
  const [quantities, setQuantities] = useState({})

  const handleToggleFavorite = (item) => {
    dispatch(toggleFavorite(item))
  }

  const handleQuantityChange = (itemId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta)
    }))
  }

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1
    dispatch(addToCart({ ...item, quantity }))
  }

  const isSupabaseProduct = (item) => {
    return item.id && !item.idMeal
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

  const calculateTotalPrice = (item) => {
    const quantity = quantities[item.id] || 1
    const price = item.price || 0
    return price * quantity
  }

  return (
    <div className={styles.favorites}>
      <h1><Heart size={24} className={styles.titleIcon} /> Сохраненные рецепты</h1>

      {favorites && favorites.length > 0 ? (
        <div className={styles.grid}>
          {favorites.map(item => {
            const isProduct = isSupabaseProduct(item)
            
            return (
              <div key={item.idMeal || item.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <img 
                    src={isProduct ? item.image : item.strMealThumb} 
                    alt={isProduct ? item.name : item.strMeal} 
                  />
                  <button 
                    className={styles.removeBtn}
                    onClick={() => handleToggleFavorite(item)}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className={styles.cardContent}>
                  <h3>{isProduct ? item.name : item.strMeal}</h3>
                  <p className={styles.cardMeta}>
                    {isProduct ? item.country : (item.strCategory || item.strArea)}
                  </p>
                  
                  {isProduct ? (
                    <>
                      <div className={styles.cardStats}>
                        <span><Clock size={14} /> {item.cooking_time} мин</span>
                        <span>🔥 {item.calories} ккал</span>
                      </div>
                      {item.price && (
                        <div className={styles.priceSection}>
                          <p className={styles.cardPrice}>{calculateTotalPrice(item)} сом</p>
                          <div className={styles.quantityControl}>
                            <button 
                              className={styles.qtyBtn}
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={(quantities[item.id] || 1) <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className={styles.qty}>{quantities[item.id] || 1}</span>
                            <button 
                              className={styles.qtyBtn}
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={styles.cardStats}>
                      <span><Clock size={14} /> {prepTime(item.idMeal)} мин</span>
                      <span>★ {getRating(item.idMeal)}</span>
                    </div>
                  )}
                  
                  <div className={styles.cardActions}>
                    <Link 
                      to={isProduct ? `/product/${item.id}` : `/recipe/${item.idMeal}`}
                      className={styles.viewBtn}
                    >
                      Подробнее
                    </Link>
                    <button 
                      className={styles.cartBtn}
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className={styles.empty}>Нет сохраненных рецептов</p>
      )}
    </div>
  )
}

export default Favorites