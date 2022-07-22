import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const url = 'https://62d93df49eedb6996356fe1c.mockapi.io/'

  React.useEffect(() => {
    ;(async () => {
      await fetch(`${url}/items`, { method: 'GET' })
        .then(res => res.json())
        .then(data => setItems(data))
      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading && [...Array(2)].map((_, index) => <Skeleton key={index} />)}
        {!isLoading && items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  )
}

export default Home
