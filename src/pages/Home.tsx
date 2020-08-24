import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Categories, BookItem, SortPopup } from '../components'
import { getBooks, BookType } from '../redux/reducers/books'
import { AppStateType } from '../redux/store'
import { setActiveCategory } from '../redux/reducers/category'
import { setSortBy } from '../redux/reducers/sort'
import { addBookToCart } from '../redux/reducers/cart'

const Home = () => {

  const dispatch = useDispatch()
  const { books, categories, activeCategory, sortData, sortType, sortOrder, cartItems } = useSelector((state: AppStateType) => {
    return {
      books: state.books.books,
      categories: state.category.categories,
      activeCategory: state.category.activeCategory,
      sortData: state.sort.sortData,
      sortType: state.sort.sortBy.sortType,
      sortOrder: state.sort.sortBy.sortOrder,
      cartItems: state.cart.items
    }
  })

  const onCategoryItemClick = (index: number) => {
    dispatch(setActiveCategory(index))
  }
  const onSortItemClick = (type: string, order: string) => {
    dispatch(setSortBy(type, order))
  }
  const onAddBookToCartClick = (obj: BookType) => {
    dispatch(addBookToCart(obj))
  }

  useEffect(() => {
    dispatch(getBooks(activeCategory, sortType, sortOrder))
  }, [activeCategory, sortType, sortOrder])

  return (
    <section className="products">
      <div className="container">
        <div className="products__inner">
          <Categories categoryNames={categories} activeCategory={activeCategory}
            onCategoryItemClick={onCategoryItemClick} />
          <div className="products__container">
            <SortPopup sortData={sortData} onSortItemClick={onSortItemClick} />
            <div className="products__list">
              {
                books && books.map((obj: BookType) => <BookItem
                  addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                  key={obj.id} obj={obj}
                  onAddBookToCartClick={onAddBookToCartClick} />)
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home