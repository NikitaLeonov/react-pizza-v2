import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

interface ICartSliceState {
  totalPrice: number
  items: CartItem[]
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
}

const totalPriceCalc = (items: CartItem[]) =>
  items.reduce((acc: number, item: CartItem) => (acc += item.price * item.count), 0)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) ++findItem.count
      else state.items.push({ ...action.payload, count: 1 })

      state.totalPrice = totalPriceCalc(state.items)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) item.count--

      state.totalPrice = totalPriceCalc(state.items)
    },
    removeItemCategory(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(item => item.id !== action.payload.id)

      state.totalPrice = totalPriceCalc(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const cartSelector = (state: RootState) => state.cart
export const cartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find(item => item.id === id)

export const { addItem, removeItem, removeItemCategory, clearItems } = cartSlice.actions
export default cartSlice.reducer
