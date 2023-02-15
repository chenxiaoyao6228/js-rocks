// 错误尝试
// type Includes<T extends any[], U> = U in T ? true : false;

// js
// function includes(arr, val) {
//   let res = false;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === val) {
//       res = true;
//     }
//   }
//   return res;
// }

type Includes<T extends any[], U> = U extends T[number] ? true : false;

// tip: 见indexed-type.md
