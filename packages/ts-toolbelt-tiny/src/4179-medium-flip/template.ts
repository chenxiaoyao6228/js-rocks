// 给key取别名
type Flip<T extends { [key: PropertyKey]: any }> = {
  [K in keyof T as `${T[K]}`]: K;
};
