/*
 * @lc app=leetcode id=220 lang=javascript
 *
 * [220] Contains Duplicate III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} range
 * @param {number} diff
 * @return {boolean}
 */

// this is just like what they do with built-in set
const containsNearbyAlmostDuplicate = (nums, range, diff) => {
  if (range <= 0 || diff < 0) {
    return false
  }
  let count = 0,
    orderedSet = null
  for (let i = 0; i < nums.length; i++) {
    if (count > 0 && findNearest(orderedSet, nums[i]) <= diff) {
      return true
    }
    orderedSet = add(orderedSet, nums[i])
    if (++count > range) {
      orderedSet = del(orderedSet, nums[i - range])
      count--
    }
  }
  return false
}
// // definition of my BST
class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}
// insert an element
const add = (root, value) => {
  if (root === null) {
    return new TreeNode(value)
  }
  if (value < root.value) {
    root.left = add(root.left, value)
  } else {
    root.right = add(root.right, value)
  }
  return root
}
// delete an element
const del = (root, value) => {
  if (root === null) {
    return null
  }
  if (root.value === value) {
    if (root.left !== null && root.right !== null) {
      // if both children is present, find the smallest value in its right
      // subtree and replace value of current node. Then delete the
      // value in its right subtree recursively.
      let p = root.right
      while (p.left !== null) {
        p = p.left
      }
      root.value = p.value
      root.right = del(root.right, p.value)
      return root
    } else {
      // else return the present child or null
      return root.left || root.right
    }
  } else if (value > root.value) {
    root.right = del(root.right, value)
  } else {
    root.left = del(root.left, value)
  }
  return root
}
// find nearest in BFS
const findNearest = (root, value) => {
  if (!root) return Infinity
  const dist = Math.abs(root.value - value)
  if (dist === 0) {
    return 0
  } else if (root.value > value) {
    return Math.min(dist, findNearest(root.left, value))
  } else {
    return Math.min(dist, findNearest(root.right, value))
  }
}
// @lc code=end

module.exports = {
  containsNearbyAlmostDuplicate
}
