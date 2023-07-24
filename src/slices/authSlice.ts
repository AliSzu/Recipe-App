import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, UserInfo } from "../types/AuthTypes";
import { RootState } from "../store/store";

const initialState: AuthState = {
  userInfo: {
    email: "",
    refreshToken: "",
    uid: "",
  },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.isLoggedIn = true;
      state.userInfo = {
        email: action.payload.email,
        refreshToken: action.payload.refreshToken,
        uid: action.payload.uid,
      };
    },
    logout: (state) => {
      (state.isLoggedIn = false),
        (state.userInfo = {
          email: "",
          refreshToken: "",
          uid: "",
        });
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState): boolean =>
  state.auth.isLoggedIn;