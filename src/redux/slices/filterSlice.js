import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  categoryId: 0,
  page: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload.id
    },
    setSortType(state, action) {
      state.sort = action.payload.obj
    },
    setPage(state, action) {
      state.page = action.payload.page
    },
    setFilters(state, action) {
      state.sort = action.payload.sort
      state.page = Number(action.payload.page)
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const { setCategoryId, setSortType, setPage, setFilters } = filterSlice.actions
export default filterSlice.reducer
