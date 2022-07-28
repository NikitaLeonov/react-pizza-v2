import React from 'react'

import styles from './Categories.module.sass'

const Categories = ({ categoryId, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((item, index) => (
          <li key={index} onClick={() => onChangeCategory(index)} className={categoryId === index ? styles.active : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
