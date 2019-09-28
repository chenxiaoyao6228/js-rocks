/*
 * @lc app=leetcode id=438 lang=javascript
 *
 * [438] Find All Anagrams in a String
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

var findAnagrams = function(s, p) {
  let map = {}
  for (let i = 0; i < p.length; i++) {
    let char = p[i]
    if (map[char] == undefined) {
      map[char] = 0
    }
    map[char]++
  }
  let counter = Object.keys(map).length
  let result = []
  let start = 0
  let end = 0

  while (end < s.length) {
    let char = s[end]
    if (map[char] != undefined) {
      map[char]--
      if (map[char] == 0) counter--
    }
    end++
    while (counter === 0) {
      let char = s[start]
      if (map[char] != undefined) {
        map[char]++
        if (map[char] > 0) {
          counter++
        }
      }
      if (end - start === p.length) {
        result.push(start)
      }
      start++
    }
  }
  return result
}

// brute force
// var findAnagrams = function(str, subStr) {
//   let index = 0
//   let len = str.length
//   let subLen = subStr.length
//   let result = []
//   while (index <= len - subLen) {
//     let s = str.slice(index, index + subLen)
//     if (match(s, subStr)) {
//       result.push(index)
//     }
//     index++
//   }
//   return result
//   function match(str1, str2) {
//     return (
//       str1
//         .split('')
//         .sort()
//         .join('') ===
//       str2
//         .split('')
//         .sort()
//         .join('')
//     )
//   }
// }

module.exports = {
  findAnagrams
}
