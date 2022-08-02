import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../hooks/getCartFromLS'
import { calcTotalPrice } from '../../hooks/calcTotalPrice'
import { CartItem, ICartSliceState } from './types'

const initialState: ICartSliceState = {
  totalPrice: calcTotalPrice(getCartFromLS()),
  items: getCartFromLS(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) ++findItem.count
      else state.items.push({ ...action.payload, count: 1 })

      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) item.count--

      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItemCategory(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(item => item.id !== action.payload.id)

      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, removeItemCategory, clearItems } = cartSlice.actions
export default cartSlice.reducer
