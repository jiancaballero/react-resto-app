import React from "react";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const CartNotif = ({ cartCount }) => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Badge badgeContent={cartCount} color="error" showZero>
      <ShoppingCartIcon fontSize="large" />
    </Badge>
  );
};

export default CartNotif;
