type FilterOut<T extends any[], F> = T extends [infer I, ...infer R]
  ? [I] extends [F]
    ? FilterOut<R, F>
    : [I, ...FilterOut<R, F>]
  : [];
