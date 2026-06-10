import { useState } from "react"
import styles from "./Categories.module.css"
import { useTranslation } from "react-i18next"

function Categories({ handleCategory, selectedCategory }) {

  const { t } = useTranslation()

  const allCategories = [
    { key: 'pizza', api: "Pizza" },
    { key: 'desserts', api: "Dessert" },
    { key: 'salads', api: "Salad" },
    { key: 'iceCream', api: "Ice Cream" },
    { key: 'soups', api: "Soups" },
    { key: 'fastFood', api: "Fast Food" },
    { key: 'meat', api: "Meat" },
    { key: 'seafood', api: "Seafood" },
    { key: 'streetFood', api: "Street Food" },
    { key: 'bakery', api: "Bakery" }
  ]

  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? allCategories : allCategories.slice(0,4)

  return (
    <section className={styles.categories}>
      <button
        aria-pressed={selectedCategory === ''}
        aria-label={t('all')}
        className={selectedCategory === '' ? styles.active : ''}
        onClick={() => handleCategory('')}
      >
        {t('all')}
      </button>

      {visible.map((category) => (
        <button
          key={category.name}
          aria-pressed={selectedCategory === category.api}
          aria-label={t(`categories.${category.key}`)}
          className={selectedCategory === category.api ? styles.active : ''}
          onClick={() => handleCategory(category.api)}
        >
          {t(`categories.${category.key}`)}
        </button>
      ))}

      {allCategories.length > visible.length && (
        <button
          className={styles.more}
          aria-expanded={expanded}
          aria-controls="categories-list"
          onClick={() => setExpanded((s) => !s)}
        >
          {expanded ? t('showLess') : t('more')}
        </button>
      )}
    </section>
  )

}

export default Categories