import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { getProducts, searchProducts, getProductsByCategory } from '../../services/productService'
import { Search, Filter, X, ShoppingCart, SlidersHorizontal, ChevronDown, Utensils, Clock, Flame } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './Catalog.module.css'
import { Link } from 'react-router-dom'

function Catalog() {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState('all')
  
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const categories = [
    { id: 'All', name: 'Все', icon: <Utensils size={18} /> },
    { id: '1', name: 'Завтраки', icon: <Utensils size={18} /> },
    { id: '2', name: 'Обеды', icon: <Utensils size={18} /> },
    { id: '3', name: 'Ужины', icon: <Utensils size={18} /> },
    { id: '4', name: 'Десерты', icon: <Utensils size={18} /> },
    { id: '5', name: 'Напитки', icon: <Utensils size={18} /> },
    { id: '6', name: 'Закуски', icon: <Utensils size={18} /> }
  ]

  const sortOptions = [
    { id: 'popular', name: 'Популярные' },
    { id: 'newest', name: 'Новинки' },
    { id: 'calories-low', name: 'Меньше калорий' },
    { id: 'calories-high', name: 'Больше калорий' },
    { id: 'time-low', name: 'Быстрее готовить' },
    { id: 'time-high', name: 'Дольше готовить' }
  ]

  const difficultyOptions = [
    { id: 'all', name: 'Все уровни' },
    { id: 'easy', name: 'Легко' },
    { id: 'medium', name: 'Средне' },
    { id: 'hard', name: 'Сложно' }
  ]

  useEffect(() => {
    loadProducts()
  }, [selectedCategory, searchQuery])

  const loadProducts = async () => {
    setLoading(true)
    try {
      let data
      if (searchQuery) {
        data = await searchProducts(searchQuery)
      } else if (selectedCategory === 'All') {
        data = await getProducts()
      } else {
        data = await getProductsByCategory(selectedCategory)
      }
      
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (sort) => {
    setSortBy(sort)
  }

  const handleDifficultyChange = (difficulty) => {
    setPriceRange(difficulty)
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    setSortBy('popular')
    setPriceRange('all')
  }

  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    // Search filter
    if (searchQuery && product.name && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    // Category filter
    if (selectedCategory !== 'All' && product.category_id !== selectedCategory) {
      return false
    }
    return true
  }).sort((a, b) => {
    // Sort logic
    if (sortBy === 'popular') return (b.popularity || 0) - (a.popularity || 0)
    if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at)
    if (sortBy === 'calories-low') return (a.calories || 0) - (b.calories || 0)
    if (sortBy === 'calories-high') return (b.calories || 0) - (a.calories || 0)
    if (sortBy === 'time-low') return (a.cooking_time || 0) - (b.cooking_time || 0)
    if (sortBy === 'time-high') return (b.cooking_time || 0) - (a.cooking_time || 0)
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
              <h4>Сложность</h4>
              <div className={styles.priceList}>
                {difficultyOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleDifficultyChange(option.id)}
                    className={`${styles.priceBtn} ${priceRange === option.id ? styles.active : ''}`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Загрузка продуктов...</div>
        ) : filteredProducts.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingCart size={64} className={styles.emptyIcon} />
            <p>Продукты не найдены</p>
            <button onClick={clearFilters} className={styles.resetBtn}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <>
            <div className={styles.results}>
              <span>Найдено {filteredProducts.length} продуктов</span>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                  <X size={14} /> Очистить фильтры
                </button>
              )}
            </div>

            <div className={styles.grid}>
              {filteredProducts.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <Link to={`/product/${product.id}`} className={styles.productLink}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productCountry}>{product.country}</p>
                      <div className={styles.productMeta}>
                        <span className={styles.metaItem}>
                          <Clock size={14} />
                          {product.cooking_time} мин
                        </span>
                        <span className={styles.metaItem}>
                          <Flame size={14} />
                          {product.calories} ккал
                        </span>
                      </div>
                      <p className={styles.productDescription}>{product.description?.substring(0, 100)}...</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
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
