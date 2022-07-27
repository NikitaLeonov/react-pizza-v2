import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSliver = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload.obj)
    },
  },
})

export const { setCategoryId, setSortType, setPage, setFilters } = cartSliver.actions
export default cartSliver.reducer
