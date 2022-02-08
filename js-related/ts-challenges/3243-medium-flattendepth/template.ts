type _FlattenOnce<T extends unknown[]> = T extends [infer X, ...infer Y]
  ? X extends unknown[]
    ? [...X, ..._FlattenOnce<Y>]
    : [X, ..._FlattenOnce<Y>]
  : [];

type FlattenDepth<T extends unknown[], N extends number = 1> = N extends 0
  ? T
  : FlattenDepth<_FlattenOnce<T>, MinusOne<N>>;
