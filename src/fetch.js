import store from "./redux/store.js";
import fetch_ from "node-fetch";
import { setToken, clearToken } from "./redux/authSlice.js";

// make the dev prefix configurable
const devPrefix = "http://localhost:4000";

// parses the set cookie component from a response and returns
// is as an object
function parseCookies(response) {
  const raw = response.headers.raw()["set-cookie"];
  return raw
    .map((entry) => {
      const parts = entry.split(";");
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(";");
}

// if auth tokens are set, automatically adds them when in dev mode
// otherwise just passes through a fetch request
export default function fetch(input, init = {}) {
  if (process.env.NODE_ENV === "production") {
    return fetch_(input, init);
  } else {
    const state = store.getState();
    if (state.auth.access_token && state.auth.access_token_sigature) {
      const auth = {
        cookie: `access_token=${state.auth.access_token}; access_token_signature=${state.auth.access_token_sigature}`,
      };
      init.headers = { ...init.headers, ...auth };
    }
    const url = input[0] === "/" ? devPrefix + input : devPrefix + "/" + input;
    return fetch_(url, init);
  }
}

// use this to perform a login into the system
// the cookie is then saved to the store
// use this for testing purposes
export function login(url, email, password) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    const cookies = parseCookies(response);
    store.dispatch(setToken(cookies));
  });
}
