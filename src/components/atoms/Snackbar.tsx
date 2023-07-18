import { Alert } from "@mui/material";
import MuiSnackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { hideSnackbar, selectSnackbarState } from "../../slices/snackbarSlice";

const Snackbar = () => {
  const { message, isOpen } = useAppSelector(selectSnackbarState);
  const dispatch = useAppDispatch();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };
  return (
    <MuiSnackbar open={isOpen} onClick={handleClose} autoHideDuration={6000}>
      <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
