import styles from "./RecipeOfDay.module.css"

function RecipeOfDay() {

  return (

    <div className={styles.banner}>

      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
        alt="Recipe"
      />

      <div className={styles.content}>

        <span>
          ⭐️ Recipe Of The Day
        </span>

        <h2>
          Grilled Chicken Salad
        </h2>

        <p>
          Healthy, tasty and easy
          to cook in 20 minutes.
        </p>

        <button>
          View Recipe
        </button>

      </div>

    </div>

  )

}

export default RecipeOfDay