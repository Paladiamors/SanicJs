import pkg from "@reduxjs/toolkit";
const createSlice = pkg.createSlice;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
    access_token_sigature: "",
  },
  reducers: {
    setToken: (state, payload) => {
      state.auth_token = payload.auth_token;
      state.auth_token_sigature = payload.auth_token_sigature;
    },
    clearToken: (state) => {
      state.auth_token = "";
      state.auth_token_sigature = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;