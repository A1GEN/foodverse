import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import favoritesReducer from './favoritesSlice'
import reviewsReducer from './reviewsSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    reviews: reviewsReducer
  }
})

export default store
