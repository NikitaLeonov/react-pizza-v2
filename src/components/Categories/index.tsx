import React from 'react'

import styles from './Categories.module.sass'

type CategoriesProps = {
  categoryId: number
  onChangeCategory: (idx: number) => void
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => (
  <div className={styles.categories}>
    <ul>
      {categories.map((item, idx) => (
        <li
          key={idx}
          onClick={() => onChangeCategory(idx)}
          className={categoryId === idx ? styles.active : ''}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
))

export default Categories
