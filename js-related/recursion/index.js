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

/**
 * 两元一支雪糕，三支雪糕棍换一支雪糕，给一个钱，能得到多少雪糕，怎么用代码实现
 *
 * @param {*} n
 * @return {*}
 */
function countChange(n) {
  function change(money, stick, result) {
    // base case: 钱 / 2 + 雪糕棍 < 3
    if (money < 2 && stick < 3) {
      return result
    } else {
      let countChangeCount = Math.floor(money / 2) + Math.floor(stick / 3)
      result += countChangeCount
      // 递减项
      return change(money % 2, countChangeCount + (stick % 3), result)
    }
  }
  return change(n, 0, 0)
}

/**
 * 带记忆功能的斐波那契数列
 *
 * @param {*} n
 * @return {*}
 */
function fibWithMemo(n) {
  let cache = {}
  if (Object.prototype.hasOwnProperty.call(cache, n)) {
    return cache[n]
  } else if (n <= 2) {
    return 1
  } else {
    cache[n] = fibWithMemo(n - 1) + fibWithMemo(n - 2)
  }
  return cache[n]
}

export { getRandomNums, countChange, fibWithMemo }
