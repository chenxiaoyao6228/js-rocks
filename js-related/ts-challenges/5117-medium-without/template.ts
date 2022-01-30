// js实现
// 双重递归实现
function without(arr1: any[], arr2: any | any[], res = []) {
  // 遍历arr2, 循环比对arr1, 不在arr1里面就推到res => 双重循环
  return arr2.length > 0
    ? without(arr1, [arr2[0]], res).cancat(without(arr1, arr2.slice(1), res))
    : res;
}
console.log("without([1,2],1)", without([1, 2], 1));

// TODO
// type toUnion<T> = T extends any[] ? T[number] : T;

// type Without<T extends unknown[], U, UU = toUnion<U>> = T extends [
//   infer first,
//   ...infer rest
// ]
//   ? first extends UU
//     ? Without<rest, U>
//     : [first, ...Without<rest, U, UU>]
//   : [];
