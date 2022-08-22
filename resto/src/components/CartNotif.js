import React from "react";
import { Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const CartNotif = ({cartCount}) => {
  return (
    <div>
      <Badge badgeContent={cartCount} color="error" showZero>
        <ShoppingCartIcon fontSize="large"/>
      </Badge>
    </div>
  );
};

export default CartNotif;
