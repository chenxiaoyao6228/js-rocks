// js表示
function indexOf(arr, item, pos = 0) {
  if (arr.length === 0) {
    return -1;
  } else {
    const [head, ...tail] = arr;
    if (item === head) {
      return pos;
    } else {
      return indexOf(tail, item, pos + 1);
    }
  }
}

const indexOf_Res = indexOf([0, 0, 0], 2);
console.log(indexOf_Res === -1);
const indexOf_Res2 = indexOf([2, 6, 3, 8, 4, 1, 7, 3, 9], 3);
console.log(indexOf_Res2 === 2);

// 翻译成 TS

// 尝试
// type IndexOf<A extends unknown[], I, P extends number> = A extends [
//   infer Head,
//   ...infer Tail
// ]
//   ? A extends Head
//     ? P
//     : IndexOf<Tail, I, "这里卡住了😂"> // 如何表示数字? => 聪明的网友使用了数组, 用[0, 0 ,0]表示我们的 P, 之后取P['length']即可
//   : -1;

type IndexOf<A extends unknown[], I, P extends any[] = []> = A extends [
  infer Head,
  ...infer Tail
]
  ? I extends Head
    ? P["length"]
    : IndexOf<Tail, I, [...P, 0]> // 如何表示数字? => 聪明的网友使用了数组, 用[0, 0 ,0]表示我们的 P, 之后取P['length']即可
  : -1;
