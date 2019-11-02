/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s.length === '') return true
  if (s.length === 1) return false
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if ('([{'.indexOf(s[i]) > -1) {
      stack.push(s[i])
    } else {
      let matchMap = {
        ')': '(',
        ']': '[',
        '}': '{'
      }
      let toMatch = stack.pop()
      if (toMatch !== matchMap[s[i]]) return false
    }
  }
  return stack.length === 0
}

// var isValid = function(s) {
//   let stack = []
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '(') stack.push(')')
//     else if (s[i] === '{') stack.push('}')
//     else if (s[i] === '[') stack.push(']')
//     else if (stack.length === 0 || stack.pop() !== s[i]) return false
//   }
//   return stack.length === 0
// }

// @lc code=end
module.exports = {
  isValid
}
