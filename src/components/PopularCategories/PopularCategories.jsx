import styles from "./PopularCategories.module.css"

import { useTranslation } from "react-i18next"

function PopularCategories() {
  const { t } = useTranslation()

  const categories = [
    "🍕 Pizza",
    "🍰 Desserts",
    "🥗 Salads",
    "🍜 Soups",
    "🍔 Fast Food",
    "🍫 Chocolate",
    "🍦 Ice Cream",
    "🥩 Meat",
    "🐟 Fish"
  ]

  return (

    <section className={styles.categories}>

      <h2>{t('popularCategories')}</h2>

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