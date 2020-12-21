/*
 * @lc app=leetcode id=350 lang=javascript
 *
 * [350] Intersection of Two Arrays II
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  const map = new Map()
  for (const n of nums1) {
    if (map.has(n)) {
      map.set(n, map.get(n) + 1)
    } else {
      map.set(n, 1)
    }
  }
  const result = []
  for (const n of nums2) {
    if (map.has(n) && map.get(n) > 0) {
      result.push(n)
      map.set(n, map.get(n) - 1)
    }
  }
  return result
}
// @lc code=end

module.exports = {
  intersect
}
