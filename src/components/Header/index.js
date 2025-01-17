import {FaShoppingCart} from 'react-icons/fa'
import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {totalDishes} = props
  return (
    <nav className="nav-container">
      <h1>UNI Resto Cafe</h1>
      <div className="cart-icon-value-container">
        <p className="myOrders">My Orders</p>
        <IoCartOutline className="cart-icon" />
        <div className="quantity-container">
          <p className="cart-quantity">{totalDishes}</p>
        </div>
      </div>
    </nav>
  )
}

export default Header
