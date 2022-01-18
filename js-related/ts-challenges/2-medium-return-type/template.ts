type MyReturnType<T> = T extends (...args: any[]) => infer U ? U : never;

// js
// function getReturnType(fn) {
//   return fn();
// }
