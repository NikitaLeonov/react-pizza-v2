import { createAsyncThunk } from '@reduxjs/toolkit'
import { IPizza, SearchPizzaParams } from './types'
import axios from 'axios'

const url = 'https://62d93df49eedb6996356fe1c.mockapi.io'

export const fetchPizzas = createAsyncThunk<IPizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async params => {
    const { sortBy, order, category, search, page } = params
    const { data } = await axios.get(
      `${url}/items?p=${page}&l=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)
