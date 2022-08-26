import { IconButton } from "@mui/material";
import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
const SortItem = ({ dispatch }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Tooltip title="Sort Items" placement="left">
        <IconButton
         
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <SortIcon fontSize="large" color="primary" />
        </IconButton>
      </Tooltip>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
              type: "SORT_ITEMS",
              payload: { sortBy: "name" },
            });
          }}
        >
          <SortByAlphaIcon fontSize="small" sx={{ marginRight: ".3em" }} />
          Name (A-Z)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
              type: "SORT_ITEMS",
              payload: { sortBy: "priceAsc" },
            });
          }}
        >
          <CurrencyRubleIcon fontSize="small" sx={{ marginRight: ".3em" }} />
          Price (Lowest-Highest)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
              type: "SORT_ITEMS",
              payload: { sortBy: "priceDsc" },
            });
          }}
        >
          <CurrencyRubleIcon fontSize="small" sx={{ marginRight: ".3em" }} />
          Price (Highest-Lowest)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
              type: "SORT_ITEMS",
              payload: { sortBy: "ratings" },
            });
          }}
        >
          <StarIcon fontSize="small" sx={{ marginRight: ".3em" }} />
          Ratings (Highest-Lowest)
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortItem;
