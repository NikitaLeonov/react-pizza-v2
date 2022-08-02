import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch as useDispatch } from '../../redux/store'
import { setCategoryId, setSortType, setPage, setFilters } from '../../redux/filter/slice'
import { ISortInfo } from '../../redux/filter/types'
import { fetchPizzas } from '../../redux/pizza/asyncAction'
import { SearchPizzaParams, IPizza } from '../../redux/pizza/types'
import qs from 'qs'

import Categories from '../../components/Categories'
import Sort from '../../components/Sort'
import PizzaBlock from '../../components/PizzaBlock'
import Skeleton from '../../components/PizzaBlock/Skeleton'
import Pagination from '../../components/Pagination'
import { sortList } from '../../components/Sort'

import styles from './Home.module.sass'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMounted = React.useRef<boolean>(false)

  const { categoryId, sort, page, searchValue } = useSelector((state: RootState) => state.filter)
  const { items, status } = useSelector((state: RootState) => state.pizza)

  const getPizzas = async (): Promise<void> => {
    const order: string = sort.sortBy.includes('-') ? 'asc' : 'desc'
    const sortBy: string = sort.sortBy.replace('-', '')
    const category: string = categoryId ? `&category=${categoryId}` : ''
    const search: string = searchValue ? `&search=${searchValue}` : ''

    dispatch(fetchPizzas({ sortBy, order, category, search, page }))
  }

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortBy,
        categoryId,
        page,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
    getPizzas()
  }, [categoryId, sort, searchValue, page]) // eslint-disable-line

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams

      const sort = sortList.find(obj => obj.sortBy === params.sortBy)

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          page: Number(params.page),
          sort: sort || sortList[0],
        })
      )
    }
  }, []) // eslint-disable-line

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0)

    getPizzas()
  }, [categoryId, sort, searchValue, page]) // eslint-disable-line

  const pizzas = items.map((item: IPizza) => <PizzaBlock key={item.id} {...item} />)
  const skeletons = [...Array(4)].map((_, idx) => <Skeleton key={idx} />)

  const onChangeCategory = React.useCallback((idx: number) => dispatch(setCategoryId(idx)), [])

  return (
    <>
      <div className={styles.top}>
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort onChangeSort={(obj: ISortInfo) => dispatch(setSortType(obj))} />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {status === 'loading' && skeletons}
        {status === 'success' && pizzas}
        {status === 'error' && <div>jib,rf</div>}
      </div>
      <Pagination onChangePage={(page: number) => dispatch(setPage(page))} />
    </>
  )
}

export default Home
