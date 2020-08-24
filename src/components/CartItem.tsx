import React from 'react'

type PropsType = {
  price: number
  imageUrl: string
  name: string,
  id: number,
  onRemoveItemClick: (id: number) => void,
  booksTotalCount: number,
  booksTotalPrice: number,
  onQtyUpClick: (id: number) => void
  onQtyDownClick: (id: number) => void
}

const cartItem = ({ imageUrl, name, price, id, onRemoveItemClick, booksTotalCount, booksTotalPrice, onQtyUpClick, onQtyDownClick }: PropsType) => {
  return (
    <div className="cart__item">
      <div className="cart__item-desc">
        <div className="cart__item-image">
          <img src={imageUrl} alt="book" />
        </div>
        <div className="cart__item-info">
          <div className="cart__item-title">
            {name}
          </div>
          <div className="cart__item-price">{price} $</div>
        </div>
      </div>
      <div className="cart__item-checkout">
        <div className="cart__item-quantity">
          <div className="cart__item-quantity-label">Quantity</div>
          <div className="cart__item-count">
            <button onClick={() => onQtyDownClick(id)} className="cart__item-count-minus">-</button>
            <span>{booksTotalCount}</span>
            <button onClick={() => onQtyUpClick(id)} className="cart__item-count-plus">+</button>
          </div>
        </div>
        <div className="cart__item-total">${booksTotalPrice}</div>
        <button onClick={() => onRemoveItemClick(id)} className="cart__item-remove-btn">Remove</button>
      </div>
    </div>
  )
}

export default cartItem