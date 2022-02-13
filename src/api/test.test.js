test("object manipulation", () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
  };
  const obj2 = {
    a: 1,
    b: 2,
    c: 3,
  };

  expect(obj).toEqual(obj2);
});
