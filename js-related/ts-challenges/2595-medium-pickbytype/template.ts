// type PickByType<T, U> = {
//   [Key in keyof T]: T[Key] extends U ? T[Key] : never;
// };

// as后面可以接完整的语句
type PickByType<T, U> = { [K in keyof T as T[K] extends U ? K : never]: T[K] };
