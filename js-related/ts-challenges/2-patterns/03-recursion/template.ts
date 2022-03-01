// 递归复用做循环
// 适用对象: Promise, 数组,字符串, 对象类型
// 场景描述: 提取或构造的数组元素个数不确定、字符串长度不确定、对象层数不确定

// Promise
type _DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? _DeepPromiseValueType<ValueType>
    : ValueType
  : never;

// 数组
type _IsEqual<A, B> = (A extends B ? 1 : 2) extends (B extends A ? 1 : 2)
  ? true
  : false;

type _Includes<T extends unknown[], U> = T extends [
  ...infer First,
  ...infer Rest
]
  ? _IsEqual<First, U> extends true
    ? true
    : _Includes<Rest, U>
  : false;

type _Remove<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? _IsEqual<First, Item> extends true
    ? _Remove<Rest, Result>
    : _Remove<Rest, Item, [...Result, First]>
  : Result;

type _ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [..._ReverseArr<Rest>, First]
  : Arr;

// 字符串
type _ReverseStr<
  Str extends string,
  Result extends string = ""
> = Str extends `${infer First}${infer Rest}`
  ? _ReverseStr<Rest, `${First}${Result}`>
  : Result;

type _StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | _StringToUnion<Rest>
    : never;

// 对象类型
type _DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};
