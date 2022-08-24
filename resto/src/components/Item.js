import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Paper, IconButton, Stack, Box, Button } from "@mui/material/";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditItem from "./EditItem";
const Item = ({
  id,
  name,
  price,
  quantity,
  description,
  image,
  dispatch,
  orderItems,
  deleteItem,
  category,
}) => {
  // FIXME: does not stay on page  when item is on filtered
  return (
    <Paper elevation={8} sx={{ borderRadius: "15px" ,position:"relative"}}>
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
      <Box sx={{position:"absolute",top:"0",right:"0"}}>
        <EditItem
          dispatch={dispatch}
          id={id}
          name={name}
          price={price}
          category={category}
          description={description}
          image={image}
        />
        <IconButton
          aria-label="delete item"
          onClick={(e) => {
            {
              dispatch({ type: "DELETE_ITEM", payload: { id: id } });
              dispatch({ type: "TOTAL_AMOUNT" });
              dispatch({ type: "COUNT_CART" });
              e.preventDefault();
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
            <h2>{quantity}</h2>
            <IconButton
              aria-label="send"
              size="large"
              onClick={() => {
                dispatch({ type: "INCREASE_QUANTITY", payload: { id: id } });
              }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <button className="AddCartButton">
          <IconButton
            onClick={(e) => {
              dispatch({ type: "ORDER_ITEM", payload: { id: id } });
              dispatch({ type: "TOTAL_AMOUNT" });
              dispatch({ type: "COUNT_CART" });
              dispatch({ type: "RESET_QUANTITY", payload: { id: id } });
            }}
          >
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
        </button>
      </Stack>
    </Paper>
  );
};

export default Item;
