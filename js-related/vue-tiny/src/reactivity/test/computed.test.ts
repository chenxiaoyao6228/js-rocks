import { computed } from "../computed";
import { reactive } from "../reactive";

test("should Computed lazily", () => {
  const value = reactive({
    foo: 1,
  });
  const getter = jest.fn(() => {
    return value.foo;
  });

  const cValue = computed(getter);
  // lazy
  expect(getter).not.toHaveBeenCalled();

  expect(cValue.value).toEqual(1);
  expect(getter).toHaveBeenCalledTimes(1);

  // should not compute if value hasn't changed
  cValue.value;
  expect(getter).toHaveBeenCalledTimes(1);

  // should change when value update
  value.foo = 2;
  expect(getter).toHaveBeenCalledTimes(1);

  expect(cValue.value).toEqual(2);
  expect(getter).toHaveBeenCalledTimes(2);

  // new value is computed
  expect(cValue.value).toEqual(2);
});
