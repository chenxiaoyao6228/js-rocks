// 利用数组的长度来实现, 如果 T 率先增长到了 TL 的长度, 说明 T 不比U 大
type GreaterThan<
  T extends number,
  U extends number,
  TL extends unknown[] = []
> = T extends TL['length'] ? false : U extends TL['length'] ? true : GreaterThan<T, U, [...TL, 0]>;
