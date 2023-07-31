import * as React from "react";
import MuiSnackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { hideSnackbar, selectSnackbarState } from "../../slices/snackbarSlice";
import { useTranslation } from "react-i18next";
import { SnackbarMessage } from "../../constants/ErrorMessage";
import { getMessageKey } from "../../utils/authUtils";
import { Alert } from "@mui/material";

const Snackbar = () => {
  const { isOpen, message, autoHideDuration, severity } = useAppSelector(selectSnackbarState);
  const dispatch = useAppDispatch();
  const messageKey = message ? message : "";
  const { t } = useTranslation();

  const snackbarMessage =
    SnackbarMessage[getMessageKey(messageKey) as keyof typeof SnackbarMessage];

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <div>
      <MuiSnackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={handleClose}>
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage ? t(snackbarMessage) : t("error.unknown")}
        </Alert>
      </MuiSnackbar>
    </div>
  );
}

export default Snackbar
