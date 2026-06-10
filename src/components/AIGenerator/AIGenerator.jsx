import {
  useState
} from "react"

import axios from "axios"

import RecipeCard
  from "../RecipeCard/RecipeCard"

import styles from "./AIGenerator.module.css"

function AIGenerator() {

  const [ingredient, setIngredient] =
    useState("")

  const [recipes, setRecipes] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  // 🤖 Generate recipes
  const generateRecipes = async () => {

    if(!ingredient.trim()) return

    setLoading(true)

    try {

      const response =
        await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        )

      setRecipes(
        response.data.meals || []
      )

    } catch (error) {

      console.log(error)

    }

    setLoading(false)

  }

  return (

    <section className={styles.ai}>

      <h1>
        AI Recipe Generator 🤖
      </h1>

      <p>
        Enter ingredients and get
        recipe ideas 🍔
      </p>

      <div className={styles.search}>

        <input
          type="text"
          placeholder="cheese, chicken..."
          value={ingredient}
          onChange={(e) =>
            setIngredient(e.target.value)
          }
        />

        <button
          onClick={generateRecipes}
        >
          Generate
        </button>

      </div>

      {loading && (
        <h2 className={styles.loading}>
          Loading...
        </h2>
      )}

      <div className={styles.grid}>

        {recipes?.map((recipe) => (

          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
          />

        ))}

      </div>

    </section>

  )

}

export default AIGenerator