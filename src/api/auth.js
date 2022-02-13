import fetch from "../fetch";
import { setToken } from "../redux/authSlice";
import store from "../redux/store";

// for some reason this parse cookies does not work
// when running from npm
function parseCookies(response) {
  console.log(response);
  const raw = response.headers.raw()["set-cookie"];
  return raw
    .map((entry) => {
      const parts = entry.split(";");
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(";");
}

export function login(data) {
  const url = "api/auth/login";
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(setToken(data));
      return data;
    });
}

export async function add_user(data) {
  const url = "api/auth/add_user";
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function delete_user(data) {
  const url = "api/auth/delete_user";
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function protected_(data) {
  const url = "protected";
  return fetch(url);
}
