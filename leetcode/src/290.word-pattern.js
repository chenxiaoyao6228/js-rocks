/*
 * @lc app=leetcode id=290 lang=javascript
 *
 * [290] Word Pattern
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
  let map = Object.create(null)
  let seenSet = new Set()
  let strList = str.split(' ')
  if (pattern.length !== strList.length) return false
  for (let i = 0; i < pattern.length; i++) {
    let p = pattern[i]
    let s = strList[i]
    if (map[p] && map[p] !== s) return false
    if (!map[p] && seenSet.has(s)) return false
    map[p] = s
    seenSet.add(s)
  }
  return true
}
// @lc code=end

module.exports = {
  wordPattern
}
