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
  const [sortEl, setSortEl] = useState(null);
  const open = sortEl;
  const handleClick = (e) => {
    setSortEl(e.currentTarget);
  };
  const handleClose = () => {
    setSortEl(null);
  };
  return (
    <div>
      <Tooltip title="Sort Items" placement="left">
        <IconButton
          aria-label="send"
          size="large"
          id="sortBtn"
          onClick={handleClick}
          aria-control={open ? "item-sort" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <SortIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Menu
        id="item-sort"
        sortEl={sortEl}
        open={open}
        MenuListProps={{ "aria-labelledby": "sortBtn" }}
        onClose={handleClose}
        
      >
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
                type:"SORT_ITEMS",
                payload:{sortBy:"name"}
            })
          }}
        >
          <SortByAlphaIcon fontSize="small" />
          Name (A-Z)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
                type:"SORT_ITEMS",
                payload:{sortBy:"priceAsc"}
            })
          }}
        >
          <CurrencyRubleIcon fontSize="small" />
          Price (Lowest-Highest)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
                type:"SORT_ITEMS",
                payload:{sortBy:"priceDsc"}
            })
          }}
        >
          <CurrencyRubleIcon fontSize="small" />
          Price (Highest-Lowest)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch({
                type:"SORT_ITEMS",
                payload:{sortBy:"ratings"}
            })
          }}
        >
          <StarIcon fontSize="small" />
          Ratings (Highest-Lowest)
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortItem;
