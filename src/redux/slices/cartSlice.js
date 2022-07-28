import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const totalPriceCalc = items => items.reduce((acc, item) => (acc += item.price * item.count), 0)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.item.id)
      if (findItem) ++findItem.count
      else state.items.push({ ...action.payload.item, count: 1 })

      state.totalPrice = totalPriceCalc(state.items)
    },
    removeItem(state, action) {
      state.items.find(item => item.id === action.payload.item.id).count--

      state.totalPrice = totalPriceCalc(state.items)
    },
    removeItemCategory(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.item.id)

      state.totalPrice = totalPriceCalc(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, removeItemCategory, clearItems } = cartSlice.actions
export default cartSlice.reducer
