import styles from "./PopularCategories.module.css"
import { useTranslation } from "react-i18next"
import { Pizza, Cake, Salad, Soup, Utensils, Candy, IceCream, Beef, Fish } from "lucide-react"

function PopularCategories() {
  const { t } = useTranslation()

  const categories = [
    { name: "Pizza", icon: Pizza },
    { name: "Desserts", icon: Cake },
    { name: "Salads", icon: Salad },
    { name: "Soups", icon: Soup },
    { name: "Fast Food", icon: Utensils },
    { name: "Chocolate", icon: Candy },
    { name: "Ice Cream", icon: IceCream },
    { name: "Meat", icon: Beef },
    { name: "Fish", icon: Fish }
  ]

  return (

    <section className={styles.categories}>

      <h2>{t('popularCategories', 'Популярные категории')}</h2>

      <div className={styles.grid}>

        {categories.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.name}
              className={styles.card}
            >
              <Icon size={32} className={styles.categoryIcon} />
              <span>{item.name}</span>
            </div>
          )
        })}

      </div>

    </section>

  )

}

export default PopularCategories