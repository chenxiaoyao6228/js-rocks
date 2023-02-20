// 对于E, 使用__连接, M使用--连接
// BEM 需要排列组合, 先对 BE进行排列, 使用 BE 记录,  后对 BE 与 M 进行排列, Res记录
// type BEM<
//   B extends string,
//   E extends string[],
//   M extends string[],
//   BE extends string[] = [],
//   Res extends string[] = []
// > = E extends [infer Head, ...infer Tail]
//   ? BEM<B, Tail, M, [...BE, `${B}__${Head}`], Res>
//   : Res;

// 数组转联合类型
// type M = ["small", "medium", "large"];
// type MM = M[number]; //  "small" | "medium" | "large"

type BEM<B extends string, E extends string[], M extends string[]> = E['length'] extends 0
  ? `${B}--${M[number]}`
  : M['length'] extends 0
  ? `${B}__${E[number]}`
  : `${B}__${E[number]}--${M[number]}`;
