import { fetchJson } from "../fetch";

export async function post(data) {
  const url = "api/post/post_form";
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return fetchJson(url, formData);
}
