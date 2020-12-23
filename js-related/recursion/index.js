/**
 * 生成一个包含5个2~32之间的随机整数的数组, 要求使用递归
 *
 * @param {*} n
 * @return {*}
 */
function getRandomNums(n) {
  // 参数校验
  if (typeof n !== 'number') throw new Error('n should be an number')
  if (!Number.isInteger(n)) throw new Error('n should be an integer')
  if (n < 0) throw new Error('n should be greater or equal than 0')
  // 具体实现
  let res = []
  function collect(count, result) {
    if (res.length === count) return result
    let number = getRandomBetween(5, 32)
    if (!result.includes(number)) {
      result.push(number)
    }
    return collect(count, result)
  }
  return collect(n, res)
  function getRandomBetween(a, b) {
    let min = b <= a ? b : a
    let max = b > a ? b : a
    return Math.round(Math.random() * (max - min) + min)
  }
}

export { getRandomNums }
