import React from 'react'
import { useNavigate } from 'react-router-dom'

import qs from 'qs'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setSortType, setPage, setFilters } from '../../redux/slices/filterSlice'
import { fetchPizzas } from '../../redux/slices/pizzaSlice'

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
  const isMounted = React.useRef(false)

  const { categoryId, sort, page, searchValue } = useSelector(state => state.filter)
  const { items, status } = useSelector(state => state.pizza)

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId ? `&category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(fetchPizzas({ sortBy, order, category, search, page }))
  }

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        page,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort, searchValue, page])

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // window.scrollTo(0, 0)

    getPizzas()
  }, [categoryId, sort, searchValue, page])

  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
  const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className={styles.top}>
        <Categories categoryId={categoryId} onChangeCategory={id => dispatch(setCategoryId({ id }))} />
        <Sort onChangeSort={obj => dispatch(setSortType({ obj }))} />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {status === 'loading' && skeletons}
        {status === 'success' && pizzas}
        {status === 'error' && <div>jib,rf</div>}
      </div>
      <Pagination onChangePage={page => dispatch(setPage({ page }))} />
    </>
  )
}

export default Home
