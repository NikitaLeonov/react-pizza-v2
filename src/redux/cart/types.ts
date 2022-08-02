export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

export interface ICartSliceState {
  totalPrice: number
  items: CartItem[]
}
