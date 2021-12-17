/*
 * @lc app=leetcode id=125 lang=javascript
 *
 * [125] Valid Palindrome
 */
/**
 * @param {string} inputStr
 * @return {boolean}
 */
// var isPalindrome = function(inputStr) {
//   let formattedStr = inputStr.replace(/\W/g, '').toLowerCase()
//   let reversedStr = formattedStr
//     .split('')
//     .reverse()
//     .join('')
//   return formattedStr === reversedStr
// }

var isPalindrome = function(s) {
  s = s.replace(/[^a-zA-Z0-9]/gm, '').toLowerCase()
  let middle = Math.floor(s.length / 2)
  let length = s.length
  for (let i = 0; i < middle; i++) {
    if (s[i] !== s[length - 1 - i]) {
      return false
    }
  }
  return true
}

module.exports = {
  isPalindrome
}
