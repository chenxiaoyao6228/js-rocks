/*
 * @lc app=leetcode id=75 lang=javascript
 *
 * [75] Sort Colors
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var sortColors = function(nums) {
//   let zero = -1
//   let two = nums.length
//   for (let i = 0; i < two; ) {
//     let current = nums[i]

//     if (current === 1) {
//       i++
//     } else if (current === 2) {
//       two--
//       swap(nums,i, two)
//     } else {
//       zero++
//       swap(nums, zero, i)
//       i++
//     }
//   }
// }

// function swap(nums, a, b) {
//   let temp = nums[a]
//   nums[a] = nums[b]
//   nums[b] = temp
// }

// v2
// runtime beats 60.79%
// memeory usage beats 85.71%
function sortColors(nums) {
  let n0 = -1,
    n1 = -1,
    n2 = -1,
    n = nums.length
  for (let i = 0; i < n; i++) {
    if (nums[i] == 0) {
      nums[++n2] = 2
      nums[++n1] = 1
      nums[++n0] = 0
    } else if (nums[i] == 1) {
      nums[++n2] = 2
      nums[++n1] = 1
    } else if (nums[i] == 2) {
      nums[++n2] = 2
    }
  }
  return nums
}

module.exports = {
  sortColors
}
