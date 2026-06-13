import { useState } from 'react'
import { Gift, Heart, Sparkles, Star, Calendar } from 'lucide-react'
import styles from './HolidayRecipes.module.css'

function HolidayRecipes() {
  const [selectedHoliday, setSelectedHoliday] = useState('newyear')

  const holidays = [
    {
      id: 'newyear',
      name: 'Новый год',
      icon: <Sparkles size={24} />,
      emoji: '🎉',
      description: 'Оливье, холодец, мандарины, шампанское',
      recipes: [
        { name: 'Салат Оливье', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
        { name: 'Холодец', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
        { name: 'Запеченная курица', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400' },
        { name: 'Медовик', image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400' }
      ]
    },
    {
      id: 'birthday',
      name: 'День рождения',
      icon: <Gift size={24} />,
      emoji: '🎂',
      description: 'Торт, праздничные блюда, закуски',
      recipes: [
        { name: 'Торт Наполеон', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
        { name: 'Шашлык', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400' },
        { name: 'Канапе с красной рыбой', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
        { name: 'Муссовый торт', image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400' }
      ]
    },
    {
      id: 'valentine',
      name: 'День влюбленных',
      icon: <Heart size={24} />,
      emoji: '❤️',
      description: 'Романтический ужин, десерты для двоих',
      recipes: [
        { name: 'Стейк с розмарином', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400' },
        { name: 'Паста Карбонара', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' },
        { name: 'Тирамису', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
        { name: 'Шоколадные фонданы', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400' }
      ]
    },
    {
      id: 'christmas',
      name: 'Рождество',
      icon: '🎄',
      emoji: '🎄',
      description: 'Запеченная утка, пряники, глинтвейн',
      recipes: [
        { name: 'Запеченная утка', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400' },
        { name: 'Пряники', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400' },
        { name: 'Глинтвейн', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400' },
        { name: 'Рождественский пудинг', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' }
      ]
    },
    {
      id: 'easter',
      name: 'Пасха',
      icon: <Star size={24} />,
      emoji: '🐣',
      description: 'Кулич, пасха, крашеные яйца',
      recipes: [
        { name: 'Кулич', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400' },
        { name: 'Творожная пасха', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400' },
        { name: 'Крашеные яйца', image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=400' },
        { name: 'Пасхальный кулич', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400' }
      ]
    },
    {
      id: 'wedding',
      name: 'Свадьба',
      icon: <Calendar size={24} />,
      emoji: '💒',
      description: 'Торт-свадебный, праздничный банкет',
      recipes: [
        { name: 'Свадебный торт', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400' },
        { name: 'Фаршированные перцы', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400' },
        { name: 'Запеченная рыба', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
        { name: 'Муссовый десерт', image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400' }
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
              <span className={styles.holidayEmoji}>{holiday.emoji}</span>
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

export default HolidayRecipes
