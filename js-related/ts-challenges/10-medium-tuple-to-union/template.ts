// type TupleToUnion<T extends any[]> = {
//   [K in T[number] infer as P]: P | K;
// };

// 遍历数组的方式
type TupleToUnion<T extends unknown[]> = T[number];

// type XX<T> = T;
// type A = number;
// type N = XX<A>;
