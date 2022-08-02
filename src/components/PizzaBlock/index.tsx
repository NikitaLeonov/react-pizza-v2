import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch as useDispatch } from '../../redux/store'
import { addItem } from '../../redux/cart/slice'
import { cartItemByIdSelector } from '../../redux/cart/selectors'
import { CartItem } from '../../redux/cart/types'

import styles from './PizzaBlock.module.sass'

type PizzaBlockProps = {
  id: string
  name: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ name, price, imageUrl, sizes, types, id }) => {
  const dispatch = useDispatch()
  const typeNames: string[] = ['тонкое', 'традиционное']

  const [activeSize, setActiveSize] = React.useState<number>(0)
  const [activeType, setActiveType] = React.useState<number>(0)

  const cartItem = useSelector(cartItemByIdSelector(id))
  const addedCount: number = cartItem ? cartItem.count : 0

  const onClickAdd = (): void => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    }

    dispatch(addItem(item))
  }

  return (
    <div className={styles.BlockWrapper}>
      <div className={styles.Block}>
        <div className={styles.info}>
          <Link to={`pizza/${id}`}>
            <img src={imageUrl} alt='Pizza' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <div className={styles.selector}>
            <ul>
              {types.map((type, idx) => (
                <li
                  key={idx}
                  className={activeType === idx ? styles.active : ''}
                  onClick={() => setActiveType(idx)}
                >
                  {typeNames[type]}
                </li>
              ))}
            </ul>
            <ul>
              {sizes.map((size, idx) => (
                <li
                  key={idx}
                  className={activeSize === idx ? styles.active : ''}
                  onClick={() => setActiveSize(idx)}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.bottom}>
            <span className={styles.price}>от {price} ₽</span>
            <button onClick={() => onClickAdd()} className='button button--outline button--add'>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                  fill='white'
                />
              </svg>
              <span>Добавить</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
