export interface SnackbarState {
  message: string;
  isOpen: boolean;
  autoHideDuration: number | null;
  severity: string;
}

export interface SnackbarInfo {
  message: string;
  autoHideDuration: number | null;
  severity: string;
}
