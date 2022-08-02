import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterState, ISortInfo, SortPropertyEnum } from './types'

const initialState: IFilterState = {
  searchValue: '',
  categoryId: 0,
  page: 1,
  sort: {
    name: 'популярности(DESK)',
    sortBy: SortPropertyEnum.RATING_DESC,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSortType(state, action: PayloadAction<ISortInfo>) {
      state.sort = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterState>) {
      state.sort = action.payload.sort
      state.page = Number(action.payload.page)
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const { setCategoryId, setSortType, setPage, setFilters, setSearchValue } =
  filterSlice.actions
export default filterSlice.reducer
