import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SnackbarInfo, SnackbarState } from "../types/SnackbarTypes";
import { RootState } from "../store/store";

const initialState: SnackbarState = {
  message: " ",
  isOpen: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarInfo>) => {
      (state.message = action.payload.message), (state.isOpen = true);
    },
    hideSnackbar: (state) => {
      (state.message = ""), (state.isOpen = false);
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export const selectSnackbarState = (state: RootState): SnackbarState =>
  state.snackbar;
