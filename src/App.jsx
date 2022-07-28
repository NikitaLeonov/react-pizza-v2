import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Page404 from './pages/Page404'

import './sass/app.sass'

export const SearchContext = React.createContext()

function App() {
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className='App'>
      <div className='wrapper'>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className='content'>
            <Routes>
              Cart
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  )
}

export default App
