type Reverse<T extends unknown[], Res extends unknown[] = []> = T extends [
  infer Head,
  ...infer Tail
]
  ? Reverse<Tail, [Head, ...Res]>
  : Res;
