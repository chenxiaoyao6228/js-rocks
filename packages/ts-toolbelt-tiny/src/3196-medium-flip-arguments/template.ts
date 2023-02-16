// 如何获取参数
// type FlipArguments<T extends (...args: unknown[]) => unknown> = T extends (
//   ...args: unknown[]
// ) => infer R
//   ? args["length"] extends 0
//     ? () => R
//     : any
//   : never;

type _Reverse<T extends any[]> = T extends [...infer X, infer Y]
  ? [Y, ...Reverse<X>]
  : [];
type FlipArguments<T extends (...args: any[]) => any> = (
  ...args: _Reverse<Parameters<T>>
) => ReturnType<T>;
