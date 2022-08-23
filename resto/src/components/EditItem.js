import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
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
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { QuestionAnswerOutlined } from "@mui/icons-material";

const EditItem = ({
  id,
  name,
  price,
  description,
  image,
  dispatch,
  category,
}) => {
  const [open, setOpen] = React.useState(false);

  const [edit, setEdit] = useState({
    id: id,
    category: category,
    name: name,
    price: price,
    description: description,
    image: image,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInput = (e) => {
    const input = e.target.name;
    switch (input) {
      case "name":
        setEdit({ ...edit, name: e.target.value });
        break;
      case "category":
        setEdit({ ...edit, category: e.target.value });
        break;
      case "price":
        setEdit({ ...edit, price: e.target.value });
        break;
      case "description":
        setEdit({ ...edit, description: e.target.value });
        break;
      case "image":
        setEdit({ ...edit, image: e.target.value });
        break;
    }
  };

  return (
    <div>
      <IconButton
        aria-label="update item"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Please fill out all forms. Make sure the item name has no
            duplicates.
          </DialogContentText>

          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              value={edit.category}
              onChange={handleInput}
              name="category"
              autoFocus
              margin="dense"
              label="Edit Category"
              fullWidth
              variant="standard"
              required
            />
          </Box>

          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              value={edit.name}
              name="name"
              autoFocus
              margin="dense"
              label="Edit Item Name"
              fullWidth
              variant="standard"
              onChange={handleInput}
              required
            />
          </Box>
          <Box sx={{ marginBottom: "1em" }}>
            <TextField
              required
              value={edit.price}
              name="price"
              autoFocus
              margin="dense"
              label="Edit Price"
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
              value={edit.image}
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
              value={edit.description}
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
          {/* <Box sx={{ marginBottom: "1em" }}>
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
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              dispatch({
                type: "EDIT_ITEM",
                payload: {
                  id: edit.id,
                  name: edit.name,
                  price: edit.price,
                  category: edit.category,
                  image: edit.image,
                  description: edit.description,
                },
              });
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditItem;
