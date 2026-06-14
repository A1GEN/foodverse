import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload.idMeal || action.payload.id
      const existingItem = state.items.find(item => (item.idMeal || item.id) === itemId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => (item.idMeal || item.id) !== action.payload)
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => (item.idMeal || item.id) === action.payload.idMeal)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
