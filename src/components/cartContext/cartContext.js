import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  dishList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
  quantity: 0,
})

export default CartContext
