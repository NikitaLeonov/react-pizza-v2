import { createSlice } from '@reduxjs/toolkit'

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
  },
})

export const { setCategoryId, setSortType, setPage } = filterSlice.actions
export default filterSlice.reducer
