// v1
// export function pipe(...fns) {
//   return arg => {
//     let res = arg
//     fns.forEach(fn => {
//       res = fn.call(null, res)
//     })
//     return res
//   }
// }

/**
 * pipe函数
 *
 * @export
 * @param {*} fns
 * @return {*}
 */
export function pipe(...fns) {
  return arg => {
    return fns.reduce((acc, fn) => fn(acc), arg)
  }
}
