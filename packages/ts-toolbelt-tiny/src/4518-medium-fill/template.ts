// js version
function fill(arr, item, start = 0, end = arr.length, res = arr.slice()) {
  if (start >= end) {
    return res;
  }
  if (arr.length === 0) {
    return res;
  } else {
    res[start] = item; // 从头开始替换
    start = start + 1; // start递增
    arr.pop(); // 原数组变短
    return fill(arr, item, start, end, res);
  }
}

// arr长度不够
console.log(fill([], 0), []);
console.log(fill([], 0, 0, 3), []);

// 区间不够
console.log(fill([1, 2, 3], 0, 0, 0), [1, 2, 3]);
console.log(fill([1, 2, 3], 0, 2, 2), [1, 2, 3]);
console.log(fill([1, 2, 3], true, 10, 0), [1, 2, 3]);

// 没有start和end的时候默认替换全部
console.log(fill([1, 2, 3], 0), [0, 0, 0]);
console.log(fill([1, 2, 3], true), [true, true, true]);

// 正常填充
console.log(fill([1, 2, 3], true, 0, 1), [true, 2, 3]);
console.log(fill([1, 2, 3], true, 1, 3), [1, true, true]);
console.log(fill([1, 2, 3], true, 0, 10), [true, true, true]);

// ts version
// 无法实现start++, start > end, 因此要另辟蹊径 => 数组length
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Res extends any[] = []
> = T extends [infer H, ...infer R]
  ? [...Res, 0][Start] extends undefined // ???这是什么鬼
    ? Fill<R, N, Start, End, [...Res, H]> // 数组变短
    : [...Res, 0][End] extends undefined
    ? Fill<R, N, Start, End, [...Res, N]> // 拼接原数组的元素或者替换数组的元素
    : Fill<R, N, Start, End, [...Res, H]>
  : Res; // 数组为空, 直接返回Res
