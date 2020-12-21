/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let result = []
  let memo = {}
  nums.sort((a, b) => a - b)
  // len - 2
  for (let i = 0; i < nums.length - 2; i++) {
    if (!memo[nums[i]]) {
      memo[nums[i]] = i
    } else {
      continue
    }
    // skip duplicate result
    let start = i + 1
    let end = nums.length - 1
    // if (i > 0 && nums[i - 1] === nums[i]) continue
    // let target = -nums[i]
    while (start < end) {
      let sum = nums[start] + nums[end] + nums[i]
      if (sum > 0) {
        end--
      } else if (sum < 0) {
        start++
      } else {
        result.push([nums[i], nums[start], nums[end]])
        // skip duplicate result
        while (nums[start] === nums[start + 1]) start++
        while (nums[end] === nums[end - 1]) end--
        start++
        end--
      }
    }
  }
  return result
}

module.exports = {
  threeSum
}
