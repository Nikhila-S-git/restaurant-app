import {Component} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import MenuItem from '../MenuItem'
import './index.css'

class Menu extends Component {
  state = {
    tableMenuList: [],
    menuId: 0,
    categoryDishes: [],
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
    const {table_menu_list} = data[0]
    const tableMenuList = table_menu_list.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryid: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))
    const updatedCategoryDishes = tableMenuList[0].categoryDishes.map(each => ({
      ...each,
      dishQuantity: 0,
    }))
    this.setState({
      tableMenuList,
      menuId: tableMenuList[0].menuCategoryid,
      categoryDishes: updatedCategoryDishes,
    })
  }

  clickMenuItem = id => {
    const {tableMenuList} = this.state
    const filteredList = tableMenuList.filter(
      each => each.menuCategoryid === id,
    )
    const updatedCategoryDishes = filteredList[0].categoryDishes.map(each => ({
      ...each,
      dishQuantity: 0,
    }))
    this.setState({
      menuId: id,
      categoryDishes: updatedCategoryDishes,
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

  renderDishesDetails = () => {
    const {categoryDishes} = this.state
    return (
      <ul>
        {categoryDishes.map(each => (
          <DishItem dish={each} key={each.dish_id} />
        ))}
      </ul>
    )
  }

  render() {
    const {cart, categoryDishes} = this.state
    return (
      <>
        <Header />
        <div className="contentContainer">
          {this.renderMenuDetails()}
          {this.renderDishesDetails()}
        </div>
      </>
    )
  }
}

export default Menu
