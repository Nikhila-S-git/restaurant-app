import React from 'react'

const CountContext = React.createContext({
  count: 0,
  addQuantity: () => {},
  deleteQuantity: () => {},
})

export default CountContext
