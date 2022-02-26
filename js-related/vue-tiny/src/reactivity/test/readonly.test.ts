import { readonly, isReadonly } from "../reactive";
describe("readonly", () => {
  test.only("happy path", () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toEqual(1);
    expect(isReadonly(wrapped)).toEqual(true);
    expect(isReadonly(original)).toEqual(false);
  });

  test("should warn when call setter", () => {
    console.warn = jest.fn();

    const use = readonly({
      age: 10,
    });

    use.age = 11;

    expect(console.warn).toHaveBeenCalled();
  });
});
