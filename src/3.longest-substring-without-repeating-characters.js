/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let l = 0
  let r = -1 // window range: [l, r]
  let res = 0
  let showedChars = {}
  while (l < s.length) {
    if (r === s.length) return
    if (r + 1 < s.length && !showedChars[s[r + 1]]) {
      r++
      showedChars[s[r]] = true
    } else {
      delete showedChars[s[l]]
      l++
    }
    res = Math.max(res, r - l + 1)
  }
  return res
}

module.exports = {
  lengthOfLongestSubstring
}
