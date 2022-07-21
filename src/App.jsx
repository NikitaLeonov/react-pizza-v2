import React from 'react'

import Header from './components/Header'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'
import Categories from './components/Categories'

import pizzas from './assets/pizzas.json'

import './sass/app.sass'

function App() {
  const [pizzas, SetPizzas] = React.useState([])

  const url = 'https://62d93df49eedb6996356fe1c.mockapi.io/'

  fetch(`${url}/items`, { method: 'GET' })
    .then(res => res.json())
    .then(data => console.log(data))

  return (
    <div className='App'>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {pizzas.map(pizza => (
                <PizzaBlock key={pizza.id} {...pizza} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
