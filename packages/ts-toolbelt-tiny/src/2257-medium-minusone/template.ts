// 涉及到数字的计算, 就要想办法用数组的length代替

// solution1: ts无法支持深层的递归, 几百就爆掉了
type MinusOne<
  N extends number,
  A extends unknown[] = []
> = A["length"] extends N
  ? A extends [infer Head, ...infer Tail]
    ? Tail["length"]
    : never
  : MinusOne<N, [...A, 0]>;

// more solution: https://github.com/type-challenges/type-challenges/issues/5547
