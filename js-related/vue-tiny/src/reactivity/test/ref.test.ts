import effect from "../effect";
import { ref } from "../ref";
describe("ref", () => {
  test("happy path", () => {
    const a = ref(1);
    expect(a.value).toEqual(1);
  });

  test("it should be reactive", () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toEqual(1);
    expect(dummy).toEqual(1);
    a.value = 2;
    expect(calls).toEqual(2);
    expect(dummy).toEqual(2);
    a.value = 2;
    expect(calls).toEqual(2);
    expect(dummy).toEqual(2);
  });
  test("should make nested properties reactive", () => {
    const a = ref({
      count: 1,
    });
    let dummy;
    effect(() => {
      dummy = a.value.count;
    });
    expect(dummy).toEqual(1);
    a.value.count = 2;
    expect(dummy).toEqual(2);
  });
});
