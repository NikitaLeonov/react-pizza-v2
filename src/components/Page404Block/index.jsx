import styles from './Page404Block.module.sass'

const Page404Block = props => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутсвует в нашем интернет-магазине
      </p>
    </div>
  )
}

export default Page404Block
