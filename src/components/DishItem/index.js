import CountContext from '../CountContext/countContext.js'

import './index.css'

const DishItem = props => {
  const {dish, updateAddQuantity, updateDeleteQuantity, count} = props
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
  const onClickPlus = () => {
    updateAddQuantity(dish_id)
  }
  const onClickMinus = () => {
    updateDeleteQuantity(dish_id)
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
          <div className="buttonsContainer">
            <button className="iconButton" onClick={onClickMinus} type="button">
              -
            </button>
            <p>{count}</p>
            <button className="iconButton" onClick={onClickPlus} type="button">
              +
            </button>
          </div>
        ) : (
          <p className="notAvailable">Not Available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="customizations">Customizations available</p>
        )}
      </div>
      <p className="calories">{dish_calories} calories</p>
      <img src={dish_image} className="dishImage" />
    </li>
  )
}

export default DishItem
