type GetRequired<T> = {
  [Key in keyof T as Pick<T, Key> extends Required<Pick<T, Key>>
    ? Key
    : never]: T[Key];
};
