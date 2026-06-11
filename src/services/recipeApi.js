import axios from "axios"

const API_URL =
  "https://www.themealdb.com/api/json/v1/1"

// 🍕 Get all recipes
export const getRecipes = async () => {

  try {

    const response = await axios.get(
      `${API_URL}/search.php?s=`
    )

    return response.data.meals

  } catch (error) {

    console.log("Error getting recipes:", error)

  }

}

// 🔍 Search recipes
export const searchRecipes = async (query) => {

  try {

    const response = await axios.get(
      `${API_URL}/search.php?s=${query}`
    )

    return response.data.meals

  } catch (error) {

    console.log("Search error:", error)

  }

}

// 🎲 Random recipe
export const getRandomRecipe = async () => {

  try {

    const response = await axios.get(
      `${API_URL}/random.php`
    )

    return response.data.meals[0]

  } catch (error) {

    console.log("Random recipe error:", error)

  }

}

// 🍔 Categories
export const getCategories = async () => {

  try {

    const response = await axios.get(
      `${API_URL}/categories.php`
    )

    return response.data.categories

  } catch (error) {

    console.log("Categories error:", error)

  }

}

// 🍜 Recipe details by ID
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

// 📂 Get recipes by category
export const getRecipesByCategory = async (category) => {

  try {

    const response = await axios.get(
      `${API_URL}/filter.php?c=${category}`
    )

    return response.data

  } catch (error) {

    console.log("Recipes by category error:", error)

  }

}