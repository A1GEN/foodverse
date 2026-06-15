import { createSlice } from '@reduxjs/toolkit'

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addReview: (state, action) => {
      state.items.push(action.payload)
    },
    removeReview: (state, action) => {
      state.items = state.items.filter(review => review.id !== action.payload)
    },
    setReviews: (state, action) => {
      state.items = action.payload
    },
    clearReviews: (state) => {
      state.items = []
    }
  }
})

export const { addReview, removeReview, setReviews, clearReviews } = reviewsSlice.actions
export default reviewsSlice.reducer
