import { reactive, isReactive, isProxy } from '../reactive';

describe('reactive', () => {
  test('happy path', () => {
    const original = { age: 10 };
    const observed = reactive(original);

    // 注意toBe和toEqual
    expect(original).not.toBe(observed);
    expect(observed.age).toEqual(10);
    expect(isReactive(observed)).toEqual(true);
    expect(isReactive(original)).toEqual(false);
    expect(isProxy(observed)).toEqual(true);
  });
  test('nested reactive', () => {
    const original = {
      nested: {
        foo: 1,
      },
      arr: [{ bar: 2 }],
    };
    const observed = reactive(original);
    expect(isReactive(observed.nested)).toEqual(true);
    expect(isReactive(observed.arr)).toEqual(true);
    expect(isReactive(observed.arr[0])).toEqual(true);
  });
});
