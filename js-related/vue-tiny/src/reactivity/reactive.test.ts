import reactive from "./reactive";

describe("reactive", () => {
  test.only("happy path", () => {
    const original = { age: 10 };
    const observed = reactive(original);

    // 注意toBe和toEqual
    expect(original).not.toBe(observed);
    expect(observed.age).toEqual(10);
  });
});
