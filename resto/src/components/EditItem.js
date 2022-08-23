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

const EditItem = ({
  id,
  name,
  price,
  quantity,
  description,
  image,
  dispatch,
  category
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInput = () => {};

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
              value={category}
              onChange={handleInput}
              name="editCategory"
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
            value={name}
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
              value={price}
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
            value={image}
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
            value={description}
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
            onClick={dispatch({ type: "EDIT_ITEM", payload: { id: id } })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditItem;
