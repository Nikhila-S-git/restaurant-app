import CartContext from '../cartContext/cartContext'
import './index.css'

const DishItem = props => {
  const {dish} = props
  const {
    dish_image,
    dish_name,
    dish_price,
    dish_description,
    dish_currency,
    dish_calories,
    addonCat,
    dish_Availability,
    dish_id,
  } = dish
  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          cartList,
          addCartItem,
          dishList,
        } = value

        const currentDish = dishList.find(each => each.dish_id === dish_id)
        const dishQuantity = currentDish ? currentDish.dishQuantity : 0

        const onClickPlus = () => {
          incrementCartItemQuantity(dish)
        }
        const onClickMinus = () => {
          decrementCartItemQuantity(dish)
        }

        const onClickAddToCart = () => {
          addCartItem({...dish, dishQuantity})
        }

        return (
          <li className="dishItemContainer">
            <div className="dishDiscriptionContainer">
              <h1 className="dishName">{dish_name}</h1>
              <p className="price">
                {dish_currency} {dish_price}
              </p>
              <p className="description">{dish_description}</p>
              {dish_Availability === true ? (
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
                      onClick={onClickPlus}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                <p className="notAvailable">Not Available</p>
              )}
              {addonCat.length !== 0 && (
                <p className="customizations">Customizations available</p>
              )}
              {dishQuantity > 0 && (
                <button className="addToCartBtn" onClick={onClickAddToCart} type="button">
                  Add to Cart
                </button>
              )}
            </div>
            <p className="calories">{dish_calories} calories</p>
            <img src={dish_image} className="dishImage" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
