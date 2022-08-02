export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  NAME_DESC = 'name',
  NAME_ASC = '-name',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export interface IFilterState {
  searchValue: string
  categoryId: number
  page: number
  sort: ISortInfo
}

export interface ISortInfo {
  name: string
  sortBy: SortPropertyEnum
}
