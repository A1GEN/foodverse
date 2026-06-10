import styles from "./RecipeRating.module.css"

function RecipeRating() {

  return (

    <div className={styles.rating}>

      <div className={styles.stars}>
        ⭐️⭐️⭐️⭐️⭐️
      </div>

      <p>4.8 / 5 Rating</p>

      <div className={styles.stats}>

        <span>❤️ 1.2K Likes</span>

        <span>💬 324 Reviews</span>

      </div>

    </div>

  )

}

export default RecipeRating