import React from 'react'
import { SearchContext } from '../App'

import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setSortType, setPage } from '../redux/slices/filterSlice'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/Pagination'

const Home = () => {
  const dispatch = useDispatch()
  const url = 'https://62d93df49eedb6996356fe1c.mockapi.io'

  const { categoryId, sort, page } = useSelector(state => state.filter)
  const { searchValue } = React.useContext(SearchContext)

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
      const sortBy = sort.sortProperty.replace('-', '')
      const category = categoryId ? `&category=${categoryId}` : ''
      const search = searchValue ? `&search=${searchValue}` : ''

      await axios
        .get(`${url}/items?p=${page}&l=4${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then(res => setItems(res.data))

      setIsLoading(false)
    }
    getData()
    // window.scrollTo(0, 0)
  }, [categoryId, sort, searchValue, page])

  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
  const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className='content__top'>
        <Categories categoryId={categoryId} onChangeCategory={id => dispatch(setCategoryId({ id }))} />
        <Sort onChangeSort={obj => dispatch(setSortType({ obj }))} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading && skeletons}
        {!isLoading && pizzas}
      </div>
      <Pagination onChangePage={page => dispatch(setPage({ page }))} />
    </>
  )
}

export default Home
