import { add_user, delete_user, login, protected_ } from "./auth";
import store from "../redux/store";
import authReducer from "../redux/authSlice";
import jwt_decode from "jwt-decode";

test("delete_user", (done) => {
  delete_user({}).then((data) => {
    expect(data["ok"]).toBe(true);
    done();
  });
});

test("add_user", (done) => {
  add_user({}).then((data) => {
    expect(data["ok"]).toBe(true);
    done();
  });
});

test("login", (done) => {
  login({})
    .then((cookies) => {
      expect(cookies).toEqual(store.getState().auth);
      return cookies;
    })
    .then(() => {
      protected_()
        .then((response) => response.json())
        .then((data) => {
          expect(data["ok"]).toEqual(true);
        });
    })
    .then(() => {
      const decoded = jwt_decode(store.getState().auth.access_token);
      expect(decoded["user_id"]).toEqual(1);
      done();
    });
});