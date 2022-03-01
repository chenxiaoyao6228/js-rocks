import { Equal, Expect } from "@type-challenges/utils";

// 数组类型
type case_First = [
  Expect<Equal<_First<[3, 2, 1]>, 3>>,
  Expect<Equal<_First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<_First<[]>, never>>,
  Expect<Equal<_First<[undefined]>, undefined>>
];

type case_Last = [
  Expect<Equal<_Last<[3, 2, 1]>, 1>>,
  Expect<Equal<_Last<[() => 123, { a: string }]>, { a: string }>>
];

type cases_Pop = [
  Expect<Equal<_PopArr<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<_PopArr<["a", "b", "c", "d"]>, ["a", "b", "c"]>>
];
type cases_shiftArr = [
  Expect<Equal<_shiftArr<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<_shiftArr<["a", "b", "c", "d"]>, ["b", "c", "d"]>>
];

// 字符串
type cases_StartsWith = [
  Expect<Equal<_StartsWith<"abc", "ac">, false>>,
  Expect<Equal<_StartsWith<"abc", "ab">, true>>,
  Expect<Equal<_StartsWith<"abc", "abcd">, false>>
];

type cases_Replace = [
  Expect<
    Equal<_Replace<"types are fun!", "fun", "awesome">, "types are awesome!">
  >,
  Expect<Equal<_Replace<"", "fun", "awesome">, "">>
];

type cases_Trim = [
  Expect<Equal<_Trim<"str">, "str">>,
  Expect<Equal<_Trim<" str">, "str">>,
  Expect<Equal<_Trim<"     str">, "str">>,
  Expect<Equal<_Trim<"     str     ">, "str">>
];

// 函数

// 1. 提取参数
type cases__GetParameters = _GetParameters<
  (name: string, age: number) => string
>;

// 2. 提取返回值
type case_GetReturnType = _GetReturnType<(name: string, age: number) => string>;
