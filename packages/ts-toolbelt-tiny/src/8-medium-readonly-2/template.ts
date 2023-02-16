export type _Readonly<T, U> = {
  [P in keyof Pick<T, U>]: T[P];
};
