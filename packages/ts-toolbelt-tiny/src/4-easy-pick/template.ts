// type MyPick<T, K> = any;

export type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
