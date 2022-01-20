// eg: 1  T['length']可以获取数组类型的长度, T[number]可以遍历获取所有的key, T[0], T[1]可以获取具体下标的类型
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0];

// eg: 2 类似 JS 的解构方式: function first(arr) {const [first, ...rest] = arr; return fist}
// type First<T extends any[]> = T extends [infer Result, ...infer Rest]
//   ? Result
//   : never;

// eg: 3 这里的extens []中, []指的是具体的空数组"类型", 而不是空数组的"值"
// type First<T extends any[]> = T extends [] ? never : T[0];

// eg: 4 空数组的T[0] 返回的是undefined
type First<T extends any[]> = T[0] extends T[number] ? never : T[0];
