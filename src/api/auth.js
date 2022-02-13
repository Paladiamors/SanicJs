import fetch, { fetchJson } from "../fetch";
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

export function splitToken(token) {
  const parts = token.split(".");
  const access_token = [parts[0], parts[1]].join(".");
  const access_token_signature = parts[2];
  return { access_token, access_token_signature };
}
/**
 *
 * @param {props.object} data object {email, password}
 * @returns {props.object} object {access_token, access_token_signature} if login is successful
 */
export function login(data) {
  const url = "api/auth/login";
  return fetchJson(url, data).then((data) => {
    if (data.access_token) {
      const token = splitToken(data.access_token);
      store.dispatch(setToken(token));
      return token;
    }
    return data;
  });
}

export async function add_user(data) {
  const url = "api/auth/add_user";
  return fetchJson(url, data);
}

export async function delete_user(data) {
  const url = "api/auth/delete_user";
  return fetchJson(url, data);
}

export async function protected_(data) {
  const url = "protected";
  return fetch(url);
}
