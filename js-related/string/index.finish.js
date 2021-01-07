// function repeat(target, n) {
//   return new Array(n + 1).join(target)
// }

/**
 * 重复字符串n次
 *
 * @param {*} target
 * @param {*} n
 * @return {*}
 */
function repeat(target, n) {
  var s = target,
    total = ''
  while (n > 0) {
    if (n % 2 === 1) {
      total += s
    }
    if (n == 1) break
    s += s
    n = n >> 1
  }
  return total
}

export { repeat }
