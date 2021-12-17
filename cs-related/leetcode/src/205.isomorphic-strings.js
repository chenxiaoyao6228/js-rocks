/*
 * @lc app=leetcode id=205 lang=javascript
 *
 * [205] Isomorphic Strings
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// var isIsomorphic = function(s, t) {
//   if (s.length !== t.length) return false
//   if (s === t) return true
//   let mapS = Object.create(null)
//   let mapT = Object.create(null)
//   for (let i = 0; i < s.length; i++) {
//     let charS = s[i]
//     let charT = t[i]
//     if (!mapT[charT]) {
//       mapT[charT] = charS
//     }
//     if (!mapS[charS]) {
//       mapS[charS] = charT
//     }
//     if (mapS[charS] !== charT || mapT[charT] !== charS) {
//       return false
//     }
//   }
//   return true
// }

// var isIsomorphic = function(s, t) {
//   if (s.length != t.length) return false
//   let map = new Map()
//   for (let i = 0; i < s.length; i++) {
//     if (!map.has(s[i])) map.set(s[i], t[i])
//     else {
//       if (map.get(s[i]) != t[i]) {
//         return false
//       }
//     }
//   }
//   return new Set([...map.values()]).size == map.size
// }

var isIsomorphic = (s, t) => {
  let map = {}
  let valuesMap = {}
  let currentCharacter
  return !s.split('').some((character, key) => {
    currentCharacter = t.charAt(key)
    if (Object.prototype.hasOwnProperty.call(map, character)) {
      return map[character] !== currentCharacter
    }
    if (Object.prototype.hasOwnProperty.call(valuesMap, currentCharacter)) {
      return true
    }
    map[character] = currentCharacter
    valuesMap[currentCharacter] = undefined
    return false
  })
}

// @lc code=end

module.exports = {
  isIsomorphic
}
