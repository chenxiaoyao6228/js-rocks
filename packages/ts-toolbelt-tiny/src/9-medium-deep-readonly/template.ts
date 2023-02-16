// typescript中实现递归
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};

// js模拟实现
// function deepReadonly(type) {
//   for (let key in type) {
//     if (typeof key === "object") {
//       type[key] = deepReadonly(type[key]);
//     }
//     type["readonly" + key] = type[key];
//   }
// }
