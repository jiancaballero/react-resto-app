import { Card } from "@mui/material";
import React from "react";
import Cart from "./Cart";

const CartList = ({ state, dispatch }) => {
  return (
    <div>
      <h1>My Cart</h1>
      {state.cart.map((cart) => {
        if (cart.quantity > 0) {
          return (
            <Cart
              dispatch={dispatch}
              id={cart.id}
              name={cart.name}
              price={cart.price}
              quantity={cart.quantity}
              image={cart.image}
            />
          );
        }
      })}
    </div>
  );
};

export default CartList;
