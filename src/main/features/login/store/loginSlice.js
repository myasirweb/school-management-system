import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../services/loginService";

const existingUser = getCurrentUser();

const initialState = {
  user: existingUser || null,
  isAuthenticated: !!existingUser,
  role: existingUser?.role || null,
  token: existingUser?.token || null,
  error: null,
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  loginSlice.actions;

export default loginSlice.reducer;
