import { fetchJson } from "../fetch";
import { post } from "./post";

const timeout = 1000;
test(
  "test post",
  (done) => {
    post({ title: "title", content: "content" }).then((data) => {
      expect(data).toEqual({ title: "title", content: "content" });
      done();
    });
  },
  timeout
);
