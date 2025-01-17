import {Component} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import MenuItem from '../MenuItem'
import CountContext from '../CountContext/countContext'
import './index.css'

class Menu extends Component {
  state = {
    tableMenuList: [],
    menuId: 0,
    categoryDishes: [],
    dishQuantities: {},
    cart: [],
  }

  componentDidMount() {
    this.getmenuList()
  }

  getmenuList = async () => {
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      options,
    )
    const data = await response.json()
    console.log(data)
    const {table_menu_list} = data[0]
    const tableMenuList = table_menu_list.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryid: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))
    const qunatities = {}
    const cart = []
    tableMenuList[0].categoryDishes.forEach(dish => {
      qunatities[dish.dish_id] = 0
      cart.push({dish_id: dish.dish_id, quantity: 0})
    })
    this.setState({
      tableMenuList,
      menuId: tableMenuList[0].menuCategoryid,
      categoryDishes: tableMenuList[0].categoryDishes,
      dishQuantities: qunatities,
      cart,
    })
  }

  clickMenuItem = id => {
    const {tableMenuList} = this.state
    const filteredList = tableMenuList.filter(
      each => each.menuCategoryid === id,
    )
    const qunatities = {}
    const cart = []
    filteredList[0].categoryDishes.forEach(dish => {
      qunatities[dish.dish_id] = 0
      cart.push({dish_id: dish.dish_id, quantity: 0})
    })
    this.setState({
      menuId: id,
      categoryDishes: filteredList[0].categoryDishes,
      dishQuantities: qunatities,
    })
  }

  renderMenuDetails = () => {
    const {menuId, tableMenuList} = this.state
    return (
      <ul className="menuItemsContainer">
        {tableMenuList.map(each => (
          <MenuItem
            menuItem={each}
            clickMenuItem={this.clickMenuItem}
            isActive={menuId === each.menuCategoryid}
            key={each.menuCategoryid}
          />
        ))}
      </ul>
    )
  }

  updateAddQuantity = id => {
    this.setState(prevState => {
      const updatedQuantities = {
        ...prevState.dishQuantities,
        [id]: (prevState.dishQuantities[id] || 0) + 1,
      }

      const updatedCart = [...prevState.cart]
      const dishIndex = updatedCart.findIndex(dish => dish.dish_id === id)
      if (dishIndex === -1) {
        updatedCart.push({dish_id: id, quantity: 1})
      } else {
        updatedCart[dishIndex].quantity = updatedQuantities[id]
      }

      return {
        dishQuantities: updatedQuantities,
        cart: updatedCart,
      }
    })
  }

  updateDeleteQuantity = id => {
    this.setState(prevState => {
      const updatedQuantities = {
        ...prevState.dishQuantities,
        [id]: Math.max((prevState.dishQuantities[id] || 0) - 1, 0), // Decrease the quantity (min 0)
      }

      const updatedCart = [...prevState.cart]
      const dishIndex = updatedCart.findIndex(dish => dish.dish_id === id)
      if (dishIndex !== -1) {
        if (updatedQuantities[id] === 0) {
          updatedCart.splice(dishIndex, 1) // Remove dish from cart if quantity is 0
        } else {
          updatedCart[dishIndex].quantity = updatedQuantities[id] // Update quantity in cart
        }
      }

      return {
        dishQuantities: updatedQuantities,
        cart: updatedCart, // Update the cart with new quantities
      }
    })
  }

  renderDishesDetails = () => {
    const {categoryDishes, dishQuantities} = this.state
    return (
      <ul>
        {categoryDishes.map(each => (
          <DishItem
            dish={each}
            key={each.dish_id}
            updateAddQuantity={this.updateAddQuantity}
            updateDeleteQuantity={this.updateDeleteQuantity}
            count={dishQuantities[each.dish_id]}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {cart} = this.state
    const filteredCart = cart.filter(each => each.quantity !== 0)
    const totalDishes =
      filteredCart.length === 0
        ? 0
        : filteredCart.reduce((total, dish) => total + dish.quantity, 0)
    return (
      <>
        <Header totalDishes={totalDishes} />
        <h1>Nxt Cafe</h1>
        {this.renderMenuDetails()}
        {this.renderDishesDetails()}
      </>
    )
  }
}

export default Menu
