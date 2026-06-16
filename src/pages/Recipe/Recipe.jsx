import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../../services/productService'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../../redux/favoritesSlice'
import { Clock, Flame, Utensils, ChevronLeft, Heart, Share2, CheckCircle, ChefHat, Timer, BookOpen } from 'lucide-react'
import styles from './Recipe.module.css'

function Recipe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items: favorites } = useSelector(state => state.favorites)
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecipe()
  }, [id])

  const loadRecipe = async () => {
    setLoading(true)
    try {
      const data = await getProductById(id)
      console.log('Recipe data from Supabase:', data)
      console.log('Ingredients type:', typeof data.ingredients, Array.isArray(data.ingredients))
      console.log('Instructions type:', typeof data.instructions, Array.isArray(data.instructions))
      setProduct(data)
    } catch (error) {
      console.error('Error loading recipe:', error)
    } finally {
      setLoading(false)
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
        <div className={styles.loading}>Загрузка рецепта...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Рецепт не найден</div>
      </div>
    )
  }

  const ingredients = Array.isArray(product.ingredients) 
    ? product.ingredients 
    : typeof product.ingredients === 'object' && product.ingredients !== null 
      ? Object.values(product.ingredients).filter(v => v) 
      : typeof product.ingredients === 'string' 
        ? product.ingredients.split(',').map(i => i.trim()) 
        : []
  
  const instructions = Array.isArray(product.instructions)
    ? product.instructions
    : typeof product.instructions === 'object' && product.instructions !== null
      ? Object.values(product.instructions).filter(v => v)
      : typeof product.instructions === 'string' 
        ? product.instructions.split('\n').filter(i => i.trim()) 
        : []

  console.log('Parsed ingredients:', ingredients)
  console.log('Parsed instructions:', instructions)

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <ChevronLeft size={20} />
        Назад
      </button>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>
              <ChefHat size={32} className={styles.titleIcon} />
              {product.name}
            </h1>
            <p className={styles.subtitle}>Рецепт приготовления</p>
          </div>
          <div className={styles.headerActions}>
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

        <div className={styles.imageSection}>
          <img src={product.image} alt={product.name} className={styles.recipeImage} />
        </div>

        <div className={styles.recipeInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <Timer size={24} className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Время готовки</span>
                <span className={styles.infoValue}>{product.cooking_time} минут</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Flame size={24} className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Калории</span>
                <span className={styles.infoValue}>{product.calories} ккал</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Utensils size={24} className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Сложность</span>
                <span className={styles.infoValue}>{product.difficulti || 'Средне'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.nutrition}>
          <h2 className={styles.sectionTitle}>
            <BookOpen size={24} />
            Пищевая ценность
          </h2>
          <div className={styles.nutritionGrid}>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionLabel}>Белки</span>
              <span className={styles.nutritionValue}>{product.protein || 0}г</span>
            </div>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionLabel}>Жиры</span>
              <span className={styles.nutritionValue}>{product.fat || 0}г</span>
            </div>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionLabel}>Углеводы</span>
              <span className={styles.nutritionValue}>{product.carbohydrates || 0}г</span>
            </div>
          </div>
        </div>

        <div className={styles.description}>
          <h2 className={styles.sectionTitle}>Описание</h2>
          <p className={styles.descriptionText}>{product.description}</p>
        </div>

       <div className={styles.instructions}>
  <h2 className={styles.sectionTitle}>Инструкции по приготовлению</h2>

  <ol className={styles.instructionsList}>
    {instructions.map((instruction, index) => (
      <li key={index} className={styles.instructionItem}>
        <div className={styles.instructionNumber}>
          {typeof instruction === 'object' && instruction.step
            ? instruction.step
            : index + 1}
        </div>

        <div className={styles.instructionText}>
          {typeof instruction === 'object' && instruction.text
            ? instruction.text
            : typeof instruction === 'string'
              ? instruction
              : String(instruction)}
        </div>
      </li>
    ))}
  </ol>
</div>

        
        <div className={styles.countryInfo}>
          <h2 className={styles.sectionTitle}>Происхождение</h2>
          <p className={styles.countryText}>{product.country}</p>
        </div>
      </div>
    </div>
  )
}

export default Recipe
