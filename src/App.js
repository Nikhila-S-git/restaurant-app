import {Route, Switch, BrowserRouter} from 'react-router-dom'

import {Component} from 'react'
import CartContext from './components/cartContext/cartContext'
import Menu from './components/Home'
import Login from './components/LoginRoute'
import Cart from './components/CartRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// write your code here
class App extends Component {
  state = {cartList: [], dishList: []}

  incrementCartItemQuantity = dish => {
    this.setState(prevState => {
      const updatedDishList = prevState.dishList.map(each => {
        if (each.dish_id === dish.dish_id) {
          return {...each, dishQuantity: each.dishQuantity + 1}
        }
        return each
      })
      if (!prevState.dishList.find(each => each.dish_id === dish.dish_id)) {
        updatedDishList.push({...dish, dishQuantity: 1})
      }

      return {dishList: updatedDishList}
    })
  }

  decrementCartItemQuantity = dish => {
    this.setState(prevState => {
      const updatedDishList = prevState.dishList.map(each => {
        if (each.dish_id === dish.dish_id) {
          return {...each, dishQuantity: Math.max(each.dishQuantity - 1, 0)}
        }
        return each
      })
      return {dishList: updatedDishList}
    })
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(each => {
        if (each.dish_id === dish.dish_id) {
          return {...each, dishQuantity: each.dishQuantity + 1}
        }
        return each
      })
      if (!prevState.cartList.find(each => each.dish_id === dish.dish_id)) {
        updatedCartList.push({...dish, dishQuantity: 1})
      }

      return {cartList: updatedCartList}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.dish_id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList, dishList} = this.state
    return (
      <CartContext.Provider
        value={{
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          cartList,
          addCartItem: this.addCartItem,
          dishList,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Menu} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
