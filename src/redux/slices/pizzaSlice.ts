import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://62d93df49eedb6996356fe1c.mockapi.io'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async params => {
    const { sortBy, order, category, search, page } = params
    const { data } = await axios.get(
      `${url}/items?p=${page}&l=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

type Pizza = {
  id: string
  name: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
  rating: number
}

export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface SearchPizzaParams {
  sortBy: string
  order: string
  category: string
  search: string
  page: string
}

interface IPizzaState {
  items: Pizza[]
  status: StatusEnum
}

const initialState = {
  items: [],
  status: 'loading',
} as IPizzaState

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload.data
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.items = []
      state.status = StatusEnum.LOADING
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = StatusEnum.SUCCESS
    })

    builder.addCase(fetchPizzas.rejected, state => {
      state.items = []
      state.status = StatusEnum.ERROR
    })
  },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
