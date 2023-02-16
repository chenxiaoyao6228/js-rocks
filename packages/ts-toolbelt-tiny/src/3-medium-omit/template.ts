// 注意map的操作都是在左边
// 法 1:
// type MyOmit<T, K extends keyof T> = {
//   [P in keyof T as P extends K ? never : P]: T[P];
// };

// 法 2
// type MyOmit<T, K> = {
//   [P in Exclude<keyof T, K>]: T[P];
// };

// 法 3, 利用条件类型
export type _Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
