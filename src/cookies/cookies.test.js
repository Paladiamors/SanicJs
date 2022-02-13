import Cookies from "js-cookie";

test("test cookie", () => {
  Cookies.set("age", 10);
  console.log(Cookies.get("age"));
  console.log(Cookies.get("none"));
});
