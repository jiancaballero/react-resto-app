import React, { useState } from "react";
import { Stack, Rating, Typography } from "@mui/material";

const Ratings = ({ ratings }) => {
  return (
    <Stack direction="row" spacing={2}>

      <Rating value={ratings} precision={0.5} readOnly size="medium"></Rating>
      <Typography variant="body2" sx={{display:'flex',alignItems:'flex-end'}}>{ratings}</Typography>
    </Stack>
  );
};

export default Ratings;
