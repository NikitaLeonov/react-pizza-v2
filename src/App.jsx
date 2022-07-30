import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import Cart from './pages/Cart'
import Home from './pages/Home'
import PizzaPage from './pages/PizzaPage'
import Page404 from './pages/Page404'

import './sass/app.sass'
import MainLayout from './components/layouts/MainLayout'

export const SearchContext = React.createContext()

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='pizza/:id' element={<PizzaPage />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
