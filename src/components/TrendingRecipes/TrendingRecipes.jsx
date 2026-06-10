import styles
from "./TrendingRecipes.module.css"
import { useTranslation } from "react-i18next"

const trending = [

  {

    id:1,

    title:"Cheese Burger",

    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",

    likes:"12.4K",

    category:"Fast Food"

  },

  {

    id:2,

    title:"Italian Pizza",

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",

    likes:"9.8K",

    category:"Pizza"

  },

  {

    id:3,

    title:"Sushi Deluxe",

    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",

    likes:"8.1K",

    category:"Japanese"

  },

  {

    id:4,

    title:"Chocolate Cake",

    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",

    likes:"15.2K",

    category:"Dessert"

  }

]

function TrendingRecipes() {
  const { t } = useTranslation()

  return (

    <section className={styles.trending}>

      <h1>
        {t('trending.title')}
      </h1>

      <p>
        {t('trending.subtitle')}
      </p>

      <div className={styles.grid}>

        {

          trending.map(recipe=>(

            <div

              key={recipe.id}

              className={styles.card}

            >

              <div className={styles.imageBox}>

                <img
                  src={recipe.image}
                  alt={recipe.title}
                />

                <span
                  className={styles.badge}
                >
                  {t('trending.hot')}
                </span>

              </div>

              <div className={styles.content}>

                <h2>
                  {recipe.title}
                </h2>

                <p>
                  {recipe.category}
                </p>

                <div className={styles.bottom}>

                  <span>
                    ❤️ {recipe.likes}
                  </span>

                  <button>
                    {t('trending.view')}
                  </button>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  )

}

export default TrendingRecipes