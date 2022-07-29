import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload
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

export const { setCategoryId, setSortType, setPage, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer
