import reactive from "./reactive";
import effect, { stop } from "./effect";

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

  test("scheduler", () => {
    // pass a second argument to effect function, fn should be called on the first time
    // scheduler should be call on reactive obj setter
    // should run fn again when manual run 'runner' functio
    let dummy: any;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toEqual(1);

    // should be called on first trigger
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);

    // should not run yet
    expect(dummy).toEqual(1);

    // manually run
    run();
    // should have run
    expect(dummy).toEqual(2);
  });

  test("stop", () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });

    obj.prop++;
    expect(dummy).toEqual(2);
    stop(runner);
    obj.prop++;
    expect(dummy).toEqual(2);
    runner();
    expect(dummy).toEqual(3);
  });
});
