// https://github.com/chenxiaoyao6228/type-challenges-solutions/blob/main/zh/medium-flatten.md
type Flatten<A> = A extends []
  ? []
  : A extends [infer T, ...infer K]
  ? [...Flatten<T>, ...Flatten<K>]
  : [A];

// js解法
const isArraySimple = (obj) => typeof obj.sort === "function";

function flattern(arr) {
  return isArraySimple(arr)
    ? arr.length
      ? [...flattern(arr[0]), ...flattern(arr.slice(1))]
      : []
    : [arr];
}
const res_1 = flattern([1, 2, [3, 4], [[[5]]]]);
console.log("res_1-----", res_1); // run this code
