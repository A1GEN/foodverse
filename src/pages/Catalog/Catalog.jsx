import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { getRecipesByCategory, searchRecipes, getRecipes } from '../../services/recipeApi'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { Search, Filter, X, ShoppingCart, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './Catalog.module.css'

function Catalog() {
  const { t } = useTranslation()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState('all')
  
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const categories = [
    { id: 'All', name: 'Все', icon: '🍽️' },
    { id: 'Beef', name: 'Говядина', icon: '🥩' },
    { id: 'Chicken', name: 'Курица', icon: '🍗' },
    { id: 'Dessert', name: 'Десерты', icon: '🍰' },
    { id: 'Seafood', name: 'Морепродукты', icon: '🦐' },
    { id: 'Vegetarian', name: 'Вегетарианское', icon: '🥗' },
    { id: 'Pasta', name: 'Паста', icon: '🍝' },
    { id: 'Breakfast', name: 'Завтрак', icon: '🍳' }
  ]

  const sortOptions = [
    { id: 'popular', name: 'Популярные' },
    { id: 'newest', name: 'Новинки' },
    { id: 'price-low', name: 'Сначала дешевые' },
    { id: 'price-high', name: 'Сначала дорогие' },
    { id: 'rating', name: 'По рейтингу' }
  ]

  const priceRanges = [
    { id: 'all', name: 'Все цены' },
    { id: 'low', name: 'До 500 ₽' },
    { id: 'medium', name: '500 - 1000 ₽' },
    { id: 'high', name: '1000 - 2000 ₽' },
    { id: 'premium', name: 'От 2000 ₽' }
  ]

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
      
      // Ensure data is always an array
      if (Array.isArray(data)) {
        setRecipes(data)
      } else if (data && data.meals && Array.isArray(data.meals)) {
        setRecipes(data.meals)
      } else {
        setRecipes([])
      }
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (sort) => {
    setSortBy(sort)
  }

  const handlePriceChange = (price) => {
    setPriceRange(price)
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    setSortBy('popular')
    setPriceRange('all')
  }

  const filteredRecipes = Array.isArray(recipes) ? recipes.filter(recipe => {
    // Search filter
    if (searchQuery && recipe.strMeal && !recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    // Category filter
    if (selectedCategory !== 'All' && recipe.strCategory !== selectedCategory) {
      return false
    }
    // Price filter (simulated)
    if (priceRange !== 'all') {
      const price = recipe.price || Math.floor(Math.random() * 2500) + 100
      if (priceRange === 'low' && price > 500) return false
      if (priceRange === 'medium' && (price < 500 || price > 1000)) return false
      if (priceRange === 'high' && (price < 1000 || price > 2000)) return false
      if (priceRange === 'premium' && price < 2000) return false
    }
    return true
  }).sort((a, b) => {
    // Sort logic
    if (sortBy === 'popular') return (b.popularity || 0) - (a.popularity || 0)
    if (sortBy === 'newest') return (b.idMeal || 0) - (a.idMeal || 0)
    if (sortBy === 'price-low') return (a.price || 500) - (b.price || 500)
    if (sortBy === 'price-high') return (b.price || 500) - (a.price || 500)
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
    return 0
  }) : []

  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) + 
                            (searchQuery ? 1 : 0) + 
                            (sortBy !== 'popular' ? 1 : 0) + 
                            (priceRange !== 'all' ? 1 : 0)

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
              className={`${styles.filterToggle} ${activeFiltersCount > 0 ? styles.hasFilters : ''}`}
            >
              <SlidersHorizontal size={18} />
              Фильтры
              {activeFiltersCount > 0 && <span className={styles.badge}>{activeFiltersCount}</span>}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filters}>
            <div className={styles.filtersHeader}>
              <h3>Фильтры</h3>
              <button onClick={clearFilters} className={styles.clearAllBtn}>
                Сбросить все
              </button>
            </div>

            <div className={styles.filterSection}>
              <h4>Категории</h4>
              <div className={styles.categoryList}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.active : ''}`}
                  >
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Сортировка</h4>
              <div className={styles.sortList}>
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={`${styles.sortBtn} ${sortBy === option.id ? styles.active : ''}`}
                  >
                    {option.name}
                    {sortBy === option.id && <ChevronDown size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Цена</h4>
              <div className={styles.priceList}>
                {priceRanges.map(range => (
                  <button
                    key={range.id}
                    onClick={() => handlePriceChange(range.id)}
                    className={`${styles.priceBtn} ${priceRange === range.id ? styles.active : ''}`}
                  >
                    {range.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Загрузка рецептов...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingCart size={64} className={styles.emptyIcon} />
            <p>Рецепты не найдены</p>
            <button onClick={clearFilters} className={styles.resetBtn}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <>
            <div className={styles.results}>
              <span>Найдено {filteredRecipes.length} рецептов</span>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                  <X size={14} /> Очистить фильтры
                </button>
              )}
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
