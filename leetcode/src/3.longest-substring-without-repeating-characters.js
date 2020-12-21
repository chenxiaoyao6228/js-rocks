/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */
/**
 * @param {string} s
 * @return {number}
 */

// function lengthOfLongestSubstring(s) {
//   const map = {}
//   let left = 0
//   return s.split('').reduce((max, v, i) => {
//     left = map[v] >= left ? map[v] + 1 : left
//     map[v] = i
//     return Math.max(max, i - left + 1)
//   }, 0)
// }

function lengthOfLongestSubstring(s) {
  if (s.length === 0) return 0
  let map = new Map()
  let max = 0
  for (let right = 0, left = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1)
    }
    map.set(s[right], right)
    max = Math.max(max, right - left + 1)
  }
  return max
}

// var lengthOfLongestSubstring = function(s) {
//   let l = 0
//   let r = -1 // window range: [l, r]
//   let res = 0
//   let showedChars = {}
//   while (l < s.length) {
//     if (r === s.length) return
//     if (r + 1 < s.length && !showedChars[s[r + 1]]) {
//       r++
//       showedChars[s[r]] = true
//     } else {
//       delete showedChars[s[l]]
//       l++
//     }
//     res = Math.max(res, r - l + 1)
//   }
//   return res
// }

module.exports = {
  lengthOfLongestSubstring
}
