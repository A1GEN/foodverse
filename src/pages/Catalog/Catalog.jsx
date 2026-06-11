import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { getRecipesByCategory, searchRecipes, getRecipes } from '../../services/recipeApi'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { Search, Filter, X, ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './Catalog.module.css'

function Catalog() {
  const { t } = useTranslation()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const categories = ['All', 'Beef', 'Chicken', 'Dessert', 'Seafood', 'Vegetarian', 'Pasta', 'Breakfast']

  useEffect(() => {
    loadRecipes()
  }, [selectedCategory, searchQuery])

  const loadRecipes = async () => {
    setLoading(true)
    try {
      let data
      if (searchQuery) {
        data = await searchRecipes(searchQuery)
      } else if (selectedCategory === 'All') {
        data = await getRecipes()
      } else {
        data = await getRecipesByCategory(selectedCategory)
      }
      setRecipes(data || [])
    } catch (error) {
      console.error('Error loading recipes:', error)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (recipe) => {
    dispatch(addToCart(recipe))
  }

  const filteredRecipes = recipes.filter(recipe => {
    if (searchQuery && !recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedCategory !== 'All' && recipe.strCategory !== selectedCategory) {
      return false
    }
    return true
  })

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <ShoppingCart size={32} className={styles.titleIcon} />
            {t('catalog', 'Каталог')}
          </h1>
          
          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder={t('search.placeholder', 'Поиск рецептов...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearBtn}>
                  <X size={16} />
                </button>
              )}
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={styles.filterToggle}
            >
              <Filter size={18} />
              Фильтры
            </button>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filters}>
            <h3>Категории</h3>
            <div className={styles.categoryList}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                >
                  {category === 'All' ? 'Все' : category}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Загрузка рецептов...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingCart size={64} className={styles.emptyIcon} />
            <p>Рецепты не найдены</p>
          </div>
        ) : (
          <>
            <div className={styles.results}>
              <span>Найдено {filteredRecipes.length} рецептов</span>
            </div>

            <div className={styles.grid}>
              {filteredRecipes.map(recipe => (
                <div key={recipe.idMeal} className={styles.recipeCard}>
                  <RecipeCard recipe={recipe} />
                  <button
                    onClick={() => handleAddToCart(recipe)}
                    className={styles.addToCartBtn}
                  >
                    <ShoppingCart size={18} /> В корзину
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Catalog
