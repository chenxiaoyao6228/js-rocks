// fib: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
// 需要实现加法, 基本思路还是转化为数组的长度求值
type Fibonacci<
  T extends number,
  N1 extends 0[] = [0], //前一个值
  N2 extends 0[] = [0], // 后一个值
  C extends 0[] = [0, 0, 0] // index
> = T extends 1 | 2
  ? 1
  : C["length"] extends T
  ? [...N1, ...N2]["length"]
  : Fibonacci<T, N2, [...N1, ...N2], [...C, 0]>;
