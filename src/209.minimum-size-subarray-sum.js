/*
 * @lc app=leetcode id=209 lang=javascript
 *
 * [209] Minimum Size Subarray Sum
 */
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(s, nums) {
  let l = 0
  let r = -1
  let res = nums.length + 1
  let sum = 0
  while (l < nums.length) {
    if (r + 1 <= nums.length && sum < s) {
      r++
      sum += nums[r]
    } else {
      sum -= nums[l]
      l++
    }
    if (sum >= s) {
      res = Math.min(res, r - l + 1)
    }
  }
  if (res === nums.length + 1) return 0
  return res
}
module.exports = {
  minSubArrayLen
}
