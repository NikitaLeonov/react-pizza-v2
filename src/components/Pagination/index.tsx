import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.sass'

type PaginationProps = { onChangePage: (page: number) => void }

const Pagination = ({ onChangePage }: PaginationProps) => (
  <ReactPaginate
    className={styles.root}
    breakLabel='...'
    nextLabel='❯'
    previousLabel='❮'
    onPageChange={event => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3} // fix amount cause mockApi
  />
)

export default Pagination
