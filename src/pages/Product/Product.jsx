import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../../services/productService'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toggleFavorite } from '../../redux/favoritesSlice'
import { Clock, Flame, Utensils, ChevronLeft, ShoppingCart, Heart, Share2, Star, CheckCircle } from 'lucide-react'
import styles from './Product.module.css'
import Reviews from '../../components/Reviews/Reviews'

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.cart)
  const { items: favorites } = useSelector(state => state.favorites)
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    setLoading(true)
    try {
      const data = await getProductById(id)
      setProduct(data)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const toggleFavorite = () => {
    dispatch(toggleFavorite(product))
  }

  const isFavorite = () => {
    return favorites.some(item => (item.idMeal || item.id) === product.id)
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Продукт не найден</div>
      </div>
    )
  }

  const ingredients = Array.isArray(product.ingredients) 
    ? product.ingredients 
    : typeof product.ingredients === 'string' ? product.ingredients.split(',').map(i => i.trim()) : []

  const instructions = Array.isArray(product.instructions)
    ? product.instructions
    : typeof product.instructions === 'string' ? product.instructions.split('\n').filter(i => i.trim()) : []

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <ChevronLeft size={20} />
        Назад
      </button>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
          <div className={styles.imageActions}>
            <button 
              onClick={toggleFavorite}
              className={`${styles.actionBtn} ${isFavorite() ? styles.favorite : ''}`}
            >
              <Heart size={20} fill={isFavorite() ? 'currentColor' : 'none'} />
            </button>
            <button className={styles.actionBtn}>
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.country}>{product.country}</p>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Clock size={18} />
              <span>{product.cooking_time} мин</span>
            </div>
            <div className={styles.metaItem}>
              <Flame size={18} />
              <span>{product.calories} ккал</span>
            </div>
            <div className={styles.metaItem}>
              <Utensils size={18} />
              <span>{product.difficulti || 'Средне'}</span>
            </div>
          </div>

          <div className={styles.nutrition}>
            <h3>Пищевая ценность</h3>
            <div className={styles.nutritionGrid}>
              <div className={styles.nutritionItem}>
                <span className={styles.label}>Белки</span>
                <span className={styles.value}>{product.protein || 0}г</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.label}>Жиры</span>
                <span className={styles.value}>{product.fat || 0}г</span>
              </div>
              <div className={styles.nutritionItem}>
                <span className={styles.label}>Углеводы</span>
                <span className={styles.value}>{product.carbohydrates || 0}г</span>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h3>Описание</h3>
            <p>{product.description}</p>
          </div>

          <div className={styles.priceSection}>
            <h3>Цена</h3>
            <p className={styles.price}>{product.price ? `${product.price} сом` : 'Цена не указана'}</p>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantityControl}>
              <button 
                onClick={() => handleQuantityChange(-1)}
                className={styles.qtyBtn}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.qty}>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className={styles.qtyBtn}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className={styles.addToCartBtn}>
              <ShoppingCart size={20} />
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>

      <Reviews productId={product.id} />
    </div>
  )
}

export default Product
