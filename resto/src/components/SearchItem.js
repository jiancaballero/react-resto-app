import React from "react";
import {
  IconButton,
  Fab,
  MenuItem,
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  Chip,
  Stack,
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';

import InputBase from '@mui/material/InputBase';
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const SearchItem = ({ dispatch,searchKey }) => {
  console.log(searchKey)
  const handleOnChange = (e)=>{
    
    e.preventDefault();
    dispatch({
      type: "SEARCH_ITEM",
      payload: { input: e.target.value },
    });
  }
  return (
    <TextField
      icon={<SearchIcon />}
      type="search"
      name="search"
      ariaLabel="Search Item"
      autoFocus={searchKey!==""}
      margin="dense"
      label="Search an item"
     value={searchKey}
      onChange={handleOnChange}
    />
  );
};

export default SearchItem;
