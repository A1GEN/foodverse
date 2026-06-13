import { useState } from 'react'
import { Globe, MapPin, ArrowRight } from 'lucide-react'
import styles from './NationalCuisines.module.css'

function NationalCuisines() {
  const [selectedCuisine, setSelectedCuisine] = useState('italian')

  const cuisines = [
    {
      id: 'italian',
      name: 'Итальянская',
      flag: '🇮🇹',
      description: 'Паста, пицца, ризотто, тирамису',
      recipes: [
        { name: 'Паста Карбонара', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' },
        { name: 'Пицца Маргарита', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' },
        { name: 'Ризотто', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400' },
        { name: 'Тирамису', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' }
      ]
    },
    {
      id: 'japanese',
      name: 'Японская',
      flag: '🇯🇵',
      description: 'Суши, роллы, рамен, темпура',
      recipes: [
        { name: 'Суши', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400' },
        { name: 'Роллы Филадельфия', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400' },
        { name: 'Рамен', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
        { name: 'Темпура', image: 'https://images.unsplash.com/photo-1534256958597-7fe685cbd745?w=400' }
      ]
    },
    {
      id: 'chinese',
      name: 'Китайская',
      flag: '🇨🇳',
      description: 'Удон, вок, пекинская утка, димсамы',
      recipes: [
        { name: 'Удон', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
        { name: 'Курица в кисло-сладком соусе', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400' },
        { name: 'Пекинская утка', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400' },
        { name: 'Димсамы', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c423c?w=400' }
      ]
    },
    {
      id: 'french',
      name: 'Французская',
      flag: '🇫🇷',
      description: 'Круассаны, круассаны, луковый суп, макароны',
      recipes: [
        { name: 'Круассаны', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
        { name: 'Луковый суп', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
        { name: 'Крем-брюле', image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400' },
        { name: 'Рататуй', image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1575a0f?w=400' }
      ]
    },
    {
      id: 'mexican',
      name: 'Мексиканская',
      flag: '🇲🇽',
      description: 'Тако, буррито, гуакамоле, начос',
      recipes: [
        { name: 'Тако', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
        { name: 'Буррито', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400' },
        { name: 'Гуакамоле', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400' },
        { name: 'Начос', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400' }
      ]
    },
    {
      id: 'indian',
      name: 'Индийская',
      flag: '🇮🇳',
      description: 'Карри, наан, самоса, бирьяни',
      recipes: [
        { name: 'Карри', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
        { name: 'Наан', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
        { name: 'Самоса', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
        { name: 'Бирьяни', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' }
      ]
    },
    {
      id: 'russian',
      name: 'Русская',
      flag: '🇷🇺',
      description: 'Борщ, пельмени, блины, пироги',
      recipes: [
        { name: 'Борщ', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
        { name: 'Пельмени', image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400' },
        { name: 'Блины', image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400' },
        { name: 'Пироги', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400' }
      ]
    },
    {
      id: 'thai',
      name: 'Тайская',
      flag: '🇹🇭',
      description: 'Пад-тай, том-ям, карри, манго-стикки',
      recipes: [
        { name: 'Пад-тай', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400' },
        { name: 'Том-ям', image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400' },
        { name: 'Зеленое карри', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400' },
        { name: 'Манго-стикки', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400' }
      ]
    }
  ]

  const activeCuisine = cuisines.find(c => c.id === selectedCuisine) || cuisines[0]

  return (
    <section className={styles.cuisineSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Globe size={32} className={styles.headerIcon} />
          <div>
            <h2 className={styles.title}>Национальные кухни</h2>
            <p className={styles.subtitle}>Блюда со всего мира</p>
          </div>
        </div>

        <div className={styles.cuisineTabs}>
          {cuisines.map(cuisine => (
            <button
              key={cuisine.id}
              onClick={() => setSelectedCuisine(cuisine.id)}
              className={`${styles.cuisineTab} ${selectedCuisine === cuisine.id ? styles.active : ''}`}
            >
              <span className={styles.cuisineFlag}>{cuisine.flag}</span>
              <span className={styles.cuisineName}>{cuisine.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.cuisineContent}>
          <div className={styles.cuisineInfo}>
            <div className={styles.cuisineFlagLarge}>{activeCuisine.flag}</div>
            <h3 className={styles.cuisineTitle}>{activeCuisine.name}</h3>
            <p className={styles.cuisineDescription}>{activeCuisine.description}</p>
            <button className={styles.exploreBtn}>
              Смотреть все рецепты
              <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.recipesGrid}>
            {activeCuisine.recipes.map((recipe, index) => (
              <div key={index} className={styles.recipeCard}>
                <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
                <div className={styles.recipeOverlay}>
                  <h4 className={styles.recipeName}>{recipe.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NationalCuisines
