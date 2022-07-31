import React from 'react'

import styles from './Categories.module.sass'

type CategoriesProps = {
  categoryId: number
  onChangeCategory: (idx: number) => void
}

const Categories: React.FC<CategoriesProps> = ({ categoryId, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
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
  )
}

export default Categories
