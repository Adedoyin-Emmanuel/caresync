"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: "",
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.role = "user";
      state.data = action.payload.data;
    },

    loginHospital: (state, action) => {
      state.isAuthenticated = true;
      state.role = "hospital";
      state.data = action.payload.data;
    },

    logout: (state, action) => {
      state.isAuthenticated = false;
      state.role = "";
      state.data = null;
    },
  },
});

export const { loginUser, loginHospital, logout } = authSlice.actions;
export default authSlice.reducer;
