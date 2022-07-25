import React from 'react'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../Pagination'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  })
  const [currentPage, setCurrentPage] = React.useState(1)
  const { searchValue } = React.useContext(SearchContext)

  const url = 'https://62d93df49eedb6996356fe1c.mockapi.io'

  React.useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
      const sortBy = sortType.sortProperty.replace('-', '')
      const category = categoryId ? `&category=${categoryId}` : ''
      const search = searchValue ? `&search=${searchValue}` : ''

      await fetch(
        `${url}/items?p=${currentPage}&l=4${category}&sortBy=${sortBy}&order=${order}${search}`
      )
        .then(res => res.json())
        .then(data => setItems(data))

      setIsLoading(false)
    }
    getData()
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)

  const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={id => setCategoryId(id)} />
        <Sort sortValue={sortType} onChangeSort={obj => setSortType(obj)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading && skeletons}
        {!isLoading && pizzas}
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </>
  )
}

export default Home
