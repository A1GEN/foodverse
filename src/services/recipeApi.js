import axios from "axios"

const API_URL =
  "https://www.themealdb.com/api/json/v1/1"

// Recipe details by ID
export const getRecipeById = async (id) => {

  try {

    const response = await axios.get(
      `${API_URL}/lookup.php?i=${id}`
    )

    return response.data.meals[0]

  } catch (error) {

    console.log("Recipe details error:", error)

  }

}
