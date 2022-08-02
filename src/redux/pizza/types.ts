export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizza {
  id: string
  name: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
  rating: number
}

export interface SearchPizzaParams {
  sortBy: string
  order: string
  category: string
  search: string
  page: number
}

export interface IPizzaState {
  items: IPizza[]
  status: StatusEnum
}
