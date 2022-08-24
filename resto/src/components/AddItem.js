import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
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
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
const AddItem = ({ state, dispatch, id, categories }) => {
  
  const [tags, setTags] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [newCategoryInput, showNewCategoryInput] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [item, setItem] = useState({
    id: id,
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    description: "",
    image: "",
    isNew: true,
    tags: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const CheckNameError = () => {
    if (!itemName) {
      return "Required";
    }
  };

  const handleClose = () => {
    setOpen(false);
    showNewCategoryInput(false);
  };
  const handleNewCategoryInput = (e) => {
    setInputCategory(e.target.value);
    setItem({ ...item, category: inputCategory });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tags.length < 3) {
      const tagsCopy = [...tags];
      tagsCopy.push(e.target.value);
      setTags(tagsCopy);
      e.target.value = "";
    }
  };
  const handleDeleteTag = (deletedTag) => {
    setTags(tags.filter((tag) => tag !== deletedTag));
  };
  useEffect(() => {
    setItem({ ...item, tags: tags });
  }, [tags]);
  const handleInput = (e) => {
    const input = e.target.name;

    switch (input) {
      case "isNew":
        setIsNew(e.target.checked);
        setItem({ ...item, isNew: e.target.checked });
        break;
      case "name":
        setItem({ ...item, name: e.target.value });
        break;
      case "category":
        if (e.target.value === "addCategory") {
          showNewCategoryInput(true);
        } else {
          showNewCategoryInput(false);
          setItem({ ...item, category: e.target.value });
        }
        // setItem({ ...item, category: e.target.value });
        break;
      case "price":
        setItem({ ...item, price: e.target.value });
        break;
      case "description":
        setItem({ ...item, description: e.target.value });
        break;
      case "image":
        setItem({ ...item, image: e.target.value });
    }
  };

  
  const addNewItem = () => {
  
    // setItem({...item,id:itemID})
    console.log(item)
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  //   TODO: DISPLAY ERROR MESSAGES
  return (
    <div>
      <Tooltip placement="left" title="Add Item">
        <Fab
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add an item</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText gutterBottom>
            Please fill out all forms. Make sure the item name has no
            duplicates.
          </DialogContentText>
         
          {/* CHECKBOX */}
          <Box sx={{ margin: "1em 0" }}>
            <FormControlLabel
              label="New"
              control={
                <Checkbox checked={isNew} onChange={handleInput} name="isNew" />
              }
            />
          </Box>
          {!newCategoryInput ? (
            <Box sx={{ marginBottom: "1em" }}>
              <TextField
                required
                name="category"
                label="Add/Select Category"
                fullWidth
                select
                onChange={handleInput}
              >
                <MenuItem value="addCategory">
                  <AddIcon fontSize="small" />
                  Add New Category
                </MenuItem>

                {categories.map((category) => (
                  <MenuItem value={category}>{category}</MenuItem>
                ))}
              </TextField>
            </Box>
          ) : (
            <Box sx={{ marginBottom: "1em" }}>
              <TextField
                onChange={handleNewCategoryInput}
                name="newCategory"
                autoFocus
                margin="dense"
                label="New Category"
                fullWidth
                variant="standard"
                required
              />
            </Box>
          )}

          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              name="name"
              onChange={handleInput}
              autoFocus
              margin="dense"
              label="Item Name"
              fullWidth
              variant="standard"
              required
            />
          </Box>
          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              required
              name="price"
              autoFocus
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i class="fa-solid fa-peso-sign"></i>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              onChange={handleInput}
              name="image"
              autoFocus
              margin="dense"
              type="text"
              fullWidth
              label="Image URL"
              variant="standard"
            />
          </Box>
          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              onChange={handleInput}
              name="description"
              label="Description"
              multiline
              maxRows={9}
              fullWidth
              variant="filled"
              margin="dense"
            />
          </Box>
          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              onKeyPress={handleKeyPress}
              name="tag"
              label="Tags (optional)"
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                ></Chip>
              ))}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
            addNewItem();
            handleClose();
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddItem;
