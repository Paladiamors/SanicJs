import store from "./store.js";
import pkg from "react-redux";
import { increment, decrement } from "./counterSlice.js";
import { setToken, clearToken } from "./authSlice.js";

console.log(store);

// const dispatch = useDispatch();
console.log(increment())
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(setToken({ access_token: "123", access_token_sigature: "456" }));
console.log(store.getState());