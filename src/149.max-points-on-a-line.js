/*
 * @lc app=leetcode id=149 lang=javascript
 *
 * [149] Max Points on a Line
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
// var maxPoints = function(points) {
//   const len = points.length
//   if (len === 0) return 0
//   if (len === 1) return 1
//   if (len === 2) return 2
//   let count = 2
//   for (let i = 0; i < len - 1; i++) {
//     let map = Object.create(null)
//     let overlap = 0
//     let point = points[i]
//     for (let j = i + 1; j < len; j++) {
//       let nextPoint = points[j]
//       let k = getK(point, nextPoint)
//       if (map[k] == undefined) {
//         map[k] = 2
//         // break
//       } else {
//         map[k]++
//       }
//       count = Math.max(map[k], count)
//     }
//   }
//   return count
//   function getK(point, nextPoint) {
//     return (point[1] - nextPoint[1]) / (point[0] - nextPoint[0])
//   }
//   // function isOverLap(point, nextPoint) {
//   //   return point[0] - nextPoint[0] === 0 && point[1] - nextPoint[1] === 0
//   // }
// }
function maxPoints(points) {
  const len = points.length
  if (len === 0) return 0
  if (len === 1) return 1
  if (len === 2) return 2
  let map = {}
  let result = 2
  for (let i = 0; i < len - 1; i++) {
    map = {}
    let duplicate = 0,
      max = 0
    for (let j = i + 1; j < len; j++) {
      let deltaX = points[j][0] - points[i][0]
      let deltaY = points[j][1] - points[i][1]
      if (deltaX === 0 && deltaY === 0) {
        duplicate++
        continue
      }
      let gcd = generateGCD(deltaX, deltaY)
      if (gcd != 0) {
        deltaX /= gcd
        deltaY /= gcd
      }
      if (map[deltaX]) {
        if (map[deltaX][deltaY]) {
          map[deltaX][deltaY]++
        } else {
          let m = {}
          m[deltaY] = 1
          map[deltaX] = m
        }
      } else {
        let m = {}
        m[deltaY] = 1
        map[deltaX] = m
      }
      max = Math.max(max, map[deltaX][deltaY])
    }
    result = Math.max(result, max + duplicate + 1)
  }
  return result
  function generateGCD(a, b) {
    if (b === 0) return a
    else return generateGCD(b, a % b)
  }
}
// @lc code=end

module.exports = {
  maxPoints
}
