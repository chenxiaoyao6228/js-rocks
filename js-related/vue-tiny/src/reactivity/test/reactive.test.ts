import { reactive, isReactive } from "../reactive";

describe("reactive", () => {
  test("happy path", () => {
    const original = { age: 10 };
    const observed = reactive(original);

    // 注意toBe和toEqual
    expect(original).not.toBe(observed);
    expect(observed.age).toEqual(10);
    expect(isReactive(observed)).toEqual(true);
    expect(isReactive(original)).toEqual(false);
  });
});
