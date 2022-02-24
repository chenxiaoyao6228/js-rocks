import reactive from "./reactive";
import effect from "./effect";

describe("effect", () => {
  test("happy path", () => {
    const user = reactive({ age: 10 });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1; // get操作
    });

    expect(nextAge).toEqual(11);

    // update
    user.age++;
    expect(nextAge).toEqual(12);
  });

  test("should return a new runner when call effect", () => {
    let foo = 10;

    const runner = effect(() => {
      foo++;
      return "foo";
    });

    expect(foo).toEqual(11);
    const res = runner();
    expect(foo).toEqual(12);
    expect(res).toEqual("foo");
  });
});
