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

  expect(getter).not.toHaveBeenCalled();

  expect(cValue.value).toEqual(1);
});
