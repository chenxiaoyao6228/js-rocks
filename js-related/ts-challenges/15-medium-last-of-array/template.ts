type Last<T extends any[]> = T extends [...infer X, infer Result]
  ? Result
  : unknown;
