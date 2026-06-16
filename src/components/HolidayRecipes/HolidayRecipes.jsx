import { useState } from 'react'
import { Gift, Heart, Sparkles, Star, Calendar, Clock, ChefHat, Flame, PartyPopper, Cake, Cherry, Tree, Egg, Ring } from 'lucide-react'
import styles from './HolidayRecipes.module.css'

function HolidayRecipes() {
  const [selectedHoliday, setSelectedHoliday] = useState('newyear')

  const holidays = [
    {
      id: 'newyear',
      name: 'Новый год',
      icon: <PartyPopper size={24} />,
      description: 'Оливье, холодец, мандарины, шампанское',
      recipes: [
        { name: 'Салат Оливье', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', time: '30 мин', difficulty: 'Средне', calories: 280 },
        { name: 'Холодец', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', time: '4 часа', difficulty: 'Сложно', calories: 350 },
        { name: 'Запеченная курица', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', time: '75 мин', difficulty: 'Средне', calories: 380 },
        { name: 'Медовик', image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400', time: '45 мин', difficulty: 'Средне', calories: 420 }
      ]
    },
    {
      id: 'birthday',
      name: 'День рождения',
      icon: <Cake size={24} />,
      description: 'Торт, праздничные блюда, закуски',
      recipes: [
        { name: 'Торт Наполеон', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', time: '60 мин', difficulty: 'Сложно', calories: 450 },
        { name: 'Шашлык', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400', time: '40 мин', difficulty: 'Средне', calories: 320 },
        { name: 'Канапе с красной рыбой', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400', time: '20 мин', difficulty: 'Легко', calories: 180 },
        { name: 'Муссовый торт', image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400', time: '30 мин', difficulty: 'Средне', calories: 380 }
      ]
    },
    {
      id: 'valentine',
      name: 'День влюбленных',
      icon: <Heart size={24} />,
      description: 'Романтический ужин, десерты для двоих',
      recipes: [
        { name: 'Стейк с розмарином', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400', time: '25 мин', difficulty: 'Средне', calories: 520 },
        { name: 'Паста Карбонара', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', time: '20 мин', difficulty: 'Средне', calories: 480 },
        { name: 'Тирамису', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', time: '30 мин', difficulty: 'Средне', calories: 350 },
        { name: 'Шоколадные фонданы', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400', time: '15 мин', difficulty: 'Средне', calories: 420 }
      ]
    },
    {
      id: 'christmas',
      name: 'Рождество',
      icon: <Tree size={24} />,
      description: 'Запеченная утка, пряники, глинтвейн',
      recipes: [
        { name: 'Запеченная утка', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400', time: '90 мин', difficulty: 'Сложно', calories: 450 },
        { name: 'Пряники', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400', time: '45 мин', difficulty: 'Средне', calories: 280 },
        { name: 'Глинтвейн', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400', time: '15 мин', difficulty: 'Легко', calories: 180 },
        { name: 'Рождественский пудинг', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', time: '3 часа', difficulty: 'Сложно', calories: 380 }
      ]
    },
    {
      id: 'easter',
      name: 'Пасха',
      icon: <Egg size={24} />,
      description: 'Кулич, пасха, крашеные яйца',
      recipes: [
        { name: 'Кулич', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400', time: '2 часа', difficulty: 'Сложно', calories: 420 },
        { name: 'Творожная пасха', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400', time: '30 мин', difficulty: 'Средне', calories: 350 },
        { name: 'Крашеные яйца', image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=400', time: '20 мин', difficulty: 'Легко', calories: 80 },
        { name: 'Пасхальный кулич', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400', time: '2 часа', difficulty: 'Сложно', calories: 420 }
      ]
    },
    {
      id: 'wedding',
      name: 'Свадьба',
      icon: <Ring size={24} />,
      description: 'Торт-свадебный, праздничный банкет',
      recipes: [
        { name: 'Свадебный торт', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400', time: '3 часа', difficulty: 'Сложно', calories: 480 },
        { name: 'Фаршированные перцы', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400', time: '50 мин', difficulty: 'Средне', calories: 220 },
        { name: 'Запеченная рыба', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400', time: '35 мин', difficulty: 'Средне', calories: 280 },
        { name: 'Муссовый десерт', image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400', time: '30 мин', difficulty: 'Средне', calories: 380 }
      ]
    }
  ]

  const activeHoliday = holidays.find(h => h.id === selectedHoliday) || holidays[0]

  return (
    <section className={styles.holidaySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Праздничные рецепты</h2>
          <p className={styles.subtitle}>Блюда для особых occasions</p>
        </div>

        <div className={styles.holidayTabs}>
          {holidays.map(holiday => (
            <button
              key={holiday.id}
              onClick={() => setSelectedHoliday(holiday.id)}
              className={`${styles.holidayTab} ${selectedHoliday === holiday.id ? styles.active : ''}`}
            >
              <span className={styles.holidayIcon}>{holiday.icon}</span>
              <span className={styles.holidayName}>{holiday.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.holidayContent}>
          <div className={styles.holidayInfo}>
            <div className={styles.holidayIcon}>{activeHoliday.icon}</div>
            <h3 className={styles.holidayTitle}>{activeHoliday.name}</h3>
            <p className={styles.holidayDescription}>{activeHoliday.description}</p>
          </div>

          <div className={styles.recipesGrid}>
            {activeHoliday.recipes.map((recipe, index) => (
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

export default HolidayRecipes
