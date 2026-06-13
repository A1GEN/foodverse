import { useState } from 'react'
import { Search, ChefHat, Plus, X, Check } from 'lucide-react'
import styles from './IngredientSearch.module.css'

function IngredientSearch() {
  const [ingredients, setIngredients] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [recipes, setRecipes] = useState([])

  const commonIngredients = [
    'Курица', 'Говядина', 'Свинина', 'Рыба', 'Креветки',
    'Яйца', 'Молоко', 'Сыр', 'Масло', 'Сметана',
    'Картофель', 'Морковь', 'Лук', 'Чеснок', 'Помидоры',
    'Огурцы', 'Перец', 'Капуста', 'Свекла', 'Баклажан',
    'Рис', 'Гречка', 'Макароны', 'Хлеб', 'Мука',
    'Яблоки', 'Бананы', 'Апельсины', 'Ягоды', 'Мед'
  ]

  const filteredIngredients = commonIngredients.filter(ing => 
    ing.toLowerCase().includes(inputValue.toLowerCase()) && 
    !ingredients.includes(ing)
  )

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient])
    setInputValue('')
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(ing => ing !== ingredient))
  }

  const searchRecipes = () => {
    if (ingredients.length === 0) return
    
    // Simulated recipes based on ingredients
    const mockRecipes = [
      { name: 'Омлет с овощами', image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400', time: '15 мин' },
      { name: 'Жареная курица с овощами', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', time: '30 мин' },
      { name: 'Паста с сыром', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', time: '20 мин' },
      { name: 'Салат с овощами', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', time: '10 мин' },
      { name: 'Картофельное пюре', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400', time: '25 мин' },
      { name: 'Греческий салат', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', time: '15 мин' }
    ]
    
    setRecipes(mockRecipes)
  }

  return (
    <section className={styles.ingredientSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <ChefHat size={32} className={styles.headerIcon} />
          <div>
            <h2 className={styles.title}>Что приготовить из...</h2>
            <p className={styles.subtitle}>Добавьте ингредиенты из холодильника</p>
          </div>
        </div>

        <div className={styles.searchArea}>
          <div className={styles.inputWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Введите ингредиент..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.input}
            />
            {inputValue && (
              <button onClick={() => setInputValue('')} className={styles.clearBtn}>
                <X size={16} />
              </button>
            )}
          </div>

          {inputValue && filteredIngredients.length > 0 && (
            <div className={styles.suggestions}>
              {filteredIngredients.map((ing, index) => (
                <button
                  key={index}
                  onClick={() => addIngredient(ing)}
                  className={styles.suggestionBtn}
                >
                  <Plus size={14} />
                  {ing}
                </button>
              ))}
            </div>
          )}
        </div>

        {ingredients.length > 0 && (
          <div className={styles.selectedIngredients}>
            <h3 className={styles.ingredientsTitle}>Выбранные ингредиенты:</h3>
            <div className={styles.ingredientsList}>
              {ingredients.map((ing, index) => (
                <div key={index} className={styles.ingredientTag}>
                  <span>{ing}</span>
                  <button onClick={() => removeIngredient(ing)} className={styles.removeTag}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={searchRecipes} className={styles.searchBtn}>
              <Search size={18} />
              Найти рецепты
            </button>
          </div>
        )}

        {recipes.length > 0 && (
          <div className={styles.results}>
            <h3 className={styles.resultsTitle}>Найденные рецепты:</h3>
            <div className={styles.recipesGrid}>
              {recipes.map((recipe, index) => (
                <div key={index} className={styles.recipeCard}>
                  <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
                  <div className={styles.recipeInfo}>
                    <h4 className={styles.recipeName}>{recipe.name}</h4>
                    <span className={styles.recipeTime}>{recipe.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default IngredientSearch
