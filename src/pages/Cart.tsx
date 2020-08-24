import React from 'react'
import { Link } from 'react-router-dom'
import { CartItem } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../redux/store'
import { removeBookFromCart, clearCart, qtyUp, qtyDown } from '../redux/reducers/cart'
import { BookType } from '../redux/reducers/books'

const Cart = () => {

  const dispatch = useDispatch()
  const { totalCount, totalPrice, items } = useSelector((state: AppStateType) => {
    return {
      totalCount: state.cart.totalCount,
      totalPrice: state.cart.totalPrice,
      items: state.cart.items
    }
  })

  const booksList = Object.keys(items).map(key => items[key].items[0])

  const onRemoveItemClick = (id: number) => {
    dispatch(removeBookFromCart(id))
  }
  const onClearCartClick = () => {
    window.confirm('Do you really want to clean the basket?') && dispatch(clearCart())
  }
  const onQtyUpClick = (id: number) => {
    dispatch(qtyUp(id))
  }
  const onQtyDownClick = (id: number) => {
    dispatch(qtyDown(id))
  }
  const onPayBtnClick = () => {
    console.log(items)
  }

  return (
    <div className="cart">
      <div className="container">
        {
          totalCount ? <>
            <div className="cart__inner">
              <div className="cart__top-row">
                <div className="cart__label">
                  Shopping basket details
                </div>
                <span onClick={onClearCartClick} className="cart__clear-btn">Clear cart</span>
              </div>
              {
                booksList.map((obj: BookType) => <CartItem booksTotalCount={items[obj.id].items.length}
                  onQtyDownClick={onQtyDownClick}
                  onQtyUpClick={onQtyUpClick}
                  booksTotalPrice={items[obj.id].totalPrice}
                  key={obj.id} price={obj.price} imageUrl={obj.imageUrl}
                  name={obj.name} id={obj.id} onRemoveItemClick={onRemoveItemClick} />)
              }
            </div>
            <div className="cart__totals">
              <div className="cart__message">
                <span>You have {totalCount} items for a total of <span className="cart__message-price">${totalPrice}</span> in your basket.</span>
                <button className="cart__totals-come-back-btn"><Link to='/'>Come back</Link></button>
              </div>
              <div className="cart__totals-inner">
                <div className="cart__totals-price">
                  <span>Total:</span> ${totalPrice}
                </div>
                <button onClick={onPayBtnClick} className="cart__totals-pay-btn">Pay</button>
              </div>
            </div>
          </>
            : <div className="cart__empty">Your Shopping Cart Is Empty</div>
        }

      </div>
    </div>
  )
}

export default Cart