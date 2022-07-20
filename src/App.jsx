import Header from './components/Header'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'
import './sass/app.sass'

const Categories = () => {
  return (
    <div className='categories'>
      <ul>
        <li className='active'>Все</li>
        <li>Мясные</li>
        <li>Вегетарианская</li>
        <li>Гриль</li>
        <li>Острые</li>
        <li>Закрытые</li>
      </ul>
    </div>
  )
}

function App() {
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
              <PizzaBlock title='Мексиканская' price={500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
