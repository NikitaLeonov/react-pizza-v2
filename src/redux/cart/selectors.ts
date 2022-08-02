import { RootState } from '../store'

export const cartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find(item => item.id === id)

export const cartSelector = (state: RootState) => state.cart
