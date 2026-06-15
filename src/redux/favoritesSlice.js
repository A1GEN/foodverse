import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: []
  },
  reducers: {
    addToFavorites: (state, action) => {
      const itemId = action.payload.idMeal || action.payload.id
      const existingItem = state.items.find(item => (item.idMeal || item.id) === itemId)
      if (!existingItem) {
        state.items.push({ ...action.payload })
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => (item.idMeal || item.id) !== action.payload)
    },
    toggleFavorite: (state, action) => {
      const itemId = action.payload.idMeal || action.payload.id
      const existingItem = state.items.find(item => (item.idMeal || item.id) === itemId)
      if (existingItem) {
        state.items = state.items.filter(item => (item.idMeal || item.id) !== itemId)
      } else {
        state.items.push({ ...action.payload })
      }
    },
    clearFavorites: (state) => {
      state.items = []
    }
  }
})

export const { addToFavorites, removeFromFavorites, toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
