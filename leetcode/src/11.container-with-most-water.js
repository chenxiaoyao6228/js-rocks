/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 */
/**
 * @param {number[]} height
 * @return {number}
 */

// brute force
// function maxArea(height) {
//   let max = 0
//   for (let i = 0; i < height.length; i++) {
//     for (let j = i + 1; j < height.length; j++) {
//       let current = Math.abs(i - j) * Math.min(height[i], height[j])
//       if (current > max) {
//         max = current
//       }
//     }
//   }
//   return max
// }

/* two pointers solution
  key points
  - maxArea = MaxX * MaxY
  - we make sure that delta X decrease
  - try to find max of Y
*/

function maxArea(height) {
  if (!height || height.length <= 1) return 0
  let leftPos = 0
  let rightPos = height.length - 1
  let max = 0
  while (leftPos < rightPos) {
    const current =
      Math.abs(leftPos - rightPos) * Math.min(height[leftPos], height[rightPos])
    if (current > max) {
      max = current
    }
    if (height[leftPos] < height[rightPos]) {
      leftPos++
    } else {
      rightPos--
    }
  }
  return max
}

module.exports = {
  maxArea
}
