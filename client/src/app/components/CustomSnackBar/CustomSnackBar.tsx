import React from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useScreenState } from "../../hooks/useScreenState";

export function CustomSnackBar() {
  const { showSnackBar, setShowSnackBar, snackBarMsg } = useScreenState();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackBar(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setShowSnackBar(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={showSnackBar}
      onClose={handleClose}
      autoHideDuration={3000}
      message={snackBarMsg}
      action={action}
    />
  );
}
