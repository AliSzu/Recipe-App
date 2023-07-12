import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    email: "",
    refreshToken: "",
    idToken: "",
  },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = {
        email: action.payload.email,
        refreshToken: action.payload.refreshToken,
        idToken: action.payload.idToken,
      };
    },
    logout: (state) => {
      (state.isLoggedIn = false),
        (state.userInfo = {
          email: "",
          refreshToken: "",
          idToken: "",
        });
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice;
