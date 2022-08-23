import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Paper, IconButton, Stack, Box, Button } from "@mui/material/";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Item = ({ id, name, price, quantity, description, image, dispatch,orderItems }) => {
  return (
    <Paper elevation={8} sx={{ borderRadius: "15px 15px 0 0" }}>
      <div className="ItemCardImage">
        <img src={image} />
      </div>
      <div className="ItemCardBody">
        <h5>{name}</h5>
        <h5>
          <i class="fa-solid fa-peso-sign" /> {price}
        </h5>
      </div>
      <p>{description}</p>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" component="div">
          {quantity > 0 && (
            <IconButton
              aria-label="send"
              size="large"
              onClick={() => {
                dispatch({ type: "DECREASE_QUANTITY", payload: { id: id } });
              }}
            >
              <RemoveCircleOutlineIcon fontSize="large" />
            </IconButton>
          )}
          <h3>{quantity}</h3>
          <IconButton
            aria-label="send"
            size="large"
            onClick={() => {
              dispatch({ type: "INCREASE_QUANTITY", payload: { id: id } });
            }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Stack>
        <button className="AddCartButton">
          <IconButton onClick={()=>orderItems(id)}> 
            <ShoppingCartIcon fontSize="large"/>
          </IconButton>
        </button>
      </Stack>
    </Paper>
  );
};

export default Item;
