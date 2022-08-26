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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from "@mui/icons-material/Delete";
import EditItem from "./EditItem";
import Ratings from "./Ratings";
import { bgcolor } from "@mui/system";
const Item = ({
  id,
  name,
  price,
  quantity,
  description,
  image,
  ratings,
  dispatch,
  orderItems,
  deleteItem,
  category,
}) => {
  return (
    <Card sx={{ position: "relative", height: "100%", display:"flex", flexDirection:"column" }} elevation={0}>
      <Box
        sx={{
          position: "absolute",
          top: "5px",
          left: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
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
          sx={{ background: "white" }}
          size="small"
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
          <DeleteIcon fontSize="small" />
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
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color="text.main"
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.main"
          >
            {price}
          </Typography>
        </Box>

        {ratings != null && (
          <>
            <Ratings ratings={ratings} />
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              color="text.main"
            >
              {description}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions sx={{marginTop:"auto"}}>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: ".3em",
                borderRadius: "30px",
              }}
              bgcolor="secondary.light"
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
              <Typography variant="h6" color="text.main">
                {quantity}
              </Typography>
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
            <AddShoppingCartIcon fontSize="large" color="text" />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Item;
