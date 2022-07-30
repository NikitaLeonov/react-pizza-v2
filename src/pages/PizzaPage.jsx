import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PizzaPage = props => {
  const [pizza, setPizza] = React.useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62d93df49eedb6996356fe1c.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        alert('Не удалось загрузить страницу')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  return (
    <>
      {!pizza && 'Загрузка...'}
      {pizza && (
        <div>
          <img src={pizza.imageUrl} width={260} alt='пицца' />
          <h2>{pizza.name}</h2>
          <h4>{pizza.price}</h4>
        </div>
      )}
    </>
  )
}

export default PizzaPage
