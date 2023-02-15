// 如何表示一个元素在数组中?
type Unique<T, Res extends unknown[] = []> = T extends [infer x, ...infer rest]
  ? Unique<rest, x extends Res[number] ? Res : [...Res, x]>
  : Res;

// TODO 更多解法

// js版本, 在类型编程中, 递归的使用是很常见的, 这里使用递归实现一版
function unique(arr, res = []) {
  // base case: arr === [],  => res
  if (arr.length === 0) return res;
  // 递归的步骤: arr⬇️, res⬆️
  // arr === [any], => 判断该元素是否在res中, 在的话把元素添加到res, 不在的话跳过
  else {
    if (res.includes(arr[0])) return unique(arr.slice(1), res);
    else return unique(arr.slice(1), [...res, arr[0]]);
  }
}

const uniqueRes = unique([1, 1, 2, 2, 3, 3]);

console.log("uniqueRes-------", uniqueRes);

// 整理后的版本
function unique2(arr, res = []) {
  return arr.length > 0
    ? res.includes(arr[0])
      ? unique2(arr.slice(1), res)
      : unique2(arr.slice(1), [...res, arr[0]])
    : res;
}

const uniqueRes2 = unique2([1, 1, 2, 2, 3, 3]);

console.log("uniqueRes2-------", uniqueRes2);
