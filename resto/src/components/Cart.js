import React from "react";
import { Paper, Stack } from "@mui/material";
const Cart = ({ id, name, price, quantity }) => {
  return (
    <Paper sx={{ width: "450px" }} elevation={4}>
      <Stack spacing={4} direction="row">
        <Stack spacing={2}>
          {" "}
          <h1>Name:{name}</h1>
        </Stack>
        <Stack spacing={2}>
          {" "}
          <p>Price: {price}</p>
        </Stack>
        <Stack spacing={2}>
          {" "}
          <p>Quantity:{quantity}</p>
        </Stack>
        <Stack spacing={2}>
          <p>SubTotal: {quantity * price}</p>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Cart;
