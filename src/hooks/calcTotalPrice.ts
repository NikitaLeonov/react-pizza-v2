import { CartItem } from '../redux/cart/types'

export const calcTotalPrice = (items: CartItem[]) =>
  items.reduce((acc: number, item: CartItem) => (acc += item.price * item.count), 0)
