/*
 * @lc app=leetcode id=283 lang=javascript
 *
 * [283] Move Zeroes
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// v1
// time  complexity O(n)
// space complexity O(1)
var moveZeroes1 = function(nums) {
  let k = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      nums[k] = nums[i]
      k++
    }
  }
  for (let j = k; j < nums.length; j++) {
    nums[j] = 0
  }
  return nums
}

// v2
// time  complexity O(n)
// space complexity O(1)
  var moveZeroes = function(nums) {
  let k = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      if (i !== k) {
        swap(k, i)
      }
      k++
    }
  }
  return nums
  function swap(a, b) {
    let temp = nums[b]
    nums[b] = nums[a]
    nums[a] = temp
  }
}

module.exports = {
  moveZeroes
}
