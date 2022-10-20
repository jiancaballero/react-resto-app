import { Box } from "@mui/material";
import React from "react";
import Cart from "./Cart";

const CartList = ({ state, dispatch }) => {
  
  
  return (
    <Box sx={{ height: "400px", overflow: "auto" }}>
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
              itemPrice={state.items.forEach(
                (item) => item.id === cart.id && item.price
              )}
            />
          );
        }
      })}
    </Box>
  );
};

export default CartList;
