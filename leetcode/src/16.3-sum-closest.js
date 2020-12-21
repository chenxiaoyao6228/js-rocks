/*
 * @lc app=leetcode id=16 lang=javascript
 *
 * [16] 3Sum Closest
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  var MAX_VALUE = 2147483647

  if (nums.length < 3) return 0
  nums.sort(function(a, b) {
    return a - b
  })

  var i,
    len = nums.length,
    minDiff = MAX_VALUE,
    complement,
    p1,
    p2,
    curSum,
    result

  for (i = 0; i < len - 2; i++) {
    complement = target - nums[i]
    p1 = i + 1
    p2 = len - 1
    while (p1 < p2) {
      curSum = nums[p1] + nums[p2]
      if (minDiff > Math.abs(curSum - complement)) {
        minDiff = Math.abs(curSum - complement)
        result = curSum + nums[i]
      }
      if (minDiff === 0) break
      if (curSum > complement) {
        p2--
      } else if (curSum < complement) {
        p1++
      }
    }
    while (nums[i + 1] === nums[i]) {
      i++
    }
  }
  return result
}
module.exports = {
  threeSumClosest
}
// @lc code=end
