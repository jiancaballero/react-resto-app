import React from "react";
import { Paper, Stack, IconButton, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import axios from "axios";
const Cart = ({ id, name, price, quantity, image, dispatch }) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
      }}
      scroll
    >
      <Box sx={{ display: "flex", gap: "10px", padding: "1em 0" }}>
        <Box sx={{ height: "120px", width: "200px" }}>
          <img src={image} width="100%" height="100%"></img>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap:"10px"
            }}
          >
            <Box >
              <h5>{name}</h5>
              <small>({price}.00)</small>
            </Box>
            {price*quantity}.00
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label="send"
                size="medium"
                onClick={() => {
                  axios
                    .put(`https://react-resto-app-be.herokuapp.com/api/cart/${id}`, {
                      
                      quantity: quantity - 1,
                    })
                    .then(() => {
                      dispatch({
                        type: "DECREASE_CART_QUANTITY",
                        payload: { id: id },
                      });
                      dispatch({ type: "TOTAL_AMOUNT" });
                      dispatch({ type: "COUNT_CART" });
                    });
                }}
              >
                <RemoveCircleOutlineIcon fontSize="medium" />
              </IconButton>
              <p>{quantity}</p>
              <IconButton
                aria-label="send"
                size="medium"
                onClick={() => {
                  axios
                    .put(`https://react-resto-app-be.herokuapp.com/api/cart/${id}`, {
                      
                      quantity: quantity + 1,
                    })
                    .then(() => {
                      dispatch({
                        type: "INCREASE_CART_QUANTITY",
                        payload: { id: id },
                      });
                      dispatch({ type: "TOTAL_AMOUNT" });
                      dispatch({ type: "COUNT_CART" });
                    });
                }}
              >
                <AddCircleIcon fontSize="medium" />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                aria-label="delete item"
                onClick={() => {
                  axios
                    .delete(`https://react-resto-app-be.herokuapp.com/api/cart/${id}`).then(()=>{
                      dispatch({ type: "DELETE_CART_ITEM", payload: { id: id } });
                      dispatch({ type: "TOTAL_AMOUNT" });
                      dispatch({ type: "COUNT_CART" });
                    })
                  
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Cart;
