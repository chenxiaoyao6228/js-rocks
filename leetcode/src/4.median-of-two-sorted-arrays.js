/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

//bruce force
// var findMedianSortedArrays = function (nums1, nums2) {
//   let sorted = mergeTwoSorted(nums1, nums2)
//   let len = sorted.length
//   if (len % 2 === 0) {
//     // attention to i and len, use specific eg to confirm your guess
//     return (sorted[len / 2 - 1] + sorted[len / 2]) / 2
//   }
//   return sorted[(len - 1) / 2]
// };

// function mergeTwoSorted(nums1, nums2) {
//   // merge two sorted array then find the median
//   let result = [],
//     len1 = nums1.length, len2 = nums2.length,
//     i = 0, j = 0
//   // terminal case
//   while (result.length < len1 + len2) {
//     if (i === len1) result = result.concat(nums2.slice(j))
//     else if (j === len2) result = result.concat(nums1.slice(i))
//     else if (nums1[i] <= nums2[j]) result.push(nums1[i++])
//     else result.push(nums2[j++])
//   }
//   return result
// }

function findMedianSortedArrays(nums1, nums2) {
  let low = 0,
    high = nums1.length,
    len1 = nums1.length,
    len2 = nums2.length,
    totalLen = len1 + len2,
    totalLenIsEven = totalLen % 2 === 0
  if (len1 > len2) {
    return findMedianSortedArrays(nums2, nums1)
  }
  if (len2 === 0) {
    throw new Error('should pass the correct value')
  }
  while (low <= high) {
    let i = Math.ceil((low + high) / 2)
    let j = totalLenIsEven ? totalLen / 2 - i : (totalLen + 1) / 2 - i

    let maxLeft1 = i === 0 ? -Infinity : nums1[i - 1]
    let minRight1 = i === len1 ? Infinity : nums1[i]

    let maxLeft2 = j === 0 ? -Infinity : nums2[j - 1]
    let minRight2 = j === len2 ? Infinity : nums2[j]

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if (totalLenIsEven) {
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        )
      }
      return Math.max(maxLeft1, maxLeft2)
    }
    // left > right, shift partition to left
    else if (maxLeft1 > maxLeft2) {
      high = i - 1
    } else {
      // right > left, shift partitionx to right
      low = i + 1
    }
  }
}

module.exports = {
  findMedianSortedArrays
}
