import CartContext from '../cartContext/cartContext'

import './index.css'

const CartItem = props => {
  const {dish} = props
  const {dish_image, dish_name, dish_price, dish_id} = dish
  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          dishList,
        } = value

        const currentDish = dishList.find(each => each.dish_id === dish_id)
        const dishQuantity = currentDish ? currentDish.dishQuantity : 0

        const onClickMinus = () => {
          if (dishQuantity <= 1) {
            removeCartItem(dish_id)
          }
          decrementCartItemQuantity(dish)
        }

        return (
          <li className="cartDishContainer">
            <img src={dish_image} className="dishImage" />
            <div className="nameQunatityContainer">
              <p>{dish_name}</p>
              <>
                <div className="buttonsContainer">
                  <button
                    className="iconButton"
                    onClick={onClickMinus}
                    type="button"
                  >
                    -
                  </button>
                  <p>{dishQuantity}</p>
                  <button
                    className="iconButton"
                    onClick={() => {
                      incrementCartItemQuantity(dish)
                    }}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </>
            </div>
            <button
              className="removeBtn"
              type="button"
              onClick={() => {
                removeCartItem(dish_id)
              }}
            >
              Remove Item
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
