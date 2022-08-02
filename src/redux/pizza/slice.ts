import { createSlice } from '@reduxjs/toolkit'
import { fetchPizzas } from './asyncAction'
import { IPizzaState, StatusEnum } from './types'

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
