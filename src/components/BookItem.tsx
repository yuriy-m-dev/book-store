import React from 'react'
import { BookType } from '../redux/reducers/books'

type PropsType = {
  obj: BookType,
  onAddBookToCartClick: (obj: BookType) => void,
  addedCount: number
}

const BookItem = ({ obj, onAddBookToCartClick, addedCount }: PropsType) => {
  return (
    <div className="products__item">
      <div className="products__image">
        <img src={obj.imageUrl} alt="book" />
      </div>
      <div className="products__title">{obj.name}</div>
      <div className="products__price">${obj.price}</div>
      <button onClick={() => onAddBookToCartClick(obj)} className="products__btn">
        <span>Add to cart </span> <span className="products__btn-count">{addedCount}</span>
      </button>
    </div>
  )
}

export default BookItem