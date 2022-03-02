import { ref } from "../ref";
import effect from "../effect";
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
    console.log("a.value", a.value);
    expect(calls).toEqual(2);
    expect(dummy).toEqual(2);
  });
});
