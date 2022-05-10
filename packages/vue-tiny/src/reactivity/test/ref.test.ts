import effect from '../effect';
import { reactive } from '../reactive';
import { isRef, proxyRefs, ref, unRef } from '../ref';
describe('ref', () => {
  test('happy path', () => {
    const a = ref(1);
    expect(a.value).toEqual(1);
  });

  test('test should be reactive', () => {
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
  test('should make nested properties reactive', () => {
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
  test('isRef', () => {
    const a = ref(1);
    const user = reactive({
      age: 1,
    });
    expect(isRef(a)).toBe(true);
    expect(isRef(1)).toBe(false);
    expect(isRef(user)).toBe(false);
  });

  test('unRef', () => {
    const a = ref(1);
    const user = reactive({
      age: 1,
    });
    expect(unRef(a)).toBe(1);
    expect(unRef(1)).toBe(1);
  });

  test('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'york',
    };

    const proxyUser = proxyRefs(user);
    expect(user.age.value).toEqual(10);
    expect(proxyUser.age).toEqual(10);
    expect(proxyUser.name).toEqual('york');

    proxyUser.age = 20;
    expect(proxyUser.age).toEqual(20);
    expect(user.age).toEqual(20);

    proxyUser.age = ref(10);
    expect(proxyUser.age).toEqual(10);
    expect(user.age.value).toEqual(10);
  });
});
