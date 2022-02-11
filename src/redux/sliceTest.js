import store from "./store.js";
import pkg from "react-redux";
import { increment, decrement } from "./counterSlice.js";
const { useSelector, useDispatch } = pkg;

console.log(store);

// const dispatch = useDispatch();
console.log(increment())
store.dispatch(increment());
store.dispatch(increment());
console.log(store.getState());
