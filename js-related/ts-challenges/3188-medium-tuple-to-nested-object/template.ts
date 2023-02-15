// 错误尝试
// type TupleToNestedObject<T extends unknown[], U> = T extends [
//   infer Head,
//   ...infer Tail
// ]
//   ? { [`${Head}`]: TupleToNestedObject<Tail, U> }
//   : U;

type TupleToNestedObject<T extends unknown[], U> = T extends [
  infer Head,
  ...infer Tail
]
  ? { [K in Head & string]: TupleToNestedObject<Tail, U> }
  : U;
