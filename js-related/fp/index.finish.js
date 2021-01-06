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
function pipe(...fns) {
  return arg => {
    return fns.reduce((acc, fn) => fn(acc), arg)
  }
}

/**
 * partial
 *
 * @param {*} fn
 * @return {*}
 */
function partial(fn) {
  let partialArgs = arguments.length > 1 ? [].slice.call(arguments, 1) : []
  return function() {
    let args = partialArgs.concat([].slice.call(arguments))
    return fn.apply(fn, args)
  }
}

/**
 * partialRight
 *
 * @param {*} fn
 * @return {*}
 */
function partialRight(fn) {
  let partialArgs = arguments.length > 1 ? [].slice.call(arguments, 1) : []
  return function() {
    let args = [].slice.call(arguments).concat(partialArgs)
    return fn.apply(fn, args)
  }
}

export { pipe, partial, partialRight }
