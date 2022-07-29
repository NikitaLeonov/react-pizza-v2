import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://62d93df49eedb6996356fe1c.mockapi.io'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { sortBy, order, category, search, page } = params
  const { data } = await axios.get(`${url}/items?p=${page}&l=4${category}&sortBy=${sortBy}&order=${order}${search}`)
  return data
})

const initialState = {
  items: [],
  status: 'loading', // loading | succsess | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  // reducers: {
  //   setItems(state, action) {
  //     state.items = action.payload.data
  //   },
  // },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.items = []
      state.status = 'loading'
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchPizzas.rejected]: state => {
      state.items = []
      state.status = 'error'
      // alert('Не удалось получить данные с сервера')
    },
  },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
