import { AlertColor } from "@mui/material";

export interface SnackbarState {
  message: string;
  isOpen: boolean;
  autoHideDuration: number | null;
  severity: AlertColor;
}

export interface SnackbarInfo {
  message: string;
  autoHideDuration: number | null;
  severity: AlertColor;
}
