/*
 * @lc app=leetcode id=506 lang=javascript
 *
 * [506] Relative Ranks
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {
  let rank = nums.slice().sort((a, b) => b - a)
  return nums.map(num => {
    if (num === rank[0]) return 'Gold Medal'
    else if (num === rank[1]) return 'Silver Medal'
    else if (num === rank[2]) return 'Bronze Medal'
    else return (rank.indexOf(num) + 1).toString()
  })
}
// @lc code=end

module.exports = {
  findRelativeRanks
}
