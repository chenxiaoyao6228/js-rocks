import { reactive, isReadonly, shallowReadonly } from '../reactive';

describe('shallowReadonly', () => {
  test('happy path', () => {
    const original = { foo: { bar: { baz: 1 } } };
    const observed = shallowReadonly(original);
    expect(isReadonly(observed)).toEqual(true);
    expect(isReadonly(observed.foo)).toEqual(false);
  });

  test('should warn when call setter', () => {
    console.warn = jest.fn();

    const use = shallowReadonly({
      age: 10,
    });

    use.age = 11;

    expect(console.warn).toHaveBeenCalled();
  });
});
