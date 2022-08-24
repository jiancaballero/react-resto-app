import React from "react";
import { Paper, Stack, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
const Cart = ({ id, name, price, quantity, image, dispatch }) => {
  return (
    <Paper sx={{ width: "450px" }} elevation={4}>
      <Stack spacing={4} direction="row">
        <Stack spacing={2}>
          {" "}
          <img src={image} width="150px" height="150px"></img>
        </Stack>
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
      <IconButton
        aria-label="send"
        size="large"
        onClick={() => {
          dispatch({ type: "DECREASE_CART_QUANTITY", payload: { id: id } });
        }}
      >
        <RemoveCircleOutlineIcon fontSize="large" />
      </IconButton>
      <IconButton
        aria-label="send"
        size="large"
        onClick={() => {
          dispatch({ type: "INCREASE_CART_QUANTITY", payload: { id: id } });
        }}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <IconButton
            aria-label="delete item"
            onClick={() => {
              dispatch({ type: "DELETE_CART_ITEM", payload: { id: id } });
            }}
          >
            <DeleteIcon />
          </IconButton>
    </Paper>
  );
};

export default Cart;
