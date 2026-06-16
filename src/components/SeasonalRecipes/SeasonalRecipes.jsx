import { useState, useEffect } from 'react'
import { Snowflake, Sun, Leaf, Thermometer, ChevronRight, Clock, ChefHat, Flame } from 'lucide-react'
import styles from './SeasonalRecipes.module.css'

function SeasonalRecipes() {
  const [currentSeason, setCurrentSeason] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('')

  const seasons = [
    {
      id: 'spring',
      name: 'Весна',
      icon: <Leaf size={24} />,
      description: 'Свежие овощи, зелень, легкие супы',
      recipes: [
        { name: 'Салат со спаржей и яйцом', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', time: '20 мин', difficulty: 'Легко', calories: 180 },
        { name: 'Щи из щавеля', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', time: '45 мин', difficulty: 'Средне', calories: 220 },
        { name: 'Запеченная спаржа', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400', time: '25 мин', difficulty: 'Легко', calories: 150 },
        { name: 'Ризотто с горошком', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400', time: '35 мин', difficulty: 'Средне', calories: 380 }
      ]
    },
    {
      id: 'summer',
      name: 'Лето',
      icon: <Sun size={24} />,
      description: 'Гриль, холодные супы, свежие фрукты',
      recipes: [
        { name: 'Гаспачо', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', time: '15 мин', difficulty: 'Легко', calories: 120 },
        { name: 'Шашлык из курицы', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400', time: '40 мин', difficulty: 'Средне', calories: 320 },
        { name: 'Фруктовый салат', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400', time: '10 мин', difficulty: 'Легко', calories: 95 },
        { name: 'Греческий салат', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', time: '15 мин', difficulty: 'Легко', calories: 180 }
      ]
    },
    {
      id: 'autumn',
      name: 'Осень',
      icon: <Thermometer size={24} />,
      description: 'Тыква, грибы, уютные супы',
      recipes: [
        { name: 'Тыквенный суп-пюре', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400', time: '35 мин', difficulty: 'Легко', calories: 190 },
        { name: 'Жареные грибы', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', time: '25 мин', difficulty: 'Легко', calories: 85 },
        { name: 'Яблочный пирог', image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400', time: '60 мин', difficulty: 'Средне', calories: 280 },
        { name: 'Рагу из овощей', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400', time: '45 мин', difficulty: 'Средне', calories: 165 }
      ]
    },
    {
      id: 'winter',
      name: 'Зима',
      icon: <Snowflake size={24} />,
      description: 'Горячие супы, запеченное мясо, пряности',
      recipes: [
        { name: 'Борщ', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', time: '90 мин', difficulty: 'Средне', calories: 350 },
        { name: 'Плов', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', time: '60 мин', difficulty: 'Сложно', calories: 520 },
        { name: 'Глинтвейн', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400', time: '15 мин', difficulty: 'Легко', calories: 180 },
        { name: 'Запеченная курица', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', time: '75 мин', difficulty: 'Средне', calories: 380 }
      ]
    }
  ]

  useEffect(() => {
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) setCurrentSeason('spring')
    else if (month >= 5 && month <= 7) setCurrentSeason('summer')
    else if (month >= 8 && month <= 10) setCurrentSeason('autumn')
    else setCurrentSeason('winter')
    
    setSelectedSeason(currentSeason)
  }, [currentSeason])

  const activeSeason = seasons.find(s => s.id === selectedSeason) || seasons[0]

  return (
    <section className={styles.seasonalSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Сезонные рецепты</h2>
          <p className={styles.subtitle}>Что готовить по сезонам</p>
        </div>

        <div className={styles.seasonTabs}>
          {seasons.map(season => (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season.id)}
              className={`${styles.seasonTab} ${selectedSeason === season.id ? styles.active : ''}`}
            >
              <span className={styles.seasonIcon}>{season.icon}</span>
              <span className={styles.seasonName}>{season.name}</span>
              {selectedSeason === season.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        <div className={styles.seasonContent}>
          <div className={styles.seasonInfo}>
            <div className={styles.seasonIcon}>{activeSeason.icon}</div>
            <h3 className={styles.seasonTitle}>{activeSeason.name}</h3>
            <p className={styles.seasonDescription}>{activeSeason.description}</p>
          </div>

          <div className={styles.recipesGrid}>
            {activeSeason.recipes.map((recipe, index) => (
              <div key={index} className={styles.recipeCard}>
                <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
                <div className={styles.recipeOverlay}>
                  <div className={styles.recipeContent}>
                    <h4 className={styles.recipeName}>{recipe.name}</h4>
                    <div className={styles.recipeMeta}>
                      <span className={styles.recipeTime}><Clock size={14} /> {recipe.time}</span>
                      <span className={styles.recipeDifficulty}><ChefHat size={14} /> {recipe.difficulty}</span>
                      <span className={styles.recipeCalories}><Flame size={14} /> {recipe.calories} ккал</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeasonalRecipes
