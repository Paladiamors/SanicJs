import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: Cookies.get("access_token") || "",
    access_token_sigature: Cookies.get("access_token_signature") || "",
  },
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload.access_token;
      state.access_token_sigature = action.payload.access_token_sigature;
    },
    clearToken: (state) => {
      state.access_token = "";
      state.access_token_sigature = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
