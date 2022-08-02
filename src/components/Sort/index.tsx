import React from 'react'
import { useSelector } from 'react-redux'
import { ISortInfo, SortPropertyEnum } from '../../redux/filter/types'
import { RootState } from '../../redux/store'

import styles from './Sort.module.sass'

export const sortList: ISortInfo[] = [
  { name: 'популярности (DESK)', sortBy: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortBy: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESK)', sortBy: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortBy: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESK)', sortBy: SortPropertyEnum.NAME_DESC },
  { name: 'алфавиту (ASC)', sortBy: SortPropertyEnum.NAME_ASC },
]

interface ISortProps {
  onChangeSort: (obj: ISortInfo) => void
}

const Sort: React.FC<ISortProps> = ({ onChangeSort }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [order, setOrder] = React.useState(false)
  const sortRef = React.useRef<HTMLDivElement>(null)
  const { sort } = useSelector((state: RootState) => state.filter)

  const clickOnSortHandler = (obj: ISortInfo) => {
    onChangeSort(obj)
    setIsOpen(false)
  }

  type OpenPopUp = MouseEvent & { path: Node[] }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as OpenPopUp
      if (sortRef.current && !_event.path.includes(sortRef.current)) setIsOpen(false)
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.label}>
        <div>
          <svg
            onClick={() => setOrder(prev => !prev)}
            style={order ? { transformOrigin: 'center center', transform: 'rotate(180deg)' } : {}}
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            />
          </svg>
          <b>Сортировка&nbsp;по:</b>
        </div>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <ul>
            {sortList.map((obj, idx) => (
              <li
                key={idx}
                className={sort.sortBy === obj.sortBy ? 'active' : ''}
                onClick={() => clickOnSortHandler(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
