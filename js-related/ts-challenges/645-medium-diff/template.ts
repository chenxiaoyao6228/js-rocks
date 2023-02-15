// solution1
// type DiffKeys<U1, U2> =
//   | (U1 extends U2 ? never : U1)
//   | (U2 extends U1 ? never : U2);
// type Diff<O, O1> = {
//   [K in DiffKeys<keyof O, keyof O1>]: (O & O1)[K];
// };

// solution2: 对K取并集再取交集,再使用Exclude求出差集
type Diff<O, O1> = {
  [k in Exclude<keyof O | keyof O1, keyof O & keyof O1>]: (O & O1)[k];
};
