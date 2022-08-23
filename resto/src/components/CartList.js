import { Card } from '@mui/material'
import React from 'react'
import Cart from './Cart'

const CartList = ({state}) => {
  return (
    <div>
        <h1>My Cart</h1>
        {state.cart.map(cart =>(
            <Cart id={cart.id} name={cart.name} price={cart.price} quantity={cart.quantity}/>
        ))}
    </div>
  )
}

export default CartList