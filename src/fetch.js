import store from "./redux/store.js";
import fetch_ from "node-fetch";

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
  if (process.env.NODE_ENV !== "production") {
    return fetch_(input, init);
  } else {
    const state = store.getState();
    const headers = {
      cookie: `access_token=${state.auth.access_token}; access_token_signature=${state.auth.access_token_sigature}`,
    };
    init.headers = headers;
    return fetch_(input, init);
  }
}

export function login(ident, password){
    // does authentication and stores the token in redux
}