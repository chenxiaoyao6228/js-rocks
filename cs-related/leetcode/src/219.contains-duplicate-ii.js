/*
 * @lc app=leetcode id=219 lang=javascript
 *
 * [219] Contains Duplicate II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// var containsNearbyDuplicate = function(nums, k) {
//   let record = []
//   for (let i = 0; i < nums.length; i++) {
//     if (record.indexOf(nums[i]) > -1) {
//       return true
//     }
//     record.push(nums[i])
//     if (record.length === k + 1) {
//       record.shift()
//     }
//   }
//   return false
// }

var containsNearbyDuplicate = function(nums, k) {
  let ind = {},
    n = nums.length
  for (let i = 0; i < n; i++) {
    if (nums[i] in ind && i - ind[nums[i]] <= k) {
      return true
    }
    ind[nums[i]] = i
  }
  return false
}

// @lc code=end
module.exports = {
  containsNearbyDuplicate
}
