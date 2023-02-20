// js实现
const len = arr => arr.length;
const last = arr => arr[arr.length - 1];
function lastIndexOf(arr, item) {
  return arr.length > 0
    ? last(arr) === item
      ? arr.length - 1
      : lastIndexOf(arr.slice(0, -1), item)
    : -1;
}
const a = lastIndexOf([1, 2, 3, 2, 1], 2);
console.log(a);

// 翻译成 TS
type LastIndexOf<T extends unknown[], U> = T extends [...infer Rest, infer Last]
  ? Last extends U
    ? Rest['length']
    : LastIndexOf<Rest, U>
  : -1;
