import fetch from "./src/fetch.js";
import { login } from "./src/fetch.js";

login("auth/login", {});
fetch("protected")
  .then((response) => response.json())
  .then((data) => console.log(data));
