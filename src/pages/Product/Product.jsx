import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../../services/productService'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { Clock, Flame, Utensils, ChevronLeft, ShoppingCart, Heart, Share2, Star, CheckCircle } from 'lucide-react'
import styles from './Product.module.css'

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.cart)
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

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
    setIsFavorite(!isFavorite)
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
    : product.ingredients ? product.ingredients.split(',').map(i => i.trim()) : []

  const instructions = Array.isArray(product.instructions)
    ? product.instructions
    : product.instructions ? product.instructions.split('\n').filter(i => i.trim()) : []

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
              className={`${styles.actionBtn} ${isFavorite ? styles.favorite : ''}`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
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
              <span>{product.difficulty || 'Средне'}</span>
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

          <div className={styles.ingredients}>
            <h3>Ингредиенты</h3>
            <ul className={styles.ingredientsList}>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.instructions}>
            <h3>Инструкции</h3>
            <ol className={styles.instructionsList}>
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
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
    </div>
  )
}

export default Product
