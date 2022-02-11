import fetch from "node-fetch";

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

function get() {
  const response = fetch("http://localhost:4000")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function post() {
  let cookie;
  fetch("http://localhost:4000", {
    method: "POST",
    body: JSON.stringify({ name: "bob", age: 10 }),
    headers: {
      cookie: "accessToken=1234abc; userId=1234",
    },
  })
    .then((res) => {
      cookie = parseCookies(res);
      return res.json();
    })
    .then((data) => console.log(data, cookie));

  fetch("http://localhost:4000", {
    method: "POST",
    body: JSON.stringify({ name: "marco polo", age: 10 }),
    headers: {
      cookie: cookie,
    },
  })
    .then((res) => {
      cookie = parseCookies(res);
      return res.json();
    })
    .then((data) => console.log(data, cookie));
}

// get();
post();
