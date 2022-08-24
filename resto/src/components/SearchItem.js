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
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';

const SearchItem = ({ dispatch }) => {
  return (
    <TextField
    icon={<SearchIcon/>}
      name="search"
      ariaLable="Search Item"
      autoFocus
      margin="dense"
      label="Search an item"
      fullWidth
      variant="outlined"
      onChange={(e) => {
        dispatch({
          type: "SEARCH_ITEM",
          payload: { input: e.target.value},
        });
        
      }}
    />
  );
};

export default SearchItem;
