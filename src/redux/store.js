import pkg from "@reduxjs/toolkit";
const { configureStore } = pkg;
import counterReducer from "./counterSlice.js";
import authReducer from "./authSlice.js";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
