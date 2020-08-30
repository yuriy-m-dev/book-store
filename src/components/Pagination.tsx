import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../redux/store'
import { setCurrentPage } from '../redux/reducers/books'
import cn from 'classnames'

const Pagination = () => {

  const dispatch = useDispatch()
  const {totalCount, pageSize, currentPage} = useSelector((state: AppStateType) => {
    return {
      totalCount: state.books.totalCount,
      pageSize: state.books.pageSize,
      currentPage: state.books.currentPage
    }
  })

  const pageCount = Math.ceil(totalCount / pageSize)
  const pages = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  const onPaginationItemClick = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber))
  }

  return (
    <ul className='pagination'>
      {
        pages.map(p => <li className={cn({active: currentPage === p})} key={p} onClick={() => onPaginationItemClick(p)}>{p}</li>)
      }
    </ul>
  )
}

export default Pagination