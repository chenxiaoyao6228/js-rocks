/**
 * 实现一个bind方法
 *
 * @export
 * @param {*} fn
 * @param {*} context
 * @return {*}
 */
export function myBind(fn, context) {
  return function() {
    return fn.apply(context, arguments)
  }
}

// export function myBind(fn, context) {
//   return function(...args) {
//     return fn.apply(context, args)
//   }
// }
