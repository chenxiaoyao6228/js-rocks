type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

// 基本思路, 先找到对应的key, 再提取
type MutableKeys<T> = keyof {
  [Key in keyof T as MyEqual<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true ? never : Key]: any;
};
