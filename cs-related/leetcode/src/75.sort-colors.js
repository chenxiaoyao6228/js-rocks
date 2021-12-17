/*
 * @lc app=leetcode id=75 lang=javascript
 *
 * [75] Sort Colors
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// count all the numbers and then fill the answer
// function sortColors(nums) {
//   let counterMap = {
//     0: 0,
//     1: 0,
//     2: 0
//   }
//   for (let i = 0; i < nums.length; i++) {
//     counterMap[nums[i]]++
//   }
//   let index = 0
//   for (let i = 0; i < counterMap[0]; i++) {
//     nums[index++] = 0
//   }
//   for (let i = 0; i < counterMap[1]; i++) {
//     nums[index++] = 1
//   }
//   for (let i = 0; i < counterMap[2]; i++) {
//     nums[index++] = 2
//   }
// }

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
