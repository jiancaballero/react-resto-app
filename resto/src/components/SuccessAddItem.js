import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const SuccessAddItem = ({ success }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(success);
  const handleCloseSuccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    return setOpen(false);
  };

  
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleCloseSuccessAlert}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert
        onClose={handleCloseSuccessAlert}
        severity="success"
        sx={{ width: "100%" }}
      >
        Added New Item Successfully 
      </Alert>
    </Snackbar>
  );
};

export default SuccessAddItem;
