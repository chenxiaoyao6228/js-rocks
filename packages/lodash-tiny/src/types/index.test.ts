import * as type from '.';

describe('is-xx', () => {
  // 遍历集合, 只有其中的一项为true
  const TYPES = {
    String: '1',
    Number: 1,
    Undefined: undefined,
    Null: null,
    NaN: NaN,
    Symbol: Symbol(1),
    Function: function () {},
    Date: new Date(),
    RegExp: new RegExp(),
    Error: new Error('error'),
    Array: [],
    Window: window,
  };
  for (const functionType in type) {
    if (['isObject', 'isPlainObject', 'isArrayLike'].includes(functionType)) continue; // 跳过, 不可用break和return
    test(`${functionType}`, () => {
      for (const [key, value] of Object.entries(TYPES)) {
        if (functionType.includes(key)) {
          expect(type[functionType](value)).toEqual(true);
        } else {
          expect(type[functionType](value)).toEqual(false);
        }
      }
    });
  }
});

describe('isObject', () => {
  function myClass () {}
  test.each([
    [{}, true],
    [[1, 2, 3], true],
    [function () {}, true],
    [new Date(), true],
    [new myClass(), true],
    [null, false],
  ])('isObject(%s)', (a, b) => {
    expect(type.isObject(a)).toEqual(b);
  });
});

describe('isPlainObject', () => {
  function myClass () {}
  const obj = Object.create(null);
  test.each([
    [{}, true],
    [obj, true],
    [[1, 2, 3], false],
    [function () {}, false],
    [new Date(), false],
    [new myClass(), false],
    [null, false],
  ])('isPlainObject(%s)', (a, b) => {
    expect(type.isPlainObject(a)).toEqual(b);
  });
});

describe('isArrayLike', () => {
  function myClass () {}
  const obj = Object.create(null);
  test.each([
    [[1, 2, 3], true],
    [document.body.children, true],
    [{}, false],
    [obj, false],
    [function () {}, false],
    [new Date(), false],
    [new myClass(), false],
    [null, false],
  ])('isArrayLike(%s)', (a, b) => {
    expect(type.isArrayLike(a)).toEqual(b);
  });
});
