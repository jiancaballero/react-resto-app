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
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";

import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect } from "react";
const SearchItem = ({ dispatch, searchKey }) => {
  // useEffect(()=>{
  //   axios
  //   .get("http://localhost:8080/api/items/search", {
  //     search: searchKey
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     dispatch({
  //       type: "SEARCH_RESULT",
  //       payload: {  searchResult:res },
  //     });
      
  //   });
  // },[searchKey])
  const handleOnChange = (e) => {
    e.preventDefault();

    dispatch({
      type: "SEARCH_ITEM",
      payload: { input: e.target.value },
    });
  };
  return (
    <TextField
      sx={{
        input: {
          color: "white",
        },
        label: { color: "white" },
      }}
      className="SearchField"
      fullWidth
      variant="filled"
      icon={<SearchIcon />}
      type="search"
      name="search"
      ariaLabel="Search Item"
      autoFocus={searchKey !== ""}
      margin="dense"
      label="Search an item"
      value={searchKey}
      onChange={handleOnChange}
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchItem;
