import { CartItem } from '../redux/cart/types'

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart')
  return data ? (JSON.parse(data) as CartItem[]) : []
}
