import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const ErrorRemoveCart = ({ error }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(error);
  const handleCloseErrorAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    return setOpen(false);
  };

  
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleCloseErrorAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseErrorAlert}
        severity="error"
        sx={{ width: "100%" }}
      >
        Item Removed From Cart
      </Alert>
    </Snackbar>
  );
};

export default ErrorRemoveCart;
