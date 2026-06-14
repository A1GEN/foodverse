import { Flower, Sun, Leaf, Snowflake, Clock, Flame, Utensils, ChevronLeft } from 'lucide-react'
import styles from './SeasonalRecipes.module.css'
import { useNavigate } from 'react-router-dom'

function SeasonalRecipes() {
  const navigate = useNavigate()

  const seasonalData = {
    spring: {
      icon: <Flower size={32} />,
      title: 'Весна',
      emoji: '🌸',
      description: 'Свежие зелень, легкие супы, молодые овощи',
      recipes: [
        { name: 'Зеленый борщ', time: '45 мин', calories: '280 ккал', difficulty: 'Средне' },
        { name: 'Салат с редисом и яйцом', time: '15 мин', calories: '150 ккал', difficulty: 'Легко' },
        { name: 'Щи из молодой капусты', time: '50 мин', calories: '220 ккал', difficulty: 'Средне' },
        { name: 'Пирог с зеленью', time: '60 мин', calories: '320 ккал', difficulty: 'Сложно' },
        { name: 'Окрошка на кефире', time: '20 мин', calories: '180 ккал', difficulty: 'Легко' },
        { name: 'Салат с авокадо', time: '10 мин', calories: '200 ккал', difficulty: 'Легко' }
      ]
    },
    summer: {
      icon: <Sun size={32} />,
      title: 'Лето',
      emoji: '☀️',
      description: 'Гриль, холодные супы, свежие фрукты',
      recipes: [
        { name: 'Гаспачо', time: '20 мин', calories: '120 ккал', difficulty: 'Легко' },
        { name: 'Шашлык из курицы', time: '40 мин', calories: '350 ккал', difficulty: 'Средне' },
        { name: 'Фруктовый салат', time: '15 мин', calories: '180 ккал', difficulty: 'Легко' },
        { name: 'Греческий салат', time: '15 мин', calories: '220 ккал', difficulty: 'Легко' },
        { name: 'Гриль овощи', time: '25 мин', calories: '150 ккал', difficulty: 'Легко' },
        { name: 'Холодный кофе', time: '5 мин', calories: '50 ккал', difficulty: 'Легко' }
      ]
    },
    autumn: {
      icon: <Leaf size={32} />,
      title: 'Осень',
      emoji: '🍂',
      description: 'Теплые супы, выпечка, сезонные овощи',
      recipes: [
        { name: 'Тыквенный суп', time: '40 мин', calories: '180 ккал', difficulty: 'Легко' },
        { name: 'Пирог с яблоками', time: '70 мин', calories: '380 ккал', difficulty: 'Средне' },
        { name: 'Грибной крем-суп', time: '45 мин', calories: '250 ккал', difficulty: 'Средне' },
        { name: 'Запеченная курица', time: '60 мин', calories: '320 ккал', difficulty: 'Средне' },
        { name: 'Кабачковая икра', time: '50 мин', calories: '140 ккал', difficulty: 'Средне' },
        { name: 'Чай с имбирем', time: '10 мин', calories: '30 ккал', difficulty: 'Легко' }
      ]
    },
    winter: {
      icon: <Snowflake size={32} />,
      title: 'Зима',
      emoji: '❄️',
      description: 'Горячие блюда, согревающие напитки, уютная еда',
      recipes: [
        { name: 'Борщ', time: '60 мин', calories: '300 ккал', difficulty: 'Средне' },
        { name: 'Плов', time: '90 мин', calories: '450 ккал', difficulty: 'Сложно' },
        { name: 'Горячий шоколад', time: '10 мин', calories: '200 ккал', difficulty: 'Легко' },
        { name: 'Запеченная рыба', time: '45 мин', calories: '280 ккал', difficulty: 'Средне' },
        { name: 'Манты', time: '80 мин', calories: '400 ккал', difficulty: 'Сложно' },
        { name: 'Лагман', time: '50 мин', calories: '380 ккал', difficulty: 'Средне' }
      ]
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <ChevronLeft size={20} />
        Назад
      </button>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Сезонные рецепты</h1>
          <p className={styles.subtitle}>Что готовить по сезонам</p>
        </div>

        <div className={styles.seasons}>
          {Object.entries(seasonalData).map(([key, season]) => (
            <div key={key} className={styles.seasonCard}>
              <div className={styles.seasonHeader}>
                <div className={styles.seasonIcon}>
                  {season.icon}
                </div>
                <div className={styles.seasonInfo}>
                  <h2 className={styles.seasonTitle}>
                    {season.emoji} {season.title}
                  </h2>
                  <p className={styles.seasonDescription}>{season.description}</p>
                </div>
              </div>

              <div className={styles.recipes}>
                {season.recipes.map((recipe, index) => (
                  <div key={index} className={styles.recipeItem}>
                    <div className={styles.recipeHeader}>
                      <h3 className={styles.recipeName}>{recipe.name}</h3>
                    </div>
                    <div className={styles.recipeMeta}>
                      <span className={styles.metaItem}>
                        <Clock size={14} />
                        {recipe.time}
                      </span>
                      <span className={styles.metaItem}>
                        <Flame size={14} />
                        {recipe.calories}
                      </span>
                      <span className={styles.metaItem}>
                        <Utensils size={14} />
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeasonalRecipes
