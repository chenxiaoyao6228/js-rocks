// js 实现
function trunc(param: string | number, res = '') {
  if (typeof param === 'string') {
    const head = param[0];
    const tail = param.slice(1);
    return head === '.' ? res : trunc(tail, res + head);
  } else {
    return trunc(String(param)); // 数字转为字符串方便处理
  }
}
console.log('trunc(0.1)', trunc(0.1));
console.log('trunc(12.345)', trunc(12.345));

// 去掉小数点后面的所有, 尾递归, 需要区分数组与字符串的
// type Trunc<T extends number | string, R extends string = ""> = T extends string
//   ? T extends [infer Head, ...infer Tail]
//     ? Head extends "."
//       ? R
//       : Trunc<Tail, `${R}${Head}`> // => Type 'Tail' does not satisfy the constraint 'string | number'.
//     : any
//   : Trunc<`${T}`, R>;

// 字符串也可以使用infer关键字啊!!!!

// solution
type Trunc<T extends number | string> = `${T}` extends `${infer R}.${any}` ? R : `${T}`;

// solution2
// type Trunc2<T extends number | `${number}`> = `${T}` extends `${infer A}.${
//   | number
//   | ""}`
//   ? `${A}` extends `${number}`
//     ? A
//     : `${A}0`
//   : `${T}`;
