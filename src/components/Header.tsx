import React from 'react'
import { Link, withRouter, useLocation } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { useSelector } from 'react-redux'
import { AppStateType } from '../redux/store'
import SearchForm from './searchForm'

const Header = () => {
  const { totalCount, totalPrice } = useSelector((state: AppStateType) => {
    return {
      totalCount: state.cart.totalCount,
      totalPrice: state.cart.totalPrice
    }
  })
  const location = useLocation()

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>
          <div className="logo">
            <Link to='/'><img src={logo} alt="logo" /></Link>
          </div>
          {
            location.pathname === '/cart' ? null : <SearchForm />
          }
          <div className="header__info-block">
            <div className="header__cart">
              <span className="header__cart-text">Your cart</span>
              <span className="header__cart-count">({totalCount} items)</span>
            </div>
            <div className="header__price">
              <span>${totalPrice}</span>
              <button className="header__price-btn"><Link to='/cart'>Checkout</Link></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header