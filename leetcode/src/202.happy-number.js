/*
 * @lc app=leetcode id=202 lang=javascript
 *
 * [202] Happy Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */

// var isHappy = function(n) {
//   let memo = new Set()
//   let nStr = n.toString()
//   while (n !== 1) {
//     let sum = 0
//     for (let i = 0; i < nStr.length; i++) {
//       sum = sum + Math.pow(Number(nStr[i]), 2)
//     }
//     if (memo.has(sum)) return false
//     else {
//       memo.add(sum)
//       n = sum
//       nStr = sum.toString()
//       sum = 0
//     }
//   }
//   return true
// }
var isHappy = function(n) {
  let memo = new Set()
  while (n !== 1) {
    n = n
      .toString()
      .split('')
      .map(digit => {
        return parseInt(digit, 10)
      })
      .reduce((total, digit) => {
        return total + digit * digit
      }, 0)
    if (memo.has(n)) return false
    else memo.add(n)
  }
  return true
}

// @lc code=end
module.exports = {
  isHappy
}
