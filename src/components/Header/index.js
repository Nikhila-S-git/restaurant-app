import Cookie from 'js-cookie'
import CartContext from '../cartContext/cartContext'
import {IoCartOutline} from 'react-icons/io5'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onclickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const totalDishes = cartList.length
        return (
          <nav className="nav-container">
            <Link to="/" className="linkHeading">
              <h1>UNI Resto Cafe</h1>
            </Link>
            <div className="cartBtnContainer">
              <div className="cart-icon-value-container">
                <p className="myOrders">My Orders</p>
                <Link to="/cart">
                  <button className="iconBtn" type="button" data-testid="cart">
                    <IoCartOutline className="cart-icon" />
                  </button>
                </Link>
                <div className="quantity-container">
                  <p className="cart-quantity">{totalDishes}</p>
                </div>
              </div>
              <button
                className="logoutBtn"
                type="button"
                onClick={onclickLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
