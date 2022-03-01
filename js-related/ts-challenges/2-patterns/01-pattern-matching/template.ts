// 模式匹配做提取

// 数组类型
type _First<T extends unknown[]> = T extends [infer Result, ...infer Rest]
  ? Result
  : never;

type _Last<T extends unknown[]> = T extends [...infer X, infer Result]
  ? Result
  : never;

type _PopArr<T extends unknown[]> = T extends []
  ? []
  : T extends [...infer X, infer Rest]
  ? X
  : never;

type _shiftArr<T extends unknown[]> = T extends []
  ? []
  : T extends [infer X, ...infer Rest]
  ? Rest
  : never;

// 字符串
type _StartsWith<T extends string, U extends string> = T extends `${U}${string}`
  ? true
  : false;

type _Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends ""
  ? S
  : S extends `${infer X}${From}${infer Y}`
  ? `${X}${To}${Y}`
  : S;

type _space = " " | "\n" | "\t";

type _TrimLeft<S extends string> = S extends `${space}${infer R}`
  ? _TrimLeft<R>
  : S;

type _TrimRight<S extends string> = S extends `${infer L}${space}`
  ? _TrimRight<L>
  : S;

type _Trim<S extends string> = _TrimRight<_TrimLeft<S>>;

// 函数
// 1. 提取参数
type _GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

// 2. 提取返回值
type _GetReturnType<Func extends Function> = Func extends (
  ...args: unknown[]
) => infer ReturnType
  ? ReturnType
  : never;
