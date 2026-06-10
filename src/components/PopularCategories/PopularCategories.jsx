import styles from "./PopularCategories.module.css"

function PopularCategories() {

  const categories = [
    "🍕 Пицца",
    "🍰 Десерты",
    "🥗 Салаты",
    "🍜 Супы",
    "🍔 Фастфуд",
    "🍫 Шоколад",
    "🍦 Мороженое",
    "🥩 Мясо",
    "🐟 Рыба"
  ]

  return (

    <section className={styles.categories}>

      <h2>Популярные категории</h2>

      <div className={styles.grid}>

        {categories.map((item) => (

          <div
            key={item}
            className={styles.card}
          >
            {item}
          </div>

        ))}

      </div>

    </section>

  )

}

export default PopularCategories