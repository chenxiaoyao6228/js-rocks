type MyReadonly2<T, U> = {
  [P in keyof Pick<T, U>]: T[P];
};
