// eg: 1
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0];

// eg: 2
type First<T extends any[]> = T extends [infer Result, ...infer Rest]
  ? Result
  : never;
