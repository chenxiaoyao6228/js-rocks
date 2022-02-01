type IsAny<T> = 1 extends T & 0 ? true : false;
type IsNever<T> = [T] extends [never] ? true : false;

type IsTuple<T> = true extends IsAny<T> | IsNever<T>
  ? false
  : T extends readonly [infer First, ...infer Other] | readonly []
  ? true
  : false;
