import styles from "./RecipeOfDay.module.css"
import { useTranslation } from "react-i18next"

function RecipeOfDay() {
  const { t } = useTranslation()

  return (

    <div className={styles.banner}>

      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
        alt={t('recipeOfDay.title')}
      />

      <div className={styles.content}>

        <span>
          ⭐️ {t('recipeOfDay.label')}
        </span>

        <h2>
          {t('recipeOfDay.title')}
        </h2>

        <p>
          {t('recipeOfDay.text')}
        </p>

        <button>
          {t('recipeOfDay.view')}
        </button>

      </div>

    </div>

  )

}

export default RecipeOfDay