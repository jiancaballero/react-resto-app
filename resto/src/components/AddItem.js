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
  const [noInputName, checkNoInputName] = useState(false);
  const [noInputPrice, checkNoInputPrice] = useState(false);
  const [noInputNewCategory, checkNoInputNewCategory] = useState(false);
  const [noInputCategory, checkNoInputCategory] = useState(false);
  const [noInputImage, checkNoInputImage] = useState(false);
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
        if (e.target.value !== "") {
          checkNoInputName(true);
          setItem({ ...item, name: e.target.value });
        } else {
          checkNoInputName(false);
        
        }
        break;
      case "newCategory":
        
        {
          if (e.target.value !== "") {
            checkNoInputNewCategory(true);
            setItem({ ...item, category: e.target.value });
          } else {
            checkNoInputNewCategory(false);
           
          }
        }
        break;
      case "category":
        if (e.target.value === "addCategory") {
          showNewCategoryInput(true);
        } else {
          showNewCategoryInput(false);
          if (e.target.value !== "") {
            checkNoInputCategory(true);
            setItem({ ...item, category: e.target.value });
          } else {
            checkNoInputCategory(false);
            
          }
        }
        break;
      case "price":
        if (e.target.value !== "") {
          checkNoInputPrice(true);
          setItem({ ...item, price: e.target.value });
        } else {
          checkNoInputPrice(false);
         
        }

        break;
      case "description":
        setItem({ ...item, description: e.target.value });
        break;
      case "image":
        if (e.target.value !== "") {
          checkNoInputImage(true);
          setItem({ ...item, image: e.target.value });
        } else {
          checkNoInputImage(false);
          
        }
    }
  };

  const duplicate = state.items
    .map((items) => items)
    .filter(
      (itemfilter) =>
        itemfilter.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s]/gi, "") ===
        item.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s]/gi, "")
    );
  const addNewItem = () => {
   console.log(item)
    if (
      item.name === "" ||
      item.category === "" ||
      item.price === "" ||
      item.image === ""
    ) {
      alert("Please input all required fields");
    }
    if (duplicate.length) {
      alert("Item name already exists");
    }
    if (
      item.name !== "" &&
      item.category !== "" &&
      item.price !== "" &&
      item.image !== "" &&
      !duplicate.length
    ) {
      dispatch({ type: "ADD_ITEM", payload: item });
      handleClose();
    }
  };

  //   TODO: DISPLAY ERROR MESSAGES
  return (
    <div>
      <Tooltip placement="left" title="Add Item">
        <Fab
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add an item</DialogTitle>
        <Divider />
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
                error={noInputCategory === false}
                helperText={noInputCategory === false && "Required"}
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
                onChange={handleInput}
                name="newCategory"
                autoFocus
                margin="dense"
                label="New Category"
                fullWidth
                variant="standard"
                required
                error={noInputNewCategory === false}
                helperText={noInputNewCategory === false && "Required"}
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
              error={noInputName === false}
              helperText={noInputName === false && "Required"}
            />
          </Box>
          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              error={noInputPrice === false}
              helperText={noInputPrice === false && "Required"}
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
              error={noInputImage === false}
              helperText={noInputImage === false && "Required"}
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
          <Button
            onClick={() => {
              addNewItem();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddItem;
