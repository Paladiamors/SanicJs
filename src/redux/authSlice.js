import pkg from "@reduxjs/toolkit";
const createSlice = pkg.createSlice;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
    access_token_sigature: "",
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
