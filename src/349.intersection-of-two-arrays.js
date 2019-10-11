/*
 * @lc app=leetcode id=349 lang=javascript
 *
 * [349] Intersection of Two Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// var intersection = function(nums1, nums2) {
//   if (nums1.length === 0 || nums2.length === 0) {
//     return []
//   }
//   let map = Object.create(null)
//   let result = []
//   for (let i = 0; i < nums1.length; i++) {
//     if (map[nums1[i]] === undefined) map[nums1[i]] = 1
//     for (let j = 0; j < nums2.length; j++) {
//       if (map[nums2[j]] === 1) {
//         map[nums2[j]] = 2
//         result.push(nums2[j])
//       }
//     }
//   }
//   return result
// }

//12ms
// var intersection = function(nums1, nums2) {
//   if (nums1.length === 0 || nums2.length === 0) {
//     return []
//   }
//   let set = new Set()
//   let intersection = new Set()
//   for (let i = 0; i < nums1.length; i++) {
//     set.add(nums1[i])
//   }
//   for (let i = 0; i < nums2.length; i++) {
//     if (set.has(nums2[i])) intersection.add(nums2[i])
//   }
//   return Array.from(intersection)
// }

// // 7ms
// var intersection = function(nums1, nums2) {
//   const set = new Set(nums1)
//   return [...new Set(nums2.filter(n => set.has(n)))]
// }
// 5ms
var intersection = function(nums1, nums2) {
  nums1 = new Set(nums1)
  nums2 = new Set(nums2)
  const common = []
  nums2.forEach(num => {
    if (nums1.has(num)) common.push(num)
  })
  return common
}
// @lc code=end

module.exports = {
  intersection
}
