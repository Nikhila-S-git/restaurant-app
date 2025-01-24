import CartContext from '../cartContext/cartContext'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

const Cart = () => {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value

        return (
          <>
            {cartList.length === 0 ? (
              <>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  className="emptyCart"
                />
                <h1>Empty Cart</h1>
              </>
            ) : (
              <>
                <Header />
                {cartList.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => removeAllCartItems()}
                    className="removeAllBtn"
                  >
                    Remove All
                  </button>
                ) : null}
                <ul>
                  {cartList.map(each => (
                    <CartItem dish={each} />
                  ))}
                </ul>
              </>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
