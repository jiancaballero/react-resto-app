import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  Paper,
  IconButton,
  Stack,
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material/";
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
    <Card sx={{ position: "relative", flexWrap: "wrap" }} elevation={0}>
      <Box sx={{ position: "absolute", top: "0", right: "0" }}>
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

      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
        sx={{ borderRadius: "15px" }}
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <i class="fa-solid fa-peso-sign"></i>
            {price}
          </Typography>
        </Box>
        <Typography gutterBottom variant="body2" component="div">
          {description}
        </Typography>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", padding: ".3em" }}
            >
              {quantity > 0 && (
                <IconButton
                  sx={{ padding: "none" }}
                  aria-label="send"
                  size="medium"
                  onClick={() => {
                    dispatch({
                      type: "DECREASE_QUANTITY",
                      payload: { id: id },
                    });
                  }}
                >
                  <RemoveCircleOutlineIcon fontSize="inherit" />
                </IconButton>
              )}
              <h2>{quantity}</h2>
              <IconButton
                aria-label="send"
                size="medium"
                onClick={() => {
                  dispatch({ type: "INCREASE_QUANTITY", payload: { id: id } });
                }}
              >
                <AddCircleIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Item;
