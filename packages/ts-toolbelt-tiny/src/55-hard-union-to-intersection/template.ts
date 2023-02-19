type UnionToIntersection<U> = (U extends unknown ? (arg: U) => unknown : never) extends (
  arg: infer P
) => unknown
  ? P
  : never;
