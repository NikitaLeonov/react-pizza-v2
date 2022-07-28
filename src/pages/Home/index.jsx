import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../App'

import axios from 'axios'
import qs from 'qs'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setSortType, setPage, setFilters } from '../../redux/slices/filterSlice'

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
  const url = 'https://62d93df49eedb6996356fe1c.mockapi.io'
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { categoryId, sort, page } = useSelector(state => state.filter)

  const { searchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchPizzas = () => {
    setIsLoading(true)

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId ? `&category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(`${url}/items?p=${page}&l=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => setItems(res.data))
      .then(() => setIsLoading(false))
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
      isSearch.current = true
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // window.scrollTo(0, 0)
    if (!isSearch.current) fetchPizzas()

    isSearch.current = false
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
        {isLoading && skeletons}
        {!isLoading && pizzas}
      </div>
      <Pagination onChangePage={page => dispatch(setPage({ page }))} />
    </>
  )
}

export default Home
