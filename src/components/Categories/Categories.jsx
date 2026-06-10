import { useState } from "react"
import styles from "./Categories.module.css"

function Categories({ handleCategory, selectedCategory }) {

  const allCategories = [
    { name: "🍕 Pizza", api: "Pizza" },
    { name: "🍰 Desserts", api: "Dessert" },
    { name: "🥗 Salads", api: "Salad" },
    { name: "🍦 Ice Cream", api: "Ice Cream" },
    { name: "🍜 Soups", api: "Soups" },
    { name: "🍔 Fast Food", api: "Fast Food" },
    { name: "🥩 Meat", api: "Meat" },
    { name: "🐟 Seafood", api: "Seafood" },
    { name: "🌮 Street Food", api: "Street Food" },
    { name: "🥐 Bakery", api: "Bakery" }
  ]

  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? allCategories : allCategories.slice(0,4)

  return (
    <section className={styles.categories}>
      <button className={selectedCategory === '' ? styles.active : ''} onClick={() => handleCategory('')}>All</button>
      {visible.map((category) => (
        <button
          key={category.name}
          className={selectedCategory === category.api ? styles.active : ''}
          onClick={() => handleCategory(category.api)}
        >
          {category.name}
        </button>
      ))}

      {allCategories.length > visible.length && (
        <button className={styles.more} onClick={() => setExpanded(s => !s)}>{expanded ? 'Show Less' : 'More'}</button>
      )}
    </section>
  )

}

export default Categories